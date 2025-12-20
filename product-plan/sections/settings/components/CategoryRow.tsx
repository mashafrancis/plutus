import { MoreVertical, Edit, Trash2, Archive, ArchiveRestore } from 'lucide-react'
import { Badge } from '../../ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'
import { cn } from './utils'
import type { Category } from '../types'

interface CategoryRowProps {
  category: Category
  onEdit?: (categoryId: string) => void
  onDelete?: (categoryId: string) => void
  onArchive?: (categoryId: string, archived: boolean) => void
}

export function CategoryRow({
  category,
  onEdit,
  onDelete,
  onArchive,
}: CategoryRowProps) {
  // Map color names to Tailwind classes
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-500',
    orange: 'bg-orange-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    red: 'bg-red-500',
    pink: 'bg-pink-500',
    emerald: 'bg-emerald-500',
    gray: 'bg-gray-500',
  }

  const colorClass = colorMap[category.color] || 'bg-neutral-500'

  return (
    <div className={cn(
      "flex items-center justify-between p-3 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors",
      category.isArchived && "opacity-60"
    )}>
      <div className="flex items-center gap-3 flex-1">
        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white text-xs", colorClass)}>
          {/* Icon placeholder - would use lucide-react icons in production */}
          <span className="font-geist-sans">{category.icon.charAt(0).toUpperCase()}</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-medium text-neutral-900 dark:text-neutral-100 font-geist-sans">
              {category.name}
            </p>
            <Badge variant="outline" className={cn(
              "text-xs font-geist-sans",
              category.type === 'expense' 
                ? "bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800"
                : "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
            )}>
              {category.type === 'expense' ? 'Expense' : 'Income'}
            </Badge>
            {category.isDefault && (
              <Badge variant="outline" className="bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs font-geist-sans">
                Default
              </Badge>
            )}
            {category.isArchived && (
              <Badge variant="outline" className="bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs font-geist-sans">
                Archived
              </Badge>
            )}
          </div>
          {category.notes && (
            <p className="text-xs text-neutral-500 dark:text-neutral-500 font-geist-sans">
              {category.notes}
            </p>
          )}
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors">
            <MoreVertical className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => onEdit?.(category.id)}
            className="font-geist-sans"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => onArchive?.(category.id, !category.isArchived)}
            className="font-geist-sans"
          >
            {category.isArchived ? (
              <>
                <ArchiveRestore className="h-4 w-4 mr-2" />
                Unarchive
              </>
            ) : (
              <>
                <Archive className="h-4 w-4 mr-2" />
                Archive
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onDelete?.(category.id)}
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

