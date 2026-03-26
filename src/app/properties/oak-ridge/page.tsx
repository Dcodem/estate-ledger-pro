"use client";

import { useState } from "react";
import Link from "next/link";
import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";
import PropertyFiles from "@/components/PropertyFiles";
import type { PropertyFile } from "@/components/PropertyFiles";

const propertyFiles: PropertyFile[] = [
  { id: "or-1", name: "Purchase_Agreement_2022.pdf", type: "pdf", size: "3.8 MB", uploaded: "2022-06-15", category: "Purchase Agreement" },
  { id: "or-2", name: "Homeowners_Insurance_Policy.pdf", type: "pdf", size: "1.4 MB", uploaded: "2024-01-05", category: "Insurance" },
  { id: "or-3", name: "Property_Appraisal_2024.pdf", type: "pdf", size: "4.2 MB", uploaded: "2024-02-20", category: "Appraisal" },
  { id: "or-4", name: "Tax_Assessment_2024.pdf", type: "pdf", size: "680 KB", uploaded: "2024-01-30", category: "Tax Records" },
  { id: "or-5", name: "Pool_Maintenance_Contract.pdf", type: "document", size: "1.1 MB", uploaded: "2024-03-01", category: "Maintenance Contract" },
];

const categoryOptions = [
  "Rental Income", "Maintenance", "Insurance", "Utilities",
  "Capital Improvement", "Contractor", "Office Supplies", "Taxes",
];

const financials = [
  { item: "Rental Income", amount: "$4,500", amountClass: "text-emerald-600", icon: "payments" },
  { item: "Maintenance", amount: "-$320", amountClass: "text-on-surface", icon: "build" },
  { item: "Insurance", amount: "-$180", amountClass: "text-on-surface", icon: "shield" },
  { item: "Taxes", amount: "-$450", amountClass: "text-on-surface", icon: "receipt_long" },
  { item: "Net", amount: "$3,550", amountClass: "text-emerald-600 font-extrabold", icon: "account_balance_wallet", isTotal: true },
];
const txns = [
  { date: "Mar 15", desc: "Lawn Care", cat: "Maintenance", amount: "-$320", amountClass: "text-on-surface" },
  { date: "Mar 14", desc: "Insurance Premium", cat: "Insurance", amount: "-$180", amountClass: "text-on-surface" },
  { date: "Mar 1", desc: "Rent Collection", cat: "Rental Income", amount: "+$4,500", amountClass: "text-emerald-600" },
  { date: "Feb 28", desc: "Property Tax", cat: "Taxes", amount: "-$450", amountClass: "text-on-surface" },
];

