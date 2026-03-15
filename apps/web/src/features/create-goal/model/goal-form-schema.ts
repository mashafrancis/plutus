import { Schema } from "effect";

export const GoalFormSchema = Schema.Struct({
  name: Schema.String.pipe(
    Schema.minLength(1, { message: () => "Goal name is required" })
  ),
  targetAmount: Schema.String.pipe(
    Schema.minLength(1, { message: () => "Target amount is required" })
  ),
  currentAmount: Schema.String,
  targetDate: Schema.String,
  icon: Schema.String,
});

export const GOAL_ICONS = [
  "🎯",
  "🏠",
  "🚗",
  "✈️",
  "💍",
  "🎓",
  "💰",
  "🏝️",
  "📱",
  "💻",
];
