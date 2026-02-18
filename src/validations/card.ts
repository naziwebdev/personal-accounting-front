import { toEnglishDigits } from "@/utils/normalizeDigits";
import * as yup from "yup";

export const addCard = yup.object().shape({
  bankName: yup.string().required("نام بانک را وارد کنید"),

  cardNumber: yup
    .string()
    .required("شماره کارت را وارد کنید")
    .matches(/^\d{16}$/, "شماره کارت باید ۱۶ رقم باشد"),

  balance: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" || isNaN(value) ? undefined : value
    )
    .nullable()
    .notRequired(),
});

export const editCard = yup.object().shape({
  bankName: yup.string().optional(),
  cardNumber: yup
    .string()
    .nullable()
    .test("is-number", "عدد معتبر نیست", (v) =>
      v ? !isNaN(Number(toEnglishDigits(v))) : true
    )
    .test("is-16-digits", "شماره کارت باید ۱۶ رقم باشد", (v) =>
      v ? /^\d{16}$/.test(toEnglishDigits(v)) : true
    )
    .notRequired(),
  balance: yup
    .string()
    .nullable()
    .test("is-number", "عدد معتبر نیست", (v) =>
      v ? !isNaN(Number(toEnglishDigits(v))) : true
    ),
});
