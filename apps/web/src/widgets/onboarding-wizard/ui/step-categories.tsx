import { PlusIcon, TrashIcon } from "@phosphor-icons/react";
import { api } from "@tanstack-effect-convex/backend/convex/_generated/api";
import type { Id } from "@tanstack-effect-convex/backend/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategoriesList } from "@/entities/category/api/use-categories-list";

// Simple emoji picker - predefined emojis
const EMOJI_OPTIONS = [
  "🍔",
  "🚗",
  "📄",
  "🎮",
  "🛍️",
  "💊",
  "💡",
  "💰",
  "🏠",
  "✈️",
  "📱",
  "🎬",
  "🏋️",
  "📚",
  "🎵",
  "☕",
];

const COLOR_OPTIONS = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
];

export default function StepCategories() {
  const { data: categories } = useCategoriesList();
  const createCategory = useMutation(api.categories.create);
  const removeCategory = useMutation(api.categories.remove);

  const [name, setName] = useState("");
  const [icon, setIcon] = useState("🍔");
  const [color, setColor] = useState("#ef4444");
  const [type, setType] = useState<"expense" | "income">("expense");
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async () => {
    if (!name.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    setIsAdding(true);
    try {
      await createCategory({
        name: name.trim(),
        icon,
        color,
        type,
      });

      setName("");
      toast.success("Category added!");
    } catch (_error) {
      toast.error("Failed to add category");
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id: Id<"categories">) => {
    try {
      await removeCategory({ id });
      toast.success("Category removed");
    } catch (_error) {
      toast.error("Failed to remove category");
    }
  };

  const defaultCategories = categories?.filter((c) => c.isDefault) || [];
  const customCategories = categories?.filter((c) => !c.isDefault) || [];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="font-semibold text-lg">Customize your categories</h3>
        <p className="text-muted-foreground text-sm">
          We've added some default categories. You can add your own custom ones too.
        </p>
      </div>

      {/* Default Categories */}
      {defaultCategories.length > 0 && (
        <div className="flex flex-col gap-2">
          <Label>Default Categories</Label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {defaultCategories.map((cat) => (
              <div
                className="flex items-center gap-2 rounded-lg border p-2"
                key={cat._id}
                style={{ borderColor: cat.color }}
              >
                <span className="text-xl">{cat.icon}</span>
                <span className="text-sm">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Custom Category */}
      <div className="flex flex-col gap-4 rounded-md border p-4">
        <Label>Add Custom Category</Label>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="cat-name">Name</Label>
            <Input
              id="cat-name"
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Coffee"
              value={name}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="cat-type">Type</Label>
            <Select
              items={[
                { value: "expense", label: "Expense" },
                { value: "income", label: "Income" },
              ]}
              onValueChange={(v) => setType(v as "expense" | "income")}
              value={type}
            >
              <SelectTrigger className="w-full" id="cat-type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="expense">Expense</SelectItem>
                <SelectItem value="income">Income</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Icon</Label>
            <div className="flex flex-wrap gap-2">
              {EMOJI_OPTIONS.map((emoji) => (
                <button
                  className={`flex h-10 w-10 items-center justify-center rounded-md border text-xl transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 ${
                    icon === emoji ? "border-primary bg-primary/10" : ""
                  }`}
                  key={emoji}
                  onClick={() => setIcon(emoji)}
                  type="button"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Color</Label>
            <div className="flex flex-wrap gap-2">
              {COLOR_OPTIONS.map((c) => (
                <button
                  className={`h-10 w-10 rounded-md border-2 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 ${
                    color === c ? "scale-110 border-foreground" : "border-transparent"
                  }`}
                  key={c}
                  onClick={() => setColor(c)}
                  style={{ backgroundColor: c }}
                  type="button"
                />
              ))}
            </div>
          </div>
        </div>

        <Button className="w-full" disabled={isAdding} onClick={handleAdd}>
          <PlusIcon className="mr-2" data-icon="inline-start" />
          Add Category
        </Button>
      </div>

      {/* Custom Categories List */}
      {customCategories.length > 0 && (
        <div className="flex flex-col gap-2">
          <Label>Your Custom Categories ({customCategories.length})</Label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {customCategories.map((cat) => (
              <div
                className="group relative flex items-center gap-2 rounded-lg border p-2"
                key={cat._id}
                style={{ borderColor: cat.color }}
              >
                <span className="text-xl">{cat.icon}</span>
                <span className="text-sm">{cat.name}</span>
                <Button
                  aria-label={`Delete category ${cat.name}`}
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100"
                  onClick={() => handleDelete(cat._id)}
                  size="icon"
                  variant="ghost"
                >
                  <TrashIcon aria-hidden weight="bold" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
