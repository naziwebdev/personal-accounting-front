"use client";

import React, { useState } from "react";
import MainLayout from "../../main-layout";
import { StatusFilterCheck, TypeFilterCheck } from "@/types/check";
import AddCheckBtn from "@/components/templates/dashborad/Check/AddCheckBtn";
import CheckCardList from "@/components/templates/dashborad/Check/CheckCardList";

export default function page() {
  const [showByTypeFilter, setShowByTypeFilter] =
    useState<TypeFilterCheck>("pay");

  const [showByStatusFilter, setShowByStatusFilter] =
    useState<StatusFilterCheck>(null);

  return (
    <MainLayout>
      <div>
        <AddCheckBtn
          setType={setShowByTypeFilter}
          typeItem={showByTypeFilter}
          setStatus={setShowByStatusFilter}
          statusItem={showByStatusFilter}
        />
        <CheckCardList />
      </div>
    </MainLayout>
  );
}
