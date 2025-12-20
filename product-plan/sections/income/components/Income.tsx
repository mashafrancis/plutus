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
import { IncomeMetricCard } from './IncomeMetricCard'
import { IncomeFilterBar } from './IncomeFilterBar'
import { IncomeRow } from './IncomeRow'
import { BulkActionBar } from './BulkActionBar'
import type { IncomeProps } from '../types'

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

export function Income({
  data,
  filters: initialFilters,
  selectedIncomeIds: initialSelectedIds = [],
  onAddIncome,
  onEditIncome,
  onDeleteIncome,
  onFilterChange,
  onSelectionChange,
  onBulkAction,
  onSort,
}: IncomeProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelectedIds)
  const [filters, setFilters] = useState(initialFilters || {})

  const handleSelect = (incomeId: string, selected: boolean) => {
    const newSelection = selected
      ? [...selectedIds, incomeId]
      : selectedIds.filter(id => id !== incomeId)
    setSelectedIds(newSelection)
    onSelectionChange?.(newSelection)
  }

  const handleSelectAll = (checked: boolean) => {
    const newSelection = checked ? data.income.map(i => i.id) : []
    setSelectedIds(newSelection)
    onSelectionChange?.(newSelection)
  }

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const handleBulkAction = (action: 'delete' | 'changeSource' | 'addTags') => {
    onBulkAction?.(action, selectedIds)
    if (action === 'delete') {
      setSelectedIds([])
      onSelectionChange?.([])
    }
  }

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const allSelected = selectedIds.length === data.income.length && data.income.length > 0
  const someSelected = selectedIds.length > 0 && selectedIds.length < data.income.length

  // Get account info for each income entry
  const getAccount = (accountId: string) => {
    return data.filterOptions.accounts.find(a => a.id === accountId)
  }

  return (
    <div className="container mx-auto p-6 space-y-6 font-geist-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 font-geist-sans">
          Income
        </h1>
        <Button
          onClick={onAddIncome}
          className="bg-blue-600 hover:bg-blue-700 text-white font-geist-sans"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Income
        </Button>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <IncomeMetricCard
          label="Total Income"
          value={data.summaryMetrics.totalIncomeThisMonth.value}
          previousValue={data.summaryMetrics.totalIncomeThisMonth.previousValue}
          change={data.summaryMetrics.totalIncomeThisMonth.change}
          changePercent={data.summaryMetrics.totalIncomeThisMonth.changePercent}
          trend={data.summaryMetrics.totalIncomeThisMonth.trend}
          formatValue={formatCurrency}
        />
        <IncomeMetricCard
          label="Monthly Average"
          value={data.summaryMetrics.averageMonthlyIncome.value}
          previousValue={data.summaryMetrics.averageMonthlyIncome.previousValue}
          change={data.summaryMetrics.averageMonthlyIncome.change}
          changePercent={data.summaryMetrics.averageMonthlyIncome.changePercent}
          trend={data.summaryMetrics.averageMonthlyIncome.trend}
          formatValue={formatCurrency}
        />
        <IncomeMetricCard
          label="Top Source"
          value={data.summaryMetrics.topIncomeSource.source}
          topSource={data.summaryMetrics.topIncomeSource}
        />
        <IncomeMetricCard
          label="vs Last Month"
          value={data.summaryMetrics.totalIncomeThisMonth.value}
          comparison={data.summaryMetrics.comparisonToLastMonth}
          formatValue={formatCurrency}
        />
        <IncomeMetricCard
          label="Recurring Total"
          value={data.summaryMetrics.totalRecurringIncome.value}
          previousValue={data.summaryMetrics.totalRecurringIncome.previousValue}
          change={data.summaryMetrics.totalRecurringIncome.change}
          changePercent={data.summaryMetrics.totalRecurringIncome.changePercent}
          trend={data.summaryMetrics.totalRecurringIncome.trend}
          formatValue={formatCurrency}
        />
        <IncomeMetricCard
          label="Entries"
          value={data.summaryMetrics.transactionCount.thisMonth}
          transactionCount={data.summaryMetrics.transactionCount}
        />
      </div>

      {/* Filter Bar */}
      <IncomeFilterBar
        filters={filters}
        filterOptions={data.filterOptions}
        onFilterChange={handleFilterChange}
      />

      {/* Bulk Action Bar */}
      <BulkActionBar
        selectedCount={selectedIds.length}
        onBulkDelete={() => handleBulkAction('delete')}
        onBulkChangeSource={() => handleBulkAction('changeSource')}
        onBulkAddTags={() => handleBulkAction('addTags')}
        onClearSelection={() => {
          setSelectedIds([])
          onSelectionChange?.([])
        }}
      />

      {/* Income Table */}
      <Card>
        <CardContent className="p-0">
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
                <TableHead className="font-geist-sans">Date</TableHead>
                <TableHead className="font-geist-sans">Description</TableHead>
                <TableHead className="font-geist-sans">Source</TableHead>
                <TableHead className="font-geist-sans">Amount</TableHead>
                <TableHead className="font-geist-sans">Account</TableHead>
                <TableHead className="font-geist-sans">Tags</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.income.length === 0 ? (
                <TableRow>
                  <td colSpan={8} className="text-center py-8 text-neutral-500 dark:text-neutral-400 font-geist-sans">
                    No income entries found
                  </td>
                </TableRow>
              ) : (
                data.income.map((income) => (
                  <IncomeRow
                    key={income.id}
                    income={income}
                    account={getAccount(income.accountId)}
                    isSelected={selectedIds.includes(income.id)}
                    onSelect={handleSelect}
                    onEdit={onEditIncome}
                    onDelete={onDeleteIncome}
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

