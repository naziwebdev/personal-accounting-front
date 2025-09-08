import Image from "next/image";
import { IconDelete } from "../../icons/IconDelete";
import { IconEdit } from "../../icons/IconEdit";
import { Card } from "@/types/card";
import { formatCardNumber } from "@/utils/formatCardNumber";
import Modal from "./Modal";
import { useState } from "react";

type BgcardPropsType = {
  bgCard: string;
  fillOne: string;
  fillTwo: string;
};

type BankCardProps = BgcardPropsType & Card;

export default function BankCard({
  bgCard,
  fillOne,
  fillTwo,
  id,
  bankName,
  cardNumber,
  balance,
}: BankCardProps) {
  const [openEditCardModal, setOpenEditCardModal] = useState<boolean>(false);

  const editCardModalHandle = () => {
    setOpenEditCardModal(false);
  };

  return (
    <div
      className={`relative overflow-hidden flex flex-col justify-between w-full h-[180px] xs:w-[350px] xs:h-[200px] rounded-[40px] ${bgCard} text-white p-6 shadow-xl`}
    >
      {/* Decorative SVG Background */}
      <div className="absolute -bottom-16 xs:-bottom-14 left-0 w-full h-full z-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 390"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transition duration-300 ease-in-out delay-150"
        >
          <path
            d="M 0,400 L 0,250 C 85.82,282.95 171.64,315.89 295,286 C 418.36,256.11 579.25,163.38 719,132 C 858.75,100.63 977.36,130.61 1094,123 C 1210.64,115.39 1325.32,70.20 1440,25 L 1440,400 L 0,400 Z"
            fill={`${fillOne}`}
            fillOpacity="0.53"
          />
          <path
            d="M 0,400 L 0,383 C 127.21,390.23 254.43,397.46 389,373 C 523.57,348.54 665.5,292.38 766,273 C 866.5,253.63 925.57,271.04 1031,258 C 1136.43,244.96 1288.21,201.48 1440,158 L 1440,400 L 0,400 Z"
            fill={`${fillTwo}`}
            fillOpacity=".8"
          />
        </svg>
      </div>

      {/* Card Content */}
      <div className="flex justify-between items-center z-10">
        <Image
          alt="chip"
          src="/images/chip.png"
          width={40}
          height={35}
          className="w-9 h-6  xs:w-12 xs:h-9"
        />
        <p className="text-shadow-lg text-base xs:text-[18px]">{bankName}</p>
      </div>

      <div className="text-base xs:text-xl whitespace-nowrap text-center tracking-widest text-shadow-lg z-10">
        {formatCardNumber(cardNumber)}
      </div>

      <div className="flex items-center justify-between z-10">
        <div>
          <p className="mb-2 text-shadow-lg text-xs xs:text-sm">موجودی</p>
          <span className="text-shadow-lg text-sm xs:text-base">
            {balance.toLocaleString("fa-IR")} تومان
          </span>
        </div>
        <div className="flex flex-col gap-y-0.5">
          <button className="cursor-pointer">
            <IconDelete color="#fff" size="w-5 h-5 xs:w-6 xs:h-6" />
          </button>
          <button
            onClick={() => setOpenEditCardModal(true)}
            className="cursor-pointer"
          >
            <IconEdit color="#fff" size="w-5 h-5 xs:w-6 xs:h-6" />
          </button>
        </div>
      </div>
      {openEditCardModal ? (
        <Modal onClose={editCardModalHandle}>
          <>
            <h2 className="w-1/2 md:w-1/5 mx-auto text-center pb-2 mb-12 text-lg xs:text-2xl font-bold border-b-4 border-[var(--color-primary)] rounded-xl text-nowrap">
              ویرایش کارت
            </h2>
            <form
              // onSubmit={handleSubmit(addCardHandle)}
              className="px-0 md:px-32 flex items-center justify-center flex-wrap gap-y-5 text-xs xs:text-base"
            >
              <div className="w-full">
                <input
                  // {...register("bankName")}
                  type="text"
                  className="w-full bg-[var(--color-theme)] p-3 placeholder:text-zinc-600 rounded-xl text-zinc-600 outline-0"
                  placeholder="نام بانک را وارد کنید (اختیاری)"
                />
                <span className="text-right pt-1.5  text-sm  text-red-600">
                  {/* {errors.bankName && errors.bankName.message} */}
                </span>
              </div>
              <div className="w-full">
                <input
                  // {...register("cardNumber", {
                  //   onChange: (e) => {
                  //     e.target.value = toEnglishDigits(e.target.value);
                  //   },
                  // })}
                  type="text"
                  className="w-full bg-[var(--color-theme)] p-3 placeholder:text-zinc-600 rounded-xl text-zinc-600 outline-0"
                  placeholder="شماره کارت ۱۶ رقمی را وارد کنید (اختیاری)"
                />
                <span className="text-right pt-1.5 text-sm  text-red-600">
                  {/* {errors.cardNumber && errors.cardNumber.message} */}
                </span>
              </div>
              <div className="w-full">
                <input
                  // {...register("balance", {
                  //   onChange: (e) => {
                  //     e.target.value = toEnglishDigits(e.target.value);
                  //   },
                  // })}
                  type="text"
                  className="w-full bg-[var(--color-theme)] p-3 placeholder:text-zinc-600 rounded-xl text-zinc-600 outline-0"
                  placeholder="موجودی کارت را وارد کنید ( اختیاری )"
                />
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
    </div>
  );
}
