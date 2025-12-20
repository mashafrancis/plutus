import { MoreVertical, Edit, Trash2, Merge } from 'lucide-react'
import { Badge } from '../../ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '../../ui/dropdown-menu'
import { cn } from './utils'
import type { Tag } from '../types'

interface TagRowProps {
  tag: Tag
  allTags: Tag[]
  onEdit?: (tagId: string) => void
  onDelete?: (tagId: string) => void
  onMerge?: (sourceTagId: string, targetTagId: string) => void
}

export function TagRow({
  tag,
  allTags,
  onEdit,
  onDelete,
  onMerge,
}: TagRowProps) {
  const otherTags = allTags.filter(t => t.id !== tag.id)

  return (
    <div className="flex items-center justify-between p-3 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
      <div className="flex items-center gap-2 flex-1">
        <Badge variant="outline" className="font-geist-sans">
          {tag.name}
        </Badge>
        <span className="text-xs text-neutral-500 dark:text-neutral-500 font-geist-mono">
          {tag.usageCount} {tag.usageCount === 1 ? 'use' : 'uses'}
        </span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors">
            <MoreVertical className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => onEdit?.(tag.id)}
            className="font-geist-sans"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
          {otherTags.length > 0 && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="font-geist-sans">
                  <Merge className="h-4 w-4 mr-2" />
                  Merge into...
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="max-h-48 overflow-y-auto">
                  {otherTags.map((otherTag) => (
                    <DropdownMenuItem
                      key={otherTag.id}
                      onClick={() => onMerge?.(tag.id, otherTag.id)}
                      className="font-geist-sans"
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
            onClick={() => onDelete?.(tag.id)}
            className="text-red-600 dark:text-red-400 font-geist-sans"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

