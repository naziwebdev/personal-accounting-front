import { toEnglishDigits } from "@/utils/normalizeDigits";
import * as yup from "yup";

export const addCheck = yup.object().shape({
  type: yup
    .string()
    .oneOf(["pay", "receive"], "نوع   یا بدهی یا طلب باید باشد")
    .required("نوع را مشخص کنید "),
  status: yup
    .string()
    .oneOf(
      ["pendding", "paid", "returned"],
      "وضیت باید درانتظار  یا پرداخت شده یا برگشتی باید باشد"
    )
    .required("وضعیت را مشخص کنید "),
  price: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" || isNaN(value) ? undefined : value
    )
    .required("مبلغ  را وارد کنید"),
  bank: yup.string().required("نام بانک را وارد کنید"),
  payable: yup
    .string()
    .required("نام شخص را وارد کنید")
    .min(2, "نام شخص حداقل دو کارکتر باید باشد")
    .max(50, "نام شخص حداکثر ۵۰ کارکتر میتواند باشد"),
  due_date: yup
    .string()
    .transform((value) =>
      value?.replace(/[۰-۹]/g, (d: string) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    )
    .required("تاریخ  را وارد کنید")
    .matches(/^\d{4}\/\d{2}\/\d{2}$/, "فرمت تاریخ باید مثل 1404/08/03 باشد"),
  serial: yup.string().notRequired(),
  description: yup.string().notRequired(),
});

export const editCheck = yup.object().shape({
  type: yup
    .string()
    .oneOf(["pay", "receive"], "نوع   یا بدهی یا طلب باید باشد")
    .notRequired(),
  status: yup
    .string()
    .oneOf(
      ["pendding", "paid", "returned"],
      "وضیت باید درانتظار  یا پرداخت شده یا برگشتی باید باشد"
    )
    .notRequired(),
  price: yup
    .string()
    .nullable()
    .test("is-number", "عدد معتبر نیست", (v) =>
      v ? !isNaN(Number(toEnglishDigits(v))) : true
    )
    .notRequired(),
  bank: yup.string().notRequired(),
  payable: yup
    .string()
    .notRequired()
    .min(2, "نام شخص حداقل دو کارکتر باید باشد")
    .max(50, "نام شخص حداکثر ۵۰ کارکتر میتواند باشد"),
  due_date: yup
    .string()
    .transform((value) =>
      value?.replace(/[۰-۹]/g, (d: string) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    )
    .notRequired(),
  serial: yup.string().notRequired(),
  description: yup.string().notRequired(),
});
