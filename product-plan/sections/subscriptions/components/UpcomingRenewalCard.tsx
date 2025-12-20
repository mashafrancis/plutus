import { AlertTriangle, Clock } from "lucide-react";
import { Badge } from "../../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import type { Account, Subscription } from "../types";
import { cn } from "./utils";

interface UpcomingRenewalCardProps {
  subscriptions: Subscription[];
  accounts: Account[];
  onViewSubscription?: (id: string) => void;
}

function getDaysUntil(dateString: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const targetDate = new Date(dateString);
  targetDate.setHours(0, 0, 0, 0);
  const diffTime = targetDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function getUrgencyLevel(daysUntil: number): "urgent" | "soon" | "normal" {
  if (daysUntil <= 2) return "urgent";
  if (daysUntil <= 5) return "soon";
  return "normal";
}

export function UpcomingRenewalCard({
  subscriptions,
  accounts,
  onViewSubscription,
}: UpcomingRenewalCardProps) {
  const formatCurrency = (amount: number) =>
    `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const getAccount = (accountId: string) =>
    accounts.find((a) => a.id === accountId);

  // Filter to only active subscriptions due within 7 days
  const upcomingRenewals = subscriptions
    .filter((sub) => sub.status === "active")
    .map((sub) => ({
      ...sub,
      daysUntil: getDaysUntil(sub.nextPaymentDate),
    }))
    .filter((sub) => sub.daysUntil >= 0 && sub.daysUntil <= 7)
    .sort((a, b) => a.daysUntil - b.daysUntil);

  if (upcomingRenewals.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="p-6 text-center">
          <Clock className="mx-auto mb-2 h-8 w-8 text-neutral-400" />
          <p className="font-geist-sans text-neutral-600 dark:text-neutral-400">
            No renewals in the next 7 days
          </p>
        </CardContent>
      </Card>
    );
  }

  const totalAmount = upcomingRenewals.reduce(
    (sum, sub) => sum + sub.amount,
    0
  );

  return (
    <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 font-geist-sans font-semibold text-lg text-neutral-900 dark:text-neutral-100">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            Upcoming Renewals
          </CardTitle>
          <Badge
            className="border-amber-300 bg-amber-100 font-geist-mono text-amber-700 dark:border-amber-700 dark:bg-amber-900 dark:text-amber-300"
            variant="outline"
          >
            {formatCurrency(totalAmount)} total
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {upcomingRenewals.map((subscription) => {
            const urgency = getUrgencyLevel(subscription.daysUntil);
            const account = getAccount(subscription.paymentMethodId);

            return (
              <div
                className={cn(
                  "flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors",
                  urgency === "urgent" &&
                    "border-red-200 bg-red-50 hover:bg-red-100 dark:border-red-800 dark:bg-red-950/30 dark:hover:bg-red-950/50",
                  urgency === "soon" &&
                    "border-amber-200 bg-amber-50 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950/30 dark:hover:bg-amber-950/50",
                  urgency === "normal" &&
                    "border-neutral-200 bg-white hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                )}
                key={subscription.id}
                onClick={() => onViewSubscription?.(subscription.id)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full",
                      urgency === "urgent" && "bg-red-500",
                      urgency === "soon" && "bg-amber-500",
                      urgency === "normal" && "bg-blue-500"
                    )}
                  />
                  <div>
                    <p className="font-geist-sans font-medium text-neutral-900 dark:text-neutral-100">
                      {subscription.name}
                    </p>
                    <p className="font-geist-sans text-neutral-500 text-xs dark:text-neutral-400">
                      {account?.name || "Unknown account"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-geist-mono font-semibold text-neutral-900 dark:text-neutral-100">
                    {formatCurrency(subscription.amount)}
                  </p>
                  <p
                    className={cn(
                      "font-medium text-xs",
                      urgency === "urgent" && "text-red-600 dark:text-red-400",
                      urgency === "soon" &&
                        "text-amber-600 dark:text-amber-400",
                      urgency === "normal" &&
                        "text-neutral-600 dark:text-neutral-400"
                    )}
                  >
                    {subscription.daysUntil === 0 && "Due today"}
                    {subscription.daysUntil === 1 && "Due tomorrow"}
                    {subscription.daysUntil > 1 &&
                      `Due in ${subscription.daysUntil} days`}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
