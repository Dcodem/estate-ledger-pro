import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";
import KPICard from "@/components/KPICard";

const units = [
  { unit: "Unit 1", tenant: "Acme Corp", rent: "$2,200", status: "Current", statusColor: "text-green-600" },
  { unit: "Unit 2", tenant: "StartupXYZ", rent: "$1,800", status: "Current", statusColor: "text-green-600" },
  { unit: "Unit 3", tenant: "—", rent: "—", status: "Vacant", statusColor: "text-red-500" },
  { unit: "Unit 4", tenant: "Legal Associates", rent: "$2,000", status: "Current", statusColor: "text-green-600" },
];
const txns = [
  { date: "Mar 15", desc: "Rent - Unit 1", cat: "Rental Income", amount: "+$2,200", color: "text-green-600" },
  { date: "Mar 14", desc: "Rent - Unit 2", cat: "Rental Income", amount: "+$1,800", color: "text-green-600" },
  { date: "Mar 12", desc: "HVAC Repair", cat: "Maintenance", amount: "-$1,200", color: "text-red-500" },
  { date: "Mar 10", desc: "Rent - Unit 4", cat: "Rental Income", amount: "+$2,000", color: "text-green-600" },
];

export default function DowntownPlazaPage() {
  return (
    <AppLayout>
      <PageHeader title="Downtown Plaza" subtitle="789 Commercial Ave, Manhattan, NY" breadcrumb={{ label: "Back to Properties", href: "/properties" }} actions={<><button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700">Edit Details</button><button className="px-4 py-2 bg-[#7C3AED] text-white rounded-lg text-sm font-medium">View Financials</button></>} />
      <div className="h-48 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl mb-6" />
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
        <p className="text-sm text-amber-800">1 unit vacant since Oct 2023 — consider listing or adjusting rent</p>
      </div>
      <div className="flex gap-6 mb-8">
        <KPICard label="Units" value="4" />
        <KPICard label="Occupancy" value="75%" />
        <KPICard label="Revenue" value="$6,000" />
        <KPICard label="Cap Rate" value="5.9%" />
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Unit Breakdown</h2>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        <table className="w-full">
          <thead><tr className="bg-gray-50"><th className="text-left text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Unit</th><th className="text-left text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Tenant</th><th className="text-left text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Rent</th><th className="text-left text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Status</th></tr></thead>
          <tbody>{units.map((u, i) => (<tr key={i} className="border-b border-gray-100"><td className="px-6 py-4 text-sm font-medium text-gray-800">{u.unit}</td><td className="px-6 py-4 text-sm text-gray-700">{u.tenant}</td><td className="px-6 py-4 text-sm text-gray-700">{u.rent}</td><td className={`px-6 py-4 text-sm font-medium ${u.statusColor}`}>{u.status}</td></tr>))}</tbody>
        </table>
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions</h2>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <table className="w-full"><thead><tr className="bg-gray-50"><th className="text-left text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Date</th><th className="text-left text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Description</th><th className="text-left text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Category</th><th className="text-right text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Amount</th></tr></thead>
          <tbody>{txns.map((t, i) => (<tr key={i} className="border-b border-gray-100"><td className="px-6 py-4 text-sm text-gray-600">{t.date}</td><td className="px-6 py-4 text-sm font-medium text-gray-800">{t.desc}</td><td className="px-6 py-4 text-sm text-gray-600">{t.cat}</td><td className={`px-6 py-4 text-sm text-right font-semibold ${t.color}`}>{t.amount}</td></tr>))}</tbody>
        </table>
      </div>
      <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700">Add Transaction</button>
    </AppLayout>
  );
}
