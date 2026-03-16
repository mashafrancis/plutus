import { Databuddy } from "@databuddy/sdk/react";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  useRouteContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { createServerFn } from "@tanstack/react-start";
import { ConvexProvider } from "@/app/providers/convex-provider";
import { IconProvider } from "@/app/providers/icon-provider";
import { QueryProvider } from "@/app/providers/query-provider";
import appCss from "@/app/styles/index.css?url";
import type { RouterAppContext } from "@/app/types/router-app-context";
import { Toaster } from "@/components/ui/sonner";
import { op } from "@/lib/op";
import { getToken } from "@/shared/config/auth-server";
import {useEffect} from "react";
import * as Sentry from "@sentry/tanstackstart-react";

const databuddyId = import.meta.env.VITE_DATABUDDY_CLIENT_ID;

if (import.meta.env.VITE_OP_CLIENT_ID) {
  op.init();
}

const getAuth = createServerFn({ method: "GET" }).handler(async () => {
  return await getToken();
});

const AUTH_BOOTSTRAP_RETRY_ATTEMPTS = 3;
const AUTH_BOOTSTRAP_RETRY_DELAY_MS = 400;

function isAuthBootstrapNetworkError(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  const errorCode = "code" in error ? String((error as { code?: string }).code ?? "") : "";
  const message = error.message.toLowerCase();

  if (
    message.includes("fetch failed") ||
    message.includes("failed to fetch") ||
    message.includes("networkerror") ||
    errorCode === "ECONNREFUSED" ||
    errorCode === "ECONNRESET" ||
    errorCode === "ENOTFOUND" ||
    errorCode === "ETIMEDOUT"
  ) {
    return true;
  }

  return isAuthBootstrapNetworkError(error.cause);
}

async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function loadAuthTokenSafely(): Promise<string | null> {
  for (let attempt = 1; attempt <= AUTH_BOOTSTRAP_RETRY_ATTEMPTS; attempt++) {
    try {
      return (await getAuth()) ?? null;
    } catch (error) {
      const shouldRetry =
        isAuthBootstrapNetworkError(error) && attempt < AUTH_BOOTSTRAP_RETRY_ATTEMPTS;

      if (shouldRetry) {
        await sleep(AUTH_BOOTSTRAP_RETRY_DELAY_MS * attempt);
        continue;
      }

      if (isAuthBootstrapNetworkError(error)) {
        console.warn(
          "[auth] Falling back to unauthenticated startup after transient fetch failure.",
          error,
        );
        return null;
      }

      throw error;
    }
  }

  return null;
}

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
    const token = await loadAuthTokenSafely();
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
      Sentry.captureException(error)
    }, [error])

    return (
      <div>{`Error occurred: ${error.message}`}</div>
    )
  }
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
                trackScrollDepth={true}
                trackWebVitals={true}
              />
              <TanStackRouterDevtools position="bottom-left" />
              <Scripts />
            </IconProvider>
          </body>
        </html>
      </QueryProvider>
    </ConvexProvider>
  );
}
