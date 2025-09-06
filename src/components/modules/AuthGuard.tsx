"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { accessToken, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !accessToken) {
      router.replace("/auth");
    }
  }, [accessToken, loading]);

  if (loading) {
    return <div className="text-center py-10">در حال بررسی اعتبار...</div>;
  }

  if (!accessToken) return null;

  return <>{children}</>;
}
