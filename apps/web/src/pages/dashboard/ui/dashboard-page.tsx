import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  TrendUpIcon,
  WalletIcon,
} from "@phosphor-icons/react";
import { api } from "@tanstack-effect-convex/backend/convex/_generated/api";
import { useMutation } from "convex/react";
import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardSummary } from "@/entities/dashboard/api/use-dashboard-summary";
import {
  getTransactionBgClass,
  getTransactionTextClass,
} from "@/entities/transaction/lib/get-transaction-style";
import { TransactionIcon } from "@/entities/transaction/ui/transaction-icon";
import { useUserSettings } from "@/entities/user-settings/api/use-user-settings";
import { formatCurrency } from "@/shared/lib/format/currency";
import { formatDate } from "@/shared/lib/format/date";
import { formatPercent } from "@/shared/lib/format/percent";
import { OnboardingWizard } from "@/widgets/onboarding-wizard/ui/onboarding-wizard";

export function DashboardPageSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {new Array(4).fill().map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-32" />
              <Skeleton className="mt-2 h-3 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-3">
          <CardHeader>
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[200px] w-full" />
          </CardContent>
        </Card>
        <Card className="lg:col-span-4">
          <CardHeader>
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-32" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {new Array(5).fill().map((_, i) => (
                <div className="flex items-center gap-4" key={i}>
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <div className="flex flex-1 flex-col gap-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function DashboardPage() {
  const { data: settings } = useUserSettings();
  const { data: summary } = useDashboardSummary(
    settings ? { days: 30, baseCurrency: settings.baseCurrency } : "skip",
  );
  const seedCategories = useMutation(api.categories.seedDefaultCategories);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Seed categories on first load
  useEffect(() => {
    seedCategories();
  }, [seedCategories]);

  // Check if onboarding should be shown
  useEffect(() => {
    if (settings && !settings.onboardingCompleted) {
      setShowOnboarding(true);
    }
  }, [settings]);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  const handleOnboardingSkip = () => {
    setShowOnboarding(false);
  };

  if (!(summary && settings)) {
    return <DashboardPageSkeleton />;
  }

  return (
    <>
      {/* Onboarding Wizard */}
      {showOnboarding && settings && (
        <OnboardingWizard
          initialStep={settings.onboardingStep ?? 0}
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingSkip}
        />
      )}

      {/* Dashboard Content */}
      <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-2xl tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground text-sm">Your financial overview at a glance</p>
          </div>
          <p className="text-muted-foreground text-sm">Last 30 days</p>
        </div>

        {/* Balance Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="font-medium text-sm">Total Balance</CardTitle>
              <WalletIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="font-bold text-2xl">
                {formatCurrency(summary.totalBalance, settings.baseCurrency)}
              </div>
              <p className="text-muted-foreground text-xs">
                Across {summary.accountBalances.length} accounts
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="font-medium text-sm">Income</CardTitle>
              <ArrowUpRightIcon className="h-4 w-4 text-chart-2" />
            </CardHeader>
            <CardContent>
              <div className="font-bold text-2xl text-chart-2">
                +{formatCurrency(summary.totalIncome, settings.baseCurrency)}
              </div>
              <p className="text-muted-foreground text-xs">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="font-medium text-sm">Expenses</CardTitle>
              <ArrowDownRightIcon className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="font-bold text-2xl text-destructive">
                -{formatCurrency(summary.totalExpenses, settings.baseCurrency)}
              </div>
              <p className="text-muted-foreground text-xs">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="font-medium text-sm">Net Change</CardTitle>
              <TrendUpIcon className="h-4 w-4 text-muted-foreground" weight="bold" />
            </CardHeader>
            <CardContent>
              <div
                className={`font-bold text-2xl ${
                  summary.netChange >= 0 ? "text-chart-2" : "text-destructive"
                }`}
              >
                {summary.netChange >= 0 ? "+" : ""}
                {formatCurrency(summary.netChange, settings.baseCurrency)}
              </div>
              <p className="text-muted-foreground text-xs">This month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-7">
          {/* Spending by Category */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Spending by Category</CardTitle>
              <CardDescription>Where your money goes</CardDescription>
            </CardHeader>
            <CardContent>
              {summary.spendingByCategory.length > 0 ? (
                <div className="flex flex-col gap-4">
                  <div className="h-[200px]">
                    <ResponsiveContainer height="100%" width="100%">
                      <PieChart>
                        <Pie
                          cx="50%"
                          cy="50%"
                          data={summary.spendingByCategory as unknown as Record<string, unknown>[]}
                          dataKey="amount"
                          innerRadius={60}
                          nameKey="name"
                          outerRadius={80}
                          paddingAngle={2}
                        >
                          {summary.spendingByCategory.map((entry, index) => (
                            <Cell fill={entry.color} key={index} />
                          ))}
                        </Pie>
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload?.[0]) {
                              const data = payload[0].payload;
                              return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                  <div className="flex items-center gap-2">
                                    <span>{data.icon}</span>
                                    <span className="font-medium">{data.name}</span>
                                  </div>
                                  <p className="text-muted-foreground text-sm">
                                    {formatCurrency(data.amount, settings.baseCurrency)} (
                                    {formatPercent(data.percentage)})
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-col gap-2">
                    {summary.spendingByCategory.slice(0, 5).map((cat) => (
                      <div className="flex items-center gap-2" key={cat.categoryId}>
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: cat.color }}
                        />
                        <span className="flex-1 text-sm">{cat.name}</span>
                        <span className="font-medium text-sm">
                          {formatCurrency(cat.amount, settings.baseCurrency)}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          {formatPercent(cat.percentage)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex h-[200px] items-center justify-center text-muted-foreground">
                  No spending data yet
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest activity</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                {summary.recentTransactions.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {summary.recentTransactions.map((tx) => (
                      <div className="flex items-center gap-4" key={tx._id}>
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-full ${getTransactionBgClass(tx.type)}`}
                        >
                          <TransactionIcon type={tx.type} />
                        </div>
                        <div className="flex flex-1 flex-col gap-1">
                          <p className="font-medium text-sm leading-none">{tx.description}</p>
                          <p className="text-muted-foreground text-xs">{formatDate(tx.date)}</p>
                        </div>
                        <div className={`font-medium text-sm ${getTransactionTextClass(tx.type)}`}>
                          {tx.type === "income" ? "+" : "-"}
                          {formatCurrency(tx.amount, tx.currency)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-[200px] items-center justify-center text-muted-foreground">
                    No transactions yet
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Account Balances */}
          <Card>
            <CardHeader>
              <CardTitle>Accounts</CardTitle>
              <CardDescription>Your account balances</CardDescription>
            </CardHeader>
            <CardContent>
              {summary.accountBalances.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {summary.accountBalances.map((account) => (
                    <div className="flex items-center gap-4" key={account.id}>
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <CreditCardIcon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{account.name}</p>
                        <p className="text-muted-foreground text-xs capitalize">{account.type}</p>
                      </div>
                      <p className="font-medium text-sm">
                        {formatCurrency(account.balance, account.currency)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-[150px] items-center justify-center text-muted-foreground">
                  No accounts yet
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Subscriptions */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Renewals</CardTitle>
              <CardDescription>Subscriptions due in 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              {summary.upcomingSubscriptions.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {summary.upcomingSubscriptions.map((sub) => (
                    <div className="flex items-center gap-4" key={sub._id}>
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <CurrencyDollarIcon className="h-4 w-4 text-primary" weight="bold" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{sub.name}</p>
                        <p className="text-muted-foreground text-xs">
                          Due {formatDate(sub.nextRenewalDate)}
                        </p>
                      </div>
                      <p className="font-medium text-sm">
                        {formatCurrency(sub.amount, sub.currency)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-[150px] items-center justify-center text-muted-foreground">
                  No upcoming renewals
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
