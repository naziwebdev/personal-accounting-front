import Image from "next/image";

export default function page() {
  return (
    <div
      className="relative w-full bg-white h-dvh bg-[url('/images/bg.webp')] bg-bottom
     bg-no-repeat bg-cover"
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 z-10 flex justify-center items-center">
        <div className=" w-[80%] sm:w-1/2 lg:w-1/3 p-5 sm:p-10 backdrop-blur-xs bg-white/10  rounded-3xl border-[1.7px] border-white/30 shadow-2xl">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={70}
            height={140}
            priority
            className="mx-auto"
          />
          <h2 className="font-titr mt-5 text-2xl text-center">
            ورود / ثبت نام
          </h2>
          <p className="mt-10 text-sm text-right">
            لطفا شماره موبایل خود را وارد کنید
          </p>
          <form className="w-full flex flex-col gap-y-10 items-center justify-center mt-5">
            <input
              type="text"
              placeholder="09120987654 : مثال"
              className="w-full placeholder:text-right placeholder:text-stone-700 placeholder:text-sm p-3 rounded-xl  border-[1.7px] border-white/30  shadow-2xl outline-0"
            />
            <button
              type="submit"
              className="w-full p-3 rounded-xl  shadow-2xl text-white font-titr bg-rose-300/90 cursor-pointer text-lg"
            >
              ورود
            </button>
          </form>
          <p className="text-sm text-stone-700 text-center mt-5">
            ورود شما به معنای پذیزش قوانین هست
          </p>
        </div>
      </div>
    </div>
  );
}
