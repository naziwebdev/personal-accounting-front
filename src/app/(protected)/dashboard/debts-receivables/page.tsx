import React from "react";
import MainLayout from "../../main-layout";
import AddItemBtn from "@/components/templates/dashborad/Debt-Receivable/AddItemBtn";
import ItemCardList from "@/components/templates/dashborad/Debt-Receivable/ItemCardList";

export default function page() {
  return (
    <MainLayout>
      <div>
        <AddItemBtn />
        <ItemCardList />
      </div>
    </MainLayout>
  );
}
