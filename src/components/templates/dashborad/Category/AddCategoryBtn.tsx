"use client";

import { IconAdd } from "@/components/icons/IconAdd";
import React, { useState } from "react";
import Modal from "@/components/modules/dashboard/Modal";

export default function AddCategoryBtn() {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const modalToggleHandle = () => setOpenModal(false);

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="flex justify-center items-center  p-3 lg:p-4 gap-2 mb-10 text-base xs:text-lg lg:text-[18px] bg-[var(--color-secondary)] text-white w-auto h-auto rounded-2xl lg:rounded-3xl shadow-xl cursor-pointer"
      >
        افزودن دسته بندی جدید
        <IconAdd size="w-6 h-6 lg:w-7 lg:h-7" color="#ffffff" />
      </button>
      {openModal ? <Modal onClose={modalToggleHandle}>test</Modal> : null}
    </>
  );
}
