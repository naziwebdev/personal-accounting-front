import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { restoreAccessToken } from "@/utils/restoreAccessToken";
import { Card } from "@/types/card";

const fetchCards = async (token: string): Promise<Card[]> => {
  const res = await fetch("http://localhost:4002/api/v1/cards", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  if (res.status === 401) {
    const newToken = await restoreAccessToken();
    if (!newToken) throw new Error("Unauthorized");
    const retryRes = await fetch("http://localhost:4002/api/v1/cards", {
      method: "GET",
      headers: { Authorization: `Bearer ${newToken}` },
      credentials: "include",
    });
    const result = await retryRes.json();
    return result.data;
  }

  const result = await res.json();
  return result.data;
};

export const useCards = () => {
  const { accessToken } = useAuth();

  return useQuery<Card[], Error>({
    queryKey: ["cards"],
    queryFn: () => fetchCards(accessToken!),
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5, // 5 minutes: data is fresh
    gcTime: 1000 * 60 * 30, // 30 minutes: data stays in memory
    refetchOnWindowFocus: false,
  });
};
