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
  paid: Schema.String,
  url: Schema.String,
  date: Schema.String,
  active: Schema.optional(Schema.Boolean),
  cancelledAt: Schema.optional(Schema.String),
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
  paid: Schema.String,
  url: Schema.String,
  date: Schema.String,
  active: Schema.optional(Schema.Boolean),
  cancelledAt: Schema.optional(Schema.String),
});

export type UpdateSubscriptionSchema = Schema.Schema.Type<
  typeof UpdateSubscriptionSchema
>;

export const GetSubscriptionsSchema = Schema.Struct({
  to: Schema.optional(Schema.String),
  from: Schema.optional(Schema.String),
});

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
};
