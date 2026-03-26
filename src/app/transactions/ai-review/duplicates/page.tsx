"use client";

import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";

const pairs = [
  {
    label: "Pair #1 — High Confidence",
    match: 98,
    level: "high" as const,
    a: { id: "TR-8821", vendor: "L'Avenue Luxury Property Mgmt", date: "Oct 24, 2023", amount: "$12,450.00", icon: "receipt" },
    b: { id: "TR-8822", vendor: "L'Avenue Luxury Property Mgmt", date: "Oct 24, 2023", amount: "$12,450.00", icon: "description" },
  },
  {
    label: "Pair #2 — Medium Confidence",
    match: 74,
    level: "medium" as const,
    a: { id: "", vendor: "Bel Air Gardens & Pool", date: "Nov 02, 2023", amount: "$2,100.00", icon: "" },
    b: { id: "", vendor: "Bel Air Gardens & Pool", date: "Nov 02, 2023", amount: "$2,150.00", icon: "" },
  },
  {
    label: "Pair #3 — Low Confidence",
    match: 42,
    level: "low" as const,
    a: { id: "", vendor: "Aria Private Jets Ltd", date: "Oct 15, 2023", amount: "$45,000.00", icon: "" },
    b: { id: "", vendor: "NetJets Executive", date: "Oct 18, 2023", amount: "$45,000.00", icon: "" },
  },
];

const badgeStyles = {
  high: "bg-green-50 text-green-700",
  medium: "bg-orange-50 text-orange-700",
  low: "bg-slate-100 text-slate-600",
};

const badgeIcons = {
  high: "verified",
  medium: "info",
  low: "help_center",
};

function isHighlighted(pair: (typeof pairs)[number], field: "vendor" | "amount") {
  if (field === "vendor") return pair.a.vendor === pair.b.vendor;
  if (field === "amount") return pair.a.amount === pair.b.amount;
  return false;
}

export default function DuplicatesPage() {
  return (
    <AppLayout>
      <PageHeader
        title="Potential Duplicates"
        breadcrumb={{ label: "Back to AI Review", href: "/transactions/ai-review" }}
      />

      <div className="flex gap-6 items-start">
        {/* LEFT COLUMN: Duplicate Pair Groups */}
        <section className="w-[700px] flex flex-col gap-8">
          {pairs.map((pair, i) => {
            const vendorHighlight = isHighlighted(pair, "vendor");
            const amountHighlight = isHighlighted(pair, "amount");
            const dateHighlight = pair.a.date === pair.b.date;

            return (
              <div
                key={i}
                className="bg-surface-container-lowest rounded-xl p-6 card-shadow border border-outline-variant/20"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold text-on-surface-variant tracking-wider uppercase">
                    {pair.label}
                  </span>
                  <div
                    className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold ${badgeStyles[pair.level]}`}
                  >
                    <span
                      className="material-symbols-outlined text-[14px]"
                      style={pair.level === "high" ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      {badgeIcons[pair.level]}
                    </span>
                    {pair.match}% MATCH
                  </div>
                </div>

                {/* Side-by-side cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[pair.a, pair.b].map((t, j) => (
                    <div key={j} className="p-4 rounded-lg bg-surface-container-low/40 space-y-3">
                      {t.id && (
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-bold text-slate-400">ID: {t.id}</span>
                          {t.icon && (
                            <span className="material-symbols-outlined text-slate-300">{t.icon}</span>
                          )}
                        </div>
                      )}
                      <div>
                        <p className="text-[10px] font-semibold text-on-surface-variant">VENDOR</p>
                        <p
                          className={`text-sm font-bold ${vendorHighlight ? "bg-yellow-100 inline-block px-1" : ""}`}
                        >
                          {t.vendor}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <p className="text-[10px] font-semibold text-on-surface-variant">DATE</p>
                          <p
                            className={`text-sm font-bold ${dateHighlight ? "bg-yellow-100 inline-block px-1" : ""}`}
                          >
                            {t.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-semibold text-on-surface-variant">AMOUNT</p>
                          <p
                            className={`text-sm font-extrabold ${amountHighlight ? "bg-yellow-100 inline-block px-1" : ""}`}
                          >
                            {t.amount}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <button className="px-5 py-2 rounded-lg text-sm font-bold text-on-surface border border-outline-variant hover:bg-surface-container-low transition-colors">
                    Keep Both
                  </button>
                  <button className="flex-1 px-5 py-2 rounded-lg text-sm font-bold text-white bg-primary shadow-sm hover:shadow-primary/20 transition-all">
                    Merge Transactions
                  </button>
                  <button className="px-5 py-2 rounded-lg text-sm font-bold text-error hover:bg-error/5 transition-colors">
                    Mark as Duplicate
                  </button>
                </div>
              </div>
            );
          })}
        </section>

        {/* RIGHT COLUMN: Detection Summary */}
        <aside className="w-[432px] sticky top-24">
          <div className="bg-surface-container-lowest rounded-xl p-8 card-shadow border border-outline-variant/20">
            <h2 className="text-xl font-extrabold mb-6 tracking-tight">Detection Summary</h2>

            <div className="space-y-6 mb-8">
              <div className="flex justify-between items-end pb-4 border-b border-slate-50">
                <span className="text-sm font-medium text-on-surface-variant">Total suspected pairs</span>
                <span className="text-2xl font-black text-on-surface leading-none">3</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-sm font-medium">High confidence (&gt;90%)</span>
                  </div>
                  <span className="text-sm font-bold">1 pair</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-400" />
                    <span className="text-sm font-medium">Medium (60-90%)</span>
                  </div>
                  <span className="text-sm font-bold">1 pair</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-300" />
                    <span className="text-sm font-medium">Low (&lt;60%)</span>
                  </div>
                  <span className="text-sm font-bold">1 pair</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  auto_fix_high
                </span>
                Resolve All High-Confidence
              </button>
              <button className="w-full py-4 border border-outline-variant text-on-surface font-bold rounded-xl hover:bg-surface-container-low active:scale-[0.98] transition-all">
                Ignore All Low-Confidence
              </button>
            </div>

            {/* Architect's Tip */}
            <div className="mt-8 pt-8 border-t border-slate-100 flex items-start gap-4">
              <div className="p-2 bg-primary/5 rounded-lg">
                <span className="material-symbols-outlined text-primary">lightbulb</span>
              </div>
              <div>
                <h3 className="text-sm font-bold mb-1">Architect&apos;s Tip</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Merging transactions will combine notes and attachments. The original entries will be
                  archived for audit compliance.
                </p>
              </div>
            </div>
          </div>

          {/* AI Status Mini-Card */}
          <div className="mt-6 p-4 bg-gradient-to-br from-primary to-primary-container rounded-xl text-white shadow-xl shadow-primary/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  bolt
                </span>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">System Health</p>
                <p className="text-xs font-medium">AI Triage engine is learning from your manual merges.</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </AppLayout>
  );
}
