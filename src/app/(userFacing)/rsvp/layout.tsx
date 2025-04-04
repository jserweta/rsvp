export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto flex min-h-[calc(100dvh-120px)] max-w-[600px] flex-col flex-wrap items-start justify-center pb-6">
      {children}
    </div>
  );
}
