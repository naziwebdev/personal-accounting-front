import Sidebar from "@/components/modules/Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center w-full h-auto">
      <div className="relative flex justify-between bg-[var(--color-theme)] w-full h-full">
        <Sidebar />
        <div className="absolute top-7/12 right-9 w-40 h-48 rounded-full bg-violet-400 opacity-50 blur-2xl z-10" />
        <div className="flex-1 px-4 py-6  z-20">{children}</div>
      </div>
    </div>
  );
}
