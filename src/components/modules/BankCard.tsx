import Image from "next/image";
import { IconDelete } from "../icons/IconDelete";
import { IconEdit } from "../icons/IconEdit";

export default function BankCard() {
  return (
    <div className="flex flex-col justify-between w-[350px] h-[200px] rounded-[40px] bg-gradient-to-br from-[#f1aac2] to-[#c2b7f3]  text-white p-6 shadow-xl">
      <div className="flex justify-between items-center">
        <Image
          alt="chip"
          src={"/images/chip.png"}
          width={40}
          height={35}
          className=""
        />
        <p className="text-shadow-lg text-[18px]">بانک سامان</p>
      </div>
      <div className="text-xl text-center tracking-widest text-shadow-lg">
        ۶۲۱۹ - ۸۶۱۹ - ۷۷۹۵ - ۹۸۷۶
      </div>
      <div className="flex items-center justify-between">
        <div className="">
          <p className="mb-2 text-shadow-lg text-sm">موجودی</p>
          <span className="text-shadow-lg">۱۲۰۰۰۰ تومان</span>
        </div>
        <div className="flex flex-col gap-y-0.5">
          <button className="cursor-pointer">
            <IconDelete color="#fff" size="w-6 h-6" />
          </button>
          <button className="cursor-pointer">
            <IconEdit color="#fff" size="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
