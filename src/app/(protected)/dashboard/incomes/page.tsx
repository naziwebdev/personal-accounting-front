import React from "react";
import MainLayout from "../../main-layout";
import IncomeCardList from "@/components/templates/dashborad/Income/IncomeCardList";
import AddIncomeBtn from "@/components/templates/dashborad/Income/AddIncomeBtn";
import Pagination from "@/components/modules/dashboard/Pagination";

export default function page() {
  return (
    <MainLayout>
      <div>
        <AddIncomeBtn />
        <IncomeCardList />
        <Pagination/>
      </div>
    </MainLayout>
  );
}
