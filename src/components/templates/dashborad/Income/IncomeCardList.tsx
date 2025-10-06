import React from "react";
import TransactionCard from "@/components/modules/dashboard/TransactionCard";

export default function IncomeCardList() {
  return (
    <div className="flex justify-center items-center flex-wrap gap-6">
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
    </div>
  );
}
