"use client";
import React, { useState } from "react";
import MainLayout from "../../main-layout";
import { FilterLoanByStatus } from "@/types/loan";
import AddLoanBtn from "@/components/templates/dashborad/Loan/AddLoanBtn";
import LoanCardList from "@/components/templates/dashborad/Loan/LoanCardList";

export default function page() {
  const [showByStatusFilter, setShowByStatusFilter] =
    useState<FilterLoanByStatus>(null);
  return (
    <MainLayout>
      <div>
        <AddLoanBtn
          statusItem={showByStatusFilter}
          setStatusItem={setShowByStatusFilter}
        />
        <LoanCardList statusItem={showByStatusFilter} />
      </div>
    </MainLayout>
  );
}
