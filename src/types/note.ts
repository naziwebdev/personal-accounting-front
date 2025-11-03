export type Note = {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: number;
    phone: string;
    role: "admin" | "user";
    createdAt: Date;
    updatedAt: Date;
  };
};

export type NoteArrayType = {
  items: Note[];
  limit: number;
  page: number;
  totalCount: number;
};
