import React from "react";
import MainLayout from "../../main-layout";
import ReportBoxList from "@/components/templates/dashborad/Report/ReportBoxList";
import ReportWeeklyChart from "@/components/templates/dashborad/Report/ReportWeeklyChart";

export default function page() {
  return (
    <MainLayout>
      <div>
        <ReportBoxList />
        <ReportWeeklyChart/>
      </div>
    </MainLayout>
  );
}
