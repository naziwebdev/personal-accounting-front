export type DebtReceivable = {
  id: number;
  type: string;
  price: number;
  status: "pendding" | "paid";
  person: string;
  date: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type DebtReceivableArrayType = {
  items: DebtReceivable[];
  limit: number;
  page: number;
  totalCount: number;
};


export type TypeFilterItem = "debt" | "receivable";