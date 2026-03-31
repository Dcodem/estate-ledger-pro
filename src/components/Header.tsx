"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { badgeCounts } from "@/lib/badge-counts";

interface HeaderProps {
  onMenuToggle: () => void;
}

const notifications = [
  { id: 1, icon: "auto_awesome", iconBg: "bg-primary-fixed-dim", iconColor: "text-primary", title: `${badgeCounts.transactionReview} transactions need triage`, desc: "AI has categorization suggestions ready for review", time: "2h ago", unread: true, href: "/transactions/smart-triage" },
  { id: 2, icon: "content_copy", iconBg: "bg-orange-100", iconColor: "text-orange-600", title: "Duplicate pairs detected", desc: `${badgeCounts.duplicatePairs} potential duplicates found across your transaction history`, time: "5h ago", unread: true, href: "/transactions/ai-review/duplicates" },
  { id: 3, icon: "electric_bolt", iconBg: "bg-emerald-100", iconColor: "text-emerald-700", title: "Large transactions flagged", desc: `${badgeCounts.largeTransactions} transactions exceed your review threshold`, time: "1d ago", unread: false, href: "/transactions/ai-review/large-transactions" },
  { id: 4, icon: "trending_up", iconBg: "bg-teal-100", iconColor: "text-teal-700", title: "Statement ready", desc: "March financial summary is available to view", time: "2d ago", unread: false, href: "/reports/statements" },
];

const helpItems = [
  { icon: "menu_book", label: "Getting Started Guide", desc: "Learn the basics of managing your portfolio", href: "/help/getting-started" },
  { icon: "help", label: "FAQ", desc: "Frequently asked questions", href: "/help/faq" },
  { icon: "support_agent", label: "Contact Support", desc: "Reach our team for assistance", href: "#contact-support" },
  { icon: "videocam", label: "Video Tutorials", desc: "Step-by-step walkthroughs", href: "/help/getting-started" },
];

const supportCategories = [
  "General Question",
  "Account & Billing",
  "Technical Issue",
  "Feature Request",
  "Data & Imports",
  "Other",
];

