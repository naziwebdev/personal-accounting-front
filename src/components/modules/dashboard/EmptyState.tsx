import React from "react";
import { IconEmpty } from "@/components/icons/IconEmpty";

export default function EmptyState({title}:{title:string}) {
  return (
    <div className="w-full h-full pt-24 md:pt-8 flex flex-col justify-center items-center gap-6 sm:gap-10">
      <IconEmpty color="#a78bfa" />
      <h2 className="text-xl sm:text-3xl lg:text-4xl text-zinc-500 font-titr [word-spacing:0.15em]">
       {title}
      </h2>
    </div>
  );
}
