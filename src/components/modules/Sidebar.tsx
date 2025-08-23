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
    <div className="w-[60px] md:w-[80px] h-full flex flex-col items-center gap-y-3 rounded-r-4xl overflow-hidden py-4">
      <Link href={"/"}>
        <IconHome
          size="w-10 h-10"
          colorBg="fill-[var(--color-primary)]"
          colorIcon="#000000"
        />
      </Link>
      <Link href={"/cards"}>
        <IconCreditCard
          size="w-10 h-10"
          colorBg="fill-[var(--color-primary)]"
          colorIcon="#000000"
        />
      </Link>

      <Link href={"/check"}>
        <IconCheck
          size="w-10 h-10"
          colorBg="fill-[var(--color-primary)]"
          colorIcon="#000000"
        />
      </Link>
      <Link href={"/watchlist"}>
        <IconWatchlist
          size="w-10 h-10"
          colorBg="fill-[var(--color-primary)]"
          colorIcon="#000000"
        />
      </Link>

      <Link href={"/reminder"}>
        <InconReminder
          size="w-10 h-10"
          colorBg="fill-[var(--color-primary)]"
          colorIcon="#000000"
        />
      </Link>
      <Link href={"/income"}>
        <IconIncome
          size="w-10 h-10"
          colorBg="fill-[var(--color-primary)]"
          colorIcon="#000000"
        />
      </Link>
      <Link href={"/report"}>
        <IconReport
          size="w-10 h-10"
          colorBg="fill-[var(--color-primary)]"
          colorIcon="#000000"
        />
      </Link>
      <Link href={"/category"}>
        <IconCategory
          size="w-10 h-10"
          colorBg="fill-[var(--color-primary)]"
          colorIcon="#000000"
        />
      </Link>
      <Link href={"/note"}>
        <IconNote
          size="w-10 h-10"
          colorBg="fill-[var(--color-primary)]"
          colorIcon="#000000"
        />
      </Link>
      <Link href={"/expense"}>
        <IconExpense
          size="w-10 h-10"
          colorBg="fill-[var(--color-primary)]"
          colorIcon="#000000"
        />
      </Link>
      <Link href={"/loan"}>
        <IconLoan
          size="w-10 h-10"
          colorBg="fill-[var(--color-primary)]"
          colorIcon="#000000"
        />
      </Link>
      <Link href={"/dept-receivable"}>
        <IconDept
          size="w-11 h-11"
          colorBg="fill-[var(--color-primary)]"
          colorIcon="#000000"
        />
      </Link>
    </div>
  );
}
