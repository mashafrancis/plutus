import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatter";
import type { GainLossData } from "@/lib/types/investments";

interface GainLossChartProps {
  data: GainLossData[];
  currency?: string;
  locale?: string;
}

export function GainLossChart({
  data,
  currency = "USD",
  locale = "en-US",
}: GainLossChartProps) {
  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-geist-sans font-semibold text-lg text-neutral-900 dark:text-neutral-100">
            Gain/Loss by Investment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="py-8 text-center font-geist-sans text-neutral-500 text-sm dark:text-neutral-400">
            No gain/loss data available
          </p>
        </CardContent>
      </Card>
    );
  }

  const sortedData = [...data]
    .sort((a, b) => b.gainLossDollar - a.gainLossDollar)
    .slice(0, 10)
    .map((item) => ({
      name:
        item.name.length > 15 ? `${item.name.substring(0, 15)}...` : item.name,
      value: item.gainLossDollar,
      ticker: item.ticker,
    }));

  const formatTooltipValue = (value: number) =>
    formatCurrency({ value, currency, locale });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-geist-sans font-semibold text-lg text-neutral-900 dark:text-neutral-100">
          Gain/Loss by Investment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer height={300} width="100%">
          <BarChart data={sortedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis angle={-45} dataKey="name" height={80} textAnchor="end" />
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
            <Bar dataKey="value">
              {sortedData.map((entry, index) => (
                <Cell
                  fill={entry.value >= 0 ? "#10b981" : "#ef4444"}
                  key={`cell-${index}`}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
