"use client";

import React from "react";
import BankCard from "@/components/modules/dashboard/BankCard";
import { cardStyles } from "@/config/cardStyles";
import { useCards } from "@/hooks/useCards";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

export default function CardList() {
  const { data: cards, isLoading, isError } = useCards();
  const { accessToken, loading } = useAuth();

  useEffect(() => {
    const toastId = "cards-loading";

    if (isLoading) {
      toast.loading("در حال دریافت اطلاعات کارت‌ها...", { id: toastId });
    } else {
      toast.dismiss(toastId);
    }

    if (isError) {
      toast.error("خطا در دریافت کارت‌ها");
    }
  }, [isLoading, isError]);

  if (loading || isLoading) return null;
  if (isError || !cards) return null;

  return (
    <div className="flex justify-center items-center flex-wrap gap-5">
      {cards.map((card, index) => {
        const style = cardStyles[index];
        return (
          <BankCard
            key={card.id}
            bgCard={style.bgCard}
            fillOne={style.fillOne}
            fillTwo={style.fillTwo}
            {...card}
          />
        );
      })}
    </div>
  );
}
