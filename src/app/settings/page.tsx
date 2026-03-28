"use client";
import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SettingsTabs() {
  const pathname = usePathname();
  const tabs = [
    { label: "Account", href: "/settings" },
    { label: "Integrations", href: "/settings/integrations" },
    { label: "Notifications", href: "/settings/notifications" },
  ];
  return (
    <div className="flex gap-8 border-b border-outline-variant/30">
      {tabs.map((t) => {
        const active = pathname === t.href;
        return (
          <Link
            key={t.href}
            href={t.href}
            className={`pb-3 text-sm font-medium transition-colors relative ${
              active
                ? "font-semibold text-primary"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            {t.label}
            {active && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary" />
            )}
          </Link>
        );
      })}
    </div>
  );
}

export default function SettingsAccountPage() {
  const [profileSaved, setProfileSaved] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const handleProfileSave = () => {
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2000);
  };

  const handlePasswordUpdate = () => {
    setPasswordUpdated(true);
    setTimeout(() => setPasswordUpdated(false), 2000);
  };

  return (
    <AppLayout>
      <PageHeader
        title="Settings"
        subtitle="Manage your account and preferences"
      />
      <SettingsTabs />

      <div className="max-w-4xl space-y-6">
        {/* Profile Information Card */}
        <div className="bg-surface-container-lowest rounded-xl p-6 card-shadow">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-primary">person</span>
            <h3 className="font-headline text-lg font-bold text-on-surface">Profile Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-on-surface-variant tracking-wide uppercase">
                Full Name
              </label>
              <input
                type="text"
                aria-label="Full Name"
                defaultValue="Jonathan Sterling"
                className="w-full bg-surface-container-high border-none rounded-lg px-4 py-2.5 text-sm focus:bg-white focus:ring-1 focus:ring-primary/40 transition-all outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-on-surface-variant tracking-wide uppercase">
                Email Address
              </label>
              <input
                type="email"
                aria-label="Email Address"
                defaultValue="j.sterling@estatetrust.com"
                className="w-full bg-surface-container-high border-none rounded-lg px-4 py-2.5 text-sm focus:bg-white focus:ring-1 focus:ring-primary/40 transition-all outline-none"
              />
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleProfileSave}
              aria-live="polite"
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold shadow-lg transition-all flex items-center gap-2 ${
                profileSaved
                  ? "bg-emerald-500 text-white shadow-emerald-500/20"
                  : "bg-gradient-to-br from-primary to-primary-container text-white shadow-primary/20 hover:scale-[1.02]"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{profileSaved ? "check" : "save"}</span>
              {profileSaved ? "Saved!" : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Security & Password Card */}
        <div className="bg-surface-container-lowest rounded-xl p-6 card-shadow">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-primary">security</span>
            <h3 className="font-headline text-lg font-bold text-on-surface">Security &amp; Password</h3>
          </div>
          <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg mb-8">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary-fixed-dim flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  phonelink_lock
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface">Two-Factor Authentication</p>
                <p className="text-xs text-on-surface-variant">Last verified Nov 12, 2023</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[11px] font-bold rounded-full tracking-wider uppercase">
              Enabled
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-on-surface-variant tracking-wide uppercase">
                Current Password
              </label>
              <input
                type="password"
                aria-label="Current Password"
                defaultValue="••••••••••••"
                className="w-full bg-surface-container-high border-none rounded-lg px-4 py-2.5 text-sm focus:bg-white focus:ring-1 focus:ring-primary/40 transition-all outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-on-surface-variant tracking-wide uppercase">
                New Password
              </label>
              <input
                type="password"
                aria-label="New Password"
                placeholder="Enter new password"
                className="w-full bg-surface-container-high border-none rounded-lg px-4 py-2.5 text-sm focus:bg-white focus:ring-1 focus:ring-primary/40 transition-all outline-none"
              />
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <button
              onClick={handlePasswordUpdate}
              aria-live="polite"
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold shadow-lg transition-all flex items-center gap-2 ${
                passwordUpdated
                  ? "bg-emerald-500 text-white shadow-emerald-500/20"
                  : "bg-gradient-to-br from-primary to-primary-container text-white shadow-primary/20 hover:scale-[1.02]"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{passwordUpdated ? "check" : "lock"}</span>
              {passwordUpdated ? "Updated!" : "Update Password"}
            </button>
          </div>
        </div>

        {/* Onboarding Card */}
        <div className="bg-surface-container-lowest rounded-xl p-6 card-shadow border border-dashed border-outline-variant/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-md">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-primary">auto_awesome</span>
                <h3 className="font-headline text-lg font-bold text-on-surface">Onboarding</h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Want to see the introduction tour again? Restart the onboarding flow to review key features.
              </p>
            </div>
            <Link
              href="/onboarding/step-1"
              className="px-6 py-2.5 border border-outline-variant/60 rounded-lg text-sm font-semibold text-primary hover:bg-surface-container-low transition-colors whitespace-nowrap"
            >
              Restart Onboarding
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Meta */}
      <footer className="pt-8 flex justify-between items-center text-[11px] text-on-surface-variant font-medium uppercase tracking-widest max-w-4xl">
        <div>Estate Ledger Pro v4.2.0</div>
        <div className="flex gap-4">
          <a className="hover:text-primary transition-colors" href="/settings">Privacy Policy</a>
          <span>•</span>
          <a className="hover:text-primary transition-colors" href="/settings">Terms of Service</a>
        </div>
      </footer>
    </AppLayout>
  );
}
