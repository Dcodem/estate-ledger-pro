"use client";
import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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

function Toggle({ defaultOn }: { defaultOn: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={on}
        onChange={() => setOn(!on)}
        className="sr-only peer"
      />
      <div className="w-10 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
    </label>
  );
}

const groups = [
  {
    label: "Transaction Alerts",
    bg: "",
    items: [
      { name: "New transaction detected", email: true, inApp: true },
      { name: "Large transaction alert (>$1,000)", email: true, inApp: true },
      { name: "Duplicate transaction warning", email: true, inApp: true },
    ],
  },
  {
    label: "Reports",
    bg: "bg-surface-container-low/30",
    items: [
      { name: "Monthly report ready", email: true, inApp: true },
      { name: "Export completed", email: false, inApp: false },
    ],
  },
  {
    label: "System",
    bg: "",
    items: [
      { name: "Bank sync errors", email: true, inApp: true },
      { name: "AI review suggestions ready", email: false, inApp: false },
    ],
  },
];

export default function NotificationsPage() {
  return (
    <AppLayout>
      <PageHeader
        title="Settings"
        subtitle="Manage your account and preferences"
      />
      <SettingsTabs />

      <div className="max-w-4xl space-y-8">
        {/* Notification Settings Table */}
        <div className="bg-surface-container-lowest rounded-xl card-shadow overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[1fr_120px_120px] px-8 py-5 bg-surface-container-low text-[12px] font-bold text-on-surface-variant uppercase tracking-wider">
            <div>Setting Name</div>
            <div className="text-center">Email</div>
            <div className="text-center">In-App</div>
          </div>

          {/* Groups */}
          {groups.map((group) => (
            <div key={group.label} className={`px-8 py-6 ${group.bg}`}>
              <h3 className="font-headline text-sm font-bold text-primary mb-4">
                {group.label}
              </h3>
              <div className="space-y-6">
                {group.items.map((item) => (
                  <div
                    key={item.name}
                    className="grid grid-cols-[1fr_120px_120px] items-center"
                  >
                    <div className="text-sm font-medium text-on-surface">{item.name}</div>
                    <div className="flex justify-center">
                      <Toggle defaultOn={item.email} />
                    </div>
                    <div className="flex justify-center">
                      <Toggle defaultOn={item.inApp} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="px-8 py-3 bg-gradient-to-br from-primary to-primary-container text-white rounded-lg font-bold shadow-lg hover:shadow-primary/20 transition-all hover:-translate-y-0.5 active:translate-y-0">
            Save Preferences
          </button>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-surface-container-high/50 rounded-xl flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary-fixed-dim flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined">security</span>
            </div>
            <div>
              <h4 className="font-bold text-sm text-on-surface mb-1">Privacy Focused</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Notification content is encrypted and only visible to authorized accounts. Transaction details in emails can be masked for additional security.
              </p>
            </div>
          </div>
          <div className="p-6 bg-surface-container-high/50 rounded-xl flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary-fixed-dim flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined">bolt</span>
            </div>
            <div>
              <h4 className="font-bold text-sm text-on-surface mb-1">Real-time Delivery</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                In-app notifications appear within 2 seconds of the event. Email alerts are dispatched via our priority enterprise network.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
