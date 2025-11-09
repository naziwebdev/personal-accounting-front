export type Note = {
  id: number;
  title: string;
  description: string;
  createdAt:string;
  updatedAt: string;
  user: {
    id: number;
    phone: string;
    role: "admin" | "user";
    createdAt: string;
    updatedAt: string;
  };
};

export type NoteArrayType = {
  items: Note[];
  limit: number;
  page: number;
  totalCount: number;
};
