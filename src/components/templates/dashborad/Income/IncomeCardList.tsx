import React from "react";
import IncomeCard from "@/components/modules/dashboard/IncomeCard";

export default function IncomeCardList() {
  return (
    <div className="flex justify-center items-center flex-wrap gap-6">
       <IncomeCard/>
       <IncomeCard/>
       <IncomeCard/>
       <IncomeCard/>
       <IncomeCard/>
       <IncomeCard/>
    </div>
  );
}
