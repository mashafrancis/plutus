"use client";;
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { popModal } from "@/modals";
import { ModalContent, ModalHeader } from "@/modals/common/container";
import { useTRPC } from "@/trpc/react";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

const expenseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.string().min(1, "Price is required"),
  category: z.string().min(1, "Category is required"),
  date: z.string().min(1, "Date is required"),
  paid_via: z.string().min(1, "Payment method is required"),
  notes: z.string().optional(),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

export default function AddExpenseModal() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const createExpense = useMutation(trpc.expenses.create.mutationOptions({
    onSuccess: () => {
      toast.success("Expense added successfully");
      queryClient.invalidateQueries(trpc.dashboard.getData.pathFilter());
      queryClient.invalidateQueries(trpc.expenses.get.pathFilter());
      popModal();
    },
    onError: (error) => {
      toast.error("Failed to add expense", {
        description: error.message,
      });
    },
  }));

  const form = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      name: "",
      price: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      paid_via: "",
      notes: "",
    },
  });

  function onSubmit(data: ExpenseFormData) {
    createExpense.mutate(data);
  }

  return (
    <ModalContent>
      <ModalHeader
        className="items-start justify-start"
        text="Add a new expense to track your spending"
        title="Add Expense"
      />
      <form
        className="flex flex-col gap-4 p-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Field>
          <FieldLabel>Name *</FieldLabel>
          <FieldContent>
            <Input
              {...form.register("name")}
              placeholder="e.g. Groceries"
              type="text"
            />
            <FieldError errors={[form.formState.errors.name]} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel>Amount *</FieldLabel>
          <FieldContent>
            <Input
              {...form.register("price")}
              placeholder="0.00"
              step="0.01"
              type="number"
            />
            <FieldError errors={[form.formState.errors.price]} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel>Category *</FieldLabel>
          <FieldContent>
            <Input
              {...form.register("category")}
              placeholder="e.g. Food & Dining"
              type="text"
            />
            <FieldError errors={[form.formState.errors.category]} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel>Date *</FieldLabel>
          <FieldContent>
            <Input {...form.register("date")} type="date" />
            <FieldError errors={[form.formState.errors.date]} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel>Payment Method *</FieldLabel>
          <FieldContent>
            <Input
              {...form.register("paid_via")}
              placeholder="e.g. Credit Card"
              type="text"
            />
            <FieldError errors={[form.formState.errors.paid_via]} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel>Notes (Optional)</FieldLabel>
          <FieldContent>
            <Input
              {...form.register("notes")}
              placeholder="Additional notes"
              type="text"
            />
            <FieldError errors={[form.formState.errors.notes]} />
          </FieldContent>
        </Field>

        <div className="flex justify-end gap-2 pt-4">
          <Button onClick={() => popModal()} type="button" variant="secondary">
            Cancel
          </Button>
          <Button disabled={createExpense.isPending} type="submit">
            {createExpense.isPending ? "Adding..." : "Add Expense"}
          </Button>
        </div>
      </form>
    </ModalContent>
  );
}
