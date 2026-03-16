import {
  ArchiveIcon,
  ArrowCounterClockwiseIcon,
  CreditCardIcon,
  DotsThreeIcon,
} from "@phosphor-icons/react";
import { api } from "@tanstack-effect-convex/backend/convex/_generated/api";
import type { Doc } from "@tanstack-effect-convex/backend/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ACCOUNT_TYPES } from "@/entities/account/config/account-types";
import { DeleteAccountMenuItem } from "@/features/delete-account/ui/delete-account-menu-item";
import { formatCurrency } from "@/shared/lib/format/currency";

interface AccountCardProps {
  account: Doc<"accounts">;
  isArchived?: boolean;
}

export function AccountCard({ account, isArchived = false }: AccountCardProps) {
  const archiveAccount = useMutation(api.accounts.archive);
  const unarchiveAccount = useMutation(api.accounts.unarchive);

  const TypeIcon = ACCOUNT_TYPES.find((t) => t.value === account.type)?.icon || CreditCardIcon;

  const handleArchive = async () => {
    try {
      await archiveAccount({ id: account._id });
      toast.success("Account archived");
    } catch {
      toast.error("Failed to archive account");
    }
  };

  const handleUnarchive = async () => {
    try {
      await unarchiveAccount({ id: account._id });
      toast.success("Account restored");
    } catch {
      toast.error("Failed to restore account");
    }
  };

  return (
    <Card className={isArchived ? "opacity-60" : ""}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <TypeIcon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-base">{account.name}</CardTitle>
            <CardDescription className="capitalize">{account.type}</CardDescription>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button aria-label="Account options" size="icon" variant="ghost">
                <DotsThreeIcon aria-hidden weight="bold" />
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            {isArchived ? (
              <DropdownMenuItem onClick={handleUnarchive}>
                <ArrowCounterClockwiseIcon className="mr-2" weight="bold" />
                Restore
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={handleArchive}>
                <ArchiveIcon className="mr-2" weight="bold" />
                Archive
              </DropdownMenuItem>
            )}
            <DeleteAccountMenuItem accountId={account._id} />
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="font-bold text-2xl">
          {formatCurrency(account.balance, account.currency)}
        </div>
        <p className="text-muted-foreground text-xs">{account.currency}</p>
      </CardContent>
    </Card>
  );
}
