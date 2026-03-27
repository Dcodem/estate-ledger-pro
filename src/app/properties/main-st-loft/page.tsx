"use client";

import { useState } from "react";
import Link from "next/link";
import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";
import PropertyFiles from "@/components/PropertyFiles";
import PropertySummary from "@/components/PropertySummary";
import type { PropertyFile } from "@/components/PropertyFiles";

const propertyFiles: PropertyFile[] = [
  { id: "msl-1", name: "Unit_A_Lease_Agreement.pdf", type: "pdf", size: "2.4 MB", uploaded: "2024-01-15", category: "Lease Agreement" },
  { id: "msl-2", name: "Unit_B_Lease_Agreement.pdf", type: "pdf", size: "2.1 MB", uploaded: "2024-01-15", category: "Lease Agreement" },
  { id: "msl-3", name: "Building_Insurance_Certificate.pdf", type: "pdf", size: "890 KB", uploaded: "2024-02-01", category: "Insurance" },
  { id: "msl-4", name: "Annual_Inspection_Report_2024.pdf", type: "pdf", size: "5.6 MB", uploaded: "2024-03-10", category: "Inspection Report" },
  { id: "msl-5", name: "Floor_Plans_All_Units.pdf", type: "document", size: "12.3 MB", uploaded: "2023-08-20", category: "Floor Plans" },
  { id: "msl-6", name: "Property_Photos_Exterior.zip", type: "image", size: "34.8 MB", uploaded: "2024-02-28", category: "Photos" },
];

const categoryOptions = [
  "Rental Income", "Maintenance", "Insurance", "Utilities",
  "Capital Improvement", "Contractor", "Office Supplies", "Taxes",
];

const units = [
  { unit: "Unit A", tenant: "Sarah Chen", rent: "$1,400", status: "Current", statusBg: "bg-green-100", statusText: "text-green-700", lastPay: "Mar 15" },
  { unit: "Unit B", tenant: "Michael Torres", rent: "$1,350", status: "Current", statusBg: "bg-green-100", statusText: "text-green-700", lastPay: "Mar 14" },
  { unit: "Unit C", tenant: "Jennifer Walsh", rent: "$1,500", status: "Current", statusBg: "bg-green-100", statusText: "text-green-700", lastPay: "Mar 15" },
  { unit: "Unit D", tenant: "\u2014", rent: "\u2014", status: "Vacant", statusBg: "bg-red-100", statusText: "text-red-700", lastPay: "Feb 1" },
  { unit: "Unit E", tenant: "Robert Kim", rent: "$1,450", status: "Current", statusBg: "bg-green-100", statusText: "text-green-700", lastPay: "Mar 13" },
  { unit: "Unit F", tenant: "Lisa Park", rent: "$1,500", status: "Current", statusBg: "bg-green-100", statusText: "text-green-700", lastPay: "Mar 15" },
];
const txns = [
  { date: "Mar 15", desc: "Rent - Unit A,C,F", cat: "Rental Income", amount: "+$4,400", amountClass: "text-emerald-600" },
  { date: "Mar 14", desc: "Rent - Unit B", cat: "Rental Income", amount: "+$1,350", amountClass: "text-emerald-600" },
  { date: "Mar 13", desc: "Rent - Unit E", cat: "Rental Income", amount: "+$1,450", amountClass: "text-emerald-600" },
  { date: "Mar 10", desc: "Plumbing Repair", cat: "Maintenance", amount: "-$680", amountClass: "text-on-surface" },
];

