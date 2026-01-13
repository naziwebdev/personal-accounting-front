export type FilterLoanByStatus = null | "pendding" | "paid";

export type Installment = {
  id: number;
  price: string;
  status: "pendding" | "paid";
  dueDate: string;
};

export type Loan = {
  id: number;
  title: string;
  giverName: string;
  totalPrice: string;
  description: string;
  status: "pendding" | "paid";
  countInstallment: 5;
  firstDateInstallment: string;
  periodInstallment: "weekly" | "monthly" | "yearly";
  createdAt: string;
  updatedAt: string;
  installments: Installment[];
};

export type LoanArrayType = {
  items: Loan[];
  limit: number;
  page: number;
  totalCount: number;
};
