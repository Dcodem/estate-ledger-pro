"use client";

import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";

const reviewQueue = [
  {
    vendor: "Lowe's Home Improvement",
    amount: "$2,450.00",
    matchPercent: 98,
    matchColor: "text-emerald-600",
    dotColor: "bg-success",
    aiNote:
      '"Matches historical patterns for \'Capital Expenditures\' at Sunset Boulevard Estate."',
    category: "Maintenance & Repairs",
    catClass: "bg-violet-50 text-violet-700 border border-violet-100",
    active: true,
    fromTriage: false,
  },
  {
    vendor: "Standard Insurance Co.",
    amount: "$1,120.50",
    matchPercent: 94,
    matchColor: "text-emerald-600",
    dotColor: "bg-success",
    aiNote:
      '"Detected recurring quarterly premium. Recommendation based on \'Portfolio Insurance\' rule."',
    category: "Insurance Expense",
    catClass: "bg-slate-100 text-slate-600 border border-slate-200",
    active: false,
    fromTriage: false,
  },
  {
    vendor: "Precision Pool Service",
    amount: "$175.00",
    matchPercent: 100,
    matchColor: "text-emerald-600",
    dotColor: "bg-success",
    aiNote:
      '"High confidence based on \'Pool\' keyword and vendor name alignment."',
    category: "Utilities & Services",
    catClass: "bg-slate-100 text-slate-600 border border-slate-200",
    active: false,
    fromTriage: false,
  },
  {
    vendor: "Amazon Marketplace",
    amount: "$89.42",
    matchPercent: 62,
    matchColor: "text-amber-600",
    dotColor: "bg-amber-400",
    aiNote:
      '"Ambiguous vendor. Multiple potential properties found. Manual review suggested."',
    category: "Uncategorized",
    catClass: "bg-slate-100 text-slate-600 border border-slate-200",
    active: false,
    fromTriage: true,
  },
];

const similarTransactions = [
  { vendor: "Home Depot", date: "Sept 12, 2023", amount: "$1,890.00" },
  { vendor: "Lowe's Home Improvement", date: "Aug 05, 2023", amount: "$450.00" },
  { vendor: "Ace Hardware", date: "July 20, 2023", amount: "$124.50" },
];

