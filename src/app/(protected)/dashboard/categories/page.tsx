import React from "react";
import MainLayout from "../../main-layout";
import AddCategoryBtn from "@/components/templates/dashborad/Category/AddCategoryBtn";
import CategoryList from "@/components/templates/dashborad/Category/CategoryList";

export default function page() {
  return (
    <MainLayout>
      <div>
        <AddCategoryBtn />
        <CategoryList />
      </div>
    </MainLayout>
  );
}
