import { useState, useRef, useEffect } from 'react'
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
import { SubscriptionMetricCard } from './SubscriptionMetricCard'
import { UpcomingRenewalCard } from './UpcomingRenewalCard'
import { SubscriptionFilterBar } from './SubscriptionFilterBar'
import { SubscriptionRow } from './SubscriptionRow'
import { BulkActionBar } from './BulkActionBar'
import type { SubscriptionsProps } from '../types'

function SelectAllCheckbox({
  checked,
  indeterminate,
  onChange,
}: {
  checked: boolean
  indeterminate: boolean
  onChange: (checked: boolean) => void
}) {
  const checkboxRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate
    }
  }, [indeterminate])

  return (
    <input
      ref={checkboxRef}
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="h-4 w-4 rounded border-neutral-300 dark:border-neutral-700 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400 cursor-pointer"
    />
  )
}

export function Subscriptions({
  data,
  filters: initialFilters,
  selectedSubscriptionIds: initialSelectedIds = [],
  onAddSubscription,
  onEditSubscription,
  onPauseSubscription,
  onResumeSubscription,
  onCancelSubscription,
  onViewHistory,
  onFilterChange,
  onSelectionChange,
  onBulkAction,
  onSort,
}: SubscriptionsProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelectedIds)
  const [filters, setFilters] = useState(initialFilters || {})

  const handleSelect = (subscriptionId: string, selected: boolean) => {
    const newSelection = selected
      ? [...selectedIds, subscriptionId]
      : selectedIds.filter(id => id !== subscriptionId)
    setSelectedIds(newSelection)
    onSelectionChange?.(newSelection)
  }

  const handleSelectAll = (checked: boolean) => {
    const newSelection = checked ? data.subscriptions.map(s => s.id) : []
    setSelectedIds(newSelection)
    onSelectionChange?.(newSelection)
  }

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const handleBulkAction = (action: 'pause' | 'cancel' | 'changeCategory') => {
    onBulkAction?.(action, selectedIds)
    if (action === 'cancel') {
      setSelectedIds([])
      onSelectionChange?.([])
    }
  }

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const allSelected = selectedIds.length === data.subscriptions.length && data.subscriptions.length > 0
  const someSelected = selectedIds.length > 0 && selectedIds.length < data.subscriptions.length

  const getAccount = (accountId: string) => {
    return data.filterOptions.accounts.find(a => a.id === accountId)
  }

  return (
    <div className="container mx-auto p-6 space-y-6 font-geist-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 font-geist-sans">
          Subscriptions
        </h1>
        <Button
          onClick={onAddSubscription}
          className="bg-blue-600 hover:bg-blue-700 text-white font-geist-sans"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Subscription
        </Button>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <SubscriptionMetricCard
          label="Monthly Cost"
          value={data.summaryMetrics.totalMonthlyCost.value}
          previousValue={data.summaryMetrics.totalMonthlyCost.previousValue}
          change={data.summaryMetrics.totalMonthlyCost.change}
          changePercent={data.summaryMetrics.totalMonthlyCost.changePercent}
          trend={data.summaryMetrics.totalMonthlyCost.trend}
          formatValue={formatCurrency}
          invertTrend={true}
        />
        <SubscriptionMetricCard
          label="Yearly Cost"
          value={data.summaryMetrics.totalYearlyCost.value}
          previousValue={data.summaryMetrics.totalYearlyCost.previousValue}
          change={data.summaryMetrics.totalYearlyCost.change}
          changePercent={data.summaryMetrics.totalYearlyCost.changePercent}
          trend={data.summaryMetrics.totalYearlyCost.trend}
          formatValue={formatCurrency}
          invertTrend={true}
        />
        <SubscriptionMetricCard
          label="Active"
          value={data.summaryMetrics.activeCount.value}
          countMetric={data.summaryMetrics.activeCount}
        />
        <SubscriptionMetricCard
          label="Due This Week"
          value={data.summaryMetrics.upcomingRenewalsCount.thisWeek}
          upcomingRenewals={data.summaryMetrics.upcomingRenewalsCount}
        />
        <SubscriptionMetricCard
          label="Top Category"
          value={data.summaryMetrics.topSpendingCategory.category}
          topCategory={data.summaryMetrics.topSpendingCategory}
        />
        <SubscriptionMetricCard
          label="vs Last Month"
          value={data.summaryMetrics.totalMonthlyCost.value}
          comparison={data.summaryMetrics.comparisonToLastMonth}
          formatValue={formatCurrency}
          invertTrend={true}
        />
      </div>

      {/* Upcoming Renewals Section */}
      <UpcomingRenewalCard
        subscriptions={data.subscriptions}
        accounts={data.filterOptions.accounts}
        onViewSubscription={onEditSubscription}
      />

      {/* Filter Bar */}
      <SubscriptionFilterBar
        filters={filters}
        filterOptions={data.filterOptions}
        onFilterChange={handleFilterChange}
      />

      {/* Bulk Action Bar */}
      <BulkActionBar
        selectedCount={selectedIds.length}
        onBulkPause={() => handleBulkAction('pause')}
        onBulkCancel={() => handleBulkAction('cancel')}
        onBulkChangeCategory={() => handleBulkAction('changeCategory')}
        onClearSelection={() => {
          setSelectedIds([])
          onSelectionChange?.([])
        }}
      />

      {/* Subscriptions Table */}
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <SelectAllCheckbox
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={(checked) => handleSelectAll(checked)}
                  />
                </TableHead>
                <TableHead className="font-geist-sans">Name</TableHead>
                <TableHead className="font-geist-sans">Category</TableHead>
                <TableHead className="font-geist-sans">Amount</TableHead>
                <TableHead className="font-geist-sans">Billing</TableHead>
                <TableHead className="font-geist-sans">Next Payment</TableHead>
                <TableHead className="font-geist-sans">Status</TableHead>
                <TableHead className="font-geist-sans">Payment Method</TableHead>
                <TableHead className="font-geist-sans">Start Date</TableHead>
                <TableHead className="font-geist-sans">Total Spent</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.subscriptions.length === 0 ? (
                <TableRow>
                  <td colSpan={11} className="text-center py-8 text-neutral-500 dark:text-neutral-400 font-geist-sans">
                    No subscriptions found
                  </td>
                </TableRow>
              ) : (
                data.subscriptions.map((subscription) => (
                  <SubscriptionRow
                    key={subscription.id}
                    subscription={subscription}
                    account={getAccount(subscription.paymentMethodId)}
                    isSelected={selectedIds.includes(subscription.id)}
                    onSelect={handleSelect}
                    onEdit={onEditSubscription}
                    onPause={onPauseSubscription}
                    onResume={onResumeSubscription}
                    onCancel={onCancelSubscription}
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

