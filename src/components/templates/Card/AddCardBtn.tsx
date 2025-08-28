"use client";
import React from "react";
import { IconAdd } from "@/components/icons/IconAdd";
import Modal from "@/components/modules/Modal";
import { useState } from "react";

export default function AddCardBtn() {
  const [openCardModal, setOpenCardModal] = useState<boolean>(false);

  const cardModalHandle = () => {
    setOpenCardModal(false);
  };
  return (
    <>
      <button
        onClick={() => setOpenCardModal(true)}
        className="flex justify-center items-center  p-3 lg:p-4 gap-2 mb-10 text-base xs:text-lg lg:text-[19px] bg-[var(--color-secondary)] text-white w-auto h-auto rounded-2xl lg:rounded-3xl shadow-xl cursor-pointer"
      >
        افزودن کارت جدید
        <IconAdd size="hw-6 lg:w-7 h-6 lg:h-7" color="#ffffff" />
      </button>
      {openCardModal ? <Modal onClose={cardModalHandle}>test</Modal> : null}
    </>
  );
}
