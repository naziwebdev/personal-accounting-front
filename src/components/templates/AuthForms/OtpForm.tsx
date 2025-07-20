"use client";

import React, { useEffect, useRef, useState } from "react";

export type StepType = "phone" | "otp";

interface Props {
  setStep: React.Dispatch<React.SetStateAction<StepType>>;
}

export default function OtpForm({ setStep }: Props) {
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [timeLeft, setTimeLeft] = useState<number>(120); //seconds
  const [isExpireTime, setIsExpireTime] = useState<boolean>(false);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsExpireTime(true);
      return;
    }

    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handleChange = (index: number, value: string) => {
    //codes
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    //codes
  };
  return (
    <>
      <div className="flex justify-center flex-col sm:flex-row sm:justify-between  items-center gap-3 mt-10 text-sm text-center">
        <button
          className="cursor-pointer text-purple-800"
          onClick={() => setStep("phone")}
        >
          تغییر شماره موبایل
        </button>
        <span>لطفا کد تایید را وارد کنید</span>
      </div>

      <form className="w-full flex flex-col gap-y-6 items-center justify-center">
        <div className="w-full flex gap-x-4 flex-nowrap items-center justify-center mt-5">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              className="w-1/5 placeholder:text-right placeholder:text-stone-700 placeholder:text-sm p-3 rounded-xl  border-[1.7px] border-white/30  shadow-2xl outline-0"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          ))}
        </div>
        <div className="text-center">
          {isExpireTime ? (
            <button className="cursor-pointer ">
              <strong>دریافت مجدد کد</strong>
            </button>
          ) : (
            <span className="text-sm sm:text-base">
              <strong>{formatTime()} مانده تا دریافت کد مجدد </strong>
            </span>
          )}
        </div>
        <button
          type="submit"
          className="w-full p-3 rounded-xl  shadow-2xl text-white font-titr bg-rose-300/90 cursor-pointer text-lg"
        >
          تایید
        </button>
      </form>
    </>
  );
}
