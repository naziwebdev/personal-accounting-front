"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ReportWeekly } from "@/types/report";

type WeeklyChartBarProps = { data: ReportWeekly[] | undefined };

export const WeeklyChartBar = ({ data }: WeeklyChartBarProps) => {
  const chartData = data ?? [];

  const dataKey = data?.some((item) => "totalIncome" in item)
    ? "totalIncome"
    : "totalExpense";

  const formatPersianNumber = (value: unknown) =>
    Number(value ?? 0).toLocaleString("fa-IR");

  const formatWeekLabel = (label: unknown) => {
    const text = String(label ?? "");
    const match = text.match(/\d+/);

    if (!match) {
      return `هفته: ${text}`;
    }

    const number = Number(match[0]);

    // If the label is a zero-based index, convert it to a week number.
    const weekNumber = /^\d+$/.test(text.trim()) ? number + 1 : number;

    return `هفته: ${formatPersianNumber(weekNumber)}`;
  };
  return (
    <div className="h-[300px] w-full min-w-0">
      {chartData.length === 0 ? (
        <p>No data available</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="week"
              tickFormatter={(value) => {
                const text = String(value);
                const match = text.match(/\d+/);

                if (!match) return text;

                const number = Number(match[0]);
                const weekNumber = /^\d+$/.test(text.trim())
                  ? number + 1
                  : number;

                return `هفته ${formatPersianNumber(weekNumber)}`;
              }}
            />

            <YAxis />

            <Tooltip
              labelFormatter={formatWeekLabel}
              formatter={(value) => formatPersianNumber(value)}
            />

            <Bar
              dataKey={dataKey}
              name={dataKey === "totalIncome" ? "جمع درآمد" : "جمع هزینه"}
              fill="var(--color-primary)"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
