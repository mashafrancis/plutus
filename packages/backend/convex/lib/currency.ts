import type { GenericQueryCtx } from "convex/server";
import { Console, Effect } from "effect";
import type { DataModel } from "../_generated/dataModel";

// Fallback rates when no exchange rate data is available (rates relative to USD)
const FALLBACK_RATES: Record<string, number> = {
  USD: 1,
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

/**
 * Get exchange rate between two currencies
 */
export const getExchangeRate = (
  ctx: GenericQueryCtx<DataModel>,
  fromCurrency: string,
  toCurrency: string
) =>
  Effect.gen(function* () {
    if (fromCurrency === toCurrency) {
      return 1;
    }

    // Try to find direct rate
    const directRate = yield* Effect.tryPromise(() =>
      ctx.db
        .query("exchangeRates")
        .withIndex("by_currencies", (q) =>
          q.eq("baseCurrency", fromCurrency).eq("targetCurrency", toCurrency)
        )
        .first()
    );

    if (directRate) {
      yield* Console.log(
        `Found direct rate for ${fromCurrency}->${toCurrency}: ${directRate.rate}`
      );
      return directRate.rate;
    }

    // Try reverse rate
    const reverseRate = yield* Effect.tryPromise(() =>
      ctx.db
        .query("exchangeRates")
        .withIndex("by_currencies", (q) =>
          q.eq("baseCurrency", toCurrency).eq("targetCurrency", fromCurrency)
        )
        .first()
    );

    if (reverseRate) {
      yield* Console.log(
        `Found reverse rate for ${fromCurrency}->${toCurrency}: ${1 / reverseRate.rate}`
      );
      return 1 / reverseRate.rate;
    }

    // Use USD as intermediate currency
    // Treat 'USD' as having a rate of 1 to itself to avoid DB lookup failure
    const fromUSDRate =
      fromCurrency === "USD"
        ? 1
        : (yield* Effect.tryPromise(() =>
            ctx.db
              .query("exchangeRates")
              .withIndex("by_currencies", (q) =>
                q.eq("baseCurrency", "USD").eq("targetCurrency", fromCurrency)
              )
              .first()
          ))?.rate;

    const toUSDRate =
      toCurrency === "USD"
        ? 1
        : (yield* Effect.tryPromise(() =>
            ctx.db
              .query("exchangeRates")
              .withIndex("by_currencies", (q) =>
                q.eq("baseCurrency", "USD").eq("targetCurrency", toCurrency)
              )
              .first()
          ))?.rate;

    if (fromUSDRate && toUSDRate) {
      const rate = toUSDRate / fromUSDRate;
      yield* Console.log(
        `Calculated intermediate rate for ${fromCurrency}->${toCurrency}: ${rate}`
      );
      return rate;
    }

    // Fallback to hardcoded rates
    const fromFallback = FALLBACK_RATES[fromCurrency];
    const toFallback = FALLBACK_RATES[toCurrency];

    if (fromFallback && toFallback) {
      const rate = toFallback / fromFallback;
      yield* Console.log(
        `Using fallback rate for ${fromCurrency}->${toCurrency}: ${rate}`
      );
      return rate;
    }

    yield* Console.warn(
      `No exchange rate found for ${fromCurrency} -> ${toCurrency}`
    );
    // No conversion available, return 1
    return 1;
  });

/**
 * Convert amount from one currency to another
 */
export const convertCurrency = (
  ctx: GenericQueryCtx<DataModel>,
  amount: number,
  fromCurrency: string,
  toCurrency: string
) =>
  Effect.gen(function* () {
    const rate = yield* getExchangeRate(ctx, fromCurrency, toCurrency);
    return Math.round(amount * rate * 100) / 100; // Round to 2 decimals
  });

/**
 * Format currency amount for display
 */
export const formatCurrency = (amount: number, currency: string): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Common currency codes with their symbols
 */
export const CURRENCY_INFO: Record<string, { symbol: string; name: string }> = {
  USD: { symbol: "$", name: "US Dollar" },
  EUR: { symbol: "€", name: "Euro" },
  GBP: { symbol: "£", name: "British Pound" },
  JPY: { symbol: "¥", name: "Japanese Yen" },
  CAD: { symbol: "C$", name: "Canadian Dollar" },
  AUD: { symbol: "A$", name: "Australian Dollar" },
  CHF: { symbol: "CHF", name: "Swiss Franc" },
  CNY: { symbol: "¥", name: "Chinese Yuan" },
  BRL: { symbol: "R$", name: "Brazilian Real" },
  INR: { symbol: "₹", name: "Indian Rupee" },
};
