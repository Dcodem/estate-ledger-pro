"use client";

import { use, useState, useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";
import { SkeletonPulse } from "@/components/LoadingSkeleton";
import Link from "next/link";
import { getTransactionById, categoryOptions } from "@/lib/transactions";

export default function TransactionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const txn = getTransactionById(id);

  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(txn?.category ?? "");
  const [catClass, setCatClass] = useState(txn?.catClass ?? "");
  const [notes, setNotes] = useState("");
  const [showRecategorize, setShowRecategorize] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleRecategorize = (label: string, cls: string) => {
    setCategory(label);
    setCatClass(cls);
    setShowRecategorize(false);
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!txn) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <span className="material-symbols-outlined text-[48px] text-slate-300">receipt_long</span>
          <h2 className="text-xl font-bold text-on-surface">Transaction not found</h2>
          <p className="text-sm text-on-surface-variant">The transaction you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/transactions" className="mt-4 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-md shadow-primary/20 hover:opacity-90 transition-all">
            Back to Transactions
          </Link>
        </div>
      </AppLayout>
    );
  }

  const isIncome = txn.amount.startsWith("+");

  if (loading) {
    return (
      <AppLayout>
        <div className="space-y-8">
          <div className="space-y-2">
            <SkeletonPulse className="w-32 h-4" />
            <SkeletonPulse className="w-56 h-8" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <SkeletonPulse className="w-full h-64 rounded-2xl" />
              <SkeletonPulse className="w-full h-40 rounded-2xl" />
            </div>
            <SkeletonPulse className="w-full h-72 rounded-2xl" />
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <PageHeader
        title={txn.title}
        subtitle={txn.subtitle}
        breadcrumb={{ label: "Transactions", href: "/transactions" }}
        actions={
          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-md shadow-primary/20 hover:opacity-90 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">
                {saved ? "check" : "save"}
              </span>
              {saved ? "Saved" : "Save Changes"}
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Transaction Overview Card */}
          <div className="bg-surface-container-lowest rounded-2xl card-shadow border border-outline-variant/10 overflow-hidden">
            {/* Amount header */}
            <div className={`px-8 py-6 ${isIncome ? "bg-gradient-to-r from-emerald-50 to-emerald-100/50" : "bg-gradient-to-r from-slate-50 to-slate-100/50"}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isIncome ? "bg-emerald-100" : "bg-slate-200"}`}>
                    <span className={`material-symbols-outlined text-2xl ${isIncome ? "text-emerald-600" : "text-slate-600"}`}>
                      {isIncome ? "arrow_downward" : "arrow_upward"}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                      {isIncome ? "Money In" : "Money Out"}
                    </p>
                    <p className={`text-3xl font-extrabold mt-0.5 ${isIncome ? "text-emerald-600" : "text-on-surface"}`} style={{ fontFamily: "'Manrope', sans-serif" }}>
                      {txn.amount}
                    </p>
                  </div>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${isIncome ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"}`}>
                  {isIncome ? "Credit" : "Debit"}
                </span>
              </div>
            </div>

            {/* Detail rows */}
            <div className="px-8 py-6 space-y-0 divide-y divide-slate-100">
              <div className="flex justify-between items-center py-4">
                <span className="text-sm text-on-surface-variant font-medium flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                  Date
                </span>
                <span className="text-sm font-bold text-on-surface">{txn.date}</span>
              </div>

              <div className="flex justify-between items-center py-4">
                <span className="text-sm text-on-surface-variant font-medium flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">apartment</span>
                  Property
                </span>
                <span className="text-sm font-bold text-on-surface">{txn.property}</span>
              </div>

              <div className="flex justify-between items-center py-4">
                <span className="text-sm text-on-surface-variant font-medium flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">label</span>
                  Category
                </span>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 ${catClass} text-[11px] font-bold rounded-full uppercase tracking-wide`}>
                    {category}
                  </span>
                  <button
                    onClick={() => setShowRecategorize(!showRecategorize)}
                    className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                  >
                    <span className="material-symbols-outlined text-[14px]">edit</span>
                    Change
                  </button>
                </div>
              </div>

              {/* Recategorize dropdown */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  showRecategorize ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="py-4">
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-3">Select New Category</p>
                  <div className="flex flex-wrap gap-2">
                    {categoryOptions.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => handleRecategorize(opt.label, opt.catClass)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                          category === opt.label
                            ? "ring-2 ring-primary ring-offset-2 " + opt.catClass
                            : opt.catClass + " hover:ring-1 hover:ring-primary/30"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center py-4">
                <span className="text-sm text-on-surface-variant font-medium flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">tag</span>
                  Reference
                </span>
                <span className="text-sm font-mono text-on-surface-variant">{txn.id.toUpperCase()}</span>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="bg-surface-container-lowest rounded-2xl card-shadow border border-outline-variant/10 p-8">
            <h3 className="text-sm font-bold text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">sticky_note_2</span>
              Notes
            </h3>
            <textarea
              value={notes}
              onChange={(e) => { setNotes(e.target.value); setSaved(false); }}
              placeholder="Add notes about this transaction..."
              className="w-full h-28 bg-surface-container-low rounded-xl px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary/20 outline-none resize-none"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-surface-container-lowest rounded-2xl card-shadow border border-outline-variant/10 p-6">
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button
                onClick={() => setShowRecategorize(true)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-on-surface hover:bg-surface-container-low transition-all"
              >
                <span className="material-symbols-outlined text-[20px] text-primary">category</span>
                Recategorize
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-on-surface hover:bg-surface-container-low transition-all">
                <span className="material-symbols-outlined text-[20px] text-primary">content_copy</span>
                Duplicate Entry
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-on-surface hover:bg-surface-container-low transition-all">
                <span className="material-symbols-outlined text-[20px] text-primary">attach_file</span>
                Attach Receipt
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-on-surface hover:bg-surface-container-low transition-all">
                <span className="material-symbols-outlined text-[20px] text-primary">call_split</span>
                Split Transaction
              </button>
              <div className="border-t border-outline-variant/10 my-2" />
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-all">
                <span className="material-symbols-outlined text-[20px]">delete</span>
                Delete Transaction
              </button>
            </div>
          </div>

          {/* AI Insights */}
          {txn.highlight && (
            <div className="bg-amber-50 border border-amber-200/50 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-amber-600">psychology</span>
                <h3 className="text-sm font-bold text-amber-800">AI Analysis</h3>
              </div>
              <p className="text-xs text-amber-700 leading-relaxed">
                This transaction couldn&apos;t be automatically categorized. The merchant &quot;{txn.title.split(" - ")[0]}&quot; doesn&apos;t match any known patterns. Consider assigning a category manually using the Recategorize action.
              </p>
              <Link
                href="/transactions/ai-review"
                className="mt-4 flex items-center gap-2 text-xs font-bold text-amber-800 hover:underline"
              >
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                View in AI Review
              </Link>
            </div>
          )}

          {/* Audit Trail */}
          <div className="bg-surface-container-lowest rounded-2xl card-shadow border border-outline-variant/10 p-6">
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-4">Audit Trail</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-on-surface">Transaction imported</p>
                  <p className="text-[10px] text-on-surface-variant mt-0.5">{txn.date} via bank sync</p>
                </div>
              </div>
              {txn.highlight && (
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-on-surface">Flagged for review</p>
                    <p className="text-[10px] text-on-surface-variant mt-0.5">{txn.date} — AI confidence below threshold</p>
                  </div>
                </div>
              )}
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-on-surface">Auto-categorized</p>
                  <p className="text-[10px] text-on-surface-variant mt-0.5">{txn.date} — {txn.highlight ? "Low confidence" : "High confidence"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
