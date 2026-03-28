"use client";
import { useState, useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";
import { SkeletonPulse } from "@/components/LoadingSkeleton";
import Link from "next/link";

const properties = [
  {
    name: "Main St. Loft",
    slug: "main-st-loft",
    location: "Downtown District",
    occupancy: "92%",
    occupancyNote: "6 units total",
    yield: "$8,200",
    status: "Active",
    statusColor: "bg-green-100/90 text-green-700",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuATEt7tgpb6XS9AZciyqwO-lUbRJkafEHby7BGUW6UWQ5rWBMr8VijcPZRMgkIYUByeAuEXd5SnJOB9HvXG8ulUTSxNcSlGaYu1oQMGWZ11hzuiuWvKnxk4khzD6q-fL_tAuDO0W8EOXJl3qXUy1lnU-j8C1zWlCwo5rmhJj5P6BGt36FHNdBcIug9Ap-64_Gbg0TEdqJHvDIkj4bjDirMtLDl4gEVt6SJUoxZTh8Df42XuDuBvKVoeb30RDg6HXRXFRgPH9XIuPcS3",
    avatars: ["AS", "MK"],
  },
  {
    name: "Oak Ridge Estate",
    slug: "oak-ridge",
    location: "North Highlands",
    occupancy: "100%",
    occupancyNote: "Single unit",
    yield: "$4,500",
    status: "Active",
    statusColor: "bg-green-100/90 text-green-700",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBM1qBF_qesiMI7AFje_F_zGzA-k2Ca2G18TnBV3tnFQGDDBN9AT_pM5WG9Zz4Zos6PntT8CmCxH76DuUHvpl2x6eb49ba6j6VW8HxoJeLD4AqHCg8QRdF0zy10Bwzn0vVswIgDDAYkwyVNCqcimb72A8EJkDSGLl6cDxkqp8asytmIxMUxP6hfSTBCTa2GXC8vQN6YvwXMc1hLkfRVkIRqeukyzKhkntjzCXK7T2maMY7Oeex4jAwOQTaSHJFhGA5_s_E1CqFStuOw",
    avatars: ["RB"],
  },
  {
    name: "Downtown Plaza",
    slug: "downtown-plaza",
    location: "Business District",
    occupancy: "75%",
    occupancyNote: "4 units total",
    occupancyColor: "text-error",
    yield: "$6,000",
    status: "Attention",
    statusColor: "bg-amber-100/90 text-amber-700",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyFIdsKID_haOZAONiZxzY3CcUedKeS3rYg7HuXwQi6ZyC550OMFHvsO-XggctDoGnpzca7wMsGw2PcLH25VRE2iGQCKlIlGy_NMtmciRojEJkcBFHtdot4Jq-y76IB3y5sjcRprFHiQyPFQWsIO5Ksw-KFVtKrI_dDej16mCFBsb86wYtN40bhrKtQ0mXBV3g-pxQjjq5glCuZ8GGiw6XhaW3b7SHRwZ08jaYiCYetcDlDU0FX5XnUSR97NleCjf8Dii7MdcXLFhr",
    avatars: ["JD", "LM", "TC"],
  },
];

const chartBars = [
  { height: "40%", label: "Jan", value: "$14.2k" },
  { height: "55%", label: "Feb", value: "$19.6k" },
  { height: "45%", label: "Mar", value: "$16.0k" },
  { height: "70%", label: "Apr", value: "$24.9k" },
  { height: "65%", label: "May", value: "$23.1k" },
  { height: "85%", label: "Jun", value: "$30.2k" },
  { height: "100%", label: "Jul", value: "$35.6k", current: true },
];

export default function PropertiesPage() {
  const [filterActive, setFilterActive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <AppLayout>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <SkeletonPulse className="w-40 h-8" />
              <SkeletonPulse className="w-56 h-4" />
            </div>
            <SkeletonPulse className="w-24 h-10 rounded-xl" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-surface-container-lowest rounded-xl card-shadow overflow-hidden">
                <SkeletonPulse className="h-48 w-full rounded-none" />
                <div className="p-6 space-y-4">
                  <SkeletonPulse className="w-32 h-5" />
                  <SkeletonPulse className="w-24 h-3" />
                  <div className="grid grid-cols-2 gap-4">
                    <SkeletonPulse className="h-20 rounded-lg" />
                    <SkeletonPulse className="h-20 rounded-lg" />
                  </div>
                  <SkeletonPulse className="w-full h-8" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-8">
            <SkeletonPulse className="flex-[2] h-64 rounded-xl" />
            <SkeletonPulse className="flex-1 h-64 rounded-xl" />
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <PageHeader
        title="Properties"
        subtitle="3 properties in portfolio"
        actions={
          <button
            onClick={() => setFilterActive(!filterActive)}
            className={`flex items-center gap-2 px-4 py-2 font-semibold rounded-xl text-sm transition-colors ${
              filterActive
                ? "bg-primary text-white"
                : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">{filterActive ? "filter_list_off" : "filter_list"}</span>
            {filterActive ? "Filtering" : "Filter"}
          </button>
        }
      />

      {/* Property Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {properties.map((p, i) => (
          <Link
            key={p.name}
            href={`/properties/${p.slug}`}
            className={`bg-surface-container-lowest rounded-xl card-shadow overflow-hidden group hover:translate-y-[-4px] transition-all duration-300 block animate-fade-in-up stagger-${i + 1}`}
          >
            <div className="h-48 relative overflow-hidden">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={p.image}
                alt={p.name}
              />
              <div className={`absolute top-4 right-4 px-3 py-1 backdrop-blur text-[11px] font-bold rounded-full uppercase tracking-wider ${p.statusColor}`}>
                {p.status}
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-on-surface font-headline leading-tight">{p.name}</h3>
                  <p className="text-xs text-on-surface-variant mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                    {p.location}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-surface-container-low p-3 rounded-lg">
                  <p className="text-[11px] text-on-surface-variant font-semibold uppercase tracking-wider">Occupancy</p>
                  <p className={`text-xl font-bold ${p.occupancyColor || "text-on-surface"}`}>{p.occupancy}</p>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">{p.occupancyNote}</p>
                </div>
                <div className="bg-surface-container-low p-3 rounded-lg">
                  <p className="text-[11px] text-on-surface-variant font-semibold uppercase tracking-wider">Monthly Yield</p>
                  <p className="text-xl font-bold text-primary">{p.yield}</p>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">Average/Mo</p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                <div className="flex -space-x-2">
                  {p.avatars.map((a) => (
                    <div key={a} className="w-7 h-7 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[11px] font-bold">
                      {a}
                    </div>
                  ))}
                </div>
                <span className="text-primary text-xs font-bold flex items-center gap-1 group-hover:underline">
                  View Details
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Portfolio Growth & Equity Section */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-surface-container-low rounded-xl p-8 h-full">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold font-headline text-on-surface">Portfolio Growth</h2>
                <p className="text-xs text-on-surface-variant mt-0.5">Combined monthly revenue across all properties</p>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-white rounded-full text-[11px] font-bold text-on-surface-variant shadow-sm">Monthly</span>
                <span className="px-3 py-1 bg-primary text-white rounded-full text-[11px] font-bold shadow-sm">Yearly</span>
              </div>
            </div>
            <div className="aspect-[21/9] w-full flex items-end gap-3 px-4">
              {chartBars.map((bar) => (
                <div
                  key={bar.label}
                  className={`flex-1 rounded-t-lg transition-all relative group ${bar.current ? "bg-primary" : "bg-primary/10 hover:bg-primary/20"}`}
                  style={{ height: bar.height }}
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-inverse-surface text-white text-[11px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold">
                    {bar.value}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 px-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">
              {chartBars.map((bar) => (
                <span key={bar.label}>{bar.label}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:w-1/3">
          <div className="bg-primary p-8 rounded-xl text-white flex flex-col justify-between h-full shadow-xl shadow-primary/10">
            <div>
              <span className="material-symbols-outlined bg-white/20 p-3 rounded-2xl mb-6 inline-block">account_balance_wallet</span>
              <p className="text-primary-fixed/60 text-xs font-bold uppercase tracking-widest mb-1">Total Equity</p>
              <p className="text-4xl font-extrabold font-headline">$2,450,000</p>
              <div className="mt-4 flex items-center gap-2 text-green-300 text-sm font-semibold">
                <span className="material-symbols-outlined text-[20px]">trending_up</span>
                +12.4% vs last year
              </div>
              <p className="mt-2 text-[11px] text-white/50 leading-relaxed">
                Based on Zillow Zestimate data and recent comparable sales. Updated monthly.
              </p>
            </div>
            <div className="mt-8 pt-8 border-t border-white/10">
              <Link href="/reports/exports" className="w-full py-3 bg-white text-primary font-bold rounded-xl text-sm hover:bg-slate-50 transition-colors block text-center">
                Download Statement
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
