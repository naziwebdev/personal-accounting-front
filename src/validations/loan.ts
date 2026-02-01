import * as yup from "yup";

export const addLoan = yup.object().shape({
  giverName: yup.string().required("نام وام دهنده وارد کنید"),
  title: yup.string().required("نام ای برای وام وارد کنید"),
  totalPrice: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" || isNaN(value) ? undefined : value
    )
    .required("مبلغ کل وام را وارد کنید"),
  description: yup.string().notRequired(),
  countInstallment: yup.number().required("تعداد اقساط را وارد کنید"),
  firstDateInstallment: yup
    .string()
    .transform((value) =>
      value?.replace(/[۰-۹]/g, (d: string) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    )
    .required("تاریخ اولین قسط را وارد کنید")
    .matches(/^\d{4}\/\d{2}\/\d{2}$/, "فرمت تاریخ باید مثل 1404/08/03 باشد"),
  periodInstallment: yup
    .string()
    .oneOf(
      ["weekly", "monthly", "yearly"],
      "دوره اقساط فقط میتواند هفتگی / ماهانه یا سالانه باشد"
    )
    .required("دوره اقساط را وارد کنید "),
});

export const editLoan = yup.object().shape({
  giverName: yup.string().notRequired(),
  title: yup.string().notRequired(),
  totalPrice: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" || isNaN(value) ? undefined : value
    )
    .notRequired(),
  description: yup.string().notRequired(),
  countInstallment: yup.number().notRequired(),
  firstDateInstallment: yup
    .string()
    .transform((value) =>
      value?.replace(/[۰-۹]/g, (d: string) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    )
    .notRequired(),
  periodInstallment: yup
    .string()
    .oneOf(
      ["weekly", "monthly", "yearly"],
      "دوره اقساط فقط میتواند هفتگی / ماهانه یا سالانه باشد"
    )
    .notRequired(),
});
