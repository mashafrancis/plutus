import { Schema } from "effect";

export const AccountId = Schema.String.pipe(Schema.brand("AccountId"));
export type AccountId = Schema.Schema.Type<typeof AccountId>;

export const CategoryId = Schema.String.pipe(Schema.brand("CategoryId"));
export type CategoryId = Schema.Schema.Type<typeof CategoryId>;

export const TagId = Schema.String.pipe(Schema.brand("TagId"));
export type TagId = Schema.Schema.Type<typeof TagId>;

export const BudgetId = Schema.String.pipe(Schema.brand("BudgetId"));
export type BudgetId = Schema.Schema.Type<typeof BudgetId>;

// Account Schemas
export const CreateAccountSchema = Schema.Struct({
  name: Schema.String,
  type: Schema.String, // checking, savings, credit, cash, investment
  currentBalance: Schema.String,
  currency: Schema.optional(Schema.String),
  notes: Schema.optional(Schema.String),
});

export type CreateAccountSchema = Schema.Schema.Type<
  typeof CreateAccountSchema
>;

export const UpdateAccountSchema = Schema.Struct({
  id: AccountId,
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  currentBalance: Schema.optional(Schema.String),
  currency: Schema.optional(Schema.String),
  notes: Schema.optional(Schema.String),
  isDefault: Schema.optional(Schema.Boolean),
  isArchived: Schema.optional(Schema.Boolean),
});

export type UpdateAccountSchema = Schema.Schema.Type<
  typeof UpdateAccountSchema
>;

export const UpdateAccountBalanceSchema = Schema.Struct({
  id: AccountId,
  balance: Schema.String,
});

export type UpdateAccountBalanceSchema = Schema.Schema.Type<
  typeof UpdateAccountBalanceSchema
>;

export const ArchiveAccountSchema = Schema.Struct({
  id: AccountId,
  archived: Schema.Boolean,
});

export type ArchiveAccountSchema = Schema.Schema.Type<
  typeof ArchiveAccountSchema
>;

export const SetDefaultAccountSchema = Schema.Struct({
  id: AccountId,
});

export type SetDefaultAccountSchema = Schema.Schema.Type<
  typeof SetDefaultAccountSchema
>;

// Category Schemas
export const CreateCategorySchema = Schema.Struct({
  name: Schema.String,
  icon: Schema.optional(Schema.String),
  color: Schema.optional(Schema.String),
  type: Schema.String, // expense, income
  parentId: Schema.optional(Schema.String),
  notes: Schema.optional(Schema.String),
});

export type CreateCategorySchema = Schema.Schema.Type<
  typeof CreateCategorySchema
>;

export const UpdateCategorySchema = Schema.Struct({
  id: CategoryId,
  name: Schema.optional(Schema.String),
  icon: Schema.optional(Schema.String),
  color: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  parentId: Schema.optional(Schema.String),
  notes: Schema.optional(Schema.String),
});

export type UpdateCategorySchema = Schema.Schema.Type<
  typeof UpdateCategorySchema
>;

export const ArchiveCategorySchema = Schema.Struct({
  id: CategoryId,
  archived: Schema.Boolean,
});

export type ArchiveCategorySchema = Schema.Schema.Type<
  typeof ArchiveCategorySchema
>;

// Tag Schemas
export const CreateTagSchema = Schema.Struct({
  name: Schema.String,
});

export type CreateTagSchema = Schema.Schema.Type<typeof CreateTagSchema>;

export const UpdateTagSchema = Schema.Struct({
  id: TagId,
  name: Schema.String,
});

export type UpdateTagSchema = Schema.Schema.Type<typeof UpdateTagSchema>;

export const MergeTagsSchema = Schema.Struct({
  sourceTagId: TagId,
  targetTagId: TagId,
});

export type MergeTagsSchema = Schema.Schema.Type<typeof MergeTagsSchema>;

