import { AccountForm } from "@/features/update-settings/ui/account-form";
import { CurrencyForm } from "@/features/update-settings/ui/currency-form";
import { DashboardForm } from "@/features/update-settings/ui/dashboard-form";
import { NotificationsForm } from "@/features/update-settings/ui/notifications-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SettingsPageSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
      <div>
        <Skeleton className="h-8 w-24" />
        <Skeleton className="mt-2 h-4 w-64" />
      </div>
      {[...new Array(4)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-5 w-24" />
            </div>
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-[200px]" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function SettingsPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
      <div>
        <h1 className="font-bold text-2xl tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-sm">
          Customize your preferences and notifications
        </p>
      </div>

      <CurrencyForm />
      <AccountForm />
      <DashboardForm />
      <NotificationsForm />
    </div>
  );
}
