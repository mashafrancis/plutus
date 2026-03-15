import { useForm } from "@tanstack/react-form";
import { api } from "@tanstack-effect-convex/backend/convex/_generated/api";
import type { Id } from "@tanstack-effect-convex/backend/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { Schema } from "effect";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { EditTransactionFormSchema } from "../model/edit-transaction-schema";

interface EditTransactionDialogProps {
  transaction: {
    _id: Id<"transactions">;
    type: "expense" | "income" | "transfer";
    description: string;
    date: number;
    categoryId: Id<"categories">;
  };
  categories: Array<{
    _id: Id<"categories">;
    name: string;
    icon: string;
    type: "expense" | "income";
  }>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditTransactionDialog({
  transaction,
  categories,
  open,
  onOpenChange,
}: EditTransactionDialogProps) {
  const updateTransaction = useMutation(api.transactions.update);

  const form = useForm({
    defaultValues: {
      categoryId: transaction.categoryId as string,
      description: transaction.description,
      date: new Date(transaction.date).toISOString().split("T")[0],
      notes: "",
    },
    onSubmit: async ({ value }) => {
      try {
        await updateTransaction({
          id: transaction._id,
          categoryId: value.categoryId as Id<"categories">,
          description: value.description,
          date: new Date(value.date).getTime(),
          ...(value.notes && { notes: value.notes }),
        });
        toast.success("Transaction updated");
        onOpenChange(false);
      } catch {
        toast.error("Failed to update transaction");
      }
    },
    validators: {
      onSubmit: Schema.standardSchemaV1(EditTransactionFormSchema),
    },
  });

  // Filter categories based on transaction type
  const filteredCategories =
    transaction.type === "transfer"
      ? categories
      : categories.filter((c) => c.type === transaction.type);

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
          <DialogDescription>Update transaction details.</DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
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

          <form.Field name="notes">
            {(field) => (
              <div className="flex flex-col gap-2">
                <Label htmlFor="notes">Notes (optional)</Label>
                <Input
                  id="notes"
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Add any notes..."
                  value={field.state.value}
                />
              </div>
            )}
          </form.Field>

          <DialogFooter>
            <Button
              onClick={() => onOpenChange(false)}
              type="button"
              variant="outline"
            >
              Cancel
            </Button>
            <form.Subscribe>
              {(state) => (
                <Button disabled={state.isSubmitting} type="submit">
                  {state.isSubmitting ? "Saving…" : "Save Changes"}
                </Button>
              )}
            </form.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
