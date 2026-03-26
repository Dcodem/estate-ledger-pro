"use client";
import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";

const kpis = [
  {
    icon: "payments",
    iconBg: "bg-primary-fixed-dim",
    iconColor: "text-primary",
    label: "Total Revenue",
    value: "$142,500",
    trend: "+4.2%",
    trendColor: "text-emerald-600 bg-emerald-50",
  },
  {
    icon: "account_balance_wallet",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    label: "Total Expenses",
    value: "($38,240.12)",
  },
  {
    icon: "trending_up",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    label: "Operating Profit",
    value: "($5,849.38)",
    note: "Pre-tax reconciliation",
  },
];

const properties = [
  {
    name: "Main St. Loft - Consolidated",
    type: "Mixed-Use Commercial",
    income: "$42,500.00",
    credits: "$1,200.00",
    creditsColor: "text-emerald-600",
    debits: "($8,450.00)",
    net: "$35,250.00",
    status: "Verified",
    statusColor: "bg-emerald-100 text-emerald-700",
    expanded: true,
    subItems: [
      { name: "Residential Lease - Unit 4B", income: "$4,200.00", credits: "\u2014", debits: "\u2014", net: "$4,200.00" },
      { name: "HVAC Maintenance - Quarterly", income: "\u2014", credits: "\u2014", debits: "($1,850.00)", debitsColor: "text-error", net: "($1,850.00)" },
    ],
  },
  {
    name: "Oak Ridge Estate",
    type: "Luxury Residential",
    income: "$85,000.00",
    credits: "$0.00",
    creditsColor: "text-slate-400",
    debits: "($22,400.00)",
    net: "$62,600.00",
    status: "Draft",
    statusColor: "bg-surface-container-high text-on-surface-variant",
    expanded: false,
    subItems: [],
  },
  {
    name: "Downtown Plaza",
    type: "Retail Strip",
    income: "$15,000.00",
    credits: "$450.00",
    creditsColor: "text-emerald-600",
    debits: "($7,390.12)",
    net: "$8,059.88",
    status: "Verified",
    statusColor: "bg-emerald-100 text-emerald-700",
    expanded: false,
    subItems: [],
  },
];

export default function MonthlyStatementPage() {
  const [period, setPeriod] = useState("Statement Period: March 2024");
  const [propertyFilter, setPropertyFilter] = useState("Filter: All Properties");

  const filteredProperties = properties.filter((p) => {
    if (propertyFilter === "Filter: All Properties") return true;
    return p.name.startsWith(propertyFilter);
  });

  return (
    <AppLayout>
      <PageHeader
        title="Monthly Statement"
        subtitle="Consolidated performance report"
        breadcrumb={{ label: "Back to Reports", href: "/reports" }}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="appearance-none bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer"
              >
                <option>Statement Period: March 2024</option>
                <option>February 2024</option>
                <option>January 2024</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">expand_more</span>
            </div>
            <div className="relative">
              <select
                value={propertyFilter}
                onChange={(e) => setPropertyFilter(e.target.value)}
                className="appearance-none bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer"
              >
                <option>Filter: All Properties</option>
                <option>Main St. Loft</option>
                <option>Oak Ridge Estate</option>
                <option>Downtown Plaza</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">expand_more</span>
            </div>
          </div>
        }
      />

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/10 flex flex-col justify-between group hover:border-primary/20 transition-colors">
            <div className="flex items-start justify-between">
              <div className={`w-10 h-10 rounded-xl ${kpi.iconBg} flex items-center justify-center ${kpi.iconColor}`}>
                <span className="material-symbols-outlined">{kpi.icon}</span>
              </div>
              {kpi.trend && (
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${kpi.trendColor}`}>{kpi.trend}</span>
              )}
            </div>
            <div className="mt-6">
              <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">{kpi.label}</p>
              <h2 className="text-2xl font-extrabold text-on-surface mt-1">{kpi.value}</h2>
              {kpi.note && <p className="text-[10px] text-on-surface-variant mt-1">{kpi.note}</p>}
            </div>
          </div>
        ))}
        {/* Cash Flow Card - special primary background */}
        <div className="bg-primary p-6 rounded-2xl shadow-xl shadow-primary/10 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-container opacity-90" />
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <span className="material-symbols-outlined">account_balance</span>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-xs font-semibold text-white/70 uppercase tracking-wider">Net Cash/Flow</p>
              <h2 className="text-2xl font-extrabold text-white mt-1">$98,410.50</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Ledger */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden border border-outline-variant/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low/50 sticky top-0 z-10 backdrop-blur-md">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest border-b border-outline-variant/10">Asset &amp; Category</th>
                <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest border-b border-outline-variant/10 text-right">Income</th>
                <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest border-b border-outline-variant/10 text-right">Expense Credits</th>
                <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest border-b border-outline-variant/10 text-right">Expense Debits</th>
                <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest border-b border-outline-variant/10 text-right">Net Position</th>
                <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest border-b border-outline-variant/10">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {filteredProperties.map((prop) => (
                <tr key={prop.name}>
                  <td colSpan={6} className="p-0">
                    <table className="w-full">
                      <tbody>
                        {/* Property Row */}
                        <tr className="bg-surface-container-low/30 hover:bg-surface-container-low/50 transition-colors">
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-4">
                              <span className={`material-symbols-outlined ${prop.expanded ? "text-primary" : "text-slate-400"}`}>
                                {prop.expanded ? "expand_more" : "chevron_right"}
                              </span>
                              <div>
                                <p className="text-sm font-extrabold text-on-surface">{prop.name}</p>
                                <p className="text-[10px] text-on-surface-variant font-medium">{prop.type}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5 text-right font-bold text-sm">{prop.income}</td>
                          <td className={`px-6 py-5 text-right font-bold text-sm ${prop.creditsColor || ""}`}>{prop.credits}</td>
                          <td className="px-6 py-5 text-right font-bold text-sm text-error">{prop.debits}</td>
                          <td className="px-6 py-5 text-right font-extrabold text-sm">{prop.net}</td>
                          <td className="px-6 py-5">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${prop.statusColor}`}>
                              {prop.status}
                            </span>
                          </td>
                        </tr>
                        {/* Sub-items */}
                        {prop.expanded && prop.subItems.map((sub) => (
                          <tr key={sub.name} className="hover:bg-slate-50 transition-colors">
                            <td className="px-14 py-4">
                              <p className="text-sm text-on-surface font-medium">{sub.name}</p>
                            </td>
                            <td className="px-6 py-4 text-right text-sm font-medium">{sub.income}</td>
                            <td className="px-6 py-4 text-right text-sm text-slate-400">{sub.credits}</td>
                            <td className={`px-6 py-4 text-right text-sm ${sub.debitsColor || "text-slate-400"} font-medium`}>{sub.debits}</td>
                            <td className="px-6 py-4 text-right text-sm font-bold">{sub.net}</td>
                            <td className="px-6 py-4" />
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-outline-variant/10">
        <div className="flex items-center gap-3 text-sm text-on-surface-variant font-medium">
          <span className="material-symbols-outlined text-primary/60">history_edu</span>
          Statement generated Mar 24, 2024 &bull; 14:02 PM
        </div>
        <div className="flex items-center gap-4 mt-6 md:mt-0">
          <button className="flex items-center gap-2 border border-outline-variant px-6 py-2.5 rounded-xl text-sm font-bold text-on-surface hover:bg-slate-50 transition-colors">
            <span className="material-symbols-outlined">print</span>
            Print
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-8 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all">
            <span className="material-symbols-outlined">download</span>
            Download PDF
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
