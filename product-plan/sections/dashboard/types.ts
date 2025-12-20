// =============================================================================
// Data Types
// =============================================================================

export interface MetricValue {
  value: number
  previousValue: number
  change: number
  changePercent: number
  trend: 'up' | 'down' | 'neutral'
}

export interface Metrics {
  netWorth: MetricValue
  monthlyCashFlow: MetricValue
  totalBalance: MetricValue
  savingsRate: MetricValue
  monthlySpending: MetricValue
  monthlyIncome: MetricValue
}

export interface CashFlowDataPoint {
  month: string
  income: number
  expenses: number
}

export interface NetWorthDataPoint {
  month: string
  value: number
}

export interface CategorySpending {
  category: string
  amount: number
  color: string
}

export interface IncomeBySource {
  source: string
  amount: number
}

export interface BudgetProgress {
  category: string
  spent: number
  target: number
  percentage: number
}

export interface InvestmentHolding {
  name: string
  value: number
  gain: number
  gainPercent: number
}

export interface InvestmentPerformance {
  totalValue: number
  totalCostBasis: number
  totalGain: number
  gainPercent: number
  monthlyChange: number
  monthlyChangePercent: number
  holdings: InvestmentHolding[]
}

export interface Subscription {
  id: string
  name: string
  amount: number
  nextPaymentDate: string
  frequency: 'monthly' | 'yearly' | 'weekly'
  accountId: string
}

export interface Transaction {
  id: string
  type: 'expense' | 'income'
  amount: number
  category: string
  description: string
  date: string
  accountId: string
  tags: string[]
}

export type InsightType = 'spending_anomaly' | 'savings_trend' | 'subscription_ratio' | 'budget_warning' | 'investment_performance'
export type InsightSeverity = 'info' | 'warning' | 'success' | 'error'

export interface Insight {
  id: string
  type: InsightType
  title: string
  message: string
  severity: InsightSeverity
  category?: string
  actionLabel: string
  dismissed: boolean
}

export type AccountType = 'checking' | 'savings' | 'credit' | 'investment' | 'cash'

export interface Account {
  id: string
  name: string
  type: AccountType
  balance: number
  currency: string
}

export interface DashboardData {
  metrics: Metrics
  cashFlowData: CashFlowDataPoint[]
  netWorthData: NetWorthDataPoint[]
  spendingByCategory: CategorySpending[]
  incomeBySource: IncomeBySource[]
  budgetProgress: BudgetProgress[]
  investmentPerformance: InvestmentPerformance
  upcomingSubscriptions: Subscription[]
  recentTransactions: Transaction[]
  insights: Insight[]
  accounts: Account[]
}

// =============================================================================
// Component Props
// =============================================================================

export type Timeframe = 'week' | 'month' | 'quarter' | 'year' | 'custom'

export interface DashboardProps {
  /** The dashboard data including metrics, charts, and activity */
  data: DashboardData
  /** Currently selected timeframe for viewing data */
  timeframe?: Timeframe
  /** Called when user wants to add a new expense */
  onAddExpense?: () => void
  /** Called when user wants to add a new income entry */
  onAddIncome?: () => void
  /** Called when user wants to view detailed reports */
  onViewReports?: () => void
  /** Called when user dismisses an insight */
  onDismissInsight?: (insightId: string) => void
  /** Called when user changes the timeframe selector */
  onTimeframeChange?: (timeframe: Timeframe) => void
  /** Called when user clicks on a transaction to view details */
  onViewTransaction?: (transactionId: string) => void
  /** Called when user clicks on a subscription to view details */
  onViewSubscription?: (subscriptionId: string) => void
  /** Called when user clicks on a category in spending chart */
  onViewCategory?: (category: string) => void
  /** Called when user clicks on a budget to view details */
  onViewBudget?: (category: string) => void
}

