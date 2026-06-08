import { BottomNav } from "@/components/app/bottom-nav";
import { Sidebar } from "@/components/app/sidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-bg lg:flex">
      {/* Desktop: Seitenleiste */}
      <Sidebar />

      {/* Inhaltsbereich */}
      <main className="min-h-dvh flex-1">
        <div className="mx-auto w-full max-w-[760px] pb-28 lg:max-w-[1000px] lg:pb-12">
          {children}
        </div>
      </main>

      {/* Mobile/Tablet: Bottom-Nav */}
      <BottomNav />
    </div>
  );
}
