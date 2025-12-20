import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";
import { MainNav, type NavigationItem } from "./MainNav";
import { UserMenu } from "./UserMenu";
import { cn } from "./utils";

export interface AppShellProps {
  children: React.ReactNode;
  navigationItems: NavigationItem[];
  user?: {
    name: string;
    avatarUrl?: string;
  };
  onNavigate?: (href: string) => void;
  onLogout?: () => void;
}

export function AppShell({
  children,
  navigationItems,
  user = { name: "User" },
  onNavigate,
  onLogout,
}: AppShellProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleNavigate = (href: string) => {
    onNavigate?.(href);
    setIsMobileOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-50 dark:bg-neutral-950">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden flex-col border-neutral-200 border-r bg-white transition-all duration-300 lg:flex dark:border-neutral-800 dark:bg-neutral-900",
          isCollapsed ? "w-16" : "w-72"
        )}
      >
        <div className="flex h-16 items-center border-neutral-200 border-b px-4 dark:border-neutral-800">
          {!isCollapsed && (
            <h1 className="font-bold text-neutral-900 text-xl dark:text-neutral-100">
              Plutus
            </h1>
          )}
          {isCollapsed && (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <span className="font-bold text-sm text-white">P</span>
            </div>
          )}
        </div>
        <div className="flex-1 overflow-y-auto">
          <MainNav
            isCollapsed={isCollapsed}
            items={navigationItems}
            onNavigate={handleNavigate}
          />
        </div>
        <UserMenu
          isCollapsed={isCollapsed}
          onLogout={onLogout}
          onToggleCollapse={toggleCollapse}
          user={user}
        />
      </aside>

      {/* Mobile Header */}
      <div className="fixed top-0 right-0 left-0 z-50 flex h-16 items-center justify-between border-neutral-200 border-b bg-white px-4 lg:hidden dark:border-neutral-800 dark:bg-neutral-900">
        <h1 className="font-bold text-neutral-900 text-xl dark:text-neutral-100">
          Plutus
        </h1>
        <Button
          className="lg:hidden"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          size="icon"
          variant="ghost"
        >
          {isMobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Sidebar Drawer */}
      {isMobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
          <aside className="fixed top-16 bottom-0 left-0 z-50 flex w-72 flex-col border-neutral-200 border-r bg-white lg:hidden dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex-1 overflow-y-auto">
              <MainNav
                isCollapsed={false}
                items={navigationItems}
                onNavigate={handleNavigate}
              />
            </div>
            <UserMenu
              isCollapsed={false}
              onLogout={onLogout}
              onToggleCollapse={() => {}}
              user={user}
            />
          </aside>
        </>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-16 lg:ml-0 lg:pt-0">
        {children}
      </main>
    </div>
  );
}
