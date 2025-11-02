"use client";
import React, { useState } from "react";
import { IconActionDot } from "@/components/icons/IconActiondot";
import { IconDollar } from "@/components/icons/category/IconDollar";
import { ICONS } from "../../../../config/categoryIcons";
import { IconEdit } from "@/components/icons/IconEdit";
import { IconDelete } from "@/components/icons/IconDelete";
import Modal from "@/components/modules/dashboard/Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCategory } from "@/validations/category";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@/context/AuthContext";
import { restoreAccessToken } from "@/utils/restoreAccessToken";
import { toast } from "sonner";
import { IconPaper } from "@/components/icons/IconPaper";
import { IconCategory } from "@/components/icons/category/IconCategory";
import { IconDownArrow } from "@/components/icons/IconDownAroow";
import { IconEmoji } from "@/components/icons/category/IconEmoji";

type CategoryCardProps = {
  id: number;
  title: string;
  type: "income" | "expense";
  icon: string;
  color: string;
  bgIcon: string;
};

type FormValues = {
  icon: keyof typeof ICONS;
};

type editCategoryFormData = {
  title?: string | null;
  type?: "income" | "expense" | null;
  icon?: string | null | FormValues;
};
export default function CategoryCard({
  id,
  title,
  type,
  icon,
  color,
  bgIcon,
}: CategoryCardProps) {
  const isValidIcon = icon in ICONS;

  const IconComponent = isValidIcon
    ? ICONS[icon as keyof typeof ICONS].component
    : null;

  const { accessToken, setAccessToken } = useAuth();

  const [isShowAction, setIsShowAction] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const editModalToggleHandle = () => setOpenEditModal(false);

  const {
    register,
    reset,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title,
      type,
      icon,
    },
    resolver: yupResolver(editCategory),
  });

  const selectedIcon = watch("icon");

  //edit category logic
  const editMutation = useMutation({
    mutationFn: async (data: editCategoryFormData) => {
      const makeRequest = async (token: string) => {
        return await fetch(`http://localhost:4002/api/v1/categories/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
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
      if (result.statusCode !== 200) throw new Error("Failed to edit category");

      return result.data;
    },
    onSuccess: () => {
      toast.success("دسته بندی با موفقیت ویرایش شد");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      editModalToggleHandle();
    },
    onError: () => {
      toast.error("خطا در ویرایش دسته بندی");
      editModalToggleHandle();
    },
  });

  const editCategoryHandle = (data: editCategoryFormData) => {
    swal({
      title: "آیا از ویرایش کارت اطمینان دارید ؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((value) => {
      if (value) {
        editMutation.mutate(data);
      }
    });
  };

  ///edit category logic

  //delete category logic
  const removeMutation = useMutation({
    mutationFn: async () => {
      const makeRequest = async (token: string) => {
        return await fetch(`http://localhost:4002/api/v1/categories/${id}`, {
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
        throw new Error("Failed to remove category");

      return result.data;
    },
    onSuccess: () => {
      toast.success("دسته بندی با موفقیت حذف شد");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      toast.error("خطا در حذف دسته بندی");
    },
  });

  const deleteCategoryHandle = () => {
    swal({
      title: "آیا از حذف دسته بندی اطمینان دارید ؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((value) => {
      if (value) {
        removeMutation.mutate();
      }
    });
  };

  return (
    <div
      className={`relative mt-4 ms-14 flex gap-x-2 justify-between items-center w-2/3 xl:w-10/12 p-4 ${color} rounded-xl shadow-lg shadow-zinc-400/50`}
    >
      <div className="shape absolute w-8 h-[110%] -right-6 -top-1/2 -z-20 border-t-0 border-l-0 border-[3.5px] border-black border-dashed"></div>
      <div className="flex items-center gap-x-3 xl:gap-x-5">
        <div
          className={`flex justify-center items-center w-14 h-14 md:w-[4.15rem] md:h-[4.15rem] rounded-full  shadow-lg shadow-zinc-500/40 ${bgIcon} border-4 border-white border-dotted `}
        >
          {IconComponent ? (
            <IconComponent size="w-6 h-6 md:w-10 md:h-10" color="#fff" />
          ) : (
            <IconDollar size="w-6 h-6 md:w-10 md:h-10" color="#fff" />
          )}
        </div>
        <p className="text-base md:text-xl text-shadow-[1px_1px_2px_gray] text-white">
          {title}
        </p>
      </div>
      <button
        onClick={() => setIsShowAction(!isShowAction)}
        className="cursor-pointer"
      >
        <IconActionDot size="w-5 h-5 md:w-7 md:h-7" color="#fff" />
      </button>

      <div className={`${isShowAction ? "flex flex-col" : "hidden"}`}>
        <button
          onClick={() => setOpenEditModal(!openEditModal)}
          className="cursor-pointer"
        >
          <IconEdit size="w-6 h-6 font-bold" color="#fff" />
        </button>
        <button onClick={deleteCategoryHandle} className="cursor-pointer">
          <IconDelete size="w-6 h-6 font-bold" color="#fff" />
        </button>
      </div>
      {openEditModal ? (
        <Modal onClose={editModalToggleHandle}>
          <>
            <h2 className="w-1/2 md:w-1/5 mx-auto text-center pb-2 mb-12 text-lg xs:text-2xl font-bold  rounded-xl text-nowrap">
              افزودن دسته بندی
            </h2>
            <form
              onSubmit={handleSubmit(editCategoryHandle)}
              className="px-4 md:px-20 lg:px-0 flex items-center justify-center flex-wrap gap-y-5 text-xs xs:text-base"
            >
              <div className="w-full flex flex-wrap items-center gap-6 justify-between lg:justify-evenly">
                <div className="w-full lg:max-w-5/12">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-theme)]">
                      <IconPaper size="w-6 h-6 xs:w-7 xs:h-7" color="#52525b" />{" "}
                    </div>
                    <input
                      {...register("title")}
                      type="text"
                      className="w-full bg-[var(--color-theme)] p-3 placeholder:text-[#52525b] rounded-xl text-[#52525b] outline-0"
                      placeholder="نام دسته بندی را وارد کنید"
                    />
                  </div>

                  <span className="text-right pt-1.5  text-sm  text-red-600">
                    {errors.title && errors.title.message}
                  </span>
                </div>
                <div className="w-full lg:max-w-5/12">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-theme)]">
                      <IconCategory
                        size="w-6 h-6 xs:w-7 xs:h-7"
                        color="#52525b"
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
                            id="bankCardID"
                            className="appearance-none w-full bg-[var(--color-theme)] p-3 placeholder:text-[#52525b] rounded-xl text-[#52525b] outline-0"
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
                              color="#52525b"
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
                className="mt-7 w-1/3 sm:w-1/5 h-10 xs:h-12 flex justify-center items-center text-white rounded-xl bg-[var(--color-primary)] text-base  xs:text-lg cursor-pointer"
              >
                تایید
              </button>
            </form>
          </>
        </Modal>
      ) : null}
    </div>
  );
}
