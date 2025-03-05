export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-wrap items-center justify-center w-100 h-dvh">
      {children}
    </main>
  );
}
