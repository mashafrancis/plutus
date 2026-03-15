import type { ConvexQueryClient } from "@convex-dev/react-query";
import type { QueryClient } from "@tanstack/react-query";

export interface RouterAppContext {
  queryClient: QueryClient;
  convexQueryClient: ConvexQueryClient;
}
