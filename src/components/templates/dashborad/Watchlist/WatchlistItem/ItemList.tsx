"use client";
import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { useSearchParams } from "next/navigation";
import { useWatchlistItems } from "@/hooks/useWatchlistItem";
import { WatchlistItem } from "@/types/watchlist";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import EmptyState from "@/components/modules/dashboard/EmptyState";
import Pagination from "@/components/modules/dashboard/Pagination";

type WatchlistProp = {
  statusItem: null | "pendding" | "purchased";
  watchlistID: string;
};

export default function ItemList({ statusItem, watchlistID }: WatchlistProp) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? "6");

  const {
    data: watchlistItems,
    isLoading,
    isError,
  } = useWatchlistItems(page, limit, Number(watchlistID), statusItem);
  const [itemsShowPage, setItemsShowPage] = useState<WatchlistItem[]>([]);
  const { loading } = useAuth();

  useEffect(() => {
    const toastId = "watchlistItems-loading";

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
  if (isError || !watchlistItems) return null;

  const totalPages = Math.ceil(watchlistItems.totalCount / limit);
  return (
    <>
      <div className="flex justify-center items-center flex-wrap gap-7">
        {totalPages > 1
          ? itemsShowPage.map((item, index) => {
              return index % 2 === 0 ? (
                <ItemCard key={item.id} {...item} />
              ) : (
                <ItemCard key={item.id} {...item} />
              );
            })
          : watchlistItems?.items?.map((item, index) => {
              return index % 2 === 0 ? (
                <ItemCard key={item.id} {...item} />
              ) : (
                <ItemCard key={item.id} {...item} />
              );
            })}
        {watchlistItems?.totalCount === 0 && (
          <EmptyState title="هنوز واچ لیستی اضافه نکردی" />
        )}
      </div>
      {totalPages > 1 && (
        <Pagination
          itemes={watchlistItems.items}
          itemsLimit={6}
          totalItems={watchlistItems.totalCount}
          pathname="/watchlist"
          setShowItems={setItemsShowPage}
        />
      )}
    </>
  );
}
