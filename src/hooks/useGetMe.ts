import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { restoreAccessToken } from "@/utils/restoreAccessToken";

const getMe = async (token: string) => {
  const res = await fetch("http://localhost:4002/api/v1/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  if (res.status === 401) {
    const newToken = await restoreAccessToken();
    if (!newToken) throw new Error("Unauthorized");
    const retryRes = await fetch("http://localhost:4002/api/v1/auth/me", {
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

export const useGetMe = () => {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: ["getme"],
    queryFn: () => getMe(accessToken!),
    enabled: !!accessToken,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    retry: false,
  });
};
