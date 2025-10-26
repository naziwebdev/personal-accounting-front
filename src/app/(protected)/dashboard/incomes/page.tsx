import React from "react";
import MainLayout from "../../main-layout";
import IncomeCardList from "@/components/templates/dashborad/Income/IncomeCardList";
import AddIncomeBtn from "@/components/templates/dashborad/Income/AddIncomeBtn";

export default function page() {
  return (
    <MainLayout>
      <div>
        <AddIncomeBtn />
        <IncomeCardList />
      </div>
    </MainLayout>
  );
}
