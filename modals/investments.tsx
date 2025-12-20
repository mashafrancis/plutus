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
import { ModalContent, ModalHeader } from "@/modals/common/container";
import { useTRPC } from "@/trpc/react";

const investmentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  ticker: z.string().optional(),
  assetType: z.enum([
    "stocks",
    "etfs",
    "crypto",
    "bonds",
    "savings",
    "retirement",
    "real-estate",
    "other",
  ]),
  shares: z.string().min(1, "Shares is required"),
  costBasis: z.string().min(1, "Cost basis is required"),
  currentValue: z.string().min(1, "Current value is required"),
  sector: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  accountId: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  notes: z.string().optional(),
  note: z.string().optional(),
});

type InvestmentFormData = z.infer<typeof investmentSchema>;

interface InvestmentModalProps {
  readonly investmentId?: string;
}

export default function InvestmentModal({
  investmentId,
}: InvestmentModalProps) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const isEditMode = !!investmentId;

  // Fetch investment data if editing
  const { data: investmentsData } = useQuery(
    investmentId
      ? trpc.investments.getData.queryOptions({})
      : {
          queryKey: ["investments", investmentId],
          enabled: false,
        }
  );

  // Fetch filter options for dropdowns
  const { data: filterOptions } = useQuery(
    trpc.investments.getFilterOptions.queryOptions()
  );

  const createInvestment = useMutation(
    trpc.investments.create.mutationOptions({
      onSuccess: () => {
        toast.success("Investment added successfully");
        queryClient.invalidateQueries(trpc.investments.getData.pathFilter());
        queryClient.invalidateQueries(trpc.investments.get.pathFilter());
        popModal();
      },
      onError: (error) => {
        toast.error("Failed to add investment", {
          description: error.message,
        });
      },
    })
  );

  const updateInvestment = useMutation(
    trpc.investments.patch.mutationOptions({
      onSuccess: () => {
        toast.success("Investment updated successfully");
        queryClient.invalidateQueries(trpc.investments.getData.pathFilter());
        queryClient.invalidateQueries(trpc.investments.get.pathFilter());
        popModal();
      },
      onError: (error) => {
        toast.error("Failed to update investment", {
          description: error.message,
        });
      },
    })
  );

  const form = useForm<InvestmentFormData>({
    resolver: zodResolver(investmentSchema),
    defaultValues: {
      name: "",
      ticker: "",
      assetType: "stocks",
      shares: "0",
      costBasis: "0",
      currentValue: "0",
      sector: "",
      category: "",
      accountId: "",
      date: new Date().toISOString().split("T")[0],
      notes: "",
      note: "",
    },
  });

  const investment = investmentsData?.investments.find(
    (inv) => inv.id === investmentId
  );

  // Pre-fill form when editing
  useEffect(() => {
    if (isEditMode && investment) {
      form.reset({
        name: investment.name,
        ticker: investment.ticker,
        assetType: investment.assetType,
        shares: investment.shares.toString(),
        costBasis: investment.costBasis.toString(),
        currentValue: investment.currentValue.toString(),
        sector: investment.sector || "",
        category: investment.category || "",
        accountId: investment.accountId || "",
        date: new Date().toISOString().split("T")[0], // Use current date as default
        notes: "",
        note: investment.note || "",
      });
    }
  }, [isEditMode, investmentId, investment, form]);

  function onSubmit(data: InvestmentFormData) {
    if (isEditMode && investmentId) {
      updateInvestment.mutate({
        id: investmentId,
        ...data,
      });
    } else {
      createInvestment.mutate(data);
    }
  }

  return (
    <ModalContent>
      <ModalHeader
        className="items-start justify-start"
        text={
          isEditMode
            ? "Update investment details"
            : "Add a new investment to your portfolio"
        }
        title={isEditMode ? "Edit Investment" : "Add Investment"}
      />
      <form
        className="flex flex-col gap-4 p-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Field name="name">
          <FieldLabel>Name *</FieldLabel>
          <FieldContent>
            <Input {...form.register("name")} placeholder="e.g., Apple Inc." />
            <FieldError />
          </FieldContent>
        </Field>

        <Field name="ticker">
          <FieldLabel>Ticker Symbol</FieldLabel>
          <FieldContent>
            <Input {...form.register("ticker")} placeholder="e.g., AAPL" />
            <FieldError />
          </FieldContent>
        </Field>

        <Field name="assetType">
          <FieldLabel>Asset Type *</FieldLabel>
          <FieldContent>
            <Select
              onValueChange={(value) =>
                form.setValue(
                  "assetType",
                  value as InvestmentFormData["assetType"]
                )
              }
              value={form.watch("assetType")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select asset type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stocks">Stocks</SelectItem>
                <SelectItem value="etfs">ETFs</SelectItem>
                <SelectItem value="crypto">Crypto</SelectItem>
                <SelectItem value="bonds">Bonds</SelectItem>
                <SelectItem value="savings">Savings</SelectItem>
                <SelectItem value="retirement">Retirement</SelectItem>
                <SelectItem value="real-estate">Real Estate</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <FieldError />
          </FieldContent>
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field name="shares">
            <FieldLabel>Shares *</FieldLabel>
            <FieldContent>
              <Input
                {...form.register("shares")}
                placeholder="0"
                step="any"
                type="number"
              />
              <FieldError />
            </FieldContent>
          </Field>

          <Field name="costBasis">
            <FieldLabel>Cost Basis *</FieldLabel>
            <FieldContent>
              <Input
                {...form.register("costBasis")}
                placeholder="0.00"
                step="0.01"
                type="number"
              />
              <FieldError />
            </FieldContent>
          </Field>
        </div>

        <Field name="currentValue">
          <FieldLabel>Current Value *</FieldLabel>
          <FieldContent>
            <Input
              {...form.register("currentValue")}
              placeholder="0.00"
              step="0.01"
              type="number"
            />
            <FieldError />
          </FieldContent>
        </Field>

        <Field name="sector">
          <FieldLabel>Sector</FieldLabel>
          <FieldContent>
            <Input
              {...form.register("sector")}
              placeholder="e.g., Technology"
            />
            <FieldError />
          </FieldContent>
        </Field>

        <Field name="category">
          <FieldLabel>Category *</FieldLabel>
          <FieldContent>
            <Input {...form.register("category")} placeholder="e.g., Growth" />
            <FieldError />
          </FieldContent>
        </Field>

        <Field name="accountId">
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
            <FieldError />
          </FieldContent>
        </Field>

        <Field name="date">
          <FieldLabel>Date *</FieldLabel>
          <FieldContent>
            <Input {...form.register("date")} type="date" />
            <FieldError />
          </FieldContent>
        </Field>

        <Field name="note">
          <FieldLabel>Notes</FieldLabel>
          <FieldContent>
            <Textarea
              {...form.register("note")}
              placeholder="Additional notes..."
              rows={3}
            />
            <FieldError />
          </FieldContent>
        </Field>

        <div className="flex justify-end gap-2 pt-4">
          <Button onClick={() => popModal()} type="button" variant="secondary">
            Cancel
          </Button>
          <Button
            disabled={createInvestment.isPending || updateInvestment.isPending}
            type="submit"
          >
            {(() => {
              if (createInvestment.isPending || updateInvestment.isPending) {
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
    </ModalContent>
  );
}
