// =============================================================================
// Core Entity Types for Plutus Finance App
// =============================================================================

export type AccountType =
  | "checking"
  | "savings"
  | "credit"
  | "cash"
  | "investment";

export interface FinancialAccount {
  id: string;
  name: string;
  type: AccountType;
  currentBalance?: number;
  balance?: number;
  currency?: string;
  isDefault?: boolean;
  isArchived?: boolean;
  notes?: string;
}

export interface Transaction {
  id: string;
  type: "expense" | "income";
  amount: number;
  category: string;
  description: string;
  date: string;
  accountId: string;
  tags: string[];
  notes?: string;
  recurring?: boolean;
  recurringFrequency?:
    | "monthly"
    | "quarterly"
    | "yearly"
    | "weekly"
    | "semi-annual";
}

export type CategoryType = "expense" | "income";

export interface Category {
  id: string;
  name: string;
  icon?: string;
  color?: string;
  type: CategoryType;
  parentId?: string | null;
  isArchived?: boolean;
  isDefault?: boolean;
  notes?: string;
}

export interface Subscription {
  id: string;
  name: string;
  category: string;
  amount: number;
  billingCycle: "monthly" | "yearly" | "weekly";
  nextPaymentDate: string;
  status: "active" | "paused" | "cancelled";
  paymentMethodId: string;
  startDate: string;
  totalSpent: number;
  paymentHistory?: Array<{
    id: string;
    date: string;
    amount: number;
    status: "paid" | "pending" | "failed";
  }>;
  frequency?: "monthly" | "yearly" | "weekly";
  accountId?: string;
}

export type AssetType =
  | "Stocks"
  | "ETFs"
  | "Crypto"
  | "Bonds"
  | "Savings"
  | "Retirement"
  | "Real Estate"
  | "Other"
  | "stocks"
  | "etfs"
  | "crypto"
  | "bonds"
  | "savings"
  | "retirement"
  | "real-estate"
  | "other";

export interface Investment {
  id: string;
  name: string;
  ticker?: string;
  type: AssetType;
  shares?: number;
  costBasis: number;
  currentPrice?: number;
  currentValue: number;
  gainLossAmount?: number;
  gainLossDollar?: number;
  gainLossPercent: number;
  todayChangeAmount?: number;
  todayChangeDollar?: number;
  todayChangePercent?: number;
  allocationPercent: number;
  accountId: string;
  tags?: string[];
  notes?: string;
  sector?: string;
  transactionHistory: Array<{
    id: string;
    date: string;
    type: "buy" | "sell" | "dividend" | "deposit" | "withdrawal";
    shares?: number;
    price?: number;
    total: number;
    notes?: string;
  }>;
}

export interface Liability {
  id: string;
  name: string;
  type: string;
  balance: number;
  interestRate?: number;
  minimumPayment?: number;
  accountId: string;
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

export interface Tag {
  id: string;
  name: string;
  usageCount?: number;
}

export type InsightType =
  | "spendingAnomalies"
  | "subscriptionRatio"
  | "savingsRate"
  | "topCategories"
  | "budgetProgress"
  | "incomeTrends"
  | "expenseTrends"
  | "spending_anomaly"
  | "savings_trend"
  | "investment_performance"
  | "budget_warning";

export type InsightSeverity =
  | "info"
  | "warning"
  | "success"
  | "error"
  | "critical";

export interface Insight {
  id: string;
  type: InsightType;
  title: string;
  message: string;
  severity: InsightSeverity;
  category?: string;
  actionLabel?: string;
  dismissed?: boolean;
  date?: string;
  relatedEntityIds?: string[];
}
