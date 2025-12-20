"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { popModal } from "@/modals";
import { ModalContent, ModalHeader } from "@/modals/common/container";
import { useTRPC } from "@/trpc/react";

const expenseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.string().min(1, "Price is required"),
  category: z.string().min(1, "Category is required"),
  date: z.string().min(1, "Date is required"),
  paid_via: z.string().min(1, "Payment method is required"),
  notes: z.string().optional(),
  accountId: z.string().optional(),
  recurring: z.boolean().optional(),
  recurringFrequency: z
    .enum(["monthly", "weekly", "quarterly", "yearly"])
    .optional(),
  tagIds: z.array(z.string()).optional(),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

interface ExpenseModalProps {
  expenseId?: string;
}

export default function AddExpenseModal({ expenseId }: ExpenseModalProps) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const isEditMode = !!expenseId;

  // Fetch expense data if editing - get all expenses and find the one
  const { data: expenseData } = useQuery(
    expenseId
      ? trpc.expenses.get.queryOptions({
          from: "",
          to: "",
        })
      : {
          queryKey: ["expense", expenseId],
          enabled: false,
        }
  );

  const expense = expenseData
    ? Array.isArray(expenseData)
      ? expenseData.find((e) => e.id === expenseId)
      : null
    : null;

  // Fetch accounts and tags for dropdowns
  const { data: filterOptions } = useQuery(
    trpc.expenses.getFilterOptions.queryOptions()
  );

  const createExpense = useMutation(
    trpc.expenses.create.mutationOptions({
      onSuccess: () => {
        toast.success("Expense added successfully");
        queryClient.invalidateQueries(trpc.dashboard.getData.pathFilter());
        queryClient.invalidateQueries(trpc.expenses.get.pathFilter());
        queryClient.invalidateQueries(trpc.expenses.getData.pathFilter());
        popModal();
      },
      onError: (error) => {
        toast.error("Failed to add expense", {
          description: error.message,
        });
      },
    })
  );

  const updateExpense = useMutation(
    trpc.expenses.patch.mutationOptions({
      onSuccess: () => {
        toast.success("Expense updated successfully");
        queryClient.invalidateQueries(trpc.dashboard.getData.pathFilter());
        queryClient.invalidateQueries(trpc.expenses.get.pathFilter());
        queryClient.invalidateQueries(trpc.expenses.getData.pathFilter());
        popModal();
      },
      onError: (error) => {
        toast.error("Failed to update expense", {
          description: error.message,
        });
      },
    })
  );

  const form = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      name: "",
      price: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      paid_via: "",
      notes: "",
      accountId: "",
      recurring: false,
      recurringFrequency: undefined,
      tagIds: [],
    },
  });

  // Pre-fill form when editing
  useEffect(() => {
    if (isEditMode && expense) {
      form.reset({
        name: expense.name,
        price: expense.price,
        category: expense.category,
        date: expense.date,
        paid_via: expense.paid_via || "",
        notes: expense.notes || "",
        accountId: expense.accountId || "",
        recurring: false, // Will need to fetch from DB - for now default to false
        recurringFrequency: undefined,
        tagIds: [], // Will need to fetch tags from ExpenseTag relation
      });
    }
  }, [isEditMode, expenseId, expense, form]);

  const [selectedTags, setSelectedTags] = useState<string[]>(
    form.watch("tagIds") || []
  );

  function onSubmit(data: ExpenseFormData) {
    if (isEditMode && expenseId) {
      updateExpense.mutate({
        id: expenseId,
        ...data,
      });
    } else {
      createExpense.mutate(data);
    }
  }

  const handleTagToggle = (tagId: string) => {
    const newTags = selectedTags.includes(tagId)
      ? selectedTags.filter((id) => id !== tagId)
      : [...selectedTags, tagId];
    setSelectedTags(newTags);
    form.setValue("tagIds", newTags);
  };

  return (
    <ModalContent>
      <ModalHeader
        className="items-start justify-start"
        text={
          isEditMode
            ? "Update expense details"
            : "Add a new expense to track your spending"
        }
        title={isEditMode ? "Edit Expense" : "Add Expense"}
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
          <FieldLabel>Account</FieldLabel>
          <FieldContent>
            <Select
              onValueChange={(value) => form.setValue("accountId", value)}
              value={form.watch("accountId") || ""}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                {filterOptions?.accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError errors={[form.formState.errors.accountId]} />
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
          <div className="flex items-center gap-2">
            <Checkbox
              checked={form.watch("recurring")}
              onCheckedChange={(checked) =>
                form.setValue("recurring", checked === true)
              }
            />
            <FieldLabel>Recurring expense</FieldLabel>
          </div>
        </Field>

        {form.watch("recurring") && (
          <Field>
            <FieldLabel>Frequency</FieldLabel>
            <FieldContent>
              <Select
                onValueChange={(value) =>
                  form.setValue(
                    "recurringFrequency",
                    value as "monthly" | "weekly" | "quarterly" | "yearly"
                  )
                }
                value={form.watch("recurringFrequency") || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </FieldContent>
          </Field>
        )}

        {filterOptions && filterOptions.tags.length > 0 && (
          <Field>
            <FieldLabel>Tags</FieldLabel>
            <FieldContent>
              <div className="flex flex-wrap gap-2 rounded-md border p-2">
                {filterOptions.tags.map((tagName, index) => {
                  const tagId = filterOptions.tagIds?.[index] || tagName;
                  return (
                    <div className="flex items-center gap-2" key={tagId}>
                      <Checkbox
                        checked={selectedTags.includes(tagId)}
                        onCheckedChange={() => handleTagToggle(tagId)}
                      />
                      <span className="text-sm">{tagName}</span>
                    </div>
                  );
                })}
              </div>
            </FieldContent>
          </Field>
        )}

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
          <Button
            disabled={createExpense.isPending || updateExpense.isPending}
            type="submit"
          >
            {createExpense.isPending || updateExpense.isPending
              ? "Saving..."
              : isEditMode
                ? "Update Expense"
                : "Add Expense"}
          </Button>
        </div>
      </form>
    </ModalContent>
  );
}
