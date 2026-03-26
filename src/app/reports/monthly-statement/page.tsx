import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";
import KPICard from "@/components/KPICard";

const ledger = [
  { asset: "Main St. Loft", income: "$8,200", credits: "$450", debits: "-$2,120", net: "$6,530", status: "Verified", statusColor: "bg-green-100 text-green-700" },
  { asset: "Oak Ridge", income: "$4,500", credits: "$200", debits: "-$950", net: "$3,750", status: "Verified", statusColor: "bg-green-100 text-green-700" },
  { asset: "Downtown Plaza", income: "$6,000", credits: "$180", debits: "-$1,800", net: "$4,380", status: "Pending", statusColor: "bg-yellow-100 text-yellow-700" },
  { asset: "Portfolio Management", income: "—", credits: "—", debits: "-$2,200", net: "-$2,200", status: "Verified", statusColor: "bg-green-100 text-green-700" },
  { asset: "Tax Reserves", income: "—", credits: "—", debits: "-$3,400", net: "-$3,400", status: "Verified", statusColor: "bg-green-100 text-green-700" },
];

export default function MonthlyStatementPage() {
  return (
    <AppLayout>
      <PageHeader title="Monthly Statement" subtitle="Consolidated performance report" breadcrumb={{ label: "Back to Reports", href: "/reports" }} />
      <div className="flex gap-4 mb-6">
        <select className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm"><option>March 2024</option><option>February 2024</option></select>
        <select className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm"><option>All Properties</option><option>Main St. Loft</option></select>
        <button className="px-4 py-2 bg-[#7C3AED] text-white rounded-lg text-sm font-medium">Apply View</button>
      </div>
      <div className="flex gap-6 mb-8">
        <KPICard label="Total Revenue" value="$142,500" />
        <KPICard label="Total Expenses" value="($38,240)" />
        <KPICard label="Operating Profit" value="($5,849)" />
        <KPICard label="Net Cash Flow" value="$98,411" />
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <table className="w-full">
          <thead><tr className="bg-gray-50">
            <th className="text-left text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Asset &amp; Category</th>
            <th className="text-right text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Income</th>
            <th className="text-right text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Expense Credits</th>
            <th className="text-right text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Expense Debits</th>
            <th className="text-right text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Net Position</th>
            <th className="text-left text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Status</th>
          </tr></thead>
          <tbody>{ledger.map((r, i) => (
            <tr key={i} className="border-b border-gray-100 bg-gray-50/50 font-medium">
              <td className="px-6 py-4 text-sm font-semibold text-gray-800">{r.asset}</td>
              <td className="px-6 py-4 text-sm text-right text-green-600">{r.income}</td>
              <td className="px-6 py-4 text-sm text-right text-gray-600">{r.credits}</td>
              <td className="px-6 py-4 text-sm text-right text-red-500">{r.debits}</td>
              <td className="px-6 py-4 text-sm text-right font-semibold text-gray-800">{r.net}</td>
              <td className="px-6 py-4"><span className={`text-xs font-medium px-2 py-0.5 rounded-full ${r.statusColor}`}>{r.status}</span></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">Statement generated Mar 2024</p>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-[#7C3AED] text-white rounded-lg text-sm font-medium">Download PDF</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700">Print</button>
        </div>
      </div>
    </AppLayout>
  );
}
