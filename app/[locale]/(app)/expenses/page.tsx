import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expenses",
  description: "Track and manage your expenses",
};

export default function ExpensesPage() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h1 className="mb-4 font-bold text-3xl">Expenses</h1>
      <p className="text-muted-foreground">Coming soon...</p>
    </div>
  );
}
