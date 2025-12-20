import { Schema } from "effect";

export const GetDashboardDataSchema = Schema.Struct({
  timeframe: Schema.optional(
    Schema.Union([
      Schema.Literal("week"),
      Schema.Literal("month"),
      Schema.Literal("quarter"),
      Schema.Literal("year"),
      Schema.Literal("custom"),
    ])
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
