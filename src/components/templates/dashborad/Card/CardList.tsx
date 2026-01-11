"use client";

import React from "react";
import BankCard from "@/components/modules/dashboard/BankCard";
import { cardStyles } from "@/config/cardStyles";
import { useCards } from "@/hooks/useCards";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import EmptyState from "@/components/modules/dashboard/EmptyState";

export default function CardList() {
  const { data: cards, isLoading, isError } = useCards();
  const { loading } = useAuth();
  let style: any = null;
  let indexSecondary = 0;

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
    <div className="flex justify-center items-center flex-wrap gap-6">
      {cards.length !== 0 &&
        cards.map((card, index) => {
          if (index > 5) {
            style = cardStyles[indexSecondary];
            indexSecondary++;
          } else {
            style = cardStyles[index];
          }

          return (
            <BankCard
              key={card.id}
              bgCard={style?.bgCard}
              fillOne={style?.fillOne}
              fillTwo={style?.fillTwo}
              {...card}
            />
          );
        })}

      {cards.length === 0 && <EmptyState title=" هنوز کارتی اضافه نکردی" />}
    </div>
  );
}
