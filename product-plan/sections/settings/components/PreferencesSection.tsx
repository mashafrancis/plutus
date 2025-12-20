import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Checkbox } from "../../ui/checkbox";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Switch } from "../../ui/switch";
import type { InsightType, Preferences } from "../types";

interface PreferencesSectionProps {
  preferences: Preferences;
  onUpdate?: (updates: Partial<Preferences>) => void;
}

const insightLabels: Record<InsightType, string> = {
  spendingAnomalies: "Spending Anomalies",
  subscriptionRatio: "Subscription Ratio",
  savingsRate: "Savings Rate",
  topCategories: "Top Categories",
  budgetProgress: "Budget Progress",
  incomeTrends: "Income Trends",
  expenseTrends: "Expense Trends",
};

const allInsights: InsightType[] = [
  "spendingAnomalies",
  "subscriptionRatio",
  "savingsRate",
  "topCategories",
  "budgetProgress",
  "incomeTrends",
  "expenseTrends",
];

export function PreferencesSection({
  preferences,
  onUpdate,
}: PreferencesSectionProps) {
  const handleInsightToggle = (insight: InsightType, enabled: boolean) => {
    const currentInsights = preferences.enabledInsights;
    const newInsights = enabled
      ? [...currentInsights, insight]
      : currentInsights.filter((i) => i !== insight);
    onUpdate?.({ enabledInsights: newInsights });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-geist-sans font-semibold text-lg text-neutral-900 dark:text-neutral-100">
          Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Appearance */}
        <div className="space-y-3">
          <Label className="font-geist-sans font-medium text-neutral-900 text-sm dark:text-neutral-100">
            Appearance
          </Label>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label className="font-geist-sans text-xs" htmlFor="theme">
                Theme
              </Label>
              <Select
                onValueChange={(value) => onUpdate?.({ theme: value as any })}
                value={preferences.theme}
              >
                <SelectTrigger className="font-geist-sans" id="theme">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-geist-sans text-xs" htmlFor="currency">
                Currency
              </Label>
              <Select
                onValueChange={(value) =>
                  onUpdate?.({ currency: value as any })
                }
                value={preferences.currency}
              >
                <SelectTrigger className="font-geist-sans" id="currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="JPY">JPY (¥)</SelectItem>
                  <SelectItem value="CAD">CAD ($)</SelectItem>
                  <SelectItem value="AUD">AUD ($)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-geist-sans text-xs" htmlFor="dateFormat">
                Date Format
              </Label>
              <Select
                onValueChange={(value) =>
                  onUpdate?.({ dateFormat: value as any })
                }
                value={preferences.dateFormat}
              >
                <SelectTrigger className="font-geist-sans" id="dateFormat">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Email Notifications */}
        <div className="space-y-3 border-neutral-200 border-t pt-4 dark:border-neutral-800">
          <Label className="font-geist-sans font-medium text-neutral-900 text-sm dark:text-neutral-100">
            Email Notifications
          </Label>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label
                className="font-geist-sans text-sm"
                htmlFor="email-enabled"
              >
                Enable Email Notifications
              </Label>
              <Switch
                checked={preferences.emailNotifications.enabled}
                id="email-enabled"
                onCheckedChange={(checked) =>
                  onUpdate?.({
                    emailNotifications: {
                      ...preferences.emailNotifications,
                      enabled: checked,
                    },
                  })
                }
              />
            </div>
            {preferences.emailNotifications.enabled && (
              <div className="ml-4 space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    className="font-geist-sans text-sm"
                    htmlFor="email-budget"
                  >
                    Budget Alerts
                  </Label>
                  <Switch
                    checked={preferences.emailNotifications.budgetAlerts}
                    id="email-budget"
                    onCheckedChange={(checked) =>
                      onUpdate?.({
                        emailNotifications: {
                          ...preferences.emailNotifications,
                          budgetAlerts: checked,
                        },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label
                    className="font-geist-sans text-sm"
                    htmlFor="email-subscriptions"
                  >
                    Subscription Reminders
                  </Label>
                  <Switch
                    checked={
                      preferences.emailNotifications.subscriptionReminders
                    }
                    id="email-subscriptions"
                    onCheckedChange={(checked) =>
                      onUpdate?.({
                        emailNotifications: {
                          ...preferences.emailNotifications,
                          subscriptionReminders: checked,
                        },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label
                    className="font-geist-sans text-sm"
                    htmlFor="email-weekly"
                  >
                    Weekly Summary
                  </Label>
                  <Switch
                    checked={preferences.emailNotifications.weeklySummary}
                    id="email-weekly"
                    onCheckedChange={(checked) =>
                      onUpdate?.({
                        emailNotifications: {
                          ...preferences.emailNotifications,
                          weeklySummary: checked,
                        },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label
                    className="font-geist-sans text-sm"
                    htmlFor="email-monthly"
                  >
                    Monthly Report
                  </Label>
                  <Switch
                    checked={preferences.emailNotifications.monthlyReport}
                    id="email-monthly"
                    onCheckedChange={(checked) =>
                      onUpdate?.({
                        emailNotifications: {
                          ...preferences.emailNotifications,
                          monthlyReport: checked,
                        },
                      })
                    }
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* In-App Notifications */}
        <div className="space-y-3 border-neutral-200 border-t pt-4 dark:border-neutral-800">
          <Label className="font-geist-sans font-medium text-neutral-900 text-sm dark:text-neutral-100">
            In-App Notifications
          </Label>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label
                className="font-geist-sans text-sm"
                htmlFor="inapp-enabled"
              >
                Enable In-App Notifications
              </Label>
              <Switch
                checked={preferences.inAppNotifications.enabled}
                id="inapp-enabled"
                onCheckedChange={(checked) =>
                  onUpdate?.({
                    inAppNotifications: {
                      ...preferences.inAppNotifications,
                      enabled: checked,
                    },
                  })
                }
              />
            </div>
            {preferences.inAppNotifications.enabled && (
              <div className="ml-4 space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    className="font-geist-sans text-sm"
                    htmlFor="inapp-budget"
                  >
                    Budget Alerts
                  </Label>
                  <Switch
                    checked={preferences.inAppNotifications.budgetAlerts}
                    id="inapp-budget"
                    onCheckedChange={(checked) =>
                      onUpdate?.({
                        inAppNotifications: {
                          ...preferences.inAppNotifications,
                          budgetAlerts: checked,
                        },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label
                    className="font-geist-sans text-sm"
                    htmlFor="inapp-subscriptions"
                  >
                    Subscription Reminders
                  </Label>
                  <Switch
                    checked={
                      preferences.inAppNotifications.subscriptionReminders
                    }
                    id="inapp-subscriptions"
                    onCheckedChange={(checked) =>
                      onUpdate?.({
                        inAppNotifications: {
                          ...preferences.inAppNotifications,
                          subscriptionReminders: checked,
                        },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label
                    className="font-geist-sans text-sm"
                    htmlFor="inapp-insights"
                  >
                    Insights
                  </Label>
                  <Switch
                    checked={preferences.inAppNotifications.insights}
                    id="inapp-insights"
                    onCheckedChange={(checked) =>
                      onUpdate?.({
                        inAppNotifications: {
                          ...preferences.inAppNotifications,
                          insights: checked,
                        },
                      })
                    }
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Subscription Reminders */}
        <div className="space-y-3 border-neutral-200 border-t pt-4 dark:border-neutral-800">
          <Label
            className="font-geist-sans font-medium text-neutral-900 text-sm dark:text-neutral-100"
            htmlFor="reminder-days"
          >
            Subscription Reminder Days
          </Label>
          <p className="font-geist-sans text-neutral-500 text-xs dark:text-neutral-500">
            How many days before renewal to send reminders
          </p>
          <Input
            className="max-w-32 font-geist-mono"
            id="reminder-days"
            max="30"
            min="1"
            onChange={(e) =>
              onUpdate?.({
                subscriptionReminderDays: Number.parseInt(e.target.value) || 3,
              })
            }
            type="number"
            value={preferences.subscriptionReminderDays}
          />
        </div>

        {/* Insight Preferences */}
        <div className="space-y-3 border-neutral-200 border-t pt-4 dark:border-neutral-800">
          <Label className="font-geist-sans font-medium text-neutral-900 text-sm dark:text-neutral-100">
            Smart Insights
          </Label>
          <p className="font-geist-sans text-neutral-500 text-xs dark:text-neutral-500">
            Choose which insights to display on your dashboard
          </p>
          <div className="space-y-2">
            {allInsights.map((insight) => (
              <div className="flex items-center space-x-2" key={insight}>
                <Checkbox
                  checked={preferences.enabledInsights.includes(insight)}
                  id={`insight-${insight}`}
                  onCheckedChange={(checked) =>
                    handleInsightToggle(insight, checked as boolean)
                  }
                />
                <Label
                  className="cursor-pointer font-geist-sans text-sm"
                  htmlFor={`insight-${insight}`}
                >
                  {insightLabels[insight]}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
