import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";
import KPICard from "@/components/KPICard";

const financials = [
  { item: "Rental Income", amount: "$4,500", color: "text-green-600" },
  { item: "Maintenance", amount: "-$320", color: "text-red-500" },
  { item: "Insurance", amount: "-$180", color: "text-red-500" },
  { item: "Taxes", amount: "-$450", color: "text-red-500" },
  { item: "Net", amount: "$3,550", color: "text-green-600 font-bold" },
];
const txns = [
  { date: "Mar 15", desc: "Lawn Care", cat: "Maintenance", amount: "-$320", color: "text-red-500" },
  { date: "Mar 14", desc: "Insurance Premium", cat: "Insurance", amount: "-$180", color: "text-red-500" },
  { date: "Mar 1", desc: "Rent Collection", cat: "Rental Income", amount: "+$4,500", color: "text-green-600" },
  { date: "Feb 28", desc: "Property Tax", cat: "Taxes", amount: "-$450", color: "text-red-500" },
];

export default function OakRidgePage() {
  return (
    <AppLayout>
      <PageHeader title="Oak Ridge Estate" subtitle="123 Oak Ridge Dr, Greenwich, CT" breadcrumb={{ label: "Back to Properties", href: "/properties" }} actions={<><button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700">Edit Details</button><button className="px-4 py-2 bg-[#7C3AED] text-white rounded-lg text-sm font-medium">View Financials</button></>} />
      <div className="h-48 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl mb-6" />
      <div className="flex gap-6 mb-8">
        <KPICard label="Units" value="1" />
        <KPICard label="Occupancy" value="100%" />
        <KPICard label="Revenue" value="$4,500" />
        <KPICard label="Cap Rate" value="6.8%" />
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Financial Summary</h2>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        <table className="w-full">
          <thead><tr className="bg-gray-50"><th className="text-left text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Item</th><th className="text-right text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Amount</th></tr></thead>
          <tbody>{financials.map((f, i) => (<tr key={i} className="border-b border-gray-100"><td className="px-6 py-4 text-sm text-gray-700">{f.item}</td><td className={`px-6 py-4 text-sm text-right ${f.color}`}>{f.amount}</td></tr>))}</tbody>
        </table>
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions</h2>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <table className="w-full">
          <thead><tr className="bg-gray-50"><th className="text-left text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Date</th><th className="text-left text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Description</th><th className="text-left text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Category</th><th className="text-right text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Amount</th></tr></thead>
          <tbody>{txns.map((t, i) => (<tr key={i} className="border-b border-gray-100"><td className="px-6 py-4 text-sm text-gray-600">{t.date}</td><td className="px-6 py-4 text-sm font-medium text-gray-800">{t.desc}</td><td className="px-6 py-4 text-sm text-gray-600">{t.cat}</td><td className={`px-6 py-4 text-sm text-right font-semibold ${t.color}`}>{t.amount}</td></tr>))}</tbody>
        </table>
      </div>
      <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700">Add Transaction</button>
    </AppLayout>
  );
}
