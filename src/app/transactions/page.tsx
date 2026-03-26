"use client";

import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

const transactions = [
  {
    date: "Mar 15, 2024",
    title: "Home Depot - Materials",
    subtitle: "Project #402 - Kitchen Reno",
    category: "Capital Improvement",
    catClass: "bg-blue-50 text-blue-600",
    amount: "-$2,450.00",
    amountClass: "text-on-surface",
    highlight: false,
  },
  {
    date: "Mar 14, 2024",
    title: "Liberty Mutual - Premium",
    subtitle: "Policy: LP-998231",
    category: "Insurance",
    catClass: "bg-slate-100 text-slate-600",
    amount: "-$845.20",
    amountClass: "text-on-surface",
    highlight: false,
  },
  {
    date: "Mar 14, 2024",
    title: "Zillow - Rent Payment",
    subtitle: "Tenant: Unit 4B - Maxwell",
    category: "Rental Income",
    catClass: "bg-emerald-50 text-emerald-600",
    amount: "+$3,200.00",
    amountClass: "text-emerald-600",
    highlight: false,
  },
  {
    date: "Mar 13, 2024",
    title: "Stripe - Mktplace",
    subtitle: "Merchant ID: STR-0091",
    category: "Needs Review",
    catClass: "bg-[#FEF3C7] text-[#92400E]",
    amount: "-$1,102.55",
    amountClass: "text-on-surface",
    highlight: true,
    icon: "psychology",
  },
  {
    date: "Mar 12, 2024",
    title: "ConEd - Energy",
    subtitle: "Acc: 771-001-22",
    category: "Utilities",
    catClass: "bg-teal-50 text-teal-600",
    amount: "-$118.40",
    amountClass: "text-on-surface",
    highlight: false,
  },
];

export default function TransactionsPage() {
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
      <div className="bg-[#FEF3C7] text-[#92400E] p-4 rounded-xl flex items-center justify-between shadow-sm border border-[#FDE68A]/50">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[20px]">warning</span>
          <span className="text-sm font-medium tracking-tight">
            1 transaction needs review — AI couldn&apos;t confidently categorize this item
          </span>
        </div>
        <Link
          href="/transactions/smart-triage"
          className="bg-white/80 hover:bg-white px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
        >
          Review Now
        </Link>
      </div>

      {/* Filters & Actions */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-surface-container-lowest border border-outline-variant/20 rounded-xl text-sm font-semibold text-on-surface shadow-sm hover:shadow-md transition-all">
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            Filters
          </button>
          <div className="h-6 w-px bg-outline-variant/30" />
          <div className="flex gap-2">
            <span className="px-3 py-1.5 bg-primary/5 text-primary text-xs font-bold rounded-full border border-primary/10">
              All
            </span>
            <span className="px-3 py-1.5 text-on-surface-variant text-xs font-semibold hover:bg-slate-100 rounded-full cursor-pointer transition-all">
              Income
            </span>
            <span className="px-3 py-1.5 text-on-surface-variant text-xs font-semibold hover:bg-slate-100 rounded-full cursor-pointer transition-all">
              Expenses
            </span>
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
              <th className="px-8 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest text-right">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {transactions.map((t, i) => (
              <tr
                key={i}
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
            Showing <span className="text-on-surface font-bold">1-25</span> of 482
            transactions
          </span>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 transition-all">
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded-lg bg-primary text-white text-xs font-bold transition-all shadow-md shadow-primary/20">
                1
              </button>
              <button className="w-8 h-8 rounded-lg text-xs font-bold text-on-surface hover:bg-slate-100 transition-all">
                2
              </button>
              <button className="w-8 h-8 rounded-lg text-xs font-bold text-on-surface hover:bg-slate-100 transition-all">
                3
              </button>
              <span className="text-slate-300 px-1">...</span>
            </div>
            <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-all">
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contextual Insight Bento */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-gradient-to-br from-primary to-primary-container p-6 rounded-2xl shadow-xl shadow-primary/10 relative overflow-hidden group">
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
              <Link href="/reports" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 px-4 py-2 rounded-lg text-xs font-bold text-white transition-all inline-block">
                Optimization Report
              </Link>
            </div>
          </div>
        </div>
        <div className="col-span-1 bg-white p-6 rounded-2xl border border-outline-variant/10 shadow-sm flex flex-col justify-center items-center text-center">
          <div className="w-12 h-12 bg-primary-fixed-dim rounded-xl flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-primary">pie_chart</span>
          </div>
          <h4 className="text-sm font-bold text-on-surface">Portfolio Split</h4>
          <p className="text-xs text-on-surface-variant mt-1 px-4">
            See how your expenses are distributed across assets.
          </p>
          <Link href="/reports" className="mt-4 text-primary text-xs font-bold hover:underline inline-block">
            View Analytics
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
