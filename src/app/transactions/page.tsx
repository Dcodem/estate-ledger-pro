import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";

const transactions = [
  { date: "Mar 15", desc: "Home Depot - Materials", category: "Capital Improvement", catColor: "bg-blue-100 text-blue-700", amount: "-$2,450.00", amountColor: "text-red-500" },
  { date: "Mar 14", desc: "Liberty Mutual - Premium", category: "Insurance", catColor: "bg-gray-100 text-gray-700", amount: "-$845.20", amountColor: "text-red-500" },
  { date: "Mar 14", desc: "Zillow - Rent Payment", category: "Rental Income", catColor: "bg-green-100 text-green-700", amount: "+$3,200.00", amountColor: "text-green-600" },
  { date: "Mar 13", desc: "Stripe - Mktplace", category: "Needs Review", catColor: "bg-orange-100 text-orange-700", amount: "-$1,102.55", amountColor: "text-red-500" },
  { date: "Mar 12", desc: "ConEd - Energy", category: "Utilities", catColor: "bg-teal-100 text-teal-700", amount: "-$118.40", amountColor: "text-red-500" },
];

export default function TransactionsPage() {
  return (
    <AppLayout>
      <PageHeader title="Transactions" subtitle="Last synced 12 minutes ago" actions={<button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Export</button>} />
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-center justify-between">
        <p className="text-sm text-amber-800">1 transaction needs review — AI couldn&apos;t confidently categorize this item</p>
        <Link href="/transactions/smart-triage" className="text-sm font-semibold text-amber-700 hover:underline">Review Now</Link>
      </div>
      <div className="flex gap-4 mb-6">
        <input type="text" placeholder="Search transactions..." className="flex-1 h-10 px-4 rounded-lg border border-gray-200 text-sm" />
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"><SlidersHorizontal size={16} />Filters</button>
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead><tr className="bg-gray-50">
            <th className="text-left text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Date</th>
            <th className="text-left text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Description</th>
            <th className="text-left text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Category</th>
            <th className="text-right text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Amount</th>
          </tr></thead>
          <tbody>
            {transactions.map((t, i) => (
              <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600">{t.date}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800">{t.desc}</td>
                <td className="px-6 py-4"><span className={`text-xs font-medium px-2.5 py-1 rounded-full ${t.catColor}`}>{t.category}</span></td>
                <td className={`px-6 py-4 text-sm font-semibold text-right ${t.amountColor}`}>{t.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <span className="text-sm text-gray-500">Showing 1-25 of 482 transactions</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 text-sm rounded border border-gray-200 text-gray-500">Previous</button>
            <button className="px-3 py-1 text-sm rounded bg-[#7C3AED] text-white">1</button>
            <button className="px-3 py-1 text-sm rounded border border-gray-200 text-gray-500">2</button>
            <button className="px-3 py-1 text-sm rounded border border-gray-200 text-gray-500">3</button>
            <button className="px-3 py-1 text-sm rounded border border-gray-200 text-gray-500">Next</button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
