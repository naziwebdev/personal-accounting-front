import * as yup from "yup";

export const addIncome = yup.object().shape({
  title: yup
    .string()
    .required("عنوان درامد را وارد کنید")
    .min(2, "عنوان حداقل ۲ کارکتر باید باشد"),
  price: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" || isNaN(value) ? undefined : value
    )
    .required("مبلغ درامد را وارد کنید"),

  date: yup.date().required("تاریخ درامد را مشخص کنید"),
  description: yup.string().notRequired(),
});
