import { createFileRoute } from "@tanstack/react-router";

import {
  SettingsPage,
  SettingsPageSkeleton,
} from "@/pages/settings/ui/settings-page";

export const Route = createFileRoute("/_authenticated/settings")({
  component: SettingsPage,
  pendingComponent: SettingsPageSkeleton,
});
