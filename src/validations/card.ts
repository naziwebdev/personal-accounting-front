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
