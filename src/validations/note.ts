import * as yup from "yup";

export const addNote = yup.object().shape({
  title: yup
    .string()
    .min(2, "عنوان باید حداقل ۲ کارکتر باشد")
    .max(50, "عنوان حداکثر میتواند ۵۰ کارکتر باشد")
    .required("عنوان یادداشت را وارد کنید"),

  description: yup
    .string()
    .min(2, "متن باید حداقل ۲ کارکتر باشد")
    .max(2000, "متن حداکثر میتواند ۵۰ کارکتر باشد")
    .required("متن یادداشت را وارد کنید"),
});

export const editNote = yup.object().shape({
  title: yup
    .string()
    .min(2, "عنوان باید حداقل ۲ کارکتر باشد")
    .max(50, "عنوان حداکثر میتواند ۵۰ کارکتر باشد")
    .notRequired(),

  description: yup
    .string()
    .min(2, "متن باید حداقل ۲ کارکتر باشد")
    .max(2000, "متن حداکثر میتواند ۵۰ کارکتر باشد")
    .notRequired(),
});
