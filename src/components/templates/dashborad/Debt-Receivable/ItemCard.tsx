"use client";
import React, { useState } from "react";

export default function ItemCard() {
  const [isPaid, setIsPaid] = useState<boolean>(false);

  console.log(isPaid);
  return (
    <div className="relative w-full xs:w-[350px] lg:w-[400px] rounded-3xl  p-3 xs:p-4 shadow-zinc-300/80 shadow-sm">
      {/* bg svg */}
      <div className=" svgBg absolute inset-0 w-full h-full -z-10 bg-white  rounded-3xl"></div>
      {/* blur */}

      <div className="absolute inset-0 z-0 bg-white/60 rounded-3xl"></div>
      {/* content */}
      <div className="relative inset-0 z-20 rounded-3xl">
        <p className="absolute left-1/2 -translate-x-1/2 -top-5 xs:-top-4 xs:-left-7 z-20 bg-[var(--color-secondary)] text-white px-4 py-0.5 rounded-lg text-sm xs:-rotate-[30deg]">
          طلب
        </p>
        <div className="w-full flex justify-between">
          <div className="text-center">
            <p className="text-sm sm:text-base">مبلغ</p>
            <p className="text-xl sm:text-2xl font-semibold pt-1.5 text-[var(--color-secondary)]">
              ۳۰۰۰۰۰
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm sm:text-base">وضعیت</p>
            <p className="font-semibold pt-1.5 text-yellow-400 text-sm sm:text-base">
              در انتظار پرداخت
            </p>
          </div>
        </div>
        <div className="w-full flex justify-between mt-2.5 sm:mt-4">
          <div className="text-center">
            <p className="text-sm sm:text-base">از/ به شخص:</p>
            <p className="text-base sm:text-lg pt-1.5  text-zinc-500">
              علی راد
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm sm:text-base">تاریخ</p>
            <p className="pt-1.5 text-zinc-500 text-sm sm:text-base">
              ۱۴۰۴/۰۸/۲۲
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-x-2 sm:gap-x-4 mt-2.5 sm:mt-4">
          <span className="whitespace-nowrap text-zinc-500 font-semibold text-xs sm:text-[.9rem]">
            پرداخت نشده
          </span>
          <div
            className={`flex w-16 sm:w-[75px] border-[3px]  ${
              isPaid
                ? "border-[var(--color-secondary)] justify-end"
                : "border-zinc-500 justify-start"
            } rounded-2xl p-0.5`}
          >
            <button
              onClick={() => setIsPaid(!isPaid)}
              className={`w-6 h-6 cursor-pointer rounded-full  ${
                isPaid ? "bg-[var(--color-secondary)]" : "bg-zinc-500"
              }`}
            ></button>
          </div>

          <span className="whitespace-nowrap text-[var(--color-secondary)] font-semibold text-xs sm:text-[.9rem]">
            پرداخت شده
          </span>
        </div>
      </div>
    </div>
  );
}
