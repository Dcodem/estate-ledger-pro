"use client";

import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";

const transactions = [
  {
    vendor: "Precision Architectural Studio",
    date: "Oct 24, 2023 \u2022 14:32 PM",
    amount: "$8,245.00",
    method: "Bank Transfer",
    tags: [
      { label: "Renovation", style: "bg-secondary-fixed-dim/30 text-on-secondary-container" },
      { label: "Bel Air Estate", style: "bg-primary-fixed-dim/30 text-primary-container" },
    ],
    icon: "electric_bolt",
    hasReceipt: true,
    receiptNote: "\u201CPhase 2 design fees for the master suite expansion.\u201D",
    flagged: false,
  },
  {
    vendor: "Eden Landscaping Group",
    date: "Oct 22, 2023 \u2022 09:15 AM",
    amount: "$4,500.00",
    method: "Amex Platinum",
    tags: [
      { label: "Maintenance", style: "bg-secondary-fixed-dim/30 text-on-secondary-container" },
      { label: "Malibu Coastal", style: "bg-primary-fixed-dim/30 text-primary-container" },
    ],
    icon: "park",
    hasReceipt: false,
    receiptNote: "",
    flagged: true,
  },
  {
    vendor: "City Power & Grid",
    date: "Oct 20, 2023 \u2022 11:45 AM",
    amount: "$2,489.55",
    method: "Auto-Pay",
    tags: [
      { label: "Utilities", style: "bg-secondary-fixed-dim/30 text-on-secondary-container" },
      { label: "Aspen Lodge", style: "bg-primary-fixed-dim/30 text-primary-container" },
    ],
    icon: "electric_bolt",
    hasReceipt: true,
    receiptNote: "\u201CHigh seasonal consumption due to pool heating.\u201D",
    flagged: false,
  },
];

export default function LargeTransactionsPage() {
  return (
    <AppLayout>
      <PageHeader
        title="Large Transactions"
        breadcrumb={{ label: "Back to AI Review", href: "/transactions/ai-review" }}
        badge="> $1,000 THRESHOLD"
      />

      <div className="flex gap-6">
        {/* Left Column: Transaction Cards */}
        <div className="w-[700px] space-y-6">
          {transactions.map((tx, i) => (
            <div
              key={i}
              className={`bg-surface-container-lowest rounded-xl p-6 card-shadow transition-transform hover:scale-[1.01] duration-300 ${tx.flagged ? "border-l-4 border-orange-400" : ""}`}
            >
              {/* Top section */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                  <div className="w-14 h-14 bg-surface-container rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-[28px]">
                      {tx.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-[16px] font-semibold text-on-surface">{tx.vendor}</h3>
                    <div className="text-[12px] text-on-surface-variant mt-0.5">{tx.date}</div>
                    <div className="flex gap-2 mt-2">
                      {tx.tags.map((tag, j) => (
                        <span
                          key={j}
                          className={`px-2 py-0.5 text-[11px] font-bold rounded ${tag.style}`}
                        >
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[24px] font-extrabold text-on-surface tracking-tight">
                    {tx.amount}
                  </div>
                  <div className="text-[11px] text-on-surface-variant font-medium mt-1 uppercase tracking-widest">
                    {tx.method}
                  </div>
                </div>
              </div>

              {/* Bottom section */}
              <div className="flex items-end justify-between border-t border-slate-50 pt-4 mt-4">
                <div className="flex items-center gap-3">
                  {tx.hasReceipt ? (
                    <>
                      <div className="w-16 h-20 bg-slate-100 rounded flex items-center justify-center text-slate-300">
                        <span className="material-symbols-outlined text-[32px]">receipt_long</span>
                      </div>
                      <div className="text-[12px] text-on-surface-variant italic max-w-[200px]">
                        {tx.receiptNote}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-20 bg-slate-100 rounded flex items-center justify-center text-slate-300">
                        <span className="material-symbols-outlined text-[32px]">image_not_supported</span>
                      </div>
                      <div className="text-[12px] text-error font-medium flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">warning</span>
                        Receipt missing
                      </div>
                    </>
                  )}
                </div>
                <div className="flex gap-3">
                  {tx.flagged ? (
                    <button className="px-4 py-2 text-[13px] font-bold text-orange-600 bg-orange-50 rounded-lg transition-colors flex items-center gap-2">
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        flag
                      </span>
                      Flagged for Review
                    </button>
                  ) : (
                    <button className="px-4 py-2 text-[13px] font-bold text-slate-500 bg-slate-100 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">flag</span>
                      Flag for Review
                    </button>
                  )}
                  <button className="px-4 py-2 text-[13px] font-bold text-white bg-emerald-600 rounded-lg shadow-md shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    Verify and Approve
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Statistics */}
        <div className="w-[432px]">
          <div className="bg-surface-container-lowest rounded-xl p-8 card-shadow sticky top-24">
            <h2 className="text-[20px] font-bold text-on-surface mb-8">Statistics</h2>

            <div className="space-y-8">
              {/* Total Flagged */}
              <div>
                <div className="text-[12px] text-on-surface-variant font-bold uppercase tracking-widest mb-1">
                  Total Flagged
                </div>
                <div className="text-[32px] font-extrabold text-on-surface leading-tight">$15,234.55</div>
              </div>

              {/* Average / Count */}
              <div className="flex justify-between items-center pb-6 border-b border-slate-50">
                <div>
                  <div className="text-[12px] text-on-surface-variant font-bold uppercase tracking-widest mb-1">
                    Average Size
                  </div>
                  <div className="text-[20px] font-bold text-on-surface">$5,078.18</div>
                </div>
                <div className="text-right">
                  <div className="text-[12px] text-on-surface-variant font-bold uppercase tracking-widest mb-1">
                    Count
                  </div>
                  <div className="text-[20px] font-bold text-on-surface">3</div>
                </div>
              </div>

              {/* Chart */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <div className="text-[13px] font-bold text-on-surface">Monthly Comparison</div>
                  <div className="text-[11px] text-emerald-600 font-bold">+12% vs LY</div>
                </div>
                <div className="h-32 flex items-end gap-6 px-4">
                  <div className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-surface-container-high rounded-t-lg transition-all hover:bg-slate-200"
                      style={{ height: "60%" }}
                    />
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase">
                      Last Month
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-primary rounded-t-lg shadow-lg shadow-primary/20 transition-all hover:opacity-90"
                      style={{ height: "85%" }}
                    />
                    <span className="text-[10px] font-bold text-primary uppercase">This Month</span>
                  </div>
                </div>
              </div>

              {/* Export */}
              <div className="pt-6">
                <button className="w-full py-3.5 border-2 border-outline-variant text-on-surface text-[14px] font-bold rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">ios_share</span>
                  Export Flagged Report
                </button>
                <p className="text-[11px] text-center text-on-surface-variant mt-4 leading-relaxed">
                  Exported as a detailed PDF with high-resolution receipt attachments for audit purposes.
                </p>
              </div>
            </div>
          </div>

          {/* Contextual Help */}
          <div className="mt-6 p-6 bg-primary-fixed/30 rounded-xl border border-primary-fixed">
            <div className="flex gap-3">
              <span className="material-symbols-outlined text-primary">info</span>
              <div>
                <div className="text-[13px] font-bold text-on-surface mb-1">Smart Thresholding</div>
                <p className="text-[12px] text-on-surface-variant leading-relaxed">
                  Transactions over $1,000 are automatically held for review based on your
                  &ldquo;High Stewardship&rdquo; security policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
