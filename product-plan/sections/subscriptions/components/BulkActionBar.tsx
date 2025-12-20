import { Pause, X, FolderTree } from 'lucide-react'
import { Button } from '../../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'

interface BulkActionBarProps {
  selectedCount: number
  onBulkPause?: () => void
  onBulkCancel?: () => void
  onBulkChangeCategory?: () => void
  onClearSelection?: () => void
}

export function BulkActionBar({
  selectedCount,
  onBulkPause,
  onBulkCancel,
  onBulkChangeCategory,
  onClearSelection,
}: BulkActionBarProps) {
  if (selectedCount === 0) return null

  return (
    <div className="sticky top-0 z-10 bg-blue-50 dark:bg-blue-950 border-b border-blue-200 dark:border-blue-800 px-6 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-blue-900 dark:text-blue-100 font-geist-sans">
          {selectedCount} {selectedCount === 1 ? 'subscription' : 'subscriptions'} selected
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearSelection}
          className="h-7 px-2 text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100"
        >
          <X className="h-3 w-3 mr-1" />
          Clear
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onBulkPause}
          className="h-7 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900 font-geist-sans"
        >
          <Pause className="h-3 w-3 mr-1" />
          Pause
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-7 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900 font-geist-sans"
            >
              <FolderTree className="h-3 w-3 mr-1" />
              Change Category
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onBulkChangeCategory} className="font-geist-sans">
              Select category...
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          size="sm"
          onClick={onBulkCancel}
          className="h-7 border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900 font-geist-sans"
        >
          <X className="h-3 w-3 mr-1" />
          Cancel
        </Button>
      </div>
    </div>
  )
}

