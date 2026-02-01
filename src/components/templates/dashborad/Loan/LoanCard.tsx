"use client";
import React, { useState } from "react";
import { IconLoanGiver } from "@/components/icons/IconLoanGiver";
import { IconDownArrow } from "@/components/icons/IconDownAroow";
import InstallmentCard from "./InstallmentCard";
import { Loan } from "@/types/loan";
import { toEnglishDigits, toPersianDigits } from "@/utils/normalizeDigits";
import { IconEdit } from "@/components/icons/IconEdit";
import { IconDelete } from "@/components/icons/IconDelete";
import { IconActionDot } from "@/components/icons/IconActiondot";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { restoreAccessToken } from "@/utils/restoreAccessToken";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editLoan } from "@/validations/loan";
import DatePicker, { DateObject } from "react-multi-date-picker";
import Modal from "@/components/modules/dashboard/Modal";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/colors/purple.css";
import { IconPeriod } from "@/components/icons/IconPeriod";
import { IconCoin } from "@/components/icons/IconCoin";
import { IconCalender } from "@/components/icons/IconCalender";
import { IconPerson } from "@/components/icons/IconPerson";
import { IconSerial } from "@/components/icons/IconSerial";
import { IconPaper } from "@/components/icons/IconPaper";
import { IconDescription } from "@/components/icons/IconDescription";

type EditItemFormUI = {
  giverName?: string | null;
  title?: string | null;
  totalPrice?: string | null;
  description?: string | null;
  countInstallment?: string | null;
  firstDateInstallment?: string | null;
  periodInstallment?: "monthly" | "weekly" | "yearly" | null;
};

type editItemFormData = {
  giverName?: string | null;
  title?: string | null;
  totalPrice?: number | null;
  description?: string | null;
  countInstallment?: number | null;
  firstDateInstallment?: string | null;
  periodInstallment?: "monthly" | "weekly" | "yearly" | null;
};

