"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { badgeCounts } from "@/lib/badge-counts";

interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
  badgeColor?: string;
  exact?: boolean;
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
      { label: "Properties", href: "/properties", icon: "domain" },
      { label: "Transactions", href: "/transactions", icon: "payments", badge: badgeCounts.needsReview, badgeColor: "bg-amber-500" },
    ],
  },
  {
    heading: "AI Tools",
    items: [
      { label: "AI Hub", href: "/transactions/ai-review", icon: "psychology", exact: true },
      { label: "Smart Triage", href: "/transactions/smart-triage", icon: "auto_awesome", badge: badgeCounts.transactionReview },
      { label: "Duplicates", href: "/transactions/ai-review/duplicates", icon: "content_copy" },
      { label: "Large Transactions", href: "/transactions/ai-review/large-transactions", icon: "electric_bolt" },
    ],
  },
  {
    heading: "Reports",
    items: [
      { label: "Statements", href: "/reports/statements", icon: "description" },
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

function isActive(pathname: string, href: string, exact?: boolean): boolean {
  if (href === "/" || exact) return pathname === href;
  return pathname === href || pathname.startsWith(href + "/");
}

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const asideRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<Element | null>(null);

  useEffect(() => {
    if (!open) return;
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    if (!isMobile) return;

    triggerRef.current = document.activeElement;

    const aside = asideRef.current;
    if (!aside) return;

    const focusableSelector = 'a[href], button, [tabindex]:not([tabindex="-1"])';
    const firstFocusable = aside.querySelector<HTMLElement>(focusableSelector);
    firstFocusable?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const focusables = aside.querySelectorAll<HTMLElement>(focusableSelector);
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (triggerRef.current instanceof HTMLElement) {
        triggerRef.current.focus();
      }
    };
  }, [open, onClose]);

  return (
    <aside
      ref={asideRef}
      role={open ? "dialog" : undefined}
      aria-modal={open ? true : undefined}
      aria-label={open ? "Navigation menu" : undefined}
      className={`w-[220px] h-screen fixed left-0 top-0 overflow-y-auto bg-surface-container-low flex flex-col py-8 px-4 z-50 transition-transform duration-200 ease-out ${
        open ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      {/* Close button — mobile only */}
      <button
        onClick={onClose}
        className="lg:hidden absolute top-4 right-4 p-1 rounded-lg hover:bg-surface-container-high text-on-surface-variant"
        aria-label="Close sidebar"
      >
        <span aria-hidden="true" className="material-symbols-outlined text-xl">close</span>
      </button>

      {/* Brand */}
      <div className="mb-10 px-2">
        <h1 className="text-xl font-bold tracking-tight text-on-surface">
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
            <div className="pt-4 pb-2 px-3 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
              {section.heading}
            </div>
            {section.items.map((item) => {
              const active = isActive(pathname, item.href, item.exact);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2 transition-colors ${
                    active
                      ? "text-teal-700 font-bold border-r-2 border-teal-700 hover:bg-surface-container-high/50"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/50"
                  }`}
                >
                  <span aria-hidden="true" className="material-symbols-outlined text-[20px]">{item.icon}</span>
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
      <Link
        href="/settings"
        onClick={onClose}
        className="mt-auto flex items-center gap-3 px-2 pt-6 border-t border-outline-variant hover:bg-surface-container-low/50 rounded-lg transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
          JS
        </div>
        <div className="overflow-hidden flex-1">
          <p className="text-xs font-bold truncate">Jonathan Sterling</p>
          <p className="text-[11px] text-on-surface-variant truncate">Premium Member</p>
        </div>
        <span aria-hidden="true" className="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
      </Link>
    </aside>
  );
}
