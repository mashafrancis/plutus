import { FileText, Plus, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/formatter";
import type { DashboardProps, Timeframe } from "@/lib/types/dashboard";
import { BudgetProgressBar } from "./BudgetProgressBar";
import { IncomeChart } from "./IncomeChart";
import { InsightCard } from "./InsightCard";
import { MetricCard } from "./MetricCard";
import { SpendingChart } from "./SpendingChart";
import { SubscriptionItem } from "./SubscriptionItem";
import { TransactionRow } from "./TransactionRow";

const timeframes: Timeframe[] = ["week", "month", "quarter", "year", "custom"];

export function Dashboard({
  data,
  timeframe = "month",
  onAddExpense,
  onAddIncome,
  onViewReports,
  onDismissInsight,
  onTimeframeChange,
  onViewTransaction,
  onViewSubscription,
  onViewCategory,
  onViewBudget,
  currency = "USD",
  locale = "en-US",
}: DashboardProps) {
  const activeInsights = data.insights.filter((i) => !i.dismissed);

  const formatCurrencyValue = (value: number): string =>
    formatCurrency({
      value,
      currency,
      locale,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const formatPercentage = (value: number): string => `${value.toFixed(1)}%`;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header with Quick Actions */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="font-bold text-3xl text-neutral-900 dark:text-neutral-100">
              Dashboard
            </h1>
            <p className="mt-1 text-neutral-600 dark:text-neutral-400">
              Your financial overview at a glance
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-red-700"
              onClick={onAddExpense}
            >
              <Plus className="h-4 w-4" strokeWidth={2} />
              Add Expense
            </button>
            <button
              className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-green-700"
              onClick={onAddIncome}
            >
              <Plus className="h-4 w-4" strokeWidth={2} />
              Add Income
            </button>
            <button
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-blue-700"
              onClick={onViewReports}
            >
              <FileText className="h-4 w-4" strokeWidth={2} />
              View Reports
            </button>
          </div>
        </div>

        {/* Timeframe Selector */}
        <div className="mb-6">
          <div className="inline-flex rounded-lg border border-neutral-200 bg-white p-1 dark:border-neutral-800 dark:bg-neutral-900">
            {timeframes.map((tf) => (
              <button
                className={`rounded-md px-4 py-1.5 font-medium text-sm capitalize transition-colors ${
                  timeframe === tf
                    ? "bg-blue-600 text-white"
                    : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                }`}
                key={tf}
                onClick={() => onTimeframeChange?.(tf)}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Metrics Row */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            formatValue={formatCurrencyValue}
            label="Net Worth"
            metric={data.metrics.netWorth}
          />
          <MetricCard
            formatValue={formatCurrencyValue}
            label="Monthly Cash Flow"
            metric={data.metrics.monthlyCashFlow}
          />
          <MetricCard
            formatValue={formatCurrencyValue}
            label="Total Balance"
            metric={data.metrics.totalBalance}
          />
          <MetricCard
            formatValue={formatPercentage}
            label="Savings Rate"
            metric={data.metrics.savingsRate}
          />
          <MetricCard
            formatValue={formatCurrencyValue}
            label="Monthly Spending"
            metric={data.metrics.monthlySpending}
          />
          <MetricCard
            formatValue={formatCurrencyValue}
            label="Monthly Income"
            metric={data.metrics.monthlyIncome}
          />
        </div>

        {/* Charts Section */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Spending by Category */}
          <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
            <h2 className="mb-4 font-semibold text-lg text-neutral-900 dark:text-neutral-100">
              Spending by Category
            </h2>
            <SpendingChart
              currency={currency}
              data={data.spendingByCategory}
              locale={locale}
              onViewCategory={onViewCategory}
            />
          </div>

          {/* Income by Source */}
          <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
            <h2 className="mb-4 font-semibold text-lg text-neutral-900 dark:text-neutral-100">
              Income by Source
            </h2>
            <IncomeChart
              currency={currency}
              data={data.incomeBySource}
              locale={locale}
            />
          </div>
        </div>

        {/* Budget Progress */}
        {data.budgetProgress.length > 0 ? (
          <div className="mb-8">
            <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
              <h2 className="mb-4 font-semibold text-lg text-neutral-900 dark:text-neutral-100">
                Budget Progress
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {data.budgetProgress.map((budget) => (
                  <BudgetProgressBar
                    budget={budget}
                    currency={currency}
                    key={budget.category}
                    locale={locale}
                    onView={onViewBudget}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-8">
            <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
              <h2 className="mb-4 font-semibold text-lg text-neutral-900 dark:text-neutral-100">
                Budget Progress
              </h2>
              <div className="py-8 text-center text-neutral-500 dark:text-neutral-400">
                No budgets set.{" "}
                <button
                  className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  onClick={() => onViewBudget?.("")}
                >
                  Set up budgets
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Investment Performance */}
        <div className="mb-8">
          <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-lg text-neutral-900 dark:text-neutral-100">
                Investment Performance
              </h2>
              <div className="flex items-center gap-2">
                <TrendingUp
                  className={`h-5 w-5 ${
                    data.investmentPerformance.totalGain >= 0
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                  strokeWidth={2}
                />
                <span
                  className={`font-semibold text-lg ${
                    data.investmentPerformance.totalGain >= 0
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {data.investmentPerformance.totalGain >= 0 ? "+" : ""}
                  {formatCurrencyValue(data.investmentPerformance.totalGain)} (
                  {data.investmentPerformance.gainPercent >= 0 ? "+" : ""}
                  {data.investmentPerformance.gainPercent.toFixed(2)}%)
                </span>
              </div>
            </div>
            {data.investmentPerformance.holdings.length > 0 ? (
              <div className="space-y-3">
                {data.investmentPerformance.holdings.map((holding) => (
                  <div
                    className="flex items-center justify-between rounded-lg bg-neutral-50 p-3 dark:bg-neutral-800/50"
                    key={holding.name}
                  >
                    <div>
                      <p className="font-medium text-neutral-900 dark:text-neutral-100">
                        {holding.name}
                      </p>
                      <p className="text-neutral-600 text-sm dark:text-neutral-400">
                        {formatCurrencyValue(holding.value)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-semibold ${
                          holding.gain >= 0
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {holding.gain >= 0 ? "+" : ""}
                        {formatCurrencyValue(holding.gain)}
                      </p>
                      <p className="text-neutral-500 text-sm dark:text-neutral-500">
                        {holding.gainPercent >= 0 ? "+" : ""}
                        {holding.gainPercent.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-neutral-500 dark:text-neutral-400">
                No investments yet
              </div>
            )}
          </div>
        </div>

        {/* Insights Section */}
        {activeInsights.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 font-semibold text-lg text-neutral-900 dark:text-neutral-100">
              Insights
            </h2>
            <div className="space-y-3">
              {activeInsights.map((insight) => (
                <InsightCard
                  insight={insight}
                  key={insight.id}
                  onAction={() => {
                    if (insight.category) {
                      onViewCategory?.(insight.category);
                    }
                  }}
                  onDismiss={onDismissInsight}
                />
              ))}
            </div>
          </div>
        )}

        {/* Activity Section */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Upcoming Subscriptions */}
          <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
            <h2 className="mb-4 font-semibold text-lg text-neutral-900 dark:text-neutral-100">
              Upcoming Payments
            </h2>
            {data.upcomingSubscriptions.length > 0 ? (
              <div className="space-y-2">
                {data.upcomingSubscriptions.map((subscription) => (
                  <SubscriptionItem
                    currency={currency}
                    key={subscription.id}
                    locale={locale}
                    onView={onViewSubscription}
                    subscription={subscription}
                  />
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-neutral-500 dark:text-neutral-400">
                No upcoming payments
              </div>
            )}
          </div>

          {/* Recent Transactions */}
          <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
            <h2 className="mb-4 font-semibold text-lg text-neutral-900 dark:text-neutral-100">
              Recent Activity
            </h2>
            {data.recentTransactions.length > 0 ? (
              <div className="space-y-1">
                {data.recentTransactions.map((transaction) => (
                  <TransactionRow
                    currency={currency}
                    key={transaction.id}
                    locale={locale}
                    onView={onViewTransaction}
                    transaction={transaction}
                  />
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-neutral-500 dark:text-neutral-400">
                No recent transactions
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
