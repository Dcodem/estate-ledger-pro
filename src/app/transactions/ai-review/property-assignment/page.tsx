import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";

const items = [
  { vendor: "Home Depot - Materials", amount: "$2,450.00", date: "Mar 15", suggestion: "Main St. Loft", confidence: 87 },
  { vendor: "Lawn Care Service", amount: "$320.00", date: "Mar 14", suggestion: "Oak Ridge", confidence: 94 },
  { vendor: "ConEd - Energy", amount: "$118.40", date: "Mar 12", suggestion: "Downtown Plaza", confidence: 76 },
  { vendor: "Liberty Mutual", amount: "$845.20", date: "Mar 14", suggestion: "All Properties", confidence: 68 },
];

const breakdown = [
  { name: "Main St. Loft", count: 8 },
  { name: "Oak Ridge", count: 5 },
  { name: "Downtown Plaza", count: 3 },
  { name: "Unassigned", count: 4 },
];

export default function PropertyAssignmentPage() {
  return (
    <AppLayout>
      <PageHeader title="Property Assignment Review" breadcrumb={{ label: "Back to AI Review", href: "/transactions/ai-review" }} />
      <div className="grid grid-cols-[1fr_400px] gap-6">
        <div className="space-y-4">
          {items.map((item, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{item.vendor}</h3>
                  <p className="text-xl font-bold text-gray-800">{item.amount}</p>
                  <p className="text-sm text-gray-500">{item.date}</p>
                </div>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-100 text-green-700">AI: {item.suggestion} ({item.confidence}%)</span>
              </div>
              <select className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm">
                <option>{item.suggestion}</option><option>Main St. Loft</option><option>Oak Ridge</option><option>Downtown Plaza</option>
              </select>
            </div>
          ))}
        </div>
        <div className="sticky top-24">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Property Breakdown</h2>
            <div className="space-y-3 mb-6">
              {breakdown.map((b) => (
                <div key={b.name} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">{b.name}</span>
                  <span className="text-sm text-gray-500">{b.count} assigned</span>
                </div>
              ))}
            </div>
            <button className="w-full px-4 py-2.5 rounded-lg bg-[#7C3AED] text-white text-sm font-medium">Auto-Assign Remaining</button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
