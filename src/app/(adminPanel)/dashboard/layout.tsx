import SideNav from '@/components/dashboard/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col md:flex-row">
      <div className="w-full flex-none md:h-dvh md:w-64">
        <SideNav />
      </div>
      <div className="p-3 md:p-12 w-full">{children}</div>
    </main>
  );
}
