import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { DebtReceivable } from "@/types/debt";
import { useSearchParams } from "next/navigation";
import { useDebtReceivable } from "@/hooks/useDebtReceivable";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import EmptyState from "@/components/modules/dashboard/EmptyState";
import Pagination from "@/components/modules/dashboard/Pagination";

type ItemCardProp = {
  typeItem: "debt" | "receivable";
  statusItem: null | "pendding" | "paid";
};

export default function ItemCardList({ typeItem, statusItem }: ItemCardProp) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? "6");

  const {
    data: debtsReceivables,
    isLoading,
    isError,
  } = useDebtReceivable(page, limit, typeItem, statusItem);
  const [itemsShowPage, setItemsShowPage] = useState<DebtReceivable[]>([]);
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
  if (isError || !debtsReceivables) return null;

  const totalPages = Math.ceil(debtsReceivables.totalCount / limit);

  return (
    <>
      <div className="flex justify-center items-center flex-wrap gap-6">
        {totalPages > 1
          ? itemsShowPage.map((item, index) => {
              return index % 2 === 0 ? (
                <ItemCard key={item.id} {...item} />
              ) : (
                <ItemCard key={item.id} {...item} />
              );
            })
          : debtsReceivables.items.map((item, index) => {
              return index % 2 === 0 ? (
                <ItemCard key={item.id} {...item} />
              ) : (
                <ItemCard key={item.id} {...item} />
              );
            })}
        {debtsReceivables.totalCount === 0 && (
          <EmptyState title="هنوز بدهی / طلبی اضافه نکردی" />
        )}
        {debtsReceivables.items.length === 0 && (
          <EmptyState title=" بدهی / طلبی  با این نوع یافت نشد" />
        )}
      </div>
      {totalPages > 1 && (
        <Pagination
          itemes={debtsReceivables.items}
          itemsLimit={6}
          totalItems={debtsReceivables.totalCount}
          pathname="/debts-receivables"
          setShowItems={setItemsShowPage}
        />
      )}
    </>
  );
}
