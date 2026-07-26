import React from "react";

export default function NotifBox() {
  return (
    <>
      <div className="flex items-center justify-between w-full bg-[var(--color-primary)] rounded-t-lg px-4 py-0.5 text-white">
        <p>پیام ها</p>
        <p className="text-xs">خواندن همه ✓</p>
      </div>
      <ul className="py-2">
        <li className="px-4 py-2 border-b-[1px] border-stone-200">
          <div className="flex justify-between items-center text-sm">
            <p className="bg-black text-white rounded-md py-0.5 px-2 text-xs">
              موعد چک
            </p>
            <button className="bg-[var(--color-secondary)] text-white rounded-md py-0.5 px-2 text-xs cursor-pointer">
              خواندم
            </button>
          </div>
          <p className="text-xs text-zinc-600 pt-0.5">
            موعد چک شما در تاریخ امروز هست
          </p>
        </li>
        <li className="px-4 py-2 border-b-[1px] border-stone-200">
          <div className="flex justify-between items-center text-sm">
            <p className="bg-black text-white rounded-md py-0.5 px-2 text-xs">
              موعد چک
            </p>
            <button className="bg-[var(--color-secondary)] text-white rounded-md py-0.5 px-2 text-xs cursor-pointer">
              خواندم
            </button>
          </div>
          <p className="text-xs text-zinc-600 pt-0.5">
            موعد چک شما در تاریخ امروز هست
          </p>
        </li>
        <li className="px-4 py-2">
          <div className="flex justify-between items-center text-sm">
            <p className="bg-black text-white rounded-md py-0.5 px-2 text-xs">
              موعد چک
            </p>
            <button className="bg-[var(--color-secondary)] text-white rounded-md py-0.5 px-2 text-xs cursor-pointer">
              خواندم
            </button>
          </div>
          <p className="text-xs text-gray-600 pt-0.5">
            موعد چک شما در تاریخ امروز هست
          </p>
        </li>
      </ul>
    </>
  );
}
