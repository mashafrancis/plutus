import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investments",
  description: "Track your investments",
};

export default function InvestmentsPage() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h1 className="mb-4 font-bold text-3xl">Investments</h1>
      <p className="text-muted-foreground">Coming soon...</p>
    </div>
  );
}
