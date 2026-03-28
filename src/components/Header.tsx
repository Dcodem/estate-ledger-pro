"use client";

import Link from "next/link";

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header className="fixed top-0 right-0 w-full lg:w-[calc(100%-220px)] h-16 z-30 bg-white/80 backdrop-blur-xl flex items-center justify-between px-4 lg:px-8 shadow-sm">
      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 -ml-1 rounded-lg hover:bg-slate-100 text-slate-600"
          aria-label="Open navigation"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
            <span className="material-symbols-outlined text-lg">search</span>
          </span>
          <input
            type="text"
            placeholder="Search portfolio..."
            className="bg-surface-container-high border-none rounded-lg pl-10 pr-4 py-1.5 text-sm w-48 sm:w-64 focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <Link href="/properties" className="hidden sm:flex bg-gradient-to-br from-primary to-primary-container text-white px-5 py-2 rounded-lg text-sm font-semibold items-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined text-sm">add</span>
          Add Property
        </Link>
        <Link href="/properties" className="sm:hidden bg-gradient-to-br from-primary to-primary-container text-white p-2 rounded-lg shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity" aria-label="Add Property">
          <span className="material-symbols-outlined text-sm">add</span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-2 text-slate-400">
          <Link href="/settings/notifications" className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </Link>
          <Link href="/settings" className="hidden sm:block p-2 hover:bg-slate-50 rounded-lg transition-colors">
            <span className="material-symbols-outlined">help_outline</span>
          </Link>
          <Link href="/settings" className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
            <span className="material-symbols-outlined">account_circle</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
