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
  { id: "dp-1", name: "Commercial_Lease_Suite_A.pdf", type: "pdf", size: "3.2 MB", uploaded: "2023-11-01", category: "Lease Agreement" },
  { id: "dp-2", name: "Commercial_Lease_Suite_B.pdf", type: "pdf", size: "2.9 MB", uploaded: "2023-11-01", category: "Lease Agreement" },
  { id: "dp-3", name: "Liability_Insurance_Policy.pdf", type: "pdf", size: "1.8 MB", uploaded: "2024-01-10", category: "Insurance" },
  { id: "dp-4", name: "Zoning_Permit_2024.pdf", type: "document", size: "560 KB", uploaded: "2024-02-15", category: "Zoning Permit" },
  { id: "dp-5", name: "Maintenance_Log_Q1_2024.xlsx", type: "spreadsheet", size: "420 KB", uploaded: "2024-03-20", category: "Maintenance Log" },
  { id: "dp-6", name: "Fire_Safety_Inspection.pdf", type: "pdf", size: "2.1 MB", uploaded: "2024-03-05", category: "Inspection Report" },
  { id: "dp-7", name: "Parking_Lot_Resurfacing_Quote.pdf", type: "pdf", size: "780 KB", uploaded: "2024-03-18", category: "Capital Improvement" },
];

const categoryOptions = [
  "Rental Income", "Maintenance", "Insurance", "Utilities",
  "Capital Improvement", "Contractor", "Office Supplies", "Taxes",
];

const units = [
  { unit: "Unit 1", tenant: "Acme Corp", rent: "$2,200", status: "Current", statusBg: "bg-green-100", statusText: "text-green-700", lastPay: "Mar 15", onTime: true, notes: "3-year commercial lease" },
  { unit: "Unit 2", tenant: "StartupXYZ", rent: "$1,800", status: "Current", statusBg: "bg-green-100", statusText: "text-green-700", lastPay: "Mar 14", onTime: true, notes: "Month-to-month" },
  { unit: "Unit 3", tenant: "\u2014", rent: "\u2014", status: "Vacant", statusBg: "bg-red-100", statusText: "text-red-700", lastPay: "Feb 1", onTime: false, notes: "Listed since Oct 2023" },
  { unit: "Unit 4", tenant: "Legal Associates", rent: "$2,000", status: "Current", statusBg: "bg-green-100", statusText: "text-green-700", lastPay: "Mar 10", onTime: false, notes: "Late payment — 2nd occurrence" },
];
const financials = [
  { item: "Rental Income", amount: "$6,000", amountClass: "text-emerald-700", icon: "payments" },
  { item: "Maintenance", amount: "-$1,200", amountClass: "text-on-surface", icon: "build" },
  { item: "Insurance", amount: "-$280", amountClass: "text-on-surface", icon: "shield" },
  { item: "Utilities", amount: "-$380", amountClass: "text-on-surface", icon: "bolt" },
  { item: "Taxes", amount: "-$620", amountClass: "text-on-surface", icon: "receipt_long" },
  { item: "Net Operating Income", amount: "$3,520", amountClass: "text-emerald-700 font-extrabold", icon: "account_balance_wallet", isTotal: true },
];
const txns = [
  { date: "Mar 15", desc: "Rent - Unit 1", cat: "Rental Income", amount: "+$2,200", amountClass: "text-emerald-700", txnId: "txn-008" },
  { date: "Mar 14", desc: "Rent - Unit 2", cat: "Rental Income", amount: "+$1,800", amountClass: "text-emerald-700", txnId: "txn-021" },
  { date: "Mar 12", desc: "HVAC Repair", cat: "Maintenance", amount: "-$1,200", amountClass: "text-on-surface", txnId: "txn-015" },
  { date: "Mar 10", desc: "Rent - Unit 4", cat: "Rental Income", amount: "+$2,000", amountClass: "text-emerald-700", txnId: "txn-022" },
];

