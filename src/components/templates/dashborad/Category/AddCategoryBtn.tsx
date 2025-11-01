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

type FormValues = {
  icon: keyof typeof ICONS;
};

export default function AddCategoryBtn() {
  const [openModal, setOpenModal] = useState<boolean>(false);

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
      type: "income",
      icon: "",
    },
    resolver: yupResolver(addCategory),
  });

  const selectedIcon = watch("icon");

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
              // onSubmit={handleSubmit(addCardHandle)}
              className="px-0 md:px-32 flex items-center justify-center flex-wrap gap-y-5 text-xs xs:text-base"
            >
              <div className="w-full">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-secondary)]">
                    <IconPaper size="w-6 h-6 xs:w-7 xs:h-7" color="#ffffff" />{" "}
                  </div>
                  <input
                    // {...register("bankName")}
                    type="text"
                    className="w-full bg-[var(--color-secondary)] p-3 placeholder:text-white rounded-xl text-white outline-0"
                    placeholder="نام دسته بندی را وارد کنید"
                  />
                </div>

                <span className="text-right pt-1.5  text-sm  text-red-600">
                  {/* {errors.bankName && errors.bankName.message} */}
                </span>
              </div>
              <div className="w-full">
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
                          <option
                            value={"-1"}
                            className="bg-primary-p text-white"
                          >
                            نوع دسته بندی را وارد کنید
                          </option>
                          {/* {cards?.length !== 0 &&
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
                            ))} */}
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
                  {/* {errors.cardNumber && errors.cardNumber.message} */}
                </span>
              </div>
              <div className="w-full">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-theme)]">
                    <IconEmoji size="w-6 h-6 xs:w-7 xs:h-7" color="#52525B" />
                  </div>
                  <p>یک ایکون انتخاب کنید (اختیاری) : </p>
                  {Object.entries(ICONS).map(([key, { component: Icon }]) => (
                    <label
                      key={key}
                      className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition ${
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
                      <span className="text-sm capitalize">{key}</span>
                    </label>
                  ))}
                </div>

                <span className="text-right pt-1.5  text-sm  text-red-600">
                  {/* {errors.balance && errors.balance.message} */}
                </span>
              </div>
              <button
                type="submit"
                className="mt-7 w-1/2 md:w-1/4 h-10 xs:h-12 flex justify-center items-center text-white rounded-xl bg-[var(--color-primary)] text-base  xs:text-lg cursor-pointer"
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
