export type WatchlistItem = {
  id: number;
  title: string;
  price: number;
  description: string;
  count: number;
  status: "pendding" | "purchased";
  createdAt: string;
  updatedAt: string;
  watchlist?: {
    id: number;
    title: string;
    totalPrice: number;
    status: "pendding" | "purchased";
    waitingPeriod: "year" | "month" | "day" | "week";
    currentBudget: number;
    requiredSavingsPerDay: number;
    createdAt: string;
    updatedAt: string;
  };
};

export type Watchlist = {
  id: number;
  title: string;
  totalPrice: number;
  status: "pendding" | "purchased";
  waitingPeriod: "year" | "month" | "day" | "week";
  currentBudget: number;
  requiredSavingsPerDay: number;
  createdAt: string;
  updatedAt: string;
  items: WatchlistItem[];
};

export type WatchlistArrayType = {
  items: Watchlist[];
  limit: number;
  page: number;
  totalCount: number;
};

export type WatchlistItemArrayType = {
  items: WatchlistItem[];
  limit: number;
  page: number;
  totalCount: number;
};

export type StatusFilterWatchlist = null | "pendding" | "purchased";
