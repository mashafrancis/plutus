import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// ============ USER PROFILE ============
export const UserProfile = {
  userId: v.string(),
  name: v.optional(v.string()),
  avatar: v.optional(v.string()),
};

// ============ CATEGORIES ============
export const Category = {
  userId: v.string(),
  name: v.string(),
  icon: v.string(),
  color: v.string(),
  type: v.union(v.literal("expense"), v.literal("income")),
  isDefault: v.boolean(),
};

// ============ ACCOUNTS ============
export const Account = {
  userId: v.string(),
  name: v.string(),
  type: v.union(
    v.literal("checking"),
    v.literal("savings"),
    v.literal("credit"),
    v.literal("cash"),
    v.literal("investment")
  ),
  currency: v.string(), // ISO 4217 code (USD, EUR, etc)
  balance: v.number(),
  isArchived: v.boolean(),
  icon: v.optional(v.string()),
  color: v.optional(v.string()),
};

// ============ TRANSACTIONS ============
export const Transaction = {
  userId: v.string(),
  accountId: v.id("accounts"),
  categoryId: v.id("categories"),
  type: v.union(
    v.literal("expense"),
    v.literal("income"),
    v.literal("transfer")
  ),
  amount: v.number(), // Always positive, type determines direction
  currency: v.string(),
  convertedAmount: v.number(), // Amount in account's currency
  description: v.string(),
  date: v.number(), // Unix timestamp
  subscriptionId: v.optional(v.id("subscriptions")),
  // For transfers
  toAccountId: v.optional(v.id("accounts")),
  notes: v.optional(v.string()),
};

// ============ SUBSCRIPTIONS ============
export const Subscription = {
  userId: v.string(),
  name: v.string(),
  accountId: v.id("accounts"),
  categoryId: v.id("categories"),
  amount: v.number(),
  currency: v.string(),
  frequency: v.union(
    v.literal("daily"),
    v.literal("weekly"),
    v.literal("monthly"),
    v.literal("quarterly"),
    v.literal("yearly")
  ),
  startDate: v.number(),
  nextRenewalDate: v.number(),
  status: v.union(
    v.literal("active"),
    v.literal("paused"),
    v.literal("cancelled")
  ),
  description: v.optional(v.string()),
  notifyDaysBefore: v.number(), // Days before renewal to notify
  autoRenew: v.boolean(),
};

// ============ INVESTMENTS ============
export const Investment = {
  userId: v.string(),
  name: v.string(),
  type: v.union(
    v.literal("stock"),
    v.literal("etf"),
    v.literal("crypto"),
    v.literal("mutual_fund"),
    v.literal("bond"),
    v.literal("real_estate"),
    v.literal("other")
  ),
  symbol: v.optional(v.string()), // Ticker symbol if applicable
  quantity: v.number(),
  purchasePrice: v.number(), // Price per unit at purchase
  currentPrice: v.number(), // Current price per unit
  currency: v.string(),
  purchaseDate: v.number(),
  accountId: v.optional(v.id("accounts")), // Optional link to investment account
  notes: v.optional(v.string()),
};

// ============ INVESTMENT SNAPSHOTS ============
export const InvestmentSnapshot = {
  investmentId: v.id("investments"),
  userId: v.string(),
  price: v.number(),
  totalValue: v.number(),
  date: v.number(), // Unix timestamp (start of day)
};

// ============ GOALS ============
export const Goal = {
  userId: v.string(),
  name: v.string(),
  targetAmount: v.number(),
  currentAmount: v.number(),
  currency: v.string(),
  targetDate: v.optional(v.number()),
  accountId: v.optional(v.id("accounts")), // Track specific account balance
  icon: v.optional(v.string()),
  color: v.optional(v.string()),
  isCompleted: v.boolean(),
};

// ============ EXCHANGE RATES ============
export const ExchangeRate = {
  baseCurrency: v.string(),
  targetCurrency: v.string(),
  rate: v.number(),
  timestamp: v.number(),
};

// ============ USER SETTINGS ============
export const UserSettings = {
  userId: v.string(),
  baseCurrency: v.string(),
  defaultAccountId: v.optional(v.id("accounts")),
  notificationsEnabled: v.boolean(),
  emailNotifications: v.boolean(),
  dashboardDateRange: v.number(), // Days to show on dashboard (default 30)
  onboardingCompleted: v.boolean(),
  onboardingStep: v.number(), // Current step in onboarding wizard (0-4)
};

// ============ NOTIFICATIONS ============
export const Notification = {
  userId: v.string(),
  type: v.union(
    v.literal("subscription_renewal"),
    v.literal("goal_reached"),
    v.literal("budget_exceeded"),
    v.literal("general")
  ),
  title: v.string(),
  message: v.string(),
  isRead: v.boolean(),
  createdAt: v.number(),
  relatedId: v.optional(v.string()), // ID of related entity
};

// ============ ACTIVITY FEED ============
export const Activity = {
  userId: v.string(),
  type: v.string(), // e.g. "create_account", "delete_transaction"
  entityId: v.string(),
  entityType: v.string(), // "account", "transaction", "investment"
  description: v.string(),
  timestamp: v.number(),
  metadata: v.optional(v.any()),
};

export const confectSchema = defineSchema({
  userProfiles: defineTable(UserProfile).index("by_userId", ["userId"]),

  categories: defineTable(Category)
    .index("by_userId", ["userId"])
    .index("by_userId_type", ["userId", "type"]),

  accounts: defineTable(Account)
    .index("by_userId", ["userId"])
    .index("by_userId_archived", ["userId", "isArchived"]),

  transactions: defineTable(Transaction)
    .index("by_userId", ["userId"])
    .index("by_userId_date", ["userId", "date"])
    .index("by_accountId", ["accountId"])
    .index("by_categoryId", ["categoryId"])
    .index("by_subscriptionId", ["subscriptionId"]),

  subscriptions: defineTable(Subscription)
    .index("by_userId", ["userId"])
    .index("by_userId_status", ["userId", "status"])
    .index("by_nextRenewalDate", ["nextRenewalDate"]),

  investments: defineTable(Investment)
    .index("by_userId", ["userId"])
    .index("by_accountId", ["accountId"]),

  investmentSnapshots: defineTable(InvestmentSnapshot)
    .index("by_investmentId", ["investmentId"])
    .index("by_userId_date", ["userId", "date"]),

  goals: defineTable(Goal)
    .index("by_userId", ["userId"])
    .index("by_userId_completed", ["userId", "isCompleted"]),

  exchangeRates: defineTable(ExchangeRate).index("by_currencies", [
    "baseCurrency",
    "targetCurrency",
  ]),

  userSettings: defineTable(UserSettings).index("by_userId", ["userId"]),

  notifications: defineTable(Notification)
    .index("by_userId", ["userId"])
    .index("by_userId_unread", ["userId", "isRead"]),

  activities: defineTable(Activity).index("by_userId", ["userId"]),
});

export default confectSchema;
