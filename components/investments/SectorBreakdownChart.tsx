import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatter";
import type { SectorBreakdown } from "@/lib/types/investments";

interface SectorBreakdownChartProps {
  data: SectorBreakdown[];
  currency?: string;
  locale?: string;
}

const COLORS = [
  "#3b82f6", // blue-500
  "#0ea5e9", // sky-500
  "#10b981", // emerald-500
  "#f59e0b", // amber-500
  "#a855f7", // purple-500
  "#ec4899", // pink-500
  "#6366f1", // indigo-500
  "#f43f5e", // rose-500
  "#14b8a6", // teal-500
  "#f97316", // orange-500
];

export function SectorBreakdownChart({
  data,
  currency = "USD",
  locale = "en-US",
}: SectorBreakdownChartProps) {
  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-geist-sans font-semibold text-lg text-neutral-900 dark:text-neutral-100">
            Sector Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="py-8 text-center font-geist-sans text-neutral-500 text-sm dark:text-neutral-400">
            No sector data available
          </p>
        </CardContent>
      </Card>
    );
  }

  const chartData = data.map((item) => ({
    name: item.sector,
    value: item.value,
    percentage: item.percentage,
  }));

  const formatTooltipValue = (value: number) =>
    formatCurrency({ value, currency, locale });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-geist-sans font-semibold text-lg text-neutral-900 dark:text-neutral-100">
          Sector Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer height={300} width="100%">
          <PieChart>
            <Pie
              cx="50%"
              cy="50%"
              data={chartData}
              dataKey="value"
              label={({ name, percentage }) =>
                `${name}: ${percentage.toFixed(1)}%`
              }
              labelLine={false}
              outerRadius={80}
            >
              {chartData.map((_entry, index) => (
                <Cell
                  fill={COLORS[index % COLORS.length]}
                  key={`cell-${index}`}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--background)",
                border: "1px solid var(--border)",
                borderRadius: "0.5rem",
              }}
              formatter={(value: number) => formatTooltipValue(value)}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