export default function DowntownPlazaPage() {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState(txns.map((t) => t.cat));
  const [addTxnState, setAddTxnState] = useState<"idle" | "loading" | "done">("idle");
  const [modalSaved, setModalSaved] = useState(false);

  return (
    <AppLayout>
      <PageHeader
        title="Downtown Plaza"
        subtitle="Business District"
        breadcrumb={{ label: "Back to Properties", href: "/properties" }}
        actions={
          <Link
            href="/properties/downtown-plaza/edit"
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
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyFIdsKID_haOZAONiZxzY3CcUedKeS3rYg7HuXwQi6ZyC550OMFHvsO-XggctDoGnpzca7wMsGw2PcLH25VRE2iGQCKlIlGy_NMtmciRojEJkcBFHtdot4Jq-y76IB3y5sjcRprFHiQyPFQWsIO5Ksw-KFVtKrI_dDej16mCFBsb86wYtN40bhrKtQ0mXBV3g-pxQjjq5glCuZ8GGiw6XhaW3b7SHRwZ08jaYiCYetcDlDU0FX5XnUSR97NleCjf8Dii7MdcXLFhr"
          alt="Downtown Plaza"
        />
        <div className="absolute top-4 right-4 px-3 py-1 bg-amber-100/90 backdrop-blur text-amber-700 text-[11px] font-bold rounded-full uppercase tracking-wider">
          Attention
        </div>
      </div>

      {/* Alert Banner */}
      <div className="bg-amber-50 text-amber-800 p-4 rounded-xl flex items-center justify-between shadow-sm border border-amber-200/50">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="material-symbols-outlined text-[20px]">warning</span>
          <span className="text-sm font-medium tracking-tight">
            1 unit vacant since Oct 2023 &mdash; consider listing or adjusting rent
          </span>
        </div>
      </div>

      {/* Property Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface-container-low p-4 rounded-xl">
          <p className="text-[11px] text-on-surface-variant font-semibold uppercase tracking-wider">Occupancy</p>
          <NumberFlow value={0.75} format={{ style: "percent" }} className="text-2xl font-bold text-error mt-1 block" />
          <p className="text-[11px] text-on-surface-variant mt-0.5">4 units total</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-xl">
          <p className="text-[11px] text-on-surface-variant font-semibold uppercase tracking-wider">Monthly Yield</p>
          <NumberFlow value={6000} format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }} className="text-2xl font-bold text-primary mt-1 block" />
          <p className="text-[11px] text-on-surface-variant mt-0.5">Average/Mo</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-xl">
          <p className="text-[11px] text-on-surface-variant font-semibold uppercase tracking-wider">Cap Rate</p>
          <NumberFlow value={0.059} format={{ style: "percent", minimumFractionDigits: 1, maximumFractionDigits: 1 }} className="text-2xl font-bold text-on-surface mt-1 block" />
          <p className="text-[11px] text-on-surface-variant mt-0.5">Annualized</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-xl">
          <p className="text-[11px] text-on-surface-variant font-semibold uppercase tracking-wider">Property Managers</p>
          <div className="flex items-center gap-1 mt-2">
            <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full border-2 border-white bg-surface-container-high flex items-center justify-center text-[11px] font-bold">JD</div>
              <div className="w-7 h-7 rounded-full border-2 border-white bg-outline-variant flex items-center justify-center text-[11px] font-bold">LM</div>
              <div className="w-7 h-7 rounded-full border-2 border-white bg-on-surface-variant flex items-center justify-center text-[11px] font-bold text-white">TC</div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Property Summary */}
      <PropertySummary
        propertyName="Downtown Plaza"
        location="Business District"
        propertyType="commercial"
        occupancy={75}
        totalUnits={4}
        monthlyYield="$6,000"
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
                      categories[i] === "Rental Income" ? "bg-emerald-50 text-emerald-700" : "bg-surface-container-high text-on-surface-variant"
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
            <Link href="/transactions?property=downtown-plaza" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
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
                    onClick={isClickable ? () => window.location.href = `/transactions?property=downtown-plaza&category=${encodeURIComponent(f.item)}` : undefined}
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
        <div className="bg-surface-container-lowest rounded-xl shadow-[0_12px_32px_rgba(20,27,43,0.04)] overflow-hidden border border-outline-variant/10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-6 py-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Unit</th>
                <th className="px-6 py-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Tenant</th>
                <th className="px-6 py-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Rent</th>
                <th className="px-6 py-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest text-center">Last Paid</th>
                <th className="px-6 py-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest text-center">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface">
              {units.map((u, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 text-sm font-bold text-on-surface">{u.unit}</td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">{u.tenant}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-on-surface">{u.rent}</td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant text-center">{u.lastPay}</td>
                  <td className="px-6 py-4 text-center">
                    {u.status === "Vacant" ? (
                      <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-bold rounded-full uppercase tracking-wide">Vacant</span>
                    ) : u.onTime ? (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full uppercase tracking-wide">On Time</span>
                    ) : (
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full uppercase tracking-wide">Late</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">{u.notes || "\u2014"}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
