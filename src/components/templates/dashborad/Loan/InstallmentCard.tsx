"use client";
import { useAuth } from "@/context/AuthContext";
import { Installment } from "@/types/loan";
import { toPersianDigits } from "@/utils/normalizeDigits";
import { restoreAccessToken } from "@/utils/restoreAccessToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";

type InstallmentProps = {
  Prop: Installment;
  lable: number;
};

export default function InstallmentCard({ Prop, lable }: InstallmentProps) {
  const [isPendding, setIsPendding] = useState<boolean>(
    Prop.status === "pendding"
  );

  const queryClient = useQueryClient();
  const { accessToken, setAccessToken } = useAuth();

  const updateStatusMutation = useMutation({
    mutationFn: async (newStatus: "pendding" | "paid") => {
      const makeRequest = async (token: string) => {
        return await fetch(
          `http://localhost:4002/api/v1/loans/installment/${Prop.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
            body: JSON.stringify({ status: newStatus }),
          }
        );
      };

      let res = await makeRequest(accessToken!);
      let result = await res.json();
      console.log(result);
      if (result.statusCode === 401) {
        const newToken = await restoreAccessToken();
        if (!newToken) throw new Error("Unauthorized");
        setAccessToken(newToken);
        res = await makeRequest(newToken);
        result = await res.json();
      }

      if (result.statusCode !== 200) throw new Error("Failed to update status");

      return result.data;
    },

    onSuccess: (data, newStatus) => {
      toast.success("وضعیت با موفقیت به‌روزرسانی شد");
      setIsPendding(newStatus === "pendding");
      queryClient.invalidateQueries({ queryKey: ["loans"] });
    },

    onError: () => {
      toast.error("خطا در به‌روزرسانی وضعیت");
    },
  });

  const handleToggleStatus = () => {
    const newStatus = isPendding ? "paid" : "pendding";
    updateStatusMutation.mutate(newStatus);
  };

  return (
    <div className="w-full xs:w-[350px] lg:w-[400px] rounded-xl shadow-zinc-300/80 shadow-sm bg-white p-2.5 xs:p-4 border-r-8 border-r-zinc-600">
      <div className="flex items-center justify-between">
        <p className="text-zinc-800 text-base lg:text-lg">
          قسط {toPersianDigits(String(lable))}
        </p>
        <p className="text-zinc-800 text-base lg:text-lg proportional-nums">
          {`${Number(Prop.price).toLocaleString("fa-IR")} `}{" "}
          <span className="text-base text-zinc-800">تومان</span>
        </p>
      </div>
      <div className="pt-2 flex items-center justify-between">
        <p className="text-zinc-800 text-sm lg:text-base">
          {" "}
          {toPersianDigits(Prop.dueDate.toLocaleString().split(" ")[0])}
        </p>
        <div className="flex items-center gap-x-2">
          <p
            className={`text-xs p-1 rounded-md text-white ${
              isPendding
                ? "bg-yellow-400 justify-end"
                : "bg-green-500 justify-start"
            }`}
          >
            {Prop.status === "pendding" ? "پرداخت نشده" : "پرداخت شده"}
          </p>
          <div
            className={`flex w-[55px] sm:w-[60px] ${
              isPendding
                ? "bg-yellow-400 justify-end"
                : "bg-green-500 justify-start"
            } rounded-2xl p-1`}
          >
            <button
              onClick={handleToggleStatus}
              className={`w-5 h-5 cursor-pointer rounded-full bg-white`}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
}
