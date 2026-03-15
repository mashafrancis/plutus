import { useForm } from "@tanstack/react-form";

import { Schema } from "effect";
import { PlusIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateAccount } from "@/entities/account/api/use-create-account";
import { ACCOUNT_TYPES } from "@/entities/account/config/account-types";
import { CURRENCIES } from "@/shared/config/currencies";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { AccountFormSchema } from "../model/account-form-schema";

export function CreateAccountDialog({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const createAccount = useCreateAccount();

  const form = useForm({
    defaultValues: {
      name: "",
      type: "checking" as
        | "checking"
        | "savings"
        | "credit"
        | "cash"
        | "investment",
      currency: "USD",
      balance: "",
    },
    validators: {
      onSubmit: Schema.standardSchemaV1(AccountFormSchema),
    },
    onSubmit: async ({ value }) => {
      try {
        await createAccount({
          name: value.name,
          type: value.type,
          currency: value.currency,
          balance: value.balance ? Number.parseFloat(value.balance) : 0,
        });
        toast.success("Account created");
        setOpen(false);
        form.reset();
      } catch {
        toast.error("Failed to create account");
      }
    },
  });

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        {children || (
          <Button>
            <PlusIcon weight="bold" data-icon="inline-start" />
            Add Account
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Account</DialogTitle>
          <DialogDescription>
            Add a new financial account to track.
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field name="name">
            {(field) => (
              <div className="flex flex-col gap-2">
                <Label htmlFor="create-account-name">Account Name</Label>
                <Input
                  id="create-account-name"
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="e.g., Main Checking"
                  value={field.state.value}
                />
                {field.state.meta.errors.map((error) => (
                  <p className="text-destructive text-sm" key={error?.message}>
                    {error?.message}
                  </p>
                ))}
              </div>
            )}
          </form.Field>

          <form.Field name="type">
            {(field) => (
              <div className="flex flex-col gap-2">
                <Label htmlFor="create-account-type">Account Type</Label>
                <Select
                  items={ACCOUNT_TYPES.map((t) => ({
                    value: t.value,
                    label: t.label,
                  }))}
                  onValueChange={(val: string | null) =>
                    val &&
                    field.handleChange(
                      val as
                        | "checking"
                        | "savings"
                        | "credit"
                        | "cash"
                        | "investment"
                    )
                  }
                  value={field.state.value}
                >
                  <SelectTrigger className="w-full" id="create-account-type">
                    <SelectValue placeholder="Select account type" />
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
            )}
          </form.Field>

          <form.Field name="currency">
            {(field) => (
              <div className="flex flex-col gap-2">
                <Label htmlFor="create-account-currency">Currency</Label>
                <Select
                  items={CURRENCIES}
                  onValueChange={(val: string | null) =>
                    val && field.handleChange(val)
                  }
                  value={field.state.value}
                >
                  <SelectTrigger
                    className="w-full"
                    id="create-account-currency"
                  >
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
            )}
          </form.Field>

          <form.Field name="balance">
            {(field) => (
              <div className="flex flex-col gap-2">
                <Label htmlFor="create-account-balance">Initial Balance</Label>
                <Input
                  id="create-account-balance"
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  type="number"
                  value={field.state.value}
                />
              </div>
            )}
          </form.Field>

          <DialogFooter>
            <Button
              onClick={() => setOpen(false)}
              type="button"
              variant="outline"
            >
              Cancel
            </Button>
            <form.Subscribe>
              {(state) => (
                <Button disabled={state.isSubmitting} type="submit">
                  {state.isSubmitting ? "Creating…" : "Create Account"}
                </Button>
              )}
            </form.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
