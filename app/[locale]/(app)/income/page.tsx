import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Income",
  description: "Track and manage your income",
};

export default function IncomePage() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h1 className="mb-4 font-bold text-3xl">Income</h1>
      <p className="text-muted-foreground">Coming soon...</p>
    </div>
  );
}
