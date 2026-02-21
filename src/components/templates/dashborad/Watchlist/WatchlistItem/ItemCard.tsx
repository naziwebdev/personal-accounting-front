"use client";
import { IconDelete } from "@/components/icons/IconDelete";
import { IconEdit } from "@/components/icons/IconEdit";
import { IconPaper } from "@/components/icons/IconPaper";
import React, { useState } from "react";
import Modal from "@/components/modules/dashboard/Modal";
import { WatchlistItem } from "@/types/watchlist";
import { toEnglishDigits, toPersianDigits } from "@/utils/normalizeDigits";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { Controller, useForm } from "react-hook-form";
import { editWatchlistItem } from "@/validations/watchlist";
import { yupResolver } from "@hookform/resolvers/yup";
import { restoreAccessToken } from "@/utils/restoreAccessToken";
import { toast } from "sonner";
import { IconCoin } from "@/components/icons/IconCoin";
import { IconSerial } from "@/components/icons/IconSerial";
import { IconStatus } from "@/components/icons/IconStatus";
import { IconDownArrow } from "@/components/icons/IconDownAroow";
import { IconDescription } from "@/components/icons/IconDescription";

type editWatchlistItemFormData = {
  title?: null | string;
  price?: null | number;
  count?: null | number;
  description?: null | string;
  status?: null | "pendding" | "purchased";
};

type editWatchlistItemFormUI = {
  title?: null | string;
  price?: null | string;
  count?: null | string;
  description?: null | string;
  status?: null | "pendding" | "purchased";
};

