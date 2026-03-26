"use client";

import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";

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
  return (
    <AppLayout>
      <PageHeader
        title="Main St. Loft"
        subtitle="Downtown District"
        breadcrumb={{ label: "Back to Properties", href: "/properties" }}
        actions={
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-surface-container-lowest border border-outline-variant/20 rounded-xl text-sm font-semibold text-on-surface shadow-sm hover:shadow-md transition-all">
              <span className="material-symbols-outlined text-[18px]">edit</span>
              Edit Details
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-all">
              <span className="material-symbols-outlined text-[18px]">bar_chart</span>
              View Financials
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
                <tr key={i} className="hover:bg-slate-50/50 transition-all">
                  <td className="px-8 py-5 text-sm text-on-surface-variant font-medium">{t.date}</td>
                  <td className="px-8 py-5 text-sm font-bold text-on-surface">{t.desc}</td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 text-[11px] font-bold rounded-full uppercase tracking-wide ${
                      t.cat === "Rental Income" ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-600"
                    }`}>
                      {t.cat}
                    </span>
                  </td>
                  <td className={`px-8 py-5 text-right font-bold text-sm ${t.amountClass}`} style={{ fontFamily: "'Manrope', sans-serif" }}>
                    {t.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Transaction */}
      <div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-surface-container-lowest border border-outline-variant/20 rounded-xl text-sm font-semibold text-on-surface shadow-sm hover:shadow-md transition-all">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Transaction
        </button>
      </div>
    </AppLayout>
  );
}
