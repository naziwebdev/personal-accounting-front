import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { restoreAccessToken } from "@/utils/restoreAccessToken";
import { IncomeArrayType } from "@/types/income";

const fetchIncomes = async (
  token: string,
  page: number = 1,
  limit: number = 6
): Promise<IncomeArrayType> => {
  const res = await fetch(
    `http://localhost:4002/api/v1/incomes?page=${page}&limit=${limit}`,
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
      `http://localhost:4002/api/v1/incomes?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
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

export const useIncomes = (page: number, limit: number) => {
  const { accessToken } = useAuth();

  return useQuery<IncomeArrayType, Error>({
    queryKey: ["incomes", page, limit],
    queryFn: () => fetchIncomes(accessToken!, page, limit),
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
};
