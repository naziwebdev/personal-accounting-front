"use client";

import React from "react";
import { IconLogout } from "../../icons/IconLogout";
import Image from "next/image";
import { IconNotification } from "../../icons/IconNotification";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { restoreAccessToken } from "@/utils/restoreAccessToken";
import { useRouter } from "next/navigation";
import swal from "sweetalert";

export default function Header() {
  const { accessToken, setAccessToken } = useAuth();
  const router = useRouter();

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
    <div className="relative flex justify-end sm:justify-between items-center gap-4 p-4 ">
      <div className="flex items-center order-2 justify-between gap-x-10 xs:gap-x-16 py-1 px-10 z-20  bg-white/90  rounded-4xl shadow-xl w-full xs:w-auto h-auto">
        <div className="flex items-center gap-x-2">
          <IconNotification />
          <button onClick={logoutHandler}>
            <IconLogout />
          </button>
        </div>

        <Image src="/images/logo.png" width={45} height={30} alt="logo" />
      </div>
      <div className="absolute top-5 left-5 w-64 h-12 rounded-full bg-violet-400 opacity-40 blur-3xl z-10" />
      <h1 className="font-titr  hidden sm:block  text-3xl font-bold [text-shadow:_0_0_1px_#a78bfa,_0_5px_4px_#f1aac2]">
        پنل حسابداری دایموند
      </h1>
    </div>
  );
}
