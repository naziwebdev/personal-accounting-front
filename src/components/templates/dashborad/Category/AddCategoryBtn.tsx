"use client";

import { IconAdd } from "@/components/icons/IconAdd";
import React, { useState } from "react";
import Modal from "@/components/modules/dashboard/Modal";
import { IconCategory } from "@/components/icons/category/IconCategory";
import { IconEmoji } from "@/components/icons/category/IconEmoji";
import { IconPaper } from "@/components/icons/IconPaper";
import { IconDownArrow } from "@/components/icons/IconDownAroow";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addCategory } from "@/validations/category";
import { ICONS } from "../../../../config/categoryIcons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { restoreAccessToken } from "@/utils/restoreAccessToken";
import { toast } from "sonner";

type FormValues = {
  icon: keyof typeof ICONS;
};

type addCategoryFormData = {
  title: string;
  type: "income" | "expense";
  icon?: string | null | FormValues;
};

export default function AddCategoryBtn() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { accessToken, setAccessToken } = useAuth();
  const queryClient = useQueryClient();
  const modalToggleHandle = () => setOpenModal(false);

  const {
    register,
    reset,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      type:undefined,
      icon: "",
    },
    resolver: yupResolver(addCategory),
  });

  const selectedIcon = watch("icon");

  const addMutation = useMutation({
    mutationFn: async (data: addCategoryFormData) => {
      const makeRequest = async (token: string) => {
        return await fetch("http://localhost:4002/api/v1/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
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

      if (result.statusCode !== 201) throw new Error("Failed to add category");

      return result.data;
    },
    onSuccess: () => {
      toast.success("دسته بندی با موفقیت افزوده شد");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      reset();
      modalToggleHandle();
    },
    onError: () => {
      toast.error("خطا در افزودن دسته بندی");
    },
  });

  const addCategoryHandle = (data: addCategoryFormData) => {
    addMutation.mutate(data);
  };

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="flex justify-center items-center  p-3 lg:p-4 gap-2 mb-10 text-base xs:text-lg lg:text-[18px] bg-[var(--color-secondary)] text-white w-auto h-auto rounded-2xl lg:rounded-3xl shadow-xl cursor-pointer"
      >
        افزودن دسته بندی جدید
        <IconAdd size="w-6 h-6 lg:w-7 lg:h-7" color="#ffffff" />
      </button>
      {openModal ? (
        <Modal onClose={modalToggleHandle}>
          <>
            <h2 className="w-1/2 md:w-1/5 mx-auto text-center pb-2 mb-12 text-lg xs:text-2xl font-bold  rounded-xl text-nowrap">
              افزودن دسته بندی
            </h2>
            <form
              onSubmit={handleSubmit(addCategoryHandle)}
              className="px-4 md:px-20 lg:px-0 flex items-center justify-center flex-wrap gap-y-5 text-xs xs:text-base"
            >
              <div className="w-full flex flex-wrap items-center gap-6 justify-between lg:justify-evenly">
                <div className="w-full lg:max-w-5/12">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-secondary)]">
                      <IconPaper size="w-6 h-6 xs:w-7 xs:h-7" color="#ffffff" />{" "}
                    </div>
                    <input
                      {...register("title")}
                      type="text"
                      className="w-full bg-[var(--color-secondary)] p-3 placeholder:text-white rounded-xl text-white outline-0"
                      placeholder="نام دسته بندی را وارد کنید"
                    />
                  </div>

                  <span className="text-right pt-1.5  text-sm  text-red-600">
                    {errors.title && errors.title.message}
                  </span>
                </div>
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
                            id="bankCardID"
                            className="appearance-none w-full bg-[var(--color-secondary)] p-3 placeholder:text-white rounded-xl text-white outline-0"
                          >
                            <option value={"-1"} className=" text-white">
                              نوع دسته بندی را وارد کنید
                            </option>
                            <option
                              className="bg-[var(--color-primary)] text-white"
                              value={"income"}
                            >
                              درامد
                            </option>
                            <option
                              className="bg-[var(--color-primary)] text-white"
                              value={"expense"}
                            >
                              هزینه
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
              </div>

              <div className="w-full">
                <div className="flex items-center flex-wrap justify-center gap-2 pt-4">
                  <div className="flex items-center gap-x-2.5">
                    <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-theme)]">
                      <IconEmoji size="w-6 h-6 xs:w-7 xs:h-7" color="#52525B" />
                    </div>
                    <p>یک ایکون انتخاب کنید (اختیاری) : </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {Object.entries(ICONS).map(([key, { component: Icon }]) => (
                      <label
                        key={key}
                        className={`cursor-pointer border rounded-xl p-2 sm:p-4 flex items-center justify-center gap-2 transition ${
                          selectedIcon === key
                            ? "border-[var(--color-secondary)] bg-[var(--color-theme)]"
                            : "border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          value={key}
                          {...register("icon")}
                          className="hidden"
                        />
                        <Icon size="w-8 h-8" color="#333" />
                      </label>
                    ))}
                  </div>
                </div>

                <span className="text-right pt-1.5  text-sm  text-red-600">
                  {errors.icon && errors.icon.message}
                </span>
              </div>

              <button
                type="submit"
                className="mt-7 w-1/3 sm:w-1/6 h-10 xs:h-12 flex justify-center items-center text-white rounded-xl bg-[var(--color-primary)] text-base  xs:text-lg cursor-pointer"
              >
                تایید
              </button>
            </form>
          </>
        </Modal>
      ) : null}
    </>
  );
}
