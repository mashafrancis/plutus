import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscriptions",
  description: "Manage your subscriptions",
};

export default function SubscriptionsPage() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h1 className="mb-4 font-bold text-3xl">Subscriptions</h1>
      <p className="text-muted-foreground">Coming soon...</p>
    </div>
  );
}
