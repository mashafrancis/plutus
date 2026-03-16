import type { GenericQueryCtx } from "convex/server";
import { Console, Effect } from "effect";
import type { DataModel } from "../_generated/dataModel";

export const DEFAULT_BASE_CURRENCY = "KES";
const USD_BASE_CURRENCY = "USD";

// Fallback rates when no exchange rate data is available (rates relative to USD)
const FALLBACK_RATES: Record<string, number> = {
  USD: 1,
  KES: 129.5,
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
  toCurrency: string,
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
          q.eq("baseCurrency", fromCurrency).eq("targetCurrency", toCurrency),
        )
        .first(),
    );

    if (directRate) {
      yield* Console.log(
        `Found direct rate for ${fromCurrency}->${toCurrency}: ${directRate.rate}`,
      );
      return directRate.rate;
    }

    // Try reverse rate
    const reverseRate = yield* Effect.tryPromise(() =>
      ctx.db
        .query("exchangeRates")
        .withIndex("by_currencies", (q) =>
          q.eq("baseCurrency", toCurrency).eq("targetCurrency", fromCurrency),
        )
        .first(),
    );

    if (reverseRate) {
      yield* Console.log(
        `Found reverse rate for ${fromCurrency}->${toCurrency}: ${1 / reverseRate.rate}`,
      );
      return 1 / reverseRate.rate;
    }

    // Use USD as intermediate currency
    // Treat 'USD' as having a rate of 1 to itself to avoid DB lookup failure
    const fromUSDRate =
      fromCurrency === USD_BASE_CURRENCY
        ? 1
        : (yield* Effect.tryPromise(() =>
            ctx.db
              .query("exchangeRates")
              .withIndex("by_currencies", (q) =>
                q.eq("baseCurrency", USD_BASE_CURRENCY).eq("targetCurrency", fromCurrency),
              )
              .first(),
          ))?.rate;

    const toUSDRate =
      toCurrency === USD_BASE_CURRENCY
        ? 1
        : (yield* Effect.tryPromise(() =>
            ctx.db
              .query("exchangeRates")
              .withIndex("by_currencies", (q) =>
                q.eq("baseCurrency", USD_BASE_CURRENCY).eq("targetCurrency", toCurrency),
              )
              .first(),
          ))?.rate;

    if (fromUSDRate && toUSDRate) {
      const rate = toUSDRate / fromUSDRate;
      yield* Console.log(
        `Calculated intermediate rate for ${fromCurrency}->${toCurrency}: ${rate}`,
      );
      return rate;
    }

    // Fallback to hardcoded rates
    const fromFallback = FALLBACK_RATES[fromCurrency];
    const toFallback = FALLBACK_RATES[toCurrency];

    if (fromFallback && toFallback) {
      const rate = toFallback / fromFallback;
      yield* Console.log(`Using fallback rate for ${fromCurrency}->${toCurrency}: ${rate}`);
      return rate;
    }

    yield* Console.warn(`No exchange rate found for ${fromCurrency} -> ${toCurrency}`);
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
  toCurrency: string,
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
  KES: { symbol: "KSh", name: "Kenyan Shilling" },
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

const REGION_TO_CURRENCY: Record<string, string> = {
  // Africa
  KE: "KES",
  UG: "KES",
  TZ: "KES",
  RW: "KES",
  ET: "USD",
  NG: "USD",
  GH: "USD",
  ZA: "USD",
  EG: "USD",
  MA: "EUR",
  TN: "EUR",
  DZ: "EUR",
  CI: "EUR",
  SN: "EUR",

  // North America
  US: "USD",
  CA: "CAD",
  MX: "USD",

  // South America
  AR: "USD",
  CL: "USD",
  CO: "USD",
  PE: "USD",
  UY: "USD",
  AU: "AUD",
  CH: "CHF",

  // Europe
  GB: "GBP",
  NO: "EUR",
  SE: "EUR",
  DK: "EUR",
  PL: "EUR",
  CZ: "EUR",
  HU: "EUR",
  RO: "EUR",
  JP: "JPY",
  CN: "CNY",
  BR: "BRL",
  IN: "INR",
  DE: "EUR",
  FR: "EUR",
  IT: "EUR",
  ES: "EUR",
  NL: "EUR",
  PT: "EUR",
  IE: "EUR",
  AT: "EUR",
  BE: "EUR",
  FI: "EUR",
  GR: "EUR",
  CY: "EUR",
  MT: "EUR",
  SK: "EUR",
  SI: "EUR",
  LV: "EUR",
  LT: "EUR",
  EE: "EUR",

  // Middle East
  AE: "USD",
  SA: "USD",
  QA: "USD",
  KW: "USD",
  BH: "USD",
  OM: "USD",
  IL: "USD",
  JO: "USD",
  LB: "USD",

  // Asia Pacific
  KR: "USD",
  SG: "USD",
  MY: "USD",
  TH: "USD",
  VN: "USD",
  PH: "USD",
  ID: "USD",
  HK: "USD",
  NZ: "AUD",
  PK: "USD",
  BD: "USD",
  LK: "INR",
};

const TIMEZONE_TO_REGION: Record<string, string> = {
  "Africa/Nairobi": "KE",
  "Africa/Kampala": "UG",
  "Africa/Dar_es_Salaam": "TZ",
  "Europe/London": "GB",
  "Europe/Paris": "FR",
  "Europe/Berlin": "DE",
  "America/New_York": "US",
  "America/Toronto": "CA",
  "Asia/Tokyo": "JP",
  "Asia/Shanghai": "CN",
  "Asia/Kolkata": "IN",
  "Australia/Sydney": "AU",
};

const parseRegionFromLocale = (locale: string): string | null => {
  const normalized = locale.replace("_", "-");
  const parts = normalized.split("-");
  for (const part of parts.slice(1)) {
    if (/^[A-Za-z]{2}$/.test(part)) {
      return part.toUpperCase();
    }
  }
  return null;
};

export const getCurrencyFromLocale = (locale: string | undefined, timeZone?: string): string => {
  const region =
    (locale ? parseRegionFromLocale(locale) : null) ??
    (timeZone ? TIMEZONE_TO_REGION[timeZone] : undefined);

  if (region) {
    return REGION_TO_CURRENCY[region] ?? DEFAULT_BASE_CURRENCY;
  }

  return DEFAULT_BASE_CURRENCY;
};

export const resolveInitialBaseCurrency = (params: {
  existingBaseCurrency?: string;
  locale?: string;
  timeZone?: string;
}): string => {
  if (params.existingBaseCurrency) {
    return params.existingBaseCurrency;
  }

  return getCurrencyFromLocale(params.locale, params.timeZone);
};
