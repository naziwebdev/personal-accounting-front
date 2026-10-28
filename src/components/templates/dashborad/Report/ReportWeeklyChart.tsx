"use client";
import React, { useEffect, useState } from "react";
import CustomSelectBox from "./CustomSelectBox";
import { useSearchParams } from "next/navigation";
import { useReportsWeekly } from "@/hooks/useReportsWeekly";
import { WeeklyChartBar } from "./WeeklyChartBar";

type SwitchBtn = "income" | "expense";
type CurrentDateType = { year: string; month: string };

export default function ReportWeeklyChart() {
  const [switchBtnReportType, setSwitchBtnReportType] =
    useState<SwitchBtn>("income");

  console.log(switchBtnReportType);

  const [persianDate, setPersianDate] = useState<CurrentDateType>({
    year: "",
    month: "",
  });

  const [monthSelectedWeeklyChart, setMonthSelectedWeeklyChart] =
    useState<string>("");

  const searchParams = useSearchParams();
  const year = Number(searchParams.get("year") ?? persianDate.year);
  const month = Number(searchParams.get("month") ?? monthSelectedWeeklyChart);

  const { data: reportsWeekly } = useReportsWeekly(
    switchBtnReportType,
    year,
    month
  );

  //get current month & year (persain date)
  useEffect(() => {
    const now = new Date();

    const formatter = new Intl.DateTimeFormat("en-US-u-ca-persian", {
      year: "numeric",
      month: "numeric",
    });

    const parts = formatter.formatToParts(now);

    const year = parts.find((p) => p.type === "year")!.value;
    const month = parts.find((p) => p.type === "month")!.value.padStart(2, "0");

    setPersianDate({ year, month });
    setMonthSelectedWeeklyChart(month);
  }, [switchBtnReportType]);

  return (
    <div className="flex flex-col items-center mt-12">
      <div className="flex gap-x-6">
        <div className="text-sm xs:text-base w-[130px] flex items-center bg-white rounded-4xl shadow-sm shadow-zinc-300/50">
          <button
            onClick={() => setSwitchBtnReportType("income")}
            className={`cursor-pointer py-2 w-1/2  rounded-full ${
              switchBtnReportType === "income"
                ? "bg-[var(--color-primary)] text-white"
                : ""
            }`}
          >
            درامد
          </button>
          <button
            onClick={() => setSwitchBtnReportType("expense")}
            className={` cursor-pointer py-2 flex-1 rounded-full ${
              switchBtnReportType === "expense"
                ? "bg-[var(--color-secondary)] text-white"
                : ""
            }`}
          >
            هزینه
          </button>
        </div>
        <div className="relative flex gap-x-2 lg:gap-x-4 items-center">
          <CustomSelectBox
            monthSelected={monthSelectedWeeklyChart}
            setMonthSelected={setMonthSelectedWeeklyChart}
          />
        </div>
      </div>
      <div className="w-4/5 h-[400px] mt-8 bg-white p-4 rounded-xl shadow-xl">
        <WeeklyChartBar data={reportsWeekly} />
      </div>
    </div>
  );
}
