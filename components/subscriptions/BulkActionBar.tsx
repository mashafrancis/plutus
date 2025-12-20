import { FolderTree, Pause, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BulkActionBarProps {
  selectedCount: number;
  onBulkPause?: () => void;
  onBulkCancel?: () => void;
  onBulkChangeCategory?: () => void;
  onClearSelection?: () => void;
}

export function BulkActionBar({
  selectedCount,
  onBulkPause,
  onBulkCancel,
  onBulkChangeCategory,
  onClearSelection,
}: BulkActionBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between border-blue-200 border-b bg-blue-50 px-6 py-3 shadow-sm dark:border-blue-800 dark:bg-blue-950">
      <div className="flex items-center gap-3">
        <span className="font-medium text-blue-900 text-sm dark:text-blue-100">
          {selectedCount}{" "}
          {selectedCount === 1 ? "subscription" : "subscriptions"} selected
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
        <Button
          className="h-7 border-amber-300 text-amber-700 hover:bg-amber-100 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-900"
          onClick={onBulkPause}
          size="sm"
          variant="outline"
        >
          <Pause className="mr-1 h-3 w-3" />
          Pause
        </Button>

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

        <Button
          className="h-7 border-red-300 text-red-700 hover:bg-red-100 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-900"
          onClick={onBulkCancel}
          size="sm"
          variant="outline"
        >
          <X className="mr-1 h-3 w-3" />
          Cancel
        </Button>
      </div>
    </div>
  );
}
