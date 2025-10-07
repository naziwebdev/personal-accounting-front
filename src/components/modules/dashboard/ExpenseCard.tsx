"use client";

import React, { useState } from "react";
import { IconCardExpense } from "@/components/icons/IconCardExpense";
import { IconUpDirection } from "@/components/icons/IconUpDirection";
import { IconActionDot } from "@/components/icons/IconActiondot";
import { IconDelete } from "@/components/icons/IconDelete";
import { IconEdit } from "@/components/icons/IconEdit";

export default function ExpenseCard() {
  const [isShowAction, setIsShowAction] = useState<boolean>(false);
  return (
    <div className="relative w-full xs:w-[350px] lg:w-[400px] bg-white rounded-3xl  p-3 xs:p-4 shadow-lg">
      <div className="absolute left-0 top-0 w-1/3 xs:w-1/4 p-1 rounded-tl-2xl rounded-br-2xl flex justify-center items-center gap-1 bg-red-100/80 text-sm xs:text-base font-bold ">
        <IconUpDirection size="w-6 h-5" color="#cc0e50" />
        <p className="text-[#cc0e50]">برداشت</p>
      </div>
      <div className="absolute top-9 xs:top-12 left-4 flex gap-1">
        <button
          onClick={() => setIsShowAction(!isShowAction)}
          className="cursor-pointer"
        >
          <IconActionDot
            size="w-5 h-5 xs:w-6 xs:h-6 font-bold"
            color="#e19ab3"
          />
        </button>

        <div className={`${isShowAction ? "flex" : "hidden"}`}>
          <button>
            <IconEdit size="w-6 h-6 font-bold" color="#e19ab3" />
          </button>
          <button>
            <IconDelete size="w-6 h-6 font-bold" color="#e19ab3" />
          </button>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <IconCardExpense size="xs:w-12 xs:h-12 w-9 h-9" color="#8c66e5" />
        <p className="font-black text-gray-800">بلو بانک </p>
      </div>
      <div className="flex justify-between items-center pt-2 xs:pt-4">
        <div className="text-center">
          <p className="pb-1.5 text-gray-500">مبلغ</p>
          <p className="text-[var(--color-secondary)] font-black text-lg xs:text-xl">
            ۱۲۰۰۰۰۰{" "}
            <span className="text-[var(--color-secondary)] font-medium text-base">
              تومان
            </span>
          </p>
        </div>
        <div className="text-center">
          <p className="pb-1.5 text-gray-500">تاریخ</p>
          <p className="text-gray-800 font-bold text-sm xs:text-base">
            ۱۴۰۴/۷/۱۴
          </p>
        </div>
      </div>
      <div className="w-full flex justify-between bg-pink-50/40 p-2.5 xs:p-4 mt-3 xs:mt-4 border-[1px] border-[var(--color-primary)]/70 rounded-2xl text-sm xs:text-base">
        <div className="flex gap-1 border-l-[2px] border-[var(--color-primary)]/70 w-1/2">
          <p className="text-gray-500">عنوان : </p>
          <p className="text-gray-800 font-bold">تولد</p>
        </div>
        <div className="flex gap-1 ps-3 xs:ps-0">
          <p className="text-gray-500 whitespace-nowrap">دسته بندی : </p>
          <p className="text-gray-800 font-bold">هدیه</p>
        </div>
      </div>
    </div>
  );
}