export default function Header({ onMenuToggle }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [supportCategory, setSupportCategory] = useState("General Question");
  const [supportSubject, setSupportSubject] = useState("");
  const [supportMessage, setSupportMessage] = useState("");
  const [supportSent, setSupportSent] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const helpRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleSupportSubmit = () => {
    if (!supportSubject || !supportMessage) return;
    setSupportSent(true);
    setTimeout(() => {
      setSupportSent(false);
      setShowSupport(false);
      setSupportSubject("");
      setSupportMessage("");
      setSupportCategory("General Question");
    }, 2000);
  };

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifications(false);
      if (helpRef.current && !helpRef.current.contains(e.target as Node)) setShowHelp(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="fixed top-0 right-0 w-full lg:w-[calc(100%-220px)] h-16 z-30 bg-surface-container-lowest/80 backdrop-blur-xl flex items-center justify-between px-4 lg:px-8 shadow-sm">
      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 -ml-1 rounded-lg hover:bg-surface-container-low text-on-surface-variant"
          aria-label="Open navigation"
        >
          <span aria-hidden="true" className="material-symbols-outlined">menu</span>
        </button>
        <button
          onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))}
          className="flex items-center gap-2 bg-surface-container-high rounded-lg pl-3 pr-2 py-1.5 text-sm w-48 sm:w-64 hover:bg-surface-container-high/80 transition-colors group"
        >
          <span aria-hidden="true" className="material-symbols-outlined text-lg text-on-surface-variant">search</span>
          <span className="text-on-surface-variant text-sm flex-1 text-left">Search portfolio...</span>
          <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 bg-surface-container-lowest rounded text-[11px] font-bold text-on-surface-variant border border-outline-variant/20">
            &#8984;K
          </kbd>
        </button>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-1 sm:gap-2 text-on-surface-variant">
          {/* Notifications */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => { setShowNotifications(!showNotifications); setShowHelp(false); }}
              className="p-2 hover:bg-surface-container-low rounded-lg transition-colors relative"
              aria-label="Notifications"
            >
              <span aria-hidden="true" className="material-symbols-outlined">notifications</span>
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -8 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                  className="absolute right-0 top-full mt-2 w-[380px] bg-surface-container-lowest rounded-2xl shadow-2xl border border-surface-variant overflow-hidden z-50"
                >
                  <div className="px-5 py-4 border-b border-surface-variant flex items-center justify-between">
                    <h3 className="text-sm font-bold text-on-surface">Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="text-[11px] font-bold text-primary">{unreadCount} new</span>
                    )}
                  </div>
                  <div className="max-h-[360px] overflow-y-auto">
                    {notifications.map((n) => (
                      <Link
                        key={n.id}
                        href={n.href}
                        onClick={() => setShowNotifications(false)}
                        className={`flex items-start gap-3 px-5 py-4 hover:bg-surface-container-low transition-colors border-b border-surface ${n.unread ? "bg-primary/[0.02]" : ""}`}
                      >
                        <div className={`w-9 h-9 rounded-lg ${n.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
                          <span aria-hidden="true" className={`material-symbols-outlined text-[18px] ${n.iconColor}`}>{n.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className={`text-sm truncate ${n.unread ? "font-bold text-on-surface" : "font-medium text-on-surface-variant"}`}>{n.title}</p>
                            {n.unread && <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />}
                          </div>
                          <p className="text-xs text-on-surface-variant mt-0.5 truncate">{n.desc}</p>
                          <p className="text-[11px] text-outline mt-1">{n.time}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="px-5 py-3 border-t border-surface-variant text-center">
                    <Link
                      href="/settings/notifications"
                      onClick={() => setShowNotifications(false)}
                      className="text-xs font-bold text-primary hover:underline"
                    >
                      View All Notifications
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* Help */}
          <div ref={helpRef} className="relative hidden sm:block">
            <button
              onClick={() => { setShowHelp(!showHelp); setShowNotifications(false); }}
              className="p-2 hover:bg-surface-container-low rounded-lg transition-colors"
              aria-label="Help and support"
            >
              <span aria-hidden="true" className="material-symbols-outlined">help_outline</span>
            </button>
            <AnimatePresence>
              {showHelp && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -8 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                  className="absolute right-0 top-full mt-2 w-[300px] bg-surface-container-lowest rounded-2xl shadow-2xl border border-surface-variant overflow-hidden z-50"
                >
                  <div className="px-5 py-4 border-b border-surface-variant">
                    <h3 className="text-sm font-bold text-on-surface">Help & Support</h3>
                  </div>
                  <div className="py-2">
                    {helpItems.map((item) =>
                      item.href === "#contact-support" ? (
                        <button
                          key={item.label}
                          onClick={() => { setShowHelp(false); setShowSupport(true); }}
                          className="w-full flex items-start gap-3 px-5 py-3 hover:bg-surface-container-low transition-colors text-left"
                        >
                          <span aria-hidden="true" className="material-symbols-outlined text-[20px] text-primary mt-0.5">{item.icon}</span>
                          <div>
                            <p className="text-sm font-semibold text-on-surface">{item.label}</p>
                            <p className="text-xs text-on-surface-variant mt-0.5">{item.desc}</p>
                          </div>
                        </button>
                      ) : (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setShowHelp(false)}
                          className="w-full flex items-start gap-3 px-5 py-3 hover:bg-surface-container-low transition-colors text-left"
                        >
                          <span aria-hidden="true" className="material-symbols-outlined text-[20px] text-primary mt-0.5">{item.icon}</span>
                          <div>
                            <p className="text-sm font-semibold text-on-surface">{item.label}</p>
                            <p className="text-xs text-on-surface-variant mt-0.5">{item.desc}</p>
                          </div>
                        </Link>
                      )
                    )}
                  </div>
                  <div className="px-5 py-3 border-t border-surface-variant bg-surface-container-low/50">
                    <p className="text-[11px] text-on-surface-variant">
                      Need urgent help? Email <span className="font-semibold text-primary">support@wealtharchitect.com</span>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link href="/settings" className="p-2 hover:bg-surface-container-low rounded-lg transition-colors">
            <span aria-hidden="true" className="material-symbols-outlined">account_circle</span>
          </Link>
        </div>
      </div>

      {/* Contact Support Modal */}
      <AnimatePresence>
        {showSupport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => !supportSent && setShowSupport(false)}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              className="relative bg-surface-container-lowest rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {supportSent ? (
                <div className="px-8 py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
                    <span aria-hidden="true" className="material-symbols-outlined text-emerald-600 text-[32px]">check_circle</span>
                  </div>
                  <h3 className="text-xl font-bold text-on-surface mb-2">Message Sent</h3>
                  <p className="text-sm text-on-surface-variant">We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <div className="px-8 pt-8 pb-6">
                    <button
                      onClick={() => setShowSupport(false)}
                      className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-surface-container-low text-on-surface-variant hover:bg-error hover:text-white transition-all"
                    >
                      <span aria-hidden="true" className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <span aria-hidden="true" className="material-symbols-outlined text-primary text-xl">support_agent</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-on-surface">Contact Support</h3>
                        <p className="text-xs text-on-surface-variant">We typically respond within a few hours</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wide mb-1.5">Category</label>
                        <select
                          value={supportCategory}
                          onChange={(e) => setSupportCategory(e.target.value)}
                          className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 text-sm text-on-surface font-medium focus:ring-2 focus:ring-primary/30 outline-none appearance-none cursor-pointer transition-all"
                        >
                          {supportCategories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wide mb-1.5">Subject</label>
                        <input
                          type="text"
                          value={supportSubject}
                          onChange={(e) => setSupportSubject(e.target.value)}
                          placeholder="Brief description of your issue"
                          className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary/30 outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wide mb-1.5">Message</label>
                        <textarea
                          value={supportMessage}
                          onChange={(e) => setSupportMessage(e.target.value)}
                          placeholder="Describe what you need help with..."
                          rows={4}
                          className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary/30 outline-none resize-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="px-8 py-5 bg-surface-container-low/50 border-t border-outline-variant/10 flex items-center justify-between">
                    <p className="text-[11px] text-on-surface-variant flex items-center gap-1">
                      <span aria-hidden="true" className="material-symbols-outlined text-[14px]">mail</span>
                      Or email <span className="font-semibold text-primary">support@wealtharchitect.com</span>
                    </p>
                    <button
                      onClick={handleSupportSubmit}
                      disabled={!supportSubject || !supportMessage}
                      className={`px-6 py-2.5 rounded-full text-sm font-bold shadow-md transition-all flex items-center gap-2 ${
                        supportSubject && supportMessage
                          ? "bg-primary text-white shadow-primary/20 hover:opacity-90 active:scale-95"
                          : "bg-outline-variant/30 text-on-surface-variant cursor-not-allowed shadow-none"
                      }`}
                    >
                      <span aria-hidden="true" className="material-symbols-outlined text-[16px]">send</span>
                      Send
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
