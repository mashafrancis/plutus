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
  category: Schema.String,
  date: Schema.String,
});

export type CreateIncomeSchema = Schema.Schema.Type<typeof CreateIncomeSchema>;

export const UpdateIncomeSchema = Schema.Struct({
  id: IncomeId,
  name: Schema.String,
  notes: Schema.optional(Schema.String),
  price: Schema.String,
  category: Schema.String,
  date: Schema.String,
});

export type UpdateIncomeSchema = Schema.Schema.Type<typeof UpdateIncomeSchema>;

export const GetIncomeSchema = Schema.Struct({
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
};
