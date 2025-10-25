"use client";

import React, { useState } from "react";
import { IconAdd } from "@/components/icons/IconAdd";
import Modal from "@/components/modules/dashboard/Modal";
import { IconPaper } from "@/components/icons/IconPaper";
import { IconCoin } from "@/components/icons/IconCoin";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/colors/purple.css";
import { IconCalender } from "@/components/icons/IconCalender";
import { IconDescription } from "@/components/icons/IconDescription";
import { useForm, Controller } from "react-hook-form";
import { addIncome } from "@/validations/income";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { restoreAccessToken } from "@/utils/restoreAccessToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toEnglishDigits } from "@/utils/normalizeDigits";
import { IconCategory } from "@/components/icons/IconCategory";
import { IconBankCard } from "@/components/icons/IconBankCard";
import { IconDownArrow } from "@/components/icons/IconDownAroow";
import { useCategoriesByType } from "@/hooks/useCategories";
import { useCards } from "@/hooks/useCards";
import { toPersianDigits } from "@/utils/normalizeDigits";

type addIncomFormData = {
  title: string;
  price: number;
  date: string;
  categoryID: number;
  bankCardID?: number | null;
  description?: string | null;
};

export default function AddIncomeBtn() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const {
    data: categories,
    isError,
    isLoading,
  } = useCategoriesByType("income");

  const { data: cards } = useCards();

  const { accessToken, setAccessToken } = useAuth();
  const queryClient = useQueryClient();

  const {
    register,
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      categoryID: -1,
      bankCardID: -1,
      date: "",
      description: "",
    },
    resolver: yupResolver(addIncome),
  });

  const modalToggleHandle = () => setOpenModal(false);

  const mutation = useMutation({
    mutationFn: async (data: addIncomFormData) => {
      console.log(data.date);
      // Convert Persian date string (e.g. "1404/08/03") to a valid Gregorian Date object
      // Required because backend expects ISO-formatted Gregorian dates, not Jalali strings
      const persianDate = new DateObject({
        date: data.date,
        format: "YYYY/MM/DD",
        calendar: persian,
      });
      const gregorianDate = persianDate.convert("gregorian" as any).toDate();

      const finalData = {
        ...data,
        price: data.price ?? 0,
        bankCard_id: data.bankCardID === -1 ? null : data.bankCardID,
        category_id: data.categoryID,
        date: gregorianDate.toISOString(),
      };
      const makeRequest = async (token: string) => {
        return await fetch("http://localhost:4002/api/v1/incomes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(finalData),
        });
      };

      let res = await makeRequest(accessToken!);
      console.log(res);
      let result = await res.json();

      if (result.statusCode === 401) {
        const newToken = await restoreAccessToken();
        if (!newToken) throw new Error("Unauthorized");
        setAccessToken(newToken);
        res = await makeRequest(newToken);
        result = await res.json();
      }
      if (result.statusCode !== 201) throw new Error("Failed to add income");

      return result.data;
    },
    onSuccess: () => {
      toast.success("درامد با موفقیت افزوده شد");
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
      reset();
      modalToggleHandle();
    },
    onError: () => {
      toast.error("خطا در افزودن درامد");
    },
  });

  const addIncomeHandle = async (data: addIncomFormData) => {
    mutation.mutate(data);
  };

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="flex justify-center items-center  p-3 lg:p-4 gap-2 mb-10 text-base xs:text-lg lg:text-[18px] bg-[var(--color-secondary)] text-white w-auto h-auto rounded-2xl lg:rounded-3xl shadow-xl cursor-pointer"
      >
        افزودن درامد جدید
        <IconAdd size="w-6 h-6 lg:w-7 lg:h-7" color="#ffffff" />
      </button>
      {openModal ? (
        <Modal onClose={modalToggleHandle}>
          <>
            <h2 className="w-1/2 md:w-1/5 mx-auto text-center pb-2 mb-6 lg:mb-12 text-lg xs:text-2xl font-bold  rounded-xl text-nowrap">
              افزودن درامد
            </h2>
            <form
              onSubmit={handleSubmit(addIncomeHandle)}
              className="px-4 md:px-20 lg:px-0 flex items-center justify-between lg:justify-evenly flex-wrap gap-y-3  lg:gap-y-8 gap-x-4 lg:gap-x-20 text-xs xs:text-base"
            >
              <div className="w-full lg:max-w-5/12">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-secondary)]">
                    <IconPaper size="w-7 h-7 xs:w-8 xs:h-8" color="#ffffff" />
                  </div>
                  <input
                    {...register("title")}
                    type="text"
                    className="w-full bg-[var(--color-secondary)] p-3 placeholder:text-white rounded-xl text-white outline-0"
                    placeholder="عنوان درامد را وارد کنید"
                  />
                </div>

                <span className="text-right pt-1.5  text-sm  text-red-600">
                  {errors.title && errors.title.message}
                </span>
              </div>
              <div className="w-full lg:max-w-5/12">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-secondary)]">
                    <IconCoin size="w-7 h-7 xs:w-8 xs:h-8" color="#ffffff" />
                  </div>
                  <input
                    {...register("price", {
                      onChange: (e) => {
                        e.target.value = toEnglishDigits(e.target.value);
                      },
                    })}
                    type="text"
                    className="w-full bg-[var(--color-secondary)] p-3 placeholder:text-white rounded-xl text-white outline-0"
                    placeholder="مبلغ درامد را وارد کنید"
                  />
                </div>
                <span className="text-right pt-1.5 text-sm  text-red-600">
                  {errors.price && errors.price.message}
                </span>
              </div>
              <div className="w-full lg:max-w-5/12">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-secondary)]">
                    <IconCategory
                      size="w-7 h-7 xs:w-8 xs:h-8"
                      colorBg="#ffffff"
                      colorIcon="#8c66e5"
                    />
                  </div>
                  <Controller
                    name="categoryID"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <div className="relative w-full">
                        <select
                          {...field}
                          id="category"
                          className="appearance-none w-full bg-[var(--color-secondary)] p-3 placeholder:text-white rounded-xl text-white outline-0"
                        >
                          <option
                            value={"-1"}
                            className="bg-primary-p text-white"
                          >
                            دسته بندی را انتخاب کنید
                          </option>
                          {categories?.length !== 0 &&
                            categories?.map((category) => (
                              <option
                                key={category?.id}
                                value={category?.id}
                                className="bg-[var(--color-primary)] text-white"
                              >
                                {category.title}
                              </option>
                            ))}
                        </select>
                        <span className="absolute left-3 top-1/2 z-10 transform -translate-y-1/2 pointer-events-none">
                          <IconDownArrow
                            size="w-3 h-3 xs:w-4 xs:h-4"
                            color="#ffffff"
                          />
                        </span>
                      </div>
                    )}
                  />
                </div>
                <span className="text-right pt-1.5 text-sm  text-red-600">
                  {errors.categoryID && errors.categoryID.message}
                </span>
              </div>
              <div className="w-full lg:max-w-5/12">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-theme)]">
                    <IconBankCard
                      size="w-7 h-7 xs:w-8 xs:h-8"
                      color="#52525B"
                    />
                  </div>
                  <Controller
                    name="bankCardID"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <div className="relative w-full">
                        <select
                          {...field}
                          value={field.value ?? "-1"}
                          id="bankCardID"
                          className="appearance-none w-full p-3 bg-[var(--color-theme)] placeholder:text-zinc-600 rounded-xl text-zinc-600 outline-0"
                        >
                          <option
                            value={"-1"}
                            className="bg-primary-p text-white"
                          >
                            واریز شده به کارت (اختیاری)
                          </option>
                          {cards?.length !== 0 &&
                            cards?.map((card) => (
                              <option
                                key={card?.id}
                                value={card?.id}
                                className="bg-[var(--color-primary)] text-white"
                              >
                                {card?.bankName} -{" "}
                                {toPersianDigits(card?.cardNumber)
                                  .match(/.{1,4}/g)
                                  ?.join("-")}
                              </option>
                            ))}
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
                  {errors.bankCardID && errors.bankCardID.message}
                </span>
              </div>
              <div className="w-full lg:max-w-5/12">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-secondary)]">
                    <IconCalender
                      size="w-6 h-6 xs:w-7 xs:h-7"
                      color="#ffffff"
                    />
                  </div>
                  <Controller
                    control={control}
                    name="date"
                    rules={{ required: true }} //optional
                    render={({ field: { onChange, value } }) => (
                      <>
                        <DatePicker
                          inputClass="custom-input"
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
                  className="mt-3 lg:mt-7 w-1/3 lg:w-1/5 h-10 xs:h-12 flex justify-center items-center text-white rounded-xl bg-[var(--color-primary)] text-base  xs:text-lg cursor-pointer"
                >
                  تایید
                </button>
              </div>
            </form>
          </>
        </Modal>
      ) : null}
    </>
  );
}
