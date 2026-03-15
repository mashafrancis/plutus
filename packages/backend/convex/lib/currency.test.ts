import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  DEFAULT_BASE_CURRENCY,
  getCurrencyFromLocale,
  resolveInitialBaseCurrency,
} from "./currency";

const __dirname = dirname(fileURLToPath(import.meta.url));
const convexDir = resolve(__dirname, "..");

describe("currency defaults", () => {
  it("uses KES as the system default currency", () => {
    expect(DEFAULT_BASE_CURRENCY).toBe("KES");
  });

  it("maps locale regions to expected currencies", () => {
    expect(getCurrencyFromLocale("en-KE")).toBe("KES");
    expect(getCurrencyFromLocale("fr-FR")).toBe("EUR");
    expect(getCurrencyFromLocale("en-US")).toBe("USD");
  });

  it("falls back to KES when locale cannot be resolved", () => {
    expect(getCurrencyFromLocale("en")).toBe("KES");
    expect(getCurrencyFromLocale(undefined, "Africa/Nairobi")).toBe("KES");
    expect(getCurrencyFromLocale(undefined)).toBe("KES");
  });

  it("does not overwrite an existing base currency", () => {
    expect(
      resolveInitialBaseCurrency({
        existingBaseCurrency: "USD",
        locale: "en-KE",
      })
    ).toBe("USD");
  });
});

describe("aggregate query currency fallback consistency", () => {
  const aggregateFiles = [
    "accounts.ts",
    "dashboard.ts",
    "investments.ts",
    "subscriptions.ts",
  ];

  it("uses DEFAULT_BASE_CURRENCY across aggregate modules", () => {
    for (const file of aggregateFiles) {
      const content = readFileSync(resolve(convexDir, file), "utf8");
      expect(content).toContain("DEFAULT_BASE_CURRENCY");
      expect(content).not.toContain('?? "USD"');
    }
  });
});
