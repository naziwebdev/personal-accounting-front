"use client";

import React, { useState } from "react";
import MainLayout from "../../main-layout";
import AddItemBtn from "@/components/templates/dashborad/DebtReceivable/AddItemBtn";
import ItemCardList from "@/components/templates/dashborad/DebtReceivable/ItemCardList";
import { TypeFilterItem } from "@/types/debt";


export default function page() {
  const [showByTypeFilter, setShowByTypeFilter] =
    useState<TypeFilterItem>("receivable");

  console.log(showByTypeFilter);
  return (
    <MainLayout>
      <div>
        <AddItemBtn setType={setShowByTypeFilter} typeItem={showByTypeFilter} />
        <ItemCardList typeItem={showByTypeFilter} />
      </div>
    </MainLayout>
  );
}
