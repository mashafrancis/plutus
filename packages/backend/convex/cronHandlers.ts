import { v } from "convex/values";
import { Effect } from "effect";

import { internal } from "./_generated/api";
import { internalAction, internalMutation } from "./_generated/server";
import { convertCurrency } from "./lib/currency";
import { calculateNextRenewalDate, startOfDay } from "./lib/dates";
import {
  EXCHANGE_RATE_FEED_URL,
  type ExchangeRateQuote,
  missingCurrencies,
  parseExchangeRateFeed,
} from "./lib/exchangeRates";
import { incrementCounter, recordLog, withSpan } from "./lib/telemetry";

/**
 * Process subscription renewals
 * - Finds active subscriptions due for renewal
 * - Creates transactions for auto-renew subscriptions
 * - Updates next renewal date
 * - Sends notifications
 */
export const processSubscriptionRenewals = internalMutation({
  handler: async (ctx) =>
    withSpan("cron.process_subscription_renewals", { "cron.job": "subscription_renewals" }, async () => {
    const now = Date.now();

    // Get all subscriptions due for renewal
    const dueSubscriptions = await ctx.db
      .query("subscriptions")
      .withIndex("by_nextRenewalDate")
      .filter((q) =>
        q.and(q.lte(q.field("nextRenewalDate"), now), q.eq(q.field("status"), "active")),
      )
      .collect();

    for (const subscription of dueSubscriptions) {
      try {
        // Get account for the transaction
        const account = await ctx.db.get(subscription.accountId);
        if (!account) {
          continue;
        }

        if (subscription.autoRenew) {
          // Create a transaction for the renewal
          const convertedAmount = await Effect.runPromise(
            convertCurrency(ctx, subscription.amount, subscription.currency, account.currency),
          );

          await ctx.db.insert("transactions", {
            userId: subscription.userId,
            accountId: subscription.accountId,
            categoryId: subscription.categoryId,
            type: "expense",
            amount: subscription.amount,
            currency: subscription.currency,
            convertedAmount,
            description: `${subscription.name} - Renewal`,
            date: now,
            subscriptionId: subscription._id,
          });

          // Update account balance
          await ctx.db.patch(subscription.accountId, {
            balance: account.balance - convertedAmount,
          });
        }

        // Update next renewal date
        const nextRenewalDate = calculateNextRenewalDate(
          subscription.nextRenewalDate,
          subscription.frequency,
        );

        await ctx.db.patch(subscription._id, { nextRenewalDate });

        // Create notification
        await ctx.db.insert("notifications", {
          userId: subscription.userId,
          type: "subscription_renewal",
          title: "Subscription Renewed",
          message: `${subscription.name} has been renewed for ${subscription.currency} ${subscription.amount}`,
          isRead: false,
          createdAt: now,
          relatedId: subscription._id,
        });
      } catch (error) {
        console.error(`Failed to process subscription ${subscription._id}:`, error);
      }
    }

    // Send upcoming renewal notifications
    const threeDaysFromNow = now + 3 * 24 * 60 * 60 * 1000;
    const upcomingSubscriptions = await ctx.db
      .query("subscriptions")
      .withIndex("by_nextRenewalDate")
      .filter((q) =>
        q.and(
          q.gt(q.field("nextRenewalDate"), now),
          q.lte(q.field("nextRenewalDate"), threeDaysFromNow),
          q.eq(q.field("status"), "active"),
        ),
      )
      .collect();

    for (const subscription of upcomingSubscriptions) {
      // Check if we should notify based on notifyDaysBefore
      const daysUntilRenewal = Math.ceil(
        (subscription.nextRenewalDate - now) / (24 * 60 * 60 * 1000),
      );

      if (daysUntilRenewal <= subscription.notifyDaysBefore) {
        // Check if we already sent a notification today
        const existingNotification = await ctx.db
          .query("notifications")
          .withIndex("by_userId", (q) => q.eq("userId", subscription.userId))
          .filter((q) =>
            q.and(
              q.eq(q.field("type"), "subscription_renewal"),
              q.eq(q.field("relatedId"), subscription._id),
              q.gte(q.field("createdAt"), startOfDay(now)),
            ),
          )
          .first();

        if (!existingNotification) {
          await ctx.db.insert("notifications", {
            userId: subscription.userId,
            type: "subscription_renewal",
            title: "Upcoming Renewal",
            message: `${subscription.name} will renew in ${daysUntilRenewal} day${daysUntilRenewal > 1 ? "s" : ""}`,
            isRead: false,
            createdAt: now,
            relatedId: subscription._id,
          });
        }
      }
    }

    incrementCounter("cron.jobs.completed", 1, {
      "cron.job": "subscription_renewals",
      outcome: "success",
    });

    return {
      processed: dueSubscriptions.length,
      upcoming: upcomingSubscriptions.length,
    };
  }),
});

