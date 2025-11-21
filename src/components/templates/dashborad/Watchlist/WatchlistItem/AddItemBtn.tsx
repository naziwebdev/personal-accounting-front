import { IconAdd } from "@/components/icons/IconAdd";
import { IconDownArrow } from "@/components/icons/IconDownAroow";
import { StatusFilterWatchlist } from "@/types/watchlist";
import React from "react";

type FilterProp = {
  statusItem: StatusFilterWatchlist;
  setStatusItem: React.Dispatch<React.SetStateAction<StatusFilterWatchlist>>;
  watchlistID: string;
};

export default function AddItemBtn({
  statusItem,
  setStatusItem,
  watchlistID,
}: FilterProp) {
  console.log(watchlistID);
  return (
    <div className="w-full flex flex-wrap gap-x-4 gap-y-6 mb-10 items-start justify-between">
      <button
        // onClick={() => setOpenModal(true)}
        className="flex justify-center items-center p-3 lg:p-4 gap-2  text-base xs:text-lg lg:text-[18px] bg-[var(--color-secondary)] text-white w-auto h-auto rounded-2xl lg:rounded-3xl shadow-xl cursor-pointer"
      >
        افزودن واچ لیست جدید
        <IconAdd size="w-6 h-6 lg:w-7 lg:h-7" color="#ffffff" />
      </button>
      <div className="flex gap-x-2 lg:gap-x-4 items-center">
        <p className="whitespace-nowrap text-zinc-600 font-semibold text-[.95rem] hidden sm:flex">
          فیلتر بر اساس :{" "}
        </p>
        <div className="relative flex gap-x-2 lg:gap-x-4 items-center">
          <select
            value={statusItem ?? "all"}
            onChange={(e) =>
              setStatusItem(
                e.target.value === "all"
                  ? null
                  : (e.target.value as StatusFilterWatchlist)
              )
            }
            className="text-sm xs:text-base w-24 xs:w-28 appearance-none shadow-sm shadow-zinc-300/50 bg-white py-1.5 px-4 placeholder:text-black rounded-lg text-black outline-0"
          >
            <option
              value={"all"}
              className="bg-[var(--color-primary)] text-white cursor-pointer"
            >
              همه
            </option>
            <option
              className="bg-[var(--color-primary)] text-white cursor-pointer"
              value={"pendding"}
            >
              در انتظار
            </option>
            <option
              className="bg-[var(--color-primary)] text-white cursor-pointer"
              value={"purchased"}
            >
              تکمیل شده
            </option>
          </select>
          <span className="absolute left-4 top-1/2 -translate-y-1/2 z-10 transform  pointer-events-none">
            <IconDownArrow size="w-3 h-3" color="#000" />
          </span>
        </div>
      </div>
    </div>
  );
}
