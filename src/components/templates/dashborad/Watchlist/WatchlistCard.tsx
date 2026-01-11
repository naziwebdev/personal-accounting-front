"use client";
import React from "react";
import { IconTarget } from "@/components/icons/IconTarget";
import { useState } from "react";
import { IconRightUpArrow } from "@/components/icons/IconRightUpArrow";
import { Watchlist } from "@/types/watchlist";
import Link from "next/link";
import { IconDelete } from "@/components/icons/IconDelete";
import { IconEdit } from "@/components/icons/IconEdit";
import { IconActionDot } from "@/components/icons/IconActiondot";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { Controller, useForm } from "react-hook-form";
import { editWatchlist } from "@/validations/watchlist";
import { yupResolver } from "@hookform/resolvers/yup";
import { restoreAccessToken } from "@/utils/restoreAccessToken";
import { toast } from "sonner";
import Modal from "@/components/modules/dashboard/Modal";
import { IconDescription } from "@/components/icons/IconDescription";
import { IconCalender } from "@/components/icons/IconCalender";
import { IconDownArrow } from "@/components/icons/IconDownAroow";
import { IconCoin } from "@/components/icons/IconCoin";
import { toEnglishDigits } from "@/utils/normalizeDigits";

type editWatchlistFormData = {
  title?: string | null;
  waitingPeriod?: "day" | "week" | "month" | "year" | null;
  currentBudget?: number | null;
};

