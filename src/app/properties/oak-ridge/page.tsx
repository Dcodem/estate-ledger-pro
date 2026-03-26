"use client";

import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";
import KPICard from "@/components/KPICard";

const financials = [
  { item: "Rental Income", amount: "$4,500", amountClass: "text-emerald-600", icon: "payments" },
  { item: "Maintenance", amount: "-$320", amountClass: "text-on-surface", icon: "build" },
  { item: "Insurance", amount: "-$180", amountClass: "text-on-surface", icon: "shield" },
  { item: "Taxes", amount: "-$450", amountClass: "text-on-surface", icon: "receipt_long" },
  { item: "Net", amount: "$3,550", amountClass: "text-emerald-600 font-extrabold", icon: "account_balance_wallet", isTotal: true },
];
const txns = [
  { date: "Mar 15", desc: "Lawn Care", cat: "Maintenance", amount: "-$320", amountClass: "text-on-surface" },
  { date: "Mar 14", desc: "Insurance Premium", cat: "Insurance", amount: "-$180", amountClass: "text-on-surface" },
  { date: "Mar 1", desc: "Rent Collection", cat: "Rental Income", amount: "+$4,500", amountClass: "text-emerald-600" },
  { date: "Feb 28", desc: "Property Tax", cat: "Taxes", amount: "-$450", amountClass: "text-on-surface" },
];

export default function OakRidgePage() {
  return (
    <AppLayout>
      <PageHeader
        title="Oak Ridge Estate"
        subtitle="123 Oak Ridge Dr, Greenwich, CT"
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
      <div className="h-48 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl" />

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard label="Units" value="1" icon="home" />
        <KPICard label="Occupancy" value="100%" icon="group" iconBg="bg-emerald-100" iconColor="text-emerald-600" />
        <KPICard label="Revenue" value="$4,500" icon="payments" iconBg="bg-emerald-100" iconColor="text-emerald-600" />
        <KPICard label="Cap Rate" value="6.8%" icon="trending_up" iconBg="bg-secondary-fixed-dim" iconColor="text-secondary" />
      </div>

      {/* Financial Summary */}
      <div>
        <h2 className="text-xl font-bold mb-6">Financial Summary</h2>
        <div className="bg-surface-container-lowest rounded-2xl card-shadow overflow-hidden border border-outline-variant/10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-8 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Item</th>
                <th className="px-8 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {financials.map((f, i) => (
                <tr key={i} className={`hover:bg-slate-50/50 transition-all ${f.isTotal ? "bg-surface-container-low/30" : ""}`}>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[18px] text-on-surface-variant">{f.icon}</span>
                      <span className={`text-sm ${f.isTotal ? "font-bold text-on-surface" : "text-on-surface-variant"}`}>{f.item}</span>
                    </div>
                  </td>
                  <td className={`px-8 py-5 text-right text-sm font-bold ${f.amountClass}`} style={{ fontFamily: "'Manrope', sans-serif" }}>
                    {f.amount}
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
                      t.cat === "Rental Income" ? "bg-emerald-50 text-emerald-600"
                      : t.cat === "Maintenance" ? "bg-blue-50 text-blue-600"
                      : t.cat === "Insurance" ? "bg-slate-100 text-slate-600"
                      : "bg-amber-50 text-amber-700"
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
