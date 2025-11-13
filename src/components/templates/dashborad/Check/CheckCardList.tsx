import React, { useEffect, useState } from "react";
import CheckCard from "@/components/modules/dashboard/CheckCard";

export default function CheckCardList() {
  return (
    <>
      <div className="flex justify-center items-center flex-wrap gap-6">
        <CheckCard />
        <CheckCard />
        <CheckCard />
        <CheckCard />
      </div>
    </>
  );
}
