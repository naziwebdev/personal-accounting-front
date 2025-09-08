import React from "react";
import { IconIncome } from "@/components/icons/IconIncome";
import { IconExpense } from "@/components/icons/IconExpense";
import { IconCheck } from "@/components/icons/IconCheck";
import { IconLoan } from "@/components/icons/IconLoan";
import { IconDept } from "@/components/icons/IconDept";
import { IconCreditCard } from "@/components/icons/IconCreditCard";
import { IconWatchlist } from "@/components/icons/IconWatchlist";
import { InconReminder } from "@/components/icons/IconReminder";
import { IconReport } from "@/components/icons/IconReport";
import { IconCategory } from "@/components/icons/IconCategory";
import { IconNote } from "@/components/icons/IconNote";
import { IconHome } from "@/components/icons/IconHome";

import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-[60px] md:w-[80px] h-full flex flex-col items-center gap-y-3 rounded-4xl overflow-hidden py-4 z-20">
      <Link href={"/dashboard"}>
        <IconHome
          size="w-10 h-10"
          colorBg="fill-[var(--color-primary)]"
          colorIcon="#000000"
        />
      </Link>
      <Link href={"/dashboard/cards"}>
        <IconCreditCard
          size="w-10 h-10"
          colorBg="fill-[var(--color-primary)]"
          colorIcon="#000000"
        />
      </Link>

      <Link href={"/dashboard/checks"}>
        <IconCheck
          size="w-10 h-10"
          colorBg="fill-[var(--color-primary)]"
          colorIcon="#000000"
        />
      </Link>
      <Link href={"/dashboard/watchlist"}>
        <IconWatchlist
          size="w-10 h-10"
          colorBg="fill-[var(--color-primary)]"
          colorIcon="#000000"
        />
      </Link>

      <Link href={"/dashboard/reminder"}>
        <InconReminder
          size="w-10 h-10"
          colorBg="fill-[var(--color-primary)]"
          colorIcon="#000000"
        />
      </Link>
      <Link href={"/dashboard/incomes"}>
        <IconIncome
          size="w-10 h-10"
          colorBg="fill-[var(--color-primary)]"
          colorIcon="#000000"
        />
      </Link>
      <Link href={"/dashboard/reports"}>
        <IconReport
          size="w-10 h-10"
          colorBg="fill-[var(--color-primary)]"
          colorIcon="#000000"
        />
      </Link>
      <Link href={"/dashboard/categories"}>
        <IconCategory
          size="w-10 h-10"
          colorBg="fill-[var(--color-primary)]"
          colorIcon="#000000"
        />
      </Link>
      <Link href={"/dashboard/notes"}>
        <IconNote
          size="w-10 h-10"
          colorBg="fill-[var(--color-primary)]"
          colorIcon="#000000"
        />
      </Link>
      <Link href={"/dashboard/expenses"}>
        <IconExpense
          size="w-10 h-10"
          colorBg="fill-[var(--color-primary)]"
          colorIcon="#000000"
        />
      </Link>
      <Link href={"/dashboard/loans"}>
        <IconLoan
          size="w-10 h-10"
          colorBg="fill-[var(--color-primary)]"
          colorIcon="#000000"
        />
      </Link>
      <Link href={"/dashboard/depts-receivables"}>
        <IconDept
          size="w-11 h-11"
          colorBg="fill-[var(--color-primary)]"
          colorIcon="#000000"
        />
      </Link>
    </div>
  );
}
