import "../globals.css";
import type { Metadata } from "next";
import { ToastProvider } from "@/components/templates/ToastProvider";
import { AuthProvider } from "@/context/AuthContext";
import { Providers } from "./providers";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div lang="fa" dir="rtl" className="h-screen bg-[var(--color-theme)]">
      <ToastProvider />
      <Providers>
        <AuthProvider>{children}</AuthProvider>
      </Providers>
    </div>
  );
}
