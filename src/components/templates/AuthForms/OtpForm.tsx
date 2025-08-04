"use client";

import React, { useEffect, useRef, useState } from "react";
import { StepType } from "@/types/auth";
import { toEnglishDigits } from "@/utils/normalizeDigits";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { verifyOtpValidator } from "@/validations/auth";
import { useRouter } from "next/navigation";

type OtpFormProps = {
  setStep: (step: StepType) => void;
  phone: string;
};

export default function OtpForm({ setStep, phone }: OtpFormProps) {
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [timeLeft, setTimeLeft] = useState<number>(120); //seconds
  const [isExpireTime, setIsExpireTime] = useState<boolean>(false);

  const router = useRouter();

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp: "",
    },
    resolver: yupResolver(verifyOtpValidator),
  });

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
    const englishValue = toEnglishDigits(value);
    if (!/^[\d۰-۹]?$/.test(value)) return;

    //copy another digits without change
    const newOtp = [...otp];

    //just update value in special index that made change
    newOtp[index] = englishValue;

    setOtp(newOtp);

    const joinedOtp = newOtp.join("").trim();
    setValue("otp", joinedOtp, { shouldValidate: true });

    if (englishValue && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyOtpHandle = async (data: { otp: string }) => {
    console.log(data);
    const res = await fetch("http://localhost:4002/api/v1/auth/verify", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ phone, otp: data.otp }),
    });

    const result = await res.json();

    if (result.statusCode === 200 || result.statusCode === 201) {
      swal({
        title: "با موفقیت وارد شدید",
        icon: "success",
        buttons: "صفحه اصلی" as any,
      }).then((value) => {
        if (value) {
          router.push("/");
        }
      });
    } else if (result.statusCode === 400 || result.statusCode === 404) {
      swal({
        title: "کد وارد شده اشتباه است",
        icon: "warning",
        buttons: "بستن" as any,
      });
    } else {
      swal({
        title: "خطایی رخ داد دوباره تلاش کنید",
        icon: "error",
        buttons: "تلاش دوباره" as any,
      });
    }
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

      <form
        onSubmit={handleSubmit(verifyOtpHandle)}
        className="w-full flex flex-col gap-y-6 items-center justify-center"
      >
        <div className="w-full flex gap-x-4 flex-nowrap items-center justify-center mt-5">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              className="w-1/5 text-center text-white p-3 rounded-xl  border-[1.7px] border-white/30  shadow-2xl outline-0"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          ))}
        </div>
        <p className=" block text-right  text-xs text-red-600">
          {errors.otp && ` * ${errors.otp.message} *`}
        </p>
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
          className="w-full p-3 rounded-xl  shadow-2xl text-white font-titr bg-[var(--color-primary)] cursor-pointer text-lg"
        >
          تایید
        </button>
      </form>
    </>
  );
}
