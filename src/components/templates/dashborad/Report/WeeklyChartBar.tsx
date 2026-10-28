"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import type { LabelProps } from "recharts";
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

  const totalPrice =
    data?.reduce((sum, item) => {
      return sum + Number(item[dataKey] ?? 0);
    }, 0) ?? 0;
  // Custom Y-axis tick
  const renderYAxisTick = (props: {
    x?: number;
    y?: number;
    payload?: { value: number };
  }) => {
    const { x = 0, y = 0, payload } = props;

    return (
      <text
        x={x - 8}
        y={y}
        textAnchor="end"
        dominantBaseline="middle"
        fill="#222"
        fontSize={16}
        style={{ direction: "ltr" }}
      >
        {formatPersianNumber(payload?.value)}
      </text>
    );
  };

  // Custom price label
  const renderPriceLabel = (props: LabelProps) => {
    const { x, y, width, value } = props;

    if (
      typeof x !== "number" ||
      typeof y !== "number" ||
      typeof width !== "number" ||
      value == null
    ) {
      return null;
    }

    const label = formatPersianNumber(value);
    const labelWidth = 110;
    const labelHeight = 28;

    const centerX = x + width / 2;
    const labelY = y - labelHeight - 8;

    return (
      <g>
        <rect
          x={centerX - labelWidth / 2}
          y={labelY}
          width={labelWidth}
          height={labelHeight}
          rx={8}
          fill="#000"
          stroke="#000"
          strokeWidth={1}
        />

        <text
          x={centerX}
          y={labelY + labelHeight / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#fff"
          fontSize={12}
          fontWeight={600}
        >
          {label} تومان
        </text>
      </g>
    );
  };

  return (
    <div className="h-[310px] w-full min-w-0 pb-4 ">
      <div className="flex flex-col gap-y-3.5">
        <p className="text-xl text-zinc-600">
          مجموع {dataKey === "totalIncome" ? " درامد" : "هزینه "} ماه
        </p>
        <p className="text-2xl pr-10">
          {totalPrice.toLocaleString("fa-IR")} تومان
        </p>
      </div>
      {chartData.length === 0 ? (
        <p>No data available</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 35,
              right: 10,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid horizontal={false} vertical={false} />

            <XAxis
              dataKey="week"
              tick={{ fill: "#222", fontSize: 15 }}
              tickMargin={10}
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

            <YAxis
              tick={renderYAxisTick}
              tickFormatter={(value) => formatPersianNumber(value)}
              orientation="left"
              width={100}
              domain={[0, (max: number) => max * 1.15]}
            />

            <Tooltip
              labelFormatter={formatWeekLabel}
              formatter={(value) => formatPersianNumber(value)}
            />

            <Bar
              dataKey={dataKey}
              name={dataKey === "totalIncome" ? "جمع درآمد" : "جمع هزینه"}
              fill={
                dataKey === "totalIncome"
                  ? "var(--color-primary)"
                  : "var(--color-secondary)"
              }
              radius={[10, 10, 0, 0]}
              barSize={60}
            >
              <LabelList content={renderPriceLabel} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
