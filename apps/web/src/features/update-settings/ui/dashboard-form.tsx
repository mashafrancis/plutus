import { GearIcon as SettingsIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useUpdateSettings } from "@/entities/user-settings/api/use-update-settings";
import { useUserSettings } from "@/entities/user-settings/api/use-user-settings";
import { DATE_RANGES } from "../model/constants";

export function DashboardForm() {
  const { data: settings } = useUserSettings();
  const updateSettings = useUpdateSettings();

  if (!settings) {
    return (
      <Card>
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
    );
  }

  const handleDateRangeChange = async (days: string) => {
    try {
      await updateSettings({ dashboardDateRange: Number.parseInt(days, 10) });
      toast.success("Dashboard date range updated");
    } catch {
      toast.error("Failed to update date range");
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <SettingsIcon className="h-5 w-5" />
          <CardTitle>Dashboard</CardTitle>
        </div>
        <CardDescription>Customize your dashboard experience</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="dateRange">Default Date Range</Label>
          <Select
            items={DATE_RANGES.map((r) => ({
              value: r.value.toString(),
              label: r.label,
            }))}
            onValueChange={(val: string | null) => val && handleDateRangeChange(val)}
            value={settings.dashboardDateRange.toString()}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              {DATE_RANGES.map((r) => (
                <SelectItem key={r.value} value={r.value.toString()}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
