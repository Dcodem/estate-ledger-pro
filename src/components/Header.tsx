"use client";

import { Search, Plus, Bell, HelpCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-[220px] right-0 h-[60px] bg-white border-b border-border flex items-center justify-between px-6 z-40">
      {/* Search */}
      <div className="relative w-[500px]">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
        />
        <input
          type="text"
          placeholder="Search transactions, properties..."
          className="w-full h-10 pl-10 pr-4 rounded-lg border border-border text-sm text-text-body placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
          <Plus size={16} />
          Add Property
        </button>

        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Bell size={20} className="text-text-body" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-error rounded-full border-2 border-white" />
        </button>

        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <HelpCircle size={20} className="text-text-body" />
        </button>

        <div className="w-9 h-9 rounded-full bg-primary-light border-2 border-primary flex items-center justify-center text-sm font-semibold text-primary">
          JE
        </div>
      </div>
    </header>
  );
}
