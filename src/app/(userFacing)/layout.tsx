import Navbar from "@/components/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="px-5 xl:px-10">{children}</main>
    </>
  );
}
