import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { restoreAccessToken } from "@/utils/restoreAccessToken";
import { DebtReceivable } from "@/types/debt";
import { DebtReceivableArrayType } from "@/types/debt";

export const fetchDebtReceivable = async (
  token: string,
  page: number = 1,
  limit: number = 6,
  type: "receivable" | "debt" = "receivable"
): Promise<DebtReceivableArrayType> => {
  const res = await fetch(
    `http://localhost:4002/api/v1/receivables-debts/type?type=${type}&page=${page}&limit=${limit}`,
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
      `http://localhost:4002/api/v1/receivables-debts/type?type=${type}&page=${page}&limit=${limit}`,
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

export const useDebtReceivable = (
  page: number,
  limit: number,
  type: "receivable" | "debt"
) => {
  const { accessToken } = useAuth();

  return useQuery<DebtReceivableArrayType, Error>({
    queryKey: ["debts", page, limit, type],
    queryFn: () => fetchDebtReceivable(accessToken!, page, limit, type),
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
};
