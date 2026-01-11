"use client";
import { IconAdd } from "@/components/icons/IconAdd";
import { IconCalender } from "@/components/icons/IconCalender";
import { IconCoin } from "@/components/icons/IconCoin";
import { IconDescription } from "@/components/icons/IconDescription";
import { IconDownArrow } from "@/components/icons/IconDownAroow";
import Modal from "@/components/modules/dashboard/Modal";
import { useAuth } from "@/context/AuthContext";
import { StatusFilterWatchlist } from "@/types/watchlist";
import { toEnglishDigits } from "@/utils/normalizeDigits";
import { restoreAccessToken } from "@/utils/restoreAccessToken";
import { addWatchlist } from "@/validations/watchlist";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

type FilterProp = {
  statusItem: StatusFilterWatchlist;
  setStatusItem: React.Dispatch<React.SetStateAction<StatusFilterWatchlist>>;
};

type AddWatchlistFormData = {
  title: string;
  waitingPeriod: "day" | "week" | "month" | "year";
  currentBudget: number;
};

export default function AddWatchlistBtn({
  statusItem,
  setStatusItem,
}: FilterProp) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { accessToken, setAccessToken } = useAuth();
  const queryClient = useQueryClient();

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      waitingPeriod: undefined,
    },
    resolver: yupResolver(addWatchlist),
  });

  const watchlistModalHandle = () => {
    setOpenModal(false);
  };

  const mutation = useMutation({
    mutationFn: async (data: AddWatchlistFormData) => {
      const finalData = { ...data, currentBudget: data.currentBudget ?? 0 };
      const makeRequest = async (token: string) => {
        return await fetch("http://localhost:4002/api/v1/watchlists", {
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

      if (result.statusCode !== 201) throw new Error("Failed to add watchlist");

      return result.data;
    },
    onSuccess: () => {
      toast.success(" با موفقیت افزوده شد");
      queryClient.invalidateQueries({ queryKey: ["watchlists"] });
      reset();
      watchlistModalHandle();
    },
    onError: () => {
      toast.error("خطا در افزودن ");
    },
  });

  const addWatchlistHandle = async (data: AddWatchlistFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="w-full flex flex-wrap gap-x-4 gap-y-6 mb-10 items-start justify-between">
      <button
        onClick={() => setOpenModal(true)}
        className="flex justify-center items-center p-3 lg:p-4 gap-2  text-base xs:text-lg lg:text-[18px] bg-[var(--color-secondary)] text-white w-auto h-auto rounded-2xl lg:rounded-3xl shadow-xl cursor-pointer"
      >
        افزودن واچ لیست جدید
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
              setStatusItem(
                e.target.value === "all"
                  ? null
                  : (e.target.value as StatusFilterWatchlist)
              )
            }
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
              در انتظار
            </option>
            <option
              className="bg-[var(--color-primary)] text-white cursor-pointer"
              value={"purchased"}
            >
              تکمیل شده
            </option>
          </select>
          <span className="absolute left-4 top-1/2 -translate-y-1/2 z-10 transform  pointer-events-none">
            <IconDownArrow size="w-3 h-3" color="#000" />
          </span>
        </div>
      </div>
      {openModal ? (
        <Modal onClose={watchlistModalHandle}>
          <>
            <h2 className="w-1/2 md:w-1/5 mx-auto text-center pb-2 mb-12 text-lg xs:text-2xl font-bold  rounded-xl text-nowrap">
              افزودن واچ لیست
            </h2>
            <form
              onSubmit={handleSubmit(addWatchlistHandle)}
              className="px-4 md:px-20 lg:px-0 flex items-center justify-between lg:justify-center flex-wrap gap-y-3  lg:gap-y-8 gap-x-4 lg:gap-x-20 text-xs xs:text-base"
            >
              <div className="w-full lg:max-w-5/12">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-secondary)]">
                    <IconDescription
                      size="w-5 h-5 xs:w-6 xs:h-6"
                      color="#ffffff"
                    />
                  </div>
                  <input
                    {...register("title")}
                    type="text"
                    className="w-full bg-[var(--color-secondary)] p-3 placeholder:text-white rounded-xl text-white outline-0"
                    placeholder="نام را وارد کنید"
                  />
                </div>

                <span className="text-right pt-1.5  text-sm  text-red-600">
                  {errors.title && errors.title.message}
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
                    name="waitingPeriod"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <div className="relative w-full">
                        <select
                          {...field}
                          value={field.value ?? "-1"}
                          id="waitingPeriod"
                          className="appearance-none w-full bg-[var(--color-secondary)] p-3 placeholder:text-white rounded-xl text-white outline-0"
                        >
                          <option value={"-1"} className=" text-white">
                            تارگت زمانی را مشخص کنید
                          </option>
                          <option
                            className="bg-[var(--color-primary)] text-white"
                            value={"day"}
                          >
                            یک روز
                          </option>
                          <option
                            className="bg-[var(--color-primary)] text-white"
                            value={"week"}
                          >
                            یک هفته
                          </option>
                          <option
                            className="bg-[var(--color-primary)] text-white"
                            value={"month"}
                          >
                            یک ماه
                          </option>
                          <option
                            className="bg-[var(--color-primary)] text-white"
                            value={"year"}
                          >
                            یک سال
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
                  {errors.waitingPeriod && errors.waitingPeriod.message}
                </span>
              </div>
              <div className="w-full lg:max-w-5/12">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-secondary)]">
                    <IconCoin size="w-6 h-6 xs:w-7 xs:h-7" color="#fff" />
                  </div>
                  <input
                    {...register("currentBudget", {
                      onChange: (e) => {
                        e.target.value = toEnglishDigits(e.target.value);
                      },
                    })}
                    type="text"
                    className="w-full bg-[var(--color-secondary)] p-3 placeholder:text-white rounded-xl text-white outline-0"
                    placeholder="بودجه فعلی خود را وارد کنید"
                  />
                </div>

                <span className="text-right pt-1.5  text-sm  text-red-600">
                  {errors.currentBudget && errors.currentBudget.message}
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
