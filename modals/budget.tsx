"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { popModal } from "@/modals";
import { ModalHeader } from "@/modals/common/container";
import { useTRPC } from "@/trpc/react";

const budgetSchema = z.object({
  categoryId: z.string().optional(),
  limit: z.string().min(1, "Limit is required"),
  period: z.enum(["monthly", "weekly", "quarterly", "yearly"]),
  rolloverEnabled: z.boolean().optional(),
  recurringEnabled: z.boolean().optional(),
  alertThreshold: z.number().optional(),
  alertThresholdType: z.enum(["percentage", "dollar"]).optional(),
});

type BudgetFormData = z.infer<typeof budgetSchema>;

type BudgetModalProps = {
  readonly budgetId?: string;
};

export default function BudgetModal({ budgetId }: BudgetModalProps) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const isEditMode = !!budgetId;

  const { data: settingsData } = useQuery(trpc.settings.getData.queryOptions());

  const budget = settingsData?.budgets.find((b) => b.id === budgetId);

  const createBudget = useMutation(
    trpc.settings.createBudget.mutationOptions({
      onSuccess: () => {
        toast.success("Budget added successfully");
        queryClient.invalidateQueries(trpc.settings.getData.pathFilter());
        popModal();
      },
      onError: (error) => {
        toast.error("Failed to add budget", {
          description: error.message,
        });
      },
    })
  );

  const updateBudget = useMutation(
    trpc.settings.updateBudget.mutationOptions({
      onSuccess: () => {
        toast.success("Budget updated successfully");
        queryClient.invalidateQueries(trpc.settings.getData.pathFilter());
        popModal();
      },
      onError: (error) => {
        toast.error("Failed to update budget", {
          description: error.message,
        });
      },
    })
  );

  const form = useForm<BudgetFormData>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      categoryId: "",
      limit: "0",
      period: "monthly",
      rolloverEnabled: false,
      recurringEnabled: true,
      alertThreshold: 80,
      alertThresholdType: "percentage",
    },
  });

  useEffect(() => {
    if (isEditMode && budget) {
      form.reset({
        categoryId: budget.categoryId || "",
        limit: budget.limit.toString(),
        period: budget.period,
        rolloverEnabled: budget.rolloverEnabled,
        recurringEnabled: budget.recurringEnabled,
        alertThreshold: budget.alertThreshold,
        alertThresholdType: budget.alertThresholdType,
      });
    }
  }, [isEditMode, budget, form]);

  const expenseCategories = settingsData?.categories.filter(
    (cat) => cat.type === "expense" && !cat.isArchived
  );

  const onSubmit = (data: BudgetFormData) => {
    if (isEditMode && budgetId) {
      updateBudget.mutate({
        id: budgetId,
        ...data,
        categoryId: data.categoryId || undefined,
      });
    } else {
      createBudget.mutate({
        ...data,
        categoryId: data.categoryId || undefined,
      });
    }
  };

  return (
    <>
      <ModalHeader
        onClose={popModal}
        title={isEditMode ? "Edit Budget" : "Add Budget"}
      />
      <form
        className="flex flex-col gap-4 p-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Field name="categoryId">
          <FieldLabel>Category (leave empty for overall budget)</FieldLabel>
          <FieldContent>
            <Select
              onValueChange={(value) =>
                form.setValue("categoryId", value || undefined)
              }
              value={form.watch("categoryId") || ""}
            >
              <SelectTrigger>
                <SelectValue placeholder="Overall Budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Overall Budget</SelectItem>
                {expenseCategories?.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError />
          </FieldContent>
        </Field>

        <Field name="limit">
          <FieldLabel>Limit *</FieldLabel>
          <FieldContent>
            <Input
              {...form.register("limit")}
              placeholder="0.00"
              step="0.01"
              type="number"
            />
            <FieldError />
          </FieldContent>
        </Field>

        <Field name="period">
          <FieldLabel>Period *</FieldLabel>
          <FieldContent>
            <Select
              onValueChange={(value) =>
                form.setValue("period", value as BudgetFormData["period"])
              }
              value={form.watch("period")}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            <FieldError />
          </FieldContent>
        </Field>

        <Field name="alertThreshold">
          <FieldLabel>Alert Threshold</FieldLabel>
          <FieldContent>
            <Input
              {...form.register("alertThreshold", { valueAsNumber: true })}
              placeholder="80"
              type="number"
            />
            <FieldError />
          </FieldContent>
        </Field>

        <Field name="alertThresholdType">
          <FieldLabel>Alert Threshold Type</FieldLabel>
          <FieldContent>
            <Select
              onValueChange={(value) =>
                form.setValue(
                  "alertThresholdType",
                  value as BudgetFormData["alertThresholdType"]
                )
              }
              value={form.watch("alertThresholdType") || "percentage"}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Percentage</SelectItem>
                <SelectItem value="dollar">Dollar</SelectItem>
              </SelectContent>
            </Select>
            <FieldError />
          </FieldContent>
        </Field>

        <div className="flex justify-end gap-2">
          <Button onClick={popModal} type="button" variant="outline">
            Cancel
          </Button>
          <Button
            disabled={createBudget.isPending || updateBudget.isPending}
            type="submit"
          >
            {(() => {
              if (createBudget.isPending || updateBudget.isPending) {
                return "Saving...";
              }
              if (isEditMode) {
                return "Update";
              }
              return "Add";
            })()}
          </Button>
        </div>
      </form>
    </>
  );
}
