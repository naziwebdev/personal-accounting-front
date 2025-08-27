import React from "react";
import MainLayout from "../main-layout";
import BankCard from "@/components/modules/BankCard";
import { IconAdd } from "@/components/icons/IconAdd";

export default function page() {
  return (
    <MainLayout>
      <div>
        <button className="flex justify-center items-center  p-3 lg:p-4 gap-2 mb-10 text-base xs:text-lg lg:text-[19px] bg-[var(--color-secondary)] text-white w-auto h-auto rounded-2xl lg:rounded-3xl shadow-xl cursor-pointer">
          افزودن کارت جدید
          <IconAdd size="hw-6 lg:w-7 h-6 lg:h-7" color="#ffffff" />
        </button>
        <div className="flex justify-center items-center flex-wrap gap-5">
          <BankCard
            bgCard="bg-card-2"
            fillOne="oklch(70.2% 0.183 293.541)"
            fillTwo="oklch(60.6% 0.25 292.717)"
          />
          <BankCard
            bgCard="bg-card-1"
            fillOne="oklch(82.3% 0.12 346.018)"
            fillTwo="oklch(71.8% 0.202 349.761)"
          />
          <BankCard
            bgCard="bg-card-3"
            fillOne="oklch(74% 0.238 322.16)"
            fillTwo="oklch(66.7% 0.295 322.15)"
          />
          <BankCard
            bgCard="bg-card-4"
            fillOne="oklch(71.8% 0.202 349.761)"
            fillTwo="oklch(65.6% 0.241 354.308)"
          />
          <BankCard
            bgCard="bg-card-5"
            fillOne="oklch(26.9% 0 0)"
            fillTwo="#000"
          />
          <BankCard
            bgCard="bg-card-6"
            fillOne="oklch(26.9% 0 0)"
            fillTwo="#000"
          />
          <BankCard
            bgCard="bg-card-7"
            fillOne="oklch(26.9% 0 0)"
            fillTwo="#000"
          />
          <BankCard
            bgCard="bg-card-8"
            fillOne="oklch(26.9% 0 0)"
            fillTwo="#000"
          />
        </div>
      </div>
    </MainLayout>
  );
}
