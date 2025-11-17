"use client";
import React, { useState } from "react";
import MainLayout from "../../main-layout";
import AddWatchlistBtn from "@/components/templates/dashborad/Watchlist/AddWatchlistBtn";
import { StatusFilterWatchlist } from "@/types/watchlist";
import WatchlistList from "@/components/templates/dashborad/Watchlist/WatchlistList";

export default function page() {
  const [showByStatusFilter, setShowByStatusFilter] =
    useState<StatusFilterWatchlist>(null);
  return (
    <MainLayout>
      <div>
        <AddWatchlistBtn
          statusItem={showByStatusFilter}
          setStatusItem={setShowByStatusFilter}
        />
        <WatchlistList statusItem={showByStatusFilter} />
      </div>
    </MainLayout>
  );
}
