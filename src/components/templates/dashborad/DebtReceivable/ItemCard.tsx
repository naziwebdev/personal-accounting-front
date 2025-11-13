"use client";
import { DebtReceivable } from "@/types/debt";
import { toEnglishDigits, toPersianDigits } from "@/utils/normalizeDigits";
import React, { useState } from "react";
import { IconDelete } from "@/components/icons/IconDelete";
import { IconEdit } from "@/components/icons/IconEdit";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { editDebtReceivable } from "@/validations/debt";
import { Controller, useForm } from "react-hook-form";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/colors/purple.css";
import { restoreAccessToken } from "@/utils/restoreAccessToken";
import { toast } from "sonner";
import Modal from "@/components/modules/dashboard/Modal";
import { IconCategory } from "@/components/icons/category/IconCategory";
import { IconDownArrow } from "@/components/icons/IconDownAroow";
import { IconCoin } from "@/components/icons/IconCoin";
import { IconCalender } from "@/components/icons/IconCalender";
import { IconPaper } from "@/components/icons/IconPaper";
import { IconDescription } from "@/components/icons/IconDescription";

type editItemFormData = {
  type?: "debt" | "receivable" | null;
  price?: number | null;
  person?: string | null;
  date?: string | null;
  description?: string | null;
};

type StatusType = "pendding" | "paid";

