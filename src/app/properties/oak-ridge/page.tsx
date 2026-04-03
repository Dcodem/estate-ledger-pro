"use client";

import { useState } from "react";
import Link from "next/link";
import NumberFlow from "@number-flow/react";
import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";
import PropertyFiles from "@/components/PropertyFiles";
import PropertySummary from "@/components/PropertySummary";
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
  { item: "Rental Income", amount: "$4,500", amountClass: "text-emerald-700", icon: "payments" },
  { item: "Maintenance", amount: "-$320", amountClass: "text-on-surface", icon: "build" },
  { item: "Insurance", amount: "-$180", amountClass: "text-on-surface", icon: "shield" },
  { item: "Taxes", amount: "-$450", amountClass: "text-on-surface", icon: "receipt_long" },
  { item: "Net", amount: "$3,550", amountClass: "text-emerald-700 font-extrabold", icon: "account_balance_wallet", isTotal: true },
];
const tenant = {
  name: "The Morrison Family",
  rent: "$4,500",
  lastPay: "Mar 1",
  onTime: true,
  leaseStart: "Jun 2022",
  leaseEnd: "Jun 2025",
  notes: "Long-term tenant, excellent payment history. Lease renewal discussion scheduled for Apr 2025.",
};
const txns = [
  { date: "Mar 15", desc: "Lawn Care", cat: "Maintenance", amount: "-$320", amountClass: "text-on-surface", txnId: "txn-016" },
  { date: "Mar 14", desc: "Insurance Premium", cat: "Insurance", amount: "-$180", amountClass: "text-on-surface", txnId: "txn-017" },
  { date: "Mar 1", desc: "Rent Collection", cat: "Rental Income", amount: "+$4,500", amountClass: "text-emerald-700", txnId: "txn-018" },
  { date: "Feb 28", desc: "Property Tax", cat: "Taxes", amount: "-$450", amountClass: "text-on-surface", txnId: "txn-019" },
];

