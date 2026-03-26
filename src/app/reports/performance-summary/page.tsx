"use client";
import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";
import KPICard from "@/components/KPICard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const chartData = [
  { month: "Jan", revenue: 14200, expenses: 11800 },
  { month: "Feb", revenue: 15100, expenses: 12200 },
  { month: "Mar", revenue: 16800, expenses: 11500 },
  { month: "Apr", revenue: 17500, expenses: 12800 },
  { month: "May", revenue: 18200, expenses: 11200 },
  { month: "Jun", revenue: 18700, expenses: 10500 },
];

const comparison = [
  { property: "Main St. Loft", revenue: "$49,200", expenses: "$18,400", net: "$30,800", roi: "7.4%", status: "Strong", statusColor: "bg-green-100 text-green-700" },
  { property: "Oak Ridge", revenue: "$27,000", expenses: "$8,200", net: "$18,800", roi: "6.8%", status: "Stable", statusColor: "bg-blue-100 text-blue-700" },
  { property: "Downtown Plaza", revenue: "$36,000", expenses: "$14,900", net: "$21,100", roi: "5.9%", status: "Attention", statusColor: "bg-yellow-100 text-yellow-700" },
];

export default function PerformanceSummaryPage() {
  return (
    <AppLayout>
      <PageHeader title="Performance Summary" breadcrumb={{ label: "Back to Reports", href: "/reports" }} actions={<><span className="text-sm bg-gray-100 rounded-full px-3 py-1 text-gray-600">Jan 2024 - Jun 2024</span><button className="px-4 py-2 bg-[#7C3AED] text-white rounded-lg text-sm font-medium">Export PDF</button></>} />
      <div className="flex gap-6 mb-8">
        <KPICard label="Total Revenue" value="$18,700" />
        <KPICard label="Total Expenses" value="$110,500" />
        <KPICard label="Net Income" value="$7,200" />
        <KPICard label="Portfolio ROI" value="8.42%" />
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Revenue vs Expenses</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9CA3AF" }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9CA3AF" }} tickFormatter={(v: number) => `${v / 1000}k`} />
            <Tooltip />
            <Bar dataKey="revenue" fill="#7C3AED" name="Revenue" radius={[4,4,0,0]} />
            <Bar dataKey="expenses" fill="#EF4444" name="Expenses" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Asset Insight</h2>
        <div className="flex gap-6">
          <div className="w-48 h-32 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-lg flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-lg text-gray-900">Main St. Loft</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-3 text-sm">
              <div><span className="text-gray-500">Rent collected</span><p className="font-semibold">$8,200</p></div>
              <div><span className="text-gray-500">Vacancy rate</span><p className="font-semibold">8%</p></div>
              <div><span className="text-gray-500">Maintenance cost</span><p className="font-semibold">$1,240</p></div>
              <div><span className="text-gray-500">Net yield</span><p className="font-semibold">7.4%</p></div>
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Property Comparison</h2>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead><tr className="bg-gray-50">
            <th className="text-left text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Property</th>
            <th className="text-right text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Revenue</th>
            <th className="text-right text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Expenses</th>
            <th className="text-right text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Net Income</th>
            <th className="text-right text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">ROI %</th>
            <th className="text-left text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Status</th>
          </tr></thead>
          <tbody>{comparison.map((c, i) => (
            <tr key={i} className="border-b border-gray-100">
              <td className="px-6 py-4 text-sm font-medium text-gray-800">{c.property}</td>
              <td className="px-6 py-4 text-sm text-right text-gray-700">{c.revenue}</td>
              <td className="px-6 py-4 text-sm text-right text-gray-700">{c.expenses}</td>
              <td className="px-6 py-4 text-sm text-right font-semibold text-gray-800">{c.net}</td>
              <td className="px-6 py-4 text-sm text-right font-semibold text-gray-800">{c.roi}</td>
              <td className="px-6 py-4"><span className={`text-xs font-medium px-2 py-0.5 rounded-full ${c.statusColor}`}>{c.status}</span></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </AppLayout>
  );
}