/**
 * Update exchange rates.
 *
 * Rates are pulled from a live USD-based feed. If the feed is unavailable or
 * returns no usable rates, nothing is written: the job fails so it is visible,
 * and the last known good rates stay in place. Rates are never synthesized or
 * randomized here, because every value persisted to `exchangeRates` is used to
 * compute and store real user financial figures.
 */
const FEED_TIMEOUT_MS = 10_000;

export const updateExchangeRates = internalAction({
  handler: async (ctx) =>
    withSpan("cron.update_exchange_rates", { "cron.job": "exchange_rates" }, async () => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), FEED_TIMEOUT_MS);

      let quotes: ExchangeRateQuote[];
      try {
        const response = await fetch(EXCHANGE_RATE_FEED_URL, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Exchange rate feed returned HTTP ${response.status}`);
        }

        quotes = parseExchangeRateFeed(await response.json());
      } finally {
        clearTimeout(timeout);
      }

      if (quotes.length === 0) {
        throw new Error("Exchange rate feed returned no usable USD rates");
      }

      await ctx.runMutation(internal.cronHandlers.applyExchangeRates, { quotes });

      const missing = missingCurrencies(quotes);

      if (missing.length > 0) {
        recordLog("Exchange rate feed is missing supported currencies", "ERROR", {
          "cron.job": "exchange_rates",
          "exchange_rates.missing_currencies": missing.join(","),
          "exchange_rates.missing_count": missing.length,
          "exchange_rates.received_count": quotes.length,
        });
      }

      incrementCounter("cron.jobs.completed", 1, {
        "cron.job": "exchange_rates",
        outcome: "success",
      });

      return { updated: quotes.length };
    }),
});

/**
 * Persist the USD-based rates fetched by `updateExchangeRates`.
 *
 * Kept separate from the action because Convex actions cannot write to the
 * database directly. Only the currencies present in the payload are touched, so
 * a partial feed leaves the existing rows for the other currencies intact.
 */
export const applyExchangeRates = internalMutation({
  args: {
    quotes: v.array(v.object({ currency: v.string(), rate: v.number() })),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    let updated = 0;

    for (const quote of args.quotes) {
      const existing = await ctx.db
        .query("exchangeRates")
        .withIndex("by_currencies", (q) =>
          q.eq("baseCurrency", "USD").eq("targetCurrency", quote.currency),
        )
        .first();

      if (existing) {
        await ctx.db.patch(existing._id, { rate: quote.rate, timestamp: now });
      } else {
        await ctx.db.insert("exchangeRates", {
          baseCurrency: "USD",
          targetCurrency: quote.currency,
          rate: quote.rate,
          timestamp: now,
        });
      }

      updated++;
    }

    return { updated };
  },
});

/**
 * Create daily investment snapshots
 */
export const createInvestmentSnapshots = internalMutation({
  handler: async (ctx) =>
    withSpan("cron.create_investment_snapshots", { "cron.job": "investment_snapshots" }, async () => {
    const today = startOfDay(Date.now());

    // Get all investments
    const investments = await ctx.db.query("investments").collect();

    let created = 0;

    for (const investment of investments) {
      // Check if snapshot already exists for today
      const existing = await ctx.db
        .query("investmentSnapshots")
        .withIndex("by_userId_date", (q) => q.eq("userId", investment.userId).eq("date", today))
        .filter((q) => q.eq(q.field("investmentId"), investment._id))
        .first();

      if (!existing) {
        await ctx.db.insert("investmentSnapshots", {
          investmentId: investment._id,
          userId: investment.userId,
          price: investment.currentPrice,
          totalValue: investment.currentPrice * investment.quantity,
          date: today,
        });
        created++;
      }
    }

    incrementCounter("cron.jobs.completed", 1, {
      "cron.job": "investment_snapshots",
      outcome: "success",
    });

    return { created, total: investments.length };
  }),
});

/**
 * Cleanup old notifications (older than 30 days)
 */
export const cleanupOldNotifications = internalMutation({
  handler: async (ctx) =>
    withSpan("cron.cleanup_old_notifications", { "cron.job": "cleanup_notifications" }, async () => {
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;

    // Get old read notifications
    const oldNotifications = await ctx.db
      .query("notifications")
      .filter((q) =>
        q.and(q.lt(q.field("createdAt"), thirtyDaysAgo), q.eq(q.field("isRead"), true)),
      )
      .collect();

    for (const notification of oldNotifications) {
      await ctx.db.delete(notification._id);
    }

    incrementCounter("cron.jobs.completed", 1, {
      "cron.job": "cleanup_notifications",
      outcome: "success",
    });

    return { deleted: oldNotifications.length };
  }),
});
