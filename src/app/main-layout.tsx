import Sidebar from "@/components/modules/Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center w-full h-auto">
      <div className="flex justify-between relative bg-[var(--color-theme)] w-full h-full">
        <Sidebar />
        <div className="absolute bottom-0 right-8 w-42 h-36 rounded-full bg-violet-400 opacity-70 blur-2xl z-10" />
        <div className="flex-1 rounded-l-4xl px-4 py-6  z-20">{children}</div>
      </div>
    </div>
  );
}
