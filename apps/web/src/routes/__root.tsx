import { Databuddy } from "@databuddy/sdk/react";
import * as Sentry from "@sentry/tanstackstart-react";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  useRouteContext,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { lazy, Suspense, useEffect } from "react";

import { ConvexProvider } from "@/app/providers/convex-provider";
import { IconProvider } from "@/app/providers/icon-provider";
import { QueryProvider } from "@/app/providers/query-provider";
import type { RouterAppContext } from "@/app/types/router-app-context";
import { Toaster } from "@/components/ui/sonner";
import { op } from "@/lib/op";
import { getToken } from "@/shared/config/auth-server";
import { loadAuthTokenSafely } from "@/shared/lib/auth-bootstrap";

import appCss from "@/app/styles/index.css?url";

// The devtools package touches `window` while its module body is evaluated, so it must
// never be imported on the server - resolving it here keeps it out of the SSR bundle.
const TanStackRouterDevtools =
  import.meta.env.DEV && typeof window !== "undefined"
    ? lazy(async () => {
        const mod = await import("@tanstack/react-router-devtools");

        return { default: mod.TanStackRouterDevtools };
      })
    : null;

const databuddyId = import.meta.env.VITE_DATABUDDY_CLIENT_ID;

if (import.meta.env.VITE_OP_CLIENT_ID) {
  op.init();
}

const getAuth = createServerFn({ method: "GET" }).handler(async () => {
  return await getToken();
});

// Re-export for other routes that may need it
export type { RouterAppContext } from "@/app/types/router-app-context";

export const Route = createRootRouteWithContext<RouterAppContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Plutus - Personal Finance",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        href: "/favicon-16x16.png",
        rel: "icon",
        sizes: "16x16",
        type: "image/png",
      },
      {
        href: "/favicon-32x32.png",
        rel: "icon",
        sizes: "32x32",
        type: "image/png",
      },
      { href: "/favicon.ico", rel: "shortcut icon" },
      {
        href: "/apple-touch-icon.png",
        rel: "apple-touch-icon",
        sizes: "180x180",
      },
      {
        href: "/favicon.ico",
        rel: "icon",
      },
    ],
  }),

  component: RootDocument,
  beforeLoad: async (ctx) => {
    const token = await loadAuthTokenSafely(getAuth, {
      // The bound keeps a stalled auth fetch from 504-ing every route; reporting the
      // terminal failure keeps the resulting unauthenticated degradation visible.
      onTerminalError: (error) => Sentry.captureException(error),
    });
    if (token) {
      ctx.context.convexQueryClient.serverHttpClient?.setAuth(token);
    }
    return {
      isAuthenticated: !!token,
      token,
    };
  },
  errorComponent: ({ error }) => {
    useEffect(() => {
      Sentry.captureException(error);
    }, [error]);

    return <div>{`Error occurred: ${error instanceof Error ? error.message : String(error)}`}</div>;
  },
});

function RootDocument() {
  const context = useRouteContext({ from: Route.id });

  return (
    <ConvexProvider
      client={context.convexQueryClient.convexClient}
      initialToken={context.token ?? null}
    >
      <QueryProvider client={context.queryClient}>
        <html lang="en">
          <head>
            <HeadContent />
          </head>
          <body>
            <IconProvider>
              <Outlet />
              <Toaster richColors />
              <Databuddy
                clientId={databuddyId}
                enableBatching={true}
                trackAttributes={true}
                // trackBounceRate={true}
                // trackEngagement={true}
                trackErrors={true}
                // trackExitIntent={true}
                trackHashChanges={true}
                trackInteractions={true}
                trackOutgoingLinks={true}
                trackWebVitals={true}
              />
              {TanStackRouterDevtools ? (
                <Suspense fallback={null}>
                  <TanStackRouterDevtools position="bottom-left" />
                </Suspense>
              ) : null}
              <Scripts />
            </IconProvider>
          </body>
        </html>
      </QueryProvider>
    </ConvexProvider>
  );
}
