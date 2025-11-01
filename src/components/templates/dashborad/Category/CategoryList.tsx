"use client";

import React, { useState } from "react";
import { ICONS } from "../../../../config/categoryIcons";
import { IconIncome } from "@/components/icons/category/IconIncome";
import { IconExpense } from "@/components/icons/category/IconExpense";
import CategoryCard from "./CategoryCard";

type CategoryType = "income" | "expense";

export default function CategoryList() {
  // const iconList = Object.entries(ICONS);

  const [showCategoryTypeInSmSize, setShowCategoryTypeInSmSize] =
    useState<CategoryType>("income");

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
          showCategoryTypeInSmSize === "expense" && "hidden"
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
          <CategoryCard
            color="bg-violet-300"
            bgIcon="bg-[var(--color-secondary)]"
          />
          <CategoryCard
            color="bg-violet-300"
            bgIcon="bg-[var(--color-secondary)]"
          />
          <CategoryCard
            color="bg-violet-300"
            bgIcon="bg-[var(--color-secondary)]"
          />
          <CategoryCard
            color="bg-violet-300"
            bgIcon="bg-[var(--color-secondary)]"
          />
          <CategoryCard
            color="bg-violet-300"
            bgIcon="bg-[var(--color-secondary)]"
          />
          <CategoryCard
            color="bg-violet-300"
            bgIcon="bg-[var(--color-secondary)]"
          />
        </div>
      </section>
      <section
        className={`w-full xl:w-1/3 ${
          showCategoryTypeInSmSize === "income" && "hidden"
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
          <CategoryCard
            color="bg-[#f3d2dc]"
            bgIcon="bg-[var(--color-primary)]"
          />
          <CategoryCard
            color="bg-[#f3d2dc]"
            bgIcon="bg-[var(--color-primary)]"
          />
          <CategoryCard
            color="bg-[#f3d2dc]"
            bgIcon="bg-[var(--color-primary)]"
          />
          <CategoryCard
            color="bg-[#f3d2dc]"
            bgIcon="bg-[var(--color-primary)]"
          />
          <CategoryCard
            color="bg-[#f3d2dc]"
            bgIcon="bg-[var(--color-primary)]"
          />
          <CategoryCard
            color="bg-[#f3d2dc]"
            bgIcon="bg-[var(--color-primary)]"
          />
        </div>
      </section>
    </div>
  );
}

// {
//    {iconList.map(([key, { component: Icon, title }]) => (
//         <div key={key} className="flex flex-col items-center gap-2">
//           <Icon size="w-14 h-14" color="#000000" />
//           <span className="text-xs text-gray-600">{title}</span>
//         </div>
//       ))}
// }
