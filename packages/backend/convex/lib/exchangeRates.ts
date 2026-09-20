/**
 * Currency codes Plutus supports. This mirrors the app's currency universe
 * (see REGION_TO_CURRENCY and CURRENCY_INFO in lib/currency.ts) and the set of
 * rates the daily cron persists.
 */
export const SUPPORTED_CURRENCIES = [
  "KES",
  "EUR",
  "GBP",
  "JPY",
  "CAD",
  "AUD",
  "CHF",
  "CNY",
  "BRL",
  "INR",
] as const;

const BASE_CURRENCY = "USD";

/**
 * Free, keyless USD-based feed from exchangerate-api.com.
 * https://www.exchangerate-api.com/docs/free
 */
export const EXCHANGE_RATE_FEED_URL = `https://open.er-api.com/v6/latest/${BASE_CURRENCY}`;

const RATE_PRECISION = 10_000;

export interface ExchangeRateQuote {
  currency: string;
  rate: number;
}

/**
 * Extract the supported USD-based quotes from a feed payload.
 *
 * Only well-formed rates are returned: a missing, non-numeric, non-finite, or
 * non-positive value is skipped rather than substituted. An empty result means
 * the payload carried no usable rates and the caller must not write anything —
 * fabricated rates must never reach the exchangeRates table.
 */
export const parseExchangeRateFeed = (payload: unknown): ExchangeRateQuote[] => {
  if (typeof payload !== "object" || payload === null) {
    return [];
  }

  const {
    result,
    base_code: baseCode,
    rates,
  } = payload as {
    result?: unknown;
    base_code?: unknown;
    rates?: unknown;
  };

  if (result !== "success" || baseCode !== BASE_CURRENCY) {
    return [];
  }

  if (typeof rates !== "object" || rates === null) {
    return [];
  }

  const quotes: ExchangeRateQuote[] = [];

  for (const currency of SUPPORTED_CURRENCIES) {
    const raw = (rates as Record<string, unknown>)[currency];
    if (typeof raw !== "number" || !Number.isFinite(raw) || raw <= 0) {
      continue;
    }
    quotes.push({
      currency,
      rate: Math.round(raw * RATE_PRECISION) / RATE_PRECISION,
    });
  }

  return quotes;
};

/**
 * Supported currencies absent from a parsed feed payload.
 *
 * `parseExchangeRateFeed` skips a currency whose rate is missing or unusable, so
 * its previously stored rate silently stays in place. Callers surface this set
 * alongside the cron job telemetry, making per-currency staleness queryable
 * instead of only whether the job as a whole succeeded or threw.
 */
export const missingCurrencies = (quotes: ExchangeRateQuote[]): string[] => {
  const present = new Set(quotes.map((quote) => quote.currency));
  return SUPPORTED_CURRENCIES.filter((currency) => !present.has(currency));
};
