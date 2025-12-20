import { FolderTree, Tag, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BulkActionBarProps {
  selectedCount: number;
  onBulkDelete?: () => void;
  onBulkChangeCategory?: () => void;
  onBulkAddTags?: () => void;
  onClearSelection?: () => void;
}

export function BulkActionBar({
  selectedCount,
  onBulkDelete,
  onBulkChangeCategory,
  onBulkAddTags,
  onClearSelection,
}: BulkActionBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between border-blue-200 border-b bg-blue-50 px-6 py-3 shadow-sm dark:border-blue-800 dark:bg-blue-950">
      <div className="flex items-center gap-3">
        <span className="font-medium text-blue-900 text-sm dark:text-blue-100">
          {selectedCount} {selectedCount === 1 ? "expense" : "expenses"}{" "}
          selected
        </span>
        <Button
          className="h-7 px-2 text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100"
          onClick={onClearSelection}
          size="sm"
          variant="ghost"
        >
          <X className="mr-1 h-3 w-3" />
          Clear
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="h-7 border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900"
              size="sm"
              variant="outline"
            >
              <FolderTree className="mr-1 h-3 w-3" />
              Change Category
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onBulkChangeCategory}>
              Select category...
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="h-7 border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900"
              size="sm"
              variant="outline"
            >
              <Tag className="mr-1 h-3 w-3" />
              Add Tags
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onBulkAddTags}>
              Select tags...
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          className="h-7 border-red-300 text-red-700 hover:bg-red-100 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-900"
          onClick={onBulkDelete}
          size="sm"
          variant="outline"
        >
          <Trash2 className="mr-1 h-3 w-3" />
          Delete
        </Button>
      </div>
    </div>
  );
}
