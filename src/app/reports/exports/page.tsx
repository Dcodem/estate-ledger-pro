"use client";
import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";
import { useState } from "react";

const presets = [
  {
    icon: "account_balance_wallet",
    iconBg: "bg-violet-50 text-violet-600",
    title: "Accountant-Ready",
    desc: "Full general ledger with standardized tax classification codes.",
  },
  {
    icon: "analytics",
    iconBg: "bg-amber-50 text-amber-600",
    title: "Quarterly Review",
    desc: "Summary of performance across all holdings for board review.",
  },
  {
    icon: "location_city",
    iconBg: "bg-emerald-50 text-emerald-600",
    title: "Individual Property",
    desc: "Deep-dive financial history for a single selected asset.",
  },
];

const exportHistory = [
  { name: "FY 2022 Full Ledger", date: "Oct 12, 2023", size: "4.2 MB", format: "Excel", status: "Ready", statusColor: "text-emerald-600", dotColor: "bg-emerald-500" },
  { name: "Q3 Performance Summary", date: "Sep 01, 2023", size: "1.8 MB", format: "CSV", status: "Ready", statusColor: "text-emerald-600", dotColor: "bg-emerald-500" },
  { name: "Main St. Audit Log", date: "Aug 24, 2023", size: "12.1 MB", format: "Excel", status: "Archiving", statusColor: "text-amber-600", dotColor: "bg-amber-500" },
];

