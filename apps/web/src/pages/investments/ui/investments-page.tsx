import { CaretDownIcon, CaretUpIcon, PlusIcon, TrendUpIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useInvestmentsPortfolio } from "@/entities/investment/api/use-investments-portfolio";
import { useUserSettings } from "@/entities/user-settings/api/use-user-settings";
import { CreateInvestmentDialog } from "@/features/create-investment/ui/create-investment-dialog";
import { formatCurrency } from "@/shared/lib/format/currency";
import { formatPercent } from "@/shared/lib/format/percent";

import { InvestmentItem } from "./investment-item";

export function InvestmentsPageSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-40" />
          <Skeleton className="mt-2 h-4 w-56" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {new Array(3).fill().map((_, i) => (
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
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-40" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {new Array(3).fill().map((_, i) => (
              <div className="flex items-center justify-between rounded-lg border p-4" key={i}>
                <div className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="mt-1 h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-8 w-20" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function InvestmentsPage() {
  const { data: settings } = useUserSettings();
  const { data: portfolio } = useInvestmentsPortfolio(
    settings ? { baseCurrency: settings.baseCurrency } : "skip",
  );

  if (!(portfolio && settings)) {
    return <InvestmentsPageSkeleton />;
  }

  const isPositive = portfolio.totalGain >= 0;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl tracking-tight">Investments</h1>
          <p className="text-muted-foreground text-sm">Monitor your portfolio performance</p>
        </div>
        <CreateInvestmentDialog />
      </div>

      {/* Portfolio Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-medium text-sm">Total Value</CardTitle>
            <TrendUpIcon className="h-4 w-4 text-muted-foreground" weight="bold" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">
              {formatCurrency(portfolio.totalValue, settings.baseCurrency)}
            </div>
            <p className="text-muted-foreground text-xs">
              Cost basis: {formatCurrency(portfolio.totalCost, settings.baseCurrency)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-medium text-sm">Total Gain/Loss</CardTitle>
            {isPositive ? (
              <CaretUpIcon className="h-4 w-4 text-chart-2" />
            ) : (
              <CaretDownIcon className="h-4 w-4 text-destructive" />
            )}
          </CardHeader>
          <CardContent>
            <div
              className={`font-bold text-2xl ${isPositive ? "text-chart-2" : "text-destructive"}`}
            >
              {isPositive ? "+" : ""}
              {formatCurrency(portfolio.totalGain, settings.baseCurrency)}
            </div>
            <p className={`text-xs ${isPositive ? "text-chart-2" : "text-destructive"}`}>
              {isPositive ? "+" : ""}
              {formatPercent(portfolio.gainPercent)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-medium text-sm">Holdings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{portfolio.investments.length}</div>
            <p className="text-muted-foreground text-xs">investments</p>
          </CardContent>
        </Card>
      </div>

      {/* Holdings List */}
      <Card>
        <CardHeader>
          <CardTitle>Holdings</CardTitle>
          <CardDescription>Your investment positions</CardDescription>
        </CardHeader>
        <CardContent>
          {portfolio.investments.length > 0 ? (
            <div className="flex flex-col gap-4">
              {portfolio.investments.map((inv) => (
                <InvestmentItem investment={inv} key={inv.id} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <TrendUpIcon className="h-12 w-12 text-muted-foreground" weight="bold" />
              <p className="mt-4 text-muted-foreground">No investments yet</p>
              <CreateInvestmentDialog>
                <Button className="mt-4" variant="outline">
                  <PlusIcon className="mr-2" data-icon="inline-start" />
                  Add your first investment
                </Button>
              </CreateInvestmentDialog>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
