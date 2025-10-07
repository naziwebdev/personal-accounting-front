import Sidebar from "@/components/modules/dashboard/Sidebar";
import Header from "@/components/modules/dashboard/Header";
import AuthGuard from "@/components/modules/dashboard/AuthGuard";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" w-full h-auto overflow-x-hidden">
      <div className="relative flex justify-between bg-[var(--color-theme)] w-full h-full">
        <Sidebar />
        {/* <div className="absolute top-72 right-0 w-44 h-72 rounded-full bg-violet-400 opacity-50 blur-3xl z-10" /> */}
        <div className="flex-1 z-20">
          <Header />
          <div className="p-4 pb-8">
            <AuthGuard>{children}</AuthGuard>
          </div>
        </div>
      </div>
    </div>
  );
}
