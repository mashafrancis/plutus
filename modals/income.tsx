"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

const incomeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.string().min(1, "Amount is required"),
  category: z.string().min(1, "Category is required"),
  date: z.string().min(1, "Date is required"),
  notes: z.string().optional(),
});

type IncomeFormData = z.infer<typeof incomeSchema>;

export default function AddIncomeModal() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const createIncome = useMutation(
    trpc.income.create.mutationOptions({
      onSuccess: () => {
        toast.success("Income added successfully");
        queryClient.invalidateQueries(trpc.dashboard.getData.pathFilter());
        queryClient.invalidateQueries(trpc.income.get.pathFilter());
        popModal();
      },
      onError: (error) => {
        toast.error("Failed to add income", {
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
      category: "",
      date: new Date().toISOString().split("T")[0],
      notes: "",
    },
  });

  function onSubmit(data: IncomeFormData) {
    createIncome.mutate(data);
  }

  return (
    <ModalContent>
      <ModalHeader
        className="items-start justify-start"
        text="Add a new income entry to track your earnings"
        title="Add Income"
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
          <FieldLabel>Category *</FieldLabel>
          <FieldContent>
            <Input
              {...form.register("category")}
              placeholder="e.g. Salary"
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
          <Button disabled={createIncome.isPending} type="submit">
            {createIncome.isPending ? "Adding..." : "Add Income"}
          </Button>
        </div>
      </form>
    </ModalContent>
  );
}
