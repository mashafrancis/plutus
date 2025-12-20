import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getQueryClient, trpc } from "@/trpc/server";

export default async function Layout({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();
  const user = await queryClient.fetchQuery(trpc.users.me.queryOptions());

  if (!user) {
    redirect("/login");
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar
          user={{
            name: user.name ?? "User",
            email: user.email ?? "",
            avatar: user.image ?? "",
          }}
        />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
