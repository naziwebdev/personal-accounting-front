import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { restoreAccessToken } from "@/utils/restoreAccessToken";
import { CheckArrayType } from "@/types/check";

export const fetchChecks = async (
  token: string,
  page: number = 1,
  limit: number = 6,
  type?: "pay" | "receive",
  status?: null | "pendding" | "paid" | "returned"
): Promise<CheckArrayType> => {
  const baseUrl = "http://localhost:4002/api/v1/checks";
  const url = status
    ? `${baseUrl}/status?page=${page}&limit=${limit}&type=${type}&status=${status}`
    : `${baseUrl}/type?page=${page}&limit=${limit}&type=${type}`;

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

export const useChecks = (
  page: number,
  limit: number,
  type: "pay" | "receive",
  status?: null | "pendding" | "paid" | "returned"
) => {
  const { accessToken } = useAuth();

  return useQuery<CheckArrayType, Error>({
    queryKey: ["checks", page, limit, type, status],
    queryFn: () => fetchChecks(accessToken!, page, limit, type, status),
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
};
