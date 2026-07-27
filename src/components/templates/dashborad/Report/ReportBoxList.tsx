"use client";
import React, { useEffect, useState } from "react";
import ReportBox from "./ReportBox";
import { useSearchParams } from "next/navigation";
import { useReports } from "@/hooks/useReports";
import { ReportBoxMonthly } from "@/types/report";

type YearReportType = {
  totalIncome: number;
  totalExpense: number;
  savings: number;
};

export default function ReportBoxList() {
  const [persianDate, setPersianDate] = useState({ year: "", month: "" });
  const [currentMonthReport, setCurrentMonthReport] =
    useState<ReportBoxMonthly>();
  const [currentYearReport, setCurrentYearReport] = useState<YearReportType>();

  const searchParams = useSearchParams();
  const year = Number(searchParams.get("year") ?? persianDate.year);

  const { data: reports } = useReports(year);

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

    setCurrentMonthReport(
      reports?.find((item) => item.month == persianDate.month)
    );

    const clcYearReportItem = reports?.reduce(
      (acc, item) => {
        acc.totalIncome += item.totalIncome;
        acc.totalExpense += item.totalExpense;
        acc.savings += item.savings;
        return acc;
      },
      { totalIncome: 0, totalExpense: 0, savings: 0 }
    );

    setCurrentYearReport(clcYearReportItem);
  }, [reports]);

  return (
    <div className="flex flex-wrap justify-center items-center gap-4">
      <ReportBox
        name={"درامد"}
        icon={"income-month"}
        price={currentMonthReport?.totalIncome}
        period={"ماهانه"}
      />
      <ReportBox
        name={"هزینه"}
        icon={"expense-month"}
        price={currentMonthReport?.totalExpense}
        period={"ماهانه"}
      />
      <ReportBox
        name={"مانده"}
        icon={"save-month"}
        price={currentMonthReport?.savings}
        period={"ماهانه"}
      />

      <ReportBox
        name={"درامد"}
        icon={"income-year"}
        price={currentYearReport?.totalIncome}
        period={"سالانه"}
      />
      <ReportBox
        name={"هزینه"}
        icon={"expense-year"}
        price={currentYearReport?.totalExpense}
        period={"سالانه"}
      />
      <ReportBox
        name={"مانده"}
        icon={"save-year"}
        price={currentYearReport?.savings}
        period={"سالانه"}
      />
    </div>
  );
}
