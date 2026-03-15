import { createFileRoute } from "@tanstack/react-router";

import { LoginPage } from "@/pages/login/ui/login-page";
import { requirePublic } from "@/shared/lib/auth/require-public";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  beforeLoad: requirePublic,
});
