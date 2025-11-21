import { Schema } from "effect";

export const ExpenseId = Schema.String.pipe(Schema.brand("ExpenseId"));

export type ExpenseId = Schema.Schema.Type<typeof ExpenseId>;

export class Expense extends Schema.Class<Expense>("ExpenseId")({
  id: ExpenseId,
  name: Schema.String,
}) {
  static readonly Array = Schema.Array(this);
}

export class ExpenseNotFound extends Schema.TaggedError<ExpenseNotFound>(
  "ExpenseNotFound"
)("ExpenseNotFound", {}) {}

export const CreateExpenseSchema = Schema.Struct({
  name: Schema.String,
  notes: Schema.optional(Schema.String),
  price: Schema.String,
  category: Schema.String,
  date: Schema.String,
  paid_via: Schema.String,
});

export type CreateExpenseSchema = Schema.Schema.Type<
  typeof CreateExpenseSchema
>;

export const UpdateExpenseSchema = Schema.Struct({
  id: ExpenseId,
  name: Schema.String,
  notes: Schema.optional(Schema.String),
  price: Schema.String,
  category: Schema.String,
  date: Schema.String,
  paid_via: Schema.String,
});

export type UpdateExpenseSchema = Schema.Schema.Type<
  typeof UpdateExpenseSchema
>;

export const GetExpensesSchema = Schema.Struct({
  to: Schema.optional(Schema.String),
  from: Schema.optional(Schema.String),
  categories: Schema.optional(Schema.String),
  cursor: Schema.optional(Schema.String),
  sort: Schema.optional(Schema.Array(Schema.String)),
  pageSize: Schema.optional(
    Schema.Number.pipe(Schema.minLength(1), Schema.maxLength(100))
  ),
  q: Schema.optional(Schema.String),
});

export type GetExpensesSchema = Schema.Schema.Type<typeof GetExpensesSchema>;

export const DeleteExpenseSchema = Schema.Struct({
  id: Schema.String.pipe(Schema.minLength(1)),
});

export type DeleteExpenseSchema = Schema.Schema.Type<
  typeof DeleteExpenseSchema
>;

export const ExpenseInputs = {
  get: GetExpensesSchema,
  create: CreateExpenseSchema,
  update: UpdateExpenseSchema,
  delete: DeleteExpenseSchema,
};
