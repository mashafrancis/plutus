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

export interface CountMetric {
  value: number
  previousValue: number
  change: number
}

export interface UpcomingRenewalsCount {
  thisWeek: number
  thisMonth: number
  totalAmount: number
}

export interface TopCategory {
  category: string
  amount: number
  percentage: number
}

export interface ComparisonMetric {
  change: number
  changePercent: number
  trend: 'up' | 'down' | 'neutral'
  message: string
}

export interface SummaryMetrics {
  totalMonthlyCost: MetricValue
  totalYearlyCost: MetricValue
  activeCount: CountMetric
  upcomingRenewalsCount: UpcomingRenewalsCount
  topSpendingCategory: TopCategory
  comparisonToLastMonth: ComparisonMetric
}

export interface PaymentRecord {
  id: string
  date: string
  amount: number
  status: 'paid' | 'pending' | 'failed'
}

export type SubscriptionStatus = 'active' | 'paused' | 'cancelled'
export type BillingCycle = 'monthly' | 'yearly' | 'weekly'

export interface Subscription {
  id: string
  name: string
  category: string
  amount: number
  billingCycle: BillingCycle
  nextPaymentDate: string
  status: SubscriptionStatus
  paymentMethodId: string
  startDate: string
  totalSpent: number
  paymentHistory: PaymentRecord[]
}

export interface Account {
  id: string
  name: string
  type: 'checking' | 'savings' | 'credit' | 'cash' | 'investment'
}

export interface FilterOptions {
  categories: string[]
  statuses: SubscriptionStatus[]
  billingCycles: BillingCycle[]
  accounts: Account[]
}

export interface SubscriptionsData {
  summaryMetrics: SummaryMetrics
  subscriptions: Subscription[]
  filterOptions: FilterOptions
}

// =============================================================================
// Component Props
// =============================================================================

export interface AmountRange {
  min?: number
  max?: number
}

export interface SubscriptionsFilters {
  category?: string
  status?: SubscriptionStatus
  billingCycle?: BillingCycle
  amountRange?: AmountRange
  search?: string
}

export interface SubscriptionsProps {
  /** The subscriptions data including summary metrics, subscriptions list, and filter options */
  data: SubscriptionsData
  /** Current filter state */
  filters?: SubscriptionsFilters
  /** Currently selected subscription IDs for bulk actions */
  selectedSubscriptionIds?: string[]
  /** Called when user wants to add a new subscription */
  onAddSubscription?: () => void
  /** Called when user wants to edit a subscription */
  onEditSubscription?: (subscriptionId: string) => void
  /** Called when user wants to pause a subscription */
  onPauseSubscription?: (subscriptionId: string) => void
  /** Called when user wants to resume a paused subscription */
  onResumeSubscription?: (subscriptionId: string) => void
  /** Called when user wants to cancel a subscription */
  onCancelSubscription?: (subscriptionId: string) => void
  /** Called when user wants to view payment history for a subscription */
  onViewHistory?: (subscriptionId: string) => void
  /** Called when user changes any filter */
  onFilterChange?: (filters: SubscriptionsFilters) => void
  /** Called when user selects/deselects subscriptions for bulk actions */
  onSelectionChange?: (subscriptionIds: string[]) => void
  /** Called when user performs a bulk action */
  onBulkAction?: (action: 'pause' | 'cancel' | 'changeCategory', subscriptionIds: string[], data?: any) => void
  /** Called when user sorts the table */
  onSort?: (column: string, direction: 'asc' | 'desc') => void
}

