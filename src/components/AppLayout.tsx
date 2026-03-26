import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface text-on-surface flex">
      <Sidebar />
      <main className="ml-[220px] flex-1 flex flex-col">
        <Header />
        <div className="mt-16 p-10 max-w-7xl mx-auto w-full space-y-10">
          {children}
        </div>
        <footer className="mt-auto py-8 px-10 border-t border-surface-container text-on-surface-variant flex justify-between items-center text-xs">
          <p>© 2024 The Wealth Architect. Institutional Real Estate Analytics.</p>
          <div className="flex gap-6 font-semibold">
            <a className="hover:text-primary" href="/settings">Documentation</a>
            <a className="hover:text-primary" href="/settings">Privacy Policy</a>
            <a className="hover:text-primary" href="/settings/integrations">Data Integrity</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
