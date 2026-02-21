"use client";

import React, { useState } from "react";
import { IconCardExpense } from "@/components/icons/IconCardExpense";
import { IconUpDirection } from "@/components/icons/IconUpDirection";
import { IconActionDot } from "@/components/icons/IconActiondot";
import { IconDelete } from "@/components/icons/IconDelete";
import { IconEdit } from "@/components/icons/IconEdit";
import { Expense } from "@/types/expense";
import { toEnglishDigits, toPersianDigits } from "@/utils/normalizeDigits";
import { useCards } from "@/hooks/useCards";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { useCategoriesByType } from "@/hooks/useCategories";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editExpense } from "@/validations/expense";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { restoreAccessToken } from "@/utils/restoreAccessToken";
import { toast } from "sonner";
import Modal from "./Modal";
import { IconPaper } from "@/components/icons/IconPaper";
import { IconCoin } from "@/components/icons/IconCoin";
import { IconCategory } from "@/components/icons/IconCategory";
import { IconDownArrow } from "@/components/icons/IconDownAroow";
import { IconBankCard } from "@/components/icons/IconBankCard";
import { IconCalender } from "@/components/icons/IconCalender";
import { IconDescription } from "@/components/icons/IconDescription";
import { useRouter } from "next/navigation";

type editExpenseFormData = {
  title?: string | null;
  categoryID?: number | null;
  bankCardID?: number | null;
  price?: number | null;
  date?: string | null | undefined;
  description?: string | null;
};

type editExpenseFormUI = {
  title?: string | null;
  categoryID?: number | null;
  bankCardID?: number | null;
  price?: string | null;
  date?: string | null | undefined;
  description?: string | null;
};

