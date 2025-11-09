"use client";
import { IconAdd } from "@/components/icons/IconAdd";
import { IconDownArrow } from "@/components/icons/IconDownAroow";
import React from "react";
import { TypeFilterItem } from "@/types/debt";

type FilterTypeProp = {
  setType: React.Dispatch<React.SetStateAction<TypeFilterItem>>;
  typeItem: TypeFilterItem;
};
export default function AddItemBtn({ setType, typeItem }: FilterTypeProp) {
  return (
    <>
      <div className="w-full flex flex-wrap gap-x-4 gap-y-6 mb-10 items-start justify-between">
        <button className="flex justify-center items-center p-3 lg:p-4 gap-2  text-base xs:text-lg lg:text-[18px] bg-[var(--color-secondary)] text-white w-auto h-auto rounded-2xl lg:rounded-3xl shadow-xl cursor-pointer">
          افزودن بدهی/طلب جدید
          <IconAdd size="w-6 h-6 lg:w-7 lg:h-7" color="#ffffff" />
        </button>
        <div className="flex gap-x-2 lg:gap-x-4 items-center">
          <p className="whitespace-nowrap font-semibold text-[.95rem] hidden sm:flex">
            فیلتر بر اساس :{" "}
          </p>
          <div className="relative flex gap-x-2 lg:gap-x-4 items-center">
            <select
              id="bankCardID"
              className="text-sm xs:text-base w-24 xs:w-28 appearance-none shadow-sm shadow-zinc-300/50 bg-white py-1.5 px-4 placeholder:text-black rounded-lg text-black outline-0"
            >
              <option
                value={"all"}
                className="bg-[var(--color-primary)] text-white"
              >
                همه
              </option>
              <option
                className="bg-[var(--color-primary)] text-white"
                value={"pendding"}
              >
                در انتظار پرداخت
              </option>
              <option
                className="bg-[var(--color-primary)] text-white"
                value={"paid"}
              >
                پرداخت شده
              </option>
            </select>
            <span className="absolute left-4 top-1/2 -translate-y-1/2 z-10 transform  pointer-events-none">
              <IconDownArrow size="w-3 h-3" color="#000" />
            </span>
          </div>

          <div className="text-sm xs:text-base w-1/2 flex justify-between items-center bg-white rounded-4xl shadow-sm shadow-zinc-300/50">
            <button
              onClick={() => setType("debt")}
              className={`cursor-pointer py-1.5 px-4  h-full rounded-full ${
                typeItem === "debt"
                  ? "bg-[var(--color-secondary)] text-white xs:px-5"
                  : ""
              }`}
            >
              بدهی
            </button>
            <button
              onClick={() => setType("receivable")}
              className={` cursor-pointer py-1.5 px-4 h-full rounded-full ${
                typeItem === "receivable"
                  ? "bg-[var(--color-primary)] text-white xs:px-5"
                  : ""
              }`}
            >
              طلب
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
