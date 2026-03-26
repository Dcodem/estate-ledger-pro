import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";

const queue = [
  { vendor: "Home Depot - Materials", amount: "$2,450.00", note: "Likely a capital improvement based on vendor history", category: "Capital Improvement", confidence: 94 },
  { vendor: "Stripe - Mktplace", amount: "$1,102.55", note: "Unable to determine category from transaction data", category: "Uncategorized", confidence: 32 },
  { vendor: "Amazon Business", amount: "$234.99", note: "Matches previous office supply purchases", category: "Office Supplies", confidence: 91 },
  { vendor: "Square Payment", amount: "$567.00", note: "Could be contractor or maintenance payment", category: "Contractor", confidence: 45 },
];

const similar = [
  { desc: "Home Depot - Lumber", amount: "$1,890.00", date: "Feb 22" },
  { desc: "Home Depot - Paint", amount: "$342.50", date: "Jan 15" },
  { desc: "Home Depot - Tools", amount: "$567.80", date: "Dec 8" },
];

export default function AIReviewPage() {
  return (
    <AppLayout>
      <PageHeader title="AI Review" subtitle="Automated analysis of your transactions" />
      <div className="grid grid-cols-[1fr_400px] gap-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Review Queue</h2>
          <div className="space-y-4">
            {queue.map((q, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{q.vendor}</h3>
                    <p className="text-xl font-bold text-gray-800">{q.amount}</p>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${q.confidence >= 80 ? "bg-green-100 text-green-700" : q.confidence >= 50 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>{q.category} ({q.confidence}%)</span>
                </div>
                <p className="text-sm italic text-gray-500 mb-4">{q.note}</p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-lg bg-green-500 text-white text-sm font-medium">Approve</button>
                  <button className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium">Reject</button>
                  <button className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700">Modify</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="sticky top-24">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Transaction Detail</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm"><span className="text-gray-500">Vendor</span><span className="font-medium text-gray-800">Home Depot</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Date</span><span className="font-medium text-gray-800">Mar 15, 2024</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Amount</span><span className="font-medium text-gray-800">$2,450.00</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Bank</span><span className="font-medium text-gray-800">Chase Business Checking</span></div>
            </div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Similar Past Transactions</h3>
            <div className="space-y-2 mb-6">
              {similar.map((s, i) => (
                <div key={i} className="flex justify-between text-sm p-2 bg-gray-50 rounded">
                  <span className="text-gray-700">{s.desc}</span>
                  <span className="text-gray-500">{s.amount}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mb-6">Based on vendor history and transaction pattern, this appears to be a capital improvement expense for property maintenance materials.</p>
            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2.5 rounded-lg bg-green-500 text-white text-sm font-semibold">Approve</button>
              <button className="flex-1 px-4 py-2.5 rounded-lg bg-red-500 text-white text-sm font-semibold">Reject</button>
              <button className="flex-1 px-4 py-2.5 rounded-lg border-2 border-gray-300 text-sm font-semibold text-gray-700">Modify</button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
