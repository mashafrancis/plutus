import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import type { PerformanceDataPoint } from "../types";

interface PerformanceChartProps {
  data: PerformanceDataPoint[];
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  // Placeholder for line chart - would use a chart library like recharts or chart.js in production
  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-geist-sans font-semibold text-lg text-neutral-900 dark:text-neutral-100">
          Portfolio Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex h-64 items-end justify-between gap-1">
          {data.map((point, index) => {
            const height =
              range > 0 ? ((point.value - minValue) / range) * 100 : 50;
            return (
              <div
                className="group relative flex-1 rounded-t bg-blue-500 transition-colors hover:bg-blue-600"
                key={point.date}
                style={{ height: `${height}%` }}
              >
                <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-neutral-900 px-2 py-1 font-geist-mono text-white text-xs opacity-0 transition-opacity group-hover:opacity-100 dark:bg-neutral-100 dark:text-neutral-900">
                  {new Date(point.date).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                  <br />$
                  {point.value.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-center font-geist-sans text-neutral-500 text-xs dark:text-neutral-500">
          Chart placeholder - integrate chart library for line chart
          visualization
        </p>
      </CardContent>
    </Card>
  );
}
