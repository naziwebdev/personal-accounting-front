import { FilterLoanByStatus, Loan } from "@/types/loan";
import React, { useEffect, useState } from "react";
import LoanCard from "./LoanCard";
import { useSearchParams } from "next/navigation";
import { useLoans } from "@/hooks/useLoans";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import Pagination from "@/components/modules/dashboard/Pagination";
import EmptyState from "@/components/modules/dashboard/EmptyState";

type FilterProp = {
  statusItem: FilterLoanByStatus;
};

export default function LoanCardList({ statusItem }: FilterProp) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? "4");


  const { data: loans, isLoading, isError } = useLoans(page, limit, statusItem);
  const [loansShowPage, setLoansShowPage] = useState<Loan[]>([]);
  const { loading } = useAuth();

  useEffect(() => {
    const toastId = "loans-loading";

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
  if (isError || !loans) return null;

  const totalPages = Math.ceil(loans?.totalCount / limit);
  return (
    <>
      <div className="flex justify-center items-start flex-wrap gap-6">
        {totalPages > 1
          ? loansShowPage?.map((item, index) => {
              return index % 2 === 0 ? (
                <LoanCard key={item.id} {...item} />
              ) : (
                <LoanCard key={item.id} {...item} />
              );
            })
          : loans?.items?.map((item, index) => {
              return index % 2 === 0 ? (
                <LoanCard key={item.id} {...item} />
              ) : (
                <LoanCard key={item.id} {...item} />
              );
            })}
        {loans?.totalCount === 0 && (
          <EmptyState title="هنوز وام ای اضافه نکردی" />
        )}
      </div>
      {totalPages > 1 && (
        <Pagination
          itemes={loans.items}
          itemsLimit={4}
          totalItems={loans.totalCount}
          pathname="/loans"
          setShowItems={setLoansShowPage}
        />
      )}
    </>
  );
}
