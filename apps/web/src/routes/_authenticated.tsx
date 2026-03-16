import { createFileRoute, Outlet } from "@tanstack/react-router";
import { api } from "@tanstack-effect-convex/backend/convex/_generated/api";
import { useMutation } from "convex/react";
import { useEffect } from "react";
import { requireAuth } from "@/shared/lib/auth/require-auth";

import { Navbar } from "@/widgets/navbar/ui/navbar";
import { Sidebar } from "@/widgets/sidebar/ui/sidebar";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: requireAuth,
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const initializeBaseCurrencyFromLocale = useMutation(
    api.userSettings.initializeBaseCurrencyFromLocale,
  );

  useEffect(() => {
    const locale = navigator.language;
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    void initializeBaseCurrencyFromLocale({ locale, timeZone });
  }, [initializeBaseCurrencyFromLocale]);

  return (
    <div className="flex h-svh bg-muted/20">
      <Sidebar />
      <main className="flex flex-1 flex-col overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
