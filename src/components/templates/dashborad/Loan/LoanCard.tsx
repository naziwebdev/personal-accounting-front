"use client";
import React, { useState } from "react";
import { IconLoanGiver } from "@/components/icons/IconLoanGiver";
import { IconDownArrow } from "@/components/icons/IconDownAroow";
import InstallmentCard from "./InstallmentCard";

export default function LoanCard() {
  const [isPendding, setIsPendding] = useState<boolean>(true);
  const [isOpenInstallments, setIsOpenInstallments] = useState<boolean>(false);
  return (
    <div className="flex w-full xs:w-auto flex-col gap-y-2">
      <div className="relative w-full xs:w-[350px] lg:w-[400px] rounded-3xl  p-3 xs:p-4 shadow-zinc-300/80 shadow-sm">
        {/* bg svg */}
        <div className=" svg-bg absolute inset-0 w-full h-full -z-10 bg-white  rounded-3xl"></div>
        {/* content */}
        <div className="relative inset-0 z-20 rounded-3xl">
          <p
            className={`absolute left-1  -top-6 z-20 ${
              isPendding ? "bg-yellow-400" : "bg-[var(--color-primary)]"
            } text-white  px-4 py-1 rounded-lg text-sm sm:text-base shadow-lg shadow-black/20`}
          >
            در انتظار
          </p>
          <div className="flex items-center gap-x-4">
            <IconLoanGiver
              size="w-12 h-12 xs:w-14 xs:h-14"
              color={`${isPendding ? "oklch(85.2% 0.199 91.936)" : "#e19ab3"}`}
            />
            <p className="text-lg font-semibold text-white"> بلو بانک </p>
          </div>
          <div className="flex flex-col gap-4 pt-2 px-1 sm:px-2 lg:px-10">
            <div className="flex items-center justify-between">
              <p className="text-[#e7e7e7]">مبلغ وام</p>
              <p className="text-white text-xl lg:text-2xl proportional-nums">
                ۲۰۰۰۰۰۰ <span className="text-base text-[#e7e7e7]">تومان</span>
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[#e7e7e7]"> هر قسط</p>
              <p className="text-white text-xl lg:text-2xl proportional-nums">
                ۴۰۰۰۰۰ <span className="text-base text-[#e7e7e7]">تومان</span>
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[#e7e7e7]"> تاریخ شروع </p>
              <p className="text-white text-base lg:text-[1.05rem] proportional-nums">
                ۱۴۰۴/۰۹/۱۰
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[#e7e7e7]"> تاریخ پایان </p>
              <p className="text-white text-base lg:text-[1.05rem] proportional-nums">
                ۱۴۰۴/۰۹/۱۰
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[#e7e7e7]"> تعداد اقساط </p>
              <span
                className={`text-white w-7 h-7 xs:w-8 xs:h-8 rounded-full flex justify-center items-center ${
                  isPendding ? "bg-yellow-400" : "bg-[var(--color-primary)]"
                } shadow-lg shadow-black/20`}
              >
                ۵
              </span>
            </div>
            <div
              onClick={() => setIsOpenInstallments(!isOpenInstallments)}
              className="mt-2 mx-auto w-auto flex gap-x-2 justify-center items-center p-2.5 text-white rounded-xl shadow-lg shadow-black/20 bg-zinc-600 cursor-pointer"
            >
              <span className="text-sm xs:text-base text-nowrap">مشاهده اقساط</span>
              {isOpenInstallments ? (
                <IconDownArrow size="w-3 h-3 xs:w-4 xs:h-4" color="#fff" />
              ) : (
                <IconDownArrow size="w-3 h-3 xs:w-4 xs:h-4" color="#fff" />
              )}
            </div>
          </div>
        </div>
      </div>
      {isOpenInstallments && (
        <div className="flex flex-col items-center gap-y-2 w-full xs:w-[350px] lg:w-[400px]">
          <InstallmentCard />
          <InstallmentCard />
          <InstallmentCard />
          <InstallmentCard />
          <InstallmentCard />
        </div>
      )}
    </div>
  );
}
