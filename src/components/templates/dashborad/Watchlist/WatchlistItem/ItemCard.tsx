"use client";
import { IconDelete } from "@/components/icons/IconDelete";
import { IconEdit } from "@/components/icons/IconEdit";
import { IconPaper } from "@/components/icons/IconPaper";
import React, { useState } from "react";

export default function ItemCard() {
  const [isPendding, setIsPendding] = useState<boolean>(false);
  return (
    <div className="relative w-full xs:w-[350px] lg:w-[400px] h-[300px] rounded-4xl px-3 xs:px-4 py-8 bg-white border-2 border-dashed border-stone-300 ">
      {/* half-cyrcle shapes */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-14  bg-[var(--color-theme)] rounded-b-full border-b-[1px] border-stone-300"></div>
      <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2  w-20 h-14  bg-[var(--color-theme)] rounded-t-full z-20 border-t-[1px] border-stone-300"></div>
      {/* content */}
      <div className="relative h-full inset-0 z-40 flex flex-col justify-around">
        <div className="flex items-center justify-between">
          <div className="">
            <p className=" pb-2">عنوان</p>
            <h4 className=" text-zinc-600 ">خرید مرغ</h4>
          </div>
          <div className="text-left">
            <p className=" pb-2">مبلغ کل</p>
            <p className="text-[var(--color-primary)] font-semibold text-xl xs:text-2xl">
              ۴۰۰۰۰۰۰ {"  "}
              <span className=" font-medium text-zinc-600 text-sm">تومان</span>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="">
            <p className="pb-2">تاریخ ایجاد</p>
            <p className="text-zinc-600 ">۱۴۰۴/۰۸/۲۲</p>
          </div>
          <div className="">
            <p className="pb-2">تعداد</p>
            <p className="text-zinc-600"> ۲ عدد</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-y-4 justify-between">
          <div className="w-full  flex justify-between gap-x-2.5">
            <p
              className={`${
                isPendding
                  ? "bg-[var(--color-primary)]"
                  : "bg-[var(--color-secondary)]"
              } text-white  px-4 py-1 rounded-lg text-sm sm:text-base shadow-lg shadow-zinc-100`}
            >
              در انتظار
            </p>
            <div
              className={`flex w-[60px] sm:w-[65px] border-[3px]  ${
                isPendding
                  ? "border-[var(--color-secondary)] justify-end"
                  : "border-zinc-600 justify-start"
              } rounded-2xl p-0.5`}
            >
              <button
                className={`w-6 h-6 cursor-pointer rounded-full  ${
                  isPendding ? "bg-[var(--color-secondary)]" : "bg-zinc-600"
                }`}
              ></button>
            </div>
          </div>

          <div className="flex items-center gap-x-1 -order-2">
            <button className="cursor-pointer">
              <IconPaper size="w-7 h-7" color="#52525c" />
            </button>
            <button className="cursor-pointer">
              <IconDelete size="w-7 h-7" color="#e19ab3" />
            </button>
            <button className="cursor-pointer">
              <IconEdit size="w-7 h-7" color="#8c66e5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
