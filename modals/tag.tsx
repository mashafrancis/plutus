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
import { ModalHeader } from "@/modals/common/container";
import { useTRPC } from "@/trpc/react";

const tagSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

type TagFormData = z.infer<typeof tagSchema>;

type TagModalProps = {
  readonly tagId?: string;
};

export default function TagModal({ tagId }: TagModalProps) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const isEditMode = !!tagId;

  const { data: settingsData } = useQuery(trpc.settings.getData.queryOptions());

  const tag = settingsData?.tags.find((t) => t.id === tagId);

  const createTag = useMutation(
    trpc.settings.createTag.mutationOptions({
      onSuccess: () => {
        toast.success("Tag added successfully");
        queryClient.invalidateQueries(trpc.settings.getData.pathFilter());
        popModal();
      },
      onError: (error) => {
        toast.error("Failed to add tag", {
          description: error.message,
        });
      },
    })
  );

  const updateTag = useMutation(
    trpc.settings.updateTag.mutationOptions({
      onSuccess: () => {
        toast.success("Tag updated successfully");
        queryClient.invalidateQueries(trpc.settings.getData.pathFilter());
        popModal();
      },
      onError: (error) => {
        toast.error("Failed to update tag", {
          description: error.message,
        });
      },
    })
  );

  const form = useForm<TagFormData>({
    resolver: zodResolver(tagSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (isEditMode && tag) {
      form.reset({
        name: tag.name,
      });
    }
  }, [isEditMode, tag, form]);

  const onSubmit = (data: TagFormData) => {
    if (isEditMode && tagId) {
      updateTag.mutate({
        id: tagId,
        ...data,
      });
    } else {
      createTag.mutate(data);
    }
  };

  return (
    <>
      <ModalHeader
        onClose={popModal}
        title={isEditMode ? "Edit Tag" : "Add Tag"}
      />
      <form
        className="flex flex-col gap-4 p-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Field name="name">
          <FieldLabel>Name *</FieldLabel>
          <FieldContent>
            <Input {...form.register("name")} placeholder="Tag name" />
            <FieldError />
          </FieldContent>
        </Field>

        <div className="flex justify-end gap-2">
          <Button onClick={popModal} type="button" variant="outline">
            Cancel
          </Button>
          <Button
            disabled={createTag.isPending || updateTag.isPending}
            type="submit"
          >
            {(() => {
              if (createTag.isPending || updateTag.isPending) {
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
