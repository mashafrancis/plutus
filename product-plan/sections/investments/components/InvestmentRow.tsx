import { MoreVertical, TrendingUp, TrendingDown, Edit, Trash2, Plus, DollarSign, History } from 'lucide-react'
import { Badge } from '../../ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'
import { cn } from './utils'
import type { Investment, Account } from '../types'

interface InvestmentRowProps {
  investment: Investment
  account?: Account
  onEdit?: (investmentId: string) => void
  onDelete?: (investmentId: string) => void
  onRecordTransaction?: (investmentId: string) => void
  onUpdateValue?: (investmentId: string) => void
  onViewHistory?: (investmentId: string) => void
}

export function InvestmentRow({
  investment,
  account,
  onEdit,
  onDelete,
  onRecordTransaction,
  onUpdateValue,
  onViewHistory,
}: InvestmentRowProps) {
  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const formatAssetType = (type: string) => {
    return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  const isPositive = investment.gainLossDollar > 0
  const isNegative = investment.gainLossDollar < 0
  const todayIsPositive = investment.todayChangeDollar > 0
  const todayIsNegative = investment.todayChangeDollar < 0

  return (
    <tr className="border-b border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
      {/* Name/Ticker */}
      <td className="px-4 py-3">
        <div>
          <p className="font-medium text-neutral-900 dark:text-neutral-100 font-geist-sans">
            {investment.name}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-500 font-geist-mono">
            {investment.ticker}
          </p>
        </div>
      </td>

      {/* Asset Type */}
      <td className="px-4 py-3">
        <Badge variant="outline" className="font-geist-sans">
          {formatAssetType(investment.assetType)}
        </Badge>
      </td>

      {/* Shares/Units */}
      <td className="px-4 py-3">
        <span className="text-sm text-neutral-700 dark:text-neutral-300 font-geist-mono">
          {investment.shares.toLocaleString(undefined, { maximumFractionDigits: 4 })}
        </span>
      </td>

      {/* Cost Basis */}
      <td className="px-4 py-3">
        <span className="text-sm text-neutral-700 dark:text-neutral-300 font-geist-mono">
          {formatCurrency(investment.costBasis)}
        </span>
      </td>

      {/* Current Value */}
      <td className="px-4 py-3">
        <span className="font-semibold text-neutral-900 dark:text-neutral-100 font-geist-mono">
          {formatCurrency(investment.currentValue)}
        </span>
      </td>

      {/* Gain/Loss */}
      <td className="px-4 py-3">
        <div className="flex flex-col">
          <span className={cn(
            "text-sm font-semibold font-geist-mono",
            isPositive && "text-emerald-600 dark:text-emerald-400",
            isNegative && "text-red-600 dark:text-red-400",
            !isPositive && !isNegative && "text-neutral-600 dark:text-neutral-400"
          )}>
            {isPositive ? '+' : ''}{formatCurrency(investment.gainLossDollar)}
          </span>
          <span className={cn(
            "text-xs font-geist-mono",
            isPositive && "text-emerald-600 dark:text-emerald-400",
            isNegative && "text-red-600 dark:text-red-400",
            !isPositive && !isNegative && "text-neutral-600 dark:text-neutral-400"
          )}>
            {isPositive ? '+' : ''}{investment.gainLossPercent.toFixed(1)}%
          </span>
        </div>
      </td>

      {/* Today's Change */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-1">
          {todayIsPositive && <TrendingUp className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />}
          {todayIsNegative && <TrendingDown className="h-3 w-3 text-red-600 dark:text-red-400" />}
          <span className={cn(
            "text-sm font-geist-mono",
            todayIsPositive && "text-emerald-600 dark:text-emerald-400",
            todayIsNegative && "text-red-600 dark:text-red-400",
            !todayIsPositive && !todayIsNegative && "text-neutral-600 dark:text-neutral-400"
          )}>
            {todayIsPositive ? '+' : ''}{formatCurrency(investment.todayChangeDollar)}
          </span>
        </div>
        <span className={cn(
          "text-xs font-geist-mono",
          todayIsPositive && "text-emerald-600 dark:text-emerald-400",
          todayIsNegative && "text-red-600 dark:text-red-400",
          !todayIsPositive && !todayIsNegative && "text-neutral-600 dark:text-neutral-400"
        )}>
          {todayIsPositive ? '+' : ''}{investment.todayChangePercent.toFixed(2)}%
        </span>
      </td>

      {/* Allocation %} */}
      <td className="px-4 py-3">
        <span className="text-sm text-neutral-600 dark:text-neutral-400 font-geist-mono">
          {investment.allocationPercent.toFixed(1)}%
        </span>
      </td>

      {/* Account */}
      <td className="px-4 py-3">
        <span className="text-sm text-neutral-600 dark:text-neutral-400 font-geist-sans">
          {account?.name || investment.accountId}
        </span>
      </td>

      {/* Actions */}
      <td className="px-4 py-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors">
              <MoreVertical className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => onEdit?.(investment.id)}
              className="font-geist-sans"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onRecordTransaction?.(investment.id)}
              className="font-geist-sans"
            >
              <Plus className="h-4 w-4 mr-2" />
              Record Transaction
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onUpdateValue?.(investment.id)}
              className="font-geist-sans"
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Update Value
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onViewHistory?.(investment.id)}
              className="font-geist-sans"
            >
              <History className="h-4 w-4 mr-2" />
              View History
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete?.(investment.id)}
              className="text-red-600 dark:text-red-400 font-geist-sans"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  )
}

