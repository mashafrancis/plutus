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
import { ExpenseMetricCard } from './ExpenseMetricCard'
import { ExpenseFilterBar } from './ExpenseFilterBar'
import { ExpenseRow } from './ExpenseRow'
import { BulkActionBar } from './BulkActionBar'
import type { ExpensesProps } from '../types'

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

export function Expenses({
  data,
  filters: initialFilters,
  selectedExpenseIds: initialSelectedIds = [],
  onAddExpense,
  onEditExpense,
  onDeleteExpense,
  onFilterChange,
  onSelectionChange,
  onBulkAction,
  onSort,
}: ExpensesProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelectedIds)
  const [filters, setFilters] = useState(initialFilters || {})

  const handleSelect = (expenseId: string, selected: boolean) => {
    const newSelection = selected
      ? [...selectedIds, expenseId]
      : selectedIds.filter(id => id !== expenseId)
    setSelectedIds(newSelection)
    onSelectionChange?.(newSelection)
  }

  const handleSelectAll = (checked: boolean) => {
    const newSelection = checked ? data.expenses.map(e => e.id) : []
    setSelectedIds(newSelection)
    onSelectionChange?.(newSelection)
  }

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const handleBulkAction = (action: 'delete' | 'changeCategory' | 'addTags') => {
    onBulkAction?.(action, selectedIds)
    if (action === 'delete') {
      setSelectedIds([])
      onSelectionChange?.([])
    }
  }

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const allSelected = selectedIds.length === data.expenses.length && data.expenses.length > 0
  const someSelected = selectedIds.length > 0 && selectedIds.length < data.expenses.length

  // Get account info for each expense
  const getAccount = (accountId: string) => {
    return data.filterOptions.accounts.find(a => a.id === accountId)
  }

  return (
    <div className="container mx-auto p-6 space-y-6 font-geist-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 font-geist-sans">
          Expenses
        </h1>
        <Button
          onClick={onAddExpense}
          className="bg-blue-600 hover:bg-blue-700 text-white font-geist-sans"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Expense
        </Button>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <ExpenseMetricCard
          label="Total Spending"
          value={data.summaryMetrics.totalSpendingThisMonth.value}
          previousValue={data.summaryMetrics.totalSpendingThisMonth.previousValue}
          change={data.summaryMetrics.totalSpendingThisMonth.change}
          changePercent={data.summaryMetrics.totalSpendingThisMonth.changePercent}
          trend={data.summaryMetrics.totalSpendingThisMonth.trend}
          formatValue={formatCurrency}
        />
        <ExpenseMetricCard
          label="Daily Average"
          value={data.summaryMetrics.averageDailySpending.value}
          previousValue={data.summaryMetrics.averageDailySpending.previousValue}
          change={data.summaryMetrics.averageDailySpending.change}
          changePercent={data.summaryMetrics.averageDailySpending.changePercent}
          trend={data.summaryMetrics.averageDailySpending.trend}
          formatValue={(val) => formatCurrency(val)}
        />
        <ExpenseMetricCard
          label="Top Category"
          value={data.summaryMetrics.topSpendingCategory.category}
          topCategory={data.summaryMetrics.topSpendingCategory}
        />
        <ExpenseMetricCard
          label="Budget Progress"
          value={`${data.summaryMetrics.budgetProgress.percentage.toFixed(0)}%`}
          budgetProgress={data.summaryMetrics.budgetProgress}
        />
        <ExpenseMetricCard
          label="vs Last Month"
          value={data.summaryMetrics.totalSpendingThisMonth.value}
          comparison={data.summaryMetrics.comparisonToLastMonth}
          formatValue={formatCurrency}
        />
        <ExpenseMetricCard
          label="Transactions"
          value={data.summaryMetrics.transactionCount.thisMonth}
          transactionCount={data.summaryMetrics.transactionCount}
        />
      </div>

      {/* Filter Bar */}
      <ExpenseFilterBar
        filters={filters}
        filterOptions={data.filterOptions}
        onFilterChange={handleFilterChange}
      />

      {/* Bulk Action Bar */}
      <BulkActionBar
        selectedCount={selectedIds.length}
        onBulkDelete={() => handleBulkAction('delete')}
        onBulkChangeCategory={() => handleBulkAction('changeCategory')}
        onBulkAddTags={() => handleBulkAction('addTags')}
        onClearSelection={() => {
          setSelectedIds([])
          onSelectionChange?.([])
        }}
      />

      {/* Expenses Table */}
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
                <TableHead className="font-geist-sans">Category</TableHead>
                <TableHead className="font-geist-sans">Amount</TableHead>
                <TableHead className="font-geist-sans">Account</TableHead>
                <TableHead className="font-geist-sans">Tags</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.expenses.length === 0 ? (
                <TableRow>
                  <td colSpan={8} className="text-center py-8 text-neutral-500 dark:text-neutral-400 font-geist-sans">
                    No expenses found
                  </td>
                </TableRow>
              ) : (
                data.expenses.map((expense) => (
                  <ExpenseRow
                    key={expense.id}
                    expense={expense}
                    account={getAccount(expense.accountId)}
                    isSelected={selectedIds.includes(expense.id)}
                    onSelect={handleSelect}
                    onEdit={onEditExpense}
                    onDelete={onDeleteExpense}
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

