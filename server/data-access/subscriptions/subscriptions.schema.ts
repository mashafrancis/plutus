import { Schema } from "effect";

export const SubscriptionId = Schema.String.pipe(
  Schema.brand("SubscriptionId")
);

export type SubscriptionId = Schema.Schema.Type<typeof SubscriptionId>;

export class Subscription extends Schema.Class<Subscription>("Subscription")({
  id: SubscriptionId,
  name: Schema.String,
}) {
  static readonly Array = Schema.Array(this);
}

export class SubscriptionNotFound extends Schema.TaggedError<SubscriptionNotFound>(
  "SubscriptionNotFound"
)("SubscriptionNotFound", {}) {}

export const CreateSubscriptionSchema = Schema.Struct({
  name: Schema.String,
  notes: Schema.optional(Schema.String),
  price: Schema.String,
  billingCycle: Schema.String, // monthly, yearly, weekly
  category: Schema.String,
  status: Schema.optional(Schema.String), // active, paused, cancelled
  url: Schema.String,
  startDate: Schema.String,
  nextPaymentDate: Schema.String,
  accountId: Schema.optional(Schema.String),
  notify: Schema.optional(Schema.Boolean),
});

export type CreateSubscriptionSchema = Schema.Schema.Type<
  typeof CreateSubscriptionSchema
>;

export const UpdateSubscriptionSchema = Schema.Struct({
  id: SubscriptionId,
  name: Schema.String,
  notes: Schema.optional(Schema.String),
  price: Schema.String,
  billingCycle: Schema.String,
  category: Schema.String,
  status: Schema.optional(Schema.String),
  url: Schema.String,
  startDate: Schema.String,
  nextPaymentDate: Schema.String,
  accountId: Schema.optional(Schema.String),
});

export type UpdateSubscriptionSchema = Schema.Schema.Type<
  typeof UpdateSubscriptionSchema
>;

export const GetSubscriptionsSchema = Schema.Struct({
  to: Schema.optional(Schema.String),
  from: Schema.optional(Schema.String),
});

export const GetSubscriptionsWithFiltersSchema = Schema.Struct({
  category: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  billingCycle: Schema.optional(Schema.String),
  amountRange: Schema.optional(
    Schema.Struct({
      min: Schema.optional(Schema.Number),
      max: Schema.optional(Schema.Number),
    })
  ),
  search: Schema.optional(Schema.String),
  sortBy: Schema.optional(Schema.String),
  sortDirection: Schema.optional(Schema.Literal("asc", "desc")),
});

export type GetSubscriptionsWithFiltersSchema = Schema.Schema.Type<
  typeof GetSubscriptionsWithFiltersSchema
>;

export const PauseSubscriptionSchema = Schema.Struct({
  id: Schema.String,
});

export type PauseSubscriptionSchema = Schema.Schema.Type<
  typeof PauseSubscriptionSchema
>;

export const ResumeSubscriptionSchema = Schema.Struct({
  id: Schema.String,
});

export type ResumeSubscriptionSchema = Schema.Schema.Type<
  typeof ResumeSubscriptionSchema
>;

export const CancelSubscriptionSchema = Schema.Struct({
  id: Schema.String,
});

export type CancelSubscriptionSchema = Schema.Schema.Type<
  typeof CancelSubscriptionSchema
>;

export const BulkPauseSchema = Schema.Struct({
  subscriptionIds: Schema.Array(Schema.String),
});

export type BulkPauseSchema = Schema.Schema.Type<typeof BulkPauseSchema>;

export const BulkCancelSchema = Schema.Struct({
  subscriptionIds: Schema.Array(Schema.String),
});

export type BulkCancelSchema = Schema.Schema.Type<typeof BulkCancelSchema>;

export const BulkChangeCategorySchema = Schema.Struct({
  subscriptionIds: Schema.Array(Schema.String),
  category: Schema.String,
});

export type BulkChangeCategorySchema = Schema.Schema.Type<
  typeof BulkChangeCategorySchema
>;

export const AddPaymentSchema = Schema.Struct({
  subscriptionId: Schema.String,
  amount: Schema.String,
  date: Schema.String,
  status: Schema.String, // paid, pending, failed
});

export type AddPaymentSchema = Schema.Schema.Type<typeof AddPaymentSchema>;

export type GetSubscriptionsSchema = Schema.Schema.Type<
  typeof GetSubscriptionsSchema
>;

export const DeleteSubscriptionSchema = Schema.Struct({
  id: Schema.String.pipe(Schema.minLength(1)),
});

export type DeleteSubscriptionSchema = Schema.Schema.Type<
  typeof DeleteSubscriptionSchema
>;

export const SubscriptionInputs = {
  get: GetSubscriptionsSchema,
  create: CreateSubscriptionSchema,
  update: UpdateSubscriptionSchema,
  delete: DeleteSubscriptionSchema,
  getWithFilters: GetSubscriptionsWithFiltersSchema,
  pause: PauseSubscriptionSchema,
  resume: ResumeSubscriptionSchema,
  cancel: CancelSubscriptionSchema,
  bulkPause: BulkPauseSchema,
  bulkCancel: BulkCancelSchema,
  bulkChangeCategory: BulkChangeCategorySchema,
  addPayment: AddPaymentSchema,
};
