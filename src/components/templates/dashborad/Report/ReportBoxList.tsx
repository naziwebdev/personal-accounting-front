import React from "react";
import ReportBox from "./ReportBox";

export default function ReportBoxList() {
  return (
    <div className="flex flex-wrap justify-center items-center gap-4">
      <ReportBox
        name={"درامد"}
        icon={"income-month"}
        price={100000}
        period={"ماهانه"}
      />
      <ReportBox
        name={"هزینه"}
        icon={"expense-month"}
        price={100000}
        period={"ماهانه"}
      />
      <ReportBox
        name={"مانده"}
        icon={"save-month"}
        price={100000}
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
