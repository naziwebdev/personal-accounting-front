export const restoreAccessToken = async () => {
  try {
    const res = await fetch("http://localhost:4002/api/v1/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) return null;

    const { data } = await res.json();

    return data ?? null;
  } catch (error) {
    return null;
  }
};
