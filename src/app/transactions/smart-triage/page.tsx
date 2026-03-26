"use client";

import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";
import { useState } from "react";

const triageCards = [
  {
    vendor: "Stripe - Mktplace",
    date: "Mar 13",
    icon: "payments",
    suggestion: "Maintenance",
    confidence: 72,
    confDotClass: "bg-yellow-500",
    confBgClass: "bg-yellow-50",
    confTextClass: "text-yellow-700",
    amount: "$1,102.55",
  },
  {
    vendor: "Amazon Business",
    date: "Mar 11",
    icon: "shopping_bag",
    suggestion: "Office Supplies",
    confidence: 91,
    confDotClass: "bg-green-500",
    confBgClass: "bg-green-50",
    confTextClass: "text-green-700",
    amount: "$234.99",
  },
  {
    vendor: "Square Payment",
    date: "Mar 10",
    icon: "person",
    suggestion: "Contractor",
    confidence: 45,
    confDotClass: "bg-error",
    confBgClass: "bg-error-container",
    confTextClass: "text-on-error-container",
    amount: "$567.00",
  },
];

const tabs = ["All", "High Confidence", "Medium", "Low"];

export default function SmartTriagePage() {
  const [activeTab, setActiveTab] = useState("All");
  const filteredCards = triageCards.filter((c) => {
    if (activeTab === "High Confidence") return c.confidence >= 85;
    if (activeTab === "Medium") return c.confidence >= 50 && c.confidence < 85;
    if (activeTab === "Low") return c.confidence < 50;
    return true;
  });

  return (
    <AppLayout>
      {/* Header */}
      <PageHeader
        title="Smart Triage"
        subtitle="AI-suggested categorizations for review"
        breadcrumb={{ label: "Back to Transactions", href: "/transactions" }}
      />

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-xl w-fit">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === t
                ? "bg-white shadow-sm text-primary"
                : "text-on-surface-variant hover:bg-white/50 font-medium"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Triage Cards */}
      <div className="space-y-6">
        {filteredCards.map((c, i) => (
          <div
            key={i}
            className="bg-surface-container-lowest rounded-2xl p-8 card-shadow flex items-center justify-between group transition-colors duration-200"
          >
            {/* Left side: icon + info */}
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-xl bg-surface-container-high flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">
                  {c.icon}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold text-on-surface">
                    {c.vendor}
                  </h3>
                  <span className="text-on-surface-variant text-sm font-medium">
                    {c.date}
                  </span>
                </div>
                <div className="flex items-center mt-2 gap-4">
                  <div className="flex items-center">
                    <span className="text-on-surface-variant text-sm mr-2">
                      AI suggests:
                    </span>
                    <span className="bg-surface-container px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wider">
                      {c.suggestion}
                    </span>
                  </div>
                  <div
                    className={`flex items-center ${c.confBgClass} px-3 py-1 rounded-full`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${c.confDotClass} mr-2`}
                    />
                    <span className={`${c.confTextClass} text-xs font-bold`}>
                      {c.confidence}% confidence
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: amount + actions */}
            <div className="flex items-center gap-10 text-right">
              <div>
                <div
                  className="text-xl font-bold text-on-surface"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {c.amount}
                </div>
                <div className="text-xs text-on-surface-variant mt-1 font-semibold uppercase tracking-widest">
                  Amount
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-low text-on-surface-variant hover:bg-primary hover:text-white transition-all">
                  <span className="material-symbols-outlined text-[20px]">edit</span>
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-low text-on-surface-variant hover:bg-error hover:text-white transition-all">
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
                <button className="px-6 py-2 rounded-full bg-primary text-white font-bold text-sm shadow-md shadow-primary/20 hover:opacity-90 active:scale-95 transition-all">
                  Accept
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Help */}
      <div className="mt-6 text-center border-t border-dashed border-outline-variant pt-10">
        <p className="text-on-surface-variant font-medium mb-4">
          Need help categorizing a complex transaction?
        </p>
        <button className="text-primary font-bold hover:underline flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined mr-2">support_agent</span>
          Ask your concierge
        </button>
      </div>
    </AppLayout>
  );
}
