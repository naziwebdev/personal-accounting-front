import React from "react";
import MainLayout from "../../main-layout";
import AddNoteBtn from "@/components/templates/dashborad/Note/AddNoteBtn";
import NoteList from "@/components/templates/dashborad/Note/NoteList";

export default function page() {
  return (
    <MainLayout>
      <div>
        <AddNoteBtn />
        <NoteList />
      </div>
    </MainLayout>
  );
}
