import Sidebar from "@/components/modules/Sidebar/Sidebar";
import BankCard from "@/components/modules/BankCard";

export default function Home() {
  return (
    <div className="flex justify-center items-center p-4 w-full h-auto">
      <div className="flex justify-between relative bg-[var(--color-theme)]  w-full h-full rounded-4xl">
        <Sidebar />
        <div className="absolute bottom-0 right-8 w-42 h-36 rounded-full bg-violet-400 opacity-70 blur-2xl z-10" />
        <div className="flex-1 rounded-l-4xl p-5 z-20">
          <BankCard
            bgCard="bg-card-1"
            fillOne="oklch(70.2% 0.183 293.541)"
            fillTwo="oklch(60.6% 0.25 292.717)"
          />
          <BankCard
            bgCard="bg-card-2"
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
    </div>
  );
}
