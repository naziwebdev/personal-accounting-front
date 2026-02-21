"use client";
import { IconBank } from "@/components/icons/IconBank";
import { IconDelete } from "@/components/icons/IconDelete";
import { IconEdit } from "@/components/icons/IconEdit";
import React, { useState } from "react";
import { Check, StatusFilterCheck } from "@/types/check";
import { IconActionDot } from "@/components/icons/IconActiondot";
import { toEnglishDigits, toPersianDigits } from "@/utils/normalizeDigits";
import Modal from "./Modal";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { editCheck } from "@/validations/check";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/colors/purple.css";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { restoreAccessToken } from "@/utils/restoreAccessToken";
import { toast } from "sonner";
import { IconCategory } from "@/components/icons/category/IconCategory";
import { IconDownArrow } from "@/components/icons/IconDownAroow";
import { IconStatus } from "@/components/icons/IconStatus";
import { IconCoin } from "@/components/icons/IconCoin";
import { IconCalender } from "@/components/icons/IconCalender";
import { IconPaper } from "@/components/icons/IconPaper";
import { IconSerial } from "@/components/icons/IconSerial";
import { IconDescription } from "@/components/icons/IconDescription";

type editItemFormData = {
  type?: "pay" | "receive" | null;
  status?: "pendding" | "paid" | "returned" | null;
  price?: number | null;
  bank?: string | null;
  payable?: string | null;
  due_date?: string | null;
  serial?: string | null;
  description?: string | null;
};

type editItemFormUI = {
  type?: "pay" | "receive" | null;
  status?: "pendding" | "paid" | "returned" | null;
  price?: string | null;
  bank?: string | null;
  payable?: string | null;
  due_date?: string | null;
  serial?: string | null;
  description?: string | null;
};

