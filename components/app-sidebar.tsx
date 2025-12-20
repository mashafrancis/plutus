"use client";

import {
  ArrowDownCircle,
  ArrowUpCircle,
  LayoutDashboard,
  RefreshCw,
  Settings,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import posthog from "posthog-js";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { signOut } from "@/lib/auth-client";

const logoImage = "/logo.svg";

interface AppSidebarProps {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}

const navigationItems = [
  {
    label: "Overview",
    href: "/overview",
    icon: LayoutDashboard,
  },
  {
    label: "Expenses",
    href: "/expenses",
    icon: ArrowDownCircle,
  },
  {
    label: "Income",
    href: "/income",
    icon: ArrowUpCircle,
  },
  {
    label: "Subscriptions",
    href: "/subscriptions",
    icon: RefreshCw,
  },
  {
    label: "Investments",
    href: "/investments",
    icon: TrendingUp,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function AppSidebar({ user }: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    signOut({
      fetchOptions: {
        onSuccess: () => {
          posthog.capture("Logout");
          router.push("/");
        },
      },
    });
  };

  function getInitials(name: string): string {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <Link href="/overview" prefetch>
                <Image
                  alt="Plutus"
                  className="flex aspect-square size-8 items-center justify-center rounded-lg"
                  height={32}
                  src={logoImage}
                  width={32}
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Plutus</span>
                  <span className="truncate text-muted-foreground text-xs">
                    Personal finances
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (pathname?.startsWith(item.href) &&
                    item.href !== "/overview");

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                    >
                      <Link href={item.href} prefetch>
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2 px-2 py-1.5">
              <Avatar className="h-8 w-8">
                <AvatarImage alt={user.name} src={user.avatar} />
                <AvatarFallback className="bg-blue-100 font-medium text-blue-700 text-xs dark:bg-blue-900 dark:text-blue-300">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-muted-foreground text-xs">
                  {user.email}
                </span>
              </div>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              tooltip="Log out"
              variant="outline"
            >
              <span>Log out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
