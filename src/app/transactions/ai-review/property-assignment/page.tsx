"use client";

import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";

const transactions = [
  {
    vendor: "Ace Hardware Supplies",
    date: "Oct 24, 2023 \u2022 General Maintenance",
    amount: "$1,240.50",
    type: "Debit Transaction",
    suggestion: "Main St. Loft",
    confidence: 87,
    confidenceStyle: "bg-green-100 text-green-700",
    options: ["Accept Suggestion", "Oak Ridge", "Downtown Plaza", "Unassigned"],
  },
  {
    vendor: "City Utility Services",
    date: "Oct 22, 2023 \u2022 Electricity & Water",
    amount: "$482.12",
    type: "Recurring",
    suggestion: "Downtown Plaza",
    confidence: 94,
    confidenceStyle: "bg-green-100 text-green-700",
    options: ["Accept Suggestion", "Main St. Loft", "Oak Ridge", "Unassigned"],
  },
  {
    vendor: "Green Garden Landscapes",
    date: "Oct 20, 2023 \u2022 Groundskeeping",
    amount: "$350.00",
    type: "Maintenance",
    suggestion: "Oak Ridge",
    confidence: 62,
    confidenceStyle: "bg-orange-100 text-orange-700",
    options: ["Accept Suggestion", "Main St. Loft", "Downtown Plaza", "Unassigned"],
  },
  {
    vendor: "Elevator Tech Solutions",
    date: "Oct 18, 2023 \u2022 Emergency Repair",
    amount: "$2,100.00",
    type: "High Priority",
    suggestion: "Main St. Loft",
    confidence: 81,
    confidenceStyle: "bg-green-100 text-green-700",
    options: ["Accept Suggestion", "Oak Ridge", "Downtown Plaza", "Unassigned"],
  },
];

const breakdown = [
  { name: "Main St. Loft", sub: "Residential Portfolio", count: "8 assigned", color: "bg-primary" },
  { name: "Oak Ridge", sub: "Commercial Estate", count: "5 assigned", color: "bg-primary-container" },
  { name: "Downtown Plaza", sub: "Retail Center", count: "3 assigned", color: "bg-primary-fixed-dim" },
];

export default function PropertyAssignmentPage() {
  return (
    <AppLayout>
      <PageHeader
        title="Property Assignment Review"
        breadcrumb={{ label: "Back to AI Review", href: "/transactions/ai-review" }}
        badge="10 Pending"
      />

      <div className="flex gap-6">
        {/* Left Column: Transactions */}
        <section className="w-[700px] flex flex-col gap-5">
          {transactions.map((tx, i) => (
            <div
              key={i}
              className="bg-surface-container-lowest rounded-xl p-6 card-shadow flex flex-col gap-5"
            >
              {/* Top row */}
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[0.65rem] font-bold text-on-surface-variant uppercase tracking-widest mb-1">
                    Vendor &amp; Date
                  </p>
                  <h4 className="text-lg font-bold text-on-surface">{tx.vendor}</h4>
                  <p className="text-sm text-on-surface-variant">{tx.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-extrabold text-on-surface">{tx.amount}</p>
                  <span className="text-[10px] font-bold text-primary uppercase">{tx.type}</span>
                </div>
              </div>

              {/* AI Suggestion row */}
              <div className="bg-surface-container-low rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-fixed-dim flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-primary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      auto_awesome
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-on-surface-variant">AI Suggestion</p>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-on-surface">{tx.suggestion}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${tx.confidenceStyle}`}
                      >
                        {tx.confidence}% CONFIDENCE
                      </span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <select className="appearance-none bg-surface-container-lowest border-none text-sm font-semibold rounded-lg pl-4 pr-10 py-2 focus:ring-2 focus:ring-primary/20 cursor-pointer shadow-sm">
                    {tx.options.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
                    expand_more
                  </span>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Right Column: Summary & Actions */}
        <aside className="w-[432px] flex flex-col gap-6">
          {/* Property Breakdown */}
          <div className="bg-surface-container-lowest rounded-xl p-8 card-shadow h-fit sticky top-24">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-on-surface mb-1">Property Breakdown</h3>
              <p className="text-sm text-on-surface-variant">Current assignment distribution</p>
            </div>

            <div className="space-y-6 mb-10">
              {breakdown.map((b) => (
                <div key={b.name} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-10 ${b.color} rounded-full`} />
                    <div>
                      <p className="font-bold text-on-surface">{b.name}</p>
                      <p className="text-xs text-on-surface-variant">{b.sub}</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-on-surface">{b.count}</span>
                </div>
              ))}

              <div className="pt-4 border-t border-surface-container">
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-10 bg-surface-dim rounded-full" />
                    <div>
                      <p className="font-bold text-on-surface">Unassigned</p>
                      <p className="text-xs text-on-surface-variant">Awaiting Verification</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-error">4 left</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-primary text-white py-4 rounded-xl font-bold text-base shadow-xl shadow-primary/30 hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                bolt
              </span>
              Auto-Assign Remaining
            </button>

            <div className="mt-6 flex items-center justify-center gap-2 text-on-surface-variant text-xs font-medium">
              <span className="material-symbols-outlined text-[14px]">info</span>
              AI will use high-confidence matches only
            </div>
          </div>

          {/* Portfolio Health Card */}
          <div className="bg-primary overflow-hidden rounded-xl p-6 relative">
            <div className="relative z-10">
              <h4 className="text-white font-bold text-lg mb-2">Portfolio Health</h4>
              <p className="text-primary-fixed text-xs mb-4">
                You&apos;ve categorized 92% of this month&apos;s luxury property overhead.
              </p>
              <div className="w-full bg-white/20 h-2 rounded-full mb-2">
                <div className="bg-white h-full w-[92%] rounded-full" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-container opacity-50" />
            <span
              className="material-symbols-outlined absolute -bottom-4 -right-4 text-white/10 text-[120px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              insights
            </span>
          </div>
        </aside>
      </div>
    </AppLayout>
  );
}
