"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 right-0 w-[calc(100%-220px)] h-16 z-40 bg-white/80 backdrop-blur-xl flex items-center justify-between px-8 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
            <span className="material-symbols-outlined text-lg">search</span>
          </span>
          <input
            type="text"
            placeholder="Search portfolio..."
            className="bg-surface-container-high border-none rounded-lg pl-10 pr-4 py-1.5 text-sm w-64 focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/properties" className="bg-gradient-to-br from-primary to-primary-container text-white px-5 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined text-sm">add</span>
          Add Property
        </Link>
        <div className="flex items-center gap-2 text-slate-400">
          <Link href="/settings/notifications" className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </Link>
          <Link href="/settings" className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
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
