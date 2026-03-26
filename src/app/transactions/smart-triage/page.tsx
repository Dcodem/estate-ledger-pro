"use client";
import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";

const triageCards = [
  { vendor: "Stripe - Mktplace", amount: "$1,102.55", date: "Mar 13", suggestion: "Maintenance", confidence: 72, confColor: "bg-yellow-100 text-yellow-700" },
  { vendor: "Amazon Business", amount: "$234.99", date: "Mar 11", suggestion: "Office Supplies", confidence: 91, confColor: "bg-green-100 text-green-700" },
  { vendor: "Square Payment", amount: "$567.00", date: "Mar 10", suggestion: "Contractor", confidence: 45, confColor: "bg-red-100 text-red-700" },
];

const tabs = ["All", "High Confidence", "Medium", "Low"];

export default function SmartTriagePage() {
  return (
    <AppLayout>
      <PageHeader title="Smart Triage" subtitle="AI-suggested categorizations for review" />
      <div className="flex gap-2 mb-6">
        {tabs.map((t, i) => (
          <button key={t} className={`px-4 py-2 rounded-full text-sm font-medium ${i === 0 ? "bg-[#7C3AED] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{t}</button>
        ))}
      </div>
      <div className="space-y-6">
        {triageCards.map((c, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">{c.vendor}</h3>
              <p className="text-2xl font-bold text-gray-800 mt-1">{c.amount}</p>
              <p className="text-sm text-gray-500 mt-1">{c.date}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-gray-500 mb-1">AI Suggests</p>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${c.confColor}`}>{c.suggestion} ({c.confidence}%)</span>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-lg bg-green-500 text-white text-sm font-medium hover:bg-green-600">Accept</button>
                <button className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600">Reject</button>
                <button className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
