import { Schema } from "effect";

export const GetDashboardDataSchema = Schema.Struct({
  timeframe: Schema.optional(
    Schema.Literal("week", "month", "quarter", "year", "custom")
  ),
  from: Schema.optional(Schema.String),
  to: Schema.optional(Schema.String),
});

export type GetDashboardDataSchema = Schema.Schema.Type<
  typeof GetDashboardDataSchema
>;

export const DismissInsightSchema = Schema.Struct({
  insightId: Schema.String,
});

export type DismissInsightSchema = Schema.Schema.Type<
  typeof DismissInsightSchema
>;

export const DashboardInputs = {
  getData: GetDashboardDataSchema,
  dismissInsight: DismissInsightSchema,
};
