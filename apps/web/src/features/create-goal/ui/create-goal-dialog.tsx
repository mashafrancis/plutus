import { PlusIcon } from "@phosphor-icons/react";
import { useForm } from "@tanstack/react-form";
import { Schema } from "effect";
import { isValidElement, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateGoal } from "@/entities/goal/api/use-create-goal";

import { GOAL_ICONS, GoalFormSchema } from "../model/goal-form-schema";

export function CreateGoalDialog({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const createGoal = useCreateGoal();
  const triggerRender = isValidElement(children) ? (
    children
  ) : (
    <Button>
      <PlusIcon className="mr-2" data-icon="inline-start" />
      Create Goal
    </Button>
  );

  const form = useForm({
    defaultValues: {
      name: "",
      targetAmount: "",
      currentAmount: "",
      targetDate: "",
      icon: "🎯",
    },
    onSubmit: async ({ value }) => {
      try {
        await createGoal({
          name: value.name,
          targetAmount: Number.parseFloat(value.targetAmount),
          currentAmount: value.currentAmount ? Number.parseFloat(value.currentAmount) : undefined,
          currency: "KES",
          targetDate: value.targetDate ? new Date(value.targetDate).getTime() : undefined,
          icon: value.icon || undefined,
        });
        toast.success("Goal created");
        setOpen(false);
        form.reset();
      } catch {
        toast.error("Failed to create goal");
      }
    },
    validators: {
      onSubmit: Schema.standardSchemaV1(GoalFormSchema),
    },
  });

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger render={triggerRender} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Goal</DialogTitle>
          <DialogDescription>Set a new financial goal to track.</DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field name="icon">
            {(field) => (
              <div className="flex flex-col gap-2">
                <Label>Icon</Label>
                <form.Subscribe selector={(state) => state.values.icon}>
                  {(selectedIcon) => (
                    <div className="flex gap-2">
                      {GOAL_ICONS.map((i) => (
                        <button
                          className={`rounded p-2 text-xl hover:bg-accent ${
                            selectedIcon === i ? "bg-accent" : ""
                          }`}
                          key={i}
                          onClick={() => field.handleChange(i)}
                          type="button"
                        >
                          {i}
                        </button>
                      ))}
                    </div>
                  )}
                </form.Subscribe>
              </div>
            )}
          </form.Field>

          <form.Field name="name">
            {(field) => (
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Goal Name</Label>
                <Input
                  id="name"
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="e.g., Emergency Fund"
                  value={field.state.value}
                />
                {field.state.meta.errors.map((error) => (
                  <p className="text-destructive text-sm" key={error?.message}>
                    {error?.message}
                  </p>
                ))}
              </div>
            )}
          </form.Field>

          <div className="grid grid-cols-2 gap-4">
            <form.Field name="targetAmount">
              {(field) => (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="targetAmount">Target Amount</Label>
                  <Input
                    id="targetAmount"
                    min="0"
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="10000"
                    step="0.01"
                    type="number"
                    value={field.state.value}
                  />
                  {field.state.meta.errors.map((error) => (
                    <p className="text-destructive text-sm" key={error?.message}>
                      {error?.message}
                    </p>
                  ))}
                </div>
              )}
            </form.Field>

            <form.Field name="currentAmount">
              {(field) => (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="currentAmount">Current Progress</Label>
                  <Input
                    id="currentAmount"
                    min="0"
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="0"
                    step="0.01"
                    type="number"
                    value={field.state.value}
                  />
                </div>
              )}
            </form.Field>
          </div>

          <form.Field name="targetDate">
            {(field) => (
              <div className="flex flex-col gap-2">
                <Label htmlFor="targetDate">Target Date (optional)</Label>
                <Input
                  id="targetDate"
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="date"
                  value={field.state.value}
                />
              </div>
            )}
          </form.Field>

          <DialogFooter>
            <Button onClick={() => setOpen(false)} type="button" variant="outline">
              Cancel
            </Button>
            <form.Subscribe>
              {(state) => (
                <Button disabled={state.isSubmitting} type="submit">
                  {state.isSubmitting ? "Creating…" : "Create Goal"}
                </Button>
              )}
            </form.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
