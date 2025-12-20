import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/formatter";
import type { ExpensesProps } from "@/lib/types/expenses";
import { BulkActionBar } from "./BulkActionBar";
import { ExpenseFilterBar } from "./ExpenseFilterBar";
import { ExpenseMetricCard } from "./ExpenseMetricCard";
import { ExpenseRow } from "./ExpenseRow";

function SelectAllCheckbox({
  checked,
  indeterminate,
  onChange,
}: {
  checked: boolean;
  indeterminate: boolean;
  onChange: (checked: boolean) => void;
}) {
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <input
      checked={checked}
      className="h-4 w-4 cursor-pointer rounded border-neutral-300 text-blue-600 focus:ring-blue-500 dark:border-neutral-700 dark:focus:ring-blue-400"
      onChange={(e) => onChange(e.target.checked)}
      ref={checkboxRef}
      type="checkbox"
    />
  );
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
  currency = "USD",
  locale = "en-US",
}: ExpensesProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelectedIds);
  const [filters, setFilters] = useState(initialFilters || {});

  const handleSelect = (expenseId: string, selected: boolean) => {
    const newSelection = selected
      ? [...selectedIds, expenseId]
      : selectedIds.filter((id) => id !== expenseId);
    setSelectedIds(newSelection);
    onSelectionChange?.(newSelection);
  };

  const handleSelectAll = (checked: boolean) => {
    const newSelection = checked ? data.expenses.map((e) => e.id) : [];
    setSelectedIds(newSelection);
    onSelectionChange?.(newSelection);
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleBulkAction = (
    action: "delete" | "changeCategory" | "addTags"
  ) => {
    onBulkAction?.(action, selectedIds);
    if (action === "delete") {
      setSelectedIds([]);
      onSelectionChange?.([]);
    }
  };

  const formatCurrencyValue = (value: number) =>
    formatCurrency({
      value,
      currency,
      locale,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const allSelected =
    selectedIds.length === data.expenses.length && data.expenses.length > 0;
  const someSelected =
    selectedIds.length > 0 && selectedIds.length < data.expenses.length;

  // Get account info for each expense
  const getAccount = (accountId: string) =>
    data.filterOptions.accounts.find((a) => a.id === accountId);

  return (
    <div className="container mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="font-bold text-3xl text-neutral-900 dark:text-neutral-100">
          Expenses
        </h1>
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700"
          onClick={onAddExpense}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Expense
        </Button>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <ExpenseMetricCard
          change={data.summaryMetrics.totalSpendingThisMonth.change}
          changePercent={
            data.summaryMetrics.totalSpendingThisMonth.changePercent
          }
          currency={currency}
          formatValue={formatCurrencyValue}
          label="Total Spending"
          locale={locale}
          previousValue={
            data.summaryMetrics.totalSpendingThisMonth.previousValue
          }
          trend={data.summaryMetrics.totalSpendingThisMonth.trend}
          value={data.summaryMetrics.totalSpendingThisMonth.value}
        />
        <ExpenseMetricCard
          change={data.summaryMetrics.averageDailySpending.change}
          changePercent={data.summaryMetrics.averageDailySpending.changePercent}
          currency={currency}
          formatValue={formatCurrencyValue}
          label="Daily Average"
          locale={locale}
          previousValue={data.summaryMetrics.averageDailySpending.previousValue}
          trend={data.summaryMetrics.averageDailySpending.trend}
          value={data.summaryMetrics.averageDailySpending.value}
        />
        <ExpenseMetricCard
          currency={currency}
          label="Top Category"
          locale={locale}
          topCategory={data.summaryMetrics.topSpendingCategory}
          value={data.summaryMetrics.topSpendingCategory.category}
        />
        <ExpenseMetricCard
          budgetProgress={data.summaryMetrics.budgetProgress}
          currency={currency}
          label="Budget Progress"
          locale={locale}
          value={`${data.summaryMetrics.budgetProgress.percentage.toFixed(0)}%`}
        />
        <ExpenseMetricCard
          comparison={data.summaryMetrics.comparisonToLastMonth}
          currency={currency}
          formatValue={formatCurrencyValue}
          label="vs Last Month"
          locale={locale}
          value={data.summaryMetrics.totalSpendingThisMonth.value}
        />
        <ExpenseMetricCard
          label="Transactions"
          transactionCount={data.summaryMetrics.transactionCount}
          value={data.summaryMetrics.transactionCount.thisMonth}
        />
      </div>

      {/* Filter Bar */}
      <ExpenseFilterBar
        filterOptions={data.filterOptions}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {/* Bulk Action Bar */}
      <BulkActionBar
        onBulkAddTags={() => handleBulkAction("addTags")}
        onBulkChangeCategory={() => handleBulkAction("changeCategory")}
        onBulkDelete={() => handleBulkAction("delete")}
        onClearSelection={() => {
          setSelectedIds([]);
          onSelectionChange?.([]);
        }}
        selectedCount={selectedIds.length}
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
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.expenses.length === 0 ? (
                <TableRow>
                  <td
                    className="py-8 text-center text-neutral-500 dark:text-neutral-400"
                    colSpan={8}
                  >
                    No expenses found
                  </td>
                </TableRow>
              ) : (
                data.expenses.map((expense) => (
                  <ExpenseRow
                    account={getAccount(expense.accountId)}
                    currency={currency}
                    expense={expense}
                    isSelected={selectedIds.includes(expense.id)}
                    key={expense.id}
                    locale={locale}
                    onDelete={onDeleteExpense}
                    onEdit={onEditExpense}
                    onSelect={handleSelect}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
