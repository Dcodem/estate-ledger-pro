"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

interface NavSection {
  heading: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    heading: "Overview",
    items: [
      { label: "Dashboard", href: "/", icon: "dashboard" },
      { label: "Transactions", href: "/transactions", icon: "payments" },
    ],
  },
  {
    heading: "Analysis",
    items: [
      { label: "Smart Triage", href: "/transactions/smart-triage", icon: "rule_folder" },
      { label: "AI Review", href: "/transactions/ai-review", icon: "auto_awesome" },
      { label: "Properties", href: "/properties", icon: "domain" },
    ],
  },
  {
    heading: "Reports",
    items: [
      { label: "Monthly Statement", href: "/reports/monthly-statement", icon: "calendar_month" },
      { label: "Exports", href: "/reports/exports", icon: "download" },
    ],
  },
  {
    heading: "System",
    items: [
      { label: "Settings", href: "/settings", icon: "settings" },
    ],
  },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[220px] h-screen fixed left-0 top-0 overflow-y-auto bg-slate-50 flex flex-col py-8 px-4 z-50">
      {/* Brand */}
      <div className="mb-10 px-2">
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          The Wealth Architect
        </h1>
        <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">
          Luxury Real Estate Curator
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {navSections.map((section) => (
          <div key={section.heading}>
            <div className="pt-4 pb-2 px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {section.heading}
            </div>
            {section.items.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 transition-colors ${
                    active
                      ? "text-violet-700 font-bold border-r-2 border-violet-700 hover:bg-slate-200/50"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User Profile Footer */}
      <div className="mt-auto flex items-center gap-3 px-2 pt-6 border-t border-slate-200">
        <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-white text-xs font-bold">
          WA
        </div>
        <div className="overflow-hidden">
          <p className="text-xs font-bold truncate">User Profile</p>
          <p className="text-[10px] text-slate-500 truncate">Premium Member</p>
        </div>
      </div>
    </aside>
  );
}
