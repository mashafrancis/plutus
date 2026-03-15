import { PlusIcon, TrashIcon } from "@phosphor-icons/react";
import { api } from "@tanstack-effect-convex/backend/convex/_generated/api";
import type { Id } from "@tanstack-effect-convex/backend/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAccountsList } from "@/entities/account/api/use-accounts-list";

const ACCOUNT_TYPES = [
  { value: "checking", label: "Checking" },
  { value: "savings", label: "Savings" },
  { value: "credit", label: "Credit Card" },
  { value: "cash", label: "Cash" },
  { value: "investment", label: "Investment" },
] as const;

const CURRENCIES = [
  { value: "KES", label: "KES (KSh)" },
  { value: "USD", label: "USD ($)" },
  { value: "EUR", label: "EUR (€)" },
  { value: "GBP", label: "GBP (£)" },
  { value: "JPY", label: "JPY (¥)" },
] as const;

export default function StepAccounts() {
  const { data: accounts } = useAccountsList();
  const createAccount = useMutation(api.accounts.create);
  const removeAccount = useMutation(api.accounts.remove);

  const [name, setName] = useState("");
  const [type, setType] = useState("checking");
  const [currency, setCurrency] = useState("KES");
  const [balance, setBalance] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async () => {
    if (!name.trim()) {
      toast.error("Please enter an account name");
      return;
    }

    setIsAdding(true);
    try {
      await createAccount({
        name: name.trim(),
        type: type as "checking" | "savings" | "credit" | "cash" | "investment",
        currency,
        balance: balance ? Number.parseFloat(balance) : 0,
      });

      // Reset form
      setName("");
      setBalance("");
      toast.success("Account added!");
    } catch (_error) {
      toast.error("Failed to add account");
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id: Id<"accounts">) => {
    try {
      await removeAccount({ id });
      toast.success("Account removed");
    } catch (_error) {
      toast.error("Failed to remove account");
    }
  };

  const canProceed = accounts && accounts.length > 0;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="font-semibold text-lg">Set up your accounts</h3>
        <p className="text-muted-foreground text-sm">
          Add the accounts you want to track. You can always add more later.
        </p>
      </div>

      {/* Add Account Form */}
      <div className="flex flex-col gap-4 rounded-md border p-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="account-name">Account Name</Label>
            <Input
              id="account-name"
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Main Checking"
              value={name}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="account-type">Type</Label>
            <Select
              items={ACCOUNT_TYPES.map((t) => ({
                value: t.value,
                label: t.label,
              }))}
              onValueChange={(value) => value && setType(value)}
              value={type}
            >
              <SelectTrigger className="w-full" id="account-type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {ACCOUNT_TYPES.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="account-currency">Currency</Label>
            <Select
              items={CURRENCIES.map((c) => ({
                value: c.value,
                label: c.label,
              }))}
              onValueChange={(value) => value && setCurrency(value)}
              value={currency}
            >
              <SelectTrigger className="w-full" id="account-currency">
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

          <div className="flex flex-col gap-2">
            <Label htmlFor="account-balance">Current Balance</Label>
            <Input
              id="account-balance"
              onChange={(e) => setBalance(e.target.value)}
              placeholder="0.00"
              type="number"
              value={balance}
            />
          </div>
        </div>

        <Button className="w-full" disabled={isAdding} onClick={handleAdd}>
          <PlusIcon className="mr-2" data-icon="inline-start" />
          Add Account
        </Button>
      </div>

      {/* Accounts List */}
      {accounts && accounts.length > 0 && (
        <div className="flex flex-col gap-2">
          <Label>Your Accounts ({accounts.length})</Label>
          <div className="flex flex-col gap-2">
            {accounts.map((account) => (
              <div
                className="flex items-center justify-between rounded-md border p-3"
                key={account._id}
              >
                <div>
                  <p className="font-medium">{account.name}</p>
                  <p className="text-muted-foreground text-sm capitalize">
                    {account.type} • {account.currency}{" "}
                    {account.balance.toFixed(2)}
                  </p>
                </div>
                <Button
                  aria-label={`Delete account ${account.name}`}
                  onClick={() => handleDelete(account._id)}
                  size="icon"
                  variant="ghost"
                >
                  <TrashIcon aria-hidden weight="bold" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {!canProceed && (
        <p className="pt-4 text-center text-muted-foreground text-sm">
          Add at least one account to continue
        </p>
      )}
    </div>
  );
}
