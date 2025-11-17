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
    .number()
    .transform((value, originalValue) =>
      originalValue === "" || isNaN(value) ? undefined : value
    )
    .notRequired(),
});
