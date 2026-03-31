import {
  ChartLineUpIcon,
  CreditCardIcon,
  GearIcon,
  ListIcon,
  ReceiptIcon,
  SignOutIcon,
  TargetIcon,
  TrendUpIcon,
  WalletIcon,
  XIcon,
} from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { Authenticated } from "convex/react";
import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useCurrentUser } from "@/entities/user/api/use-current-user";
import { authClient } from "@/shared/config/auth-client";

const navLinks = [
  { to: "/dashboard", label: "Dashboard", icon: ChartLineUpIcon },
  { to: "/transactions", label: "Transactions", icon: ReceiptIcon },
  { to: "/accounts", label: "Accounts", icon: CreditCardIcon },
  { to: "/subscriptions", label: "Subscriptions", icon: CreditCardIcon },
  { to: "/investments", label: "Investments", icon: TrendUpIcon },
  { to: "/goals", label: "Goals", icon: TargetIcon },
] as const;

const bottomLinks = [{ to: "/settings", label: "Settings", icon: GearIcon }] as const;

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile header */}
      <div className="fixed top-0 right-0 left-0 z-50 flex h-14 items-center border-b bg-sidebar px-4 lg:hidden">
        <Button
          aria-label="Open navigation menu"
          className="mr-2"
          onClick={() => setMobileOpen(true)}
          size="icon"
          variant="ghost"
        >
          <ListIcon aria-hidden weight="bold" />
        </Button>
        <Link className="flex items-center gap-2 font-semibold" to="/">
          <WalletIcon className="h-6 w-6 text-primary" />
          <span className="text-lg">Plutus</span>
        </Link>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          aria-label="Close navigation menu"
          className="fixed inset-0 z-50 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setMobileOpen(false)}
          type="button"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 flex h-svh w-56 flex-col border-r bg-sidebar transition-transform duration-200 lg:relative lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button for mobile */}
        <div className="absolute top-3 right-3 lg:hidden">
          <Button
            aria-label="Close navigation menu"
            onClick={() => setMobileOpen(false)}
            size="icon"
            variant="ghost"
          >
            <XIcon aria-hidden weight="bold" />
          </Button>
        </div>

        {/* Logo */}
        <div className="flex h-14 items-center gap-2 px-4">
          <WalletIcon className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">Plutus</span>
        </div>

        <Separator />

        {/* Main navigation */}
        <Authenticated>
          <nav className="flex flex-1 flex-col gap-1 p-2">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                className="flex min-h-10 items-center gap-3 rounded-md px-3 py-2 font-medium text-sidebar-foreground/70 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground [&.active]:bg-primary/10 [&.active]:text-primary"
                key={to}
                onClick={() => setMobileOpen(false)}
                to={to}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-auto">
            <Separator />

            {/* Bottom links */}
            <div className="flex flex-col gap-1 p-2">
              {bottomLinks.map(({ to, label, icon: Icon }) => (
                <Link
                  className="flex min-h-10 items-center gap-3 rounded-md px-3 py-2 font-medium text-sidebar-foreground/70 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground [&.active]:bg-primary/10 [&.active]:text-primary"
                  key={to}
                  onClick={() => setMobileOpen(false)}
                  to={to}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>

            <Separator />

            {/* User profile */}
            <SidebarUser />
          </div>
        </Authenticated>
      </aside>

      {/* Spacer for mobile header */}
      <div className="h-14 lg:hidden" />
    </>
  );
}

function SidebarUser() {
  const { data: user } = useCurrentUser();

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <div className="p-2">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <button
            className="flex min-h-11 w-full items-center gap-2 rounded-md p-2 text-left transition-colors hover:bg-sidebar-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
            type="button"
          >
            <Avatar className="size-8 bg-primary text-primary-foreground">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="truncate font-medium text-sm">{user?.name}</p>
              <p className="truncate text-muted-foreground text-xs">{user?.email}</p>
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      location.reload();
                    },
                  },
                });
              }}
              variant="destructive"
            >
              <SignOutIcon className="mr-2" weight="bold" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
