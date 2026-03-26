"use client";
import AppLayout from "@/components/AppLayout";
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
    <div className="flex gap-6 border-b border-gray-200 mb-8">
      {tabs.map((t) => {
        const active = pathname === t.href;
        return <Link key={t.href} href={t.href} className={`pb-3 text-sm font-medium border-b-2 ${active ? "border-[#7C3AED] text-[#7C3AED]" : "border-transparent text-gray-500 hover:text-gray-700"}`}>{t.label}</Link>;
      })}
    </div>
  );
}

function Toggle({ on }: { on: boolean }) {
  return (
    <div className={`w-10 h-6 rounded-full flex items-center px-0.5 cursor-pointer ${on ? "bg-[#7C3AED]" : "bg-gray-300"}`}>
      <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${on ? "translate-x-4" : "translate-x-0"}`} />
    </div>
  );
}

const groups = [
  { label: "Transaction Alerts", items: [
    { name: "New transaction detected", email: true, inApp: true },
    { name: "Large transaction alert (>$1,000)", email: true, inApp: true },
    { name: "Duplicate transaction warning", email: true, inApp: true },
  ]},
  { label: "Reports", items: [
    { name: "Monthly report ready", email: true, inApp: true },
    { name: "Export completed", email: false, inApp: false },
  ]},
  { label: "System", items: [
    { name: "Bank sync errors", email: true, inApp: true },
    { name: "AI review suggestions ready", email: false, inApp: false },
  ]},
];

export default function NotificationsPage() {
  return (
    <AppLayout>
      <h1 className="text-[28px] font-bold text-gray-900">Settings</h1>
      <p className="text-sm text-gray-500 mt-1 mb-6">Manage your account and preferences</p>
      <SettingsTabs />
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <table className="w-full">
          <thead><tr className="bg-gray-50">
            <th className="text-left text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Setting</th>
            <th className="text-center text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Email</th>
            <th className="text-center text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">In-App</th>
          </tr></thead>
          <tbody>
            {groups.map((g) => (
              <>
                <tr key={g.label} className="bg-gray-50"><td colSpan={3} className="px-6 py-3 text-sm font-semibold text-gray-700">{g.label}</td></tr>
                {g.items.map((item) => (
                  <tr key={item.name} className="border-b border-gray-100">
                    <td className="px-6 py-4 text-sm text-gray-700">{item.name}</td>
                    <td className="px-6 py-4"><div className="flex justify-center"><Toggle on={item.email} /></div></td>
                    <td className="px-6 py-4"><div className="flex justify-center"><Toggle on={item.inApp} /></div></td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <button className="px-6 py-2.5 bg-[#7C3AED] text-white rounded-lg text-sm font-medium">Save Preferences</button>
      </div>
    </AppLayout>
  );
}
