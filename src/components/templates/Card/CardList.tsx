"use client";

import React from "react";
import BankCard from "@/components/modules/BankCard";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { restoreAccessToken } from "@/utils/restoreAccessToken";
import { cardStyles } from "@/config/cardStyles";
import { Card } from "@/types/card";

export default function CardList() {
  const { accessToken, setAccessToken } = useAuth();
  const [cards, setCards] = useState<Card[]>([]);

  const fetchCards = async (token: string) => {
    const res = await fetch("http://localhost:4002/api/v1/cards", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (res.status === 401) {
      const newToken = await restoreAccessToken();
      if (newToken) {
        setAccessToken(newToken);
        return fetchCards(newToken);
      } else {
        setAccessToken(null);
        return [];
      }
    }

    const result = await res.json();
    return result.data as Card[];
  };

  useEffect(() => {
    if (!accessToken) return;

    const loadCards = async () => {
      const data = await fetchCards(accessToken);
      setCards(data);
    };
    loadCards();
  }, [accessToken]);

  console.log(cards);

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
