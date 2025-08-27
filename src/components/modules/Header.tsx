import React from "react";
import { IconLogout } from "../icons/IconLogout";
import Image from "next/image";
import { IconNotification } from "../icons/IconNotification";

export default function Header() {
  return (
    <div className="relative flex items-center justify-end p-4 ">
      <div className="flex items-center justify-between gap-x-10 xs:gap-x-16 py-1 px-10 z-20  bg-white/90  rounded-4xl shadow-xl w-full xs:w-auto h-auto">
        <div className="flex items-center gap-x-2">
          <IconNotification />
          <IconLogout />
        </div>

        <Image src="/images/logo.png" width={45} height={30} alt="logo" />
      </div>
      <div className="absolute top-5 left-5 w-64 h-12 rounded-full bg-violet-400 opacity-40 blur-3xl z-10" />
    </div>
  );
}
