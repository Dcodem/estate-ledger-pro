import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";

const items = [
  { vendor: "Home Depot - Materials", amount: "$2,450.00", date: "Mar 15", category: "Capital Improvement", catColor: "bg-blue-100 text-blue-700", property: "Main St. Loft" },
  { vendor: "Stripe - Mktplace", amount: "$1,102.55", date: "Mar 13", category: "Needs Review", catColor: "bg-orange-100 text-orange-700", property: "Unassigned" },
  { vendor: "Roof Repair Contractor", amount: "$4,200.00", date: "Mar 10", category: "Maintenance", catColor: "bg-teal-100 text-teal-700", property: "Oak Ridge" },
];

export default function LargeTransactionsPage() {
  return (
    <AppLayout>
      <PageHeader title="Large Transactions" breadcrumb={{ label: "Back to AI Review", href: "/transactions/ai-review" }} actions={<span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-600">&gt; $1,000 threshold</span>} />
      <div className="grid grid-cols-[1fr_400px] gap-6">
        <div className="space-y-4">
          {items.map((item, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex gap-4">
                <div className="w-20 h-14 bg-gray-200 rounded flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.vendor}</h3>
                  <p className="text-2xl font-bold text-gray-800">{item.amount}</p>
                  <p className="text-sm text-gray-500 mt-1">{item.date}</p>
                  <div className="flex gap-2 mt-2">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${item.catColor}`}>{item.category}</span>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">{item.property}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button className="px-4 py-2 rounded-lg bg-green-500 text-white text-sm font-medium">Verify &amp; Approve</button>
                <button className="px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-medium">Flag for Review</button>
              </div>
            </div>
          ))}
        </div>
        <div className="sticky top-24">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Statistics</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm"><span className="text-gray-500">Total flagged</span><span className="font-semibold text-gray-800">$15,234.55</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Average size</span><span className="font-semibold text-gray-800">$5,078.18</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Count</span><span className="font-semibold text-gray-800">3 transactions</span></div>
            </div>
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase text-gray-500 tracking-wider mb-2">Monthly Comparison</p>
              <div className="flex gap-4 items-end h-24">
                <div className="flex-1 text-center"><div className="bg-[#7C3AED] rounded-t mx-auto" style={{height:"80px",width:"40px"}} /><p className="text-xs text-gray-500 mt-1">This Month</p></div>
                <div className="flex-1 text-center"><div className="bg-gray-300 rounded-t mx-auto" style={{height:"50px",width:"40px"}} /><p className="text-xs text-gray-500 mt-1">Last Month</p></div>
              </div>
            </div>
            <button className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700">Export Flagged</button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
