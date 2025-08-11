import Sidebar from "@/components/modules/Sidebar/Sidebar";
import BankCard from "@/components/modules/BankCard";

export default function Home() {
  return (
    <div className="flex justify-center items-center p-4 w-full h-dvh ">
      <div className="flex justify-between relative bg-[var(--color-theme)]  w-full h-full rounded-4xl">
        <Sidebar />
        <div className="absolute bottom-0 right-8 w-42 h-36 rounded-full bg-violet-400 opacity-70 blur-2xl z-10" />
        <div className="flex-1 rounded-l-4xl p-5">
          <BankCard />
        </div>
      </div>
    </div>
  );
}
