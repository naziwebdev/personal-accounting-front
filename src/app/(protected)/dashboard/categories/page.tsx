import React from "react";
import MainLayout from "../../main-layout";
// import { ICONS } from "../../../../config/categoryIcons";

export default function page() {
  // const iconList = Object.entries(ICONS);

  return (
    <MainLayout>
      <div>
        {/* {iconList.map(([key, { component: Icon, title }]) => (
          <div key={key} className="flex flex-col items-center gap-2">
            <Icon size="w-14 h-14" color="#000000" />
            <span className="text-xs text-gray-600">{title}</span>
          </div>
        ))} */}
      </div>
    </MainLayout>
  );
}
