import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";

const pairs = [
  { a: { desc: "Home Depot - Materials", amount: "$2,450.00", date: "Mar 15" }, b: { desc: "Home Depot - Materials", amount: "$2,450.00", date: "Mar 15" }, confidence: 95 },
  { a: { desc: "ConEd - Energy", amount: "$118.40", date: "Mar 12" }, b: { desc: "ConEd - Energy Bill", amount: "$118.40", date: "Mar 12" }, confidence: 78 },
  { a: { desc: "Water Utility", amount: "$89.12", date: "Mar 10" }, b: { desc: "Water Utility Co", amount: "$89.12", date: "Mar 11" }, confidence: 42 },
];

export default function DuplicatesPage() {
  return (
    <AppLayout>
      <PageHeader title="Potential Duplicates" breadcrumb={{ label: "Back to AI Review", href: "/transactions/ai-review" }} />
      <div className="grid grid-cols-[1fr_400px] gap-6">
        <div className="space-y-8">
          {pairs.map((p, i) => (
            <div key={i} className="border-2 border-gray-200 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold text-gray-700">Duplicate Pair #{i + 1}</span>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${p.confidence >= 80 ? "bg-green-100 text-green-700" : p.confidence >= 50 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>{p.confidence}% match</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {[p.a, p.b].map((t, j) => (
                  <div key={j} className="bg-yellow-50 rounded-lg p-4">
                    <p className="font-medium text-gray-800">{t.desc}</p>
                    <p className="text-lg font-bold text-gray-900">{t.amount}</p>
                    <p className="text-sm text-gray-500">{t.date}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700">Keep Both</button>
                <button className="px-4 py-2 rounded-lg bg-[#7C3AED] text-white text-sm font-medium">Merge</button>
                <button className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium">Mark as Duplicate</button>
              </div>
            </div>
          ))}
        </div>
        <div className="sticky top-24">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Detection Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm"><span className="text-gray-500">Total pairs</span><span className="font-semibold">3</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">High confidence (&gt;90%)</span><span className="font-semibold text-green-600">1</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Medium (60-90%)</span><span className="font-semibold text-yellow-600">1</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Low (&lt;60%)</span><span className="font-semibold text-red-600">1</span></div>
            </div>
            <div className="space-y-2">
              <button className="w-full px-4 py-2.5 rounded-lg bg-[#7C3AED] text-white text-sm font-medium">Resolve All High-Confidence</button>
              <button className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700">Ignore All Low-Confidence</button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
