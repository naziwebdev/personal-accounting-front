"use client";
import { IconAdd } from "@/components/icons/IconAdd";
import { IconDownArrow } from "@/components/icons/IconDownAroow";
import React, { useState } from "react";
import { StatusFilterItem, TypeFilterItem } from "@/types/debt";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/colors/purple.css";
import { restoreAccessToken } from "@/utils/restoreAccessToken";
import { toast } from "sonner";
import Modal from "@/components/modules/dashboard/Modal";
import { IconPaper } from "@/components/icons/IconPaper";
import { IconCoin } from "@/components/icons/IconCoin";
import { toEnglishDigits } from "@/utils/normalizeDigits";
import { IconBankCard } from "@/components/icons/IconBankCard";
import { IconCalender } from "@/components/icons/IconCalender";
import { IconDescription } from "@/components/icons/IconDescription";
import { addDebtReceivable } from "@/validations/debt";
import { IconCategory } from "@/components/icons/category/IconCategory";

type FilterProp = {
  setType: React.Dispatch<React.SetStateAction<TypeFilterItem>>;
  typeItem: TypeFilterItem;
  setStatus: React.Dispatch<React.SetStateAction<StatusFilterItem>>;
  statusItem: StatusFilterItem;
};

type addItemFormData = {
  type: "debt" | "receivable";
  price: number;
  person: string;
  date: string;
  description?: string | null;
};

export default function AddItemBtn({
  setType,
  typeItem,
  setStatus,
  statusItem,
}: FilterProp) {
  const router = useRouter();

  const [openModal, setOpenModal] = useState<boolean>(false);

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
      type:undefined,
      person: "",
      date: "",
      description: "",
    },
    resolver: yupResolver(addDebtReceivable),
  });

  const modalToggleHandle = () => setOpenModal(false);

  const mutation = useMutation({
    mutationFn: async (data: addItemFormData) => {
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
        date: gregorianDate.toISOString(),
      };
      const makeRequest = async (token: string) => {
        return await fetch("http://localhost:4002/api/v1/receivables-debts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
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
      if (result.statusCode !== 201)
        throw new Error("Failed to add debt/receivable");

      return result.data;
    },
    onSuccess: (data) => {
      toast.success(" با موفقیت افزوده شد");

      const totalCount = data.totalCount;
      const lastPage = Math.ceil(totalCount / 6);

      router.push(`/dashboard/debts-receivables?page=${lastPage}`);

      queryClient.invalidateQueries({ queryKey: ["debts"] });

      reset();
      modalToggleHandle();
    },

    onError: () => {
      toast.error("خطا در افزودن ");
    },
  });

  const addItemHandle = async (data: addItemFormData) => {
    mutation.mutate(data);
  };
  return (
    <>
      <div className="w-full flex flex-wrap gap-x-4 gap-y-6 mb-10 items-start justify-between">
        <button
          onClick={() => setOpenModal(true)}
          className="flex justify-center items-center p-3 lg:p-4 gap-2  text-base xs:text-lg lg:text-[18px] bg-[var(--color-secondary)] text-white w-auto h-auto rounded-2xl lg:rounded-3xl shadow-xl cursor-pointer"
        >
          افزودن بدهی/طلب جدید
          <IconAdd size="w-6 h-6 lg:w-7 lg:h-7" color="#ffffff" />
        </button>
        <div className="flex gap-x-2 lg:gap-x-4 items-center">
          <p className="whitespace-nowrap text-zinc-600 font-semibold text-[.95rem] hidden sm:flex">
            فیلتر بر اساس :{" "}
          </p>
          <div className="relative flex gap-x-2 lg:gap-x-4 items-center">
            <select
              value={statusItem ?? "all"}
              onChange={(e) =>
                setStatus(
                  e.target.value === "all"
                    ? null
                    : (e.target.value as StatusFilterItem)
                )
              }
              id="bankCardID"
              className="text-sm xs:text-base w-24 xs:w-28 appearance-none shadow-sm shadow-zinc-300/50 bg-white py-1.5 px-4 placeholder:text-black rounded-lg text-black outline-0"
            >
              <option
                value={"all"}
                className="bg-[var(--color-primary)] text-white cursor-pointer"
              >
                همه
              </option>
              <option
                className="bg-[var(--color-primary)] text-white cursor-pointer"
                value={"pendding"}
              >
                در انتظار پرداخت
              </option>
              <option
                className="bg-[var(--color-primary)] text-white cursor-pointer"
                value={"paid"}
              >
                پرداخت شده
              </option>
            </select>
            <span className="absolute left-4 top-1/2 -translate-y-1/2 z-10 transform  pointer-events-none">
              <IconDownArrow size="w-3 h-3" color="#000" />
            </span>
          </div>

          <div className="text-sm xs:text-base w-1/2 flex justify-between items-center bg-white rounded-4xl shadow-sm shadow-zinc-300/50">
            <button
              onClick={() => setType("debt")}
              className={`cursor-pointer py-1.5 px-4  h-full rounded-full ${
                typeItem === "debt"
                  ? "bg-[var(--color-secondary)] text-white xs:px-5"
                  : ""
              }`}
            >
              بدهی
            </button>
            <button
              onClick={() => setType("receivable")}
              className={` cursor-pointer py-1.5 px-4 h-full rounded-full ${
                typeItem === "receivable"
                  ? "bg-[var(--color-primary)] text-white xs:px-5"
                  : ""
              }`}
            >
              طلب
            </button>
          </div>
        </div>
      </div>
      {openModal ? (
        <Modal onClose={modalToggleHandle}>
          <>
            <h2 className="w-1/2 md:w-1/5 mx-auto text-center pb-2 mb-6 lg:mb-12 text-lg xs:text-2xl font-bold  rounded-xl text-nowrap">
              افزودن بدهی / طلب
            </h2>
            <form
              onSubmit={handleSubmit(addItemHandle)}
              className="px-4 md:px-20 lg:px-0 flex items-center justify-between lg:justify-evenly flex-wrap gap-y-3  lg:gap-y-8 gap-x-4 lg:gap-x-20 text-xs xs:text-base"
            >
              <div className="w-full lg:max-w-5/12">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-secondary)]">
                    <IconCategory size="w-6 h-6 xs:w-7 xs:h-7" color="#fff" />
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
                          className="appearance-none w-full bg-[var(--color-secondary)] p-3 placeholder:text-white rounded-xl text-white outline-0"
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
                            color="#fff"
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
                    placeholder="مبلغ را وارد کنید"
                  />
                </div>
                <span className="text-right pt-1.5 text-sm  text-red-600">
                  {errors.price && errors.price.message}
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
                              : undefined
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
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-secondary)]">
                    <IconPaper size="w-7 h-7 xs:w-8 xs:h-8" color="#ffffff" />
                  </div>
                  <input
                    {...register("person")}
                    type="text"
                    className="w-full bg-[var(--color-secondary)] p-3 placeholder:text-white rounded-xl text-white outline-0"
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
      ) : null}
    </>
  );
}
