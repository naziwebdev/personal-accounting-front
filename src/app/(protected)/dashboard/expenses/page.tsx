import React from "react";
import MainLayout from "../../main-layout";
import AddExpenseBtn from "@/components/templates/dashborad/Expense/AddExpenseBtn";
import ExpenseCardList from "@/components/templates/dashborad/Expense/ExpenseCardList";

export default function page() {
  return (
    <MainLayout>
      <div>
        <AddExpenseBtn />
        <ExpenseCardList />
      </div>
    </MainLayout>
  );
}
