import { Schema } from "effect";

export const AccountFormSchema = Schema.Struct({
  name: Schema.String.pipe(
    Schema.minLength(1, { message: () => "Account name is required" })
  ),
  type: Schema.Literal("checking", "savings", "credit", "cash", "investment"),
  currency: Schema.String.pipe(
    Schema.minLength(1, { message: () => "Currency is required" })
  ),
  balance: Schema.String,
});
