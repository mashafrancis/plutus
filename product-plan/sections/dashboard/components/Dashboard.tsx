import { Plus, FileText, TrendingUp } from 'lucide-react'
import type { DashboardProps, Timeframe } from '../types'
import { MetricCard } from './MetricCard'
import { InsightCard } from './InsightCard'
import { TransactionRow } from './TransactionRow'
import { SubscriptionItem } from './SubscriptionItem'
import { BudgetProgressBar } from './BudgetProgressBar'
import { SpendingChart } from './SpendingChart'
import { IncomeChart } from './IncomeChart'

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`
}

const timeframes: Timeframe[] = ['week', 'month', 'quarter', 'year', 'custom']

export function Dashboard({
  data,
  timeframe = 'month',
  onAddExpense,
  onAddIncome,
  onViewReports,
  onDismissInsight,
  onTimeframeChange,
  onViewTransaction,
  onViewSubscription,
  onViewCategory,
  onViewBudget,
}: DashboardProps) {
  const activeInsights = data.insights.filter((i) => !i.dismissed)

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Quick Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">Dashboard</h1>
            <p className="text-neutral-600 dark:text-neutral-400 mt-1">
              Your financial overview at a glance
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={onAddExpense}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors text-sm"
            >
              <Plus className="h-4 w-4" strokeWidth={2} />
              Add Expense
            </button>
            <button
              onClick={onAddIncome}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors text-sm"
            >
              <Plus className="h-4 w-4" strokeWidth={2} />
              Add Income
            </button>
            <button
              onClick={onViewReports}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm"
            >
              <FileText className="h-4 w-4" strokeWidth={2} />
              View Reports
            </button>
          </div>
        </div>

        {/* Timeframe Selector */}
        <div className="mb-6">
          <div className="inline-flex rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-1">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => onTimeframeChange?.(tf)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors capitalize ${
                  timeframe === tf
                    ? 'bg-blue-600 text-white'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <MetricCard
            label="Net Worth"
            metric={data.metrics.netWorth}
            formatValue={formatCurrency}
          />
          <MetricCard
            label="Monthly Cash Flow"
            metric={data.metrics.monthlyCashFlow}
            formatValue={formatCurrency}
          />
          <MetricCard
            label="Total Balance"
            metric={data.metrics.totalBalance}
            formatValue={formatCurrency}
          />
          <MetricCard
            label="Savings Rate"
            metric={data.metrics.savingsRate}
            formatValue={formatPercentage}
          />
          <MetricCard
            label="Monthly Spending"
            metric={data.metrics.monthlySpending}
            formatValue={formatCurrency}
          />
          <MetricCard
            label="Monthly Income"
            metric={data.metrics.monthlyIncome}
            formatValue={formatCurrency}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Spending by Category */}
          <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              Spending by Category
            </h2>
            <SpendingChart
              data={data.spendingByCategory}
              onViewCategory={onViewCategory}
            />
          </div>

          {/* Income by Source */}
          <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              Income by Source
            </h2>
            <IncomeChart data={data.incomeBySource} />
          </div>
        </div>

        {/* Budget Progress */}
        <div className="mb-8">
          <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              Budget Progress
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.budgetProgress.map((budget) => (
                <BudgetProgressBar
                  key={budget.category}
                  budget={budget}
                  onView={onViewBudget}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Investment Performance */}
        <div className="mb-8">
          <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Investment Performance
              </h2>
              <div className="flex items-center gap-2">
                <TrendingUp
                  className={`h-5 w-5 ${
                    data.investmentPerformance.totalGain >= 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                  strokeWidth={2}
                />
                <span
                  className={`text-lg font-semibold ${
                    data.investmentPerformance.totalGain >= 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {data.investmentPerformance.totalGain >= 0 ? '+' : ''}
                  {formatCurrency(data.investmentPerformance.totalGain)} (
                  {data.investmentPerformance.gainPercent >= 0 ? '+' : ''}
                  {data.investmentPerformance.gainPercent.toFixed(2)}%)
                </span>
              </div>
            </div>
            <div className="space-y-3">
              {data.investmentPerformance.holdings.map((holding) => (
                <div
                  key={holding.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50"
                >
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-neutral-100">
                      {holding.name}
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {formatCurrency(holding.value)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold ${
                        holding.gain >= 0
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {holding.gain >= 0 ? '+' : ''}
                      {formatCurrency(holding.gain)}
                    </p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-500">
                      {holding.gainPercent >= 0 ? '+' : ''}
                      {holding.gainPercent.toFixed(2)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insights Section */}
        {activeInsights.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              Insights
            </h2>
            <div className="space-y-3">
              {activeInsights.map((insight) => (
                <InsightCard
                  key={insight.id}
                  insight={insight}
                  onDismiss={onDismissInsight}
                  onAction={() => {
                    if (insight.category) {
                      onViewCategory?.(insight.category)
                    }
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Subscriptions */}
          <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              Upcoming Payments
            </h2>
            <div className="space-y-2">
              {data.upcomingSubscriptions.map((subscription) => (
                <SubscriptionItem
                  key={subscription.id}
                  subscription={subscription}
                  onView={onViewSubscription}
                />
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              Recent Activity
            </h2>
            <div className="space-y-1">
              {data.recentTransactions.map((transaction) => (
                <TransactionRow
                  key={transaction.id}
                  transaction={transaction}
                  onView={onViewTransaction}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
