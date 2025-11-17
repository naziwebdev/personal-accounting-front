import React, { useEffect, useState } from "react";
import WatchlistCard from "./WatchlistCard";
import { useSearchParams } from "next/navigation";
import { useWatchlist } from "@/hooks/useWatchlists";
import { Watchlist } from "@/types/watchlist";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import EmptyState from "@/components/modules/dashboard/EmptyState";
import Pagination from "@/components/modules/dashboard/Pagination";

type WatchlistProp = {
  statusItem: null | "pendding" | "purchased";
};

export default function WatchlistList({ statusItem }: WatchlistProp) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? "4");

  const {
    data: watchlists,
    isLoading,
    isError,
  } = useWatchlist(page, limit, statusItem);
  const [itemsShowPage, setItemsShowPage] = useState<Watchlist[]>([]);
  const { loading } = useAuth();


  useEffect(() => {
    const toastId = "watchlists-loading";

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
  if (isError || !watchlists) return null;

  const totalPages = Math.ceil(watchlists.totalCount / limit);
  return (
    <>
      <div className="flex justify-center items-center flex-wrap gap-6">
        {totalPages > 1
          ? itemsShowPage.map((item, index) => {
              return index % 2 === 0 ? (
                <WatchlistCard key={item.id} {...item} />
              ) : (
                <WatchlistCard key={item.id} {...item} />
              );
            })
          : watchlists?.items?.map((item, index) => {
              return index % 2 === 0 ? (
                <WatchlistCard key={item.id} {...item} />
              ) : (
                <WatchlistCard key={item.id} {...item} />
              );
            })}
        {watchlists?.totalCount === 0 && (
          <EmptyState title="هنوز واچ لیستی اضافه نکردی" />
        )}
        
      </div>
      {totalPages > 1 && (
        <Pagination
          itemes={watchlists.items}
          itemsLimit={6}
          totalItems={watchlists.totalCount}
          pathname="/watchlist"
          setShowItems={setItemsShowPage}
        />
      )}
    </>
  );
}
