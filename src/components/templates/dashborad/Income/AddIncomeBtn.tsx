"use client";
import React from "react";
import { IconAdd } from "@/components/icons/IconAdd";

export default function AddIncomeBtn() {
  return (
    <>
      <button
        // onClick={() => setOpenCardModal(true)}
        className="flex justify-center items-center  p-3 lg:p-4 gap-2 mb-10 text-base xs:text-lg lg:text-[18px] bg-[var(--color-secondary)] text-white w-auto h-auto rounded-2xl lg:rounded-3xl shadow-xl cursor-pointer"
      >
        افزودن درامد جدید
        <IconAdd size="w-6 h-6 lg:w-7 lg:h-7" color="#ffffff" />
      </button>
      {/* {openCardModal ? (
        <Modal onClose={cardModalHandle}>
          <>
            <h2 className="w-1/2 md:w-1/5 mx-auto text-center pb-2 mb-12 text-lg xs:text-2xl font-bold  rounded-xl text-nowrap">
              افزودن کارت
            </h2>
            <form
              onSubmit={handleSubmit(addCardHandle)}
              className="px-0 md:px-32 flex items-center justify-center flex-wrap gap-y-5 text-xs xs:text-base"
            >
              <div className="w-full">
                <input
                  {...register("bankName")}
                  type="text"
                  className="w-full bg-[var(--color-secondary)] p-3 placeholder:text-white rounded-xl text-white outline-0"
                  placeholder="نام بانک را وارد کنید"
                />
                <span className="text-right pt-1.5  text-sm  text-red-600">
                  {errors.bankName && errors.bankName.message}
                </span>
              </div>
              <div className="w-full">
                <input
                  {...register("cardNumber", {
                    onChange: (e) => {
                      e.target.value = toEnglishDigits(e.target.value);
                    },
                  })}
                  type="text"
                  className="w-full bg-[var(--color-secondary)] p-3 placeholder:text-white rounded-xl text-white outline-0"
                  placeholder="شماره کارت ۱۶ رقمی را وارد کنید"
                />
                <span className="text-right pt-1.5 text-sm  text-red-600">
                  {errors.cardNumber && errors.cardNumber.message}
                </span>
              </div>
              <div className="w-full">
                <input
                  {...register("balance", {
                    onChange: (e) => {
                      e.target.value = toEnglishDigits(e.target.value);
                    },
                  })}
                  type="text"
                  className="w-full bg-[var(--color-theme)] p-3 placeholder:text-zinc-600 rounded-xl text-zinc-600 outline-0"
                  placeholder="موجودی کارت را وارد کنید ( اختیاری )"
                />
                <span className="text-right pt-1.5  text-sm  text-red-600">
                  {errors.balance && errors.balance.message}
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
      ) : null} */}
    </>
  );
}
