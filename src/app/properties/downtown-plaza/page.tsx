"use client";

import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";
import KPICard from "@/components/KPICard";

const units = [
  { unit: "Unit 1", tenant: "Acme Corp", rent: "$2,200", status: "Current", statusBg: "bg-green-100", statusText: "text-green-700" },
  { unit: "Unit 2", tenant: "StartupXYZ", rent: "$1,800", status: "Current", statusBg: "bg-green-100", statusText: "text-green-700" },
  { unit: "Unit 3", tenant: "\u2014", rent: "\u2014", status: "Vacant", statusBg: "bg-red-100", statusText: "text-red-700" },
  { unit: "Unit 4", tenant: "Legal Associates", rent: "$2,000", status: "Current", statusBg: "bg-green-100", statusText: "text-green-700" },
];
const txns = [
  { date: "Mar 15", desc: "Rent - Unit 1", cat: "Rental Income", amount: "+$2,200", amountClass: "text-emerald-600" },
  { date: "Mar 14", desc: "Rent - Unit 2", cat: "Rental Income", amount: "+$1,800", amountClass: "text-emerald-600" },
  { date: "Mar 12", desc: "HVAC Repair", cat: "Maintenance", amount: "-$1,200", amountClass: "text-on-surface" },
  { date: "Mar 10", desc: "Rent - Unit 4", cat: "Rental Income", amount: "+$2,000", amountClass: "text-emerald-600" },
];

export default function DowntownPlazaPage() {
  return (
    <AppLayout>
      <PageHeader
        title="Downtown Plaza"
        subtitle="789 Commercial Ave, Manhattan, NY"
        breadcrumb={{ label: "Back to Properties", href: "/properties" }}
        actions={
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-surface-container-lowest border border-outline-variant/20 rounded-xl text-sm font-semibold text-on-surface shadow-sm hover:shadow-md transition-all">
              <span className="material-symbols-outlined text-[18px]">edit</span>
              Edit Details
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-all">
              <span className="material-symbols-outlined text-[18px]">bar_chart</span>
              View Financials
            </button>
          </div>
        }
      />

      {/* Hero Gradient */}
      <div className="h-48 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl" />

      {/* Alert Banner */}
      <div className="bg-[#FEF3C7] text-[#92400E] p-4 rounded-xl flex items-center justify-between shadow-sm border border-[#FDE68A]/50">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[20px]">warning</span>
          <span className="text-sm font-medium tracking-tight">
            1 unit vacant since Oct 2023 &mdash; consider listing or adjusting rent
          </span>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard label="Units" value="4" icon="apartment" />
        <KPICard label="Occupancy" value="75%" icon="group" iconBg="bg-[#FEF3C7]" iconColor="text-[#92400E]" />
        <KPICard label="Revenue" value="$6,000" icon="payments" iconBg="bg-emerald-100" iconColor="text-emerald-600" />
        <KPICard label="Cap Rate" value="5.9%" icon="trending_up" iconBg="bg-secondary-fixed-dim" iconColor="text-secondary" />
      </div>

      {/* Unit Breakdown */}
      <div>
        <h2 className="text-xl font-bold mb-6">Unit Breakdown</h2>
        <div className="bg-surface-container-lowest rounded-2xl card-shadow overflow-hidden border border-outline-variant/10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-8 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Unit</th>
                <th className="px-8 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Tenant</th>
                <th className="px-8 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Rent</th>
                <th className="px-8 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {units.map((u, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-all">
                  <td className="px-8 py-5 text-sm font-bold text-on-surface">{u.unit}</td>
                  <td className="px-8 py-5 text-sm text-on-surface-variant">{u.tenant}</td>
                  <td className="px-8 py-5 text-sm font-semibold text-on-surface">{u.rent}</td>
                  <td className="px-8 py-5 text-right">
                    <span className={`px-3 py-1 ${u.statusBg} ${u.statusText} text-[11px] font-bold rounded-full uppercase tracking-wide`}>
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <h2 className="text-xl font-bold mb-6">Recent Transactions</h2>
        <div className="bg-surface-container-lowest rounded-2xl card-shadow overflow-hidden border border-outline-variant/10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-8 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Date</th>
                <th className="px-8 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Description</th>
                <th className="px-8 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Category</th>
                <th className="px-8 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {txns.map((t, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-all">
                  <td className="px-8 py-5 text-sm text-on-surface-variant font-medium">{t.date}</td>
                  <td className="px-8 py-5 text-sm font-bold text-on-surface">{t.desc}</td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 text-[11px] font-bold rounded-full uppercase tracking-wide ${
                      t.cat === "Rental Income" ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-600"
                    }`}>
                      {t.cat}
                    </span>
                  </td>
                  <td className={`px-8 py-5 text-right font-bold text-sm ${t.amountClass}`} style={{ fontFamily: "'Manrope', sans-serif" }}>
                    {t.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Transaction */}
      <div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-surface-container-lowest border border-outline-variant/20 rounded-xl text-sm font-semibold text-on-surface shadow-sm hover:shadow-md transition-all">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Transaction
        </button>
      </div>
    </AppLayout>
  );
}