export default function ItemCard(Prop: DebtReceivable) {
  const [isPaid, setIsPaid] = useState<boolean>(Prop.status === "paid");

  const [status, setStatus] = useState<StatusType>(Prop.status);

  const router = useRouter();
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const { accessToken, setAccessToken } = useAuth();

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
      type: Prop.type as any,
      person: Prop.person,
      price: Number(Prop.price),
      date: Prop.date ? new Date(Prop.date).toISOString().split("T")[0] : null,
      description: Prop?.description,
    },
    resolver: yupResolver(editDebtReceivable),
  });

  const editModalHandle = () => setOpenEditModal(false);

  const editMutation = useMutation({
    mutationFn: async (data: editItemFormData) => {
      const makeRequest = async (token: string) => {
        const persianDate = new DateObject({
          date: data?.date ?? undefined,
          format: "YYYY/MM/DD",
          calendar: persian,
        });
        const gregorianDate = persianDate.convert("gregorian" as any).toDate();

        const finalData = {
          ...data,
          price: data.price ?? 0,
          date: gregorianDate.toISOString(),
        };
        return await fetch(
          `http://localhost:4002/api/v1/receivables-debts/${Prop.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
            body: JSON.stringify(finalData),
          }
        );
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
      if (result.statusCode !== 200)
        throw new Error("Failed to edit debt/receivable");

      return result.data;
    },

    onSuccess: () => {
      toast.success(" با موفقیت ویرایش شد");
      queryClient.invalidateQueries({ queryKey: ["debts"] });
      editModalHandle();
    },
    onError: () => {
      toast.error("خطا در ویرایش ");
      editModalHandle();
    },
  });

  const editItemHandle = async (data: editItemFormData) => {
    swal({
      title: "آیا از ویرایش اطمینان دارید ؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((value) => {
      if (value) {
        editMutation.mutate(data);
      }
    });
  };

  /////// update status //////

  const updateStatusMutation = useMutation({
    mutationFn: async (newStatus: "pendding" | "paid") => {
      const makeRequest = async (token: string) => {
        return await fetch(
          `http://localhost:4002/api/v1/receivables-debts/${Prop.id}/status`,
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

    onSuccess: () => {
      toast.success("وضعیت با موفقیت به‌روزرسانی شد");
      queryClient.invalidateQueries({ queryKey: ["debts"] });
    },

    onError: () => {
      toast.error("خطا در به‌روزرسانی وضعیت");
    },
  });

  const handleToggleStatus = () => {
    const newStatus = isPaid ? "pendding" : "paid";
    updateStatusMutation.mutate(newStatus, {
      onSuccess: () => setIsPaid(!isPaid),
    });
  };

  //////// delete logic ///////

  const removeMutation = useMutation({
    mutationFn: async () => {
      const makeRequest = async (token: string) => {
        return await fetch(
          `http://localhost:4002/api/v1/receivables-debts/${Prop.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );
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
      if (result.statusCode !== 200)
        throw new Error("Failed to remove debt/receivable");

      return result.data;
    },
    onSuccess: (data) => {
      toast.success(" با موفقیت حذف شد");

      const totalCount = data.totalCount;

      const lastPage = Math.ceil(totalCount / 6); // 6 = your pagination limit

      router.push(`/dashboard/debts-receivables?page=${lastPage}`);

      queryClient.invalidateQueries({ queryKey: ["debts"] });
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
    <div className="relative w-full xs:w-[350px] lg:w-[400px] rounded-3xl  p-3 xs:p-4 shadow-zinc-300/80 shadow-sm">
      {/* bg svg */}
      <div className=" svgBg absolute inset-0 w-full h-full -z-10 bg-white  rounded-3xl"></div>
      {/* blur */}

      <div className="absolute inset-0 z-0 bg-white/70 rounded-3xl"></div>
      {/* content */}
      <div className="relative inset-0 z-20 rounded-3xl">
        <p className="absolute left-1/2 -translate-x-1/2 xs:translate-none -top-5 xs:-top-4 xs:-left-7 z-20 bg-[var(--color-secondary)] text-white px-4 py-0.5 rounded-lg text-sm xs:-rotate-[30deg]">
          {Prop.type === "receivable" ? "طلب" : "بدهی"}
        </p>
        <div className="w-full flex justify-between">
          <div className="text-center">
            <p className="text-sm sm:text-base">مبلغ</p>
            <p className="text-xl sm:text-2xl font-semibold pt-1.5 text-[var(--color-secondary)]">
              {`${Number(Prop.price).toLocaleString("fa-IR")} `}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm sm:text-base">وضعیت</p>
            <p
              className={`font-semibold pt-1.5 ${
                Prop.status === "pendding"
                  ? "text-yellow-400"
                  : "text-green-600"
              }  text-sm sm:text-base`}
            >
              {Prop.status === "pendding" ? "در انتظار پرداخت" : "پرداخت شده"}
            </p>
          </div>
        </div>
        <div className="w-full flex justify-between mt-2.5 sm:mt-4">
          <div className="text-center">
            <p className="text-sm sm:text-base">از/ به شخص:</p>
            <p className="text-sm sm:text-base pt-1.5  text-zinc-500">
              {Prop.person}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm sm:text-base">تاریخ</p>
            <p className="pt-1.5 text-zinc-500 text-sm sm:text-base">
              {toPersianDigits(Prop.date.toLocaleString().split(" ")[0])}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-2.5 sm:mt-4">
          <div className="flex  items-center gap-x-2.5">
            <div
              className={`flex w-16 sm:w-[75px] border-[3px]  ${
                isPaid
                  ? "border-[var(--color-secondary)] justify-end"
                  : "border-zinc-500 justify-start"
              } rounded-2xl p-0.5`}
            >
              <button
                onClick={handleToggleStatus}
                className={`w-6 h-6 cursor-pointer rounded-full  ${
                  isPaid ? "bg-[var(--color-secondary)]" : "bg-zinc-500"
                }`}
              ></button>
            </div>

            <span
              className={`whitespace-nowrap ${
                isPaid ? "text-[var(--color-secondary)]" : "text-zinc-500"
              } font-semibold text-xs sm:text-[.9rem]`}
            >
              {!isPaid ? "پرداخت نشده" : "پرداخت شده"}
            </span>
          </div>
          <div className="flex items-center gap-x-1.5">
            <button onClick={deleteItemHandle} className="cursor-pointer">
              <IconDelete size="w-6 h-6" color="#8c66e5" />
            </button>
            <button
              onClick={() => setOpenEditModal(true)}
              className="cursor-pointer"
            >
              <IconEdit size="w-6 h-6" color="#8c66e5" />
            </button>
          </div>
        </div>
      </div>
      {openEditModal && (
        <Modal onClose={editModalHandle}>
          <>
            <h2 className="w-1/2 md:w-1/5 mx-auto text-center pb-2 mb-6 lg:mb-12 text-lg xs:text-2xl font-bold  rounded-xl text-nowrap">
              افزودن بدهی / طلب
            </h2>
            <form
              onSubmit={handleSubmit(editItemHandle)}
              className="px-4 md:px-20 lg:px-0 flex items-center justify-between lg:justify-evenly flex-wrap gap-y-3  lg:gap-y-8 gap-x-4 lg:gap-x-20 text-xs xs:text-base"
            >
              <div className="w-full lg:max-w-5/12">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-theme)]">
                    <IconCategory
                      size="w-6 h-6 xs:w-7 xs:h-7"
                      color="#52525B"
                    />
                  </div>
                  <Controller
                    name="type"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <div className="relative w-full">
                        <select
                          {...field}
                          value={field.value ?? "-1"}
                          id="type"
                          className="appearance-none w-full bg-[var(--color-theme)] p-3 placeholder:text-[#52525B] rounded-xl text-[#52525B] outline-0"
                        >
                          <option value={"-1"} className=" text-white">
                            نوع را مشخص کنید
                          </option>
                          <option
                            className="bg-[var(--color-primary)] text-white"
                            value={"debt"}
                          >
                            بدهی
                          </option>
                          <option
                            className="bg-[var(--color-primary)] text-white"
                            value={"receivable"}
                          >
                            طلب
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
                  {errors.type && errors.type.message}
                </span>
              </div>

              <div className="w-full lg:max-w-5/12">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-theme)]">
                    <IconCoin size="w-7 h-7 xs:w-8 xs:h-8" color="#52525B" />
                  </div>
                  <input
                    {...register("price", {
                      onChange: (e) => {
                        e.target.value = toEnglishDigits(e.target.value);
                      },
                    })}
                    type="text"
                    className="w-full bg-[var(--color-theme)] p-3 placeholder:text-[#52525B] rounded-xl text-[#52525B] outline-0"
                    placeholder="مبلغ را وارد کنید"
                  />
                </div>
                <span className="text-right pt-1.5 text-sm  text-red-600">
                  {errors.price && errors.price.message}
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
                    name="date"
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
                              : ""
                          }
                          placeholder="برای انتخاب تاریخ ضربه بزنید"
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
                  {errors.date && errors.date.message}
                </span>
              </div>
              <div className="w-full lg:max-w-5/12">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-theme)]">
                    <IconPaper size="w-7 h-7 xs:w-8 xs:h-8" color="#52525B" />
                  </div>
                  <input
                    {...register("person")}
                    type="text"
                    className="w-full bg-[var(--color-theme)] p-3 placeholder:text-[#52525B] rounded-xl text-[#52525B] outline-0"
                    placeholder=" نام شخص را وارد کنید"
                  />
                </div>

                <span className="text-right pt-1.5  text-sm  text-red-600">
                  {errors.person && errors.person.message}
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
      )}
    </div>
  );
}
