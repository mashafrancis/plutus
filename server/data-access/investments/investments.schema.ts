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
  ticker: Schema.optional(Schema.String),
  notes: Schema.optional(Schema.String),
  assetType: Schema.String, // stocks, etfs, crypto, bonds, savings, retirement, real-estate, other
  shares: Schema.String,
  costBasis: Schema.String, // renamed from price
  currentValue: Schema.String,
  sector: Schema.optional(Schema.String),
  category: Schema.String,
  categoryId: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  date: Schema.String,
  note: Schema.optional(Schema.String),
});

export type CreateInvestmentSchema = Schema.Schema.Type<
  typeof CreateInvestmentSchema
>;

export const UpdateInvestmentSchema = Schema.Struct({
  id: InvestmentId,
  name: Schema.String,
  ticker: Schema.optional(Schema.String),
  notes: Schema.optional(Schema.String),
  assetType: Schema.String,
  shares: Schema.String,
  costBasis: Schema.String,
  currentValue: Schema.String,
  sector: Schema.optional(Schema.String),
  category: Schema.String,
  categoryId: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  date: Schema.String,
  note: Schema.optional(Schema.String),
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

export const GetInvestmentsWithFiltersSchema = Schema.Struct({
  assetType: Schema.optional(Schema.String),
  account: Schema.optional(Schema.String),
  gainLossStatus: Schema.optional(Schema.String), // all, winners, losers
  search: Schema.optional(Schema.String),
  dateRange: Schema.optional(
    Schema.Struct({
      from: Schema.optional(Schema.String),
      to: Schema.optional(Schema.String),
    })
  ),
});

export const RecordTransactionSchema = Schema.Struct({
  investmentId: Schema.String,
  type: Schema.String, // buy, sell
  shares: Schema.String,
  price: Schema.String, // price per share
  total: Schema.String, // total transaction amount
  date: Schema.String,
});

export const UpdateValueSchema = Schema.Struct({
  investmentId: Schema.String,
  currentValue: Schema.String,
});

export const GetTransactionHistorySchema = Schema.Struct({
  investmentId: Schema.String,
});

export const AddPriceHistorySchema = Schema.Struct({
  investmentId: Schema.String,
  date: Schema.String,
  value: Schema.String, // total value at end of day
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
  getWithFilters: GetInvestmentsWithFiltersSchema,
  recordTransaction: RecordTransactionSchema,
  updateValue: UpdateValueSchema,
  getTransactionHistory: GetTransactionHistorySchema,
  addPriceHistory: AddPriceHistorySchema,
};
