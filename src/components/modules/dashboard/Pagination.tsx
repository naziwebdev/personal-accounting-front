"use client";
import Link from "next/link";
import React from "react";
import { IconLeftArrow } from "@/components/icons/IconLeftArrow";
import { IconRightArrow } from "@/components/icons/IconRightArrow";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type PaginationPropsType = {
  itemes: object[];
  itemsLimit: number;
  pathname: string;
  totalItems: number;
  setShowItems: (value: any) => void;
};

export default function Pagination({
  itemes,
  itemsLimit,
  pathname,
  totalItems,
  setShowItems,
}: PaginationPropsType) {
  const [pageCount, setPageCount] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const page: any = searchParams.get("page");

  useEffect(() => {
    setShowItems(itemes);

    let pageNumbers = Math.ceil(totalItems / itemsLimit);
    setPageCount(pageNumbers);
  }, [page, itemes]);

  return (
    <div className="mt-10">
      <ul className="flex justify-center items-center gap-x-2.5 sm:gap-x-3.5">
        <li className="w-9 h-8 sm:w-11 sm:h-9 bg-black flex justify-center items-center text-white rounded-xl cursor-pointer shadow-xl">
          <Link
            href={`/dashboard/${pathname}?page=${
              page > 1 ? Number(page) - 1 : 1
            }`}
            className=""
          >
            <IconRightArrow size="w-8 h-8 sm:w-9 sm:h-9" color="#ffffff" />
          </Link>
        </li>

        {Array(pageCount)
          .fill(0)
          .map((btn, index) =>
            index + 1 === Number(page) ? (
              <Link
                key={crypto.randomUUID()}
                href={`/dashboard/${pathname}?page=${index + 1}`}
                className="w-10 h-8 sm:w-12 sm:h-9 bg-white border-[3.5px] border-[var(--color-primary)] flex justify-center items-center rounded-xl cursor-pointer shadow-lg"
              >
                {index + 1}
              </Link>
            ) : (
              <Link
                key={crypto.randomUUID()}
                href={`/dashboard/${pathname}?page=${index + 1}`}
                className="w-10 h-8 sm:w-12 sm:h-9 bg-[var(--color-primary)] flex justify-center items-center text-white rounded-xl cursor-pointer shadow-lg"
              >
                {index + 1}
              </Link>
            )
          )}
        <li className="w-9 h-8 sm:w-11 sm:h-9 bg-black flex justify-center items-center text-white rounded-xl cursor-pointer shadow-xl">
          <Link
            href={`/dashboard/${pathname}?page=${
              page < pageCount! ? Number(page) + 1 : pageCount
            }`}
            className=""
          >
            <IconLeftArrow size="w-8 h-8 sm:w-9 sm:h-9" color="#ffffff" />
          </Link>
        </li>
      </ul>
    </div>
  );
}
