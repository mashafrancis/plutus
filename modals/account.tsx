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
import { Textarea } from "@/components/ui/textarea";
import { popModal } from "@/modals";
import { ModalHeader } from "@/modals/common/container";
import { useTRPC } from "@/trpc/react";

const accountSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["checking", "savings", "credit", "cash", "investment"]),
  currentBalance: z.string().min(1, "Balance is required"),
  currency: z.string().optional(),
  notes: z.string().optional(),
});

type AccountFormData = z.infer<typeof accountSchema>;

type AccountModalProps = {
  readonly accountId?: string;
};

export default function AccountModal({ accountId }: AccountModalProps) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const isEditMode = !!accountId;

  const { data: settingsData } = useQuery(trpc.settings.getData.queryOptions());

  const account = settingsData?.accounts.find((acc) => acc.id === accountId);

  const createAccount = useMutation(
    trpc.settings.createAccount.mutationOptions({
      onSuccess: () => {
        toast.success("Account added successfully");
        queryClient.invalidateQueries(trpc.settings.getData.pathFilter());
        popModal();
      },
      onError: (error) => {
        toast.error("Failed to add account", {
          description: error.message,
        });
      },
    })
  );

  const updateAccount = useMutation(
    trpc.settings.updateAccount.mutationOptions({
      onSuccess: () => {
        toast.success("Account updated successfully");
        queryClient.invalidateQueries(trpc.settings.getData.pathFilter());
        popModal();
      },
      onError: (error) => {
        toast.error("Failed to update account", {
          description: error.message,
        });
      },
    })
  );

  const form = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      type: "checking",
      currentBalance: "0",
      currency: "USD",
      notes: "",
    },
  });

  useEffect(() => {
    if (isEditMode && account) {
      form.reset({
        name: account.name,
        type: account.type,
        currentBalance: account.currentBalance.toString(),
        currency: "USD",
        notes: account.notes || "",
      });
    }
  }, [isEditMode, account, form]);

  const onSubmit = (data: AccountFormData) => {
    if (isEditMode && accountId) {
      updateAccount.mutate({
        id: accountId,
        ...data,
      });
    } else {
      createAccount.mutate(data);
    }
  };

  return (
    <>
      <ModalHeader
        onClose={popModal}
        title={isEditMode ? "Edit Account" : "Add Account"}
      />
      <form
        className="flex flex-col gap-4 p-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Field name="name">
          <FieldLabel>Name *</FieldLabel>
          <FieldContent>
            <Input {...form.register("name")} placeholder="Account name" />
            <FieldError />
          </FieldContent>
        </Field>

        <Field name="type">
          <FieldLabel>Type *</FieldLabel>
          <FieldContent>
            <Select
              onValueChange={(value) =>
                form.setValue("type", value as AccountFormData["type"])
              }
              value={form.watch("type")}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="checking">Checking</SelectItem>
                <SelectItem value="savings">Savings</SelectItem>
                <SelectItem value="credit">Credit</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="investment">Investment</SelectItem>
              </SelectContent>
            </Select>
            <FieldError />
          </FieldContent>
        </Field>

        <Field name="currentBalance">
          <FieldLabel>Current Balance *</FieldLabel>
          <FieldContent>
            <Input
              {...form.register("currentBalance")}
              placeholder="0.00"
              step="0.01"
              type="number"
            />
            <FieldError />
          </FieldContent>
        </Field>

        <Field name="currency">
          <FieldLabel>Currency</FieldLabel>
          <FieldContent>
            <Select
              onValueChange={(value) => form.setValue("currency", value)}
              value={form.watch("currency") || "USD"}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
                <SelectItem value="JPY">JPY</SelectItem>
                <SelectItem value="CAD">CAD</SelectItem>
                <SelectItem value="AUD">AUD</SelectItem>
              </SelectContent>
            </Select>
            <FieldError />
          </FieldContent>
        </Field>

        <Field name="notes">
          <FieldLabel>Notes</FieldLabel>
          <FieldContent>
            <Textarea
              {...form.register("notes")}
              placeholder="Optional notes"
            />
            <FieldError />
          </FieldContent>
        </Field>

        <div className="flex justify-end gap-2">
          <Button onClick={popModal} type="button" variant="outline">
            Cancel
          </Button>
          <Button
            disabled={createAccount.isPending || updateAccount.isPending}
            type="submit"
          >
            {(() => {
              if (createAccount.isPending || updateAccount.isPending) {
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
