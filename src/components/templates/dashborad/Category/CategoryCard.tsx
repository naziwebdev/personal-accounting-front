import React from "react";
import { IconActionDot } from "@/components/icons/IconActiondot";
import { IconDollar } from "@/components/icons/category/IconDollar";

type CategoryCardProps = {
  color: string;
  bgIcon: string;
};

export default function CategoryCard({ color, bgIcon }: CategoryCardProps) {
  return (
    <div
      className={`relative mt-4 ms-14 flex justify-between items-center w-10/12 p-4 ${color} rounded-xl shadow-lg shadow-zinc-400/50`}
    >
      <div className="shape absolute w-8 h-[110%] -right-6 -top-1/2 -z-20 border-t-0 border-l-0 border-[3.5px] border-black border-dashed"></div>
      <div className="flex items-center gap-x-5">
        <div
          className={`flex justify-center items-center w-[4.15rem] h-[4.15rem] rounded-full  shadow-lg shadow-zinc-500/40 ${bgIcon} border-4 border-white border-dotted `}
        >
          <IconDollar size="w-10 h-10" color="#fff" />
        </div>
        <p className="text-xl text-shadow-[1px_1px_2px_gray] text-white">
          هدیه
        </p>
      </div>
      <button className="cursor-pointer">
        <IconActionDot size="w-7 h-7" color="#fff" />
      </button>
    </div>
  );
}
