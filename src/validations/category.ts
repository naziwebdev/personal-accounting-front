import * as yup from "yup";

export const addCategory = yup.object().shape({
  title: yup.string().required("نام را وارد کنید"),
  type: yup
    .string()
    .oneOf(["income", "expense"], "نوع دسته بندی یا درامد یا واریز باید باشد")
    .required("نوع دسته بندی را مشخص کنید "),

  icon: yup.string().nullable().notRequired(),
});

export const editCategory = yup.object().shape({
  title: yup.string().notRequired(),
  type: yup
    .string()
    .oneOf(["income", "expense"], "نوع دسته بندی یا درامد یا واریز باید باشد")
    .notRequired(),

  icon: yup.string().nullable().notRequired(),
});