export default function LoanCard(Prop: Loan) {
  const [isPendding, setIsPendding] = useState<boolean>(
    Prop.status === "pendding"
  );
  const [isOpenInstallments, setIsOpenInstallments] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const sortedInstallments = [...Prop.installments].sort((a, b) =>
    a.dueDate.localeCompare(b.dueDate)
  );

  const lastIndex = sortedInstallments.length - 1;

  const router = useRouter();
  const queryClient = useQueryClient();
  const { accessToken, setAccessToken } = useAuth();

  const editModalHandle = () => setOpenEditModal(false);

  ///// edit logic ////

  const {
    register,
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      giverName: Prop.giverName,
      title: Prop.title,
      totalPrice: Prop.totalPrice
        ? toPersianDigits(String(Prop.totalPrice))
        : null,
      description: Prop?.description,
      countInstallment: Prop.countInstallment
        ? toPersianDigits(String(Prop.countInstallment))
        : null,

      firstDateInstallment: Prop.firstDateInstallment
        ? new Date(Prop.firstDateInstallment).toISOString().split("T")[0]
        : null,
      periodInstallment: Prop.periodInstallment,
    },
    resolver: yupResolver(editLoan),
  });

  const editMutation = useMutation({
    mutationFn: async (data: editItemFormData) => {
      const makeRequest = async (token: string) => {
        const persianDate = new DateObject({
          date: data.firstDateInstallment ?? undefined,
          format: "YYYY/MM/DD",
          calendar: persian,
        });
        const gregorianDate = persianDate.convert("gregorian" as any).toDate();

        const finalData = {
          ...data,
          totalPrice: data?.totalPrice ?? 0,
          firstDateInstallment: gregorianDate.toISOString(),
          countInstallment: data?.countInstallment ?? 4,
        };

        return await fetch(`http://localhost:4002/api/v1/loans/${Prop.id}`, {
          method: "PUT",
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
      if (result.statusCode !== 200) throw new Error("Failed to edit check");

      return result.data;
    },

    onSuccess: () => {
      toast.success(" با موفقیت ویرایش شد");
      queryClient.invalidateQueries({ queryKey: ["loans"] });
      editModalHandle();
    },
    onError: () => {
      toast.error("خطا در ویرایش ");
      editModalHandle();
    },
  });

  const editItemHandle = async (data: EditItemFormUI) => {
    swal({
      title: "آیا از ویرایش اطمینان دارید ؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((value) => {
      if (!value) return;

      const payload: editItemFormData = {
        ...data,

        totalPrice: data.totalPrice
          ? Number(toEnglishDigits(data.totalPrice))
          : 0,

        countInstallment: data.countInstallment
          ? Number(toEnglishDigits(data.countInstallment))
          : 4,
      };

      editMutation.mutate(payload);
    });
  };

  //////// delete logic ///////

  const removeMutation = useMutation({
    mutationFn: async () => {
      const makeRequest = async (token: string) => {
        return await fetch(`http://localhost:4002/api/v1/loans/${Prop.id}`, {
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
      if (result.statusCode !== 200) throw new Error("Failed to remove loan");

      return result.data;
    },
    onSuccess: (data) => {
      toast.success(" با موفقیت حذف شد");

      const totalCount = data.totalCount;

      const lastPage = Math.ceil(totalCount / 6); // 6 = your pagination limit

      router.push(`/dashboard/loans?page=${lastPage}`);

      queryClient.invalidateQueries({ queryKey: ["loans"] });
    },
    onError: () => {
      toast.error("خطا در حذف ");
    },
  });

  const deleteItemHandle = () => {
    swal({
      title: "آیا از حذف اطمینان دارید ؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((value) => {
      if (value) {
        removeMutation.mutate();
      }
    });
  };

  return (
    <div className="flex w-full xs:w-auto flex-col gap-y-2">
      <div className="relative w-full xs:w-[350px] lg:w-[400px] rounded-3xl  p-3 xs:p-4 shadow-zinc-300/80 shadow-sm">
        {/* bg svg */}
        <div className=" svg-bg absolute inset-0 w-full h-full -z-10 bg-white  rounded-3xl"></div>
        {/* content */}
        <div className="relative inset-0 z-20 rounded-3xl">
          <p
            className={`absolute left-1  -top-6 z-20 ${
              isPendding ? "bg-yellow-400" : "bg-[var(--color-primary)]"
            } text-white  px-4 py-1 rounded-lg text-sm sm:text-base shadow-lg shadow-black/20`}
          >
            {Prop.status === "pendding" ? "در انتظار" : "پرداخت شده"}
          </p>
          <div className="flex items-center gap-x-4">
            <IconLoanGiver
              size="w-12 h-12 xs:w-14 xs:h-14"
              color={`${isPendding ? "oklch(85.2% 0.199 91.936)" : "#e19ab3"}`}
            />
            <p className="text-lg font-semibold text-white">{Prop.giverName}</p>
          </div>
          <div className="flex flex-col gap-4 pt-2 px-1 sm:px-2 lg:px-10">
            <div className="flex items-center justify-between">
              <p className="text-[#e7e7e7]">مبلغ وام</p>
              <p className="text-white text-xl lg:text-2xl proportional-nums">
                {`${Number(Prop.totalPrice).toLocaleString("fa-IR")} `}{" "}
                <span className="text-base text-[#e7e7e7]">تومان</span>
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[#e7e7e7]"> هر قسط</p>
              <p className="text-white text-xl lg:text-2xl proportional-nums">
                {`${Number(Prop?.installments[0]?.price).toLocaleString(
                  "fa-IR"
                )} `}{" "}
                <span className="text-base text-[#e7e7e7]">تومان</span>
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[#e7e7e7]"> تاریخ شروع </p>
              <p className="text-white text-base lg:text-[1.05rem] proportional-nums">
                {toPersianDigits(
                  sortedInstallments[0].dueDate.toLocaleString().split(" ")[0]
                )}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[#e7e7e7]"> تاریخ پایان </p>
              <p className="text-white text-base lg:text-[1.05rem] proportional-nums">
                {toPersianDigits(
                  sortedInstallments[lastIndex].dueDate
                    .toLocaleString()
                    .split(" ")[0]
                )}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[#e7e7e7]"> تعداد اقساط </p>
              <span
                className={`text-white w-7 h-7 xs:w-8 xs:h-8 rounded-full flex justify-center items-center ${
                  isPendding ? "bg-yellow-400" : "bg-[var(--color-primary)]"
                } shadow-lg shadow-black/20`}
              >
                {toPersianDigits(String(Prop.countInstallment))}
              </span>
            </div>

            <div className={"flex justify-center items-center gap-x-3"}>
              <button
                onClick={() => setOpenEditModal(true)}
                className="cursor-pointer"
              >
                <IconEdit size="w-6 h-6 font-bold" color="#fff" />
              </button>
              <button onClick={deleteItemHandle} className="cursor-pointer">
                <IconDelete size="w-7 h-7 font-bold" color="#e19ab3" />
              </button>
            </div>
            <div
              onClick={() => setIsOpenInstallments(!isOpenInstallments)}
              className="mb-2 mx-auto w-auto flex gap-x-2 justify-center items-center p-2.5 text-white rounded-xl shadow-lg shadow-black/20 bg-zinc-600 cursor-pointer"
            >
              <span className="text-sm xs:text-base text-nowrap">
                مشاهده اقساط
              </span>
              {isOpenInstallments ? (
                <IconDownArrow size="w-3 h-3 xs:w-4 xs:h-4" color="#fff" />
              ) : (
                <IconDownArrow size="w-3 h-3 xs:w-4 xs:h-4" color="#fff" />
              )}
            </div>
          </div>
        </div>
      </div>
      {isOpenInstallments && (
        <div className="flex flex-col items-center gap-y-2 w-full xs:w-[350px] lg:w-[400px]">
          {sortedInstallments.map((item, index) => (
            <InstallmentCard key={item.id} Prop={item} lable={index + 1} />
          ))}
        </div>
      )}
      {openEditModal ? (
        <Modal onClose={editModalHandle}>
          <>
            <h2 className="w-1/2 md:w-1/5 mx-auto text-center pb-2 mb-6 lg:mb-12 text-lg xs:text-2xl font-bold  rounded-xl text-nowrap">
              ویرایش وام
            </h2>
            <form
              onSubmit={handleSubmit(editItemHandle)}
              className="px-4 md:px-20 lg:px-0 flex items-center justify-between lg:justify-evenly flex-wrap gap-y-3  lg:gap-y-8 gap-x-4 lg:gap-x-20 text-xs xs:text-base"
            >
              <div className="w-full lg:max-w-5/12">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-theme)]">
                    <IconPeriod size="w-6 h-6 xs:w-7 xs:h-7" color="#52525B" />
                  </div>
                  <Controller
                    name="periodInstallment"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <div className="relative w-full">
                        <select
                          {...field}
                          value={field.value ?? "-1"}
                          id="type"
                          className="appearance-none w-full bg-[var(--color-theme)] p-3 placeholder:text-zinc-600 rounded-xl text-zinc-600 outline-0"
                        >
                          <option value={"-1"} className=" text-zinc-600">
                            دوره پرداخت اقساط را مشخص کنید
                          </option>
                          <option
                            className="bg-[var(--color-primary)] text-white"
                            value={"weeky"}
                          >
                            هفتگی
                          </option>
                          <option
                            className="bg-[var(--color-primary)] text-white"
                            value={"monthly"}
                          >
                            ماهیانه
                          </option>
                          <option
                            className="bg-[var(--color-primary)] text-white"
                            value={"yearly"}
                          >
                            سالیانه
                          </option>
                        </select>
                        <span className="absolute left-3 top-1/2 z-10 transform -translate-y-1/2 pointer-events-none">
                          <IconDownArrow
                            size="w-3 h-3 xs:w-4 xs:h-4"
                            color="#52525B"
                          />
                        </span>
                      </div>
                    )}
                  />
                </div>

                <span className="text-right pt-1.5 text-sm  text-red-600">
                  {errors.periodInstallment && errors.periodInstallment.message}
                </span>
              </div>

              <div className="w-full lg:max-w-5/12">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-theme)]">
                    <IconCoin size="w-7 h-7 xs:w-8 xs:h-8" color="#52525B" />
                  </div>
                  <input
                    {...register("totalPrice")}
                    onChange={(e) => {
                      const value = toPersianDigits(
                        toEnglishDigits(e.target.value)
                      );
                      setValue("totalPrice", value, { shouldValidate: true });
                    }}
                    type="text"
                    className="w-full bg-[var(--color-theme)] p-3 placeholder:text-zinc-600 rounded-xl text-zinc-600 outline-0"
                    placeholder="مبلغ کل وام را وارد کنید"
                  />
                </div>
                <span className="text-right pt-1.5 text-sm  text-red-600">
                  {errors.totalPrice && errors.totalPrice.message}
                </span>
              </div>
              <div className="w-full lg:max-w-5/12">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-theme)]">
                    <IconCalender
                      size="w-6 h-6 xs:w-7 xs:h-7"
                      color="#52525B"
                    />
                  </div>
                  <Controller
                    control={control}
                    name="firstDateInstallment"
                    rules={{ required: true }} //optional
                    render={({ field: { onChange, value } }) => (
                      <>
                        <DatePicker
                          inputClass="custom-input-edit"
                          className="purple w-full"
                          format="YYYY/MM/DD"
                          value={
                            value
                              ? new DateObject({
                                  date: value,
                                  format: "YYYY/MM/DD",
                                  calendar: persian,
                                })
                              : undefined
                          }
                          placeholder="تاریخ اولین قسط را مشخص کنید"
                          onChange={(dateObject) => {
                            const formatted =
                              dateObject?.format?.("YYYY/MM/DD");
                            onChange(formatted ?? "");
                          }}
                          locale={persian_fa}
                          calendar={persian}
                        />
                      </>
                    )}
                  />
                </div>
                <span className="text-right pt-1.5  text-sm  text-red-600">
                  {errors.firstDateInstallment &&
                    errors.firstDateInstallment.message}
                </span>
              </div>
              <div className="w-full lg:max-w-5/12">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-theme)]">
                    <IconPerson size="w-7 h-7 xs:w-8 xs:h-8" color="#52525B" />
                  </div>
                  <input
                    {...register("giverName")}
                    type="text"
                    className="w-full bg-[var(--color-theme)] p-3 placeholder:text-zinc-600 rounded-xl text-zinc-600 outline-0"
                    placeholder=" نام وام دهنده را وارد کنید"
                  />
                </div>

                <span className="text-right pt-1.5  text-sm  text-red-600">
                  {errors.giverName && errors.giverName.message}
                </span>
              </div>
              <div className="w-full lg:max-w-5/12">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-theme)]">
                    <IconSerial size="w-6 h-6 xs:w-7 xs:h-7" color="#52525B" />
                  </div>
                  <input
                      {...register("countInstallment")}
                    onChange={(e) => {
                      const value = toPersianDigits(
                        toEnglishDigits(e.target.value)
                      );
                      setValue("countInstallment", value, { shouldValidate: true });
                    }}
                    type="text"
                    className="w-full bg-[var(--color-theme)] p-3 placeholder:text-zinc-600 rounded-xl text-zinc-600 outline-0"
                    placeholder=" تعداد کل اقساط  را وارد کنید"
                  />
                </div>

                <span className="text-right pt-1.5  text-sm  text-red-600">
                  {errors.countInstallment && errors.countInstallment.message}
                </span>
              </div>
              <div className="w-full lg:max-w-5/12">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-theme)]">
                    <IconPaper size="w-7 h-7 xs:w-8 xs:h-8" color="#52525B" />
                  </div>
                  <input
                    {...register("title")}
                    type="text"
                    className="w-full bg-[var(--color-theme)] p-3 placeholder:text-zinc-600 rounded-xl text-zinc-600 outline-0"
                    placeholder=" نام ای برای وام وارد کنید"
                  />
                </div>

                <span className="text-right pt-1.5  text-sm  text-red-600">
                  {errors.title && errors.title.message}
                </span>
              </div>
              <div className="w-full lg:max-w-5/12">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-theme)]">
                    <IconDescription
                      size="w-6 h-6 xs:w-7 xs:h-7"
                      color="#52525B"
                    />
                  </div>
                  <textarea
                    {...register("description")}
                    className="w-full bg-[var(--color-theme)] p-3 resize-none placeholder:text-zinc-600 rounded-xl text-zinc-600 outline-0"
                    placeholder="توضیحات را وارد کنید (اختیاری)"
                  ></textarea>
                </div>
                <span className="text-right pt-1.5  text-sm  text-red-600">
                  {errors.description && errors.description.message}
                </span>
              </div>
              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  className="mt-3 lg:mt-7 w-1/3 lg:w-1/6 h-10 xs:h-12 flex justify-center items-center text-white rounded-xl bg-[var(--color-primary)] text-base  xs:text-lg cursor-pointer"
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
