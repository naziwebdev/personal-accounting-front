import { toEnglishDigits } from "@/utils/normalizeDigits";
import * as yup from "yup";

export const addExpense = yup.object().shape({
  title: yup
    .string()
    .required("عنوان را وارد کنید")
    .min(2, "عنوان حداقل ۲ کارکتر باید باشد"),
  price: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" || isNaN(value) ? undefined : value
    )
    .required("مبلغ را وارد کنید"),

  categoryID: yup
    .number()
    .integer()
    .required("دسته بندی را مشخص کنید")
    .test("not-default", "دسته بندی را مشخص کنید", (value) => value !== -1),
  bankCardID: yup.number().integer().notRequired(),

  date: yup
    .string()
    .transform((value) =>
      value?.replace(/[۰-۹]/g, (d: string) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    )
    .required("تاریخ درآمد را وارد کنید")
    .matches(/^\d{4}\/\d{2}\/\d{2}$/, "فرمت تاریخ باید مثل 1404/08/03 باشد")

    .required("تاریخ درآمد را وارد کنید"),
  description: yup.string().notRequired(),
});

export const editExpense = yup.object().shape({
  title: yup.string().notRequired().min(2, "عنوان حداقل ۲ کارکتر باید باشد"),
  price: yup
    .string()
    .nullable()
    .test("is-number", "عدد معتبر نیست", (v) =>
      v ? !isNaN(Number(toEnglishDigits(v))) : true
    ),
  categoryID: yup
    .number()
    .integer()
    .test("not-default", "دسته بندی را مشخص کنید", (value) => value !== -1)
    .notRequired(),
  bankCardID: yup.number().integer().notRequired(),

  date: yup
    .string()
    .transform((value) =>
      value?.replace(/[۰-۹]/g, (d: string) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    )
    .notRequired(),
  description: yup.string().notRequired(),
});
