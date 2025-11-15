"use client";

import React, { useState } from "react";
import { IconIncome } from "@/components/icons/category/IconIncome";
import { IconExpense } from "@/components/icons/category/IconExpense";
import CategoryCard from "./CategoryCard";
import { useCategoriesByType } from "@/hooks/useCategories";

type CategoryType = "income" | "expense";

export default function CategoryList() {

  const [showCategoryTypeInSmSize, setShowCategoryTypeInSmSize] =
    useState<CategoryType>("income");

  const { data: incomeCategories } = useCategoriesByType("income");
  const { data: expenseCategories } = useCategoriesByType("expense");

  return (
    <div className="flex flex-wrap sm:flex-nowrap gap-y-10 justify-center sm:justify-between  xl:px-32">
      <div className="flex justify-between items-center gap-x-2 sm:hidden w-1/2 bg-white rounded-4xl shadow-lg shadow-zinc-400/50">
        <button
          onClick={() => setShowCategoryTypeInSmSize("income")}
          className={`cursor-pointer py-2.5 px-4 font-semibold w-1/2 h-full rounded-full ${
            showCategoryTypeInSmSize === "income"
              ? "bg-[var(--color-secondary)] text-white w-3/5"
              : ""
          }`}
        >
          واریز
        </button>
        <button
          onClick={() => setShowCategoryTypeInSmSize("expense")}
          className={`cursor-pointer py-2.5 px-4 font-semibold w-1/2 h-full rounded-full ${
            showCategoryTypeInSmSize === "expense"
              ? "bg-[var(--color-primary)] text-white w-3/5"
              : ""
          }`}
        >
          برداشت
        </button>
      </div>
      <section
        className={`w-full xl:w-1/3 ${
          showCategoryTypeInSmSize === "expense" && "hidden sm:flex"
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="flex justify-center items-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-[var(--color-secondary)] shadow-lg shadow-zinc-500/40 ">
            <IconIncome size="w-10 h-10 md:w-14 md:h-14" color="#fff" />
          </div>
          <h3 className="text-xl md:text-[1.4rem] font-titr text-black text-shadow-[2px_2px_4px_white] text-shadow-xl">
            دسته بندی واریز ها
          </h3>
        </div>
        <div className="w-full mt-10">
          {incomeCategories?.map((category) => (
            <CategoryCard
              key={category.id}
              {...category}
              color="bg-violet-300"
              bgIcon="bg-[var(--color-secondary)]"
            />
          ))}
        </div>
      </section>
      <section
        className={`w-full xl:w-1/3 ${
          showCategoryTypeInSmSize === "income" && "hidden sm:block"
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="flex justify-center items-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-[var(--color-primary)] shadow-lg shadow-zinc-500/40">
            <IconExpense size="w-10 h-10 md:w-14 md:h-14" color="#fff" />
          </div>
          <h3 className="text-xl md:text-[1.4rem] font-titr text-black text-shadow-[2px_2px_4px_white] text-shadow-xl">
            دسته بندی برداشت ها
          </h3>
        </div>
        <div className="w-full mt-10">
          {expenseCategories?.map((category) => (
            <CategoryCard
              key={category.id}
              {...category}
              color="bg-[#f3d2dc]"
              bgIcon="bg-[var(--color-primary)]"
            />
          ))}
        </div>
      </section>
    </div>
  );
}

