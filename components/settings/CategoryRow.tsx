import {
  Archive,
  ArchiveRestore,
  Edit,
  MoreVertical,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Category } from "@/lib/types/settings";
import { cn } from "./utils";

interface CategoryRowProps {
  category: Category;
  onEdit?: (categoryId: string) => void;
  onDelete?: (categoryId: string) => void;
  onArchive?: (categoryId: string, archived: boolean) => void;
}

export function CategoryRow({
  category,
  onEdit,
  onDelete,
  onArchive,
}: CategoryRowProps) {
  // Map color names to Tailwind classes
  const colorMap: Record<string, string> = {
    blue: "bg-blue-500",
    orange: "bg-orange-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    red: "bg-red-500",
    pink: "bg-pink-500",
    emerald: "bg-emerald-500",
    gray: "bg-gray-500",
  };

  const colorClass = colorMap[category.color] || "bg-neutral-500";

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-lg border border-neutral-200 p-3 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900",
        category.isArchived && "opacity-60"
      )}
    >
      <div className="flex flex-1 items-center gap-3">
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full text-white text-xs",
            colorClass
          )}
        >
          {/* Icon placeholder - would use lucide-react icons in production */}
          <span className="font-geist-sans">
            {category.icon.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <p className="font-geist-sans font-medium text-neutral-900 dark:text-neutral-100">
              {category.name}
            </p>
            <Badge
              className={cn(
                "font-geist-sans text-xs",
                category.type === "expense"
                  ? "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300"
                  : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
              )}
              variant="outline"
            >
              {category.type === "expense" ? "Expense" : "Income"}
            </Badge>
            {category.isDefault && (
              <Badge
                className="bg-neutral-100 font-geist-sans text-neutral-600 text-xs dark:bg-neutral-800 dark:text-neutral-400"
                variant="outline"
              >
                Default
              </Badge>
            )}
            {category.isArchived && (
              <Badge
                className="bg-neutral-100 font-geist-sans text-neutral-600 text-xs dark:bg-neutral-800 dark:text-neutral-400"
                variant="outline"
              >
                Archived
              </Badge>
            )}
          </div>
          {category.notes && (
            <p className="font-geist-sans text-neutral-500 text-xs dark:text-neutral-500">
              {category.notes}
            </p>
          )}
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="rounded p-1 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800">
            <MoreVertical className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="font-geist-sans"
            onClick={() => onEdit?.(category.id)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="font-geist-sans"
            onClick={() => onArchive?.(category.id, !category.isArchived)}
          >
            {category.isArchived ? (
              <>
                <ArchiveRestore className="mr-2 h-4 w-4" />
                Unarchive
              </>
            ) : (
              <>
                <Archive className="mr-2 h-4 w-4" />
                Archive
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="font-geist-sans text-red-600 dark:text-red-400"
            onClick={() => onDelete?.(category.id)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