export default function AIReviewPage() {
  const [cardStates, setCardStates] = useState<Record<number, string>>({});
  const [approveState, setApproveState] = useState<"idle" | "loading" | "done">("idle");
  const [modifyState, setModifyState] = useState<"idle" | "loading" | "done">("idle");
  const [rejectState, setRejectState] = useState<"idle" | "loading" | "done">("idle");

  const handleCardAction = (index: number, action: string) => {
    setCardStates((prev) => ({ ...prev, [index]: action }));
    setTimeout(() => setCardStates((prev) => { const next = { ...prev }; delete next[index]; return next; }), 2000);
  };

  const handlePanelAction = (setState: (s: "idle" | "loading" | "done") => void) => {
    setState("loading");
    setTimeout(() => { setState("done"); setTimeout(() => setState("idle"), 2000); }, 1500);
  };

  return (
    <AppLayout>
      {/* Page Header */}
      <PageHeader
        title="AI Review"
        subtitle="Automated analysis of your transactions across 12 connected accounts."
        breadcrumb={{ label: "Back to Transactions", href: "/transactions" }}
      />

      {/* Two Column Layout */}
      <div className="flex gap-10 items-start">
        {/* LEFT: Review Queue */}
        <section className="flex-1 min-w-0 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-on-surface">Review Queue</h3>
            <span className="bg-primary-fixed text-on-primary-fixed-variant px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
              4 Pending
            </span>
          </div>

          {reviewQueue.map((q, i) => (
            <div
              key={i}
              className={`bg-surface-container-lowest p-6 rounded-xl card-shadow ${
                q.active
                  ? "border-l-4 border-primary ring-1 ring-primary/10"
                  : "opacity-80 hover:opacity-100 transition-opacity"
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-lg text-on-surface">
                      {q.vendor}
                    </h4>
                    {q.fromTriage && (
                      <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        <span className="material-symbols-outlined text-[12px]">rule_folder</span>
                        From Triage
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-on-surface-variant italic mt-1">
                    {q.aiNote}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className="text-xl font-extrabold text-on-surface"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    {q.amount}
                  </span>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className={`w-2 h-2 rounded-full ${q.dotColor}`} />
                    <span
                      className={`text-[11px] font-bold ${q.matchColor} uppercase tracking-tighter`}
                    >
                      {q.matchPercent}% Match
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-6">
                <span
                  className={`${q.catClass} px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-tight`}
                >
                  {q.category}
                </span>
                {cardStates[i] ? (
                  <span className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 ${
                    cardStates[i] === "approved" ? "bg-emerald-500 text-white" :
                    cardStates[i] === "rejected" ? "bg-rose-500 text-white" :
                    "bg-amber-500 text-white"
                  }`}>
                    <span className="material-symbols-outlined text-[14px]">check</span>
                    {cardStates[i] === "approved" ? "Approved!" : cardStates[i] === "rejected" ? "Rejected!" : "Modified!"}
                  </span>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCardAction(i, "approved")}
                      className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold hover:bg-emerald-100 transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleCardAction(i, "rejected")}
                      className="px-4 py-2 bg-rose-50 text-rose-700 rounded-lg text-xs font-bold hover:bg-rose-100 transition-colors"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleCardAction(i, "modified")}
                      className="px-4 py-2 bg-white border border-outline-variant text-on-surface-variant rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors"
                    >
                      Modify
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* RIGHT: Transaction Detail Panel */}
        <aside className="w-[432px] sticky top-24 shrink-0">
          <div className="bg-surface-container-lowest p-8 rounded-xl card-shadow ring-1 ring-slate-100">
            {/* Header */}
            <div className="text-center mb-8 pb-8 border-b border-slate-50">
              <div className="w-16 h-16 bg-primary-fixed text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-3xl">store</span>
              </div>
              <h3
                className="text-2xl font-extrabold text-on-surface"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Lowe&apos;s Home Improvement
              </h3>
              <p className="text-[14px] font-medium text-on-surface-variant mt-1">
                Transaction Ref: #TX-90210-44
              </p>
            </div>

            <div className="space-y-6">
              {/* Detail Grid */}
              <div className="grid grid-cols-2 gap-y-6">
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">
                    Date
                  </p>
                  <p className="text-sm font-semibold text-on-surface">
                    Oct 24, 2023
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">
                    Amount
                  </p>
                  <p className="text-lg font-extrabold text-on-surface">$2,450.00</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">
                    Source
                  </p>
                  <p className="text-sm font-semibold text-on-surface">
                    Chase Platinum (***8842)
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">
                    Location
                  </p>
                  <p className="text-sm font-semibold text-on-surface">
                    Beverly Hills, CA
                  </p>
                </div>
              </div>

              {/* AI Recommendation */}
              <div className="pt-6 border-t border-slate-50">
                <p className="text-[11px] uppercase tracking-widest text-on-surface-variant font-bold mb-3">
                  AI Recommendation
                </p>
                <div className="bg-surface-container-low p-4 rounded-xl border-l-2 border-violet-400">
                  <p className="text-[13px] leading-relaxed text-on-surface">
                    This transaction matches 4 previous entries for &quot;HVAC
                    Maintenance&quot; at the Sunset Boulevard Estate. Based on the
                    amount and vendor category, we recommend assigning this to{" "}
                    <strong>Capital Improvements</strong> for tax depreciation purposes.
                  </p>
                </div>
              </div>

              {/* Similar Past Transactions */}
              <div>
                <p className="text-[11px] uppercase tracking-widest text-on-surface-variant font-bold mb-3">
                  Similar Past Transactions
                </p>
                <div className="space-y-3">
                  {similarTransactions.map((s, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center py-2 px-3 bg-slate-50 rounded-lg"
                    >
                      <div>
                        <p className="text-[12px] font-bold text-on-surface">
                          {s.vendor}
                        </p>
                        <p className="text-[10px] text-on-surface-variant">
                          {s.date}
                        </p>
                      </div>
                      <span className="text-[12px] font-bold text-on-surface">
                        {s.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 space-y-3">
                <button
                  onClick={() => { if (approveState !== "idle") return; handlePanelAction(setApproveState); }}
                  disabled={approveState !== "idle"}
                  className={`w-full py-3 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${
                    approveState === "done" ? "bg-emerald-500 text-white shadow-emerald-500/20" :
                    approveState === "loading" ? "bg-primary/70 text-white shadow-violet-100 cursor-wait" :
                    "bg-primary hover:bg-primary-container text-white shadow-violet-100"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {approveState === "done" ? "check" : approveState === "loading" ? "hourglass_top" : "check_circle"}
                  </span>
                  {approveState === "done" ? "Approved!" : approveState === "loading" ? "Approving..." : "Approve Transaction"}
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => { if (modifyState !== "idle") return; handlePanelAction(setModifyState); }}
                    disabled={modifyState !== "idle"}
                    className={`py-3 rounded-xl font-bold text-[13px] transition-all ${
                      modifyState === "done" ? "bg-emerald-500 text-white" :
                      modifyState === "loading" ? "bg-slate-100 text-on-surface-variant cursor-wait" :
                      "bg-white border border-outline-variant text-on-surface hover:bg-slate-50"
                    }`}
                  >
                    {modifyState === "done" ? "Modified!" : modifyState === "loading" ? "Saving..." : "Modify"}
                  </button>
                  <button
                    onClick={() => { if (rejectState !== "idle") return; handlePanelAction(setRejectState); }}
                    disabled={rejectState !== "idle"}
                    className={`py-3 rounded-xl font-bold text-[13px] transition-all ${
                      rejectState === "done" ? "bg-rose-500 text-white" :
                      rejectState === "loading" ? "bg-rose-50 text-rose-400 cursor-wait" :
                      "bg-white border border-error/20 text-error hover:bg-rose-50"
                    }`}
                  >
                    {rejectState === "done" ? "Rejected!" : rejectState === "loading" ? "Rejecting..." : "Reject"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Help text */}
          <div className="mt-4 px-4 text-center">
            <p className="text-[11px] text-on-surface-variant">
              Automated by Estate Ledger AI.{" "}
              <a className="text-primary font-semibold underline" href="/transactions/ai-review/duplicates">
                Learn how analysis works
              </a>
            </p>
          </div>
        </aside>
      </div>
    </AppLayout>
  );
}
