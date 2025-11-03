import React from "react";
import NoteCard from "./NoteCard";

export default function NoteList() {
  return (
    <>
      <div className="flex justify-center items-center flex-wrap gap-6">
        <NoteCard
          color="#8c66e5"
          bgColor="bg-violet-300"
          border="border-b-[#8c66e5]"
        />
        <NoteCard
          color="#8c66e5"
          bgColor="bg-violet-300"
          border="border-b-[#8c66e5]"
        />

        <NoteCard
          color="#e19ab3"
          bgColor="bg-[#f3d2dc]"
          border="border-b-[#e19ab3]"
        />
        <NoteCard
          color="#8c66e5"
          bgColor="bg-violet-300"
          border="border-b-[#8c66e5]"
        />

        <NoteCard
          color="#e19ab3"
          bgColor="bg-[#f3d2dc]"
          border="border-b-[#e19ab3]"
        />
        {/* {totalPages > 1
                  ? incomesShowPage.map((income, index) => {
                      return <IncomeCard key={income.id} {...income} />;
                    })
                  : incomes.items.map((income, index) => {
                      return <IncomeCard key={income.id} {...income} />;
                    })}
                {incomes.totalCount === 0 && (
                  <EmptyState title="هنوز درامدی اضافه نکردی" />
                )} */}
      </div>
      {/* {totalPages > 1 && (
                <Pagination
                  itemes={incomes.items}
                  itemsLimit={6}
                  totalItems={incomes.totalCount}
                  pathname="/incomes"
                  setShowItems={setIncomesShowPage}
                />
              )} */}
    </>
  );
}
