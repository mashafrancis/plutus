import { LayoutDashboard, ArrowDownCircle, ArrowUpCircle, RefreshCw, TrendingUp, Settings, type LucideIcon } from 'lucide-react'
import { cn } from './utils'

export interface NavigationItem {
  label: string
  href: string
  icon: LucideIcon
  isActive?: boolean
}

interface MainNavProps {
  items: NavigationItem[]
  isCollapsed: boolean
  onNavigate?: (href: string) => void
}

// Maps label names to icons as fallback when icon is not provided
const labelIconMap: Record<string, LucideIcon> = {
  Dashboard: LayoutDashboard,
  Expenses: ArrowDownCircle,
  Income: ArrowUpCircle,
  Subscriptions: RefreshCw,
  Investments: TrendingUp,
  Settings: Settings,
}

export function MainNav({ items, isCollapsed, onNavigate }: MainNavProps) {
  const handleClick = (href: string) => {
    onNavigate?.(href)
  }

  return (
    <nav className="flex flex-col gap-1 px-2 py-4">
      {items.map((item) => {
        // Use provided icon, or fall back to label-based lookup, or default to LayoutDashboard
        const Icon = item.icon || labelIconMap[item.label] || LayoutDashboard
        return (
          <button
            key={item.href}
            onClick={() => handleClick(item.href)}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              'hover:bg-neutral-100 dark:hover:bg-neutral-800',
              item.isActive
                ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                : 'text-neutral-700 dark:text-neutral-300',
              isCollapsed && 'justify-center px-2'
            )}
            title={isCollapsed ? item.label : undefined}
          >
            <Icon className="h-5 w-5 shrink-0" strokeWidth={1.5} />
            {!isCollapsed && <span className="truncate">{item.label}</span>}
          </button>
        )
      })}
    </nav>
  )
}

