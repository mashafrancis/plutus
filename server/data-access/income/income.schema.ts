import { Schema } from "effect";

export const IncomeId = Schema.String.pipe(Schema.brand("IncomeId"));

export type IncomeId = Schema.Schema.Type<typeof IncomeId>;

export class Income extends Schema.Class<Income>("Income")({
  id: IncomeId,
  name: Schema.String,
}) {
  static readonly Array = Schema.Array(this);
}

export class IncomeNotFound extends Schema.TaggedError<IncomeNotFound>(
  "IncomeNotFound"
)("IncomeNotFound", {}) {}

export const CreateIncomeSchema = Schema.Struct({
  name: Schema.String,
  notes: Schema.optional(Schema.String),
  price: Schema.String,
  source: Schema.String,
  date: Schema.String,
  accountId: Schema.optional(Schema.String),
  recurring: Schema.optional(Schema.Boolean),
  recurringFrequency: Schema.optional(
    Schema.Literal("monthly", "weekly", "quarterly", "yearly", "semi-annual")
  ),
  tagIds: Schema.optional(Schema.Array(Schema.String)),
});

export type CreateIncomeSchema = Schema.Schema.Type<typeof CreateIncomeSchema>;

export const UpdateIncomeSchema = Schema.Struct({
  id: IncomeId,
  name: Schema.String,
  notes: Schema.optional(Schema.String),
  price: Schema.String,
  source: Schema.String,
  date: Schema.String,
  accountId: Schema.optional(Schema.String),
  recurring: Schema.optional(Schema.Boolean),
  recurringFrequency: Schema.optional(
    Schema.Literal("monthly", "weekly", "quarterly", "yearly", "semi-annual")
  ),
  tagIds: Schema.optional(Schema.Array(Schema.String)),
});

export type UpdateIncomeSchema = Schema.Schema.Type<typeof UpdateIncomeSchema>;

export const GetIncomeSchema = Schema.Struct({
  to: Schema.optional(Schema.String),
  from: Schema.optional(Schema.String),
  sources: Schema.optional(Schema.String),
  cursor: Schema.optional(Schema.String),
  sort: Schema.optional(Schema.Array(Schema.String)),
  pageSize: Schema.optional(
    Schema.Number.pipe(Schema.minLength(1), Schema.maxLength(100))
  ),
  q: Schema.optional(Schema.String),
});

export const GetIncomeWithFiltersSchema = Schema.Struct({
  dateRange: Schema.optional(
    Schema.Struct({
      from: Schema.String,
      to: Schema.String,
    })
  ),
  source: Schema.optional(Schema.String),
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

export type GetIncomeWithFiltersSchema = Schema.Schema.Type<
  typeof GetIncomeWithFiltersSchema
>;

export const BulkDeleteIncomeSchema = Schema.Struct({
  incomeIds: Schema.Array(Schema.String),
});

export type BulkDeleteIncomeSchema = Schema.Schema.Type<
  typeof BulkDeleteIncomeSchema
>;

export const BulkUpdateSourceSchema = Schema.Struct({
  incomeIds: Schema.Array(Schema.String),
  source: Schema.String,
});

export type BulkUpdateSourceSchema = Schema.Schema.Type<
  typeof BulkUpdateSourceSchema
>;

export const BulkAddTagsSchema = Schema.Struct({
  incomeIds: Schema.Array(Schema.String),
  tagIds: Schema.Array(Schema.String),
});

export type BulkAddTagsSchema = Schema.Schema.Type<typeof BulkAddTagsSchema>;

export type GetIncomeSchema = Schema.Schema.Type<typeof GetIncomeSchema>;

export const DeleteIncomeSchema = Schema.Struct({
  id: Schema.String.pipe(Schema.minLength(1)),
});

export type DeleteIncomeSchema = Schema.Schema.Type<typeof DeleteIncomeSchema>;

export const IncomeInputs = {
  get: GetIncomeSchema,
  create: CreateIncomeSchema,
  update: UpdateIncomeSchema,
  delete: DeleteIncomeSchema,
  getWithFilters: GetIncomeWithFiltersSchema,
  bulkDelete: BulkDeleteIncomeSchema,
  bulkUpdateSource: BulkUpdateSourceSchema,
  bulkAddTags: BulkAddTagsSchema,
};
