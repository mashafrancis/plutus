import {
  ArchiveIcon,
  BankIcon,
  PlusIcon,
  WalletIcon,
} from "@phosphor-icons/react";
import { useState } from "react";

import { useAccountsList } from "@/entities/account/api/use-accounts-list";
import { useAccountsTotalBalance } from "@/entities/account/api/use-accounts-total-balance";
import { useUserSettings } from "@/entities/user-settings/api/use-user-settings";
import { CreateAccountDialog } from "@/features/create-account/ui/create-account-dialog";
import { formatCurrency } from "@/shared/lib/format/currency";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { AccountCard } from "./account-card";

export function AccountsPageSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-32" />
          <Skeleton className="mt-2 h-4 w-48" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-40" />
          <Skeleton className="mt-2 h-3 w-32" />
        </CardContent>
      </Card>
      <div>
        <Skeleton className="mb-4 h-6 w-40" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...new Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="mt-1 h-3 w-16" />
                  </div>
                </div>
                <Skeleton className="h-8 w-8" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-7 w-32" />
                <Skeleton className="mt-1 h-3 w-12" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AccountsPage() {
  const [showArchived, setShowArchived] = useState(false);
  const { data: settings } = useUserSettings();
  const { data: accounts } = useAccountsList({
    includeArchived: showArchived,
  });
  const { data: balanceData } = useAccountsTotalBalance(
    settings ? { baseCurrency: settings.baseCurrency } : "skip"
  );

  if (!(accounts && settings && balanceData)) {
    return <AccountsPageSkeleton />;
  }

  const activeAccounts = accounts.filter((a) => !a.isArchived);
  const archivedAccounts = accounts.filter((a) => a.isArchived);
  const totalBalance = balanceData.total;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl tracking-tight">Accounts</h1>
          <p className="text-muted-foreground text-sm">
            Manage your bank accounts, cards, and wallets
          </p>
        </div>
        <CreateAccountDialog />
      </div>

      {/* Total Balance Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="font-medium text-sm">Total Balance</CardTitle>
          <BankIcon className="h-4 w-4 text-muted-foreground" weight="bold" />
        </CardHeader>
        <CardContent>
          <div className="font-bold text-2xl">
            {formatCurrency(totalBalance, settings.baseCurrency)}
          </div>
          <p className="text-muted-foreground text-xs">
            Across {activeAccounts.length} active accounts
          </p>
        </CardContent>
      </Card>

      {/* Active Accounts */}
      <div>
        <h2 className="mb-4 font-semibold text-lg">Active Accounts</h2>
        {activeAccounts.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activeAccounts.map((account) => (
              <AccountCard account={account} key={account._id} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <WalletIcon className="h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">No accounts yet</p>
              <CreateAccountDialog>
                <Button className="mt-4" variant="outline">
                  <PlusIcon className="mr-2" data-icon="inline-start" />
                  Add your first account
                </Button>
              </CreateAccountDialog>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Archived Accounts Toggle */}
      {archivedAccounts.length > 0 && (
        <div>
          <Button
            className="mb-4"
            onClick={() => setShowArchived(!showArchived)}
            variant="ghost"
          >
            <ArchiveIcon weight="bold" className="mr-2" />
            {showArchived ? "Hide" : "Show"} Archived ({archivedAccounts.length}
            )
          </Button>
          {showArchived && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {archivedAccounts.map((account) => (
                <AccountCard account={account} isArchived key={account._id} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
