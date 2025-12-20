import { Label } from '../../ui/label'
import { Input } from '../../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select'
import { Switch } from '../../ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import { Checkbox } from '../../ui/checkbox'
import type { Preferences, InsightType } from '../types'

interface PreferencesSectionProps {
  preferences: Preferences
  onUpdate?: (updates: Partial<Preferences>) => void
}

const insightLabels: Record<InsightType, string> = {
  spendingAnomalies: 'Spending Anomalies',
  subscriptionRatio: 'Subscription Ratio',
  savingsRate: 'Savings Rate',
  topCategories: 'Top Categories',
  budgetProgress: 'Budget Progress',
  incomeTrends: 'Income Trends',
  expenseTrends: 'Expense Trends',
}

const allInsights: InsightType[] = [
  'spendingAnomalies',
  'subscriptionRatio',
  'savingsRate',
  'topCategories',
  'budgetProgress',
  'incomeTrends',
  'expenseTrends',
]

export function PreferencesSection({
  preferences,
  onUpdate,
}: PreferencesSectionProps) {
  const handleInsightToggle = (insight: InsightType, enabled: boolean) => {
    const currentInsights = preferences.enabledInsights
    const newInsights = enabled
      ? [...currentInsights, insight]
      : currentInsights.filter(i => i !== insight)
    onUpdate?.({ enabledInsights: newInsights })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 font-geist-sans">
          Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Appearance */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-neutral-900 dark:text-neutral-100 font-geist-sans">
            Appearance
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="theme" className="text-xs font-geist-sans">Theme</Label>
              <Select
                value={preferences.theme}
                onValueChange={(value) => onUpdate?.({ theme: value as any })}
              >
                <SelectTrigger id="theme" className="font-geist-sans">
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
              <Label htmlFor="currency" className="text-xs font-geist-sans">Currency</Label>
              <Select
                value={preferences.currency}
                onValueChange={(value) => onUpdate?.({ currency: value as any })}
              >
                <SelectTrigger id="currency" className="font-geist-sans">
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
              <Label htmlFor="dateFormat" className="text-xs font-geist-sans">Date Format</Label>
              <Select
                value={preferences.dateFormat}
                onValueChange={(value) => onUpdate?.({ dateFormat: value as any })}
              >
                <SelectTrigger id="dateFormat" className="font-geist-sans">
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
        <div className="space-y-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <Label className="text-sm font-medium text-neutral-900 dark:text-neutral-100 font-geist-sans">
            Email Notifications
          </Label>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-enabled" className="text-sm font-geist-sans">
                Enable Email Notifications
              </Label>
              <Switch
                id="email-enabled"
                checked={preferences.emailNotifications.enabled}
                onCheckedChange={(checked) => onUpdate?.({
                  emailNotifications: { ...preferences.emailNotifications, enabled: checked }
                })}
              />
            </div>
            {preferences.emailNotifications.enabled && (
              <div className="space-y-2 ml-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-budget" className="text-sm font-geist-sans">
                    Budget Alerts
                  </Label>
                  <Switch
                    id="email-budget"
                    checked={preferences.emailNotifications.budgetAlerts}
                    onCheckedChange={(checked) => onUpdate?.({
                      emailNotifications: { ...preferences.emailNotifications, budgetAlerts: checked }
                    })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-subscriptions" className="text-sm font-geist-sans">
                    Subscription Reminders
                  </Label>
                  <Switch
                    id="email-subscriptions"
                    checked={preferences.emailNotifications.subscriptionReminders}
                    onCheckedChange={(checked) => onUpdate?.({
                      emailNotifications: { ...preferences.emailNotifications, subscriptionReminders: checked }
                    })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-weekly" className="text-sm font-geist-sans">
                    Weekly Summary
                  </Label>
                  <Switch
                    id="email-weekly"
                    checked={preferences.emailNotifications.weeklySummary}
                    onCheckedChange={(checked) => onUpdate?.({
                      emailNotifications: { ...preferences.emailNotifications, weeklySummary: checked }
                    })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-monthly" className="text-sm font-geist-sans">
                    Monthly Report
                  </Label>
                  <Switch
                    id="email-monthly"
                    checked={preferences.emailNotifications.monthlyReport}
                    onCheckedChange={(checked) => onUpdate?.({
                      emailNotifications: { ...preferences.emailNotifications, monthlyReport: checked }
                    })}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* In-App Notifications */}
        <div className="space-y-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <Label className="text-sm font-medium text-neutral-900 dark:text-neutral-100 font-geist-sans">
            In-App Notifications
          </Label>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="inapp-enabled" className="text-sm font-geist-sans">
                Enable In-App Notifications
              </Label>
              <Switch
                id="inapp-enabled"
                checked={preferences.inAppNotifications.enabled}
                onCheckedChange={(checked) => onUpdate?.({
                  inAppNotifications: { ...preferences.inAppNotifications, enabled: checked }
                })}
              />
            </div>
            {preferences.inAppNotifications.enabled && (
              <div className="space-y-2 ml-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="inapp-budget" className="text-sm font-geist-sans">
                    Budget Alerts
                  </Label>
                  <Switch
                    id="inapp-budget"
                    checked={preferences.inAppNotifications.budgetAlerts}
                    onCheckedChange={(checked) => onUpdate?.({
                      inAppNotifications: { ...preferences.inAppNotifications, budgetAlerts: checked }
                    })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="inapp-subscriptions" className="text-sm font-geist-sans">
                    Subscription Reminders
                  </Label>
                  <Switch
                    id="inapp-subscriptions"
                    checked={preferences.inAppNotifications.subscriptionReminders}
                    onCheckedChange={(checked) => onUpdate?.({
                      inAppNotifications: { ...preferences.inAppNotifications, subscriptionReminders: checked }
                    })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="inapp-insights" className="text-sm font-geist-sans">
                    Insights
                  </Label>
                  <Switch
                    id="inapp-insights"
                    checked={preferences.inAppNotifications.insights}
                    onCheckedChange={(checked) => onUpdate?.({
                      inAppNotifications: { ...preferences.inAppNotifications, insights: checked }
                    })}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Subscription Reminders */}
        <div className="space-y-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <Label htmlFor="reminder-days" className="text-sm font-medium text-neutral-900 dark:text-neutral-100 font-geist-sans">
            Subscription Reminder Days
          </Label>
          <p className="text-xs text-neutral-500 dark:text-neutral-500 font-geist-sans">
            How many days before renewal to send reminders
          </p>
          <Input
            id="reminder-days"
            type="number"
            min="1"
            max="30"
            value={preferences.subscriptionReminderDays}
            onChange={(e) => onUpdate?.({ subscriptionReminderDays: parseInt(e.target.value) || 3 })}
            className="max-w-32 font-geist-mono"
          />
        </div>

        {/* Insight Preferences */}
        <div className="space-y-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <Label className="text-sm font-medium text-neutral-900 dark:text-neutral-100 font-geist-sans">
            Smart Insights
          </Label>
          <p className="text-xs text-neutral-500 dark:text-neutral-500 font-geist-sans">
            Choose which insights to display on your dashboard
          </p>
          <div className="space-y-2">
            {allInsights.map((insight) => (
              <div key={insight} className="flex items-center space-x-2">
                <Checkbox
                  id={`insight-${insight}`}
                  checked={preferences.enabledInsights.includes(insight)}
                  onCheckedChange={(checked) => handleInsightToggle(insight, checked as boolean)}
                />
                <Label
                  htmlFor={`insight-${insight}`}
                  className="text-sm font-geist-sans cursor-pointer"
                >
                  {insightLabels[insight]}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