export default function WatchlistCard(Prop: Watchlist) {
  const [isPendding, setIsPendding] = useState<boolean>(
    Prop.status === "pendding"
  );
  const [isShowAction, setIsShowAction] = useState<boolean>(false);

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
      currentBudget: Prop.currentBudget,
      waitingPeriod: Prop.waitingPeriod,
    },
    resolver: yupResolver(editWatchlist),
  });

  const editModalHandle = () => setOpenEditModal(false);

  const editMutation = useMutation({
    mutationFn: async (data: editWatchlistFormData) => {
      const makeRequest = async (token: string) => {
        const finalData = { ...data, currentBudget: data.currentBudget ?? 0 };
        return await fetch(
          `http://localhost:4002/api/v1/watchlists/${Prop.id}`,
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
      queryClient.invalidateQueries({ queryKey: ["watchlists"] });
      editModalHandle();
    },
    onError: () => {
      toast.error("خطا در ویرایش ");
      editModalHandle();
    },
  });

  const editItemHandle = async (data: editWatchlistFormData) => {
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
    mutationFn: async (newStatus: "pendding" | "purchased") => {
      const makeRequest = async (token: string) => {
        return await fetch(
          `http://localhost:4002/api/v1/watchlists/${Prop.id}`,
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
      queryClient.invalidateQueries({ queryKey: ["watchlists"] });
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
          `http://localhost:4002/api/v1/watchlists/${Prop.id}`,
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

      router.push(`/dashboard/watchlist?page=${lastPage}`);

      queryClient.invalidateQueries({ queryKey: ["watchlists"] });
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
    <div className="relative w-full xs:w-[350px] lg:w-[400px] rounded-3xl  p-3 xs:p-4 shadow-zinc-400 shadow-lg">
      {/* bg svg */}
      <div className=" svg-bg-shape absolute inset-0 w-full h-full -z-10 bg-white  rounded-3xl"></div>
      {/* blur */}

      {/* <div className="absolute inset-0 z-0 bg-white/10 rounded-3xl"></div> */}
      {/* content */}
      <div className="relative inset-0 z-20 rounded-3xl">
        <p
          className={`absolute left-1  -top-6 z-20 ${
            isPendding ? "bg-yellow-400" : "bg-[var(--color-primary)]"
          } text-white  px-4 py-1 rounded-lg text-sm sm:text-base shadow-lg shadow-black/20`}
        >
          {Prop.status === "pendding" ? "در انتظار" : "تکمیل شده"}
        </p>
        <div className="flex flex-col gap-3 xs:gap-3.5">
          <div className="flex items-center justify-center gap-4 xs:gap-6">
            <IconTarget
              size="w-[100px] h-[100px] xs:w-[120px] xs:h-[120px]"
              color=""
            />
            <div className="w-1/2 text-center">
              <p className="text-[var(--color-primary)] [text-shadow:_1px_1px_3px_rgba(0,0,0,0.7)] text-base xs:text-lg font-bold ">
                عنوان
              </p>
              <h4 className="font-titr font-bold text-xl xs:text-2xl [text-shadow:_1px_1px_4px_rgba(0,0,0,0.9)] text-white">
                {Prop.title}
              </h4>
            </div>
          </div>
          <div className="w-full flex items-center gap-x-2  text-center text-sm xs:text-base">
            <p>بودجه مورد نیاز </p>
            <p className="text-[var(--color-primary)] [text-shadow:_1px_1px_3px_rgba(0,0,0,0.9)] text-lg xs:text-xl  font-bold ">
              {`${Number(Prop.totalPrice).toLocaleString("fa-IR")} `}
              <span className="text-black text-shadow-none text-sm xs:text-base font-normal">
                تومان
              </span>
            </p>
          </div>
          <div className="w-full flex items-center gap-x-2 text-sm xs:text-base text-center">
            <p>بودجه تو </p>
            <p className="text-[var(--color-primary)] [text-shadow:_1px_1px_3px_rgba(0,0,0,0.9)] text-lg xs:text-xl font-bold ">
              {`${Number(Prop.currentBudget).toLocaleString("fa-IR")} `}
              <span className="text-black font-normal  text-shadow-none text-sm xs:text-base">
                تومان
              </span>
            </p>
          </div>
          <div className="flex gap-x-4">
            <p className=" text-white text-sm xs:text-base [text-shadow:_1px_1px_4px_rgba(0,0,0,0.9)]">
              تارگت زمانی تو{" "}
            </p>
            <p className="text-lg xs:text-xl font-bold text-yellow-400 font-titr">
              {Prop.waitingPeriod === "day"
                ? "یک روز"
                : Prop.waitingPeriod === "month"
                ? "یک ماه"
                : Prop.waitingPeriod === "year"
                ? "یک سال"
                : Prop.waitingPeriod === "week"
                ? "یک هفته"
                : "-"}
            </p>
          </div>
          <p className="text-[var(--color-theme)] [text-shadow:_1px_1px_3px_rgba(0,0,0,0.7)] tracking-wider leading-7 text-sm xs:text-base text-center xs:text-right">
            برای خرید این لیست هر روز باید{" "}
            <span className="text-lg xs:text-xl font-bold text-[var(--color-primary)] underline underline-offset-8">
              {`${Number(Prop.requiredSavingsPerDay).toLocaleString("fa-IR")} `}{" "}
              تومان{" "}
            </span>{" "}
            پس انداز کنی
          </p>
          <div className="relative w-full flex items-center justify-between mt-2 pr-2">
            <div className="flex items-center gap-x-4">
              <Link
                href={`/dashboard/watchlist/${Prop.id}?page=1`}
                className="relative flex justify-center items-center p-1 rounded-full bg-black cursor-pointer group"
              >
                <IconRightUpArrow size="w-7 h-7" color="#fff" />
                <span className="absolute top-0 -left-1  w-[90%] h-[133%] rounded-l-full  border-[var(--color-primary)] rotate-[-45deg] border-[3.5px] border-r-0 pointer-events-none"></span>
              </Link>
            </div>

            <div className="flex  items-center gap-x-2">
              <div
                className={`flex w-[60px] sm:w-[65px] ${
                  isPendding
                    ? "bg-yellow-400 justify-end"
                    : "bg-[var(--color-primary)] justify-start"
                } rounded-2xl p-1`}
              >
                <button
                  onClick={handleToggleStatus}
                  className={`w-6 h-6 cursor-pointer rounded-full bg-white`}
                ></button>
              </div>
              <button
                onClick={() => setIsShowAction(!isShowAction)}
                className="cursor-pointer"
              >
                <IconActionDot
                  size="w-5 h-5 xs:w-6 xs:h-6 font-bold"
                  color="#000"
                />
              </button>
              <div className={`${isShowAction ? "flex" : "hidden"}`}>
                <button onClick={deleteItemHandle} className="cursor-pointer">
                  <IconDelete size="w-6 h-6" color="#e4e2f1" />
                </button>
                <button
                  onClick={() => setOpenEditModal(true)}
                  className="cursor-pointer"
                >
                  <IconEdit size="w-6 h-6" color="#e4e2f1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openEditModal && (
        <Modal onClose={editModalHandle}>
          <>
            <h2 className="w-1/2 md:w-1/5 mx-auto text-center pb-2 mb-12 text-lg xs:text-2xl font-bold  rounded-xl text-nowrap">
              ویرایش واچ لیست
            </h2>
            <form
              onSubmit={handleSubmit(editItemHandle)}
              className="px-4 md:px-20 lg:px-0 flex items-center justify-between lg:justify-center flex-wrap gap-y-3  lg:gap-y-8 gap-x-4 lg:gap-x-20 text-xs xs:text-base"
            >
              <div className="w-full lg:max-w-5/12">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-theme)]">
                    <IconDescription
                      size="w-5 h-5 xs:w-6 xs:h-6"
                      color="#52525B"
                    />
                  </div>
                  <input
                    {...register("title")}
                    type="text"
                    className="w-full bg-[var(--color-theme)] p-3 placeholder:text-[#52525B] rounded-xl text-[#52525B] outline-0"
                    placeholder="نام را وارد کنید"
                  />
                </div>

                <span className="text-right pt-1.5  text-sm  text-red-600">
                  {errors.title && errors.title.message}
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
                    name="waitingPeriod"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <div className="relative w-full">
                        <select
                          {...field}
                          value={field.value ?? "-1"}
                          id="waitingPeriod"
                          className="appearance-none w-full bg-[var(--color-theme)] p-3 placeholder:text-[#52525B] rounded-xl text-[#52525B] outline-0"
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
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-theme)]">
                    <IconCoin size="w-6 h-6 xs:w-7 xs:h-7" color="#52525B" />
                  </div>
                  <input
                    {...register("currentBudget", {
                      onChange: (e) => {
                        e.target.value = toEnglishDigits(e.target.value);
                      },
                    })}
                    type="text"
                    className="w-full bg-[var(--color-theme)] p-3 placeholder:text-[#52525B] rounded-xl text-[#52525B] outline-0"
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
      )}
    </div>
  );
}
