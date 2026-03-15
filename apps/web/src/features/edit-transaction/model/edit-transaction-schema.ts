import { Schema } from "effect";

export const EditTransactionFormSchema = Schema.Struct({
  categoryId: Schema.String.pipe(
    Schema.minLength(1, { message: () => "Category is required" })
  ),
  description: Schema.String.pipe(
    Schema.minLength(1, { message: () => "Description is required" })
  ),
  date: Schema.String.pipe(
    Schema.minLength(1, { message: () => "Date is required" })
  ),
  notes: Schema.String,
});
