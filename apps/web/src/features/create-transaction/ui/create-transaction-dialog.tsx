import { useForm, useStore } from "@tanstack/react-form";
import { api } from "@tanstack-effect-convex/backend/convex/_generated/api";
import type { Id } from "@tanstack-effect-convex/backend/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { Schema } from "effect";
import { PlusIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { toast } from "sonner";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TransactionFormSchema } from "../model/transaction-form-schema";

interface CreateTransactionDialogProps {
  accounts: Array<{ _id: Id<"accounts">; name: string; currency: string }>;
  categories: Array<{
    _id: Id<"categories">;
    name: string;
    icon: string;
    type: "expense" | "income";
  }>;
  children?: React.ReactNode;
}

export function CreateTransactionDialog({
  accounts,
  categories,
  children,
}: CreateTransactionDialogProps) {
  const [open, setOpen] = useState(false);
  const createTransaction = useMutation(api.transactions.create);

  const form = useForm({
    defaultValues: {
      type: "expense" as "expense" | "income" | "transfer",
      accountId: "",
      categoryId: "",
      amount: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      toAccountId: "",
    },
    onSubmit: async ({ value }) => {
      const selectedAccount = accounts.find((a) => a._id === value.accountId);
      try {
        await createTransaction({
          accountId: value.accountId as Id<"accounts">,
          categoryId: value.categoryId as Id<"categories">,
          type: value.type,
          amount: Number.parseFloat(value.amount),
          currency: selectedAccount?.currency || "USD",
          description: value.description,
          date: new Date(value.date).getTime(),
          ...(value.type === "transfer" &&
            value.toAccountId && {
              toAccountId: value.toAccountId as Id<"accounts">,
            }),
        });
        toast.success("Transaction created");
        setOpen(false);
        form.reset();
      } catch {
        toast.error("Failed to create transaction");
      }
    },
    validators: {
      onSubmit: Schema.standardSchemaV1(TransactionFormSchema),
    },
  });

  const currentType = useStore(form.store, (state) => state.values.type);
  const currentAccountId = useStore(
    form.store,
    (state) => state.values.accountId
  );

  const filteredCategories =
    currentType === "transfer"
      ? categories
      : categories.filter(
          (c) => c.type === currentType || currentType === "expense"
        );

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        {children || (
          <Button disabled={accounts.length === 0}>
            <PlusIcon className="mr-2" data-icon="inline-start" />
            Add Transaction
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>Record a new transaction.</DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field name="type">
            {(field) => (
              <div className="flex flex-col gap-2">
                <Label>Type</Label>
                <Tabs
                  onValueChange={(v) =>
                    field.handleChange(v as typeof currentType)
                  }
                  value={field.state.value}
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="expense">Expense</TabsTrigger>
                    <TabsTrigger value="income">Income</TabsTrigger>
                    <TabsTrigger value="transfer">Transfer</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            )}
          </form.Field>

          <form.Field name="accountId">
            {(field) => (
              <div className="flex flex-col gap-2">
                <Label htmlFor="account">
                  {currentType === "transfer" ? "From Account" : "Account"}
                </Label>
                <Select
                  items={accounts.map((a) => ({
                    value: a._id,
                    label: `${a.name} (${a.currency})`,
                  }))}
                  onValueChange={(val: string | null) =>
                    field.handleChange(val || "")
                  }
                  value={field.state.value || undefined}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map((a) => (
                      <SelectItem
                        key={a._id}
                        label={`${a.name} (${a.currency})`}
                        value={a._id}
                      >
                        {a.name} ({a.currency})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {field.state.meta.errors.map((error) => (
                  <p className="text-destructive text-sm" key={error?.message}>
                    {error?.message}
                  </p>
                ))}
              </div>
            )}
          </form.Field>

          {currentType === "transfer" && (
            <form.Field name="toAccountId">
              {(field) => (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="toAccount">To Account</Label>
                  <Select
                    items={accounts
                      .filter((a) => a._id !== currentAccountId)
                      .map((a) => ({
                        value: a._id,
                        label: `${a.name} (${a.currency})`,
                      }))}
                    onValueChange={(val: string | null) =>
                      field.handleChange(val || "")
                    }
                    value={field.state.value || undefined}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select destination account" />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts
                        .filter((a) => a._id !== currentAccountId)
                        .map((a) => (
                          <SelectItem
                            key={a._id}
                            label={`${a.name} (${a.currency})`}
                            value={a._id}
                          >
                            {a.name} ({a.currency})
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </form.Field>
          )}

          <form.Field name="categoryId">
            {(field) => (
              <div className="flex flex-col gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  items={filteredCategories.map((c) => ({
                    value: c._id,
                    label: `${c.icon} ${c.name}`,
                  }))}
                  onValueChange={(val: string | null) =>
                    field.handleChange(val || "")
                  }
                  value={field.state.value || undefined}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredCategories.map((c) => (
                      <SelectItem
                        key={c._id}
                        label={`${c.icon} ${c.name}`}
                        value={c._id}
                      >
                        {c.icon} {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {field.state.meta.errors.map((error) => (
                  <p className="text-destructive text-sm" key={error?.message}>
                    {error?.message}
                  </p>
                ))}
              </div>
            )}
          </form.Field>

          <form.Field name="amount">
            {(field) => (
              <div className="flex flex-col gap-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  min="0"
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  type="number"
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

          <form.Field name="description">
            {(field) => (
              <div className="flex flex-col gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="e.g., Grocery shopping"
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

          <form.Field name="date">
            {(field) => (
              <div className="flex flex-col gap-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="date"
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
                  {state.isSubmitting ? "Adding…" : "Add Transaction"}
                </Button>
              )}
            </form.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
