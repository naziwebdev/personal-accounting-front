import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { restoreAccessToken } from "@/utils/restoreAccessToken";
import { Category } from "@/types/category";
import { CategoryType } from "@/types/category";


const fetchCategoryByType = async (
  token: string,
  type: CategoryType
): Promise<Category[]> => {
  const res = await fetch(
    `http://localhost:4002/api/v1/categories?type=${type}`,
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
    if (!newToken) throw new Error("UnAuthorized");

    const retryRes = await fetch(
      `http://localhost:4002/api/v1/categories?type=${type}`,
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

export const useCategoriesByType = (type: CategoryType) => {
  const { accessToken } = useAuth();

  return useQuery<Category[], Error>({
    queryKey: ["categories",type],
    queryFn: () => fetchCategoryByType(accessToken!, type),
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5, // 5 minutes: data is fresh
    gcTime: 1000 * 60 * 30, // 30 minutes: data stays in memory
    refetchOnWindowFocus: false,
  });
};
