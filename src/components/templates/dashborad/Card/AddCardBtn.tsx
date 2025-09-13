"use client";
import React from "react";
import { IconAdd } from "@/components/icons/IconAdd";
import Modal from "@/components/modules/dashboard/Modal";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { addCard } from "@/validations/card";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { restoreAccessToken } from "@/utils/restoreAccessToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toEnglishDigits } from "@/utils/normalizeDigits";

type AddCardFormData = {
  bankName: string;
  cardNumber: string;
  balance?: number | null;
};

export default function AddCardBtn() {
  const { accessToken, setAccessToken } = useAuth();
  const queryClient = useQueryClient();

  const [openCardModal, setOpenCardModal] = useState<boolean>(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bankName: "",
      cardNumber: "",
    },
    resolver: yupResolver(addCard),
  });

  const cardModalHandle = () => {
    setOpenCardModal(false);
  };

  const mutation = useMutation({
    mutationFn: async (data: AddCardFormData) => {
      const finalData = { ...data, balance: data.balance ?? 0 };
      const makeRequest = async (token: string) => {
        return await fetch("http://localhost:4002/api/v1/cards", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify(finalData),
        });
      };

      let res = await makeRequest(accessToken!);
      let result = await res.json();

      if (result.statusCode === 401) {
        const newToken = await restoreAccessToken();
        if (!newToken) throw new Error("Unauthorized");
        setAccessToken(newToken);
        res = await makeRequest(newToken);
        result = await res.json();
      }

      if (result.statusCode !== 201) throw new Error("Failed to add card");

      return result.data;
    },
    onSuccess: () => {
      toast.success("کارت با موفقیت افزوده شد");
      queryClient.invalidateQueries({ queryKey: ["cards"] });
      reset();
      cardModalHandle();
    },
    onError: () => {
      toast.error("خطا در افزودن کارت");
    },
  });

  const addCardHandle = async (data: AddCardFormData) => {
    mutation.mutate(data);
  };

  return (
    <>
      <button
        onClick={() => setOpenCardModal(true)}
        className="flex justify-center items-center  p-3 lg:p-4 gap-2 mb-10 text-base xs:text-lg lg:text-[19px] bg-[var(--color-secondary)] text-white w-auto h-auto rounded-2xl lg:rounded-3xl shadow-xl cursor-pointer"
      >
        افزودن کارت جدید
        <IconAdd size="hw-6 lg:w-7 h-6 lg:h-7" color="#ffffff" />
      </button>
      {openCardModal ? (
        <Modal onClose={cardModalHandle}>
          <>
            <h2 className="w-1/2 md:w-1/5 mx-auto text-center pb-2 mb-12 text-lg xs:text-2xl font-bold  rounded-xl text-nowrap">
              افزودن کارت
            </h2>
            <form
              onSubmit={handleSubmit(addCardHandle)}
              className="px-0 md:px-32 flex items-center justify-center flex-wrap gap-y-5 text-xs xs:text-base"
            >
              <div className="w-full">
                <input
                  {...register("bankName")}
                  type="text"
                  className="w-full bg-[var(--color-secondary)] p-3 placeholder:text-white rounded-xl text-white outline-0"
                  placeholder="نام بانک را وارد کنید"
                />
                <span className="text-right pt-1.5  text-sm  text-red-600">
                  {errors.bankName && errors.bankName.message}
                </span>
              </div>
              <div className="w-full">
                <input
                  {...register("cardNumber", {
                    onChange: (e) => {
                      e.target.value = toEnglishDigits(e.target.value);
                    },
                  })}
                  type="text"
                  className="w-full bg-[var(--color-secondary)] p-3 placeholder:text-white rounded-xl text-white outline-0"
                  placeholder="شماره کارت ۱۶ رقمی را وارد کنید"
                />
                <span className="text-right pt-1.5 text-sm  text-red-600">
                  {errors.cardNumber && errors.cardNumber.message}
                </span>
              </div>
              <div className="w-full">
                <input
                  {...register("balance", {
                    onChange: (e) => {
                      e.target.value = toEnglishDigits(e.target.value);
                    },
                  })}
                  type="text"
                  className="w-full bg-[var(--color-theme)] p-3 placeholder:text-zinc-600 rounded-xl text-zinc-600 outline-0"
                  placeholder="موجودی کارت را وارد کنید ( اختیاری )"
                />
                <span className="text-right pt-1.5  text-sm  text-red-600">
                  {errors.balance && errors.balance.message}
                </span>
              </div>
              <button
                type="submit"
                className="mt-7 w-1/2 md:w-1/4 h-10 xs:h-12 flex justify-center items-center text-white rounded-xl bg-[var(--color-primary)] text-base  xs:text-lg cursor-pointer"
              >
                تایید
              </button>
            </form>
          </>
        </Modal>
      ) : null}
    </>
  );
}
