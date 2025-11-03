import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { restoreAccessToken } from "@/utils/restoreAccessToken";
import { NoteArrayType } from "@/types/note";

export const fetchNotes = async (
  token: string,
  page: number = 1,
  limit: number = 6
): Promise<NoteArrayType> => {
  const res = await fetch(
    `http://localhost:4002/api/v1/notes?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    }
  );

  if (res.status === 401) {
    const newToken = await restoreAccessToken();
    if (!newToken) throw new Error("Unauthorized");
    const retryRes = await fetch(
      `http://localhost:4002/api/v1/notes?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${newToken}`,
        },
        credentials: "include",
      }
    );
    const result = await retryRes.json();
    return result.data;
  }

  const result = await res.json();
  return result.data;
};

export const useNotes = (page: number, limit: number) => {
  const { accessToken } = useAuth();

  return useQuery<NoteArrayType, Error>({
    queryKey: ["notes", page, limit],
    queryFn: () => fetchNotes(accessToken!, page, limit),
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
};
