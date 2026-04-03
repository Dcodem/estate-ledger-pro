"use client";
import { useState, useRef } from "react";
import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";
import AnimatedTabs from "@/components/AnimatedTabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingsAccountPage() {
  const pathname = usePathname();
  const [profileSaved, setProfileSaved] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [thresholdValue, setThresholdValue] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("smartThreshold") || "1000";
    }
    return "1000";
  });
  const [thresholdSaved, setThresholdSaved] = useState(false);
  const [profileEditing, setProfileEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Jonathan Sterling",
    email: "j.sterling@estatetrust.com",
    phone: "+1 (416) 555-0192",
    company: "Estate Trust Holdings",
    role: "Managing Director",
  });

  const handleProfileSave = () => {
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2000);
  };

  const handlePasswordUpdate = () => {
    setPasswordUpdated(true);
    setTimeout(() => setPasswordUpdated(false), 2000);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setProfilePic(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <AppLayout>
      <PageHeader
        title="Settings"
        subtitle="Manage your account and preferences"
      />
      <AnimatedTabs
        layoutId="settings-tabs"
        variant="underline"
        tabs={[
          { label: "Account", href: "/settings" },
          { label: "Categories", href: "/settings/categories" },
          { label: "Integrations", href: "/settings/integrations" },
          { label: "Notifications", href: "/settings/notifications" },
          { label: "Users", href: "/settings/users" },
        ]}
        activeValue={pathname}
      />

      <div className="max-w-4xl space-y-6">
        {/* Profile Information Card */}
        <div className="bg-surface-container-lowest rounded-xl p-6 card-shadow">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="material-symbols-outlined text-primary">person</span>
              <h3 className="font-headline text-lg font-bold text-on-surface">Profile Information</h3>
            </div>
            {!profileEditing && (
              <button
                onClick={() => setProfileEditing(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-outline-variant/20 rounded-lg text-xs font-semibold text-on-surface hover:bg-surface-container-low transition-all"
              >
                <span aria-hidden="true" className="material-symbols-outlined text-[14px] text-primary">edit</span>
                Edit Profile
              </button>
            )}
          </div>

          {/* Profile Picture */}
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-outline-variant/20">
            <div className="relative group">
              {profilePic ? (
                <img src={profilePic} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">
                  JS
                </div>
              )}
              {profileEditing && (
                <button
                  onClick={() => avatarInputRef.current?.click()}
                  className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <span aria-hidden="true" className="material-symbols-outlined text-white text-[24px]">photo_camera</span>
                </button>
              )}
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
            <div>
              <p className="text-sm font-bold text-on-surface">{profile.name}</p>
              <p className="text-xs text-on-surface-variant mt-0.5">{profile.role} at {profile.company}</p>
              {profileEditing && (
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => avatarInputRef.current?.click()}
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    {profilePic ? "Change Photo" : "Upload Photo"}
                  </button>
                  {profilePic && (
                    <button
                      onClick={() => setProfilePic(null)}
                      className="text-xs font-semibold text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {profileEditing ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-on-surface-variant tracking-wide uppercase">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                    className="w-full bg-surface-container-high border-none rounded-lg px-4 py-2.5 text-sm focus:bg-white focus:ring-1 focus:ring-primary/40 transition-all outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-on-surface-variant tracking-wide uppercase">Email Address</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                    className="w-full bg-surface-container-high border-none rounded-lg px-4 py-2.5 text-sm focus:bg-white focus:ring-1 focus:ring-primary/40 transition-all outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-on-surface-variant tracking-wide uppercase">Phone Number</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                    className="w-full bg-surface-container-high border-none rounded-lg px-4 py-2.5 text-sm focus:bg-white focus:ring-1 focus:ring-primary/40 transition-all outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-on-surface-variant tracking-wide uppercase">Company</label>
                  <input
                    type="text"
                    value={profile.company}
                    onChange={(e) => setProfile((p) => ({ ...p, company: e.target.value }))}
                    className="w-full bg-surface-container-high border-none rounded-lg px-4 py-2.5 text-sm focus:bg-white focus:ring-1 focus:ring-primary/40 transition-all outline-none"
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-semibold text-on-surface-variant tracking-wide uppercase">Role / Title</label>
                  <input
                    type="text"
                    value={profile.role}
                    onChange={(e) => setProfile((p) => ({ ...p, role: e.target.value }))}
                    className="w-full bg-surface-container-high border-none rounded-lg px-4 py-2.5 text-sm focus:bg-white focus:ring-1 focus:ring-primary/40 transition-all outline-none"
                  />
                </div>
              </div>
              <div className="mt-8 flex justify-end gap-3">
                <button
                  onClick={() => setProfileEditing(false)}
                  className="px-5 py-2.5 border border-outline-variant/20 rounded-lg text-sm font-semibold text-on-surface hover:bg-surface-container-low transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => { handleProfileSave(); setTimeout(() => setProfileEditing(false), 1500); }}
                  aria-live="polite"
                  className={`px-6 py-2.5 rounded-lg text-sm font-semibold shadow-lg transition-all flex items-center gap-2 ${
                    profileSaved
                      ? "bg-emerald-500 text-white shadow-emerald-500/20"
                      : "bg-gradient-to-br from-primary to-primary-container text-white shadow-primary/20 hover:scale-[1.02]"
                  }`}
                >
                  <span aria-hidden="true" className="material-symbols-outlined text-[16px]">{profileSaved ? "check" : "save"}</span>
                  {profileSaved ? "Saved!" : "Save Changes"}
                </button>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-widest mb-1">Full Name</p>
                <p className="text-sm font-medium text-on-surface">{profile.name}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-widest mb-1">Email Address</p>
                <p className="text-sm font-medium text-on-surface">{profile.email}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-widest mb-1">Phone Number</p>
                <p className="text-sm font-medium text-on-surface">{profile.phone}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-widest mb-1">Company</p>
                <p className="text-sm font-medium text-on-surface">{profile.company}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-widest mb-1">Role / Title</p>
                <p className="text-sm font-medium text-on-surface">{profile.role}</p>
              </div>
            </div>
          )}
        </div>

        {/* Security & Password Card */}
        <div className="bg-surface-container-lowest rounded-xl p-6 card-shadow">
          <div className="flex items-center gap-3 mb-6">
            <span aria-hidden="true" className="material-symbols-outlined text-primary">security</span>
            <h3 className="font-headline text-lg font-bold text-on-surface">Security &amp; Password</h3>
          </div>
          <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg mb-8">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary-fixed-dim flex items-center justify-center">
                <span
                  aria-hidden="true" className="material-symbols-outlined text-primary"
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
              <span aria-hidden="true" className="material-symbols-outlined text-[16px]">{passwordUpdated ? "check" : "lock"}</span>
              {passwordUpdated ? "Updated!" : "Update Password"}
            </button>
          </div>
        </div>

        {/* Property Management Card */}
        <div className="bg-surface-container-lowest rounded-xl p-6 card-shadow">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="material-symbols-outlined text-primary">apartment</span>
              <h3 className="font-headline text-lg font-bold text-on-surface">Property Management</h3>
            </div>
            <Link
              href="/properties/add"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/5 rounded-lg transition-colors"
            >
              <span aria-hidden="true" className="material-symbols-outlined text-[16px]">add</span>
              Add Property
            </Link>
          </div>
          <div className="divide-y divide-outline-variant/10">
            {[
              { name: "Main St. Loft", location: "Downtown District", status: "Active", statusColor: "bg-green-100 text-green-700", slug: "main-st-loft", units: "6 units", yield: "$8,200/mo" },
              { name: "Oak Ridge Estate", location: "North Highlands", status: "Active", statusColor: "bg-green-100 text-green-700", slug: "oak-ridge", units: "1 unit", yield: "$4,500/mo" },
              { name: "Downtown Plaza", location: "Business District", status: "Attention", statusColor: "bg-amber-100 text-amber-700", slug: "downtown-plaza", units: "4 units", yield: "$6,000/mo" },
            ].map((p) => (
              <div key={p.slug} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center shrink-0">
                  <span aria-hidden="true" className="material-symbols-outlined text-[20px] text-on-surface-variant">domain</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-on-surface truncate">{p.name}</p>
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wide ${p.statusColor}`}>{p.status}</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">{p.location} &middot; {p.units} &middot; {p.yield}</p>
                </div>
                <Link
                  href={`/properties/${p.slug}/edit`}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-outline-variant/20 rounded-lg text-xs font-semibold text-on-surface hover:bg-surface-container-low transition-all shrink-0"
                >
                  <span aria-hidden="true" className="material-symbols-outlined text-[14px] text-primary">edit</span>
                  Edit
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Smart Threshold Card */}
        <div id="thresholds" className="bg-surface-container-lowest rounded-xl p-6 card-shadow">
          <div className="flex items-center gap-3 mb-6">
            <span aria-hidden="true" className="material-symbols-outlined text-primary">tune</span>
            <h3 className="font-headline text-lg font-bold text-on-surface">Smart Thresholds</h3>
          </div>
          <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
            Transactions above this amount are automatically flagged for manual review in the Large Transactions AI review queue.
          </p>
          <div className="flex items-end gap-4 mb-4">
            <div className="flex-1 space-y-1.5">
              <label className="text-xs font-semibold text-on-surface-variant tracking-wide uppercase">
                Review Threshold
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold text-sm">$</span>
                <input
                  type="text"
                  value={thresholdValue}
                  onChange={(e) => {
                    const v = e.target.value.replace(/[^0-9]/g, "");
                    setThresholdValue(v);
                    setThresholdSaved(false);
                  }}
                  className="w-full bg-surface-container-high border-none rounded-lg pl-8 pr-4 py-2.5 text-sm font-bold focus:bg-white focus:ring-1 focus:ring-primary/40 transition-all outline-none"
                />
              </div>
            </div>
            <button
              onClick={() => { localStorage.setItem("smartThreshold", thresholdValue); setThresholdSaved(true); setTimeout(() => setThresholdSaved(false), 2000); }}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold shadow-lg transition-all flex items-center gap-2 ${
                thresholdSaved
                  ? "bg-emerald-500 text-white shadow-emerald-500/20"
                  : "bg-gradient-to-br from-primary to-primary-container text-white shadow-primary/20 hover:scale-[1.02]"
              }`}
            >
              <span aria-hidden="true" className="material-symbols-outlined text-[16px]">{thresholdSaved ? "check" : "save"}</span>
              {thresholdSaved ? "Saved!" : "Save"}
            </button>
          </div>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-[11px] text-on-surface-variant font-medium">Quick set:</span>
            {["500", "1000", "2500", "5000", "10000"].map((preset) => (
              <button
                key={preset}
                onClick={() => { setThresholdValue(preset); setThresholdSaved(false); }}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                  thresholdValue === preset
                    ? "bg-primary text-white"
                    : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
                }`}
              >
                ${Number(preset).toLocaleString()}
              </button>
            ))}
          </div>
          <div className="flex items-start gap-2 p-3 bg-primary-fixed/30 rounded-lg border border-primary-fixed">
            <span aria-hidden="true" className="material-symbols-outlined text-primary text-[16px] mt-0.5">info</span>
            <p className="text-[12px] text-on-surface-variant leading-relaxed">
              Lowering the threshold will flag more transactions for review.
              This setting applies to all properties under the &ldquo;High Stewardship&rdquo; security policy.
            </p>
          </div>
        </div>

        {/* Onboarding Card */}
        <div className="bg-surface-container-lowest rounded-xl p-6 card-shadow border border-dashed border-outline-variant/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-md">
              <div className="flex items-center gap-3 mb-2">
                <span aria-hidden="true" className="material-symbols-outlined text-primary">auto_awesome</span>
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

    </AppLayout>
  );
}
