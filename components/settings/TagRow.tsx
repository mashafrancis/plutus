import { Edit, Merge, MoreVertical, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Tag } from "@/lib/types/settings";

interface TagRowProps {
  tag: Tag;
  allTags: Tag[];
  onEdit?: (tagId: string) => void;
  onDelete?: (tagId: string) => void;
  onMerge?: (sourceTagId: string, targetTagId: string) => void;
}

export function TagRow({
  tag,
  allTags,
  onEdit,
  onDelete,
  onMerge,
}: TagRowProps) {
  const otherTags = allTags.filter((t) => t.id !== tag.id);

  return (
    <div className="flex items-center justify-between rounded-lg border border-neutral-200 p-3 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900">
      <div className="flex flex-1 items-center gap-2">
        <Badge className="font-geist-sans" variant="outline">
          {tag.name}
        </Badge>
        <span className="font-geist-mono text-neutral-500 text-xs dark:text-neutral-500">
          {tag.usageCount} {tag.usageCount === 1 ? "use" : "uses"}
        </span>
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
            onClick={() => onEdit?.(tag.id)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          {otherTags.length > 0 && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="font-geist-sans">
                  <Merge className="mr-2 h-4 w-4" />
                  Merge into...
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="max-h-48 overflow-y-auto">
                  {otherTags.map((otherTag) => (
                    <DropdownMenuItem
                      className="font-geist-sans"
                      key={otherTag.id}
                      onClick={() => onMerge?.(tag.id, otherTag.id)}
                    >
                      {otherTag.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="font-geist-sans text-red-600 dark:text-red-400"
            onClick={() => onDelete?.(tag.id)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
