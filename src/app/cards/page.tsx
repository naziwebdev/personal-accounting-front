import React from "react";
import MainLayout from "../main-layout";
import AddCardBtn from "@/components/templates/Card/AddCardBtn";
import CardList from "@/components/templates/Card/CardList";

export default function page() {
  return (
    <MainLayout>
      <div>
        <AddCardBtn />
        <CardList />
      </div>
    </MainLayout>
  );
}
