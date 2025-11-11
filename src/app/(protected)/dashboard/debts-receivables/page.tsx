"use client";

import React, { useState } from "react";
import MainLayout from "../../main-layout";
import AddItemBtn from "@/components/templates/dashborad/DebtReceivable/AddItemBtn";
import ItemCardList from "@/components/templates/dashborad/DebtReceivable/ItemCardList";
import { StatusFilterItem, TypeFilterItem } from "@/types/debt";


export default function page() {
  const [showByTypeFilter, setShowByTypeFilter] =
    useState<TypeFilterItem>("receivable");

  const [showByStatusFilter, setShowByStatusFilter] =
    useState<StatusFilterItem>(null);

    
  return (
    <MainLayout>
      <div>
        <AddItemBtn setType={setShowByTypeFilter} typeItem={showByTypeFilter} 
        setStatus={setShowByStatusFilter}  statusItem={showByStatusFilter}/>
        <ItemCardList typeItem={showByTypeFilter} statusItem={showByStatusFilter} />
      </div>
    </MainLayout>
  );
}
