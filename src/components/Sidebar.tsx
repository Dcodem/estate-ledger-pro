"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Receipt,
  Building2,
  BarChart3,
  Settings,
  Download,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  isGroup?: boolean;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: <LayoutGrid size={18} />,
  },
  {
    label: "Transactions",
    href: "/transactions",
    icon: <Receipt size={18} />,
    isGroup: true,
    children: [
      { label: "All Transactions", href: "/transactions" },
      { label: "Smart Triage", href: "/transactions/smart-triage" },
      { label: "AI Review", href: "/transactions/ai-review" },
    ],
  },
  {
    label: "Properties",
    href: "/properties",
    icon: <Building2 size={18} />,
    isGroup: true,
    children: [
      { label: "All Properties", href: "/properties" },
      { label: "Main St. Loft", href: "/properties/main-st-loft" },
      { label: "Oak Ridge", href: "/properties/oak-ridge" },
      { label: "Downtown Plaza", href: "/properties/downtown-plaza" },
    ],
  },
  {
    label: "Reports",
    href: "/reports",
    icon: <BarChart3 size={18} />,
    isGroup: true,
    children: [
      { label: "All Reports", href: "/reports" },
      { label: "Exports", href: "/reports/exports" },
    ],
  },
  {
    label: "Settings",
    href: "/settings",
    icon: <Settings size={18} />,
    isGroup: true,
    children: [
      { label: "Account", href: "/settings" },
      { label: "Bank Connections", href: "/settings/integrations" },
      { label: "Notifications", href: "/settings/notifications" },
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
    <aside className="fixed left-0 top-0 h-screen w-[220px] bg-white flex flex-col z-50">
      {/* Logo */}
      <div className="px-6 pt-6 pb-4">
        <div className="text-lg font-bold text-primary">Estate Ledger</div>
        <div className="text-[10px] font-medium uppercase tracking-widest text-text-light">
          Wealth Management
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3">
        {navItems.map((item) => {
          if (!item.isGroup) {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 h-10 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-sidebar-active-bg text-primary font-semibold border-l-4 border-primary pl-2"
                    : "text-text-body hover:bg-gray-50"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          }

          return (
            <div key={item.label} className="mt-4">
              <div className="flex items-center gap-3 px-3 h-8 text-sm font-semibold text-text-secondary">
                {item.icon}
                {item.label}
              </div>
              {item.children?.map((child) => {
                const active = isActive(pathname, child.href);
                return (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={`block pl-10 pr-3 h-9 leading-9 text-[13px] rounded-lg transition-colors ${
                      active
                        ? "bg-sidebar-active-bg text-primary font-semibold border-l-4 border-primary ml-0 pl-9"
                        : "text-text-body hover:bg-gray-50"
                    }`}
                  >
                    {child.label}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4">
        <button className="w-full flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-primary-dark transition-colors">
          <Download size={16} />
          Export Data
        </button>
      </div>
    </aside>
  );
}
