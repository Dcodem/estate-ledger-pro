"use client";
import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";
import KPICard from "@/components/KPICard";
import Link from "next/link";
import { FileText, BarChart3, FileSpreadsheet } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const chartData = [
  { month: "Jan", mainSt: 7200, oakRidge: 4200, downtown: 5400 },
  { month: "Feb", mainSt: 7800, oakRidge: 4300, downtown: 5200 },
  { month: "Mar", mainSt: 8200, oakRidge: 4500, downtown: 6000 },
  { month: "Apr", mainSt: 8500, oakRidge: 4400, downtown: 5800 },
  { month: "May", mainSt: 8100, oakRidge: 4600, downtown: 5900 },
  { month: "Jun", mainSt: 8800, oakRidge: 4500, downtown: 6200 },
];

const expenses = [
  { name: "Property Taxes", amount: "$32,400", pct: 100 },
  { name: "Management", amount: "$22,848", pct: 70 },
  { name: "Maintenance", amount: "$16,900", pct: 52 },
  { name: "Utilities", amount: "$8,000", pct: 25 },
  { name: "Insurance", amount: "$7,718", pct: 24 },
  { name: "Other", amount: "$5,200", pct: 16 },
];

const reportCards = [
  { title: "Download Schedule E (Draft)", desc: "Tax filing document for rental properties", icon: FileSpreadsheet, href: "#" },
  { title: "Performance Summary", desc: "Mid-year portfolio performance overview", icon: BarChart3, href: "/reports/performance-summary" },
  { title: "Monthly Statement", desc: "Consolidated monthly financial report", icon: FileText, href: "/reports/monthly-statement" },
];

export default function ReportsHubPage() {
  return (
    <AppLayout>
      <p className="text-xs font-medium uppercase tracking-wider text-[#7C3AED] mb-1">Analytics</p>
      <PageHeader title="Reports" subtitle="Comprehensive financial analytics and performance tracking" actions={<button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700">Export All Reports</button>} />
      <div className="flex gap-4 mb-6">
        <select className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm"><option>Date Range</option><option>Last 30 Days</option><option>Last 90 Days</option><option>Year to Date</option></select>
        <select className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm"><option>All Properties</option><option>Main St. Loft</option><option>Oak Ridge</option><option>Downtown Plaza</option></select>
        <select className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm"><option>All Reports</option><option>Financial</option><option>Tax</option></select>
      </div>
      <div className="flex gap-6 mb-8">
        <KPICard label="Total Revenue" value="$264,600" trend="+8.2%" trendUp />
        <KPICard label="Total Expenses" value="$93,066" trend="-3.1%" trendUp />
        <KPICard label="Net Operating Income" value="$171,534" trend="+10.5%" trendUp />
        <KPICard label="Average Cap Rate" value="7.2%" trend="+0.4%" trendUp />
      </div>
      <div className="grid grid-cols-[1fr_380px] gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Cash Flow by Property</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9CA3AF" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9CA3AF" }} tickFormatter={(v: number) => `${v / 1000}k`} />
                <Tooltip />
                <Legend />
                <Bar dataKey="mainSt" fill="#7C3AED" name="Main St. Loft" radius={[3,3,0,0]} />
                <Bar dataKey="oakRidge" fill="#3B82F6" name="Oak Ridge" radius={[3,3,0,0]} />
                <Bar dataKey="downtown" fill="#14B8A6" name="Downtown Plaza" radius={[3,3,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Expense Breakdown</h2>
            <div className="space-y-4">
              {expenses.map((e) => (
                <div key={e.name}>
                  <div className="flex justify-between text-sm mb-1"><span className="text-gray-700">{e.name}</span><span className="font-semibold text-gray-800">{e.amount}</span></div>
                  <div className="h-2.5 bg-gray-100 rounded-full"><div className="h-2.5 bg-[#7C3AED] rounded-full" style={{ width: `${e.pct}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          {reportCards.map((r) => (
            <Link key={r.title} href={r.href} className="block bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#F3F0FF] rounded-lg flex items-center justify-center"><r.icon size={20} className="text-[#7C3AED]" /></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm">{r.title}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{r.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
