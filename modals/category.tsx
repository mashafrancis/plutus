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

const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  icon: z.string().optional(),
  color: z.string().optional(),
  type: z.enum(["expense", "income"]),
  parentId: z.string().optional(),
  notes: z.string().optional(),
});

type CategoryFormData = z.infer<typeof categorySchema>;

type CategoryModalProps = {
  readonly categoryId?: string;
};

export default function CategoryModal({ categoryId }: CategoryModalProps) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const isEditMode = !!categoryId;

  const { data: settingsData } = useQuery(trpc.settings.getData.queryOptions());

  const category = settingsData?.categories.find(
    (cat) => cat.id === categoryId
  );

  const createCategory = useMutation(
    trpc.settings.createCategory.mutationOptions({
      onSuccess: () => {
        toast.success("Category added successfully");
        queryClient.invalidateQueries(trpc.settings.getData.pathFilter());
        popModal();
      },
      onError: (error) => {
        toast.error("Failed to add category", {
          description: error.message,
        });
      },
    })
  );

  const updateCategory = useMutation(
    trpc.settings.updateCategory.mutationOptions({
      onSuccess: () => {
        toast.success("Category updated successfully");
        queryClient.invalidateQueries(trpc.settings.getData.pathFilter());
        popModal();
      },
      onError: (error) => {
        toast.error("Failed to update category", {
          description: error.message,
        });
      },
    })
  );

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      icon: "circle",
      color: "blue",
      type: "expense",
      parentId: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (isEditMode && category) {
      form.reset({
        name: category.name,
        icon: category.icon,
        color: category.color,
        type: category.type,
        parentId: category.parentId || "",
        notes: category.notes || "",
      });
    }
  }, [isEditMode, category, form]);

  const rootCategories = settingsData?.categories.filter(
    (cat) => cat.parentId === null && cat.id !== categoryId
  );

  const onSubmit = (data: CategoryFormData) => {
    if (isEditMode && categoryId) {
      updateCategory.mutate({
        id: categoryId,
        ...data,
        parentId: data.parentId || undefined,
      });
    } else {
      createCategory.mutate({
        ...data,
        parentId: data.parentId || undefined,
      });
    }
  };

  return (
    <>
      <ModalHeader
        onClose={popModal}
        title={isEditMode ? "Edit Category" : "Add Category"}
      />
      <form
        className="flex flex-col gap-4 p-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Field name="name">
          <FieldLabel>Name *</FieldLabel>
          <FieldContent>
            <Input {...form.register("name")} placeholder="Category name" />
            <FieldError />
          </FieldContent>
        </Field>

        <Field name="type">
          <FieldLabel>Type *</FieldLabel>
          <FieldContent>
            <Select
              onValueChange={(value) =>
                form.setValue("type", value as CategoryFormData["type"])
              }
              value={form.watch("type")}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="expense">Expense</SelectItem>
                <SelectItem value="income">Income</SelectItem>
              </SelectContent>
            </Select>
            <FieldError />
          </FieldContent>
        </Field>

        <Field name="parentId">
          <FieldLabel>Parent Category (optional)</FieldLabel>
          <FieldContent>
            <Select
              onValueChange={(value) =>
                form.setValue("parentId", value || undefined)
              }
              value={form.watch("parentId") || ""}
            >
              <SelectTrigger>
                <SelectValue placeholder="None" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">None</SelectItem>
                {rootCategories?.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError />
          </FieldContent>
        </Field>

        <Field name="color">
          <FieldLabel>Color</FieldLabel>
          <FieldContent>
            <Select
              onValueChange={(value) => form.setValue("color", value)}
              value={form.watch("color") || "blue"}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blue">Blue</SelectItem>
                <SelectItem value="orange">Orange</SelectItem>
                <SelectItem value="green">Green</SelectItem>
                <SelectItem value="purple">Purple</SelectItem>
                <SelectItem value="red">Red</SelectItem>
                <SelectItem value="pink">Pink</SelectItem>
                <SelectItem value="emerald">Emerald</SelectItem>
                <SelectItem value="gray">Gray</SelectItem>
              </SelectContent>
            </Select>
            <FieldError />
          </FieldContent>
        </Field>

        <Field name="icon">
          <FieldLabel>Icon</FieldLabel>
          <FieldContent>
            <Input {...form.register("icon")} placeholder="Icon name" />
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
            disabled={createCategory.isPending || updateCategory.isPending}
            type="submit"
          >
            {(() => {
              if (createCategory.isPending || updateCategory.isPending) {
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
