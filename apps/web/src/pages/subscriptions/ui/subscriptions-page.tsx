import {
  CalendarIcon,
  CurrencyDollarIcon,
  PauseIcon,
  PlayIcon,
  PlusIcon,
} from "@phosphor-icons/react";

import { useAccountsList } from "@/entities/account/api/use-accounts-list";
import { useCategoriesList } from "@/entities/category/api/use-categories-list";
import { useSubscriptionsList } from "@/entities/subscription/api/use-subscriptions-list";
import { useSubscriptionsTotalMonthly } from "@/entities/subscription/api/use-subscriptions-total-monthly";
import { useUserSettings } from "@/entities/user-settings/api/use-user-settings";
import { CreateSubscriptionDialog } from "@/features/create-subscription/ui/create-subscription-dialog";
import { formatCurrency } from "@/shared/lib/format/currency";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { SubscriptionItem } from "./subscription-item";

export function SubscriptionsPageSkeleton() {
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
        {[...new Array(3)].map((_, i) => (
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
          <Skeleton className="h-5 w-40" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {[...new Array(3)].map((_, i) => (
              <div
                className="flex items-center justify-between rounded-lg border p-4"
                key={i}
              >
                <div className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="mt-1 h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-8 w-8" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function SubscriptionsPage() {
  const { data: settings } = useUserSettings();
  const { data: subscriptions } = useSubscriptionsList();
  const { data: totalMonthly } = useSubscriptionsTotalMonthly(
    settings ? { baseCurrency: settings.baseCurrency } : "skip"
  );
  const { data: accounts } = useAccountsList();
  const { data: categories } = useCategoriesList();

  if (
    !(subscriptions && accounts && categories && settings) ||
    totalMonthly === undefined
  ) {
    return <SubscriptionsPageSkeleton />;
  }

  const activeCount = subscriptions.filter((s) => s.status === "active").length;
  const pausedCount = subscriptions.filter((s) => s.status === "paused").length;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl tracking-tight">Subscriptions</h1>
          <p className="text-muted-foreground text-sm">
            Track and manage your recurring payments
          </p>
        </div>
        <CreateSubscriptionDialog accounts={accounts} categories={categories} />
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-medium text-sm">Monthly Cost</CardTitle>
            <CurrencyDollarIcon className="h-4 w-4 text-muted-foreground" weight="bold" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">
              {formatCurrency(totalMonthly, settings.baseCurrency)}
            </div>
            <p className="text-muted-foreground text-xs">per month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-medium text-sm">Active</CardTitle>
            <PlayIcon className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{activeCount}</div>
            <p className="text-muted-foreground text-xs">subscriptions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-medium text-sm">Paused</CardTitle>
            <PauseIcon className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{pausedCount}</div>
            <p className="text-muted-foreground text-xs">subscriptions</p>
          </CardContent>
        </Card>
      </div>

      {/* Subscriptions List */}
      <Card>
        <CardHeader>
          <CardTitle>All Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          {subscriptions.length > 0 ? (
            <div className="flex flex-col gap-4">
              {subscriptions.map((sub) => (
                <SubscriptionItem key={sub._id} subscription={sub} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <CalendarIcon className="h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">No subscriptions yet</p>
              <CreateSubscriptionDialog
                accounts={accounts}
                categories={categories}
              >
                <Button className="mt-4" variant="outline">
                  <PlusIcon className="mr-2" data-icon="inline-start" />
                  Add your first subscription
                </Button>
              </CreateSubscriptionDialog>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
