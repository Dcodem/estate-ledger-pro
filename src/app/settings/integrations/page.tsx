"use client";
import AppLayout from "@/components/AppLayout";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";

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

const banks = [
  { name: "Chase Bank", status: "Connected", statusColor: "bg-green-100 text-green-700", sync: "Synced 2 min ago", action: "Disconnect", actionColor: "text-red-500 border-red-200" },
  { name: "Wells Fargo", status: "Syncing", statusColor: "bg-blue-100 text-blue-700", sync: "In progress", action: "Cancel", actionColor: "text-gray-700 border-gray-200" },
  { name: "American Express", status: "Error", statusColor: "bg-red-100 text-red-700", sync: "Last sync 3 days ago", action: "Reconnect", actionColor: "text-white bg-[#7C3AED] border-[#7C3AED]" },
  { name: "Vanguard", status: "Connected", statusColor: "bg-green-100 text-green-700", sync: "Synced 4 hours ago", action: "Disconnect", actionColor: "text-red-500 border-red-200" },
];

export default function IntegrationsPage() {
  return (
    <AppLayout>
      <h1 className="text-[28px] font-bold text-gray-900">Settings</h1>
      <p className="text-sm text-gray-500 mt-1 mb-6">Manage your account and preferences</p>
      <SettingsTabs />
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Bank Connections</h2>
      <div className="space-y-4 mb-6">
        {banks.map((b) => (
          <div key={b.name} className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg font-bold text-gray-400">{b.name[0]}</div>
              <div>
                <h3 className="font-semibold text-gray-900">{b.name}</h3>
                <p className="text-xs text-gray-500">{b.sync}</p>
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${b.statusColor}`}>{b.status}</span>
            </div>
            <button className={`px-4 py-2 text-sm font-medium rounded-lg border ${b.actionColor}`}>{b.action}</button>
          </div>
        ))}
      </div>
      <button className="w-full border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-gray-400 transition-colors">
        <Plus className="w-6 h-6 text-gray-400 mx-auto mb-2" />
        <span className="text-sm font-semibold text-gray-600">Add Bank Account</span>
      </button>
    </AppLayout>
  );
}
