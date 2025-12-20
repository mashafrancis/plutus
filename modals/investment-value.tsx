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
import { popModal } from "@/modals";
import { ModalContent, ModalHeader } from "@/modals/common/container";
import { useTRPC } from "@/trpc/react";

const updateValueSchema = z.object({
  currentValue: z.string().min(1, "Current value is required"),
});

type UpdateValueFormData = z.infer<typeof updateValueSchema>;

interface InvestmentValueModalProps {
  readonly investmentId: string;
}

export default function InvestmentValueModal({
  investmentId,
}: InvestmentValueModalProps) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  // Fetch investment data to pre-fill current value
  const { data: investmentsData } = useQuery(
    trpc.investments.getData.queryOptions({})
  );

  const updateValue = useMutation(
    trpc.investments.updateValue.mutationOptions({
      onSuccess: () => {
        toast.success("Investment value updated successfully");
        queryClient.invalidateQueries(trpc.investments.getData.pathFilter());
        queryClient.invalidateQueries(trpc.investments.get.pathFilter());
        popModal();
      },
      onError: (error) => {
        toast.error("Failed to update value", {
          description: error.message,
        });
      },
    })
  );

  const investment = investmentsData?.investments.find(
    (inv) => inv.id === investmentId
  );

  const form = useForm<UpdateValueFormData>({
    resolver: zodResolver(updateValueSchema),
    defaultValues: {
      currentValue: investment?.currentValue.toString() || "0",
    },
  });

  // Update form when investment data loads
  useEffect(() => {
    if (investment) {
      form.reset({
        currentValue: investment.currentValue.toString(),
      });
    }
  }, [investment, form]);

  function onSubmit(data: UpdateValueFormData) {
    updateValue.mutate({
      investmentId,
      currentValue: data.currentValue,
    });
  }

  return (
    <ModalContent>
      <ModalHeader
        className="items-start justify-start"
        text="Manually update the current market value of this investment"
        title="Update Value"
      />
      <form
        className="flex flex-col gap-4 p-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
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

        <div className="flex justify-end gap-2 pt-4">
          <Button onClick={() => popModal()} type="button" variant="secondary">
            Cancel
          </Button>
          <Button disabled={updateValue.isPending} type="submit">
            {updateValue.isPending ? "Updating..." : "Update Value"}
          </Button>
        </div>
      </form>
    </ModalContent>
  );
}
