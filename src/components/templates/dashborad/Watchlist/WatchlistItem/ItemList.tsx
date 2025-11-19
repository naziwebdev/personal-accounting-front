"use client";
import React from "react";
import ItemCard from "./ItemCard";

type WatchlistProp = {
  statusItem: null | "pendding" | "purchased";
  watchlistID: string;
};

export default function ItemList({ statusItem, watchlistID }: WatchlistProp) {
  return (
    <div className="flex justify-center items-center flex-wrap gap-7">
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
    </div>
  );
}
