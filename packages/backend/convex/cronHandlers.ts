import { Effect } from "effect";
import { internalMutation } from "./_generated/server";
import { convertCurrency } from "./lib/currency";
import { calculateNextRenewalDate, startOfDay } from "./lib/dates";

/**
 * Process subscription renewals
 * - Finds active subscriptions due for renewal
 * - Creates transactions for auto-renew subscriptions
 * - Updates next renewal date
 * - Sends notifications
 */
export const processSubscriptionRenewals = internalMutation({
  handler: async (ctx) => {
    const now = Date.now();

    // Get all subscriptions due for renewal
    const dueSubscriptions = await ctx.db
      .query("subscriptions")
      .withIndex("by_nextRenewalDate")
      .filter((q) =>
        q.and(
          q.lte(q.field("nextRenewalDate"), now),
          q.eq(q.field("status"), "active")
        )
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
            convertCurrency(
              ctx,
              subscription.amount,
              subscription.currency,
              account.currency
            )
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
          subscription.frequency
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
        console.error(
          `Failed to process subscription ${subscription._id}:`,
          error
        );
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
          q.eq(q.field("status"), "active")
        )
      )
      .collect();

    for (const subscription of upcomingSubscriptions) {
      // Check if we should notify based on notifyDaysBefore
      const daysUntilRenewal = Math.ceil(
        (subscription.nextRenewalDate - now) / (24 * 60 * 60 * 1000)
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
              q.gte(q.field("createdAt"), startOfDay(now))
            )
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

    return {
      processed: dueSubscriptions.length,
      upcoming: upcomingSubscriptions.length,
    };
  },
});

/**
 * Update exchange rates
 * In a production app, this would fetch from an API like exchangeratesapi.io
 * For now, we update with slightly randomized rates to simulate market movement
 */
export const updateExchangeRates = internalMutation({
  handler: async (ctx) => {
    const now = Date.now();

    // Base rates relative to USD (in production, fetch from API)
    const baseRates: Record<string, number> = {
      EUR: 0.92,
      GBP: 0.79,
      JPY: 149.5,
      CAD: 1.36,
      AUD: 1.53,
      CHF: 0.88,
      CNY: 7.24,
      BRL: 4.97,
      INR: 83.12,
    };

    for (const [currency, baseRate] of Object.entries(baseRates)) {
      // Add small random variation (±0.5%)
      const variation = 1 + (Math.random() - 0.5) * 0.01;
      const rate = Math.round(baseRate * variation * 10_000) / 10_000;

      // Check if rate exists
      const existing = await ctx.db
        .query("exchangeRates")
        .withIndex("by_currencies", (q) =>
          q.eq("baseCurrency", "USD").eq("targetCurrency", currency)
        )
        .first();

      if (existing) {
        await ctx.db.patch(existing._id, { rate, timestamp: now });
      } else {
        await ctx.db.insert("exchangeRates", {
          baseCurrency: "USD",
          targetCurrency: currency,
          rate,
          timestamp: now,
        });
      }
    }

    return { updated: Object.keys(baseRates).length };
  },
});

/**
 * Create daily investment snapshots
 */
export const createInvestmentSnapshots = internalMutation({
  handler: async (ctx) => {
    const today = startOfDay(Date.now());

    // Get all investments
    const investments = await ctx.db.query("investments").collect();

    let created = 0;

    for (const investment of investments) {
      // Check if snapshot already exists for today
      const existing = await ctx.db
        .query("investmentSnapshots")
        .withIndex("by_userId_date", (q) =>
          q.eq("userId", investment.userId).eq("date", today)
        )
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

    return { created, total: investments.length };
  },
});

/**
 * Cleanup old notifications (older than 30 days)
 */
export const cleanupOldNotifications = internalMutation({
  handler: async (ctx) => {
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;

    // Get old read notifications
    const oldNotifications = await ctx.db
      .query("notifications")
      .filter((q) =>
        q.and(
          q.lt(q.field("createdAt"), thirtyDaysAgo),
          q.eq(q.field("isRead"), true)
        )
      )
      .collect();

    for (const notification of oldNotifications) {
      await ctx.db.delete(notification._id);
    }

    return { deleted: oldNotifications.length };
  },
});
