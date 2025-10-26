type Role = "admin" | "user";

export type Income = {
  id: number;
  title: string;
  price: string;
  date: Date;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: number;
    phone: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
  };
  category: {
    id: number;
    title: string;
    type: string;
  };
  bankCard?: {
    id: number;
    bankName: string;
    cardNumber: string;
    balance?: number;
  };
};

export type IncomeArrayType = {
  items: Income[];
  limit: number;
  page: number;
  totalCount: number;
};
