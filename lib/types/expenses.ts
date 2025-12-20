// =============================================================================
// Data Types
// =============================================================================

export interface MetricValue {
  value: number;
  previousValue: number;
  change: number;
  changePercent: number;
  trend: "up" | "down" | "neutral";
}

export interface TopCategory {
  category: string;
  amount: number;
  percentage: number;
}

export interface BudgetProgressMetric {
  totalSpent: number;
  totalBudget: number;
  percentage: number;
  status: "good" | "warning" | "over";
}

export interface ComparisonMetric {
  change: number;
  changePercent: number;
  trend: "up" | "down" | "neutral";
  message: string;
}

export interface TransactionCount {
  thisMonth: number;
  lastMonth: number;
  change: number;
}

export interface SummaryMetrics {
  totalSpendingThisMonth: MetricValue;
  averageDailySpending: MetricValue;
  topSpendingCategory: TopCategory;
  budgetProgress: BudgetProgressMetric;
  comparisonToLastMonth: ComparisonMetric;
  transactionCount: TransactionCount;
}

export interface Expense {
  id: string;
  type: "expense";
  amount: number;
  category: string;
  description: string;
  date: string;
  accountId: string;
  tags: string[];
  notes: string;
  recurring: boolean;
  recurringFrequency?: "monthly" | "quarterly" | "yearly" | "weekly";
}

export interface BudgetProgress {
  category: string;
  spent: number;
  target: number;
  percentage: number;
  status: "good" | "warning" | "over";
}

export interface Account {
  id: string;
  name: string;
  type: "checking" | "savings" | "credit" | "cash" | "investment";
}

export interface FilterOptions {
  categories: string[];
  accounts: Account[];
  tags: string[];
  tagIds?: string[]; // Optional tag IDs for modal use
}

export interface ExpensesData {
  summaryMetrics: SummaryMetrics;
  expenses: Expense[];
  filterOptions: FilterOptions;
  budgetProgress: BudgetProgress[];
}

// =============================================================================
// Component Props
// =============================================================================

export type RecurringFilter = "all" | "recurring" | "one-time";

export interface DateRange {
  from: string;
  to: string;
}

export interface AmountRange {
  min?: number;
  max?: number;
}

export interface ExpensesFilters {
  dateRange?: DateRange;
  category?: string;
  account?: string;
  tags?: string[];
  amountRange?: AmountRange;
  recurring?: RecurringFilter;
  search?: string;
}

export interface ExpensesProps {
  /** The expenses data including summary metrics, expenses list, and filter options */
  data: ExpensesData;
  /** Current filter state */
  filters?: ExpensesFilters;
  /** Currently selected expense IDs for bulk actions */
  selectedExpenseIds?: string[];
  /** Called when user wants to add a new expense */
  onAddExpense?: () => void;
  /** Called when user wants to edit an expense */
  onEditExpense?: (expenseId: string) => void;
  /** Called when user wants to delete an expense */
  onDeleteExpense?: (expenseId: string) => void;
  /** Called when user changes any filter */
  onFilterChange?: (filters: ExpensesFilters) => void;
  /** Called when user selects/deselects expenses for bulk actions */
  onSelectionChange?: (expenseIds: string[]) => void;
  /** Called when user performs a bulk action */
  onBulkAction?: (
    action: "delete" | "changeCategory" | "addTags",
    expenseIds: string[],
    data?: any
  ) => void;
  /** Called when user sorts the table */
  onSort?: (column: string, direction: "asc" | "desc") => void;
  /** User's currency for formatting */
  currency?: string;
  /** User's locale for formatting */
  locale?: string;
}
