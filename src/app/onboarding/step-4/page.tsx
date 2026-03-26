"use client";
import Link from "next/link";

function StepDots({ step }: { step: number }) {
  return <div className="flex gap-2">{[1,2,3,4].map(s=><div key={s} className={`w-3 h-3 rounded-full ${s<=step?"bg-[#7C3AED]":"bg-gray-300"}`}/>)}</div>;
}

const previewData = [
  { date: "Mar 15", desc: "Home Depot - Materials", category: "Capital Improvement", property: "Main St. Loft" },
  { date: "Mar 14", desc: "Zillow - Rent Payment", category: "Rental Income", property: "Oak Ridge" },
  { date: "Mar 13", desc: "ConEd - Energy", category: "Utilities", property: "Downtown Plaza" },
  { date: "Mar 12", desc: "Liberty Mutual", category: "Insurance", property: "All Properties" },
];

export default function OnboardingStep4() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-start justify-center">
      <div className="max-w-2xl w-full mx-auto mt-20 bg-white rounded-2xl shadow-sm p-8">
        <div className="flex items-center justify-between mb-8">
          <span className="text-xl font-bold text-[#7C3AED]">Estate Ledger</span>
          <StepDots step={4} />
        </div>
        <h1 className="text-[28px] font-bold text-gray-900 mb-6">Review &amp; Confirm</h1>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-[#F3F0FF] rounded-xl p-5 text-center">
            <div className="text-2xl font-bold text-[#7C3AED]">127</div>
            <div className="text-sm text-gray-600 mt-1">Transactions Found</div>
          </div>
          <div className="bg-green-50 rounded-xl p-5 text-center">
            <div className="text-2xl font-bold text-green-600">3</div>
            <div className="text-sm text-gray-600 mt-1">Properties Detected</div>
          </div>
          <div className="bg-amber-50 rounded-xl p-5 text-center">
            <div className="text-2xl font-bold text-amber-600">5</div>
            <div className="text-sm text-gray-600 mt-1">Items Need Review</div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-8">
          <table className="w-full">
            <thead><tr className="bg-gray-50">
              <th className="text-left text-xs font-semibold uppercase text-gray-500 tracking-wider px-4 py-3">Date</th>
              <th className="text-left text-xs font-semibold uppercase text-gray-500 tracking-wider px-4 py-3">Description</th>
              <th className="text-left text-xs font-semibold uppercase text-gray-500 tracking-wider px-4 py-3">Category</th>
              <th className="text-left text-xs font-semibold uppercase text-gray-500 tracking-wider px-4 py-3">Property</th>
            </tr></thead>
            <tbody>
              {previewData.map((r, i) => (
                <tr key={i} className="border-t border-gray-100">
                  <td className="px-4 py-3 text-sm text-gray-600">{r.date}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{r.desc}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{r.category}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{r.property}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between">
          <Link href="/onboarding/step-3" className="px-6 py-2.5 rounded-lg border-2 border-[#7C3AED] text-[#7C3AED] text-sm font-medium hover:bg-[#F3F0FF]">Review Details</Link>
          <Link href="/" className="px-6 py-2.5 rounded-lg bg-[#7C3AED] text-white text-sm font-medium hover:bg-[#6D28D9]">Go to Dashboard</Link>
        </div>
      </div>
    </div>
  );
}
