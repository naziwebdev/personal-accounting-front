"use client";

import React from "react";
import { ICONS } from "../../../../config/categoryIcons";
import { IconIncome } from "@/components/icons/category/IconIncome";
import { IconExpense } from "@/components/icons/category/IconExpense";
import CategoryCard from "./CategoryCard";

export default function CategoryList() {
  const iconList = Object.entries(ICONS);
  return (
    <div className="flex justify-between px-32">
      <section className="w-1/3">
        <div className="flex items-center gap-4">
          <div className="flex justify-center items-center w-20 h-20 rounded-full bg-[var(--color-secondary)] shadow-lg shadow-zinc-500/40 ">
            <IconIncome size="w-14 h-14" color="#fff" />
          </div>
          <h3 className="text-[1.4rem] font-titr text-black text-shadow-[2px_2px_4px_white] text-shadow-xl">
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
      <section className="w-1/3">
        <div className="flex items-center gap-4">
          <div className="flex justify-center items-center w-20 h-20 rounded-full bg-[var(--color-primary)] shadow-lg shadow-zinc-500/40">
            <IconExpense size="w-14 h-14" color="#fff" />
          </div>
          <h3 className="text-[1.4rem] font-titr text-black text-shadow-[2px_2px_4px_white] text-shadow-xl">
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
