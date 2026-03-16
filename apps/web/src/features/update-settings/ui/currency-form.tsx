import { CurrencyDollarIcon } from "@phosphor-icons/react";
import { api } from "@tanstack-effect-convex/backend/convex/_generated/api";
import { useMutation } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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
import { CURRENCIES } from "@/shared/config/currencies";

export function CurrencyForm() {
  const { data: settings } = useUserSettings();
  const updateSettings = useUpdateSettings();
  const initializeBaseCurrencyFromLocale = useMutation(
    api.userSettings.initializeBaseCurrencyFromLocale,
  );
  const [isDetecting, setIsDetecting] = useState(false);

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

  const handleCurrencyChange = async (currency: string) => {
    try {
      await updateSettings({ baseCurrency: currency });
      toast.success("Currency updated");
    } catch {
      toast.error("Failed to update currency");
    }
  };

  const handleAutoDetectCurrency = async () => {
    setIsDetecting(true);
    try {
      const locale = navigator.language;
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const detectedCurrency = await initializeBaseCurrencyFromLocale({
        locale,
        timeZone,
      });

      await updateSettings({ baseCurrency: detectedCurrency });
      toast.success(`Currency auto-detected: ${detectedCurrency}`);
    } catch {
      toast.error("Failed to auto-detect currency");
    } finally {
      setIsDetecting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CurrencyDollarIcon className="h-5 w-5" weight="bold" />
          <CardTitle>Currency</CardTitle>
        </div>
        <CardDescription>Set your base currency for calculations and display</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="currency">Base Currency</Label>
          <Select
            items={CURRENCIES}
            onValueChange={(val: string | null) => val && handleCurrencyChange(val)}
            value={settings.baseCurrency || "KES"}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              {CURRENCIES.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end">
          <Button
            disabled={isDetecting}
            onClick={handleAutoDetectCurrency}
            type="button"
            variant="outline"
          >
            {isDetecting ? "Detecting..." : "Auto-detect currency"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