export default function CheckCard(Prop: Check) {
  const [isShowAction, setIsShowAction] = useState<boolean>(false);

  const [status, setStatus] = useState<StatusFilterCheck>(Prop.status);

  const editModalHandle = () => setOpenEditModal(false);

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
      status: Prop.status as any,
      bank: Prop.bank,
      payable: Prop.payable,
      price: Prop.price ? toPersianDigits(String(Prop.price)) : null,
      due_date: Prop.due_date
        ? new Date(Prop.due_date).toISOString().split("T")[0]
        : null,
      serial: Prop?.serial,
      description: Prop?.description,
    },
    resolver: yupResolver(editCheck),
  });

  const editMutation = useMutation({
    mutationFn: async (data: editItemFormData) => {
      const makeRequest = async (token: string) => {
        const persianDate = new DateObject({
          date: data.due_date ?? undefined,
          format: "YYYY/MM/DD",
          calendar: persian,
        });
        const gregorianDate = persianDate.convert("gregorian" as any).toDate();

        const finalData = {
          ...data,
          price: data.price ?? 0,
          due_date: gregorianDate.toISOString(),
          issued: gregorianDate.toISOString(),
        };
        return await fetch(`http://localhost:4002/api/v1/checks/${Prop.id}`, {
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
      queryClient.invalidateQueries({ queryKey: ["checks"] });
      editModalHandle();
    },
    onError: () => {
      toast.error("خطا در ویرایش ");
      editModalHandle();
    },
  });

  const editItemHandle = async (data: editItemFormUI) => {
    swal({
      title: "آیا از ویرایش اطمینان دارید ؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((value) => {
      if (value) {
        if (!value) return;

        const payload: editItemFormData = {
          ...data,

          price: data.price ? Number(toEnglishDigits(data.price)) : 0,
        };

        editMutation.mutate(payload);
      }
    });
  };

  /////// update status //////

  const updateStatusMutation = useMutation({
    mutationFn: async (newStatus: "pendding" | "paid" | "returned") => {
      const makeRequest = async (token: string) => {
        return await fetch(`http://localhost:4002/api/v1/checks/${Prop.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({ status: newStatus }),
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

      if (result.statusCode !== 200) throw new Error("Failed to update status");

      return result.data;
    },

    onSuccess: () => {
      toast.success("وضعیت با موفقیت به‌روزرسانی شد");
      queryClient.invalidateQueries({ queryKey: ["checks"] });
    },

    onError: () => {
      toast.error("خطا در به‌روزرسانی وضعیت");
    },
  });

  const handleUpdateStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = e.target.value as StatusFilterCheck | null;
    setStatus(newStatus);
    if (newStatus !== null) {
      updateStatusMutation.mutate(newStatus);
    }
  };

  //////// delete logic ///////

  const removeMutation = useMutation({
    mutationFn: async () => {
      const makeRequest = async (token: string) => {
        return await fetch(`http://localhost:4002/api/v1/checks/${Prop.id}`, {
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
      if (result.statusCode !== 200) throw new Error("Failed to remove check");

      return result.data;
    },
    onSuccess: (data) => {
      toast.success(" با موفقیت حذف شد");

      const totalCount = data.totalCount;

      const lastPage = Math.ceil(totalCount / 6); // 6 = your pagination limit

      router.push(`/dashboard/checks?page=${lastPage}`);

      queryClient.invalidateQueries({ queryKey: ["checks"] });
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
    <div className="relative w-[90%] md:w-[46%] rounded-3xl  p-3 xs:p-4 shadow-zinc-300/80 shadow-sm">
      {/* bg svg */}
      <div className=" svgBg absolute inset-0 w-full h-full -z-10 bg-white  rounded-3xl"></div>
      {/* blur */}

      <div className="absolute inset-0 z-0 bg-white/70 rounded-3xl"></div>
      {/* content */}
      <div className="relative inset-0 z-20 rounded-3xl">
        <p className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 bg-zinc-400/80 text-white px-4 xs:px-8 py-0.5 rounded-lg text-sm ">
          {Prop.type === "pay" ? "پرداختی" : "دریافتی"}
        </p>
        <div className="flex justify-between">
          <div className="text-center">
            <p className="text-sm sm:text-base">تاریخ</p>
            <p className="pt-1.5 text-zinc-600 text-sm sm:text-base">
              {toPersianDigits(Prop.due_date.toLocaleString().split(" ")[0])}
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 pt-2">
            <IconBank size="w-7 h-7 xs:w-8 xs:h-8" color="#8c66e5" />
            <p className="text-sm xs:text-base  font-titr  text-center text-[var(--color-secondary)]">
              بانک <span className="font-black">{Prop.bank}</span>
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm sm:text-base">شماره سریال</p>
            <p className="pt-1.5 text-zinc-600 text-sm sm:text-base">
              {Prop.serial.length !== 0 ? toPersianDigits(Prop.serial) : "-"}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex flex-col xs:flex-row items-center justify-center gap-2">
            <p className="text-sm sm:text-base">مبلغ</p>
            <p className="text-xl sm:text-2xl font-semibold text-[var(--color-secondary)]">
              {`${Number(Prop.price).toLocaleString("fa-IR")} `}
              <span className="text-zinc-600 text-xs sm:text-base font-normal">
                ریال
              </span>
            </p>
          </div>
          <div className="flex flex-col xs:flex-row items-center justify-center gap-2">
            <p className="text-sm sm:text-base text-center">در وجه</p>
            <p className=" text-zinc-600 text-sm sm:text-base">
              {Prop.payable}
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mt-4">
          <form className="flex items-center gap-2.5 xs:gap-3 text-center">
            <label className="relative flex items-center gap-1 xs:gap-2 cursor-pointer text-xs xs:text-sm text-gray-800">
              <input
                type="radio"
                name="status"
                value="pendding"
                defaultChecked={Prop.status === "pendding"}
                onChange={handleUpdateStatus}
                className="peer absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 opacity-0"
              />
              <span className="relative h-4 w-4 rounded-full border border-gray-400 peer-checked:border-yellow-400 peer-checked:border-4 transition-all">
                <span className="absolute left-1 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-white hidden peer-checked:block"></span>
              </span>
              <span>در انتظار</span>
            </label>

            <label className="relative flex items-center gap-1 xs:gap-2 cursor-pointer text-xs xs:text-sm text-gray-800">
              <input
                type="radio"
                name="status"
                value="paid"
                defaultChecked={Prop.status === "paid"}
                onChange={handleUpdateStatus}
                className="peer absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 opacity-0"
              />
              <span className="relative h-4 w-4 rounded-full border border-gray-400 peer-checked:border-green-500 peer-checked:border-4 transition-all">
                <span className="absolute left-1 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-white hidden peer-checked:block"></span>
              </span>
              <span>پرداخت شده</span>
            </label>

            <label className="relative flex items-center gap-1 xs:gap-2 cursor-pointer text-xs xs:text-sm text-gray-800">
              <input
                type="radio"
                name="status"
                value="returned"
                defaultChecked={Prop.status === "returned"}
                onChange={handleUpdateStatus}
                className="peer absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 opacity-0"
              />
              <span className="relative h-4 w-4 rounded-full border border-gray-400 peer-checked:border-red-500 peer-checked:border-4 transition-all">
                <span className="absolute left-1 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-white hidden peer-checked:block"></span>
              </span>
              <span>برگشتی</span>
            </label>
          </form>
          <div className="w-full lg:w-auto flex justify-between lg:justify-end items-center gap-x-2">
            <div
              className={`w-auto flex justify-center items-center p-2 rounded-lg text-white text-xs xs:text-sm whitespace-nowrap
            ${
              Prop.status === "pendding"
                ? "bg-yellow-400"
                : Prop.status === "paid"
                ? "bg-green-600"
                : Prop.status === "returned"
                ? "bg-red-600"
                : ""
            }`}
            >
              وضعیت :{" "}
              {Prop.status === "pendding"
                ? "در انتظار"
                : Prop.status === "paid"
                ? "پرداخت شده"
                : Prop.status === "returned"
                ? "برگشتی"
                : ""}
            </div>
            <div className="flex items-center gap-x-1.5">
              <button
                onClick={() => setIsShowAction(!isShowAction)}
                className="cursor-pointer"
              >
                <IconActionDot
                  size="w-5 h-5 xs:w-6 xs:h-6 font-bold"
                  color="#8c66e5"
                />
              </button>

              <div className={`${isShowAction ? "flex gap-0.5" : "hidden"}`}>
                <button
                  onClick={() => setOpenEditModal(true)}
                  className="cursor-pointer"
                >
                  <IconEdit size="w-6 h-6 font-bold" color="#e19ab3" />
                </button>
                <button onClick={deleteItemHandle} className="cursor-pointer">
                  <IconDelete size="w-6 h-6 font-bold" color="#e19ab3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openEditModal ? (
        <Modal onClose={editModalHandle}>
          <>
            <h2 className="w-1/2 md:w-1/5 mx-auto text-center pb-2 mb-6 lg:mb-12 text-lg xs:text-2xl font-bold  rounded-xl text-nowrap">
              افزودن چک
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
                            value={"pay"}
                          >
                            پرداختی
                          </option>
                          <option
                            className="bg-[var(--color-primary)] text-white"
                            value={"receive"}
                          >
                            دریافتی
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
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-theme)]">
                    <IconStatus size="w-6 h-6 xs:w-7 xs:h-7" color="#52525B" />
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
                            وضعیت را مشخص کنید
                          </option>
                          <option
                            className="bg-[var(--color-primary)] text-white"
                            value={"pendding"}
                          >
                            در انتظار
                          </option>
                          <option
                            className="bg-[var(--color-primary)] text-white"
                            value={"paid"}
                          >
                            پرداخت شده
                          </option>
                          <option
                            className="bg-[var(--color-primary)] text-white"
                            value={"returned"}
                          >
                            برگشتی
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
                    name="due_date"
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
                  {errors.due_date && errors.due_date.message}
                </span>
              </div>
              <div className="w-full lg:max-w-5/12">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-theme)]">
                    <IconPaper size="w-7 h-7 xs:w-8 xs:h-8" color="#52525B" />
                  </div>
                  <input
                    {...register("payable")}
                    type="text"
                    className="w-full bg-[var(--color-theme)] p-3 placeholder:text-[#52525B] rounded-xl text-[#52525B] outline-0"
                    placeholder=" نام شخص را وارد کنید"
                  />
                </div>

                <span className="text-right pt-1.5  text-sm  text-red-600">
                  {errors.payable && errors.payable.message}
                </span>
              </div>
              <div className="w-full lg:max-w-5/12">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-theme)]">
                    <IconSerial size="w-6 h-6 xs:w-7 xs:h-7" color="#52525B" />
                  </div>
                  <input
                    {...register("serial", {
                      onChange: (e) => {
                        e.target.value = toEnglishDigits(e.target.value);
                      },
                    })}
                    type="text"
                    className="w-full bg-[var(--color-theme)] p-3 placeholder:text-[#52525B] rounded-xl text-[#52525B] outline-0"
                    placeholder=" سریال  را وارد کنید"
                  />
                </div>

                <span className="text-right pt-1.5  text-sm  text-red-600">
                  {errors.serial && errors.serial.message}
                </span>
              </div>
              <div className="w-full lg:max-w-5/12">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-theme)]">
                    <IconBank size="w-5 h-5 xs:w-6 xs:h-6" color="#52525B" />
                  </div>
                  <input
                    {...register("bank")}
                    type="text"
                    className="w-full bg-[var(--color-theme)] p-3 placeholder:text-[#52525B] rounded-xl text-[#52525B] outline-0"
                    placeholder=" نام بانک را وارد کنید"
                  />
                </div>

                <span className="text-right pt-1.5  text-sm  text-red-600">
                  {errors.bank && errors.bank.message}
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
                    placeholder="توضیحات را وارد کنید "
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
