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
import type { IncomeProps } from "@/lib/types/income";
import { BulkActionBar } from "./BulkActionBar";
import { IncomeFilterBar } from "./IncomeFilterBar";
import { IncomeMetricCard } from "./IncomeMetricCard";
import { IncomeRow } from "./IncomeRow";

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
  currency = "USD",
  locale = "en-US",
}: IncomeProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelectedIds);
  const [filters, setFilters] = useState(initialFilters || {});

  const handleSelect = (incomeId: string, selected: boolean) => {
    const newSelection = selected
      ? [...selectedIds, incomeId]
      : selectedIds.filter((id) => id !== incomeId);
    setSelectedIds(newSelection);
    onSelectionChange?.(newSelection);
  };

  const handleSelectAll = (checked: boolean) => {
    const newSelection = checked ? data.income.map((i) => i.id) : [];
    setSelectedIds(newSelection);
    onSelectionChange?.(newSelection);
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleBulkAction = (action: "delete" | "changeSource" | "addTags") => {
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
    selectedIds.length === data.income.length && data.income.length > 0;
  const someSelected =
    selectedIds.length > 0 && selectedIds.length < data.income.length;

  // Get account info for each income entry
  const getAccount = (accountId: string) =>
    data.filterOptions.accounts.find((a) => a.id === accountId);

  return (
    <div className="container mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="font-bold text-3xl text-neutral-900 dark:text-neutral-100">
          Income
        </h1>
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700"
          onClick={onAddIncome}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Income
        </Button>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <IncomeMetricCard
          change={data.summaryMetrics.totalIncomeThisMonth.change}
          changePercent={data.summaryMetrics.totalIncomeThisMonth.changePercent}
          currency={currency}
          formatValue={formatCurrencyValue}
          label="Total Income"
          locale={locale}
          previousValue={data.summaryMetrics.totalIncomeThisMonth.previousValue}
          trend={data.summaryMetrics.totalIncomeThisMonth.trend}
          value={data.summaryMetrics.totalIncomeThisMonth.value}
        />
        <IncomeMetricCard
          change={data.summaryMetrics.averageMonthlyIncome.change}
          changePercent={data.summaryMetrics.averageMonthlyIncome.changePercent}
          currency={currency}
          formatValue={formatCurrencyValue}
          label="Average Monthly"
          locale={locale}
          previousValue={data.summaryMetrics.averageMonthlyIncome.previousValue}
          trend={data.summaryMetrics.averageMonthlyIncome.trend}
          value={data.summaryMetrics.averageMonthlyIncome.value}
        />
        <IncomeMetricCard
          currency={currency}
          label="Top Source"
          locale={locale}
          topSource={data.summaryMetrics.topIncomeSource}
          value={data.summaryMetrics.topIncomeSource.source}
        />
        <IncomeMetricCard
          comparison={data.summaryMetrics.comparisonToLastMonth}
          currency={currency}
          formatValue={formatCurrencyValue}
          label="vs Last Month"
          locale={locale}
          value={data.summaryMetrics.totalIncomeThisMonth.value}
        />
        <IncomeMetricCard
          change={data.summaryMetrics.totalRecurringIncome.change}
          changePercent={data.summaryMetrics.totalRecurringIncome.changePercent}
          currency={currency}
          formatValue={formatCurrencyValue}
          label="Recurring Income"
          locale={locale}
          previousValue={data.summaryMetrics.totalRecurringIncome.previousValue}
          trend={data.summaryMetrics.totalRecurringIncome.trend}
          value={data.summaryMetrics.totalRecurringIncome.value}
        />
        <IncomeMetricCard
          label="Entries"
          transactionCount={data.summaryMetrics.transactionCount}
          value={data.summaryMetrics.transactionCount.thisMonth}
        />
      </div>

      {/* Filter Bar */}
      <IncomeFilterBar
        filterOptions={data.filterOptions}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {/* Bulk Action Bar */}
      <BulkActionBar
        onBulkAddTags={() => handleBulkAction("addTags")}
        onBulkChangeSource={() => handleBulkAction("changeSource")}
        onBulkDelete={() => handleBulkAction("delete")}
        onClearSelection={() => {
          setSelectedIds([]);
          onSelectionChange?.([]);
        }}
        selectedCount={selectedIds.length}
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
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.income.length === 0 ? (
                <TableRow>
                  <td
                    className="py-8 text-center text-neutral-500 dark:text-neutral-400"
                    colSpan={8}
                  >
                    No income entries found
                  </td>
                </TableRow>
              ) : (
                data.income.map((income) => (
                  <IncomeRow
                    account={getAccount(income.accountId)}
                    currency={currency}
                    income={income}
                    isSelected={selectedIds.includes(income.id)}
                    key={income.id}
                    locale={locale}
                    onDelete={onDeleteIncome}
                    onEdit={onEditIncome}
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
