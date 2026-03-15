import { redirect } from "@tanstack/react-router";

export function requirePublic(ctx: { context: { isAuthenticated: boolean } }) {
  if (ctx.context.isAuthenticated) {
    throw redirect({ to: "/dashboard" });
  }
}
