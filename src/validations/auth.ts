import * as yup from "yup";

const phoneNumberValidator = yup.object().shape({
  phone: yup
    .string()
    .required("شماره تلفن خود را وارد نمایید")
    .matches(/^۰۹[۰-۹]{9}|09[0-9]{9}$/, "شماره تلفن معتبر نیست"),
});

const verifyOtpValidator = yup.object().shape({
  otp: yup
    .string()
    .required("کد ارسال شده به تلفن همراه را وارد نمایید")
    .matches(/^[0-9]{4}$/, "کد باید ۴ رقم باشد"),
});

export { phoneNumberValidator, verifyOtpValidator };
