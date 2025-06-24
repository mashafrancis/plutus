"use client";

import { Home, Inbox, LifeBuoy, Search, Send, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ComponentProps } from "react";
import { authClient } from "@/auth/client";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const logoImage = "/logo.svg";

const data = {
  navMain: [
    {
      title: "Overview",
      url: "#",
      icon: Search,
    },
    {
      title: "Expenses",
      url: "#",
      icon: Sparkles,
    },
    {
      title: "Income",
      url: "#",
      icon: Home,
      isActive: true,
    },
    {
      title: "Investments",
      url: "#",
      icon: Inbox,
      badge: "10",
    },
    {
      title: "Subscriptions",
      url: "#",
      icon: Inbox,
      badge: "10",
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const { data: session, isPending, error, refetch } = authClient.useSession();

  const user = {
    name: session?.user.name as string,
    email: session?.user?.email as string,
    avatar: session?.user?.image as string,
  };

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link prefetch href="/">
                <Image
                  src={logoImage}
                  alt="Safaricom"
                  width={22}
                  height={22}
                  className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground"
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Plutus</span>
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
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {!session ? "No user" : <NavUser user={user} />}
      </SidebarFooter>
    </Sidebar>
  );
}
