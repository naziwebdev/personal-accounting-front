import React from "react";
import WatchlistCard from "./WatchlistCard";

export default function WatchlistList() {
  return (
    <>
      <div className="flex justify-center items-center flex-wrap gap-6">
        <WatchlistCard/>
        <WatchlistCard/>
        <WatchlistCard/>
        <WatchlistCard/>
      </div>
    </>
  );
}
