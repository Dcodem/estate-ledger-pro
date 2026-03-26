"use client";

import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SkeletonPulse, TableSkeleton } from "@/components/LoadingSkeleton";
import { allTransactions, categoryOptions } from "@/lib/transactions";

const ITEMS_PER_PAGE = 5;
const propertyOptions = ["All Properties", "Main St. Loft", "Oak Ridge Estate", "Downtown Plaza"];
const monthOptions = ["All Months", "March 2024", "February 2024", "January 2024"];
const timePeriods = ["Last 30 Days", "Last 90 Days", "Year to Date", "2023", "All Time"];

const propertySlugMap: Record<string, string> = {
  "main-st-loft": "Main St. Loft",
  "oak-ridge": "Oak Ridge Estate",
  "downtown-plaza": "Downtown Plaza",
};

function TransactionsContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"All" | "Income" | "Expenses">("All");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [propertyFilter, setPropertyFilter] = useState("All Properties");
  const [monthFilter, setMonthFilter] = useState("All Months");
  const [timePeriod, setTimePeriod] = useState("Last 30 Days");
  const [selectedTransaction, setSelectedTransaction] = useState<typeof allTransactions[0] | null>(null);
  const [showRecategorize, setShowRecategorize] = useState(false);
  const [tempCategory, setTempCategory] = useState<{ label: string; catClass: string } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const slug = searchParams.get("property");
    if (slug && propertySlugMap[slug]) {
      setPropertyFilter(propertySlugMap[slug]);
      setShowFilters(true);
    }
  }, [searchParams]);

  const hasActiveFilters = filter !== "All" || propertyFilter !== "All Properties" || monthFilter !== "All Months" || timePeriod !== "Last 30 Days";

  const resetAllFilters = () => {
    setFilter("All");
    setPropertyFilter("All Properties");
    setMonthFilter("All Months");
    setTimePeriod("Last 30 Days");
    setPage(1);
    setShowFilters(false);
  };

  const filtered = allTransactions.filter((t) => {
    if (filter === "Income") return t.amount.startsWith("+");
    if (filter === "Expenses") return t.amount.startsWith("-");
    return true;
  }).filter((t) => {
    if (propertyFilter !== "All Properties") return t.property === propertyFilter;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const needsReview = allTransactions.filter((t) => t.highlight).length;

  if (loading) {
    return (
      <AppLayout>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <SkeletonPulse className="w-48 h-8" />
              <SkeletonPulse className="w-36 h-4" />
            </div>
            <SkeletonPulse className="w-24 h-10 rounded-lg" />
          </div>
          <SkeletonPulse className="w-full h-12 rounded-xl" />
          <div className="flex items-center gap-3">
            <SkeletonPulse className="w-24 h-10 rounded-xl" />
            <SkeletonPulse className="w-16 h-8 rounded-full" />
            <SkeletonPulse className="w-16 h-8 rounded-full" />
            <SkeletonPulse className="w-20 h-8 rounded-full" />
          </div>
          <TableSkeleton rows={5} />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {/* Page Header */}
      <PageHeader
        title="Transactions"
        subtitle="Last synced 12 minutes ago"
        actions={
          <Link href="/reports/exports" className="flex items-center gap-2 px-4 py-2 bg-white border border-outline-variant/30 rounded-lg text-sm font-medium text-on-surface hover:bg-slate-50 transition-all shadow-sm">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Export
          </Link>
        }
      />

      {/* Alert Banner */}
      {needsReview > 0 && (
        <div className="bg-[#FEF3C7] text-[#92400E] p-4 rounded-xl flex items-center justify-between shadow-sm border border-[#FDE68A]/50">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[20px]">warning</span>
            <span className="text-sm font-medium tracking-tight">
              {needsReview} transaction{needsReview > 1 ? "s" : ""} need{needsReview === 1 ? "s" : ""} review — AI couldn&apos;t confidently categorize {needsReview === 1 ? "this item" : "these items"}
            </span>
          </div>
          <Link
            href="/transactions/ai-review"
            className="bg-white/80 hover:bg-white px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
          >
            Review Now
          </Link>
        </div>
      )}

      {/* Filters & Actions */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 border border-outline-variant/20 rounded-xl text-sm font-semibold shadow-sm hover:shadow-md transition-all ${
              showFilters ? "bg-primary text-white" : "bg-surface-container-lowest text-on-surface"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            Filters
          </button>
          <div className="h-6 w-px bg-outline-variant/30" />
          <div className="flex gap-2">
            {(["All", "Income", "Expenses"] as const).map((f) => (
              <button
                key={f}
                onClick={() => { setFilter(f); setPage(1); }}
                className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all ${
                  filter === f
                    ? "bg-primary/5 text-primary border border-primary/10"
                    : "text-on-surface-variant font-semibold hover:bg-slate-100 cursor-pointer"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          {hasActiveFilters && (
            <>
              <div className="h-6 w-px bg-outline-variant/30" />
              <button
                onClick={resetAllFilters}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 rounded-full transition-all"
              >
                <span className="material-symbols-outlined text-[14px]">close</span>
                Reset All
              </button>
            </>
          )}
        </div>
        <div className="relative">
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="appearance-none bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer"
          >
            {timePeriods.map((tp) => (
              <option key={tp}>{tp}</option>
            ))}
          </select>
          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[18px]">expand_more</span>
        </div>
      </div>

      {/* Filter Panel (collapsible with animation) */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          showFilters ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-surface-container-lowest rounded-xl p-6 card-shadow border border-outline-variant/10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest mb-2 block">Property</label>
            <select
              value={propertyFilter}
              onChange={(e) => { setPropertyFilter(e.target.value); setPage(1); }}
              className="w-full appearance-none bg-surface-container-low border-none rounded-xl py-3 pl-4 pr-10 text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none"
            >
              {propertyOptions.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest mb-2 block">Month</label>
            <select
              value={monthFilter}
              onChange={(e) => { setMonthFilter(e.target.value); setPage(1); }}
              className="w-full appearance-none bg-surface-container-low border-none rounded-xl py-3 pl-4 pr-10 text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none"
            >
              {monthOptions.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-surface-container-lowest rounded-2xl card-shadow overflow-hidden border border-outline-variant/10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low/50">
              <th className="px-8 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">
                Date
              </th>
              <th className="px-8 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">
                Description
              </th>
              <th className="px-8 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest text-center">
                Category
              </th>
              <th className="px-8 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">
                Property
              </th>
              <th className="px-8 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest text-right">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {paginated.map((t, i) => (
              <tr
                key={i}
                onClick={() => { setSelectedTransaction(t); setShowRecategorize(false); setTempCategory(null); }}
                className={`hover:bg-slate-50/50 transition-all cursor-pointer group ${
                  t.highlight ? "bg-amber-50/20" : ""
                }`}
              >
                <td className="px-8 py-5 text-sm text-on-surface-variant font-medium">
                  {t.date}
                </td>
                <td className="px-8 py-5">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                      {t.title}
                    </span>
                    <span className="text-[11px] text-on-surface-variant">
                      {t.subtitle}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-5 text-center">
                  <span
                    className={`px-3 py-1 ${t.catClass} text-[11px] font-bold rounded-full uppercase tracking-wide inline-flex items-center gap-1`}
                  >
                    {t.icon && (
                      <span className="material-symbols-outlined text-[14px]">
                        {t.icon}
                      </span>
                    )}
                    {t.category}
                  </span>
                </td>
                <td className="px-8 py-5 text-sm text-on-surface-variant font-medium">
                  {t.property}
                </td>
                <td
                  className={`px-8 py-5 text-right font-bold text-sm ${t.amountClass}`}
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {t.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-8 py-6 bg-surface-container-low/30 flex items-center justify-between border-t border-slate-50">
          <span className="text-xs font-medium text-on-surface-variant">
            Showing <span className="text-on-surface font-bold">{(page - 1) * ITEMS_PER_PAGE + 1}-{Math.min(page * ITEMS_PER_PAGE, filtered.length)}</span> of {filtered.length} transactions
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 transition-all disabled:opacity-30"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                    page === p
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "text-on-surface hover:bg-slate-100"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-all disabled:opacity-30"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contextual Insight */}
      <div className="bg-gradient-to-br from-primary to-primary-container p-6 rounded-2xl shadow-xl shadow-primary/10 relative overflow-hidden group">
        <div className="absolute -right-4 -bottom-4 opacity-10 scale-150 group-hover:rotate-12 transition-transform duration-700">
          <span
            className="material-symbols-outlined text-[140px] text-white"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            insights
          </span>
        </div>
        <div className="relative z-10 flex flex-col justify-between h-full">
          <div>
            <span className="text-[10px] font-bold text-white/60 tracking-widest uppercase">
              Smart Categorization
            </span>
            <h3 className="text-xl font-extrabold text-white mt-2 leading-tight">
              AI has automatically classified 92% of your transactions this month.
            </h3>
          </div>
          <div className="mt-8">
            <Link href="/transactions/ai-review" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 px-4 py-2 rounded-lg text-xs font-bold text-white transition-all inline-block">
              Optimization Report
            </Link>
          </div>
        </div>
      </div>
      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setSelectedTransaction(null)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="relative bg-surface-container-lowest rounded-2xl shadow-2xl p-8 w-full max-w-lg mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedTransaction(null)}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-surface-container-low text-on-surface-variant hover:bg-error hover:text-white transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedTransaction.amount.startsWith("+") ? "bg-emerald-100" : "bg-slate-100"}`}>
                <span className={`material-symbols-outlined text-xl ${selectedTransaction.amount.startsWith("+") ? "text-emerald-600" : "text-slate-600"}`}>
                  {selectedTransaction.amount.startsWith("+") ? "arrow_downward" : "arrow_upward"}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-on-surface">{selectedTransaction.title}</h3>
                <p className="text-sm text-on-surface-variant">{selectedTransaction.subtitle}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-sm text-on-surface-variant font-medium">Amount</span>
                <span className={`text-lg font-bold ${selectedTransaction.amountClass}`} style={{ fontFamily: "'Manrope', sans-serif" }}>
                  {selectedTransaction.amount}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-sm text-on-surface-variant font-medium">Date</span>
                <span className="text-sm font-semibold text-on-surface">{selectedTransaction.date}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-sm text-on-surface-variant font-medium">Category</span>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 ${tempCategory?.catClass ?? selectedTransaction.catClass} text-[11px] font-bold rounded-full uppercase tracking-wide`}>
                    {tempCategory?.label ?? selectedTransaction.category}
                  </span>
                  <button
                    onClick={() => setShowRecategorize(!showRecategorize)}
                    className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                  >
                    <span className="material-symbols-outlined text-[14px]">edit</span>
                  </button>
                </div>
              </div>

              {/* Inline Recategorize */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showRecategorize ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="pb-3 border-b border-slate-100">
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">Reassign Category</p>
                  <div className="flex flex-wrap gap-1.5">
                    {categoryOptions.map((opt) => {
                      const active = (tempCategory?.label ?? selectedTransaction.category) === opt.label;
                      return (
                        <button
                          key={opt.label}
                          onClick={() => { setTempCategory({ label: opt.label, catClass: opt.catClass }); setShowRecategorize(false); }}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${active ? "ring-2 ring-primary ring-offset-1 " + opt.catClass : opt.catClass + " hover:ring-1 hover:ring-primary/30"}`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-sm text-on-surface-variant font-medium">Property</span>
                <span className="text-sm font-semibold text-on-surface">{selectedTransaction.property}</span>
              </div>
            </div>

            {selectedTransaction.highlight && !tempCategory && (
              <div className="mt-6 bg-amber-50 border border-amber-200/50 rounded-xl p-4 flex items-start gap-3">
                <span className="material-symbols-outlined text-amber-600 text-xl">psychology</span>
                <div>
                  <p className="text-sm font-bold text-amber-800">Needs Review</p>
                  <p className="text-xs text-amber-700 mt-0.5">AI couldn&apos;t confidently categorize this transaction. Use the edit button above to assign a category.</p>
                </div>
              </div>
            )}

            {tempCategory && (
              <div className="mt-6 bg-emerald-50 border border-emerald-200/50 rounded-xl p-4 flex items-start gap-3">
                <span className="material-symbols-outlined text-emerald-600 text-xl">check_circle</span>
                <div>
                  <p className="text-sm font-bold text-emerald-800">Recategorized</p>
                  <p className="text-xs text-emerald-700 mt-0.5">Changed to &quot;{tempCategory.label}&quot;. Save on the detail page to persist.</p>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-between items-center">
              <Link
                href={`/transactions/${selectedTransaction.id}`}
                className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
              >
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                View Full Details
              </Link>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-on-surface-variant hover:bg-surface-container-low transition-all"
                >
                  Close
                </button>
                {selectedTransaction.highlight && !tempCategory && (
                  <Link
                    href="/transactions/ai-review"
                    className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold shadow-md shadow-primary/20 hover:opacity-90 transition-all"
                  >
                    AI Review
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}

export default function TransactionsPage() {
  return (
    <Suspense>
      <TransactionsContent />
    </Suspense>
  );
}
