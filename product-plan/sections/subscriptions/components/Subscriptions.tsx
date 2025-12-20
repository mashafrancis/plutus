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
import type { SubscriptionsProps } from "../types";
import { BulkActionBar } from "./BulkActionBar";
import { SubscriptionFilterBar } from "./SubscriptionFilterBar";
import { SubscriptionMetricCard } from "./SubscriptionMetricCard";
import { SubscriptionRow } from "./SubscriptionRow";
import { UpcomingRenewalCard } from "./UpcomingRenewalCard";

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
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelectedIds);
  const [filters, setFilters] = useState(initialFilters || {});

  const handleSelect = (subscriptionId: string, selected: boolean) => {
    const newSelection = selected
      ? [...selectedIds, subscriptionId]
      : selectedIds.filter((id) => id !== subscriptionId);
    setSelectedIds(newSelection);
    onSelectionChange?.(newSelection);
  };

  const handleSelectAll = (checked: boolean) => {
    const newSelection = checked ? data.subscriptions.map((s) => s.id) : [];
    setSelectedIds(newSelection);
    onSelectionChange?.(newSelection);
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleBulkAction = (action: "pause" | "cancel" | "changeCategory") => {
    onBulkAction?.(action, selectedIds);
    if (action === "cancel") {
      setSelectedIds([]);
      onSelectionChange?.([]);
    }
  };

  const formatCurrency = (value: number) =>
    `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const allSelected =
    selectedIds.length === data.subscriptions.length &&
    data.subscriptions.length > 0;
  const someSelected =
    selectedIds.length > 0 && selectedIds.length < data.subscriptions.length;

  const getAccount = (accountId: string) =>
    data.filterOptions.accounts.find((a) => a.id === accountId);

  return (
    <div className="container mx-auto space-y-6 p-6 font-geist-sans">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="font-bold font-geist-sans text-3xl text-neutral-900 dark:text-neutral-100">
          Subscriptions
        </h1>
        <Button
          className="bg-blue-600 font-geist-sans text-white hover:bg-blue-700"
          onClick={onAddSubscription}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Subscription
        </Button>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <SubscriptionMetricCard
          change={data.summaryMetrics.totalMonthlyCost.change}
          changePercent={data.summaryMetrics.totalMonthlyCost.changePercent}
          formatValue={formatCurrency}
          invertTrend={true}
          label="Monthly Cost"
          previousValue={data.summaryMetrics.totalMonthlyCost.previousValue}
          trend={data.summaryMetrics.totalMonthlyCost.trend}
          value={data.summaryMetrics.totalMonthlyCost.value}
        />
        <SubscriptionMetricCard
          change={data.summaryMetrics.totalYearlyCost.change}
          changePercent={data.summaryMetrics.totalYearlyCost.changePercent}
          formatValue={formatCurrency}
          invertTrend={true}
          label="Yearly Cost"
          previousValue={data.summaryMetrics.totalYearlyCost.previousValue}
          trend={data.summaryMetrics.totalYearlyCost.trend}
          value={data.summaryMetrics.totalYearlyCost.value}
        />
        <SubscriptionMetricCard
          countMetric={data.summaryMetrics.activeCount}
          label="Active"
          value={data.summaryMetrics.activeCount.value}
        />
        <SubscriptionMetricCard
          label="Due This Week"
          upcomingRenewals={data.summaryMetrics.upcomingRenewalsCount}
          value={data.summaryMetrics.upcomingRenewalsCount.thisWeek}
        />
        <SubscriptionMetricCard
          label="Top Category"
          topCategory={data.summaryMetrics.topSpendingCategory}
          value={data.summaryMetrics.topSpendingCategory.category}
        />
        <SubscriptionMetricCard
          comparison={data.summaryMetrics.comparisonToLastMonth}
          formatValue={formatCurrency}
          invertTrend={true}
          label="vs Last Month"
          value={data.summaryMetrics.totalMonthlyCost.value}
        />
      </div>

      {/* Upcoming Renewals Section */}
      <UpcomingRenewalCard
        accounts={data.filterOptions.accounts}
        onViewSubscription={onEditSubscription}
        subscriptions={data.subscriptions}
      />

      {/* Filter Bar */}
      <SubscriptionFilterBar
        filterOptions={data.filterOptions}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {/* Bulk Action Bar */}
      <BulkActionBar
        onBulkCancel={() => handleBulkAction("cancel")}
        onBulkChangeCategory={() => handleBulkAction("changeCategory")}
        onBulkPause={() => handleBulkAction("pause")}
        onClearSelection={() => {
          setSelectedIds([]);
          onSelectionChange?.([]);
        }}
        selectedCount={selectedIds.length}
      />

      {/* Subscriptions Table */}
      <Card>
        <CardContent className="overflow-x-auto p-0">
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
                <TableHead className="font-geist-sans">
                  Payment Method
                </TableHead>
                <TableHead className="font-geist-sans">Start Date</TableHead>
                <TableHead className="font-geist-sans">Total Spent</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.subscriptions.length === 0 ? (
                <TableRow>
                  <td
                    className="py-8 text-center font-geist-sans text-neutral-500 dark:text-neutral-400"
                    colSpan={11}
                  >
                    No subscriptions found
                  </td>
                </TableRow>
              ) : (
                data.subscriptions.map((subscription) => (
                  <SubscriptionRow
                    account={getAccount(subscription.paymentMethodId)}
                    isSelected={selectedIds.includes(subscription.id)}
                    key={subscription.id}
                    onCancel={onCancelSubscription}
                    onEdit={onEditSubscription}
                    onPause={onPauseSubscription}
                    onResume={onResumeSubscription}
                    onSelect={handleSelect}
                    onViewHistory={onViewHistory}
                    subscription={subscription}
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
