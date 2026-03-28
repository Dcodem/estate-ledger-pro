"use client";

import { useState, useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import KPICard from "@/components/KPICard";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { month: "Jan", revenue: 2800, expenses: 1900 },
  { month: "Feb", revenue: 3500, expenses: 1650 },
  { month: "Mar", revenue: 2100, expenses: 3100 },
  { month: "Apr", revenue: 4000, expenses: 1200 },
  { month: "May", revenue: 3300, expenses: 2100 },
  { month: "Jun", revenue: 4200, expenses: 950 },
];

const propertyRows = [
  {
    name: "Main St. Loft",
    slug: "main-st-loft",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVymTACY9v0mFrSi8Uy7lrlUj1ZOIOpw9KkM9Sy7xJDoH1Z4AZd6wyIVoO8kPcqbwJGtLP9qCnS523Nq861qySqCjZi9sgA1MTRjDEEZ9H_Hha4xFKkYQ_gArHOJeVrzkj1bkanww9Ns_Bpj78raU_QSn0qxrPRFRZRiSnjA0QzekSFjfBfFRHQqy0wicy1UN4zNhrshWdKr5PCcodrs8TKK9Fgw4Ker20PGzQ3Ik86F-VOwtYeKO_Pw2kB1idsa7nT_HAchfDo7TL",
    alt: "Interior",
    revenue: "$3,500",
    expenses: "$1,200",
    netIncome: "$2,300",
    roi: 6.5,
    status: "Stable",
    statusBg: "bg-green-100",
    statusText: "text-green-700",
  },
  {
    name: "Oak Ridge",
    slug: "oak-ridge",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDiH4ucfBZq-aBKooIKDgMKm5sifp-sI3GpZ_L786rFhJqOUgtFmxMc3F4K8Tt-vBFAmIZMYZ11lka0FlDY3eECX2hhV3AJcMq6V1SPnod7Vs5YB47B1wX2ZXYpRu6P-_35LTdRaXcsp6YC8W1QvKBiI4Rd1gdUUKm6dquhRPCfBVatptV_IWxeNKUoTmgirdIHIW765jLUi3asi_QpIi-vtDpDLztOSPY3lT_2SruyMR8wCYYrAR_pRTO0bL3kPrzcI8UF0w-qTWz9",
    alt: "Exterior",
    revenue: "$8,400",
    expenses: "$2,800",
    netIncome: "$5,600",
    roi: 8.2,
    status: "Growth",
    statusBg: "bg-teal-100",
    statusText: "text-teal-700",
  },
  {
    name: "Downtown Plaza",
    slug: "downtown-plaza",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMjOXxwYwr_TBnC21p3gxBMD4DDlhsYqU7WdMgtW1u01lACME2BxKkj2j7HgNY45UGKuxDJp8dR2bs96gGxP2aShbNXeFNsfJ7XpnH3SulesbzRrwWFuJozi3SAXGo7rfP-Ezc8OA1d0U6vGgj1wRmLXwrd57ws5mRg-IBVRcyH1n6TMTAyqOHWQW2L1_6x4773dqC5zCwphM0CeE-4ou7Kr0_KEmUh14pk77_PlOrsXG1hlu70nbm2Wi9jTjVNBTsDULV9xtumNmq",
    alt: "Commercial",
    revenue: "$6,800",
    expenses: "$3,100",
    netIncome: "$3,700",
    roi: 5.4,
    status: "Watchlist",
    statusBg: "bg-yellow-100",
    statusText: "text-yellow-700",
  },
];

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [exportState, setExportState] = useState<"idle" | "loading" | "done">("idle");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setLastUpdated(new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }));
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <AppLayout>
        <LoadingSkeleton />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {/* Page Header */}
      <PageHeader
        title="Performance Summary"
        subtitle={lastUpdated ? `Last updated at ${lastUpdated}` : undefined}
        badge="Jan 2024 - Jun 2024"
        actions={
          <button
            onClick={() => {
              if (exportState !== "idle") return;
              setExportState("loading");
              setTimeout(() => {
                setExportState("done");
                setTimeout(() => setExportState("idle"), 2000);
              }, 1500);
            }}
            disabled={exportState !== "idle"}
            className={`px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all shadow-sm ${
              exportState === "done"
                ? "bg-emerald-500 text-white"
                : exportState === "loading"
                  ? "bg-secondary/70 text-white cursor-wait"
                  : "bg-secondary text-white hover:bg-primary"
            }`}
          >
            <span className="material-symbols-outlined text-sm">
              {exportState === "done" ? "check" : exportState === "loading" ? "hourglass_top" : "picture_as_pdf"}
            </span>
            {exportState === "done" ? "Downloaded!" : exportState === "loading" ? "Exporting..." : "Export PDF"}
          </button>
        }
      />

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          label="Total Revenue"
          value="$18,700"
          icon="payments"
          trend="+12.4%"
          trendUp
          className="animate-fade-in-up stagger-1"
        />
        <KPICard
          label="Total Expenses"
          value="$110,500"
          icon="receipt_long"
          iconBg="bg-secondary-fixed-dim"
          iconColor="text-secondary"
          trend="-2.1%"
          trendUp={false}
          className="animate-fade-in-up stagger-2"
        />
        <KPICard
          label="Net Income"
          value="$7,200"
          icon="account_balance_wallet"
          iconBg="bg-primary/10"
          iconColor="text-primary"
          className="animate-fade-in-up stagger-3"
        />

        {/* Portfolio ROI - custom card with SVG circle */}
        <div className="bg-surface-container-lowest p-6 rounded-xl card-shadow flex items-center justify-between animate-fade-in-up stagger-4">
          <div>
            <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider">
              Portfolio ROI
            </p>
            <h3 className="text-2xl font-bold mt-1">8.42%</h3>
          </div>
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                className="text-surface-container-high"
                cx="28"
                cy="28"
                r="24"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="4"
              />
              <circle
                className="text-primary"
                cx="28"
                cy="28"
                r="24"
                fill="transparent"
                stroke="currentColor"
                strokeDasharray="150.79"
                strokeDashoffset="30"
                strokeWidth="4"
              />
            </svg>
            <span className="absolute text-[11px] font-bold">8.4%</span>
          </div>
        </div>
      </div>

      {/* Chart and Featured Asset */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Bar Chart Section */}
        <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-2xl card-shadow">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold">Revenue vs Expenses</h3>
              <p className="text-sm text-on-surface-variant">
                Comparative financial flow analysis
              </p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-xs font-medium">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-secondary-container" />
                <span className="text-xs font-medium">Expenses</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={chartData}
              margin={{ top: 0, right: 0, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#4a4455" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#4a4455" }}
                tickFormatter={(v: number) =>
                  v >= 1000 ? `$${v / 1000}k` : `$${v}`
                }
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                formatter={(value) => [`$${Number(value).toLocaleString()}`, undefined]}
              />
              <Bar
                dataKey="revenue"
                fill="var(--color-primary)"
                radius={[4, 4, 0, 0]}
                name="Revenue"
              />
              <Bar
                dataKey="expenses"
                fill="var(--color-secondary-container)"
                radius={[4, 4, 0, 0]}
                name="Expenses"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Asset Insight Card */}
        <Link href="/properties/oak-ridge" className="bg-surface-container-lowest overflow-hidden rounded-2xl card-shadow flex flex-col group hover:shadow-lg transition-shadow">
          <div className="relative h-48">
            <img
              alt="Luxury Modern Property"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHLvdysUjZvnc0vdp4nxsDYpNwIpt6PJNBCiz-72BLTZA8Nvkw6q4W9ZprwGYAqFIP7u01wNvDBe7OooZ_pmtnWe8Ipn2LVkQ1vpLBhq4YRiozBonXXvVNNDnlSGbMvO9lpXt9_6qvdmNrPKtzAt2c1jf3RasM3RrHcI_9hrthDglEIL-aknaVE3GPN5-DlNy2QQ6zRj0PhWiUFpY9kuVsnRniShJRQIa0qYGSbL1AtOr7H7HA_u2gBy0kAaJcFlGgJtkLbRJcr-6l"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 glass-effect text-[11px] font-bold rounded-full text-primary uppercase tracking-widest border border-white/20">
                Top Performer
              </span>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <h4 className="text-xl font-bold mb-1">Oak Ridge Estate</h4>
            <p className="text-xs text-on-surface-variant flex items-center gap-1 mb-6">
              <span className="material-symbols-outlined text-[14px]">location_on</span>
              Beverly Hills, CA
            </p>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant">Rent Collected</span>
                <span className="font-bold text-primary">$4,200</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant">Vacancy Rate</span>
                <span className="font-bold">0.0%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant">Maintenance</span>
                <span className="font-bold">$420</span>
              </div>
              <div className="flex justify-between items-center text-sm pt-3 border-t border-surface-container">
                <span className="font-bold">Net Yield</span>
                <span className="font-extrabold text-primary">12.4%</span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Property Comparison Table */}
      <div className="bg-surface-container-lowest p-8 rounded-2xl card-shadow">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold">Property Comparison</h3>
          <Link href="/properties" className="flex items-center gap-2 text-xs font-semibold text-primary cursor-pointer hover:underline">
            View Detailed Metrics
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest bg-surface-container-low">
                <th className="py-4 px-6 rounded-l-lg">Property</th>
                <th className="py-4 px-6">Revenue</th>
                <th className="py-4 px-6">Expenses</th>
                <th className="py-4 px-6">Net Income</th>
                <th className="py-4 px-6">ROI %</th>
                <th className="py-4 px-6 rounded-r-lg text-right">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {propertyRows.map((row) => (
                <tr key={row.name} className="hover:bg-slate-50 transition-colors cursor-pointer">
                  <td className="py-6 px-6 font-bold">
                    <Link href={`/properties/${row.slug}`} className="flex items-center gap-3 hover:text-primary transition-colors">
                      <div className="w-10 h-10 rounded bg-slate-100 overflow-hidden shrink-0">
                        <img
                          alt={row.alt}
                          className="w-full h-full object-cover"
                          src={row.img}
                        />
                      </div>
                      {row.name}
                    </Link>
                  </td>
                  <td className="py-6 px-6">{row.revenue}</td>
                  <td className="py-6 px-6">{row.expenses}</td>
                  <td className="py-6 px-6 font-semibold">{row.netIncome}</td>
                  <td className="py-6 px-6">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 w-16 bg-surface-container-high rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${(row.roi / 10) * 100}%` }}
                        />
                      </div>
                      {row.roi}%
                    </div>
                  </td>
                  <td className="py-6 px-6 text-right">
                    <span
                      className={`px-3 py-1 ${row.statusBg} ${row.statusText} text-[11px] font-bold rounded-full`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
