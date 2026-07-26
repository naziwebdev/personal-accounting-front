import React from "react";
import MainLayout from "../../main-layout";
import ReportBoxList from "@/components/templates/dashborad/Report/ReportBoxList";

export default function page() {
  return (
    <MainLayout>
      <div>
        <ReportBoxList />
      </div>
    </MainLayout>
  );
}
