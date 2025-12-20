import { Plus } from 'lucide-react'
import { Button } from '../../ui/button'
import { Card, CardContent } from '../../ui/card'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table'
import { InvestmentMetricCard } from './InvestmentMetricCard'
import { AllocationChart } from './AllocationChart'
import { PerformanceChart } from './PerformanceChart'
import { GainLossChart } from './GainLossChart'
import { SectorBreakdownChart } from './SectorBreakdownChart'
import { InvestmentFilterBar } from './InvestmentFilterBar'
import { InvestmentRow } from './InvestmentRow'
import type { InvestmentsProps } from '../types'

export function Investments({
  data,
  filters: initialFilters,
  onAddInvestment,
  onEditInvestment,
  onDeleteInvestment,
  onRecordTransaction,
  onUpdateValue,
  onViewHistory,
  onFilterChange,
  onSort,
}: InvestmentsProps) {
  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const getAccount = (accountId: string) => {
    return data.filterOptions.accounts.find(a => a.id === accountId)
  }

  return (
    <div className="container mx-auto p-6 space-y-6 font-geist-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 font-geist-sans">
          Investments
        </h1>
        <Button
          onClick={onAddInvestment}
          className="bg-blue-600 hover:bg-blue-700 text-white font-geist-sans"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Investment
        </Button>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        <InvestmentMetricCard
          label="Portfolio Value"
          value={data.summaryMetrics.totalPortfolioValue.value}
          previousValue={data.summaryMetrics.totalPortfolioValue.previousValue}
          change={data.summaryMetrics.totalPortfolioValue.change}
          changePercent={data.summaryMetrics.totalPortfolioValue.changePercent}
          trend={data.summaryMetrics.totalPortfolioValue.changePercent > 0 ? 'up' : data.summaryMetrics.totalPortfolioValue.changePercent < 0 ? 'down' : 'neutral'}
          formatValue={formatCurrency}
        />
        <InvestmentMetricCard
          label="Total Invested"
          value={data.summaryMetrics.totalInvested.value}
          previousValue={data.summaryMetrics.totalInvested.previousValue}
          change={data.summaryMetrics.totalInvested.change}
          changePercent={data.summaryMetrics.totalInvested.changePercent}
          trend="neutral"
          formatValue={formatCurrency}
        />
        <InvestmentMetricCard
          label="Total Gain/Loss"
          value={data.summaryMetrics.totalGainLoss.dollar}
          gainLoss={data.summaryMetrics.totalGainLoss}
          formatValue={formatCurrency}
        />
        <InvestmentMetricCard
          label="Today's Change"
          value={data.summaryMetrics.todayChange.dollar}
          todayChange={data.summaryMetrics.todayChange}
          formatValue={formatCurrency}
        />
        <InvestmentMetricCard
          label="Top Allocation"
          value=""
          assetAllocation={data.summaryMetrics.assetAllocation}
        />
        <InvestmentMetricCard
          label="Top Performer"
          value=""
          performer={data.summaryMetrics.topPerformer}
          isPerformer={true}
        />
        <InvestmentMetricCard
          label="Worst Performer"
          value=""
          performer={data.summaryMetrics.worstPerformer}
          isPerformer={true}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AllocationChart data={data.chartData.allocation} />
        <PerformanceChart data={data.chartData.performanceOverTime} />
        <GainLossChart data={data.chartData.gainLossByInvestment} />
        <SectorBreakdownChart data={data.chartData.sectorBreakdown} />
      </div>

      {/* Filter Bar */}
      <InvestmentFilterBar
        filters={initialFilters}
        filterOptions={data.filterOptions}
        onFilterChange={onFilterChange}
      />

      {/* Holdings Table */}
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-geist-sans">Name/Ticker</TableHead>
                <TableHead className="font-geist-sans">Asset Type</TableHead>
                <TableHead className="font-geist-sans">Shares</TableHead>
                <TableHead className="font-geist-sans">Cost Basis</TableHead>
                <TableHead className="font-geist-sans">Current Value</TableHead>
                <TableHead className="font-geist-sans">Gain/Loss</TableHead>
                <TableHead className="font-geist-sans">Today's Change</TableHead>
                <TableHead className="font-geist-sans">Allocation %</TableHead>
                <TableHead className="font-geist-sans">Account</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.investments.length === 0 ? (
                <TableRow>
                  <td colSpan={10} className="text-center py-8 text-neutral-500 dark:text-neutral-400 font-geist-sans">
                    No investments found
                  </td>
                </TableRow>
              ) : (
                data.investments.map((investment) => (
                  <InvestmentRow
                    key={investment.id}
                    investment={investment}
                    account={getAccount(investment.accountId)}
                    onEdit={onEditInvestment}
                    onDelete={onDeleteInvestment}
                    onRecordTransaction={onRecordTransaction}
                    onUpdateValue={onUpdateValue}
                    onViewHistory={onViewHistory}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

