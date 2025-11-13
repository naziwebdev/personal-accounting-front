export type Check = {
  id: number;
  type: "pay" | "receive";
  status: "pendding" | "paid" | "returned";
  price: number;
  bank: string;
  payable: string;
  issued: string;
  due_date: string;
  serial: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    phone: string;
    role: "admin" | "user";
    createdAt: string;
    updatedAt: string;
  };
};

export type CheckArrayType = {
  items: Check[];
  limit: number;
  page: number;
  totalCount: number;
};

export type TypeFilterCheck = "pay" | "receive";

export type StatusFilterCheck = null | "pendding" | "paid" | "returned";
