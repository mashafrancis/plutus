import { Schema } from "effect";

export const InvestmentFormSchema = Schema.Struct({
  name: Schema.String.pipe(
    Schema.minLength(1, { message: () => "Name is required" })
  ),
  type: Schema.Literal(
    "stock",
    "etf",
    "crypto",
    "mutual_fund",
    "bond",
    "real_estate",
    "other"
  ),
  symbol: Schema.String,
  quantity: Schema.String.pipe(
    Schema.minLength(1, { message: () => "Quantity is required" })
  ),
  purchasePrice: Schema.String.pipe(
    Schema.minLength(1, { message: () => "Purchase price is required" })
  ),
  currentPrice: Schema.String,
  currency: Schema.String,
  purchaseDate: Schema.String.pipe(
    Schema.minLength(1, { message: () => "Purchase date is required" })
  ),
});

export const INVESTMENT_TYPES = [
  { value: "stock", label: "Stock" },
  { value: "etf", label: "ETF" },
  { value: "crypto", label: "Cryptocurrency" },
  { value: "mutual_fund", label: "Mutual Fund" },
  { value: "bond", label: "Bond" },
  { value: "real_estate", label: "Real Estate" },
  { value: "other", label: "Other" },
] as const;

export const CURRENCIES = [
  { value: "USD", label: "USD - US Dollar" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "GBP", label: "GBP - British Pound" },
  { value: "JPY", label: "JPY - Japanese Yen" },
  { value: "CAD", label: "CAD - Canadian Dollar" },
  { value: "AUD", label: "AUD - Australian Dollar" },
  { value: "CHF", label: "CHF - Swiss Franc" },
  { value: "BRL", label: "BRL - Brazilian Real" },
] as const;
