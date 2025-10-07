import React from "react";
import ExpenseCard from "@/components/modules/dashboard/ExpenseCard";

export default function ExpenseCardList() {
  return (
    <div className="flex justify-center items-center flex-wrap gap-6">
      <ExpenseCard />
      <ExpenseCard />
      <ExpenseCard />
      <ExpenseCard />
      <ExpenseCard />
      <ExpenseCard />
    </div>
  );
}
