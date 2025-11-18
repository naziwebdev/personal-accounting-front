"use client";
import React from "react";
import { IconTarget } from "@/components/icons/IconTarget";
import { useState } from "react";
import { IconRightUpArrow } from "@/components/icons/IconRightUpArrow";
import { Watchlist } from "@/types/watchlist";
import Link from "next/link";
import { IconDelete } from "@/components/icons/IconDelete";
import { IconEdit } from "@/components/icons/IconEdit";
import { IconActionDot } from "@/components/icons/IconActiondot";

export default function WatchlistCard(Prop: Watchlist) {
  const [isPendding, setIsPendding] = useState<boolean>(
    Prop.status === "pendding"
  );
  const [isShowAction, setIsShowAction] = useState<boolean>(false);

  return (
    <div className="relative w-full xs:w-[350px] lg:w-[400px] rounded-3xl  p-3 xs:p-4 shadow-zinc-400 shadow-lg">
      {/* bg svg */}
      <div className=" svg-bg-shape absolute inset-0 w-full h-full -z-10 bg-white  rounded-3xl"></div>
      {/* blur */}

      {/* <div className="absolute inset-0 z-0 bg-white/10 rounded-3xl"></div> */}
      {/* content */}
      <div className="relative inset-0 z-20 rounded-3xl">
        <p
          className={`absolute left-1  -top-6 z-20 ${
            isPendding ? "bg-yellow-300" : "bg-[var(--color-primary)]"
          } text-white  px-4 py-1 rounded-lg text-sm sm:text-base shadow-lg shadow-black/20`}
        >
          {Prop.status === "pendding" ? "در اتظار" : "تکمیل شده"}
        </p>
        <div className="flex flex-col gap-3 xs:gap-3.5">
          <div className="flex items-center justify-center gap-4 xs:gap-6">
            <IconTarget size="w-[100px] h-[100px] xs:w-[120px] xs:h-[120px]" color="" />
            <div className="w-1/2 text-center">
              <p className="text-[var(--color-primary)] [text-shadow:_1px_1px_3px_rgba(0,0,0,0.7)] text-base xs:text-lg font-bold ">
                عنوان
              </p>
              <h4 className="font-titr font-bold text-xl xs:text-2xl [text-shadow:_1px_1px_4px_rgba(0,0,0,0.9)] text-white">
                {Prop.title}
              </h4>
            </div>
          </div>
          <div className="w-full flex items-center gap-x-2  text-center text-sm xs:text-base">
            <p>بودجه مورد نیاز </p>
            <p className="text-[var(--color-primary)] [text-shadow:_1px_1px_3px_rgba(0,0,0,0.9)] text-lg xs:text-xl  font-bold ">
              {`${Number(Prop.totalPrice).toLocaleString("fa-IR")} `}
              <span className="text-black text-shadow-none text-sm xs:text-base font-normal">
                تومان
              </span>
            </p>
          </div>
          <div className="w-full flex items-center gap-x-2 text-sm xs:text-base text-center">
            <p>بودجه تو </p>
            <p className="text-[var(--color-primary)] [text-shadow:_1px_1px_3px_rgba(0,0,0,0.9)] text-lg xs:text-xl font-bold ">
              {`${Number(Prop.currentBudget).toLocaleString("fa-IR")} `}
              <span className="text-black font-normal  text-shadow-none text-sm xs:text-base">
                تومان
              </span>
            </p>
          </div>
          <div className="flex gap-x-4">
            <p className=" text-white text-sm xs:text-base [text-shadow:_1px_1px_4px_rgba(0,0,0,0.9)]">
              تارگت زمانی تو{" "}
            </p>
            <p className="text-lg xs:text-xl font-bold text-yellow-300 font-titr">
              {Prop.waitingPeriod === "day"
                ? "یک روز"
                : Prop.waitingPeriod === "month"
                ? "یک ماه"
                : Prop.waitingPeriod === "year"
                ? "یک سال"
                : Prop.waitingPeriod === "week"
                ? "یک هفته"
                : "-"}
            </p>
          </div>
          <p className="text-[var(--color-theme)] [text-shadow:_1px_1px_3px_rgba(0,0,0,0.7)] tracking-wider leading-7 text-sm xs:text-base text-center xs:text-right">
            برای خرید این لیست هر روز باید{" "}
            <span className="text-lg xs:text-xl font-bold text-[var(--color-primary)] underline underline-offset-8">
              {`${Number(Prop.requiredSavingsPerDay).toLocaleString("fa-IR")} `}{" "}
              تومان{" "}
            </span>{" "}
            پس انداز کنی
          </p>
          <div className="relative w-full flex items-center justify-between mt-2 pr-2">
            <div className="flex items-center gap-x-4">
              <Link
                href={`/dashboard/watchlist/${Prop.id}`}
                className="relative flex justify-center items-center p-1 rounded-full bg-black cursor-pointer group"
              >
                <IconRightUpArrow size="w-7 h-7" color="#fff" />
                <span className="absolute top-0 -left-1  w-[90%] h-[133%] rounded-l-full  border-[var(--color-primary)] rotate-[-45deg] border-[3.5px] border-r-0 pointer-events-none"></span>
              </Link>
            </div>

            <div className="flex  items-center gap-x-2">
              <div
                className={`flex w-[60px] sm:w-[65px] border-[3px] border-black  ${
                  isPendding ? "justify-end" : "justify-start"
                } rounded-2xl p-0.5`}
              >
                <button
                  className={`w-6 h-6 cursor-pointer rounded-full  ${
                    isPendding ? "bg-yellow-300" : "bg-[var(--color-primary)]"
                  }`}
                ></button>
              </div>
              <button
                onClick={() => setIsShowAction(!isShowAction)}
                className="cursor-pointer"
              >
                <IconActionDot
                  size="w-5 h-5 xs:w-6 xs:h-6 font-bold"
                  color="#000"
                />
              </button>
              <div className={`${isShowAction ? "flex" : "hidden"}`}>
                <button className="cursor-pointer">
                  <IconDelete size="w-6 h-6" color="#e4e2f1" />
                </button>
                <button className="cursor-pointer">
                  <IconEdit size="w-6 h-6" color="#e4e2f1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
