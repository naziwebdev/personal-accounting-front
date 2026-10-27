"use client";

import React from "react";
import { useState } from "react";
import { IconDownArrow } from "@/components/icons/IconDownAroow";
import type { Dispatch, SetStateAction } from "react";

const months = [
  { value: "01", label: "فروردین" },
  { value: "02", label: "اردیبهشت" },
  { value: "03", label: "خرداد" },
  { value: "04", label: "تیر" },
  { value: "05", label: "مرداد" },
  { value: "06", label: "شهریور" },
  { value: "07", label: "مهر" },
  { value: "08", label: "آبان" },
  { value: "09", label: "آذر" },
  { value: "10", label: "دی" },
  { value: "11", label: "بهمن" },
  { value: "12", label: "اسفند" },
];

type MonthSelected = {
  monthSelected: string;
  setMonthSelected: Dispatch<SetStateAction<string>>;
};

export default function CustomSelectBox({
  monthSelected,
  setMonthSelected,
}: MonthSelected) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const selectedMonth = months.find((month) => month.value === monthSelected);

  return (
    <div className="relative w-24 xs:w-28">
      {/* Select button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className=" flex w-full items-center justify-between rounded-lg bg-white px-4 py-1.5 text-sm text-black shadow-sm shadow-zinc-300/50 outline-none xs:text-base "
      >
        <span>{selectedMonth?.label}</span>
        <span
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          {" "}
          <IconDownArrow size="w-3 h-3" color="#000" />{" "}
        </span>
      </button>
      {/* Dropdown */}

      {isOpen && (
        <ul
          role="listbox"
          aria-label="انتخاب ماه"
          className=" absolute right-0 top-full z-50 mt-2 max-h-40 w-full overflow-y-auto overscroll-contain rounded-lg bg-white p-1 shadow-lg shadow-zinc-300/50 "
        >
          {" "}
          {months.map((month) => {
            const isSelected = month.value === monthSelected;
            return (
              <li key={month.value} role="presentation">
                {" "}
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    setMonthSelected(month.value);
                    setIsOpen(false);
                  }}
                  className={` w-full rounded-md px-3 py-2 text-right text-sm transition-colors ${
                    isSelected
                      ? "bg-[var(--color-primary)] text-white"
                      : "text-black hover:bg-zinc-100"
                  } `}
                >
                  {" "}
                  {month.label}{" "}
                </button>{" "}
              </li>
            );
          })}{" "}
        </ul>
      )}
    </div>
  );
}
