import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { Plus } from "lucide-react";

const properties = [
  { name: "Main St. Loft", address: "456 Main St, Unit A-F, Brooklyn, NY", units: 6, occupancy: "92%", revenue: "$8,200/mo", status: "Active", statusColor: "bg-green-100 text-green-700", gradient: "from-purple-400 to-indigo-500", href: "/properties/main-st-loft" },
  { name: "Oak Ridge Estate", address: "123 Oak Ridge Dr, Greenwich, CT", units: 1, occupancy: "100%", revenue: "$4,500/mo", status: "Active", statusColor: "bg-green-100 text-green-700", gradient: "from-emerald-400 to-teal-500", href: "/properties/oak-ridge" },
  { name: "Downtown Plaza", address: "789 Commercial Ave, Manhattan, NY", units: 4, occupancy: "75%", revenue: "$6,000/mo", status: "Attention", statusColor: "bg-yellow-100 text-yellow-700", gradient: "from-amber-400 to-orange-500", href: "/properties/downtown-plaza" },
];

export default function PropertiesPage() {
  return (
    <AppLayout>
      <PageHeader title="Properties" subtitle="3 properties in portfolio" actions={<button className="flex items-center gap-2 bg-[#7C3AED] text-white text-sm font-semibold px-4 py-2 rounded-lg"><Plus size={16} />Add Property</button>} />
      <div className="grid grid-cols-3 gap-6">
        {properties.map((p) => (
          <Link key={p.name} href={p.href} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className={`h-40 bg-gradient-to-br ${p.gradient}`} />
            <div className="p-6">
              <h3 className="font-semibold text-lg text-gray-900">{p.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{p.address}</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-gray-500">Units</span><p className="font-semibold">{p.units}</p></div>
                <div><span className="text-gray-500">Occupancy</span><p className="font-semibold">{p.occupancy}</p></div>
                <div><span className="text-gray-500">Revenue</span><p className="font-semibold">{p.revenue}</p></div>
                <div><span className="text-gray-500">Status</span><p><span className={`text-xs font-medium px-2 py-0.5 rounded-full ${p.statusColor}`}>{p.status}</span></p></div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </AppLayout>
  );
}
