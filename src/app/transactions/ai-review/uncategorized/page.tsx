"use client";

import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";

const transactions = [
  {
    date: "Oct 24, 2023",
    vendor: "The Home Depot #4211",
    bank: "Chase Business Checking (***4412)",
    amount: "$1,482.50",
    categories: ["Select category...", "Maintenance", "Capital Improvement"],
    properties: ["Select property...", "Main St. Loft", "Park View Heights"],
  },
  {
    date: "Oct 22, 2023",
    vendor: "Sparkle Window Cleaning",
    bank: "Wells Fargo Operating (***9901)",
    amount: "$320.00",
    categories: ["Select category..."],
    properties: ["Select property..."],
  },
  {
    date: "Oct 21, 2023",
    vendor: "City Water & Power",
    bank: "Chase Business Checking (***4412)",
    amount: "$89.42",
    categories: ["Select category..."],
    properties: ["Select property..."],
  },
  {
    date: "Oct 20, 2023",
    vendor: "Empire HVAC Services",
    bank: "Amex Platinum Business (***1008)",
    amount: "$2,100.00",
    categories: ["Select category..."],
    properties: ["Select property..."],
  },
];

const sources = [
  { name: "Chase Business", count: 5, color: "bg-primary" },
  { name: "Wells Fargo", count: 4, color: "bg-secondary-container" },
  { name: "Amex Platinum", count: 3, color: "bg-tertiary-fixed-dim" },
];

export default function UncategorizedPage() {
  return (
    <AppLayout>
      <PageHeader
        title="Uncategorized Transactions"
        breadcrumb={{ label: "Back to AI Review", href: "/transactions/ai-review" }}
        badge="12 ITEMS"
      />

      <div className="flex gap-6 items-start">
        {/* LEFT COLUMN: Transactions Stack */}
        <section className="w-[700px] flex flex-col gap-6">
          {transactions.map((tx, i) => (
            <div
              key={i}
              className="bg-surface-container-lowest p-6 rounded-xl card-shadow"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-[0.75rem] font-semibold text-on-surface-variant uppercase tracking-wider mb-1">
                    {tx.date}
                  </p>
                  <h3 className="text-lg font-bold">{tx.vendor}</h3>
                  <div className="flex items-center gap-2 mt-1 text-on-surface-variant text-xs">
                    <span className="material-symbols-outlined text-sm">account_balance</span>
                    {tx.bank}
                  </div>
                </div>
                <div className="text-[20px] font-bold text-on-surface">{tx.amount}</div>
              </div>

              {/* Dropdowns */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-[0.75rem] font-semibold text-on-surface-variant mb-2">
                    Assign Category
                  </label>
                  <div className="relative">
                    <select className="w-full bg-surface-container-high border-none rounded-lg py-2.5 px-4 text-sm appearance-none focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all">
                      {tx.categories.map((cat) => (
                        <option key={cat}>{cat}</option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-2.5 text-on-surface-variant pointer-events-none">
                      expand_more
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-[0.75rem] font-semibold text-on-surface-variant mb-2">
                    Assign Property
                  </label>
                  <div className="relative">
                    <select className="w-full bg-surface-container-high border-none rounded-lg py-2.5 px-4 text-sm appearance-none focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all">
                      {tx.properties.map((prop) => (
                        <option key={prop}>{prop}</option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-2.5 text-on-surface-variant pointer-events-none">
                      expand_more
                    </span>
                  </div>
                </div>
              </div>

              {/* Save */}
              <div className="flex justify-end">
                <button className="bg-primary text-on-primary px-6 py-2 rounded-lg text-sm font-semibold hover:opacity-90 shadow-md shadow-primary/10">
                  Save
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* RIGHT COLUMN: Summary & Quick Actions */}
        <aside className="w-[432px] flex flex-col gap-8">
          {/* Summary Section */}
          <section>
            <h2 className="text-[20px] font-bold mb-6">Summary</h2>
            <div className="bg-surface-container-lowest p-8 rounded-xl card-shadow">
              {/* Pie chart representation */}
              <div className="flex justify-center mb-8 relative">
                <div className="w-40 h-40 rounded-full border-[12px] border-primary flex items-center justify-center relative overflow-hidden">
                  <div
                    className="absolute inset-0 border-[12px] border-secondary-container"
                    style={{ clipPath: "polygon(50% 50%, 50% 0%, 100% 0%, 100% 60%)" }}
                  />
                  <div
                    className="absolute inset-0 border-[12px] border-tertiary-fixed-dim"
                    style={{ clipPath: "polygon(50% 50%, 100% 60%, 100% 100%, 0% 100%, 0% 70%)" }}
                  />
                  <div className="text-center">
                    <span className="block text-2xl font-bold">12</span>
                    <span className="text-[0.65rem] font-bold text-on-surface-variant uppercase tracking-tighter">
                      Total Items
                    </span>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-4">
                {sources.map((s) => (
                  <div key={s.name} className="flex justify-between items-center group">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${s.color}`} />
                      <span className="text-sm font-medium">{s.name}</span>
                    </div>
                    <span className="text-sm font-bold bg-surface-container-high px-2 py-0.5 rounded">
                      {s.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Quick Actions Section */}
          <section>
            <h2 className="text-[20px] font-bold mb-6">Quick Actions</h2>
            <div className="bg-surface-container-lowest p-6 rounded-xl card-shadow space-y-3">
              <button className="w-full flex items-center justify-center gap-2 border border-outline-variant/30 py-3.5 rounded-xl text-sm font-semibold text-primary hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined text-lg">auto_fix_high</span>
                Assign all to Maintenance
              </button>
              <button className="w-full flex items-center justify-center gap-2 border border-outline-variant/30 py-3.5 rounded-xl text-sm font-semibold text-primary hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined text-lg">home_work</span>
                Assign all to Main St. Loft
              </button>
              <div className="pt-2">
                <button className="w-full py-4 rounded-xl text-sm font-bold text-on-primary bg-primary shadow-lg shadow-primary/30 hover:shadow-xl hover:translate-y-[-1px] transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">done_all</span>
                  Mark All as Reviewed
                </button>
              </div>
            </div>

            {/* Insight Card */}
            <div className="mt-8 bg-gradient-to-br from-primary to-primary-container p-6 rounded-xl text-on-primary-container shadow-xl">
              <div className="flex gap-4">
                <div className="bg-white/20 p-2 rounded-lg h-fit">
                  <span className="material-symbols-outlined text-white">lightbulb</span>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Tax Season Tip</h4>
                  <p className="text-sm text-white/80 leading-relaxed">
                    Uncategorized expenses cannot be deducted. Review these 12 items to potentially save
                    $1,240 in tax liabilities.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </AppLayout>
  );
}
