import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/templates/AuthForms/ToastProvider";

export const metadata: Metadata = {
  title: "Personal Accounting App",
  description: "Personal Accounting app",
  icons: {
    icon: "images/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="h-screen bg-[var(--color-theme)]">
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
