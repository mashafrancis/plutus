import { redirect } from "@tanstack/react-router";

export function requireAuth(ctx: { context: { isAuthenticated: boolean } }) {
  if (!ctx.context.isAuthenticated) {
    throw redirect({ to: "/login" });
  }
}
