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

const incomeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.string().min(1, "Amount is required"),
  source: z.string().min(1, "Source is required"),
  date: z.string().min(1, "Date is required"),
  notes: z.string().optional(),
  accountId: z.string().optional(),
  recurring: z.boolean().optional(),
  recurringFrequency: z
    .enum(["monthly", "weekly", "quarterly", "yearly", "semi-annual"])
    .optional(),
  tagIds: z.array(z.string()).optional(),
});

type IncomeFormData = z.infer<typeof incomeSchema>;

interface IncomeModalProps {
  incomeId?: string;
}

export default function AddIncomeModal({ incomeId }: IncomeModalProps) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const isEditMode = !!incomeId;

  // Fetch income data if editing
  const { data: incomeData } = useQuery(
    incomeId
      ? trpc.income.get.queryOptions({
          from: "",
          to: "",
        })
      : {
          queryKey: ["income", incomeId],
          enabled: false,
        }
  );

  // Fetch accounts and tags for dropdowns
  const { data: filterOptions } = useQuery(
    trpc.income.getFilterOptions.queryOptions()
  );

  const createIncome = useMutation(
    trpc.income.create.mutationOptions({
      onSuccess: () => {
        toast.success("Income added successfully");
        queryClient.invalidateQueries(trpc.dashboard.getData.pathFilter());
        queryClient.invalidateQueries(trpc.income.get.pathFilter());
        queryClient.invalidateQueries(trpc.income.getData.pathFilter());
        popModal();
      },
      onError: (error) => {
        toast.error("Failed to add income", {
          description: error.message,
        });
      },
    })
  );

  const updateIncome = useMutation(
    trpc.income.patch.mutationOptions({
      onSuccess: () => {
        toast.success("Income updated successfully");
        queryClient.invalidateQueries(trpc.dashboard.getData.pathFilter());
        queryClient.invalidateQueries(trpc.income.get.pathFilter());
        queryClient.invalidateQueries(trpc.income.getData.pathFilter());
        popModal();
      },
      onError: (error) => {
        toast.error("Failed to update income", {
          description: error.message,
        });
      },
    })
  );

  const form = useForm<IncomeFormData>({
    resolver: zodResolver(incomeSchema),
    defaultValues: {
      name: "",
      price: "",
      source: "",
      date: new Date().toISOString().split("T")[0],
      notes: "",
      accountId: "",
      recurring: false,
      recurringFrequency: undefined,
      tagIds: [],
    },
  });

  const income = incomeData
    ? Array.isArray(incomeData)
      ? incomeData.find((i) => i.id === incomeId)
      : null
    : null;

  // Pre-fill form when editing
  useEffect(() => {
    if (isEditMode && income) {
      form.reset({
        name: income.name,
        price: income.price,
        source: income.source || "",
        date: income.date,
        notes: income.notes || "",
        accountId: income.accountId || "",
        recurring: false, // Will need to fetch from DB - for now default to false
        recurringFrequency: undefined,
        tagIds: [], // Will need to fetch tags from IncomeTag relation
      });
    }
  }, [isEditMode, incomeId, income, form]);

  const [selectedTags, setSelectedTags] = useState<string[]>(
    form.watch("tagIds") || []
  );

  function onSubmit(data: IncomeFormData) {
    if (isEditMode && incomeId) {
      updateIncome.mutate({
        id: incomeId,
        ...data,
      });
    } else {
      createIncome.mutate(data);
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
            ? "Update income details"
            : "Add a new income entry to track your earnings"
        }
        title={isEditMode ? "Edit Income" : "Add Income"}
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
              placeholder="e.g. Salary"
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
          <FieldLabel>Source *</FieldLabel>
          <FieldContent>
            <Input
              {...form.register("source")}
              placeholder="e.g. Salary, Freelance"
              type="text"
            />
            <FieldError errors={[form.formState.errors.source]} />
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
          <div className="flex items-center gap-2">
            <Checkbox
              checked={form.watch("recurring")}
              onCheckedChange={(checked) =>
                form.setValue("recurring", checked === true)
              }
            />
            <FieldLabel>Recurring income</FieldLabel>
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
                    value as
                      | "monthly"
                      | "weekly"
                      | "quarterly"
                      | "yearly"
                      | "semi-annual"
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
                  <SelectItem value="semi-annual">Semi-Annual</SelectItem>
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
            disabled={createIncome.isPending || updateIncome.isPending}
            type="submit"
          >
            {createIncome.isPending || updateIncome.isPending
              ? "Saving..."
              : isEditMode
                ? "Update Income"
                : "Add Income"}
          </Button>
        </div>
      </form>
    </ModalContent>
  );
}
