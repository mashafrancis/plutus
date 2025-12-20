import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import type { GainLossData } from "../types";
import { cn } from "./utils";

interface GainLossChartProps {
  data: GainLossData[];
}

export function GainLossChart({ data }: GainLossChartProps) {
  // Placeholder for bar chart - would use a chart library like recharts or chart.js in production
  const maxGain = Math.max(...data.map((d) => Math.abs(d.gainLossDollar)));
  const sortedData = [...data].sort(
    (a, b) => b.gainLossDollar - a.gainLossDollar
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-geist-sans font-semibold text-lg text-neutral-900 dark:text-neutral-100">
          Gain/Loss by Investment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-h-96 space-y-2 overflow-y-auto">
          {sortedData.slice(0, 10).map((item) => {
            const width =
              maxGain > 0 ? (Math.abs(item.gainLossDollar) / maxGain) * 100 : 0;
            const isPositive = item.gainLossDollar > 0;
            return (
              <div className="space-y-1" key={item.ticker}>
                <div className="flex items-center justify-between font-geist-sans text-xs">
                  <span className="flex-1 truncate font-medium text-neutral-900 dark:text-neutral-100">
                    {item.name}
                  </span>
                  <span
                    className={cn(
                      "ml-2 font-geist-mono",
                      isPositive
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-600 dark:text-red-400"
                    )}
                  >
                    {isPositive ? "+" : ""}$
                    {item.gainLossDollar.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
                  <div
                    className={cn(
                      "h-full transition-all",
                      isPositive ? "bg-emerald-500" : "bg-red-500"
                    )}
                    style={{ width: `${width}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-center font-geist-sans text-neutral-500 text-xs dark:text-neutral-500">
          Chart placeholder - integrate chart library for bar chart
          visualization
        </p>
      </CardContent>
    </Card>
  );
}
