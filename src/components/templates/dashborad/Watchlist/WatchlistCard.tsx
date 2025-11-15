import React from "react";
import { IconTarget } from "@/components/icons/IconTarget";

export default function WatchlistCard() {
  return (
    <div className="relative w-full xs:w-[400px] lg:w-[450px]  rounded-3xl  p-3 xs:p-4 shadow-zinc-300/80 shadow-sm">
      {/* bg svg */}
      <div className=" svg-bg-shape absolute inset-0 w-full h-full -z-10 bg-white  rounded-3xl"></div>
      {/* blur */}

      {/* <div className="absolute inset-0 z-0 bg-white/10 rounded-3xl"></div> */}
      {/* content */}
      <div className="relative inset-0 z-20 rounded-3xl">
        <p className="absolute left-1/2 -translate-x-1/2 xs:translate-none -top-4 xs:-top-5 xs:-left-9 z-20 bg-yellow-300 text-white  px-4 py-1 rounded-lg xs:-rotate-[30deg]">
          در انتظار
        </p>
        <div className="flex items-center  gap-x-4">
          <IconTarget />
          <div className="flex-1">
            <p className="text-[var(--color-primary)] [text-shadow:_1px_1px_3px_rgba(0,0,0,0.7)] text-lg font-bold ">
              عنوان
            </p>
            <h4 className="font-titr font-bold text-2xl [text-shadow:_1px_1px_4px_rgba(0,0,0,0.9)] text-white">
              لیست خرید روزانه
            </h4>
            <div className="w-full flex gap-x-2 mt-4 text-center">
              <p className="font-bold">بودجه مورد نیاز </p>
              <p className="text-[var(--color-primary)] [text-shadow:_1px_1px_3px_rgba(0,0,0,0.9)] text-2xl font-bold ">
                ۴۰۰۰۰۰۰{" "}
                <span className="text-black font-base text-shadow-none text-sm">
                  تومان
                </span>
              </p>
            </div>
            <div className="w-full flex gap-x-2 mt-2 text-center">
              <p className="font-bold">بودجه تو </p>
              <p className="text-[var(--color-primary)] [text-shadow:_1px_1px_3px_rgba(0,0,0,0.9)] text-2xl font-bold ">
                ۲۰۰۰۰۰{" "}
                <span className="text-black font-base text-shadow-none text-sm">
                  تومان
                </span>
              </p>
            </div>
            <div className="flex gap-x-4 mt-2">
              <p className="font-semibold text-white [text-shadow:_1px_1px_4px_rgba(0,0,0,0.9)]">
                تارگت زمانی تو{" "}
              </p>
              <p className="text-2xl font-bold text-yellow-300 font-titr">
                یک سال
              </p>
            </div>
          </div>
        </div>
        <p className="mt-4 text-[var(--color-theme)] [text-shadow:_1px_1px_3px_rgba(0,0,0,0.7)] text-sm tracking-wider leading-7 font-bold ">
          برای خرید این لیست هر روز باید{" "}
          <span className="text-2xl font-bold text-yellow-300">
            ۱۰۰۰۰ تومان{" "}
          </span>{" "}
          پس انداز کنی
        </p>
        <div className="w-full flex justify-center">
          <button className=" mt-4 w-1/3  p-1.5 flex justify-center items-center text-white rounded-xl bg-[var(--color-primary)] cursor-pointer shadow-sm shadow-zinc-500 text-[.95rem]">
            مشاهده لیست
          </button>
        </div>
      </div>
    </div>
  );
}
