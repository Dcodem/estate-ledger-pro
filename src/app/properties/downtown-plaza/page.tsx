"use client";

import { useState } from "react";
import Link from "next/link";
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
  { unit: "Unit 1", tenant: "Acme Corp", rent: "$2,200", status: "Current", statusBg: "bg-green-100", statusText: "text-green-700" },
  { unit: "Unit 2", tenant: "StartupXYZ", rent: "$1,800", status: "Current", statusBg: "bg-green-100", statusText: "text-green-700" },
  { unit: "Unit 3", tenant: "\u2014", rent: "\u2014", status: "Vacant", statusBg: "bg-red-100", statusText: "text-red-700" },
  { unit: "Unit 4", tenant: "Legal Associates", rent: "$2,000", status: "Current", statusBg: "bg-green-100", statusText: "text-green-700" },
];
const txns = [
  { date: "Mar 15", desc: "Rent - Unit 1", cat: "Rental Income", amount: "+$2,200", amountClass: "text-emerald-600" },
  { date: "Mar 14", desc: "Rent - Unit 2", cat: "Rental Income", amount: "+$1,800", amountClass: "text-emerald-600" },
  { date: "Mar 12", desc: "HVAC Repair", cat: "Maintenance", amount: "-$1,200", amountClass: "text-on-surface" },
  { date: "Mar 10", desc: "Rent - Unit 4", cat: "Rental Income", amount: "+$2,000", amountClass: "text-emerald-600" },
];

export default function DowntownPlazaPage() {
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
        title="Downtown Plaza"
        subtitle="Business District"
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
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyFIdsKID_haOZAONiZxzY3CcUedKeS3rYg7HuXwQi6ZyC550OMFHvsO-XggctDoGnpzca7wMsGw2PcLH25VRE2iGQCKlIlGy_NMtmciRojEJkcBFHtdot4Jq-y76IB3y5sjcRprFHiQyPFQWsIO5Ksw-KFVtKrI_dDej16mCFBsb86wYtN40bhrKtQ0mXBV3g-pxQjjq5glCuZ8GGiw6XhaW3b7SHRwZ08jaYiCYetcDlDU0FX5XnUSR97NleCjf8Dii7MdcXLFhr"
          alt="Downtown Plaza"
        />
        <div className="absolute top-4 right-4 px-3 py-1 bg-amber-100/90 backdrop-blur text-amber-700 text-[11px] font-bold rounded-full uppercase tracking-wider">
          Attention
        </div>
      </div>

      {/* Alert Banner */}
      <div className="bg-[#FEF3C7] text-[#92400E] p-4 rounded-xl flex items-center justify-between shadow-sm border border-[#FDE68A]/50">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[20px]">warning</span>
          <span className="text-sm font-medium tracking-tight">
            1 unit vacant since Oct 2023 &mdash; consider listing or adjusting rent
          </span>
        </div>
      </div>

      {/* Property Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface-container-low p-4 rounded-xl">
          <p className="text-[10px] text-on-surface-variant font-semibold uppercase tracking-wider">Occupancy</p>
          <p className="text-2xl font-bold text-error mt-1">75%</p>
          <p className="text-[10px] text-on-surface-variant mt-0.5">4 units total</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-xl">
          <p className="text-[10px] text-on-surface-variant font-semibold uppercase tracking-wider">Monthly Yield</p>
          <p className="text-2xl font-bold text-primary mt-1">$6,000</p>
          <p className="text-[10px] text-on-surface-variant mt-0.5">Average/Mo</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-xl">
          <p className="text-[10px] text-on-surface-variant font-semibold uppercase tracking-wider">Cap Rate</p>
          <p className="text-2xl font-bold text-on-surface mt-1">5.9%</p>
          <p className="text-[10px] text-on-surface-variant mt-0.5">Annualized</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-xl">
          <p className="text-[10px] text-on-surface-variant font-semibold uppercase tracking-wider">Property Managers</p>
          <div className="flex items-center gap-1 mt-2">
            <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold">JD</div>
              <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-300 flex items-center justify-center text-[10px] font-bold">LM</div>
              <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-500 flex items-center justify-center text-[10px] font-bold text-white">TC</div>
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

      {/* Unit Breakdown */}
      <div>
        <h2 className="text-xl font-bold mb-6">Unit Breakdown</h2>
        <div className="bg-surface-container-lowest rounded-xl shadow-[0_12px_32px_rgba(20,27,43,0.04)] overflow-hidden border border-outline-variant/10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-8 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Unit</th>
                <th className="px-8 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Tenant</th>
                <th className="px-8 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Rent</th>
                <th className="px-8 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {units.map((u, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-all">
                  <td className="px-8 py-5 text-sm font-bold text-on-surface">{u.unit}</td>
                  <td className="px-8 py-5 text-sm text-on-surface-variant">{u.tenant}</td>
                  <td className="px-8 py-5 text-sm font-semibold text-on-surface">{u.rent}</td>
                  <td className="px-8 py-5 text-right">
                    <span className={`px-3 py-1 ${u.statusBg} ${u.statusText} text-[11px] font-bold rounded-full uppercase tracking-wide`}>
                      {u.status}
                    </span>
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
                <tr key={i} className="hover:bg-slate-50/50 transition-all cursor-pointer group/row" onClick={() => window.location.href = `/transactions?property=downtown-plaza`}>
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
                        categories[i] === "Rental Income" ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-600"
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
