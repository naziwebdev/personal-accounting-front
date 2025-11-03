"use client";
import React, { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import { useNotes } from "@/hooks/useNotes";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/modules/dashboard/Pagination";
import EmptyState from "@/components/modules/dashboard/EmptyState";
import { Note } from "@/types/note";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

export default function NoteList() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? "6");

  const { data: notes, isLoading, isError } = useNotes(page, limit);
  const [notesShowPage, setNotesShowPage] = useState<Note[]>([]);
  const { loading } = useAuth();

  useEffect(() => {
    const toastId = "incomes-loading";

    if (isLoading) {
      toast.loading("در حال دریافت اطلاعات ...", { id: toastId });
    } else {
      toast.dismiss(toastId);
    }

    if (isError) {
      toast.error("خطا در دریافت ");
    }
  }, [isLoading, isError]);

  if (loading || isLoading) return null;
  if (isError || !notes) return null;

  const totalPages = Math.ceil(notes.totalCount / limit);
  return (
    <>
      <div className="flex justify-center items-center flex-wrap gap-6">
        {totalPages > 1
          ? notesShowPage.map((note, index) => {
              return index % 2 === 0 ? (
                <NoteCard
                  key={note.id}
                  {...note}
                  color="#8c66e5"
                  bgColor="bg-violet-300"
                  border="border-b-[#8c66e5]"
                />
              ) : (
                <NoteCard
                  key={note.id}
                  {...note}
                  color="#e19ab3"
                  bgColor="bg-[#f3d2dc]"
                  border="border-b-[#e19ab3]"
                />
              );
            })
          : notes.items.map((note, index) => {
              return index % 2 === 0 ? (
                <NoteCard
                  key={note.id}
                  {...note}
                  color="#8c66e5"
                  bgColor="bg-violet-300"
                  border="border-b-[#8c66e5]"
                />
              ) : (
                <NoteCard
                  key={note.id}
                  {...note}
                  color="#e19ab3"
                  bgColor="bg-[#f3d2dc]"
                  border="border-b-[#e19ab3]"
                />
              );
            })}
        {notes.totalCount === 0 && (
          <EmptyState title="هنوز یادداشتی اضافه نکردی" />
        )}
      </div>
      {totalPages > 1 && (
        <Pagination
          itemes={notes.items}
          itemsLimit={6}
          totalItems={notes.totalCount}
          pathname="/notes"
          setShowItems={setNotesShowPage}
        />
      )}
    </>
  );
}
