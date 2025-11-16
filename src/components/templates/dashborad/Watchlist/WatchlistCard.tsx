"use client";
import React from "react";
import { IconTarget } from "@/components/icons/IconTarget";
import { useState } from "react";
import { IconRightUpArrow } from "@/components/icons/IconRightUpArrow";

export default function WatchlistCard() {
  const [isPendding, setIsPendding] = useState<boolean>(false);
  return (
    <div className="relative w-auto rounded-3xl  p-3 xs:p-4 shadow-zinc-300/80 shadow-sm">
      {/* bg svg */}
      <div className=" svg-bg-shape absolute inset-0 w-full h-full -z-10 bg-white  rounded-3xl"></div>
      {/* blur */}

      {/* <div className="absolute inset-0 z-0 bg-white/10 rounded-3xl"></div> */}
      {/* content */}
      <div className="relative inset-0 z-20 rounded-3xl">
        <p className="absolute left-1 xs:translate-none -top-6 xs:-top-5 xs:-left-9 z-20 bg-yellow-300 text-white  px-4 py-1 rounded-lg xs:-rotate-[30deg] text-sm sm:text-base">
          در انتظار
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-0 sm:gap-4">
          <IconTarget
            size="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px]"
            color=""
          />
          <div className="flex-1">
            <p className="text-[var(--color-primary)] [text-shadow:_1px_1px_3px_rgba(0,0,0,0.7)] text-base sm:text-lg font-bold ">
              عنوان
            </p>
            <h4 className="font-titr font-bold text-xl sm:text-2xl [text-shadow:_1px_1px_4px_rgba(0,0,0,0.9)] text-white">
              لیست خرید روزانه
            </h4>
            <div className="w-full flex gap-x-2 mt-3 sm:mt-4 text-center">
              <p className="font-bold">بودجه مورد نیاز </p>
              <p className="text-[var(--color-primary)] [text-shadow:_1px_1px_3px_rgba(0,0,0,0.9)] text-xl sm:text-2xl font-bold ">
                ۴۰۰۰۰۰۰{" "}
                <span className="text-black font-base text-shadow-none text-sm">
                  تومان
                </span>
              </p>
            </div>
            <div className="w-full flex gap-x-2 mt-1 sm:mt-2 text-center">
              <p className="font-bold">بودجه تو </p>
              <p className="text-[var(--color-primary)] [text-shadow:_1px_1px_3px_rgba(0,0,0,0.9)] text-xl sm:text-2xl font-bold ">
                ۲۰۰۰۰۰{" "}
                <span className="text-black font-base text-shadow-none text-sm">
                  تومان
                </span>
              </p>
            </div>
            <div className="flex gap-x-4 mt-2">
              <p className="font-semibold text-white [text-shadow:_1px_1px_4px_rgba(0,0,0,0.9)]">
                تارگت زمانی تو{" "}
              </p>
              <p className=" text-xl sm:text-2xl font-bold text-yellow-300 font-titr">
                یک سال
              </p>
            </div>
          </div>
        </div>
        <p className="mt-3 sm:mt-4 text-[var(--color-theme)] [text-shadow:_1px_1px_3px_rgba(0,0,0,0.7)] text-sm tracking-wider leading-7 font-bold ">
          برای خرید این لیست هر روز باید{" "}
          <span className="text-xl sm:text-2xl font-bold text-yellow-300">
            ۱۰۰۰۰ تومان{" "}
          </span>{" "}
          پس انداز کنی
        </p>
        <div className="mt-4 relative w-full flex items-center justify-between pr-2">
          <button className="px-6 py-1.5 flex justify-center items-center text-white rounded-2xl bg-[var(--color-primary)] cursor-pointer shadow-sm shadow-zinc-500 text-sm sm:text-base">
            مشاهده
          </button>
          <span className="w-7 h-7 rounded-full bg-black flex items-center justify-center absolute -right-1 -top-1 z-10">
            <IconRightUpArrow size="w-6 h-6" color="#fff" />
          </span>
          <div className="flex  items-center gap-x-2.5">
            <div
              className={`flex items-center w-auto gap-x-2 border-[3px] rounded-2xl px-2 py-1 ${
                isPendding ? " justify-end" : "justify-start"
              } `}
            >
              <button
                className={`w-6 h-6 cursor-pointer rounded-full  ${
                  isPendding ? "bg-[var(--color-primary)]" : "bg-lime-300"
                }`}
              ></button>
              <span
                className={`whitespace-nowrap text-white ${
                  isPendding ? "-order-5" : "order-5"
                }
                text-xs sm:text-[.85rem]`}
              >
                {!isPendding ? "در انتظار" : "تکمیل شده"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
