import { type QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

interface QueryProviderProps {
  client: QueryClient;
  children: ReactNode;
}

export function QueryProvider({ client, children }: QueryProviderProps) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
