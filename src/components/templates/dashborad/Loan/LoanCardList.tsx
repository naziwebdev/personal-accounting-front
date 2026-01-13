import { FilterLoanByStatus } from "@/types/loan";
import React from "react";
import LoanCard from "./LoanCard";

type FilterProp = {
  statusItem: FilterLoanByStatus;
};

export default function LoanCardList({ statusItem }: FilterProp) {
  return (
    <div className="flex justify-center items-start flex-wrap gap-7">
      <LoanCard />
      <LoanCard />
      <LoanCard />
      <LoanCard />
    </div>
  );
}
