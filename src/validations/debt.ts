import * as yup from "yup";

export const addDebtReceivable = yup.object().shape({
  type: yup
    .string()
    .oneOf(["debt", "receivable"], "نوع   یا بدهی یا طلب باید باشد")
    .required("نوع را مشخص کنید "),
  price: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" || isNaN(value) ? undefined : value
    )
    .required("مبلغ  را وارد کنید"),
  person: yup
    .string()
    .required("نام شخص را وارد کنید")
    .min(2, "نام شخص حداقل دو کارکتر باید باشد")
    .max(50, "نام شخص حداکثر ۵۰ کارکتر میتواند باشد"),
  date: yup
    .string()
    .transform((value) =>
      value?.replace(/[۰-۹]/g, (d: string) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    )
    .required("تاریخ  را وارد کنید")
    .matches(/^\d{4}\/\d{2}\/\d{2}$/, "فرمت تاریخ باید مثل 1404/08/03 باشد"),
  description: yup.string().notRequired(),
});

export const editDebtReceivable = yup.object().shape({
  type: yup
    .string()
    .oneOf(["debt", "receivable"], "نوع   یا بدهی یا طلب باید باشد")
    .notRequired(),
  price: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" || isNaN(value) ? undefined : value
    )
    .notRequired(),
  person: yup
    .string()
    .min(2, "نام شخص حداقل دو کارکتر باید باشد")
    .max(50, "نام شخص حداکثر ۵۰ کارکتر میتواند باشد")
    .notRequired(),
  date: yup
    .string()
    .transform((value) =>
      value?.replace(/[۰-۹]/g, (d: string) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    )
    .notRequired(),
  description: yup.string().notRequired(),
});