export default function ItemCard(Prop: WatchlistItem) {
  const [isPendding, setIsPendding] = useState<boolean>(
    Prop.status === "pendding"
  );
  const [openDescriptionModal, setOpenDescreptionModal] =
    useState<boolean>(false);

  const descriptionModalHandle = () => setOpenDescreptionModal(false);

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
      title: Prop.title,
      price: Prop.price ? toPersianDigits(String(Prop.price)) : null,
      count: Prop.count ? toPersianDigits(String(Prop.count)) : null,

      description: Prop.description,
      status: Prop.status,
    },
    resolver: yupResolver(editWatchlistItem),
  });

  const editModalHandle = () => setOpenEditModal(false);

  const editMutation = useMutation({
    mutationFn: async (data: editWatchlistItemFormData) => {
      const makeRequest = async (token: string) => {
        const finalData = {
          ...data,
          price: data.price ?? 0,
          count: data.count ?? 0,
          watchlistId: Number(Prop.watchlist?.id),
        };
        console.log(finalData);
        return await fetch(
          `http://localhost:4002/api/v1/watchlists/item/${Prop.id}`,
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
        throw new Error("Failed to edit watchlist");

      return result.data;
    },

    onSuccess: () => {
      toast.success(" با موفقیت ویرایش شد");
      queryClient.invalidateQueries({ queryKey: ["watchlistItems"] });
      editModalHandle();
    },
    onError: () => {
      toast.error("خطا در ویرایش ");
      editModalHandle();
    },
  });

  const editItemHandle = async (data: editWatchlistItemFormUI) => {
    swal({
      title: "آیا از ویرایش اطمینان دارید ؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((value) => {
      if (value) {
        if (!value) return;
      }

      const payload: editWatchlistItemFormData = {
        ...data,

        price: data.price ? Number(toEnglishDigits(data.price)) : null,

        count: data.count ? Number(toEnglishDigits(data.count)) : null,
      };

      editMutation.mutate(payload);
    });
  };

  /////// update status //////

  const updateStatusMutation = useMutation({
    mutationFn: async (newStatus: "pendding" | "purchased") => {
      const makeRequest = async (token: string) => {
        return await fetch(
          `http://localhost:4002/api/v1/watchlists/item/${Prop.id}`,
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

    onSuccess: (data, newStatus) => {
      toast.success("وضعیت با موفقیت به‌روزرسانی شد");
      setIsPendding(newStatus === "pendding");
      queryClient.invalidateQueries({ queryKey: ["watchlistItems"] });
    },

    onError: () => {
      toast.error("خطا در به‌روزرسانی وضعیت");
    },
  });

  const handleToggleStatus = () => {
    const newStatus = isPendding ? "purchased" : "pendding";
    updateStatusMutation.mutate(newStatus);
  };

  //////// delete logic ///////

  const removeMutation = useMutation({
    mutationFn: async () => {
      const makeRequest = async (token: string) => {
        return await fetch(
          `http://localhost:4002/api/v1/watchlists/item/${Prop.id}`,
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
        throw new Error("Failed to remove watchlist");

      return result.data;
    },
    onSuccess: (data) => {
      toast.success(" با موفقیت حذف شد");

      const totalCount = data.totalCount;

      const lastPage = Math.ceil(totalCount / 6);

      router.push(
        `/dashboard/watchlist/${Prop.watchlist?.id}?page=${lastPage}`
      );

      queryClient.invalidateQueries({ queryKey: ["watchlistItems"] });
    },
    onError: (data) => {
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
    <div className="relative w-full xs:w-[350px] lg:w-[400px] h-[300px] rounded-4xl px-3 xs:px-4 py-8 bg-white border-2 border-dashed border-stone-300 ">
      {/* half-cyrcle shapes */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-14  bg-[var(--color-theme)] rounded-b-full border-b-[1px] border-stone-300"></div>
      <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2  w-20 h-14  bg-[var(--color-theme)] rounded-t-full z-20 border-t-[1px] border-stone-300"></div>
      {/* content */}
      <div className="relative h-full inset-0 z-40 flex flex-col justify-around">
        <div className="flex items-center justify-between">
          <div className="">
            <p className=" pb-2">عنوان</p>
            <h4 className=" text-zinc-600 ">{Prop.title}</h4>
          </div>
          <div className="text-left">
            <p className=" pb-2">مبلغ</p>
            <p className="text-[var(--color-primary)] font-semibold text-xl xs:text-2xl">
              {`${Number(Prop.price).toLocaleString("fa-IR")} `}
              <span className=" font-medium text-zinc-600 text-sm">تومان</span>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="">
            <p className="pb-2">تاریخ ایجاد</p>
            <p className="text-zinc-600 ">
              {" "}
              {toPersianDigits(Prop.createdAt.toLocaleString().split(" ")[0])}
            </p>
          </div>
          <div className="">
            <p className="pb-2">تعداد</p>
            <p className="text-zinc-600">
              {" "}
              {toPersianDigits(String(Prop.count))} عدد
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-y-4 justify-between">
          <div className="w-full  flex justify-between gap-x-2.5">
            <p
              className={`${
                isPendding
                  ? "bg-[var(--color-primary)]"
                  : "bg-[var(--color-secondary)]"
              } text-white  px-4 py-1 rounded-lg text-sm sm:text-base shadow-lg shadow-zinc-100`}
            >
              {Prop.status === "pendding" ? "در انتظار" : "تکمیل شده"}
            </p>
            <div
              className={`flex w-[60px] sm:w-[65px] items-center  ${
                !isPendding
                  ? "bg-[var(--color-secondary)] justify-end"
                  : "bg-zinc-600 justify-start"
              } rounded-2xl p-1`}
            >
              <button
                onClick={handleToggleStatus}
                className={`w-6 h-6 cursor-pointer rounded-full bg-white`}
              ></button>
            </div>
          </div>

          <div className="flex items-center gap-x-2 -order-2">
            <button
              onClick={() => setOpenDescreptionModal(!openDescriptionModal)}
              className="cursor-pointer"
            >
              <IconPaper size="w-7 h-7" color="#52525c" />
            </button>
            <button onClick={deleteItemHandle} className="cursor-pointer">
              <IconDelete size="w-7 h-7" color="#e19ab3" />
            </button>
            <button
              onClick={() => setOpenEditModal(!openEditModal)}
              className="cursor-pointer"
            >
              <IconEdit size="w-7 h-7" color="#8c66e5" />
            </button>
          </div>
        </div>
      </div>
      {openDescriptionModal && (
        <Modal onClose={descriptionModalHandle}>
          <>
            <h4 className="text-center text-2xl">توضیحات</h4>
            <div className="mt-6 border-4 border-double border-[var(--color-primary)] p-10 text-center rounded-xl text-zinc-700 tracking-wider">
              {Prop?.description.length !== 0
                ? Prop.description
                : "توضیحاتی وجود ندارد"}
            </div>
          </>
        </Modal>
      )}
      {openEditModal ? (
        <Modal onClose={editModalHandle}>
          <>
            <h2 className="w-1/2 md:w-1/5 mx-auto text-center pb-2 mb-6 lg:mb-12 text-lg xs:text-2xl font-bold  rounded-xl text-nowrap">
              ویرایش واچ لیست
            </h2>
            <form
              onSubmit={handleSubmit(editItemHandle)}
              className="px-4 md:px-20 lg:px-0 flex items-center justify-between lg:justify-evenly flex-wrap gap-y-3  lg:gap-y-8 gap-x-4 lg:gap-x-20 text-xs xs:text-base"
            >
              <div className="w-full lg:max-w-5/12">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-theme)]">
                    <IconPaper size="w-7 h-7 xs:w-8 xs:h-8" color="#52525B" />
                  </div>
                  <input
                    {...register("title")}
                    type="text"
                    className="w-full bg-[var(--color-theme)] p-3 placeholder:text-[#52525B] rounded-xl text-[#52525B] outline-0"
                    placeholder="عنوان واچ لیست را وارد کنید"
                  />
                </div>

                <span className="text-right pt-1.5  text-sm  text-red-600">
                  {errors.title && errors.title.message}
                </span>
              </div>
              <div className="w-full lg:max-w-5/12">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-theme)]">
                    <IconCoin size="w-7 h-7 xs:w-8 xs:h-8" color="#52525B" />
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
                    className="w-full bg-[var(--color-theme)] p-3 placeholder:text-[#52525B] rounded-xl text-[#52525B] outline-0"
                    placeholder="مبلغ واچ لیست را وارد کنید"
                  />
                </div>
                <span className="text-right pt-1.5 text-sm  text-red-600">
                  {errors.price && errors.price.message}
                </span>
              </div>
              <div className="w-full lg:max-w-5/12">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-theme)]">
                    <IconSerial size="w-6 h-6 xs:w-7 xs:h-7" color="#52525B" />
                  </div>
                  <input
                    {...register("count")}
                    onChange={(e) => {
                      const value = toPersianDigits(
                        toEnglishDigits(e.target.value)
                      );
                      setValue("count", value, {
                        shouldValidate: true,
                      });
                    }}
                    type="text"
                    inputMode="numeric"
                    className="w-full bg-[var(--color-theme)] p-3 placeholder:text-[#52525B] rounded-xl text-[#52525B] outline-0"
                    placeholder="تعداد را وارد کنید"
                  />
                </div>
                <span className="text-right pt-1.5 text-sm  text-red-600">
                  {errors.count && errors.count.message}
                </span>
              </div>
              <div className="w-full lg:max-w-5/12">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-9 xs:w-12 xs:h-11 flex justify-center items-center rounded-full bg-[var(--color-theme)]">
                    <IconStatus size="w-7 h-7 xs:w-8 xs:h-8" color="#52525B" />
                  </div>
                  <Controller
                    name="status"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <div className="relative w-full">
                        <select
                          {...field}
                          value={field.value ?? "-1"}
                          id="status"
                          className="appearance-none w-full bg-[var(--color-theme)] p-3 placeholder:text-[#52525B] rounded-xl text-[#52525B] outline-0"
                        >
                          <option value={"-1"} className=" text-white">
                            نوع را مشخص کنید
                          </option>
                          <option
                            className="bg-[var(--color-primary)] text-white"
                            value={"pendding"}
                          >
                            در انتظار
                          </option>
                          <option
                            className="bg-[var(--color-primary)] text-white"
                            value={"purchased"}
                          >
                            تکمیل شده
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
                  {errors.status && errors.status.message}
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
