import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import type { AllocationData } from "../types";
import { cn } from "./utils";

interface AllocationChartProps {
  data: AllocationData[];
}

export function AllocationChart({ data }: AllocationChartProps) {
  // Placeholder for pie/donut chart - would use a chart library like recharts or chart.js in production
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const colors = [
    "bg-blue-500",
    "bg-sky-500",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-geist-sans font-semibold text-lg text-neutral-900 dark:text-neutral-100">
          Asset Allocation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            return (
              <div className="space-y-1" key={item.type}>
                <div className="flex items-center justify-between font-geist-sans text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "h-3 w-3 rounded-full",
                        colors[index % colors.length]
                      )}
                    />
                    <span className="font-medium text-neutral-900 capitalize dark:text-neutral-100">
                      {item.type.replace("-", " ")}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-geist-mono text-neutral-600 dark:text-neutral-400">
                      $
                      {item.value.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                    <span className="w-12 text-right font-geist-mono text-neutral-500 dark:text-neutral-500">
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
                  <div
                    className={cn(
                      "h-full transition-all",
                      colors[index % colors.length]
                    )}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-center font-geist-sans text-neutral-500 text-xs dark:text-neutral-500">
          Chart placeholder - integrate chart library for pie/donut
          visualization
        </p>
      </CardContent>
    </Card>
  );
}
