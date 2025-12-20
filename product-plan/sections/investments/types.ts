// =============================================================================
// Data Types
// =============================================================================

export interface MetricValue {
  value: number
  previousValue: number
  change: number
  changePercent: number
}

export interface GainLoss {
  dollar: number
  percent: number
  trend?: 'up' | 'down' | 'neutral'
}

export interface TodayChange {
  dollar: number
  percent: number
  trend?: 'up' | 'down' | 'neutral'
}

export interface AssetAllocation {
  stocks: number
  etfs: number
  crypto: number
  retirement: number
  bonds: number
  savings: number
  realEstate: number
}

export interface Performer {
  name: string
  ticker: string
  gainLossPercent: number
  gainLossDollar: number
}

export interface SummaryMetrics {
  totalPortfolioValue: MetricValue
  totalInvested: MetricValue
  totalGainLoss: GainLoss
  todayChange: TodayChange
  assetAllocation: AssetAllocation
  topPerformer: Performer
  worstPerformer: Performer
}

export type AssetType = 'stocks' | 'etfs' | 'crypto' | 'bonds' | 'savings' | 'retirement' | 'real-estate' | 'other'

export interface TransactionRecord {
  id: string
  date: string
  type: 'buy' | 'sell'
  shares: number
  price: number
  total: number
}

export interface Investment {
  id: string
  name: string
  ticker: string
  assetType: AssetType
  shares: number
  costBasis: number
  currentValue: number
  gainLossDollar: number
  gainLossPercent: number
  todayChangeDollar: number
  todayChangePercent: number
  allocationPercent: number
  accountId: string
  sector: string
  transactionHistory: TransactionRecord[]
  note?: string
}

export interface Account {
  id: string
  name: string
  type: 'checking' | 'savings' | 'credit' | 'cash' | 'investment'
}

export interface FilterOptions {
  assetTypes: AssetType[]
  accounts: Account[]
  gainLossStatuses: ('all' | 'winners' | 'losers')[]
}

export interface AllocationData {
  type: string
  percentage: number
  value: number
}

export interface PerformanceDataPoint {
  date: string
  value: number
}

export interface GainLossData {
  name: string
  ticker: string
  gainLossDollar: number
  gainLossPercent: number
}

export interface SectorBreakdown {
  sector: string
  percentage: number
  value: number
}

export interface ChartData {
  allocation: AllocationData[]
  performanceOverTime: PerformanceDataPoint[]
  gainLossByInvestment: GainLossData[]
  sectorBreakdown: SectorBreakdown[]
}

export interface InvestmentsData {
  summaryMetrics: SummaryMetrics
  investments: Investment[]
  filterOptions: FilterOptions
  chartData: ChartData
}

// =============================================================================
// Component Props
// =============================================================================

export type GainLossFilter = 'all' | 'winners' | 'losers'

export interface InvestmentsFilters {
  assetType?: AssetType
  account?: string
  gainLossStatus?: GainLossFilter
  search?: string
}

export interface InvestmentsProps {
  /** The investments data including summary metrics, investments list, filter options, and chart data */
  data: InvestmentsData
  /** Current filter state */
  filters?: InvestmentsFilters
  /** Called when user wants to add a new investment */
  onAddInvestment?: () => void
  /** Called when user wants to edit an investment */
  onEditInvestment?: (investmentId: string) => void
  /** Called when user wants to delete an investment */
  onDeleteInvestment?: (investmentId: string) => void
  /** Called when user wants to record a buy/sell transaction for an investment */
  onRecordTransaction?: (investmentId: string) => void
  /** Called when user wants to manually update the current value of an investment */
  onUpdateValue?: (investmentId: string) => void
  /** Called when user wants to view transaction history for an investment */
  onViewHistory?: (investmentId: string) => void
  /** Called when user changes any filter */
  onFilterChange?: (filters: InvestmentsFilters) => void
  /** Called when user sorts the table */
  onSort?: (column: string, direction: 'asc' | 'desc') => void
}

