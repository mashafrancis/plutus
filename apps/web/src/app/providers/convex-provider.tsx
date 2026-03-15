import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import type { ConvexReactClient } from "convex/react";
import type { ReactNode } from "react";
import { authClient } from "@/shared/config/auth-client";

interface ConvexProviderProps {
  client: ConvexReactClient;
  initialToken: string | null;
  children: ReactNode;
}

export function ConvexProvider({
  client,
  initialToken,
  children,
}: ConvexProviderProps) {
  return (
    <ConvexBetterAuthProvider
      authClient={authClient}
      client={client}
      initialToken={initialToken}
    >
      {children}
    </ConvexBetterAuthProvider>
  );
}
