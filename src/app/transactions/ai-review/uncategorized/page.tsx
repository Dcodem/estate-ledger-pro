import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";

const items = [
  { date: "Mar 13", vendor: "Stripe Mktplace", amount: "$1,102.55", bank: "Chase" },
  { date: "Mar 10", vendor: "PayPal Transfer", amount: "$890.00", bank: "Wells Fargo" },
  { date: "Mar 8", vendor: "Venmo Payment", amount: "$445.20", bank: "Chase" },
  { date: "Mar 5", vendor: "Cash Deposit", amount: "$2,000.00", bank: "Amex" },
];

const sources = [
  { name: "Chase", count: 5, color: "bg-blue-500", width: "w-[42%]" },
  { name: "Wells Fargo", count: 4, color: "bg-green-500", width: "w-[33%]" },
  { name: "Amex", count: 3, color: "bg-purple-500", width: "w-[25%]" },
];

export default function UncategorizedPage() {
  return (
    <AppLayout>
      <PageHeader title="Uncategorized Transactions" subtitle="" breadcrumb={{ label: "Back to AI Review", href: "/transactions/ai-review" }} actions={<span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-600">12 items</span>} />
      <div className="grid grid-cols-[1fr_400px] gap-6">
        <div className="space-y-4">
          {items.map((item, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">{item.date}</p>
                  <h3 className="font-semibold text-gray-900 text-lg">{item.vendor}</h3>
                  <p className="text-xl font-semibold text-gray-800">{item.amount}</p>
                  <p className="text-sm text-gray-500">Source: {item.bank}</p>
                </div>
              </div>
              <div className="flex gap-4 mb-4">
                <select className="flex-1 h-11 px-4 rounded-lg border border-gray-200 text-sm"><option>Assign Category</option><option>Maintenance</option><option>Utilities</option><option>Insurance</option></select>
                <select className="flex-1 h-11 px-4 rounded-lg border border-gray-200 text-sm"><option>Assign Property</option><option>Main St. Loft</option><option>Oak Ridge</option><option>Downtown Plaza</option></select>
              </div>
              <button className="px-4 py-2 rounded-lg bg-[#7C3AED] text-white text-sm font-medium">Save</button>
            </div>
          ))}
        </div>
        <div className="sticky top-24">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Summary</h2>
            <div className="space-y-3 mb-6">
              {sources.map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between text-sm mb-1"><span className="text-gray-700">{s.name}</span><span className="text-gray-500">{s.count}</span></div>
                  <div className="h-3 bg-gray-100 rounded-full"><div className={`h-3 ${s.color} rounded-full ${s.width}`} /></div>
                </div>
              ))}
            </div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700">Assign all to Maintenance</button>
              <button className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700">Assign all to Main St. Loft</button>
              <button className="w-full px-4 py-2.5 rounded-lg bg-[#7C3AED] text-white text-sm font-medium">Mark All as Reviewed</button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
