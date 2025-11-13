"use client";
import { IconBank } from "@/components/icons/IconBank";
import { IconDelete } from "@/components/icons/IconDelete";
import { IconEdit } from "@/components/icons/IconEdit";
import React, { useState } from "react";
import { StatusFilterCheck } from "@/types/check";
import { IconActionDot } from "@/components/icons/IconActiondot";

export default function CheckCard() {
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [status, setStatus] = useState<StatusFilterCheck>("pendding");
  const [isShowAction, setIsShowAction] = useState<boolean>(false);

  return (
    <div className="relative w-[90%] md:w-[46%] rounded-3xl  p-3 xs:p-4 shadow-zinc-300/80 shadow-sm">
      {/* bg svg */}
      <div className=" svgBg absolute inset-0 w-full h-full -z-10 bg-white  rounded-3xl"></div>
      {/* blur */}

      <div className="absolute inset-0 z-0 bg-white/70 rounded-3xl"></div>
      {/* content */}
      <div className="relative inset-0 z-20 rounded-3xl">
        <p className="absolute -top-6 -left-9 z-20 bg-[var(--color-secondary)] text-white px-2 xs:px-3 py-0.5 rounded-lg text-sm -rotate-[30deg]">
          {/* {Prop.type === "receivable" ? "طلب" : "بدهی"} */}
          پرداختی
        </p>
        <div className="flex justify-between">
          <div className="text-center">
            <p className="text-sm sm:text-base">تاریخ</p>
            <p className="pt-1.5 text-zinc-500 text-sm sm:text-base">
              ۱۴۰۴/۱۲/۰۷
            </p>
          </div>
          <div className="flex flex-col items-center gap-2.5">
            <IconBank size="w-7 h-7 xs:w-8 xs:h-8" color="#8c66e5" />
            <p className="text-sm xs:text-base font-titr text-center text-[var(--color-secondary)]">
              بانک ملت
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm sm:text-base">شماره سریال</p>
            <p className="pt-1.5 text-zinc-500 text-sm sm:text-base">
              ۱۲۴۶۸۶۵۳
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex flex-col xs:flex-row items-center justify-center gap-2">
            <p className="text-sm sm:text-base">مبلغ</p>
            <p className="text-xl sm:text-2xl font-semibold text-[var(--color-secondary)]">
              ۴۰۰۰۰۰۰۰۰{" "}
              <span className="text-zinc-500 text-xs sm:text-base font-normal">
                ریال
              </span>
            </p>
          </div>
          <div className="flex flex-col xs:flex-row items-center justify-center gap-2">
            <p className="text-sm sm:text-base text-center">در وجه</p>
            <p className=" text-zinc-500 text-sm sm:text-base">سارا رضایی</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mt-4">
          <form className="flex items-center gap-2.5 xs:gap-3 text-center">
            <label className="relative flex items-center gap-1 xs:gap-2 cursor-pointer text-xs xs:text-sm text-gray-800">
              <input
                type="radio"
                name="status"
                value="pendding"
                defaultChecked
                className="peer absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 opacity-0"
              />
              <span className="relative h-4 w-4 rounded-full border border-gray-400 peer-checked:border-yellow-400 peer-checked:border-4 transition-all">
                <span className="absolute left-1 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-white hidden peer-checked:block"></span>
              </span>
              <span>در انتظار</span>
            </label>

            <label className="relative flex items-center gap-1 xs:gap-2 cursor-pointer text-xs xs:text-sm text-gray-800">
              <input
                type="radio"
                name="status"
                value="paid"
                className="peer absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 opacity-0"
              />
              <span className="relative h-4 w-4 rounded-full border border-gray-400 peer-checked:border-green-500 peer-checked:border-4 transition-all">
                <span className="absolute left-1 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-white hidden peer-checked:block"></span>
              </span>
              <span>پرداخت شده</span>
            </label>

            <label className="relative flex items-center gap-1 xs:gap-2 cursor-pointer text-xs xs:text-sm text-gray-800">
              <input
                type="radio"
                name="status"
                value="returned"
                className="peer absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 opacity-0"
              />
              <span className="relative h-4 w-4 rounded-full border border-gray-400 peer-checked:border-red-500 peer-checked:border-4 transition-all">
                <span className="absolute left-1 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-white hidden peer-checked:block"></span>
              </span>
              <span>برگشتی</span>
            </label>
          </form>
          <div className="w-full lg:w-auto flex justify-between lg:justify-end items-center gap-x-2">
            <div
              className={`w-auto flex justify-center items-center p-2 rounded-lg text-white text-xs xs:text-sm whitespace-nowrap
            ${
              status === "pendding"
                ? "bg-yellow-400"
                : status === "paid"
                ? "bg-green-600"
                : status === "returned"
                ? "bg-red-600"
                : ""
            }`}
            >
              وضعیت : پرداخت شده
            </div>
            <div className="flex items-center gap-x-1.5">
              <button
                onClick={() => setIsShowAction(!isShowAction)}
                className="cursor-pointer"
              >
                <IconActionDot
                  size="w-5 h-5 xs:w-6 xs:h-6 font-bold"
                  color="#8c66e5"
                />
              </button>

              <div className={`${isShowAction ? "flex gap-0.5" : "hidden"}`}>
                <button className="cursor-pointer">
                  <IconEdit size="w-6 h-6 font-bold" color="#e19ab3" />
                </button>
                <button className="cursor-pointer">
                  <IconDelete size="w-6 h-6 font-bold" color="#e19ab3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
