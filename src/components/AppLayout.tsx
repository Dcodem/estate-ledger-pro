import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg">
      <Sidebar />
      <Header />
      <main className="ml-[220px] mt-[60px] p-8">{children}</main>
    </div>
  );
}
