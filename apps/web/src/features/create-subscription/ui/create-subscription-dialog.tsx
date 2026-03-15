import { PlusIcon } from "@phosphor-icons/react";
import { useForm } from "@tanstack/react-form";
import type { Id } from "@tanstack-effect-convex/backend/convex/_generated/dataModel";
import { Schema } from "effect";
import { isValidElement, useState } from "react";
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
import { useCreateSubscription } from "@/entities/subscription/api/use-create-subscription";
import {
  FREQUENCIES,
  SubscriptionFormSchema,
} from "../model/subscription-form-schema";

export function CreateSubscriptionDialog({
  accounts,
  categories,
  children,
}: {
  accounts: Array<{ _id: Id<"accounts">; name: string; currency: string }>;
  categories: Array<{ _id: Id<"categories">; name: string; icon: string }>;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const createSubscription = useCreateSubscription();
  const triggerRender = isValidElement(children) ? (
    children
  ) : (
    <Button disabled={accounts.length === 0}>
      <PlusIcon className="mr-2" data-icon="inline-start" />
      Add Subscription
    </Button>
  );

  const form = useForm({
    defaultValues: {
      name: "",
      accountId: "",
      categoryId: "",
      amount: "",
      frequency: "monthly" as
        | "daily"
        | "weekly"
        | "monthly"
        | "quarterly"
        | "yearly",
      startDate: new Date().toISOString().split("T")[0],
    },
    onSubmit: async ({ value }) => {
      const selectedAccount = accounts.find((a) => a._id === value.accountId);
      try {
        await createSubscription({
          name: value.name,
          accountId: value.accountId as Id<"accounts">,
          categoryId: value.categoryId as Id<"categories">,
          amount: Number.parseFloat(value.amount),
          currency: selectedAccount?.currency || "KES",
          frequency: value.frequency,
          startDate: new Date(value.startDate).getTime(),
        });
        toast.success("Subscription created");
        setOpen(false);
        form.reset();
      } catch {
        toast.error("Failed to create subscription");
      }
    },
    validators: {
      onSubmit: Schema.standardSchemaV1(SubscriptionFormSchema),
    },
  });

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger render={triggerRender} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Subscription</DialogTitle>
          <DialogDescription>
            Track a recurring payment or subscription.
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
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="e.g., Netflix"
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

          <form.Field name="accountId">
            {(field) => (
              <div className="flex flex-col gap-2">
                <Label htmlFor="account">Account</Label>
                <Select
                  items={accounts.map((a) => ({
                    value: a._id,
                    label: `${a.name} (${a.currency})`,
                  }))}
                  onValueChange={(val: string | null) =>
                    val && field.handleChange(val)
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

          <form.Field name="categoryId">
            {(field) => (
              <div className="flex flex-col gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  items={categories.map((c) => ({
                    value: c._id,
                    label: `${c.icon} ${c.name}`,
                  }))}
                  onValueChange={(val: string | null) =>
                    val && field.handleChange(val)
                  }
                  value={field.state.value || undefined}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
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

          <div className="grid grid-cols-2 gap-4">
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
                    <p
                      className="text-destructive text-sm"
                      key={error?.message}
                    >
                      {error?.message}
                    </p>
                  ))}
                </div>
              )}
            </form.Field>

            <form.Field name="frequency">
              {(field) => (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select
                    items={FREQUENCIES.map((f) => ({
                      value: f.value,
                      label: f.label,
                    }))}
                    onValueChange={(val: string | null) =>
                      val &&
                      field.handleChange(
                        val as
                          | "daily"
                          | "weekly"
                          | "monthly"
                          | "quarterly"
                          | "yearly"
                      )
                    }
                    value={field.state.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      {FREQUENCIES.map((f) => (
                        <SelectItem key={f.value} value={f.value}>
                          {f.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </form.Field>
          </div>

          <form.Field name="startDate">
            {(field) => (
              <div className="flex flex-col gap-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
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
                  {state.isSubmitting ? "Adding…" : "Add Subscription"}
                </Button>
              )}
            </form.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
