"use client";
import React, { useEffect, useState } from "react";
import ReportBox from "./ReportBox";
import { useSearchParams } from "next/navigation";
import { useReports } from "@/hooks/useReports";
import { ReportBoxMonthly } from "@/types/report";

export default function ReportBoxList() {
  const [persianDate, setPersianDate] = useState({ year: "", month: "" });
  const [currentMonthReport, setCurrentMonthReport] =
    useState<ReportBoxMonthly>();

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
        price={currentMonthReport?.totalExpense}
        period={"ماهانه"}
      />

      <ReportBox
        name={"درامد"}
        icon={"income-year"}
        price={100000}
        period={"سالانه"}
      />
      <ReportBox
        name={"هزینه"}
        icon={"expense-year"}
        price={100000}
        period={"سالانه"}
      />
      <ReportBox
        name={"مانده"}
        icon={"save-year"}
        price={100000}
        period={"سالانه"}
      />
    </div>
  );
}
