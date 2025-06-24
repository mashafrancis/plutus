'use client';

import type { QueryClient } from '@tanstack/react-query';
import { isServer, QueryClientProvider } from '@tanstack/react-query';
import {
  createTRPCClient,
  httpBatchStreamLink,
  loggerLink,
} from '@trpc/client';
import { createTRPCContext } from '@trpc/tanstack-react-query';
import { type ReactNode, useState } from 'react';
import SuperJSON from 'superjson';

import { env } from '@/env';
import type { AppRouter } from '@/server/api/root';
import { createQueryClient } from './query-client';

let browserQueryClient: QueryClient;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return createQueryClient();
  }

  // Browser: make a new query client if we don't already have one
  // This is very important, so we don't re-make a new client if React
  // suspends during the initial render. This may not be needed if we
  // have a suspense boundary BELOW the creation of the query client
  if (!browserQueryClient) browserQueryClient = createQueryClient();

  return browserQueryClient;
}

export const { useTRPC, TRPCProvider } = createTRPCContext<AppRouter>();

export function TRPCReactProvider(props: { children: ReactNode }) {
  const queryClient = getQueryClient();

  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        loggerLink({
          enabled: (op) =>
            env.NODE_ENV === 'development' ||
            (op.direction === 'down' && op.result instanceof Error),
        }),
        httpBatchStreamLink({
          transformer: SuperJSON,
          url: `${getBaseUrl()}/api/trpc`,
          headers() {
            const headers = new Headers();
            headers.set('x-trpc-source', 'nextjs-react');
            return headers;
          },
        }),
      ],
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider queryClient={queryClient} trpcClient={trpcClient}>
        {props.children}
      </TRPCProvider>
    </QueryClientProvider>
  );
}

const getBaseUrl = () => {
  if (!isServer) return window.location.origin;
  if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
};
