"use client";

import { use, useState } from "react";
import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { getTransactionById, categoryOptions, propertyNames } from "@/lib/transactions";

interface SplitLine {
  id: number;
  category: string;
  property: string;
  amount: string;
  note: string;
}

export default function SplitTransactionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const txn = getTransactionById(id);

  const [splitMode, setSplitMode] = useState<"amount" | "percentage">("amount");
  const [lines, setLines] = useState<SplitLine[]>([
    { id: 1, category: txn?.category ?? "Maintenance", property: txn?.property ?? "Downtown Plaza", amount: "", note: "" },
    { id: 2, category: "Maintenance", property: txn?.property ?? "Downtown Plaza", amount: "", note: "" },
  ]);
  const [nextId, setNextId] = useState(3);
  const [saved, setSaved] = useState(false);

  if (!txn) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <span aria-hidden="true" className="material-symbols-outlined text-[48px] text-outline-variant">
            receipt_long
          </span>
          <h2 className="text-xl font-bold text-on-surface">
            Transaction not found
          </h2>
          <Link
            href="/transactions"
            className="mt-4 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-md shadow-primary/20 hover:opacity-90 transition-all"
          >
            Back to Transactions
          </Link>
        </div>
      </AppLayout>
    );
  }

  const totalAmount = parseFloat(txn.amount.replace(/[^0-9.-]/g, ""));
  const absTotal = Math.abs(totalAmount);

  const allocatedTotal = lines.reduce((sum, l) => {
    const val = parseFloat(l.amount) || 0;
    return sum + val;
  }, 0);

  const remaining =
    splitMode === "amount"
      ? absTotal - allocatedTotal
      : 100 - allocatedTotal;

  const isBalanced =
    splitMode === "amount"
      ? Math.abs(remaining) < 0.01
      : Math.abs(remaining) < 0.1;

  const addLine = () => {
    setLines((prev) => [
      ...prev,
      { id: nextId, category: "Maintenance", property: txn.property, amount: "", note: "" },
    ]);
    setNextId((n) => n + 1);
  };

  const removeLine = (lineId: number) => {
    if (lines.length <= 2) return;
    setLines((prev) => prev.filter((l) => l.id !== lineId));
  };

  const updateLine = (lineId: number, field: keyof SplitLine, value: string) => {
    setLines((prev) =>
      prev.map((l) => (l.id === lineId ? { ...l, [field]: value } : l))
    );
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AppLayout>
      <PageHeader
        title="Split Transaction"
        subtitle={`${txn.title} — ${txn.amount}`}
        breadcrumb={{ label: txn.title, href: `/transactions/${id}` }}
        actions={
          <div className="flex items-center gap-3">
            <Link
              href={`/transactions/${id}`}
              className="px-4 py-2.5 border border-outline-variant/20 rounded-xl text-sm font-semibold text-on-surface hover:bg-surface-container-low transition-all"
            >
              Cancel
            </Link>
            <button
              onClick={handleSave}
              disabled={!isBalanced}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all ${
                saved
                  ? "bg-emerald-500 text-white shadow-emerald-500/20"
                  : isBalanced
                  ? "bg-primary text-white shadow-primary/20 hover:opacity-90"
                  : "bg-outline-variant/30 text-on-surface-variant cursor-not-allowed shadow-none"
              }`}
            >
              <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
                {saved ? "check" : "save"}
              </span>
              {saved ? "Saved!" : "Save Split"}
            </button>
          </div>
        }
      />

      <div className="max-w-4xl space-y-6">
        {/* Original Transaction Summary */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 p-6 flex items-center gap-6">
          <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0">
            <span aria-hidden="true" className="material-symbols-outlined text-primary text-xl">
              receipt_long
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-on-surface">{txn.title}</p>
            <p className="text-xs text-on-surface-variant mt-0.5">
              {txn.date} &middot; {txn.property} &middot; {txn.bankAccount}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p
              className="text-2xl font-extrabold text-on-surface"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              {txn.amount}
            </p>
            <p className="text-[11px] text-on-surface-variant uppercase tracking-wider font-bold">
              Total Amount
            </p>
          </div>
        </div>

        {/* Split Mode Toggle */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-on-surface-variant">
            Split by:
          </span>
          <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-xl">
            <button
              onClick={() => setSplitMode("amount")}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                splitMode === "amount"
                  ? "bg-white shadow-sm text-primary"
                  : "text-on-surface-variant hover:bg-white/50"
              }`}
            >
              Dollar Amount
            </button>
            <button
              onClick={() => setSplitMode("percentage")}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                splitMode === "percentage"
                  ? "bg-white shadow-sm text-primary"
                  : "text-on-surface-variant hover:bg-white/50"
              }`}
            >
              Percentage
            </button>
          </div>
        </div>

        {/* Split Lines */}
        <div className="space-y-3">
          {lines.map((line, index) => (
            <div
              key={line.id}
              className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                  Split {index + 1}
                </span>
                {lines.length > 2 && (
                  <button
                    onClick={() => removeLine(line.id)}
                    className="w-7 h-7 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-red-50 hover:text-red-600 transition-all"
                  >
                    <span aria-hidden="true" className="material-symbols-outlined text-[16px]">
                      close
                    </span>
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wide">
                    {splitMode === "amount" ? "Amount ($)" : "Percentage (%)"}
                  </label>
                  <input
                    type="number"
                    step={splitMode === "amount" ? "0.01" : "1"}
                    min="0"
                    value={line.amount}
                    onChange={(e) => updateLine(line.id, "amount", e.target.value)}
                    placeholder={splitMode === "amount" ? "0.00" : "0"}
                    className="w-full bg-surface-container-high border-none rounded-lg px-4 py-2.5 text-sm font-bold focus:bg-white focus:ring-1 focus:ring-primary/40 transition-all outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wide">
                    Category
                  </label>
                  <select
                    value={line.category}
                    onChange={(e) => updateLine(line.id, "category", e.target.value)}
                    className="w-full bg-surface-container-high border-none rounded-lg px-4 py-2.5 text-sm focus:bg-white focus:ring-1 focus:ring-primary/40 transition-all outline-none appearance-none cursor-pointer"
                  >
                    {categoryOptions.map((opt) => (
                      <option key={opt.label} value={opt.label}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wide">
                    Property
                  </label>
                  <select
                    value={line.property}
                    onChange={(e) => updateLine(line.id, "property", e.target.value)}
                    className="w-full bg-surface-container-high border-none rounded-lg px-4 py-2.5 text-sm focus:bg-white focus:ring-1 focus:ring-primary/40 transition-all outline-none appearance-none cursor-pointer"
                  >
                    {propertyNames.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wide">
                    Note (optional)
                  </label>
                  <input
                    type="text"
                    value={line.note}
                    onChange={(e) => updateLine(line.id, "note", e.target.value)}
                    placeholder="e.g. Lobby repairs"
                    className="w-full bg-surface-container-high border-none rounded-lg px-4 py-2.5 text-sm focus:bg-white focus:ring-1 focus:ring-primary/40 transition-all outline-none"
                  />
                </div>
              </div>
              {splitMode === "percentage" && line.amount && (
                <p className="text-xs text-on-surface-variant mt-3">
                  = ${((parseFloat(line.amount) / 100) * absTotal).toFixed(2)}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Add Line */}
        <button
          onClick={addLine}
          className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-outline-variant/30 rounded-xl text-sm font-bold text-on-surface-variant hover:border-primary/30 hover:text-primary transition-all"
        >
          <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
            add
          </span>
          Add Another Split
        </button>

        {/* Balance Summary */}
        <div
          className={`rounded-2xl p-6 flex items-center justify-between ${
            isBalanced
              ? "bg-emerald-50 border border-emerald-200/50"
              : "bg-amber-50 border border-amber-200/50"
          }`}
        >
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className={`material-symbols-outlined ${
                isBalanced ? "text-emerald-600" : "text-amber-600"
              }`}
            >
              {isBalanced ? "check_circle" : "warning"}
            </span>
            <div>
              <p
                className={`text-sm font-bold ${
                  isBalanced ? "text-emerald-800" : "text-amber-800"
                }`}
              >
                {isBalanced
                  ? "Balanced! All amounts are allocated."
                  : `${splitMode === "amount" ? "$" : ""}${Math.abs(remaining).toFixed(2)}${splitMode === "percentage" ? "%" : ""} remaining`}
              </p>
              <p
                className={`text-xs mt-0.5 ${
                  isBalanced ? "text-emerald-600" : "text-amber-600"
                }`}
              >
                {isBalanced
                  ? `${lines.length} splits totaling ${txn.amount}`
                  : `Allocate the remaining ${splitMode === "amount" ? "amount" : "percentage"} to save`}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p
              className={`text-lg font-extrabold ${
                isBalanced ? "text-emerald-700" : "text-amber-700"
              }`}
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              {splitMode === "amount"
                ? `$${allocatedTotal.toFixed(2)}`
                : `${allocatedTotal.toFixed(1)}%`}
            </p>
            <p
              className={`text-[11px] uppercase tracking-wider font-bold ${
                isBalanced ? "text-emerald-600" : "text-amber-600"
              }`}
            >
              of {splitMode === "amount" ? txn.amount : "100%"}
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
