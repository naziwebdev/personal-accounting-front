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
import Tooltip from "./Tooltip";

export default function Sidebar() {
  return (
    <div className="fixed top-0 right-0  w-[45px] sm:w-[60px] md:w-[80px] h-full flex flex-col items-center gap-y-3 rounded-4xl py-4 z-50">
      <Tooltip content="خانه">
        <Link href={"/dashboard"}>
          <IconHome
            size="w-9 h-9 xs:w-10 xs:h-10"
            colorBg="fill-[var(--color-primary)]"
            colorIcon="#000000"
          />
        </Link>
      </Tooltip>
      <Tooltip content="کارت">
        <Link href={"/dashboard/cards"}>
          <IconCreditCard
            size="w-9 h-9 xs:w-10 xs:h-10"
            colorBg="fill-[var(--color-primary)]"
            colorIcon="#000000"
          />
        </Link>
      </Tooltip>
      <Tooltip content="چک">
        <Link href={"/dashboard/checks?page=1"}>
          <IconCheck
            size="w-9 h-9 xs:w-10 xs:h-10"
            colorBg="fill-[var(--color-primary)]"
            colorIcon="#000000"
          />
        </Link>
      </Tooltip>
      <Tooltip content="واچ لیست">
        <Link href={"/dashboard/watchlist"}>
          <IconWatchlist
            size="w-9 h-9 xs:w-10 xs:h-10"
            colorBg="fill-[var(--color-primary)]"
            colorIcon="#000000"
          />
        </Link>
      </Tooltip>
      <Tooltip content="یاداوری">
        <Link href={"/dashboard/reminder"}>
          <InconReminder
            size="w-9 h-9 xs:w-10 xs:h-10"
            colorBg="fill-[var(--color-primary)]"
            colorIcon="#000000"
          />
        </Link>
      </Tooltip>
      <Tooltip content="درامد">
        <Link href={"/dashboard/incomes?page=1"}>
          <IconIncome
            size="w-9 h-9 xs:w-10 xs:h-10"
            colorBg="fill-[var(--color-primary)]"
            colorIcon="#000000"
          />
        </Link>
      </Tooltip>
      <Tooltip content="گزارش">
        <Link href={"/dashboard/reports"}>
          <IconReport
            size="w-9 h-9 xs:w-10 xs:h-10"
            colorBg="fill-[var(--color-primary)]"
            colorIcon="#000000"
          />
        </Link>
      </Tooltip>
      <Tooltip content="دسته بندی">
        <Link href={"/dashboard/categories"}>
          <IconCategory
            size="w-9 h-9 xs:w-10 xs:h-10"
            colorBg="fill-[var(--color-primary)]"
            colorIcon="#000000"
          />
        </Link>
      </Tooltip>
      <Tooltip content="یادداشت">
        <Link href={"/dashboard/notes?page=1"}>
          <IconNote
            size="w-9 h-9 xs:w-10 xs:h-10"
            colorBg="fill-[var(--color-primary)]"
            colorIcon="#000000"
          />
        </Link>
      </Tooltip>
      <Tooltip content="مخارج">
        <Link href={"/dashboard/expenses?page=1"}>
          <IconExpense
            size="w-9 h-9 xs:w-10 xs:h-10"
            colorBg="fill-[var(--color-primary)]"
            colorIcon="#000000"
          />
        </Link>
      </Tooltip>
      <Tooltip content="وام">
        <Link href={"/dashboard/loans"}>
          <IconLoan
            size="w-9 h-9 xs:w-10 xs:h-10"
            colorBg="fill-[var(--color-primary)]"
            colorIcon="#000000"
          />
        </Link>
      </Tooltip>
      <Tooltip content="بدهی/طلب">
        <Link href={"/dashboard/debts-receivables?page=1"}>
          <IconDept
            size="w-10 h-10 xs:w-11 xs:h-11"
            colorBg="fill-[var(--color-primary)]"
            colorIcon="#000000"
          />
        </Link>
      </Tooltip>
    </div>
  );
}
