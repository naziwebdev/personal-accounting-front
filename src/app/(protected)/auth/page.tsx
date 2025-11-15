"use client";

import Image from "next/image";
import { useState } from "react";
import PhoneForm from "@/components/templates/AuthForms/PhoneForm";
import OtpForm from "@/components/templates/AuthForms/OtpForm";
import { StepType } from "@/types/auth";

export default function page() {
  const [step, setStep] = useState<StepType>("phone");
  const [phone, setPhone] = useState<string>("");

  return (
    <div
      className="relative w-full bg-white h-dvh bg-[url('/images/bg.webp')] bg-bottom
     bg-no-repeat bg-cover"
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 z-10 flex justify-center items-center">
        <div className=" w-[80%] sm:w-1/2 lg:w-1/3 p-5 sm:p-10 backdrop-blur-xs bg-white/10  rounded-3xl border-[1.7px] border-white/30 shadow-2xl">
          <Image
            src="/images/logo-2.png"
            alt="Logo"
            width={70}
            height={140}
            priority
            className="mx-auto"
          />

          <h2 className="font-titr mt-5 text-2xl text-center">
            ورود / ثبت نام
          </h2>
          {step === "phone" ? (
            <PhoneForm setStep={setStep} setPhone={setPhone} />
          ) : (
            <OtpForm setStep={setStep} phone={phone} />
          )}
          <p className="text-sm text-stone-700 text-center mt-5">
            ورود شما به معنای پذیزش قوانین هست
          </p>
        </div>
      </div>
    </div>
  );
}
