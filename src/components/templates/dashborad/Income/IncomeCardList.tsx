"use client";
import React from "react";
import IncomeCard from "@/components/modules/dashboard/IncomeCard";
import { useIncomes } from "@/hooks/useIncomes";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import EmptyState from "@/components/modules/dashboard/EmptyState";
import { toast } from "sonner";

export default function IncomeCardList() {
  const { data: incomes, isLoading, isError } = useIncomes();
  const { loading } = useAuth();

  useEffect(() => {
    const toastId = "incomes-loading";

    if (isLoading) {
      toast.loading("در حال دریافت اطلاعات درامدها...", { id: toastId });
    } else {
      toast.dismiss(toastId);
    }

    if (isError) {
      toast.error("خطا در دریافت درامدها");
    }
  }, [isLoading, isError]);

  if (loading || isLoading) return null;
  if (isError || !incomes) return null;
  return (
    <div className="flex justify-center items-center flex-wrap gap-6">
      {incomes.length !== 0 &&
        incomes.map((income, index) => {
          return <IncomeCard key={income.id} {...income} />;
        })}
      {incomes.length === 0 && <EmptyState title=" هنوز درامدی اضافه نکردی" />}
    </div>
  );
}
