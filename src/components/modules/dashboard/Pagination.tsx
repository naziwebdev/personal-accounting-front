import Link from "next/link";
import React from "react";
import { IconLeftArrow } from "@/components/icons/IconLeftArrow";
import { IconRightArrow } from "@/components/icons/IconRightArrow";

export default function Pagination() {
  return (
    <div className="mt-10">
      <ul className="flex justify-center items-center gap-x-2.5 sm:gap-x-3.5">
        <li className="w-9 h-8 sm:w-11 sm:h-9 bg-black flex justify-center items-center text-white rounded-xl cursor-pointer shadow-xl">
          <Link href={"/dashboard/incomes/1"} className="">
            <IconRightArrow size="w-8 h-8 sm:w-9 sm:h-9" color="#ffffff" />
          </Link>
        </li>
        <li className="w-10 h-8 sm:w-12 sm:h-9 bg-white border-[4px] border-[var(--color-secondary)] border-double flex justify-center items-center text-[var(--color-secondary)] rounded-xl cursor-pointer shadow-lg">
          <Link href={"/dashboard/incomes/1"} className="font-bold">
            ۱
          </Link>
        </li>
        <li className="w-10 h-8 sm:w-12 sm:h-9 bg-[var(--color-primary)] flex justify-center items-center text-white rounded-xl cursor-pointer shadow-lg">
          <Link href={"/dashboard/incomes/1"} className="font-bold">
            ۲
          </Link>
        </li>
        <li className="w-10 h-8 sm:w-12 sm:h-9 bg-[var(--color-primary)] flex justify-center items-center text-white rounded-xl cursor-pointer shadow-lg">
          <Link href={"/dashboard/incomes/1"} className="font-bold">
            ۳
          </Link>
        </li>
        <li className="w-9 h-8 sm:w-11 sm:h-9 bg-black flex justify-center items-center text-white rounded-xl cursor-pointer shadow-xl">
          <Link href={"/dashboard/incomes/1"} className="">
            <IconLeftArrow size="w-8 h-8 sm:w-9 sm:h-9" color="#ffffff" />
          </Link>
        </li>
      </ul>
    </div>
  );
}
