"use client";
import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";
import { FileSpreadsheet, FileText } from "lucide-react";
import { useState } from "react";

const history = [
  { date: "Mar 10", name: "Q4 2023 Summary", format: "Excel", size: "2.4 MB", status: "Complete" },
  { date: "Feb 28", name: "Annual Report", format: "PDF", size: "8.1 MB", status: "Complete" },
  { date: "Feb 15", name: "Tax Documents", format: "Excel", size: "1.2 MB", status: "Complete" },
];

export default function ExportsPage() {
  const [format, setFormat] = useState("excel");
  return (
    <AppLayout>
      <PageHeader title="Export Reports" />
      <div className="space-y-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">1. Select Export Format</h3>
          <div className="flex gap-4">
            <button onClick={() => setFormat("excel")} className={`flex items-center gap-3 px-6 py-4 rounded-lg border-2 ${format === "excel" ? "border-[#7C3AED] bg-[#F3F0FF]" : "border-gray-200"}`}><FileSpreadsheet size={20} className="text-green-600" /><span className="font-medium text-sm">Excel</span></button>
            <button onClick={() => setFormat("csv")} className={`flex items-center gap-3 px-6 py-4 rounded-lg border-2 ${format === "csv" ? "border-[#7C3AED] bg-[#F3F0FF]" : "border-gray-200"}`}><FileText size={20} className="text-blue-600" /><span className="font-medium text-sm">CSV</span></button>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">2. Date Range</h3>
          <select className="h-11 px-4 rounded-lg border border-gray-200 text-sm w-64"><option>2023 Tax Year</option><option>2022 Tax Year</option><option>Custom Range</option></select>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">3. Property Selection</h3>
          <div className="space-y-2">{["All Properties", "Main St. Loft", "Oak Ridge", "Downtown Plaza"].map((p, i) => (<label key={p} className="flex items-center gap-3"><input type="checkbox" defaultChecked={i === 0} className="w-4 h-4 accent-[#7C3AED]" /><span className="text-sm text-gray-700">{p}</span></label>))}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">4. Table Preferences</h3>
          <div className="space-y-2">{["Include charts", "Include notes", "Separate sheets per property"].map((p) => (<label key={p} className="flex items-center gap-3"><input type="checkbox" className="w-4 h-4 accent-[#7C3AED]" /><span className="text-sm text-gray-700">{p}</span></label>))}</div>
        </div>
      </div>
      <div className="mb-6"><p className="text-sm text-gray-600 mb-2">84.2 GB of 250 GB used</p><div className="h-2.5 bg-gray-200 rounded-full"><div className="h-2.5 bg-[#7C3AED] rounded-full" style={{ width: "34%" }} /></div></div>
      <button className="w-full py-3 bg-[#7C3AED] text-white font-semibold rounded-lg mb-8">Generate 2023 Report</button>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Export Presets</h2>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {["Accountant-Ready", "Quarterly Review", "Individual Property"].map((p) => (<div key={p} className="bg-white rounded-xl shadow-sm p-5"><h3 className="font-semibold text-gray-900 text-sm">{p}</h3><p className="text-sm text-gray-500 mt-1">Pre-configured export template</p></div>))}
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Export History</h2>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead><tr className="bg-gray-50"><th className="text-left text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Date</th><th className="text-left text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Report Name</th><th className="text-left text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Format</th><th className="text-left text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Size</th><th className="text-left text-xs font-semibold uppercase text-gray-500 tracking-wider px-6 py-3">Status</th></tr></thead>
          <tbody>{history.map((h, i) => (<tr key={i} className="border-b border-gray-100"><td className="px-6 py-4 text-sm text-gray-600">{h.date}</td><td className="px-6 py-4 text-sm font-medium text-gray-800">{h.name}</td><td className="px-6 py-4 text-sm text-gray-600">{h.format}</td><td className="px-6 py-4 text-sm text-gray-600">{h.size}</td><td className="px-6 py-4"><span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">{h.status}</span></td></tr>))}</tbody>
        </table>
      </div>
    </AppLayout>
  );
}
