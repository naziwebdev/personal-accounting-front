export type CategoryType = "income" | "expense";

export type Category = {
  id: number;
  title: string;
  type: CategoryType;
  icon: string;
};
