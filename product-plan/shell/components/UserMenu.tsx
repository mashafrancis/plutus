import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { cn } from "./utils";

interface UserMenuProps {
  user: {
    name: string;
    avatarUrl?: string;
  };
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onLogout?: () => void;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function UserMenu({
  user,
  isCollapsed,
  onToggleCollapse,
  onLogout,
}: UserMenuProps) {
  const initials = getInitials(user.name);

  return (
    <div
      className={cn(
        "border-neutral-200 border-t p-2 dark:border-neutral-800",
        isCollapsed && "px-2"
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3 px-2 py-2",
          isCollapsed && "justify-center"
        )}
      >
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarImage alt={user.name} src={user.avatarUrl} />
          <AvatarFallback className="bg-blue-100 font-medium text-blue-700 text-xs dark:bg-blue-900 dark:text-blue-300">
            {initials}
          </AvatarFallback>
        </Avatar>
        {!isCollapsed && (
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-neutral-900 text-sm dark:text-neutral-100">
              {user.name}
            </p>
          </div>
        )}
      </div>
      <div
        className={cn(
          "flex items-center gap-1 px-2",
          isCollapsed && "justify-center"
        )}
      >
        <Button
          className={cn(
            "h-8 w-full justify-start text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100",
            isCollapsed && "w-auto justify-center"
          )}
          onClick={onToggleCollapse}
          size="sm"
          title={
            isCollapsed ? (isCollapsed ? "Expand" : "Collapse") : undefined
          }
          variant="ghost"
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
            className="h-8 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
            onClick={onLogout}
            size="sm"
            variant="ghost"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