export default function MainStLoftPage() {
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
        title="Main St. Loft"
        subtitle="Downtown District"
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
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuATEt7tgpb6XS9AZciyqwO-lUbRJkafEHby7BGUW6UWQ5rWBMr8VijcPZRMgkIYUByeAuEXd5SnJOB9HvXG8ulUTSxNcSlGaYu1oQMGWZ11hzuiuWvKnxk4khzD6q-fL_tAuDO0W8EOXJl3qXUy1lnU-j8C1zWlCwo5rmhJj5P6BGt36FHNdBcIug9Ap-64_Gbg0TEdqJHvDIkj4bjDirMtLDl4gEVt6SJUoxZTh8Df42XuDuBvKVoeb30RDg6HXRXFRgPH9XIuPcS3"
          alt="Main St. Loft"
        />
        <div className="absolute top-4 right-4 px-3 py-1 bg-green-100/90 backdrop-blur text-green-700 text-[11px] font-bold rounded-full uppercase tracking-wider">
          Active
        </div>
      </div>

      {/* Property Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface-container-low p-4 rounded-xl">
          <p className="text-[10px] text-on-surface-variant font-semibold uppercase tracking-wider">Occupancy</p>
          <p className="text-2xl font-bold text-on-surface mt-1">92%</p>
          <p className="text-[10px] text-on-surface-variant mt-0.5">6 units total</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-xl">
          <p className="text-[10px] text-on-surface-variant font-semibold uppercase tracking-wider">Monthly Yield</p>
          <p className="text-2xl font-bold text-primary mt-1">$8,200</p>
          <p className="text-[10px] text-on-surface-variant mt-0.5">Average/Mo</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-xl">
          <p className="text-[10px] text-on-surface-variant font-semibold uppercase tracking-wider">Cap Rate</p>
          <p className="text-2xl font-bold text-on-surface mt-1">7.4%</p>
          <p className="text-[10px] text-on-surface-variant mt-0.5">Annualized</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-xl">
          <p className="text-[10px] text-on-surface-variant font-semibold uppercase tracking-wider">Property Managers</p>
          <div className="flex items-center gap-1 mt-2">
            <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold">AS</div>
              <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-300 flex items-center justify-center text-[10px] font-bold">MK</div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Property Summary */}
      <PropertySummary
        propertyName="Main St. Loft"
        location="Downtown District"
        propertyType="residential"
        occupancy={92}
        totalUnits={6}
        monthlyYield="$8,200"
        files={propertyFiles}
      />

      {/* Unit Performance Ledger */}
      <div>
        <h2 className="text-xl font-bold mb-6">Unit Performance Ledger</h2>
        <div className="bg-surface-container-lowest rounded-xl shadow-[0_12px_32px_rgba(20,27,43,0.04)] overflow-hidden border border-outline-variant/10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-8 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Unit</th>
                <th className="px-8 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Tenant</th>
                <th className="px-8 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Rent</th>
                <th className="px-8 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest text-center">Status</th>
                <th className="px-8 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest text-right">Last Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {units.map((u, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-all">
                  <td className="px-8 py-5 text-sm font-bold text-on-surface">{u.unit}</td>
                  <td className="px-8 py-5 text-sm text-on-surface-variant">{u.tenant}</td>
                  <td className="px-8 py-5 text-sm font-semibold text-on-surface">{u.rent}</td>
                  <td className="px-8 py-5 text-center">
                    <span className={`px-3 py-1 ${u.statusBg} ${u.statusText} text-[11px] font-bold rounded-full uppercase tracking-wide`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-sm text-on-surface-variant font-medium text-right">{u.lastPay}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Transactions & Property Documents — Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Recent Transactions — Compact Cards */}
        <div>
          <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
          <div className="bg-surface-container-lowest rounded-xl shadow-[0_12px_32px_rgba(20,27,43,0.04)] border border-outline-variant/10 divide-y divide-slate-100">
            {txns.map((t, i) => (
              <div
                key={i}
                className="px-5 py-4 hover:bg-slate-50/50 transition-all cursor-pointer group/row"
                onClick={() => window.location.href = `/transactions?property=main-st-loft`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-bold text-on-surface truncate flex items-center gap-1.5">
                    {t.desc}
                    <span className="material-symbols-outlined text-[14px] text-primary opacity-0 group-hover/row:opacity-100 transition-opacity">open_in_new</span>
                  </p>
                  <span className={`text-sm font-bold whitespace-nowrap ${t.amountClass}`} style={{ fontFamily: "'Manrope', sans-serif" }}>
                    {t.amount}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1.5" onClick={(e) => e.stopPropagation()}>
                  <span className="text-[11px] text-on-surface-variant font-medium">{t.date}</span>
                  <span className="text-slate-300">·</span>
                  <div className="group/cat flex items-center gap-1">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wide ${
                      categories[i] === "Rental Income" ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-600"
                    }`}>
                      {categories[i]}
                    </span>
                    <button
                      onClick={() => { setEditingIndex(i); setSelectedCategory(categories[i]); }}
                      className="opacity-0 group-hover/cat:opacity-100 transition-opacity p-0.5 rounded hover:bg-surface-container-low"
                    >
                      <span className="material-symbols-outlined text-[12px] text-on-surface-variant">edit</span>
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
              <span className="material-symbols-outlined text-[18px]">{addTxnState === "done" ? "check" : addTxnState === "loading" ? "hourglass_top" : "add"}</span>
              {addTxnState === "done" ? "Added!" : addTxnState === "loading" ? "Adding..." : "Add Transaction"}
            </button>
            <Link href="/transactions" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
              View All Transactions
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Property Documents */}
        <PropertyFiles initialFiles={propertyFiles} />
      </div>

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
