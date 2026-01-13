import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { restoreAccessToken } from "@/utils/restoreAccessToken";
import { LoanArrayType } from "@/types/loan";

export const fetchLoans = async (
  token: string,
  page: number = 1,
  limit: number = 6,
  status?: null | "pendding" | "paid"
): Promise<LoanArrayType> => {
  const baseUrl = "http://localhost:4002/api/v1/loans";
  const url = status
    ? `${baseUrl}/status?page=${page}&limit=${limit}&status=${status}`
    : `${baseUrl}?page=${page}&limit=${limit}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  if (res.status === 401) {
    const newToken = await restoreAccessToken();
    if (!newToken) throw new Error("Unauthorized");

    const retryRes = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${newToken}`,
      },
      credentials: "include",
    });

    if (retryRes.status === 404) {
      return {
        items: [],
        page,
        limit,
        totalCount: 0,
      };
    }
    const result = await retryRes.json();
    return result?.data;
  }

  if (res.status === 404) {
    return {
      items: [],
      page,
      limit,
      totalCount: 0,
    };
  }

  const result = await res.json();
  return result?.data;
};

export const useLoans = (
  page: number,
  limit: number,
  status?: null | "pendding" | "paid"
) => {
  const { accessToken } = useAuth();

  return useQuery<LoanArrayType, Error>({
    queryKey: ["loans", page, limit, status],
    queryFn: () => fetchLoans(accessToken!, page, limit, status),
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
};
