import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import type { ExpensesProps } from "../types";
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

  const formatCurrency = (value: number) =>
    `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const allSelected =
    selectedIds.length === data.expenses.length && data.expenses.length > 0;
  const someSelected =
    selectedIds.length > 0 && selectedIds.length < data.expenses.length;

  // Get account info for each expense
  const getAccount = (accountId: string) =>
    data.filterOptions.accounts.find((a) => a.id === accountId);

  return (
    <div className="container mx-auto space-y-6 p-6 font-geist-sans">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="font-bold font-geist-sans text-3xl text-neutral-900 dark:text-neutral-100">
          Expenses
        </h1>
        <Button
          className="bg-blue-600 font-geist-sans text-white hover:bg-blue-700"
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
          formatValue={formatCurrency}
          label="Total Spending"
          previousValue={
            data.summaryMetrics.totalSpendingThisMonth.previousValue
          }
          trend={data.summaryMetrics.totalSpendingThisMonth.trend}
          value={data.summaryMetrics.totalSpendingThisMonth.value}
        />
        <ExpenseMetricCard
          change={data.summaryMetrics.averageDailySpending.change}
          changePercent={data.summaryMetrics.averageDailySpending.changePercent}
          formatValue={(val) => formatCurrency(val)}
          label="Daily Average"
          previousValue={data.summaryMetrics.averageDailySpending.previousValue}
          trend={data.summaryMetrics.averageDailySpending.trend}
          value={data.summaryMetrics.averageDailySpending.value}
        />
        <ExpenseMetricCard
          label="Top Category"
          topCategory={data.summaryMetrics.topSpendingCategory}
          value={data.summaryMetrics.topSpendingCategory.category}
        />
        <ExpenseMetricCard
          budgetProgress={data.summaryMetrics.budgetProgress}
          label="Budget Progress"
          value={`${data.summaryMetrics.budgetProgress.percentage.toFixed(0)}%`}
        />
        <ExpenseMetricCard
          comparison={data.summaryMetrics.comparisonToLastMonth}
          formatValue={formatCurrency}
          label="vs Last Month"
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
                <TableHead className="font-geist-sans">Date</TableHead>
                <TableHead className="font-geist-sans">Description</TableHead>
                <TableHead className="font-geist-sans">Category</TableHead>
                <TableHead className="font-geist-sans">Amount</TableHead>
                <TableHead className="font-geist-sans">Account</TableHead>
                <TableHead className="font-geist-sans">Tags</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.expenses.length === 0 ? (
                <TableRow>
                  <td
                    className="py-8 text-center font-geist-sans text-neutral-500 dark:text-neutral-400"
                    colSpan={8}
                  >
                    No expenses found
                  </td>
                </TableRow>
              ) : (
                data.expenses.map((expense) => (
                  <ExpenseRow
                    account={getAccount(expense.accountId)}
                    expense={expense}
                    isSelected={selectedIds.includes(expense.id)}
                    key={expense.id}
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