export default function OakRidgePage() {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState(txns.map((t) => t.cat));
  const [addTxnState, setAddTxnState] = useState<"idle" | "loading" | "done">("idle");
  const [modalSaved, setModalSaved] = useState(false);

  return (
    <AppLayout>
      <PageHeader
        title="Oak Ridge Estate"
        subtitle="North Highlands"
        breadcrumb={{ label: "Back to Properties", href: "/properties" }}
        actions={
          <Link
            href="/properties/oak-ridge/edit"
            className="flex items-center gap-2 px-4 py-2 border border-outline-variant/20 rounded-xl text-sm font-semibold text-on-surface hover:bg-surface-container-low transition-all"
          >
            <span aria-hidden="true" className="material-symbols-outlined text-[16px] text-primary">edit</span>
            Edit Property
          </Link>
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
          <p className="text-[11px] text-on-surface-variant font-semibold uppercase tracking-wider">Occupancy</p>
          <NumberFlow value={1} format={{ style: "percent" }} className="text-2xl font-bold text-on-surface mt-1 block" />
          <p className="text-[11px] text-on-surface-variant mt-0.5">Single unit</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-xl">
          <p className="text-[11px] text-on-surface-variant font-semibold uppercase tracking-wider">Monthly Yield</p>
          <NumberFlow value={4500} format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }} className="text-2xl font-bold text-primary mt-1 block" />
          <p className="text-[11px] text-on-surface-variant mt-0.5">Average/Mo</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-xl">
          <p className="text-[11px] text-on-surface-variant font-semibold uppercase tracking-wider">Cap Rate</p>
          <NumberFlow value={0.068} format={{ style: "percent", minimumFractionDigits: 1, maximumFractionDigits: 1 }} className="text-2xl font-bold text-on-surface mt-1 block" />
          <p className="text-[11px] text-on-surface-variant mt-0.5">Annualized</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-xl">
          <p className="text-[11px] text-on-surface-variant font-semibold uppercase tracking-wider">Property Manager</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-7 h-7 rounded-full border-2 border-white bg-outline flex items-center justify-center text-[11px] font-bold text-white">RB</div>
            <span className="text-sm font-medium text-on-surface">R. Barrett</span>
          </div>
        </div>
      </div>

      {/* AI Property Summary */}
      <PropertySummary
        propertyName="Oak Ridge Estate"
        location="North Highlands"
        propertyType="residential"
        occupancy={100}
        totalUnits={1}
        monthlyYield="$4,500"
        files={propertyFiles}
      />

      {/* Recent Transactions + Financial Summary — Two Column */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
          <div className="bg-surface-container-lowest rounded-xl shadow-[0_12px_32px_rgba(20,27,43,0.04)] border border-outline-variant/10 divide-y divide-surface-variant">
            {txns.map((t, i) => (
              <div
                key={i}
                className="px-5 py-4 hover:bg-surface-container-low/50 transition-all cursor-pointer group/row"
                onClick={() => window.location.href = `/transactions/${t.txnId}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-bold text-on-surface truncate flex items-center gap-1.5">
                    {t.desc}
                    <span aria-hidden="true" className="material-symbols-outlined text-[14px] text-primary opacity-0 group-hover/row:opacity-100 transition-opacity">open_in_new</span>
                  </p>
                  <span className={`text-sm font-bold whitespace-nowrap ${t.amountClass}`}>
                    {t.amount}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1.5" onClick={(e) => e.stopPropagation()}>
                  <span className="text-[11px] text-on-surface-variant font-medium">{t.date}</span>
                  <span className="text-outline-variant">·</span>
                  <div className="group/cat flex items-center gap-1">
                    <span className={`px-2 py-0.5 text-[11px] font-bold rounded-full uppercase tracking-wide ${
                      categories[i] === "Rental Income" ? "bg-emerald-50 text-emerald-700"
                      : categories[i] === "Maintenance" ? "bg-blue-50 text-blue-600"
                      : categories[i] === "Insurance" ? "bg-surface-container-high text-on-surface-variant"
                      : "bg-amber-50 text-amber-700"
                    }`}>
                      {categories[i]}
                    </span>
                    <button
                      onClick={() => { setEditingIndex(i); setSelectedCategory(categories[i]); }}
                      className="opacity-0 group-hover/cat:opacity-100 transition-opacity p-0.5 rounded hover:bg-surface-container-low"
                    >
                      <span aria-hidden="true" className="material-symbols-outlined text-[12px] text-on-surface-variant">edit</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={() => { if (addTxnState !== "idle") return; setAddTxnState("loading"); setTimeout(() => { setAddTxnState("done"); setTimeout(() => setAddTxnState("idle"), 2000); }, 1500); }}
              disabled={addTxnState !== "idle"}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all ${addTxnState === "done" ? "bg-emerald-500 text-white" : addTxnState === "loading" ? "bg-surface-container-high text-on-surface-variant cursor-wait" : "bg-surface-container-lowest border border-outline-variant/20 text-on-surface hover:shadow-md"}`}
            >
              <span aria-hidden="true" className="material-symbols-outlined text-[18px]">{addTxnState === "done" ? "check" : addTxnState === "loading" ? "hourglass_top" : "add"}</span>
              {addTxnState === "done" ? "Added!" : addTxnState === "loading" ? "Adding..." : "Add Transaction"}
            </button>
            <Link href="/transactions?property=oak-ridge" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
              View All Transactions
              <span aria-hidden="true" className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-3">
          <h2 className="text-xl font-bold mb-6">Financial Summary</h2>
          <div className="bg-surface-container-lowest rounded-xl shadow-[0_12px_32px_rgba(20,27,43,0.04)] overflow-hidden border border-outline-variant/10">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low/50">
                  <th className="px-6 py-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Item</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface">
                {financials.map((f, i) => {
                  const isClickable = f.item === "Rental Income";
                  return (
                  <tr
                    key={i}
                    className={`transition-all ${f.isTotal ? "bg-surface-container-low/30" : ""} ${isClickable ? "hover:bg-surface-container-low/50 cursor-pointer group" : ""}`}
                    onClick={isClickable ? () => window.location.href = `/transactions?property=oak-ridge&category=${encodeURIComponent(f.item)}` : undefined}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span aria-hidden="true" className="material-symbols-outlined text-[18px] text-on-surface-variant">{f.icon}</span>
                        <span className={`text-sm ${f.isTotal ? "font-bold text-on-surface" : "text-on-surface-variant"} ${isClickable ? "group-hover:text-primary transition-colors" : ""}`}>{f.item}</span>
                        {isClickable && <span aria-hidden="true" className="material-symbols-outlined text-[14px] text-primary opacity-0 group-hover:opacity-100 transition-opacity">open_in_new</span>}
                      </div>
                    </td>
                    <td className={`px-6 py-4 text-right text-sm font-bold ${f.amountClass}`}>
                      {f.amount}
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Tenant Details */}
      <div>
        <h2 className="text-xl font-bold mb-6">Tenant Details</h2>
        <div className="bg-surface-container-lowest rounded-xl shadow-[0_12px_32px_rgba(20,27,43,0.04)] border border-outline-variant/10 p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span aria-hidden="true" className="material-symbols-outlined text-primary text-[24px]">person</span>
            </div>
            <div>
              <p className="text-lg font-bold text-on-surface">{tenant.name}</p>
              <p className="text-sm text-on-surface-variant">Single-family rental tenant</p>
            </div>
            <div className="ml-auto">
              {tenant.onTime ? (
                <span className="px-3 py-1 bg-green-100 text-green-700 text-[11px] font-bold rounded-full uppercase tracking-wide">On Time</span>
              ) : (
                <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[11px] font-bold rounded-full uppercase tracking-wide">Late</span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-[11px] text-on-surface-variant font-semibold uppercase tracking-widest mb-1">Monthly Rent</p>
              <p className="text-sm font-bold text-on-surface">{tenant.rent}</p>
            </div>
            <div>
              <p className="text-[11px] text-on-surface-variant font-semibold uppercase tracking-widest mb-1">Last Payment</p>
              <p className="text-sm font-bold text-on-surface">{tenant.lastPay}</p>
            </div>
            <div>
              <p className="text-[11px] text-on-surface-variant font-semibold uppercase tracking-widest mb-1">Lease Period</p>
              <p className="text-sm font-bold text-on-surface">{tenant.leaseStart} — {tenant.leaseEnd}</p>
            </div>
            <div>
              <p className="text-[11px] text-on-surface-variant font-semibold uppercase tracking-widest mb-1">Payment Status</p>
              <p className="text-sm font-bold text-emerald-700">Current</p>
            </div>
          </div>
          {tenant.notes && (
            <div className="mt-6 pt-5 border-t border-outline-variant/10">
              <p className="text-[11px] text-on-surface-variant font-semibold uppercase tracking-widest mb-2">Notes</p>
              <p className="text-sm text-on-surface-variant leading-relaxed">{tenant.notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Property Documents */}
      <PropertyFiles initialFiles={propertyFiles} />

      {/* Category Reassignment Modal */}
      {editingIndex !== null && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setEditingIndex(null)}>
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
