// =============================================================================
// Data Types
// =============================================================================

export type AccountType =
  | "checking"
  | "savings"
  | "credit"
  | "cash"
  | "investment";

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  currentBalance: number;
  isDefault: boolean;
  isArchived: boolean;
  notes?: string;
}

export type CategoryType = "expense" | "income";

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: CategoryType;
  parentId: string | null;
  isArchived: boolean;
  isDefault: boolean;
  notes?: string;
}

export interface Tag {
  id: string;
  name: string;
  usageCount: number;
}

export type BudgetPeriod = "monthly" | "weekly" | "quarterly" | "yearly";
export type AlertThresholdType = "percentage" | "dollar";

export interface Budget {
  id: string;
  categoryId: string | null;
  categoryName: string;
  limit: number;
  currentSpending: number;
  period: BudgetPeriod;
  rolloverEnabled: boolean;
  recurringEnabled: boolean;
  alertThreshold: number;
  alertThresholdType: AlertThresholdType;
}

export type ThemePreference = "light" | "dark" | "system";
export type Currency = "USD" | "EUR" | "GBP" | "JPY" | "CAD" | "AUD";
export type DateFormat = "MM/DD/YYYY" | "DD/MM/YYYY" | "YYYY-MM-DD";

export interface EmailNotifications {
  enabled: boolean;
  budgetAlerts: boolean;
  subscriptionReminders: boolean;
  weeklySummary: boolean;
  monthlyReport: boolean;
}

export interface InAppNotifications {
  enabled: boolean;
  budgetAlerts: boolean;
  subscriptionReminders: boolean;
  insights: boolean;
}

export type InsightType =
  | "spendingAnomalies"
  | "subscriptionRatio"
  | "savingsRate"
  | "topCategories"
  | "budgetProgress"
  | "incomeTrends"
  | "expenseTrends";

export interface Preferences {
  theme: ThemePreference;
  currency: Currency;
  dateFormat: DateFormat;
  emailNotifications: EmailNotifications;
  inAppNotifications: InAppNotifications;
  subscriptionReminderDays: number;
  enabledInsights: InsightType[];
}

export interface Profile {
  name: string;
  email: string;
  avatarUrl: string | null;
}

export interface SettingsData {
  accounts: Account[];
  categories: Category[];
  tags: Tag[];
  budgets: Budget[];
  preferences: Preferences;
  profile: Profile;
}

// =============================================================================
// Component Props
// =============================================================================

export type SettingsTab = "financial" | "budgets" | "general";

export interface SettingsProps {
  /** The settings data including accounts, categories, tags, budgets, preferences, and profile */
  data: SettingsData;
  /** Currently active tab */
  activeTab?: SettingsTab;
  /** Called when user switches tabs */
  onTabChange?: (tab: SettingsTab) => void;
  /** Called when user wants to add a new account */
  onAddAccount?: () => void;
  /** Called when user wants to edit an account */
  onEditAccount?: (accountId: string) => void;
  /** Called when user wants to delete an account */
  onDeleteAccount?: (accountId: string) => void;
  /** Called when user wants to archive/unarchive an account */
  onArchiveAccount?: (accountId: string, archived: boolean) => void;
  /** Called when user sets an account as default */
  onSetDefaultAccount?: (accountId: string) => void;
  /** Called when user updates account balance */
  onUpdateAccountBalance?: (accountId: string, balance: number) => void;
  /** Called when user wants to add a new category */
  onAddCategory?: () => void;
  /** Called when user wants to edit a category */
  onEditCategory?: (categoryId: string) => void;
  /** Called when user wants to delete a category */
  onDeleteCategory?: (categoryId: string) => void;
  /** Called when user wants to archive/unarchive a category */
  onArchiveCategory?: (categoryId: string, archived: boolean) => void;
  /** Called when user wants to add a new tag */
  onAddTag?: () => void;
  /** Called when user wants to edit a tag */
  onEditTag?: (tagId: string) => void;
  /** Called when user wants to delete a tag */
  onDeleteTag?: (tagId: string) => void;
  /** Called when user wants to merge two tags */
  onMergeTags?: (sourceTagId: string, targetTagId: string) => void;
  /** Called when user wants to add a new budget */
  onAddBudget?: () => void;
  /** Called when user wants to edit a budget */
  onEditBudget?: (budgetId: string) => void;
  /** Called when user wants to delete a budget */
  onDeleteBudget?: (budgetId: string) => void;
  /** Called when user updates budget settings */
  onUpdateBudget?: (budgetId: string, updates: Partial<Budget>) => void;
  /** Called when user updates preferences */
  onUpdatePreferences?: (updates: Partial<Preferences>) => void;
  /** Called when user updates profile */
  onUpdateProfile?: (updates: Partial<Profile>) => void;
  /** Called when user wants to export data */
  onExportData?: (
    format: "csv" | "json" | "pdf",
    options?: ExportOptions
  ) => void;
  /** Called when user wants to import data */
  onImportData?: (format: "csv" | "json", file: File) => void;
  /** Called when user wants to delete all data */
  onDeleteAllData?: () => void;
}

export interface ExportOptions {
  dateRange?: {
    from: string;
    to: string;
  };
  sections?: (
    | "expenses"
    | "income"
    | "subscriptions"
    | "investments"
    | "all"
  )[];
}
