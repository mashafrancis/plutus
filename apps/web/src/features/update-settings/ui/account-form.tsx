import type { Id } from "@tanstack-effect-convex/backend/convex/_generated/dataModel";
import { WalletIcon } from "@phosphor-icons/react";
import { toast } from "sonner";

import { useAccountsList } from "@/entities/account/api/use-accounts-list";
import { useUpdateSettings } from "@/entities/user-settings/api/use-update-settings";
import { useUserSettings } from "@/entities/user-settings/api/use-user-settings";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

export function AccountForm() {
  const { data: settings } = useUserSettings();
  const { data: accounts } = useAccountsList();
  const updateSettings = useUpdateSettings();

  if (!(settings && accounts)) {
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

  const handleDefaultAccountChange = async (accountId: string) => {
    try {
      await updateSettings({ defaultAccountId: accountId as Id<"accounts"> });
      toast.success("Default account updated");
    } catch {
      toast.error("Failed to update default account");
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <WalletIcon className="h-5 w-5" />
          <CardTitle>Accounts</CardTitle>
        </div>
        <CardDescription>
          Configure your default account for transactions
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="defaultAccount">Default Account</Label>
          <Select
            items={accounts.map((a) => ({ value: a._id, label: a.name }))}
            onValueChange={(val: string | null) =>
              val && handleDefaultAccountChange(val)
            }
            value={settings.defaultAccountId || ""}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((a) => (
                <SelectItem key={a._id} value={a._id}>
                  {a.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
