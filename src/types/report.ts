export type ReportBoxMonthly = {
  month: string;
  totalIncome: number;
  totalExpense: number;
  savings: number;
};

export type ReportWeekly =
  | {
      week: string;
      totalIncome: number;
      totalExpense?: never;
    }
  | {
      week: string;
      totalExpense: number;
      totalIncome?: never;
    };


