"use client";

import AppLayout from "@/components/AppLayout";
import KPICard from "@/components/KPICard";
import PageHeader from "@/components/PageHeader";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const cashflowData = [
  { month: "Jan", income: 8200, expenses: 5100 },
  { month: "Feb", income: 9100, expenses: 4800 },
  { month: "Mar", income: 7800, expenses: 5500 },
  { month: "Apr", income: 10200, expenses: 4200 },
  { month: "May", income: 8900, expenses: 4900 },
  { month: "Jun", income: 11500, expenses: 5800 },
];

const recentActivity = [
  { id: 1, description: "Utility Bill", amount: "$425.20", time: "2m ago", color: "bg-yellow-400" },
  { id: 2, description: "Roof Repair", amount: "$2,100.00", time: "14m ago", color: "bg-red-400" },
  { id: 3, description: "Leasing Fee", amount: "$800.00", time: "1h ago", color: "bg-purple-400" },
  { id: 4, description: "Water Utility", amount: "$89.12", time: "3h ago", color: "bg-blue-400" },
];

export default function DashboardPage() {
  return (
    <AppLayout>
      <PageHeader title="Portfolio Overview" subtitle="Real-time performance across all properties" />
      <div className="flex gap-6 mb-8">
        <KPICard label="Net Cashflow (MTD)" value="$12,450" trend="+8.2%" trendUp />
        <KPICard label="Needs Review" value="33" trend="+5 new" trendUp={false} />
        <KPICard label="Portfolio Value" value="$4.8M" trend="+12.4%" trendUp />
      </div>
      <div className="flex gap-6">
        <div className="w-[65%] bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Cashflow Trends</h2>
              <p className="text-sm text-gray-500 mt-1">Monthly income vs expenses</p>
            </div>
            <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden text-sm font-medium">
              <button className="px-3 py-1.5 text-gray-500">6M</button>
              <button className="px-3 py-1.5 bg-[#7C3AED] text-white">1Y</button>
              <button className="px-3 py-1.5 text-gray-500">ALL</button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cashflowData} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: "#9CA3AF" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: "#9CA3AF" }} tickFormatter={(v: number) => v >= 1000 ? `${v / 1000}k` : String(v)} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
              <Bar dataKey="income" fill="#7C3AED" radius={[4, 4, 0, 0]} name="Income" />
              <Bar dataKey="expenses" fill="#EF4444" radius={[4, 4, 0, 0]} name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="w-[35%] bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />Live
            </span>
          </div>
          <div className="space-y-4">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${item.color}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{item.description}</p>
                  <p className="text-xs text-gray-400">{item.time}</p>
                </div>
                <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">{item.amount}</span>
              </div>
            ))}
          </div>
          <a href="#" className="inline-block mt-5 text-sm font-medium text-[#7C3AED] hover:underline">View All</a>
        </div>
      </div>
    </AppLayout>
  );
}
