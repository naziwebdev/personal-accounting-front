"use client";
import React, { useState } from "react";
import IncomeCard from "@/components/modules/dashboard/IncomeCard";
import { useIncomes } from "@/hooks/useIncomes";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import EmptyState from "@/components/modules/dashboard/EmptyState";
import { toast } from "sonner";
import Pagination from "@/components/modules/dashboard/Pagination";
import { IncomeArrayType, Income } from "@/types/income";
import { useSearchParams } from "next/navigation";

export default function IncomeCardList() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? "6");

  const { data: incomes, isLoading, isError } = useIncomes(page, limit);
  const [incomesShowPage, setIncomesShowPage] = useState<Income[]>([]);
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
    <>
      <div className="flex justify-center items-center flex-wrap gap-6">
        {incomesShowPage.length !== 0 &&
          incomesShowPage.map((income, index) => {
            return <IncomeCard key={income.id} {...income} />;
          })}
        {incomesShowPage.length === 0 && (
          <EmptyState title=" هنوز درامدی اضافه نکردی" />
        )}
      </div>
      {incomes.totalCount !== 0 && (
        <Pagination
          itemes={incomes.items}
          itemsLimit={6}
          totalItems={incomes.totalCount}
          pathname="/incomes"
          setShowItems={setIncomesShowPage}
        />
      )}
    </>
  );
}
