"use client";

import React, { useState } from "react";
import { IconLogout } from "../../icons/IconLogout";
import Image from "next/image";
import { IconNotification } from "../../icons/IconNotification";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { restoreAccessToken } from "@/utils/restoreAccessToken";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import { IconProfile } from "@/components/icons/IconProfile";
import { useGetMe } from "@/hooks/useGetMe";

export default function Header() {
  const { accessToken, setAccessToken } = useAuth();
  const { data } = useGetMe();

  const router = useRouter();
  const [isVisibleProfile, setIsVisibleProfile] = useState<boolean>(false);

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const makeRequest = async (token: string | null) => {
        return await fetch("http://localhost:4002/api/v1/auth/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });
      };

      let res = await makeRequest(accessToken);
      let result = await res.json();

      if (result.statusCode === 401) {
        const newToken = await restoreAccessToken();
        if (!newToken) throw new Error("Unauthorized");
        setAccessToken(newToken);
        res = await makeRequest(newToken);
        result = await res.json();
      }
      if (result.statusCode === 404) {
        throw new Error("Not found token");
      }
      if (result.statusCode !== 200) throw new Error("Failed to logout");
    },
    onSuccess: () => {
      router.push("/auth");
      setAccessToken(null);
    },
    onError: () => {
      toast.error("خطا در خروج");
    },
  });

  const logoutHandler = () => {
    swal({
      title: "ایا از خروج اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((value) => {
      if (value) {
        logoutMutation.mutate();
      }
    });
  };

  return (
    <div className="flex justify-between items-center gap-0 xs:gap-4 p-4">
      <div className="flex items-center gap-x-3">
        <h1 className="font-titr  hidden sm:block text-3xl font-bold ">
          پنل حسابداری دایموند
        </h1>
        <h1 className="block sm:hidden text-xl xs:text-2xl font-titr font-bold">
          دایموند
        </h1>
        <Image src="/images/logo.png" width={45} height={30} alt="logo" />
      </div>
      <div className="flex items-center gap-x-4">
        <div className="cursor-pointer">
          <IconNotification color="#000" />
        </div>
        <div className="relative">
          <button
            onClick={() => setIsVisibleProfile(!isVisibleProfile)}
            className="cursor-pointer border-6 border-black border-double rounded-full"
          >
            <IconProfile color="#e19ab3" />
          </button>
          <div
            className={`absolute w-[200px] py-2 px-4 -bottom-[125px] z-20 left-0 bg-white rounded-lg shadow-2xl transition-all duration-300 ease-in-out
      ${
        isVisibleProfile
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-4 pointer-events-none"
      }
    `}
          >
            <ul className="font-black text-sm">
              <li className="flex justify-between items-center gap-x-2 py-3 border-b-2 border-dashed border-zinc-600">
                <p className="text-zinc-800">کاربر</p>
                <p className="text-[var(--color-secondary)]">{data?.phone}</p>
              </li>
              <li className="flex justify-between items-center gap-x-2 py-3">
                <p className="text-zinc-800">خروج</p>
                <button
                  onClick={logoutHandler}
                  className="flex justify-center items-center rounded-xl shadow-xl  h-8 bg-[var(--color-secondary)] ps-2 pe-4 py-4"
                >
                  <IconLogout />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
