"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { badgeCounts } from "@/lib/badge-counts";

interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
  badgeColor?: string;
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
      { label: "Transactions", href: "/transactions", icon: "payments", badge: badgeCounts.needsReview, badgeColor: "bg-amber-500" },
    ],
  },
  {
    heading: "Analysis",
    items: [
      { label: "Transaction Review", href: "/transactions/smart-triage", icon: "auto_awesome", badge: badgeCounts.transactionReview },
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

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`w-[220px] h-screen fixed left-0 top-0 overflow-y-auto bg-slate-50 flex flex-col py-8 px-4 z-50 transition-transform duration-200 ease-out ${
        open ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      {/* Close button — mobile only */}
      <button
        onClick={onClose}
        className="lg:hidden absolute top-4 right-4 p-1 rounded-lg hover:bg-slate-200 text-slate-400"
        aria-label="Close sidebar"
      >
        <span className="material-symbols-outlined text-xl">close</span>
      </button>

      {/* Brand */}
      <div className="mb-10 px-2">
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          The Wealth Architect
        </h1>
        <p className="text-[11px] text-on-surface-variant uppercase tracking-widest mt-1">
          Luxury Real Estate Curator
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {navSections.map((section) => (
          <div key={section.heading}>
            <div className="pt-4 pb-2 px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {section.heading}
            </div>
            {section.items.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2 transition-colors ${
                    active
                      ? "text-teal-700 font-bold border-r-2 border-teal-700 hover:bg-slate-200/50"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  <span className="text-sm font-medium flex-1">{item.label}</span>
                  {item.badge && (
                    <span className={`min-w-[20px] h-5 flex items-center justify-center ${item.badgeColor || "bg-primary"} text-white text-[11px] font-bold rounded-full px-1.5`}>
                      {item.badge}
                    </span>
                  )}
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
          <p className="text-[11px] text-slate-500 truncate">Premium Member</p>
        </div>
      </div>
    </aside>
  );
}
