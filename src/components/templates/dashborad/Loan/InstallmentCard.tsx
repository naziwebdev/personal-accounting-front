"use client";
import React, { useState } from "react";

export default function InstallmentCard() {
  const [isPendding, setIsPendding] = useState<boolean>(false);

  return (
    <div className="w-full xs:w-[350px] lg:w-[400px] rounded-xl shadow-zinc-300/80 shadow-sm bg-white p-2.5 xs:p-4 border-r-8 border-r-zinc-600">
      <div className="flex items-center justify-between">
        <p className="text-zinc-800 text-base lg:text-lg">قسط ۱</p>
        <p className="text-zinc-800 text-base lg:text-lg proportional-nums">
          ۲۰۰۰۰۰۰ <span className="text-base text-zinc-800">تومان</span>
        </p>
      </div>
      <div className="pt-2 flex items-center justify-between">
        <p className="text-zinc-800 text-sm lg:text-base">۱۴۰۴/۱۰/۱۲</p>
        <div className="flex items-center gap-x-2">
          <p
            className={`text-xs p-1 rounded-md text-white ${
              isPendding
                ? "bg-yellow-400 justify-end"
                : "bg-green-500 justify-start"
            }`}
          >
            پرداخت نشده
          </p>
          <div
            className={`flex w-[55px] sm:w-[60px] ${
              isPendding
                ? "bg-yellow-400 justify-end"
                : "bg-green-500 justify-start"
            } rounded-2xl p-1`}
          >
            <button
              className={`w-5 h-5 cursor-pointer rounded-full bg-white`}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
}
