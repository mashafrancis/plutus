import { Schema } from "effect";

export const InvestmentId = Schema.String.pipe(Schema.brand("InvestmentId"));

export type InvestmentId = Schema.Schema.Type<typeof InvestmentId>;

export class Investment extends Schema.Class<Investment>("Investment")({
  id: InvestmentId,
  name: Schema.String,
}) {
  static readonly Array = Schema.Array(this);
}

export class InvestmentNotFound extends Schema.TaggedError<InvestmentNotFound>(
  "InvestmentNotFound"
)("InvestmentNotFound", {}) {}

export const CreateInvestmentSchema = Schema.Struct({
  name: Schema.String,
  notes: Schema.optional(Schema.String),
  price: Schema.String,
  category: Schema.String,
  date: Schema.String,
});

export type CreateInvestmentSchema = Schema.Schema.Type<
  typeof CreateInvestmentSchema
>;

export const UpdateInvestmentSchema = Schema.Struct({
  id: InvestmentId,
  name: Schema.String,
  notes: Schema.optional(Schema.String),
  price: Schema.String,
  category: Schema.String,
  date: Schema.String,
});

export type UpdateInvestmentSchema = Schema.Schema.Type<
  typeof UpdateInvestmentSchema
>;

export const GetInvestmentsSchema = Schema.Struct({
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

export type GetInvestmentsSchema = Schema.Schema.Type<
  typeof GetInvestmentsSchema
>;

export const DeleteInvestmentSchema = Schema.Struct({
  id: Schema.String.pipe(Schema.minLength(1)),
});

export type DeleteInvestmentSchema = Schema.Schema.Type<
  typeof DeleteInvestmentSchema
>;

export const InvestmentInputs = {
  get: GetInvestmentsSchema,
  create: CreateInvestmentSchema,
  update: UpdateInvestmentSchema,
  delete: DeleteInvestmentSchema,
};
