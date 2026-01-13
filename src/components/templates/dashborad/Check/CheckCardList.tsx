import React, { useEffect, useState } from "react";
import CheckCard from "@/components/modules/dashboard/CheckCard";
import { useSearchParams } from "next/navigation";
import { useChecks } from "@/hooks/useChecks";
import { Check } from "@/types/check";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import EmptyState from "@/components/modules/dashboard/EmptyState";
import Pagination from "@/components/modules/dashboard/Pagination";

type CheckProp = {
  typeItem: "pay" | "receive";
  statusItem: null | "pendding" | "paid" | "returned";
};

export default function CheckCardList({ typeItem, statusItem }: CheckProp) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? "4");

  const {
    data: checks,
    isLoading,
    isError,
  } = useChecks(page, limit, typeItem, statusItem);
  const [checksShowPage, setChecksShowPage] = useState<Check[]>([]);
  const { loading } = useAuth();

  useEffect(() => {
    const toastId = "debts-loading";

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
  if (isError || !checks) return null;

  const totalPages = Math.ceil(checks?.totalCount / limit);
  return (
    <>
      <div className="flex justify-center items-center flex-wrap gap-6">
        {totalPages > 1
          ? checksShowPage?.map((item, index) => {
              return index % 2 === 0 ? (
                <CheckCard key={item.id} {...item} />
              ) : (
                <CheckCard key={item.id} {...item} />
              );
            })
          : checks?.items?.map((item, index) => {
              return index % 2 === 0 ? (
                <CheckCard key={item.id} {...item} />
              ) : (
                <CheckCard key={item.id} {...item} />
              );
            })}
        {checks?.totalCount === 0 && (
          <EmptyState title="هنوز چک ای اضافه نکردی" />
        )}
      </div>
      {totalPages > 1 && (
        <Pagination
          itemes={checks.items}
          itemsLimit={4}
          totalItems={checks.totalCount}
          pathname="/checks"
          setShowItems={setChecksShowPage}
        />
      )}
    </>
  );
}
