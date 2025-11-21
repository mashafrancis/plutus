"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { ModalContent, ModalHeader } from "@/modals/common/container";
import type { Expense } from "@/prisma/generated/prisma/client";
import { popModal } from ".";

const AddEditExpenses = () => {
  const form = useForm<Expense>({
    resolver: zodResolver(ZCreateSchema),
    defaultValues: {
      name: "",
      description: "",
      workspaceId,
      tiles: [],
      tags: [],
      interval: "30m",
    },
  });

  const createDashboard = useCreateDashboard();

  function onSubmit(values: TCreateContentSchema) {
    try {
      createDashboard.mutate(values);
      popModal("expenses");
    } catch (e) {
      toast.error("Uh oh!", {
        // @ts-expect-error
        description: `An error occurred: ${e.message}`,
      });
    }
  }

  return (
    <ModalContent>
      <ModalHeader
        className="items-start justify-start"
        text="Visualize your data through graphical representation"
        title="Add new expense"
      />
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col space-y-4 bg-secondary/70 p-4">
          <Input
            disabled={form.formState.isSubmitting}
            id="name"
            label="Name"
            placeholder="e.g. MXL Stuff Dashboard"
            type="text"
            {...form.register("name")}
          />

          <Input
            disabled={form.formState.isSubmitting}
            id="description"
            label="Description (Optional)"
            placeholder="Brief description of the dashboard"
            type="text"
            {...form.register("description")}
          />

          <DialogFooter>
            <Button
              htmlType="button"
              onClick={() => popModal()}
              size="small"
              variant={"secondary"}
            >
              Cancel
            </Button>
            <Button
              htmlType="submit"
              loading={createDashboard.isPending}
              size="small"
            >
              Create
            </Button>
          </DialogFooter>
        </div>
      </form>
    </ModalContent>
  );
};

export default AddEditExpenses;
