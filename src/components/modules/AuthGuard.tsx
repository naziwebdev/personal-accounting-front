"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { accessToken, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!accessToken && !loading) {
      router.replace("/auth");
    }
  }, [accessToken, loading]);

  if (loading && !accessToken) return null;

  return <>{children}</>;
}
