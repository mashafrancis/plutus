import { Schema } from "effect";

export const SubscriptionFormSchema = Schema.Struct({
  name: Schema.String.pipe(
    Schema.minLength(1, { message: () => "Name is required" })
  ),
  accountId: Schema.String.pipe(
    Schema.minLength(1, { message: () => "Account is required" })
  ),
  categoryId: Schema.String.pipe(
    Schema.minLength(1, { message: () => "Category is required" })
  ),
  amount: Schema.String.pipe(
    Schema.minLength(1, { message: () => "Amount is required" })
  ),
  frequency: Schema.Literal(
    "daily",
    "weekly",
    "monthly",
    "quarterly",
    "yearly"
  ),
  startDate: Schema.String.pipe(
    Schema.minLength(1, { message: () => "Start date is required" })
  ),
});

export const FREQUENCIES = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "yearly", label: "Yearly" },
] as const;
