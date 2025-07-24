import React from "react";
import { SetStepProps } from "@/types/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { phoneNumberValidator } from "@/validations/auth";
import { toEnglishDigits } from "@/utils/normalizeDigits";
import { StepType } from "@/types/auth";
import swal from "sweetalert";

type FormValues = { phone: string };
type PhoneFormProps = {
  setStep: (step: StepType) => void;
  setPhone: (phone: string) => void;
};

export default function PhoneForm({ setStep, setPhone }: PhoneFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: "",
    },
    resolver: yupResolver(phoneNumberValidator),
  });

  const sendOtpHandle: SubmitHandler<FormValues> = async (data: FormValues) => {
    const res = await fetch("http://localhost:4002/api/v1/auth/send", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ phone: data.phone }),
    });

    const result = await res.json();

    if (result.statusCode === 200) {
      setPhone(data.phone);
      setStep("otp");
    } else if (result.statusCode === 429) {
      swal({
        title: "کد از قبل برای شما ارسال شده",
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
      <p className="mt-10 text-sm text-right">
        لطفا شماره موبایل خود را وارد کنید
      </p>
      <form
        onSubmit={handleSubmit(sendOtpHandle)}
        className="w-full flex flex-col gap-y-10 items-center justify-center mt-5"
      >
        <div className="w-full flex flex-col gap-y-1.5">
          <input
            {...register("phone", {
              onChange: (e) => {
                const englishValue = toEnglishDigits(e.target.value);
                setValue("phone", englishValue);
              },
            })}
            type="text"
            placeholder="09120987654 : مثال"
            className="w-full text-white placeholder:text-right placeholder:text-stone-700 placeholder:text-sm p-3 rounded-xl  border-[1.7px] border-white/30  shadow-2xl outline-0"
          />
          <span className="text-right pt-1.5 text-xs text-red-600">
            {errors.phone && ` * ${errors.phone.message} *`}
          </span>
        </div>

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
