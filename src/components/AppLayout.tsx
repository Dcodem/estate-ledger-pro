"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface text-on-surface flex">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-primary focus:text-on-primary focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-bold focus:shadow-lg"
      >
        Skip to main content
      </a>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="lg:ml-[220px] flex-1 flex flex-col">
        <Header onMenuToggle={() => setSidebarOpen(true)} />
        <div id="main-content" className="mt-16 p-6 lg:p-10 max-w-7xl mx-auto w-full space-y-10 animate-fade-in-up">
          {children}
        </div>
        <footer className="mt-auto py-8 px-6 lg:px-10 border-t border-surface-container text-on-surface-variant flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; 2024 The Wealth Architect. Institutional Real Estate Analytics.</p>
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
