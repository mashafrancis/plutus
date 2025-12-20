"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useEffect } from "react";
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
import { dateFormat } from "@/constants/date";
import { calculateRenewalDate } from "@/lib/date";
import { popModal } from "@/modals";
import { ModalContent, ModalHeader } from "@/modals/common/container";
import { useTRPC } from "@/trpc/react";

const subscriptionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.string().min(1, "Amount is required"),
  category: z.string().min(1, "Category is required"),
  billingCycle: z.enum(["monthly", "yearly", "weekly"]),
  nextPaymentDate: z.string().min(1, "Next payment date is required"),
  status: z.enum(["active", "paused", "cancelled"]),
  startDate: z.string().min(1, "Start date is required"),
  accountId: z.string().optional(),
  url: z.string().optional(),
  notes: z.string().optional(),
  notify: z.boolean().optional(),
});

type SubscriptionFormData = z.infer<typeof subscriptionSchema>;

interface SubscriptionModalProps {
  readonly subscriptionId?: string;
}

export default function AddSubscriptionModal({
  subscriptionId,
}: SubscriptionModalProps) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const isEditMode = !!subscriptionId;

  // Fetch subscription data if editing
  const { data: subscriptionData } = useQuery(
    subscriptionId
      ? trpc.subscriptions.get.queryOptions({
          from: "",
          to: "",
        })
      : {
          queryKey: ["subscriptions", subscriptionId],
          enabled: false,
        }
  );

  // Fetch accounts and filter options for dropdowns
  const { data: filterOptions } = useQuery(
    trpc.subscriptions.getFilterOptions.queryOptions()
  );

  const createSubscription = useMutation(
    trpc.subscriptions.create.mutationOptions({
      onSuccess: () => {
        toast.success("Subscription added successfully");
        queryClient.invalidateQueries(trpc.dashboard.getData.pathFilter());
        queryClient.invalidateQueries(trpc.subscriptions.get.pathFilter());
        queryClient.invalidateQueries(trpc.subscriptions.getData.pathFilter());
        popModal();
      },
      onError: (error) => {
        toast.error("Failed to add subscription", {
          description: error.message,
        });
      },
    })
  );

  const updateSubscription = useMutation(
    trpc.subscriptions.patch.mutationOptions({
      onSuccess: () => {
        toast.success("Subscription updated successfully");
        queryClient.invalidateQueries(trpc.dashboard.getData.pathFilter());
        queryClient.invalidateQueries(trpc.subscriptions.get.pathFilter());
        queryClient.invalidateQueries(trpc.subscriptions.getData.pathFilter());
        popModal();
      },
      onError: (error) => {
        toast.error("Failed to update subscription", {
          description: error.message,
        });
      },
    })
  );

  const form = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      name: "",
      price: "",
      category: "",
      billingCycle: "monthly",
      nextPaymentDate: new Date().toISOString().split("T")[0],
      status: "active",
      startDate: new Date().toISOString().split("T")[0],
      accountId: "",
      url: "",
      notes: "",
      notify: false,
    },
  });

  let subscription = null;
  if (subscriptionData && Array.isArray(subscriptionData)) {
    subscription = subscriptionData.find((s) => s.id === subscriptionId);
  }

  // Pre-fill form when editing
  useEffect(() => {
    if (isEditMode && subscription) {
      form.reset({
        name: subscription.name,
        price: subscription.amount.toString(),
        category: subscription.category,
        billingCycle: subscription.billingCycle,
        nextPaymentDate: subscription.nextPaymentDate,
        status: subscription.status,
        startDate: subscription.startDate,
        accountId: subscription.paymentMethodId || "",
        url: "", // Not in subscription type, will need to fetch separately
        notes: "", // Not in subscription type, will need to fetch separately
        notify: false,
      });
    }
  }, [isEditMode, subscriptionId, subscription, form]);

  // Calculate next payment date when billing cycle or start date changes
  const billingCycle = form.watch("billingCycle");
  const startDate = form.watch("startDate");

  useEffect(() => {
    if (startDate && billingCycle && !isEditMode) {
      const nextPayment = calculateRenewalDate(startDate, billingCycle);
      form.setValue("nextPaymentDate", format(nextPayment, dateFormat));
    }
  }, [billingCycle, startDate, form, isEditMode]);

  function onSubmit(data: SubscriptionFormData) {
    if (isEditMode && subscriptionId) {
      updateSubscription.mutate({
        id: subscriptionId,
        ...data,
      });
    } else {
      createSubscription.mutate(data);
    }
  }

  return (
    <ModalContent>
      <ModalHeader
        className="items-start justify-start"
        text={
          isEditMode
            ? "Update subscription details"
            : "Add a new subscription to track recurring payments"
        }
        title={isEditMode ? "Edit Subscription" : "Add Subscription"}
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
              placeholder="e.g. Netflix Premium"
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
              placeholder="e.g. Streaming, Utilities"
              type="text"
            />
            <FieldError errors={[form.formState.errors.category]} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel>Billing Cycle *</FieldLabel>
          <FieldContent>
            <Select
              onValueChange={(value) =>
                form.setValue(
                  "billingCycle",
                  value as "monthly" | "yearly" | "weekly"
                )
              }
              value={form.watch("billingCycle")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select billing cycle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
              </SelectContent>
            </Select>
            <FieldError errors={[form.formState.errors.billingCycle]} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel>Start Date *</FieldLabel>
          <FieldContent>
            <Input {...form.register("startDate")} type="date" />
            <FieldError errors={[form.formState.errors.startDate]} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel>Next Payment Date *</FieldLabel>
          <FieldContent>
            <Input {...form.register("nextPaymentDate")} type="date" />
            <FieldError errors={[form.formState.errors.nextPaymentDate]} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel>Status *</FieldLabel>
          <FieldContent>
            <Select
              onValueChange={(value) =>
                form.setValue(
                  "status",
                  value as "active" | "paused" | "cancelled"
                )
              }
              value={form.watch("status")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <FieldError errors={[form.formState.errors.status]} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel>Payment Method</FieldLabel>
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
          <FieldLabel>URL (Optional)</FieldLabel>
          <FieldContent>
            <Input
              {...form.register("url")}
              placeholder="https://..."
              type="url"
            />
            <FieldError errors={[form.formState.errors.url]} />
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

        <Field>
          <div className="flex items-center gap-2">
            <Checkbox
              checked={form.watch("notify")}
              onCheckedChange={(checked) =>
                form.setValue("notify", checked === true)
              }
            />
            <FieldLabel>Notify before renewal</FieldLabel>
          </div>
        </Field>

        <div className="flex justify-end gap-2 pt-4">
          <Button onClick={() => popModal()} type="button" variant="secondary">
            Cancel
          </Button>
          <Button
            disabled={
              createSubscription.isPending || updateSubscription.isPending
            }
            type="submit"
          >
            {(() => {
              if (
                createSubscription.isPending ||
                updateSubscription.isPending
              ) {
                return "Saving...";
              }
              return isEditMode ? "Update Subscription" : "Add Subscription";
            })()}
          </Button>
        </div>
      </form>
    </ModalContent>
  );
}
