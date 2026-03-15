import { createFileRoute } from "@tanstack/react-router";

import { handler } from "@/shared/config/auth-server";

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: ({ request }) => handler(request),
      POST: ({ request }) => handler(request),
    },
  },
});
