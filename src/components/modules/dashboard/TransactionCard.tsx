import React from "react";
import { IconCardIncom } from "@/components/icons/IconCardIncome";
import { IconDownDirection } from "@/components/icons/IconDownDirection";

export default function TransactionCard() {
  return (
    <div className="relative w-full xs:w-[350px] lg:w-[400px] bg-white rounded-3xl p-4 shadow-lg">
      <div className="absolute left-0 top-0 w-1/4 p-1 rounded-tl-2xl rounded-br-2xl     flex justify-center items-center gap-1 bg-green-100 text-sm font-bold ">
        <IconDownDirection size="w-6 h-5" color="#3db810" />
        <p className="text-[#3db810]">واریز</p>
      </div>
      <div className="flex gap-2 items-center">
        <IconCardIncom size="w-11 h-11" color="#9d51ef" />
        <p className="font-black text-gray-800">بلو بانک </p>
      </div>
      <div className="flex justify-between items-center pt-4">
        <div className="text-center">
          <p className="pb-2 text-gray-500">مبلغ</p>
          <p className="text-[var(--color-secondary)] font-bold text-xl">
            ۱۲۰۰۰۰۰ <span className="text-gray-500 font-medium text-base">تومان</span>
          </p>
        </div>
        <div className="text-center">
          <p className="pb-2 text-gray-500">تاریخ</p>
          <p className="text-gray-800 font-bold">۱۴۰۴/۷/۱۴</p>
        </div>
      </div>
      <div className="w-full font-bold flex justify-between bg-pink-50/40 p-4  mt-4 border-4 border-[var(--color-primary)] rounded-2xl">
        <div className="flex gap-2 border-l-[3px] border-[var(--color-primary)] w-1/2">
          <p className="text-gray-500">عنوان : </p>
          <p className="text-gray-800">تولد</p>
        </div>
        <div className="flex gap-2">
          <p className="text-gray-500">دسته بندی : </p>
          <p className="text-gray-800">هدیه</p>
        </div>
      </div>
    </div>
  );
}