export default function OakRidgePage() {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState(txns.map((t) => t.cat));
  const [editState, setEditState] = useState<"idle" | "loading" | "done">("idle");
  const [financialsState, setFinancialsState] = useState<"idle" | "loading" | "done">("idle");
  const [addTxnState, setAddTxnState] = useState<"idle" | "loading" | "done">("idle");
  const [modalSaved, setModalSaved] = useState(false);

  return (
    <AppLayout>
      <PageHeader
        title="Oak Ridge Estate"
        subtitle="North Highlands"
        breadcrumb={{ label: "Back to Properties", href: "/properties" }}
        actions={
          <div className="flex items-center gap-3">
            <button
              onClick={() => { if (editState !== "idle") return; setEditState("loading"); setTimeout(() => { setEditState("done"); setTimeout(() => setEditState("idle"), 2000); }, 1500); }}
              disabled={editState !== "idle"}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all ${editState === "done" ? "bg-emerald-500 text-white" : editState === "loading" ? "bg-surface-container-high text-on-surface-variant cursor-wait" : "bg-surface-container-lowest border border-outline-variant/20 text-on-surface hover:shadow-md"}`}
            >
              <span className="material-symbols-outlined text-[18px]">{editState === "done" ? "check" : editState === "loading" ? "hourglass_top" : "edit"}</span>
              {editState === "done" ? "Saved!" : editState === "loading" ? "Saving..." : "Edit Details"}
            </button>
            <button
              onClick={() => { if (financialsState !== "idle") return; setFinancialsState("loading"); setTimeout(() => { setFinancialsState("done"); setTimeout(() => setFinancialsState("idle"), 2000); }, 1500); }}
              disabled={financialsState !== "idle"}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all ${financialsState === "done" ? "bg-emerald-500 text-white" : financialsState === "loading" ? "bg-primary/70 text-white cursor-wait" : "bg-primary text-on-primary hover:shadow-md"}`}
            >
              <span className="material-symbols-outlined text-[18px]">{financialsState === "done" ? "check" : financialsState === "loading" ? "hourglass_top" : "bar_chart"}</span>
              {financialsState === "done" ? "Report Ready!" : financialsState === "loading" ? "Loading..." : "View Financials"}
            </button>
          </div>
        }
      />

      {/* Hero Image */}
      <div className="h-64 relative rounded-2xl overflow-hidden shadow-[0_12px_32px_rgba(20,27,43,0.04)]">
        <img
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBM1qBF_qesiMI7AFje_F_zGzA-k2Ca2G18TnBV3tnFQGDDBN9AT_pM5WG9Zz4Zos6PntT8CmCxH76DuUHvpl2x6eb49ba6j6VW8HxoJeLD4AqHCg8QRdF0zy10Bwzn0vVswIgDDAYkwyVNCqcimb72A8EJkDSGLl6cDxkqp8asytmIxMUxP6hfSTBCTa2GXC8vQN6YvwXMc1hLkfRVkIRqeukyzKhkntjzCXK7T2maMY7Oeex4jAwOQTaSHJFhGA5_s_E1CqFStuOw"
          alt="Oak Ridge Estate"
        />
        <div className="absolute top-4 right-4 px-3 py-1 bg-green-100/90 backdrop-blur text-green-700 text-[11px] font-bold rounded-full uppercase tracking-wider">
          Active
        </div>
      </div>

      {/* Property Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface-container-low p-4 rounded-xl">
          <p className="text-[10px] text-on-surface-variant font-semibold uppercase tracking-wider">Occupancy</p>
          <p className="text-2xl font-bold text-on-surface mt-1">100%</p>
          <p className="text-[10px] text-on-surface-variant mt-0.5">Single unit</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-xl">
          <p className="text-[10px] text-on-surface-variant font-semibold uppercase tracking-wider">Monthly Yield</p>
          <p className="text-2xl font-bold text-primary mt-1">$4,500</p>
          <p className="text-[10px] text-on-surface-variant mt-0.5">Average/Mo</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-xl">
          <p className="text-[10px] text-on-surface-variant font-semibold uppercase tracking-wider">Cap Rate</p>
          <p className="text-2xl font-bold text-on-surface mt-1">6.8%</p>
          <p className="text-[10px] text-on-surface-variant mt-0.5">Annualized</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-xl">
          <p className="text-[10px] text-on-surface-variant font-semibold uppercase tracking-wider">Property Manager</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-400 flex items-center justify-center text-[10px] font-bold text-white">RB</div>
            <span className="text-sm font-medium text-on-surface">R. Barrett</span>
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div>
        <h2 className="text-xl font-bold mb-6">Financial Summary</h2>
        <div className="bg-surface-container-lowest rounded-xl shadow-[0_12px_32px_rgba(20,27,43,0.04)] overflow-hidden border border-outline-variant/10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-8 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Item</th>
                <th className="px-8 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {financials.map((f, i) => (
                <tr key={i} className={`hover:bg-slate-50/50 transition-all ${f.isTotal ? "bg-surface-container-low/30" : ""}`}>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[18px] text-on-surface-variant">{f.icon}</span>
                      <span className={`text-sm ${f.isTotal ? "font-bold text-on-surface" : "text-on-surface-variant"}`}>{f.item}</span>
                    </div>
                  </td>
                  <td className={`px-8 py-5 text-right text-sm font-bold ${f.amountClass}`} style={{ fontFamily: "'Manrope', sans-serif" }}>
                    {f.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <h2 className="text-xl font-bold mb-6">Recent Transactions</h2>
        <div className="bg-surface-container-lowest rounded-xl shadow-[0_12px_32px_rgba(20,27,43,0.04)] overflow-hidden border border-outline-variant/10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-8 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Date</th>
                <th className="px-8 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Description</th>
                <th className="px-8 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Category</th>
                <th className="px-8 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {txns.map((t, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-all cursor-pointer group/row" onClick={() => window.location.href = `/transactions?property=oak-ridge`}>
                  <td className="px-8 py-5 text-sm text-on-surface-variant font-medium">{t.date}</td>
                  <td className="px-8 py-5 text-sm font-bold text-on-surface">
                    <span className="flex items-center gap-2">
                      {t.desc}
                      <span className="material-symbols-outlined text-[14px] text-primary opacity-0 group-hover/row:opacity-100 transition-opacity">open_in_new</span>
                    </span>
                  </td>
                  <td className="px-8 py-5" onClick={(e) => e.stopPropagation()}>
                    <div className="group/cat flex items-center gap-1.5">
                      <span className={`px-3 py-1 text-[11px] font-bold rounded-full uppercase tracking-wide ${
                        categories[i] === "Rental Income" ? "bg-emerald-50 text-emerald-600"
                        : categories[i] === "Maintenance" ? "bg-blue-50 text-blue-600"
                        : categories[i] === "Insurance" ? "bg-slate-100 text-slate-600"
                        : "bg-amber-50 text-amber-700"
                      }`}>
                        {categories[i]}
                      </span>
                      <button
                        onClick={() => { setEditingIndex(i); setSelectedCategory(categories[i]); }}
                        className="opacity-0 group-hover/cat:opacity-100 transition-opacity p-0.5 rounded hover:bg-surface-container-low"
                      >
                        <span className="material-symbols-outlined text-[14px] text-on-surface-variant">edit</span>
                      </button>
                    </div>
                  </td>
                  <td className={`px-8 py-5 text-right font-bold text-sm ${t.amountClass}`} style={{ fontFamily: "'Manrope', sans-serif" }}>
                    {t.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-right">
          <Link href="/transactions" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            View All Transactions
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>
      </div>

      {/* Add Transaction */}
      <div>
        <button
          onClick={() => { if (addTxnState !== "idle") return; setAddTxnState("loading"); setTimeout(() => { setAddTxnState("done"); setTimeout(() => setAddTxnState("idle"), 2000); }, 1500); }}
          disabled={addTxnState !== "idle"}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all ${addTxnState === "done" ? "bg-emerald-500 text-white" : addTxnState === "loading" ? "bg-surface-container-high text-on-surface-variant cursor-wait" : "bg-surface-container-lowest border border-outline-variant/20 text-on-surface hover:shadow-md"}`}
        >
          <span className="material-symbols-outlined text-[18px]">{addTxnState === "done" ? "check" : addTxnState === "loading" ? "hourglass_top" : "add"}</span>
          {addTxnState === "done" ? "Added!" : addTxnState === "loading" ? "Adding..." : "Add Transaction"}
        </button>
      </div>

      {/* Property Documents */}
      <PropertyFiles initialFiles={propertyFiles} />

      {/* Category Reassignment Modal */}
      {editingIndex !== null && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={() => setEditingIndex(null)}>
          <div className="bg-surface-container-lowest rounded-2xl p-8 w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-6">Reassign Category</h3>
            <label className="block text-sm font-medium text-on-surface-variant mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant/20 rounded-xl text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setEditingIndex(null)}
                className="px-5 py-2.5 border border-outline-variant/20 rounded-xl text-sm font-semibold text-on-surface hover:bg-surface-container-low transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setCategories((prev) => prev.map((c, idx) => idx === editingIndex ? selectedCategory : c));
                  setModalSaved(true);
                  setTimeout(() => { setModalSaved(false); setEditingIndex(null); }, 800);
                }}
                disabled={modalSaved}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all ${modalSaved ? "bg-emerald-500 text-white" : "bg-primary text-on-primary hover:shadow-md"}`}
              >
                {modalSaved ? "Saved!" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
