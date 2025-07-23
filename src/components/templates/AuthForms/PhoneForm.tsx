import React from "react";
import { StepType } from "@/types/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface StepProps {
  step: StepType;
}

export default function PhoneForm({ step }: StepProps) {
  return (
    <>
      <p className="mt-10 text-sm text-right">
        لطفا شماره موبایل خود را وارد کنید
      </p>
      <form className="w-full flex flex-col gap-y-10 items-center justify-center mt-5">
        <input
          type="text"
          placeholder="09120987654 : مثال"
          className="w-full text-white placeholder:text-right placeholder:text-stone-700 placeholder:text-sm p-3 rounded-xl  border-[1.7px] border-white/30  shadow-2xl outline-0"
        />
        <button
          type="submit"
          className="w-full p-3 rounded-xl  shadow-2xl text-white font-titr bg-rose-300/90 cursor-pointer text-lg"
        >
          ورود
        </button>
      </form>
    </>
  );
}
