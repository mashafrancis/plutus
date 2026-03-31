import { ConvexQueryClient } from "@convex-dev/react-query";
import * as Sentry from "@sentry/tanstackstart-react";
import { env } from "@tanstack-effect-convex/env/web";
import { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";

import { Loading } from "@/components/ui/loading";

import { routeTree } from "./routeTree.gen";

export function getRouter() {
  const convexUrl = env.VITE_CONVEX_URL;
  if (!convexUrl) {
    throw new Error("VITE_CONVEX_URL is not set");
  }

  const convexQueryClient = new ConvexQueryClient(convexUrl);

  const queryClient: QueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        queryKeyHashFn: convexQueryClient.hashFn(),
        queryFn: convexQueryClient.queryFn(),
        staleTime: 5 * 60 * 1000, // 5 minutes default
      },
    },
  });
  convexQueryClient.connect(queryClient);

  const router = createTanStackRouter({
    routeTree,
    defaultPreload: "intent",
    defaultPendingMs: 0,
    defaultPendingMinMs: 50,
    defaultPendingComponent: () => <Loading />,
    defaultNotFoundComponent: () => <div>Not Found</div>,
    context: { queryClient, convexQueryClient },
  });

  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  });

  if (!router.isServer) {
    Sentry.init({
      enabled: router.isServer,
      dsn: "https://cffb9ca2b0b24bb1bef9ca6d4a038571@o319034.ingest.us.sentry.io/1807584",
      // Adds request headers and IP for users, for more info visit:
      // https://docs.sentry.io/platforms/javascript/guides/tanstackstart-react/configuration/options/#sendDefaultPii
      sendDefaultPii: true,
      integrations: [
        Sentry.tanstackRouterBrowserTracingIntegration(router),
        Sentry.replayIntegration(),
        Sentry.feedbackIntegration({
          // Additional SDK configuration goes in here, for example:
          colorScheme: "system",
        }),
      ],
      // Enable logs to be sent to Sentry
      enableLogs: true,
      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for tracing.
      // We recommend adjusting this value in production.
      // Learn more at https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
      tracesSampleRate: 1.0,
      // Capture Replay for 10% of all sessions,
      // plus for 100% of sessions with an error.
      // Learn more at https://docs.sentry.io/platforms/javascript/session-replay/configuration/#general-integration-configuration
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
    });
  }

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
