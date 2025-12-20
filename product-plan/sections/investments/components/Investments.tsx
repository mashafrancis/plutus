import { Plus } from "lucide-react";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import type { InvestmentsProps } from "../types";
import { AllocationChart } from "./AllocationChart";
import { GainLossChart } from "./GainLossChart";
import { InvestmentFilterBar } from "./InvestmentFilterBar";
import { InvestmentMetricCard } from "./InvestmentMetricCard";
import { InvestmentRow } from "./InvestmentRow";
import { PerformanceChart } from "./PerformanceChart";
import { SectorBreakdownChart } from "./SectorBreakdownChart";

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
  const formatCurrency = (value: number) =>
    `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const getAccount = (accountId: string) =>
    data.filterOptions.accounts.find((a) => a.id === accountId);

  return (
    <div className="container mx-auto space-y-6 p-6 font-geist-sans">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="font-bold font-geist-sans text-3xl text-neutral-900 dark:text-neutral-100">
          Investments
        </h1>
        <Button
          className="bg-blue-600 font-geist-sans text-white hover:bg-blue-700"
          onClick={onAddInvestment}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Investment
        </Button>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        <InvestmentMetricCard
          change={data.summaryMetrics.totalPortfolioValue.change}
          changePercent={data.summaryMetrics.totalPortfolioValue.changePercent}
          formatValue={formatCurrency}
          label="Portfolio Value"
          previousValue={data.summaryMetrics.totalPortfolioValue.previousValue}
          trend={
            data.summaryMetrics.totalPortfolioValue.changePercent > 0
              ? "up"
              : data.summaryMetrics.totalPortfolioValue.changePercent < 0
                ? "down"
                : "neutral"
          }
          value={data.summaryMetrics.totalPortfolioValue.value}
        />
        <InvestmentMetricCard
          change={data.summaryMetrics.totalInvested.change}
          changePercent={data.summaryMetrics.totalInvested.changePercent}
          formatValue={formatCurrency}
          label="Total Invested"
          previousValue={data.summaryMetrics.totalInvested.previousValue}
          trend="neutral"
          value={data.summaryMetrics.totalInvested.value}
        />
        <InvestmentMetricCard
          formatValue={formatCurrency}
          gainLoss={data.summaryMetrics.totalGainLoss}
          label="Total Gain/Loss"
          value={data.summaryMetrics.totalGainLoss.dollar}
        />
        <InvestmentMetricCard
          formatValue={formatCurrency}
          label="Today's Change"
          todayChange={data.summaryMetrics.todayChange}
          value={data.summaryMetrics.todayChange.dollar}
        />
        <InvestmentMetricCard
          assetAllocation={data.summaryMetrics.assetAllocation}
          label="Top Allocation"
          value=""
        />
        <InvestmentMetricCard
          isPerformer={true}
          label="Top Performer"
          performer={data.summaryMetrics.topPerformer}
          value=""
        />
        <InvestmentMetricCard
          isPerformer={true}
          label="Worst Performer"
          performer={data.summaryMetrics.worstPerformer}
          value=""
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AllocationChart data={data.chartData.allocation} />
        <PerformanceChart data={data.chartData.performanceOverTime} />
        <GainLossChart data={data.chartData.gainLossByInvestment} />
        <SectorBreakdownChart data={data.chartData.sectorBreakdown} />
      </div>

      {/* Filter Bar */}
      <InvestmentFilterBar
        filterOptions={data.filterOptions}
        filters={initialFilters}
        onFilterChange={onFilterChange}
      />

      {/* Holdings Table */}
      <Card>
        <CardContent className="overflow-x-auto p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-geist-sans">Name/Ticker</TableHead>
                <TableHead className="font-geist-sans">Asset Type</TableHead>
                <TableHead className="font-geist-sans">Shares</TableHead>
                <TableHead className="font-geist-sans">Cost Basis</TableHead>
                <TableHead className="font-geist-sans">Current Value</TableHead>
                <TableHead className="font-geist-sans">Gain/Loss</TableHead>
                <TableHead className="font-geist-sans">
                  Today's Change
                </TableHead>
                <TableHead className="font-geist-sans">Allocation %</TableHead>
                <TableHead className="font-geist-sans">Account</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.investments.length === 0 ? (
                <TableRow>
                  <td
                    className="py-8 text-center font-geist-sans text-neutral-500 dark:text-neutral-400"
                    colSpan={10}
                  >
                    No investments found
                  </td>
                </TableRow>
              ) : (
                data.investments.map((investment) => (
                  <InvestmentRow
                    account={getAccount(investment.accountId)}
                    investment={investment}
                    key={investment.id}
                    onDelete={onDeleteInvestment}
                    onEdit={onEditInvestment}
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
  );
}
