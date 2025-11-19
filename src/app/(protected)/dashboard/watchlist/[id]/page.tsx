"use client";
import React, { useState } from "react";
import { StatusFilterWatchlist } from "@/types/watchlist";
import ItemList from "@/components/templates/dashborad/Watchlist/WatchlistItem/ItemList";
import MainLayout from "@/app/(protected)/main-layout";
import AddItemBtn from "@/components/templates/dashborad/Watchlist/WatchlistItem/AddItemBtn";
import { useParams } from "next/navigation";

export default function page() {
  const [showByStatusFilter, setShowByStatusFilter] =
    useState<StatusFilterWatchlist>(null);

  const params = useParams();
  const id = params.id as string;

  return (
    <MainLayout>
      <div>
        <AddItemBtn
          statusItem={showByStatusFilter}
          setStatusItem={setShowByStatusFilter}
          watchlistID={id}
        />
        <ItemList statusItem={showByStatusFilter} watchlistID={id} />
      </div>
    </MainLayout>
  );
}
