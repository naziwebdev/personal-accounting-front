"use client";
import React, { useState } from "react";
import { IconProfile } from "@/components/icons/IconProfile";
import { IconActionDot } from "@/components/icons/IconActiondot";
import { IconDelete } from "@/components/icons/IconDelete";
import { toPersianDigits } from "@/utils/normalizeDigits";

type NotePropType = {
  color: string;
  bgColor: string;
  border: string;
  title: string;
  description: string;
  createdAt: string;
};

export default function NoteCard({
  color,
  bgColor,
  border,
  title,
  description,
  createdAt,
}: NotePropType) {
  const [toggleEditBtn, setToggleEditBtn] = useState<boolean>(false);
  return (
    <div
      className={`w-full xs:w-[350px] lg:w-[370px] ${bgColor}  rounded-xl border-b-2 ${border} p-3 shadow-xl`}
    >
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-x-3 ">
          <IconProfile color={color} />
          <div className="text-sm">
            <p className="pb-1 font-semibold text-sm xs:text-base">{title}</p>
            <p className="text-zinc-500 text-xs xs:text-sm">
              {toPersianDigits(createdAt.toLocaleString().split(" ")[0])}
            </p>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setToggleEditBtn(!toggleEditBtn)}
            className="cursor-pointer"
          >
            <IconActionDot size="w-6 h-6" color={color} />
          </button>

          {toggleEditBtn && (
            <>
              <button
                className="absolute flex justify-center items-center -right-7 top-8 cursor-pointer rounded-md bg-white px-2 py-0.5
            text-sm shadow-sm shadow-zinc-300/50"
              >
                ویرایش
              </button>
              <button
                className="absolute flex justify-center items-center -right-7 top-16 cursor-pointer rounded-md bg-white px-1.5 py-0.5
            text-sm shadow-sm shadow-zinc-300/50"
              >
                مشاهده
              </button>
            </>
          )}
        </div>
      </div>
      <div className="h-16 sm:h-22">
        <p className="truncate text-sm xs:text-[.9rem] pt-4 text-white">
          {description}
        </p>
      </div>

      <button className="w-full flex items-center justify-end text-xl cursor-pointer font-bold">
        <IconDelete size="w-6 h-6" color={color} />
      </button>
    </div>
  );
}
