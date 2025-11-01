"use client";
import React from "react";
import { IconActionDot } from "@/components/icons/IconActiondot";
import { IconDollar } from "@/components/icons/category/IconDollar";
import { ICONS } from "../../../../config/categoryIcons";

type CategoryCardProps = {
  id: number;
  title: string;
  type: "income" | "expense";
  icon: string;
  color: string;
  bgIcon: string;
};

export default function CategoryCard({
  id,
  title,
  type,
  icon,
  color,
  bgIcon,
}: CategoryCardProps) {
  const isValidIcon = icon in ICONS;

  const IconComponent = isValidIcon
    ? ICONS[icon as keyof typeof ICONS].component
    : null;

  return (
    <div
      className={`relative mt-4 ms-14 flex gap-x-2 justify-between items-center w-2/3 xl:w-10/12 p-4 ${color} rounded-xl shadow-lg shadow-zinc-400/50`}
    >
      <div className="shape absolute w-8 h-[110%] -right-6 -top-1/2 -z-20 border-t-0 border-l-0 border-[3.5px] border-black border-dashed"></div>
      <div className="flex items-center gap-x-3 xl:gap-x-5">
        <div
          className={`flex justify-center items-center w-14 h-14 md:w-[4.15rem] md:h-[4.15rem] rounded-full  shadow-lg shadow-zinc-500/40 ${bgIcon} border-4 border-white border-dotted `}
        >
          {IconComponent ? (
            <IconComponent size="w-6 h-6 md:w-10 md:h-10" color="#fff" />
          ) : (
            <IconDollar size="w-6 h-6 md:w-10 md:h-10" color="#fff" />
          )}
        </div>
        <p className="text-base md:text-xl text-shadow-[1px_1px_2px_gray] text-white">
          {title}
        </p>
      </div>
      <button className="cursor-pointer">
        <IconActionDot size="w-5 h-5 md:w-7 md:h-7" color="#fff" />
      </button>
    </div>
  );
}
