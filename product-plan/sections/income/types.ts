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

export interface TopSource {
  source: string;
  amount: number;
  percentage: number;
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
  totalIncomeThisMonth: MetricValue;
  averageMonthlyIncome: MetricValue;
  topIncomeSource: TopSource;
  comparisonToLastMonth: ComparisonMetric;
  totalRecurringIncome: MetricValue;
  transactionCount: TransactionCount;
}

export interface Income {
  id: string;
  type: "income";
  amount: number;
  source: string;
  description: string;
  date: string;
  accountId: string;
  tags: string[];
  notes: string;
  recurring: boolean;
  recurringFrequency?:
    | "monthly"
    | "quarterly"
    | "yearly"
    | "weekly"
    | "semi-annual";
}

export interface Account {
  id: string;
  name: string;
  type: "checking" | "savings" | "credit" | "cash" | "investment";
}

export interface FilterOptions {
  sources: string[];
  accounts: Account[];
  tags: string[];
}

export interface IncomeData {
  summaryMetrics: SummaryMetrics;
  income: Income[];
  filterOptions: FilterOptions;
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

export interface IncomeFilters {
  dateRange?: DateRange;
  source?: string;
  account?: string;
  tags?: string[];
  amountRange?: AmountRange;
  recurring?: RecurringFilter;
  search?: string;
}

export interface IncomeProps {
  /** The income data including summary metrics, income list, and filter options */
  data: IncomeData;
  /** Current filter state */
  filters?: IncomeFilters;
  /** Currently selected income IDs for bulk actions */
  selectedIncomeIds?: string[];
  /** Called when user wants to add a new income entry */
  onAddIncome?: () => void;
  /** Called when user wants to edit an income entry */
  onEditIncome?: (incomeId: string) => void;
  /** Called when user wants to delete an income entry */
  onDeleteIncome?: (incomeId: string) => void;
  /** Called when user changes any filter */
  onFilterChange?: (filters: IncomeFilters) => void;
  /** Called when user selects/deselects income entries for bulk actions */
  onSelectionChange?: (incomeIds: string[]) => void;
  /** Called when user performs a bulk action */
  onBulkAction?: (
    action: "delete" | "changeSource" | "addTags",
    incomeIds: string[],
    data?: any
  ) => void;
  /** Called when user sorts the table */
  onSort?: (column: string, direction: "asc" | "desc") => void;
}
