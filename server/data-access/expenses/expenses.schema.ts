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
  accountId: Schema.optional(Schema.String),
  recurring: Schema.optional(Schema.Boolean),
  recurringFrequency: Schema.optional(
    Schema.Literal("monthly", "weekly", "quarterly", "yearly")
  ),
  tagIds: Schema.optional(Schema.Array(Schema.String)),
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
  accountId: Schema.optional(Schema.String),
  recurring: Schema.optional(Schema.Boolean),
  recurringFrequency: Schema.optional(
    Schema.Literal("monthly", "weekly", "quarterly", "yearly")
  ),
  tagIds: Schema.optional(Schema.Array(Schema.String)),
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

export const GetExpensesWithFiltersSchema = Schema.Struct({
  dateRange: Schema.optional(
    Schema.Struct({
      from: Schema.String,
      to: Schema.String,
    })
  ),
  category: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Array(Schema.String)),
  amountRange: Schema.optional(
    Schema.Struct({
      min: Schema.optional(Schema.Number),
      max: Schema.optional(Schema.Number),
    })
  ),
  recurring: Schema.optional(Schema.Literal("all", "recurring", "one-time")),
  search: Schema.optional(Schema.String),
  sortBy: Schema.optional(Schema.String),
  sortDirection: Schema.optional(Schema.Literal("asc", "desc")),
});

export type GetExpensesWithFiltersSchema = Schema.Schema.Type<
  typeof GetExpensesWithFiltersSchema
>;

export const BulkDeleteExpensesSchema = Schema.Struct({
  expenseIds: Schema.Array(Schema.String),
});

export type BulkDeleteExpensesSchema = Schema.Schema.Type<
  typeof BulkDeleteExpensesSchema
>;

export const BulkUpdateCategorySchema = Schema.Struct({
  expenseIds: Schema.Array(Schema.String),
  category: Schema.String,
});

export type BulkUpdateCategorySchema = Schema.Schema.Type<
  typeof BulkUpdateCategorySchema
>;

export const BulkAddTagsSchema = Schema.Struct({
  expenseIds: Schema.Array(Schema.String),
  tagIds: Schema.Array(Schema.String),
});

export type BulkAddTagsSchema = Schema.Schema.Type<typeof BulkAddTagsSchema>;

export const ExpenseInputs = {
  get: GetExpensesSchema,
  create: CreateExpenseSchema,
  update: UpdateExpenseSchema,
  delete: DeleteExpenseSchema,
  getWithFilters: GetExpensesWithFiltersSchema,
  bulkDelete: BulkDeleteExpensesSchema,
  bulkUpdateCategory: BulkUpdateCategorySchema,
  bulkAddTags: BulkAddTagsSchema,
};
