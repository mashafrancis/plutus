import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatter";
import type { PerformanceDataPoint } from "@/lib/types/investments";

interface PerformanceChartProps {
  data: PerformanceDataPoint[];
  currency?: string;
  locale?: string;
}

export function PerformanceChart({
  data,
  currency = "USD",
  locale = "en-US",
}: PerformanceChartProps) {
  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-geist-sans font-semibold text-lg text-neutral-900 dark:text-neutral-100">
            Portfolio Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="py-8 text-center font-geist-sans text-neutral-500 text-sm dark:text-neutral-400">
            No performance data available
          </p>
        </CardContent>
      </Card>
    );
  }

  const chartData = data.map((point) => ({
    date: new Date(point.date).toLocaleDateString(locale, {
      month: "short",
      day: "numeric",
    }),
    value: point.value,
  }));

  const formatTooltipValue = (value: number) =>
    formatCurrency({ value, currency, locale });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-geist-sans font-semibold text-lg text-neutral-900 dark:text-neutral-100">
          Portfolio Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer height={300} width="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis
              tickFormatter={(value) =>
                formatCurrency({
                  value,
                  currency,
                  locale,
                  maximumFractionDigits: 0,
                })
              }
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--background)",
                border: "1px solid var(--border)",
                borderRadius: "0.5rem",
              }}
              formatter={(value: number) => formatTooltipValue(value)}
            />
            <Line
              dataKey="value"
              dot={false}
              stroke="#3b82f6"
              strokeWidth={2}
              type="monotone"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
