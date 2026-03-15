import { Schema } from "effect";

export const TransactionFormSchema = Schema.Struct({
  type: Schema.Literal("expense", "income", "transfer"),
  accountId: Schema.String.pipe(
    Schema.minLength(1, { message: () => "Account is required" })
  ),
  categoryId: Schema.String.pipe(
    Schema.minLength(1, { message: () => "Category is required" })
  ),
  amount: Schema.String.pipe(
    Schema.minLength(1, { message: () => "Amount is required" })
  ),
  description: Schema.String.pipe(
    Schema.minLength(1, { message: () => "Description is required" })
  ),
  date: Schema.String.pipe(
    Schema.minLength(1, { message: () => "Date is required" })
  ),
  toAccountId: Schema.String,
});