export default function ExportsPage() {
  const [format, setFormat] = useState("excel");
  const [dateRange, setDateRange] = useState("2023 Tax Year");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setGenerated(false);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 3000);
  };

  return (
    <AppLayout>
      <PageHeader
        title="Export Reports"
        subtitle="Configure and generate detailed financial statements for your portfolio."
        breadcrumb={{ label: "Back to Reports", href: "/reports" }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Stepped Form Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface-container-lowest p-8 rounded-xl card-shadow space-y-10">
            {/* Step 1: Format */}
            <section>
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-5 h-5 flex items-center justify-center rounded-full bg-primary text-[10px] text-white">1</span>
                Select Export Format
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <label
                  onClick={() => setFormat("excel")}
                  className={`relative flex flex-col items-center justify-center p-6 border-2 rounded-xl cursor-pointer transition-all ${
                    format === "excel" ? "border-primary bg-violet-50/20" : "border-transparent bg-surface-container-low hover:bg-surface-container-high"
                  }`}
                >
                  <span className={`material-symbols-outlined text-[32px] mb-2 ${format === "excel" ? "text-violet-600" : "text-slate-400"}`}>table_chart</span>
                  <span className="text-sm font-bold text-on-surface">Excel</span>
                  <span className="text-[10px] text-on-surface-variant">.xlsx file</span>
                  {format === "excel" && (
                    <div className="absolute top-2 right-2">
                      <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    </div>
                  )}
                </label>
                <label
                  onClick={() => setFormat("csv")}
                  className={`relative flex flex-col items-center justify-center p-6 border-2 rounded-xl cursor-pointer transition-all ${
                    format === "csv" ? "border-primary bg-violet-50/20" : "border-transparent bg-surface-container-low hover:bg-surface-container-high"
                  }`}
                >
                  <span className={`material-symbols-outlined text-[32px] mb-2 ${format === "csv" ? "text-violet-600" : "text-slate-400"}`}>description</span>
                  <span className="text-sm font-bold text-on-surface">CSV</span>
                  <span className="text-[10px] text-on-surface-variant">Raw data</span>
                  {format === "csv" && (
                    <div className="absolute top-2 right-2">
                      <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    </div>
                  )}
                </label>
              </div>
            </section>

            {/* Step 2: Date Range */}
            <section>
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-5 h-5 flex items-center justify-center rounded-full bg-primary text-[10px] text-white">2</span>
                Date Range
              </h2>
              <div className="relative">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full bg-surface-container-low border-none rounded-xl py-3 pl-4 pr-10 text-sm font-medium focus:ring-2 focus:ring-violet-500/20 appearance-none"
                >
                  <option>2023 Tax Year</option>
                  <option>Q1 2024</option>
                  <option>Last 12 Months</option>
                  <option>Custom Range...</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
              </div>
              {dateRange === "Custom Range..." && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Start Date</label>
                    <input
                      type="date"
                      className="w-full bg-surface-container-low border-none rounded-xl py-3 pl-4 pr-10 text-sm font-medium focus:ring-2 focus:ring-violet-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">End Date</label>
                    <input
                      type="date"
                      className="w-full bg-surface-container-low border-none rounded-xl py-3 pl-4 pr-10 text-sm font-medium focus:ring-2 focus:ring-violet-500/20"
                    />
                  </div>
                </div>
              )}
            </section>

            {/* Step 3: Property Selection */}
            <section>
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-5 h-5 flex items-center justify-center rounded-full bg-primary text-[10px] text-white">3</span>
                Property Selection
              </h2>
              <div className="grid grid-cols-2 gap-y-4">
                {["All Properties", "Main St. Loft", "Oak Ridge", "Downtown Plaza"].map((p, i) => (
                  <label key={p} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      defaultChecked={i === 0}
                      className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20 cursor-pointer"
                    />
                    <span className="text-sm font-medium text-on-surface">{p}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* Step 4: Table Preferences */}
            <section>
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-5 h-5 flex items-center justify-center rounded-full bg-primary text-[10px] text-white">4</span>
                Table Preferences
              </h2>
              <div className="space-y-4">
                {[
                  { label: "Include charts", desc: "Visualize trends in the Excel dashboard tab" },
                  { label: "Include notes", desc: "Add auditor comments to transaction lines" },
                  { label: "Separate sheets per property", desc: "Organize assets into individual workbook tabs" },
                ].map((pref) => (
                  <label key={pref.label} className="flex items-center gap-3 p-4 bg-surface-container-low rounded-xl cursor-pointer hover:bg-surface-container-high transition-all">
                    <input type="checkbox" className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20 cursor-pointer" />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold">{pref.label}</span>
                      <span className="text-[11px] text-on-surface-variant">{pref.desc}</span>
                    </div>
                  </label>
                ))}
              </div>
            </section>

            {/* Footer of Form */}
            <footer className="pt-10 border-t border-slate-50 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  <span>Storage quota</span>
                  <span>84.2 GB of 250 GB used</span>
                </div>
                <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "33.68%" }} />
                </div>
              </div>
              {generated ? (
                <div className="w-full py-4 bg-emerald-500 text-white text-lg font-extrabold rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  Report Ready — Download Now
                </div>
              ) : (
                <button
                  onClick={handleGenerate}
                  disabled={generating}
                  className="w-full py-4 bg-primary-container text-white text-lg font-extrabold rounded-xl shadow-lg shadow-violet-500/20 hover:opacity-90 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {generating ? (
                    <>
                      <span className="material-symbols-outlined text-[24px] animate-spin">progress_activity</span>
                      Generating Report...
                    </>
                  ) : (
                    "Generate 2023 Report"
                  )}
                </button>
              )}
            </footer>
          </div>
        </div>

        {/* Secondary Content Column */}
        <div className="space-y-8">
          {/* Quick Export Presets */}
          <section>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Export Presets</h3>
            <div className="space-y-4">
              {presets.map((preset) => (
                <div key={preset.title} className="group bg-surface-container-lowest p-5 rounded-xl card-shadow border border-transparent hover:border-violet-200 transition-all cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <div className={`p-2 ${preset.iconBg} rounded-lg`}>
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{preset.icon}</span>
                    </div>
                    <span className="material-symbols-outlined text-slate-300 group-hover:text-violet-600 transition-colors">arrow_forward_ios</span>
                  </div>
                  <h4 className="font-bold text-on-surface">{preset.title}</h4>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{preset.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Export History */}
          <section>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Export History</h3>
            <div className="bg-surface-container-lowest rounded-xl card-shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-surface-container-low border-b border-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Report Name</th>
                      <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Format</th>
                      <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {exportHistory.map((item) => (
                      <tr key={item.name} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-4">
                          <div className="text-xs font-bold text-on-surface">{item.name}</div>
                          <div className="text-[10px] text-on-surface-variant mt-0.5">{item.date} &bull; {item.size}</div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] font-bold text-slate-600 uppercase">{item.format}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`flex items-center gap-1 text-[10px] font-bold ${item.statusColor}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${item.dotColor}`} /> {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-slate-50/50 text-center">
                <button className="text-[11px] font-bold text-violet-600 hover:text-violet-700 transition-colors">View All Archive</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}
