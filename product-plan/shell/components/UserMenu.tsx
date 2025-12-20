import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'
import { Button } from '../../ui/button'
import { cn } from './utils'

interface UserMenuProps {
  user: {
    name: string
    avatarUrl?: string
  }
  isCollapsed: boolean
  onToggleCollapse: () => void
  onLogout?: () => void
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function UserMenu({ user, isCollapsed, onToggleCollapse, onLogout }: UserMenuProps) {
  const initials = getInitials(user.name)

  return (
    <div className={cn('border-t border-neutral-200 dark:border-neutral-800 p-2', isCollapsed && 'px-2')}>
      <div className={cn('flex items-center gap-3 px-2 py-2', isCollapsed && 'justify-center')}>
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>
        {!isCollapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">{user.name}</p>
          </div>
        )}
      </div>
      <div className={cn('flex items-center gap-1 px-2', isCollapsed && 'justify-center')}>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className={cn(
            'h-8 w-full justify-start text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100',
            isCollapsed && 'justify-center w-auto'
          )}
          title={isCollapsed ? (isCollapsed ? 'Expand' : 'Collapse') : undefined}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span className="ml-2">Collapse</span>
            </>
          )}
        </Button>
        {!isCollapsed && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className="h-8 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}