// Budget Schemas
export const CreateBudgetSchema = Schema.Struct({
  categoryId: Schema.optional(Schema.String),
  limit: Schema.String,
  period: Schema.String, // monthly, weekly, quarterly, yearly
  rolloverEnabled: Schema.optional(Schema.Boolean),
  recurringEnabled: Schema.optional(Schema.Boolean),
  alertThreshold: Schema.optional(Schema.Number),
  alertThresholdType: Schema.optional(Schema.String), // percentage, dollar
});

export type CreateBudgetSchema = Schema.Schema.Type<typeof CreateBudgetSchema>;

export const UpdateBudgetSchema = Schema.Struct({
  id: BudgetId,
  categoryId: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.String),
  period: Schema.optional(Schema.String),
  rolloverEnabled: Schema.optional(Schema.Boolean),
  recurringEnabled: Schema.optional(Schema.Boolean),
  alertThreshold: Schema.optional(Schema.Number),
  alertThresholdType: Schema.optional(Schema.String),
});

export type UpdateBudgetSchema = Schema.Schema.Type<typeof UpdateBudgetSchema>;

// Preferences Schemas
export const UpdatePreferencesSchema = Schema.Struct({
  theme: Schema.optional(Schema.String),
  currency: Schema.optional(Schema.String),
  dateFormat: Schema.optional(Schema.String),
  emailNotificationsEnabled: Schema.optional(Schema.Boolean),
  emailBudgetAlerts: Schema.optional(Schema.Boolean),
  emailSubscriptionReminders: Schema.optional(Schema.Boolean),
  emailWeeklySummary: Schema.optional(Schema.Boolean),
  emailMonthlyReport: Schema.optional(Schema.Boolean),
  inAppNotificationsEnabled: Schema.optional(Schema.Boolean),
  inAppBudgetAlerts: Schema.optional(Schema.Boolean),
  inAppSubscriptionReminders: Schema.optional(Schema.Boolean),
  inAppInsights: Schema.optional(Schema.Boolean),
  subscriptionReminderDays: Schema.optional(Schema.Number),
  enabledInsights: Schema.optional(Schema.Array(Schema.String)),
});

export type UpdatePreferencesSchema = Schema.Schema.Type<
  typeof UpdatePreferencesSchema
>;

// Profile Schemas
export const UpdateProfileSchema = Schema.Struct({
  name: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  avatarUrl: Schema.optional(Schema.String),
});

export type UpdateProfileSchema = Schema.Schema.Type<
  typeof UpdateProfileSchema
>;

// Export/Import Schemas
export const ExportDataSchema = Schema.Struct({
  format: Schema.String, // csv, json, pdf
  dateRange: Schema.optional(
    Schema.Struct({
      from: Schema.optional(Schema.String),
      to: Schema.optional(Schema.String),
    })
  ),
  sections: Schema.optional(Schema.Array(Schema.String)),
});

export type ExportDataSchema = Schema.Schema.Type<typeof ExportDataSchema>;

export const ImportDataSchema = Schema.Struct({
  format: Schema.String, // csv, json
  file: Schema.String, // base64 encoded file content
});

export type ImportDataSchema = Schema.Schema.Type<typeof ImportDataSchema>;

// Input schemas object for tRPC
export const SettingsInputs = {
  createAccount: CreateAccountSchema,
  updateAccount: UpdateAccountSchema,
  updateAccountBalance: UpdateAccountBalanceSchema,
  archiveAccount: ArchiveAccountSchema,
  setDefaultAccount: SetDefaultAccountSchema,
  createCategory: CreateCategorySchema,
  updateCategory: UpdateCategorySchema,
  archiveCategory: ArchiveCategorySchema,
  createTag: CreateTagSchema,
  updateTag: UpdateTagSchema,
  mergeTags: MergeTagsSchema,
  createBudget: CreateBudgetSchema,
  updateBudget: UpdateBudgetSchema,
  updatePreferences: UpdatePreferencesSchema,
  updateProfile: UpdateProfileSchema,
  exportData: ExportDataSchema,
  importData: ImportDataSchema,
} as const;
