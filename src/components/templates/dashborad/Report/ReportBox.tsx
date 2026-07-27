import React from "react";
import { IconReportYear } from "@/components/icons/reports/IconReportYear";
import { IconReportIncome } from "@/components/icons/reports/IconReportIncome";
import { IconReportExpense } from "@/components/icons/reports/IconReportExpense";
import { IconReportSave } from "@/components/icons/reports/IconReportSave";
type reportBoxDetails = {
  name: string;
  icon: string;
  price: number;
  period: string;
};

export default function ReportBox({
  name,
  icon,
  price,
  period,
}: reportBoxDetails) {
  return (
    <div className="w-[220px] bg-white rounded-xl p-4 shadow-lg border-[1px] border-zinc-300">
      <div className="flex justify-between items-center gap-x-16 pb-2.5 border-b-2 border-dotted border-b-zinc-200 ">
        <div className="flex items-center gap-x-1.5">
          {icon === "income-month" ? (
            <IconReportIncome size="w-11 h-10" color="#06b11a" />
          ) : icon === "expense-month" ? (
            <IconReportExpense size="w-11 h-10" color="#f51467" />
          ) : icon === "save-month" ? (
            <IconReportSave size="w-11 h-10" color="#7b57c1" />
          ) : icon === "income-year" ? (
            <IconReportYear
              size="w-10 h-10"
              color="#06b11a"
              shadowColor="#036328"
            />
          ) : icon === "expense-year" ? (
            <IconReportYear
              size="w-10 h-10"
              color="#f51467"
              shadowColor="#AD1457"
            />
          ) : icon === "save-year" ? (
            <IconReportYear
              size="w-10 h-10"
              color="#7b57c1"
              shadowColor="#311B92"
            />
          ) : null}
          <p className="text-sm xs:text-base">{name}</p>
        </div>
        <p className="text-sm xs:text-base">{period}</p>
      </div>
      <div className="flex justify-between items-center pt-2.5 text-sm xs:text-base">
        <p
          className={`font-bold text-base xs:text-lg ${
            name === "درامد"
              ? "text-[#06b11a]"
              : name === "هزینه"
              ? "text-[#f51467]"
              : name === "پس انداز"
              ? "text-[#7b57c1]"
              : ""
          }`}
        >
          {price}
        </p>
        <p>تومان</p>
      </div>
    </div>
  );
}
