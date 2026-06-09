export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-bg px-5 py-10">
      <div className="w-full max-w-[400px]">
        <div className="rounded-2xl border border-line bg-card px-7 py-10">
          {children}
        </div>
      </div>
    </main>
  );
}
