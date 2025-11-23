"use client";

import posthog from "posthog-js";
import type { ReactNode } from "react";
import { useEffect } from "react";

type PostHogProviderProps = {
  children: ReactNode;
};

let posthogInitialized = false;

export function PostHogProvider({ children }: PostHogProviderProps) {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      process.env.NEXT_PUBLIC_POSTHOG_KEY &&
      !posthogInitialized
    ) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: "/ingest",
        ui_host: "https://us.posthog.com",
        capture_pageview: "history_change",
        capture_pageleave: true,
        capture_exceptions: true,
        person_profiles: "always",
      });
      posthogInitialized = true;
    }
  }, []);

  return <>{children}</>;
}
