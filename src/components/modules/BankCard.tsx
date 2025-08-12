import Image from "next/image";
import { IconDelete } from "../icons/IconDelete";
import { IconEdit } from "../icons/IconEdit";

type BgcardPropsType = {
  bgCard: string;
  fillOne: string;
  fillTwo: string;
};

export default function BankCard({
  bgCard,
  fillOne,
  fillTwo,
}: BgcardPropsType) {
  return (
    <div
      className={`relative overflow-hidden flex flex-col justify-between w-[350px] h-[200px] rounded-[40px] ${bgCard} text-white p-6 shadow-xl`}
    >
      {/* Decorative SVG Background */}
      <div className="absolute -bottom-14 left-0 w-full h-full z-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 390"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transition duration-300 ease-in-out delay-150"
        >
          <path
            d="M 0,400 L 0,250 C 85.82,282.95 171.64,315.89 295,286 C 418.36,256.11 579.25,163.38 719,132 C 858.75,100.63 977.36,130.61 1094,123 C 1210.64,115.39 1325.32,70.20 1440,25 L 1440,400 L 0,400 Z"
            fill={`${fillOne}`}
            fillOpacity="0.53"
          />
          <path
            d="M 0,400 L 0,383 C 127.21,390.23 254.43,397.46 389,373 C 523.57,348.54 665.5,292.38 766,273 C 866.5,253.63 925.57,271.04 1031,258 C 1136.43,244.96 1288.21,201.48 1440,158 L 1440,400 L 0,400 Z"
            fill={`${fillTwo}`}
            fillOpacity=".8"
          />
        </svg>
      </div>

      {/* Card Content */}
      <div className="flex justify-between items-center z-10">
        <Image alt="chip" src="/images/chip.png" width={40} height={35} />
        <p className="text-shadow-lg text-[18px]">بانک سامان</p>
      </div>

      <div className="text-xl text-center tracking-widest text-shadow-lg z-10">
        ۶۲۱۹ - ۸۶۱۹ - ۷۷۹۵ - ۹۸۷۶
      </div>

      <div className="flex items-center justify-between z-10">
        <div>
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