export default function ExpenseCard(Prop: Expense) {
  const router = useRouter();
  const [isShowAction, setIsShowAction] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);

  const { data: cards } = useCards();
  const queryClient = useQueryClient();
  const { accessToken, setAccessToken } = useAuth();

  ///// edit logic ////
  const {
    data: categories,
    isError,
    isLoading,
  } = useCategoriesByType("expense");

  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: Prop.title,
      categoryID: Prop.category.id,
      bankCardID: Prop?.bankCard?.id,
      price: Prop.price ? toPersianDigits(String(Prop.price)) : null,
      date: Prop.date ? new Date(Prop.date).toISOString().split("T")[0] : null,
      description: Prop?.description,
    },
    resolver: yupResolver(editExpense),
  });

  const editModalHandle = () => setOpenEditModal(false);

  const editMutation = useMutation({
    mutationFn: async (data: editExpenseFormData) => {
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
          bankCard_id:
            typeof data.bankCardID === "number" && data.bankCardID !== -1
              ? data.bankCardID
              : null,
          category_id: data.categoryID,
          date: gregorianDate.toISOString(),
        };

        console.log(finalData);
        return await fetch(`http://localhost:4002/api/v1/expenses/${Prop.id}`, {
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
      if (result.statusCode !== 200) throw new Error("Failed to edit expense");

      return result.data;
    },

    onSuccess: () => {
      toast.success("هزینه با موفقیت ویرایش شد");
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      editModalHandle();
    },
    onError: () => {
      toast.error("خطا در ویرایش هزینه");
      editModalHandle();
    },
  });

  const editExpenseHandle = async (data: editExpenseFormUI) => {
    swal({
      title: "آیا از ویرایش اطمینان دارید ؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((value) => {
      if (value) {
        if (!value) return;

        const payload: editExpenseFormData = {
          ...data,

          price: data.price ? Number(toEnglishDigits(data.price)) : 0,
        };

        editMutation.mutate(payload);
      }
    });
  };

  //////// delete logic ///////

  const removeMutation = useMutation({
    mutationFn: async () => {
      const makeRequest = async (token: string) => {
        return await fetch(`http://localhost:4002/api/v1/expenses/${Prop.id}`, {
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
      if (result.statusCode !== 200)
        throw new Error("Failed to remove expense");

      return result.data;
    },
    onSuccess: (data) => {
      toast.success("هزینه با موفقیت حذف شد");

      const totalCount = data.totalCount;
      const lastPage = Math.ceil(totalCount / 6); // 6 = your pagination limit

      router.push(`/dashboard/expenses?page=${lastPage}`);

      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
    onError: () => {
      toast.error("خطا در حذف هزینه");
    },
  });

  const deleteExpenseHandle = () => {
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
    <div className="relative w-full xs:w-[350px] lg:w-[400px] bg-white rounded-3xl  p-3 xs:p-4 shadow-lg">
      <div className="absolute left-0 top-0 w-1/3 xs:w-1/4 p-1 rounded-tl-2xl rounded-br-2xl flex justify-center items-center gap-1 bg-red-100/80 text-sm xs:text-base font-bold ">
        <IconUpDirection size="w-6 h-5" color="#c81c2a" />
        <p className="text-[#c81c2a]">برداشت</p>
      </div>
      <div className="absolute top-9 xs:top-12 left-4 flex gap-1">
        <button
          onClick={() => setIsShowAction(!isShowAction)}
          className="cursor-pointer"
        >
          <IconActionDot
            size="w-5 h-5 xs:w-6 xs:h-6 font-bold"
            color="#e19ab3"
          />
        </button>

        <div className={`${isShowAction ? "flex" : "hidden"}`}>
          <button
            onClick={() => setOpenEditModal(!openEditModal)}
            className="cursor-pointer"
          >
            <IconEdit size="w-6 h-6 font-bold" color="#e19ab3" />
          </button>
          <button onClick={deleteExpenseHandle} className="cursor-pointer">
            <IconDelete size="w-6 h-6 font-bold" color="#e19ab3" />
          </button>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <IconCardExpense size="xs:w-12 xs:h-12 w-9 h-9" color="#8c66e5" />
        <p className="font-black text-gray-800">
          {Prop.bankCard?.bankName ? Prop.bankCard?.bankName : "پیش فرض"}
        </p>
      </div>
      <div className="flex justify-between items-center pt-2 xs:pt-4">
        <div className="text-center">
          <p className="pb-1.5 text-gray-600">مبلغ</p>
          <p className="text-[var(--color-secondary)] font-black text-lg xs:text-xl">
            {`${Number(Prop.price).toLocaleString("fa-IR")} `}
            <span className="text-[var(--color-secondary)] font-medium text-base">
              تومان
            </span>
          </p>
        </div>
        <div className="text-center">
          <p className="pb-1.5 text-gray-600">تاریخ</p>
          <p className="text-gray-800 font-bold text-sm xs:text-base">
            {toPersianDigits(Prop.date.toLocaleString().split(" ")[0])}
          </p>
        </div>
      </div>
      <div className="w-full flex justify-between bg-pink-50/40 p-2.5 xs:p-4 mt-3 xs:mt-4 border-[1px] border-[var(--color-primary)]/40 rounded-2xl text-sm xs:text-base">
        <div className="flex gap-1">
          <p className="text-gray-600">عنوان : </p>
          <p className="text-gray-800 font-bold text-center">{Prop.title}</p>
        </div>
        <div className="flex gap-1 ps-2 xs:ps-0">
          <p className="text-gray-600 whitespace-nowrap">دسته بندی : </p>
          <p className="text-gray-800 font-bold  text-center">
            {Prop.category.title}
          </p>
        </div>
      </div>
      {openEditModal ? (
        <Modal onClose={editModalHandle}>
          <>
            <h2 className="w-1/2 md:w-1/5 mx-auto text-center pb-2 mb-6 lg:mb-12 text-lg xs:text-2xl font-bold  rounded-xl text-nowrap">
              ویرایش هزینه
            </h2>
            <form
              onSubmit={handleSubmit(editExpenseHandle)}
              className="px-4 md:px-20 lg:px-0 flex items-center justify-between lg:justify-evenly flex-wrap gap-y-3  lg:gap-y-8 gap-x-4 lg:gap-x-20 text-xs xs:text-base"
            >
              <div className="w-full lg:max-w-5/12">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-theme)]">
                    <IconPaper size="w-7 h-7 xs:w-8 xs:h-8" color="#52525b" />
                  </div>
                  <input
                    {...register("title")}
                    type="text"
                    className="w-full bg-[var(--color-theme)] p-3 placeholder:text-[#52525b] rounded-xl text-[#52525b] outline-0"
                    placeholder="عنوان هزینه را وارد کنید"
                  />
                </div>

                <span className="text-right pt-1.5  text-sm  text-red-600">
                  {errors.title && errors.title.message}
                </span>
              </div>
              <div className="w-full lg:max-w-5/12">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-theme)]">
                    <IconCoin size="w-7 h-7 xs:w-8 xs:h-8" color="#52525b" />
                  </div>
                  <input
                    {...register("price")}
                    onChange={(e) => {
                      const value = toPersianDigits(
                        toEnglishDigits(e.target.value)
                      );
                      setValue("price", value, { shouldValidate: true });
                    }}
                    type="text"
                    className="w-full bg-[var(--color-theme)] p-3 placeholder:text-[#52525b] rounded-xl text-[#52525b] outline-0"
                    placeholder="مبلغ هزینه را وارد کنید"
                  />
                </div>
                <span className="text-right pt-1.5 text-sm  text-red-600">
                  {errors.price && errors.price.message}
                </span>
              </div>
              <div className="w-full lg:max-w-5/12">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-theme)]">
                    <IconCategory
                      size="w-7 h-7 xs:w-8 xs:h-8"
                      colorBg="#52525b"
                      colorIcon="#e4e2f1"
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
                          value={field.value ?? -1}
                          id="category"
                          className="appearance-none w-full bg-[var(--color-theme)] p-3 placeholder:text-[#52525b] rounded-xl text-[#52525b] outline-0"
                        >
                          <option
                            value={-1}
                            className="bg-primary-p text-[#52525b]"
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
                            color="#52525b"
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
                          value={field.value ?? -1}
                          id="bankCardID"
                          className="appearance-none w-full p-3 bg-[var(--color-theme)] placeholder:text-zinc-600 rounded-xl text-zinc-600 outline-0"
                        >
                          <option
                            value={-1}
                            className="bg-primary-p text-white"
                          >
                            برداشت شده از کارت (اختیاری)
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
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-theme)]">
                    <IconCalender
                      size="w-6 h-6 xs:w-7 xs:h-7"
                      color="#52525b"
                    />
                  </div>
                  <Controller
                    control={control}
                    name="date"
                    rules={{ required: true }}
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
