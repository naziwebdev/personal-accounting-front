import Image from "next/image";
import { IconDelete } from "../../icons/IconDelete";
import { IconEdit } from "../../icons/IconEdit";
import { Card } from "@/types/card";
import { formatCardNumber } from "@/utils/formatCardNumber";
import Modal from "./Modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editCard } from "@/validations/card";
import { toEnglishDigits, toPersianDigits } from "@/utils/normalizeDigits";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { restoreAccessToken } from "@/utils/restoreAccessToken";
import { toast } from "sonner";
import swal from "sweetalert";
import { IconBank } from "@/components/icons/IconBank";
import { IconBankCard } from "@/components/icons/IconBankCard";
import { IconCoin } from "@/components/icons/IconCoin";

type BgcardPropsType = {
  bgCard: string;
  fillOne: string;
  fillTwo: string;
};

type editCardFormData = {
  bankName?: string | null;
  cardNumber?: string | null;
  balance?: number | null;
};

type editCardFormUI = {
  bankName?: string | null;
  cardNumber?: string | null;
  balance?: string | null;
};

type BankCardProps = BgcardPropsType & Card;

export default function BankCard({
  bgCard,
  fillOne,
  fillTwo,
  id,
  bankName,
  cardNumber,
  balance,
}: BankCardProps) {
  const [openEditCardModal, setOpenEditCardModal] = useState<boolean>(false);
  const { accessToken, setAccessToken } = useAuth();

  const queryClient = useQueryClient();

  // edit card logic
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bankName,
      cardNumber: toPersianDigits(String(cardNumber)),
      balance: balance ? toPersianDigits(String(balance)) : null,
    },
    resolver: yupResolver(editCard),
  });

  const editCardModalHandle = () => {
    setOpenEditCardModal(false);
  };

  const editMutation = useMutation({
    mutationFn: async (data: editCardFormData) => {
      const makeRequest = async (token: string) => {
        return await fetch(`http://localhost:4002/api/v1/cards/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({ ...data }),
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
      if (result.statusCode !== 200) throw new Error("Failed to edit card");

      return result.data;
    },
    onSuccess: () => {
      toast.success("کارت با موفقیت ویرایش شد");
      queryClient.invalidateQueries({ queryKey: ["cards"] });
      editCardModalHandle();
    },
    onError: () => {
      toast.error("خطا در ویرایش کارت");
      editCardModalHandle();
    },
  });

  const editCardHandle = async (data: editCardFormUI) => {
    swal({
      title: "آیا از ویرایش کارت اطمینان دارید ؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((value) => {
      if (!value) return;

      const payload: editCardFormData = {
        bankName: data.bankName ?? null,

        cardNumber: data.cardNumber ? toEnglishDigits(data.cardNumber) : null,

        balance: data.balance ? Number(toEnglishDigits(data.balance)) : 0,
      };

      editMutation.mutate(payload);
    });
  };

  //edit card logic

  // delete card logic

  const removeMutation = useMutation({
    mutationFn: async () => {
      const makeRequest = async (token: string) => {
        return await fetch(`http://localhost:4002/api/v1/cards/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
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
      if (result.statusCode !== 200) throw new Error("Failed to remove card");

      return result.data;
    },
    onSuccess: () => {
      toast.success("کارت با موفقیت حذف شد");
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
    onError: () => {
      toast.error("خطا در حذف کارت");
    },
  });

  const deleteCardHandle = () => {
    swal({
      title: "آیا از حذف کارت اطمینان دارید ؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((value) => {
      if (value) {
        removeMutation.mutate();
      }
    });
  };

  return (
    <div
      className={`relative overflow-hidden flex flex-col justify-between w-full h-[170px] xs:w-[350px] xs:h-[200px] rounded-[40px] ${bgCard} text-white p-6 shadow-xl`}
    >
      {/* Decorative SVG Background */}

      <div className="absolute -bottom-16 xs:-bottom-14 left-0 w-full h-full z-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 390"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transition duration-300 ease-in-out delay-150"
        >
          <path
            d="M 0,400 L 0,250 C 85.82,282.95 171.64,315.89 295,286 C 418.36,256.11 579.25,163.38 719,132 C 858.75,100.63 977.36,130.61 1094,123 C 1210.64,115.39 1325.32,70.20 1440,25 L 1440,400 L 0,400 Z"
            fill={`${fillOne}`}
            fillOpacity="0.5"
          />
          <path
            d="M 0,400 L 0,383 C 127.21,390.23 254.43,397.46 389,373 C 523.57,348.54 665.5,292.38 766,273 C 866.5,253.63 925.57,271.04 1031,258 C 1136.43,244.96 1288.21,201.48 1440,158 L 1440,400 L 0,400 Z"
            fill={`${fillTwo}`}
            fillOpacity=".78"
          />
        </svg>
      </div>

      {/* Card Content */}
      <div className="flex justify-between items-center z-10">
        <Image
          alt="chip"
          src="/images/chip.png"
          width={40}
          height={35}
          className="w-9 h-6  xs:w-12 xs:h-9"
        />
        <p className="text-shadow-lg text-base xs:text-[18px]">{bankName}</p>
      </div>

      <div className="text-base xs:text-xl whitespace-nowrap text-center tracking-widest text-shadow-lg z-10">
        {formatCardNumber(cardNumber)}
      </div>

      <div className="flex items-center justify-between z-10">
        <div>
          <p className="mb-2 text-shadow-lg text-xs xs:text-sm">موجودی</p>
          <span className="text-shadow-lg text-sm xs:text-base">
            {balance?.toLocaleString("fa-IR")} تومان
          </span>
        </div>
        <div className="flex flex-col gap-y-0.5">
          <button onClick={deleteCardHandle} className="cursor-pointer">
            <IconDelete color="#fff" size="w-5 h-5 xs:w-6 xs:h-6" />
          </button>
          <button
            onClick={() => setOpenEditCardModal(true)}
            className="cursor-pointer"
          >
            <IconEdit color="#fff" size="w-5 h-5 xs:w-6 xs:h-6" />
          </button>
        </div>
      </div>
      {openEditCardModal ? (
        <Modal onClose={editCardModalHandle}>
          <>
            <h2 className="w-1/2 md:w-1/5 mx-auto text-center pb-2 mb-12 text-lg xs:text-2xl font-bold  rounded-xl text-nowrap">
              ویرایش کارت
            </h2>
            <form
              onSubmit={handleSubmit(editCardHandle)}
              className="px-4 md:px-20 lg:px-0 flex items-center justify-between lg:justify-center flex-wrap gap-y-3  lg:gap-y-8 gap-x-4 lg:gap-x-20 text-xs xs:text-base"
            >
              <div className="w-full lg:max-w-5/12">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-theme)]">
                    <IconBank size="w-5 h-5 xs:w-6 xs:h-6" color="#52525B" />
                  </div>
                  <input
                    {...register("bankName")}
                    type="text"
                    className="w-full bg-[var(--color-theme)] p-3 placeholder:text-zinc-600 rounded-xl text-zinc-600 outline-0"
                    placeholder="نام بانک را وارد کنید (اختیاری)"
                  />
                </div>

                <span className="text-right pt-1.5  text-sm  text-red-600">
                  {errors.bankName && errors.bankName.message}
                </span>
              </div>
              <div className="w-full lg:max-w-5/12">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-theme)]">
                    <IconBankCard
                      size="w-6 h-6 xs:w-7 xs:h-7"
                      color="#52525B"
                    />
                  </div>
                  <input
                    {...register("cardNumber")}
                    onChange={(e) => {
                      const value = toPersianDigits(
                        toEnglishDigits(e.target.value)
                      );
                      setValue("cardNumber", value, { shouldValidate: true });
                    }}
                    type="text"
                    className="w-full bg-[var(--color-theme)] p-3 placeholder:text-zinc-600 rounded-xl text-zinc-600 outline-0"
                    placeholder="شماره کارت ۱۶ رقمی را وارد کنید (اختیاری)"
                  />
                </div>

                <span className="text-right pt-1.5 text-sm  text-red-600">
                  {errors.cardNumber && errors.cardNumber.message}
                </span>
              </div>
              <div className="w-full lg:max-w-5/12">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-theme)]">
                    <IconCoin size="w-6 h-6 xs:w-7 xs:h-7" color="#52525B" />
                  </div>
                  <input
                    {...register("balance")}
                    onChange={(e) => {
                      const value = toPersianDigits(
                        toEnglishDigits(e.target.value)
                      );
                      setValue("balance", value, { shouldValidate: true });
                    }}
                    type="text"
                    className="w-full bg-[var(--color-theme)] p-3 placeholder:text-zinc-600 rounded-xl text-zinc-600 outline-0"
                    placeholder="موجودی کارت را وارد کنید ( اختیاری )"
                  />
                </div>

                <span className="text-right pt-1.5  text-sm  text-red-600">
                  {errors.balance && errors.balance.message}
                </span>
              </div>
              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  className="mt-7 w-1/2 md:w-1/6 h-10 xs:h-12 flex justify-center items-center text-white rounded-xl bg-[var(--color-primary)] text-base  xs:text-lg cursor-pointer"
                >
                  تایید
                </button>
              </div>
            </form>
          </>
        </Modal>
      ) : null}
    </div>
  );
}
