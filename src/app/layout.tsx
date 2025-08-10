import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/modules/Sidebar/Sidebar";

export const metadata: Metadata = {
  title: "Personal Accounting App",
  description: "Personal Accounting app",
  icons: {
    icon: "images/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
}
