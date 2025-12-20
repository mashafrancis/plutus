import { MoreVertical, Edit, Trash2, Archive, ArchiveRestore, Star, DollarSign } from 'lucide-react'
import { Badge } from '../../ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'
import { cn } from './utils'
import type { Account } from '../types'

interface AccountRowProps {
  account: Account
  onEdit?: (accountId: string) => void
  onDelete?: (accountId: string) => void
  onArchive?: (accountId: string, archived: boolean) => void
  onSetDefault?: (accountId: string) => void
  onUpdateBalance?: (accountId: string, balance: number) => void
}

export function AccountRow({
  account,
  onEdit,
  onDelete,
  onArchive,
  onSetDefault,
  onUpdateBalance,
}: AccountRowProps) {
  const formatCurrency = (amount: number) => {
    return `$${Math.abs(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const formatAccountType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1)
  }

  const isNegative = account.currentBalance < 0

  return (
    <div className={cn(
      "flex items-center justify-between p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors",
      account.isArchived && "opacity-60"
    )}>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <p className="font-medium text-neutral-900 dark:text-neutral-100 font-geist-sans">
            {account.name}
          </p>
          {account.isDefault && (
            <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 text-xs font-geist-sans">
              <Star className="h-3 w-3 mr-1" />
              Default
            </Badge>
          )}
          {account.isArchived && (
            <Badge variant="outline" className="bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs font-geist-sans">
              Archived
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400 font-geist-sans">
          <span>{formatAccountType(account.type)}</span>
          <span className={cn(
            "font-geist-mono",
            isNegative ? "text-red-600 dark:text-red-400" : "text-neutral-900 dark:text-neutral-100"
          )}>
            {isNegative ? '-' : ''}{formatCurrency(account.currentBalance)}
          </span>
        </div>
        {account.notes && (
          <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1 font-geist-sans">
            {account.notes}
          </p>
        )}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors">
            <MoreVertical className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {!account.isDefault && (
            <DropdownMenuItem
              onClick={() => onSetDefault?.(account.id)}
              className="font-geist-sans"
            >
              <Star className="h-4 w-4 mr-2" />
              Set as Default
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() => onUpdateBalance?.(account.id, account.currentBalance)}
            className="font-geist-sans"
          >
            <DollarSign className="h-4 w-4 mr-2" />
            Update Balance
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onEdit?.(account.id)}
            className="font-geist-sans"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => onArchive?.(account.id, !account.isArchived)}
            className="font-geist-sans"
          >
            {account.isArchived ? (
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
            onClick={() => onDelete?.(account.id)}
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

