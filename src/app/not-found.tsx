"use client";
import React from "react";
import Image from "next/image";

export default function notFound() {
  return (
    <div className="w-full h-dvh overflow-hidden flex justify-center items-center bg-black">
      <Image
        src={"/images/404.webp"}
        alt="not-found"
        width={400}
        height={400}
        className="w-full sm:w-[80%] h-[80%]"
      />
    </div>
  );
}
