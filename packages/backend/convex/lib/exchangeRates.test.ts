import { describe, expect, it } from "vite-plus/test";

import { parseExchangeRateFeed, SUPPORTED_CURRENCIES } from "./exchangeRates";

describe("parseExchangeRateFeed", () => {
  it("extracts and rounds supported USD-based rates", () => {
    const quotes = parseExchangeRateFeed({
      result: "success",
      base_code: "USD",
      rates: { KES: 129.51513, EUR: 0.871291, GBP: 0.747943 },
    });

    expect(quotes).toEqual([
      { currency: "KES", rate: 129.5151 },
      { currency: "EUR", rate: 0.8713 },
      { currency: "GBP", rate: 0.7479 },
    ]);
  });

  it("is independent of the order rates appear in the payload", () => {
    const quotes = parseExchangeRateFeed({
      result: "success",
      base_code: "USD",
      rates: { INR: 95.94, KES: 129.5 },
    });

    expect(quotes).toEqual([
      { currency: "KES", rate: 129.5 },
      { currency: "INR", rate: 95.94 },
    ]);
  });

  it("never substitutes a rate for a missing, invalid, or non-positive value", () => {
    const quotes = parseExchangeRateFeed({
      result: "success",
      base_code: "USD",
      rates: {
        KES: 0,
        EUR: -0.92,
        GBP: "0.79",
        JPY: Number.NaN,
        CAD: Number.POSITIVE_INFINITY,
      },
    });

    expect(quotes).toEqual([]);
  });

  it("returns nothing for a failed or non-USD payload", () => {
    expect(parseExchangeRateFeed({ result: "error", rates: { KES: 129.5 } })).toEqual([]);
    expect(
      parseExchangeRateFeed({ result: "success", base_code: "EUR", rates: { KES: 129.5 } }),
    ).toEqual([]);
    expect(parseExchangeRateFeed({ result: "success", base_code: "USD" })).toEqual([]);
  });

  it("returns nothing for a malformed payload", () => {
    expect(parseExchangeRateFeed(null)).toEqual([]);
    expect(parseExchangeRateFeed("nope")).toEqual([]);
    expect(parseExchangeRateFeed([])).toEqual([]);
  });

  it("covers the currencies the app can present", () => {
    const rates: Record<string, number> = {};
    for (const currency of SUPPORTED_CURRENCIES) {
      rates[currency] = 1.5;
    }

    const quotes = parseExchangeRateFeed({
      result: "success",
      base_code: "USD",
      rates,
    });

    expect(quotes).toHaveLength(SUPPORTED_CURRENCIES.length);
  });
});
