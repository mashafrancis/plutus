import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { MainNav, type NavigationItem } from './MainNav'
import { UserMenu } from './UserMenu'
import { Button } from '../../ui/button'
import { cn } from './utils'

export interface AppShellProps {
  children: React.ReactNode
  navigationItems: NavigationItem[]
  user?: {
    name: string
    avatarUrl?: string
  }
  onNavigate?: (href: string) => void
  onLogout?: () => void
}

export function AppShell({
  children,
  navigationItems,
  user = { name: 'User' },
  onNavigate,
  onLogout,
}: AppShellProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const handleNavigate = (href: string) => {
    onNavigate?.(href)
    setIsMobileOpen(false)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-50 dark:bg-neutral-950">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden lg:flex flex-col border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-all duration-300',
          isCollapsed ? 'w-16' : 'w-72'
        )}
      >
        <div className="flex h-16 items-center border-b border-neutral-200 dark:border-neutral-800 px-4">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">Plutus</h1>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
          )}
        </div>
        <div className="flex-1 overflow-y-auto">
          <MainNav items={navigationItems} isCollapsed={isCollapsed} onNavigate={handleNavigate} />
        </div>
        <UserMenu
          user={user}
          isCollapsed={isCollapsed}
          onToggleCollapse={toggleCollapse}
          onLogout={onLogout}
        />
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center justify-between px-4">
        <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">Plutus</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="lg:hidden"
        >
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Sidebar Drawer */}
      {isMobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileOpen(false)}
          />
          <aside className="lg:hidden fixed left-0 top-16 bottom-0 z-50 w-72 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 flex flex-col">
            <div className="flex-1 overflow-y-auto">
              <MainNav items={navigationItems} isCollapsed={false} onNavigate={handleNavigate} />
            </div>
            <UserMenu
              user={user}
              isCollapsed={false}
              onToggleCollapse={() => { }}
              onLogout={onLogout}
            />
          </aside>
        </>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto lg:ml-0 pt-16 lg:pt-0">
        {children}
      </main>
    </div>
  )
}

