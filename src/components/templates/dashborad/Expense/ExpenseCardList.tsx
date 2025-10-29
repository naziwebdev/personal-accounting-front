"use client";

import React, { useEffect, useState } from "react";
import ExpenseCard from "@/components/modules/dashboard/ExpenseCard";
import { useExpense } from "@/hooks/useExpense";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Expense } from "@/types/expense";
import Pagination from "@/components/modules/dashboard/Pagination";
import EmptyState from "@/components/modules/dashboard/EmptyState";

export default function ExpenseCardList() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? "6");

  const [expensesShowPage, setExpensesShowPage] = useState<Expense[]>([]);

  const { data: expenses, isError, isLoading } = useExpense(page, limit);


  const { loading } = useAuth();

  useEffect(() => {
    const toastId = "expenses-loading";

    if (isLoading) {
      toast.loading("در حال دریافت اطلاعات ...", { id: toastId });
    } else {
      toast.dismiss(toastId);
    }

    if (isError) {
      toast.error("خطا در دریافت ");
    }
  }, [isLoading, isError]);

  if (loading || isLoading) return null;
  if (isError || !expenses) return null;

  return (
    <>
      <div className="flex justify-center items-center flex-wrap gap-6">
        {expensesShowPage.length !== 0 &&
          expensesShowPage.map((expense, index) => {
            return <ExpenseCard key={expense.id} {...expense} />;
          })}
        {expensesShowPage.length === 0 && (
          <EmptyState title=" هنوز هزینه ای اضافه نکردی" />
        )}
      </div>
      {expenses.totalCount !== 0 && (
        <Pagination
          itemes={expenses.items}
          itemsLimit={6}
          totalItems={expenses.totalCount}
          pathname="/expenses"
          setShowItems={setExpensesShowPage}
        />
      )}
    </>
  );
}
