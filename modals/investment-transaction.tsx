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

const transactionSchema = z.object({
  type: z.enum(["buy", "sell"]),
  shares: z.string().min(1, "Shares is required"),
  price: z.string().min(1, "Price per share is required"),
  date: z.string().min(1, "Date is required"),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

interface InvestmentTransactionModalProps {
  readonly investmentId: string;
}

export default function InvestmentTransactionModal({
  investmentId,
}: InvestmentTransactionModalProps) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const form = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "buy",
      shares: "",
      price: "",
      date: new Date().toISOString().split("T")[0],
    },
  });

  const recordTransaction = useMutation(
    trpc.investments.recordTransaction.mutationOptions({
      onSuccess: () => {
        toast.success("Transaction recorded successfully");
        queryClient.invalidateQueries(trpc.investments.getData.pathFilter());
        queryClient.invalidateQueries(trpc.investments.get.pathFilter());
        popModal();
      },
      onError: (error) => {
        toast.error("Failed to record transaction", {
          description: error.message,
        });
      },
    })
  );

  const watchedShares = form.watch("shares");
  const watchedPrice = form.watch("price");
  const sharesNum = Number.parseFloat(watchedShares) || 0;
  const priceNum = Number.parseFloat(watchedPrice) || 0;
  const total = (sharesNum * priceNum).toFixed(2);

  function onSubmit(data: TransactionFormData) {
    const sharesNum = Number.parseFloat(data.shares);
    const priceNum = Number.parseFloat(data.price);
    const totalAmount = (sharesNum * priceNum).toFixed(2);

    recordTransaction.mutate({
      investmentId,
      type: data.type,
      shares: data.shares,
      price: data.price,
      total: totalAmount,
      date: data.date,
    });
  }

  return (
    <ModalContent>
      <ModalHeader
        className="items-start justify-start"
        text="Record a buy or sell transaction for this investment"
        title="Record Transaction"
      />
      <form
        className="flex flex-col gap-4 p-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Field name="type">
          <FieldLabel>Transaction Type *</FieldLabel>
          <FieldContent>
            <Select
              onValueChange={(value) =>
                form.setValue("type", value as "buy" | "sell")
              }
              value={form.watch("type")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buy">Buy</SelectItem>
                <SelectItem value="sell">Sell</SelectItem>
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
                onChange={(e) => {
                  form.setValue("shares", e.target.value);
                }}
                placeholder="0"
                step="any"
                type="number"
              />
              <FieldError />
            </FieldContent>
          </Field>

          <Field name="price">
            <FieldLabel>Price per Share *</FieldLabel>
            <FieldContent>
              <Input
                {...form.register("price")}
                onChange={(e) => {
                  form.setValue("price", e.target.value);
                }}
                placeholder="0.00"
                step="0.01"
                type="number"
              />
              <FieldError />
            </FieldContent>
          </Field>
        </div>

        {watchedShares && watchedPrice && (
          <div className="rounded-md bg-neutral-100 p-3 dark:bg-neutral-800">
            <span className="font-medium text-neutral-700 text-sm dark:text-neutral-300">
              Total: ${total}
            </span>
          </div>
        )}

        <Field name="date">
          <FieldLabel>Date *</FieldLabel>
          <FieldContent>
            <Input {...form.register("date")} type="date" />
            <FieldError />
          </FieldContent>
        </Field>

        <div className="flex justify-end gap-2 pt-4">
          <Button onClick={() => popModal()} type="button" variant="secondary">
            Cancel
          </Button>
          <Button disabled={recordTransaction.isPending} type="submit">
            {recordTransaction.isPending
              ? "Recording..."
              : "Record Transaction"}
          </Button>
        </div>
      </form>
    </ModalContent>
  );
}
