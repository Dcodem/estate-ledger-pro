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

export default function SettingsAccountPage() {
  return (
    <AppLayout>
      <h1 className="text-[28px] font-bold text-gray-900">Settings</h1>
      <p className="text-sm text-gray-500 mt-1 mb-6">Manage your account and preferences</p>
      <SettingsTabs />
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Profile Information</h2>
        <div className="space-y-4 max-w-md">
          <div><label className="text-[13px] font-semibold text-gray-700 block mb-1">Full Name</label><input type="text" defaultValue="Jonathan Sterling" className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm" /></div>
          <div><label className="text-[13px] font-semibold text-gray-700 block mb-1">Email</label><input type="email" defaultValue="j.sterling@estatetrust.com" className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm" /></div>
          <button className="px-4 py-2 bg-[#7C3AED] text-white rounded-lg text-sm font-medium">Save Changes</button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Security &amp; Password</h2>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm text-gray-700">Two-Factor Authentication</span>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">Enabled</span>
          <span className="text-xs text-gray-500">Last verified Nov 12, 2023</span>
        </div>
        <div className="space-y-4 max-w-md">
          <div><label className="text-[13px] font-semibold text-gray-700 block mb-1">Current Password</label><input type="password" className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm" /></div>
          <div><label className="text-[13px] font-semibold text-gray-700 block mb-1">New Password</label><input type="password" className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm" /></div>
          <button className="px-4 py-2 bg-[#7C3AED] text-white rounded-lg text-sm font-medium">Update Password</button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Onboarding</h2>
        <p className="text-sm text-gray-600 mb-4">Want to see the introduction tour again? Restart the onboarding flow to review key features.</p>
        <Link href="/onboarding/step-1" className="inline-block px-4 py-2 border-2 border-[#7C3AED] text-[#7C3AED] rounded-lg text-sm font-medium hover:bg-[#F3F0FF]">Restart Onboarding</Link>
      </div>
    </AppLayout>
  );
}
