import { toEnglishDigits } from "@/utils/normalizeDigits";
import * as yup from "yup";

export const addWatchlist = yup.object().shape({
  title: yup
    .string()
    .min(2, "نام باید حداقل ۲ کارکتر باشد")
    .max(150, "نام حداکثر مینواد ۱۵۰ کارکتر باشد")
    .required("نام واچ لیست را وارد کنید"),
  waitingPeriod: yup
    .string()
    .oneOf(["day", "week", "month", "year"], "")
    .required(" تارگت زمانی را مشخص کنید "),
  currentBudget: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" || isNaN(value) ? undefined : value
    )
    .required("بودجه خود  را وارد کنید"),
});

export const editWatchlist = yup.object().shape({
  title: yup
    .string()
    .min(2, "نام باید حداقل ۲ کارکتر باشد")
    .max(150, "نام حداکثر مینواد ۱۵۰ کارکتر باشد")
    .notRequired(),
  waitingPeriod: yup
    .string()
    .oneOf(["day", "week", "month", "year"], "")
    .notRequired(),
  currentBudget: yup
    .string()
    .nullable()
    .test("is-number", "عدد معتبر نیست", (v) =>
      v ? !isNaN(Number(toEnglishDigits(v))) : true
    ),
});

export const addWatchlistItem = yup.object().shape({
  title: yup
    .string()
    .min(2, "نام باید حداقل ۲ کارکتر باشد")
    .max(150, "نام حداکثر مینواد ۱۵۰ کارکتر باشد")
    .required("نام واچ لیست را وارد کنید"),
  price: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" || isNaN(value) ? undefined : value
    )
    .required(" مبلغ  را وارد کنید"),
  count: yup
    .number()
    .integer()
    .min(1, "تعداد حداقل میتواند ۱ عدد باشد")
    .required("تعداد را وارد کنید"),
  description: yup.string().notRequired(),
  status: yup
    .string()
    .oneOf(
      ["pendding", "purchased"],
      "وضعیت  یا درانتظار یا تکمیل شده باید باشد"
    )
    .required("وضعیت را مشخص کنید "),
});

export const editWatchlistItem = yup.object().shape({
  title: yup
    .string()
    .min(2, "نام باید حداقل ۲ کارکتر باشد")
    .max(150, "نام حداکثر مینواد ۱۵۰ کارکتر باشد")
    .notRequired(),
  price: yup
    .string()
    .nullable()
    .test("is-number", "عدد معتبر نیست", (v) =>
      v ? !isNaN(Number(toEnglishDigits(v))) : true
    ),
  count: yup
    .string()
    .nullable()
    .test("is-number", "عدد معتبر نیست", (v) =>
      v ? !isNaN(Number(toEnglishDigits(v))) : true
    )
    .test("min-value", "حداقل مقدار باید ۱ باشد", (v) => {
      if (!v) return true; // allow null/empty
      const num = Number(toEnglishDigits(v));
      return num >= 1;
    }),
  description: yup.string().notRequired(),
  status: yup
    .string()
    .oneOf(
      ["pendding", "purchased"],
      "وضعیت  یا درانتظار یا تکمیل شده باید باشد"
    )
    .notRequired(),
});
