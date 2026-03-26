import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";
import KPICard from "@/components/KPICard";

const units = [
  { unit: "Unit A", tenant: "Sarah Chen", rent: "$1,400", status: "Current", statusColor: "text-green-600", lastPay: "Mar 15" },
  { unit: "Unit B", tenant: "Michael Torres", rent: "$1,350", status: "Current", statusColor: "text-green-600", lastPay: "Mar 14" },
  { unit: "Unit C", tenant: "Jennifer Walsh", rent: "$1,500", status: "Current", statusColor: "text-green-600", lastPay: "Mar 15" },
  { unit: "Unit D", tenant: "—", rent: "—", status: "Vacant", statusColor: "text-red-500", lastPay: "Feb 1" },
  { unit: "Unit E", tenant: "Robert Kim", rent: "$1,450", status: "Current", statusColor: "text-green-600", lastPay: "Mar 13" },
  { unit: "Unit F", tenant: "Lisa Park", rent: "$1,500", status: "Current", statusColor: "text-green-600", lastPay: "Mar 15" },
];
const txns = [
  { date: "Mar 15", desc: "Rent - Unit A,C,F", cat: "Rental Income", amount: "+$4,400", color: "text-green-600" },
  { date: "Mar 14", desc: "Rent - Unit B", cat: "Rental Income", amount: "+$1,350", color: "text-green-600" },
  { date: "Mar 13", desc: "Rent - Unit E", cat: "Rental Income", amount: "+$1,450", color: "text-green-600" },
  { date: "Mar 10", desc: "Plumbing Repair", cat: "Maintenance", amount: "-$680", color: "text-red-500" },
];

export default function MainStLoftPage() {
  return (
    <AppLayout>
      <PageHeader title="Main St. Loft" subtitle="456 Main St, Unit A-F, Brooklyn, NY" breadcrumb={{ label: "Back to Properties", href: "/properties" }} actions={<><button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700">Edit Details</button><button className="px-4 py-2 bg-[#7C3AED] text-white rounded-lg text-sm font-medium">View Financials</button></>} />
      <div className="h-48 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-xl mb-6" />
      <div className="flex gap-6 mb-8">
        <KPICard label="Units" value="6" />
        <KPICard label="Occupancy" value="92%" />
        <KPICard label="Revenue" value="$8,200" />
        <KPICard label="Cap Rate" value="7.4%" />
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Unit Performance Ledger</h2>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        <table className="w-full">
          <thead><tr className="bg-gray-50">
            <th className="text-left text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Unit</th>
            <th className="text-left text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Tenant</th>
            <th className="text-left text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Rent</th>
            <th className="text-left text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Status</th>
            <th className="text-left text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Last Payment</th>
          </tr></thead>
          <tbody>{units.map((u, i) => (<tr key={i} className="border-b border-gray-100"><td className="px-6 py-4 text-sm font-medium text-gray-800">{u.unit}</td><td className="px-6 py-4 text-sm text-gray-700">{u.tenant}</td><td className="px-6 py-4 text-sm text-gray-700">{u.rent}</td><td className={`px-6 py-4 text-sm font-medium ${u.statusColor}`}>{u.status}</td><td className="px-6 py-4 text-sm text-gray-600">{u.lastPay}</td></tr>))}</tbody>
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
