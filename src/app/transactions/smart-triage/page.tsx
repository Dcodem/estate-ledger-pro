"use client";

import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";
import { useState } from "react";

const categories = [
  "Maintenance",
  "Office Supplies",
  "Contractor",
  "Rental Income",
  "Insurance",
  "Utilities",
  "Capital Improvement",
];

const properties = [
  "Downtown Plaza",
  "Main St. Loft",
  "Oak Ridge Estate",
];

interface ReviewCard {
  id: number;
  vendor: string;
  date: string;
  icon: string;
  suggestion: string;
  confidence: number;
  confDotClass: string;
  confBgClass: string;
  confTextClass: string;
  amount: string;
  property: string;
  source: string;
  location: string;
  ref: string;
  recommendation: string;
  similarTransactions: { vendor: string; date: string; amount: string }[];
}

const initialCards: ReviewCard[] = [
  {
    id: 1,
    vendor: "Stripe - Mktplace",
    date: "Mar 13",
    icon: "payments",
    suggestion: "Maintenance",
    confidence: 72,
    confDotClass: "bg-yellow-500",
    confBgClass: "bg-yellow-50",
    confTextClass: "text-yellow-700",
    amount: "$1,102.55",
    property: "Downtown Plaza",
    source: "Chase Platinum (***8842)",
    location: "Beverly Hills, CA",
    ref: "#TX-90210-44",
    recommendation:
      "This transaction is likely a marketplace payment processed through Stripe. Based on the amount and vendor, we recommend classifying under Maintenance for the Downtown Plaza property.",
    similarTransactions: [
      { vendor: "Stripe - Mktplace", date: "Feb 14, 2024", amount: "$980.00" },
      { vendor: "Stripe - Mktplace", date: "Jan 15, 2024", amount: "$1,102.55" },
    ],
  },
  {
    id: 2,
    vendor: "Amazon Business",
    date: "Mar 11",
    icon: "shopping_bag",
    suggestion: "Office Supplies",
    confidence: 91,
    confDotClass: "bg-green-500",
    confBgClass: "bg-green-50",
    confTextClass: "text-green-700",
    amount: "$234.99",
    property: "Main St. Loft",
    source: "Wells Fargo (***3391)",
    location: "Los Angeles, CA",
    ref: "#TX-90210-41",
    recommendation:
      "High confidence match for Office Supplies. Amazon Business purchases for this account have been consistently categorized under this category for the past 6 months.",
    similarTransactions: [
      { vendor: "Amazon Business", date: "Feb 22, 2024", amount: "$189.50" },
      { vendor: "Amazon Business", date: "Jan 30, 2024", amount: "$312.00" },
      { vendor: "Amazon Business", date: "Dec 15, 2023", amount: "$95.40" },
    ],
  },
  {
    id: 3,
    vendor: "Square Payment",
    date: "Mar 10",
    icon: "person",
    suggestion: "Contractor",
    confidence: 45,
    confDotClass: "bg-error",
    confBgClass: "bg-error-container",
    confTextClass: "text-on-error-container",
    amount: "$567.00",
    property: "Oak Ridge Estate",
    source: "Chase Platinum (***8842)",
    location: "Malibu, CA",
    ref: "#TX-90210-39",
    recommendation:
      "Low confidence classification. Square Payment is associated with multiple categories across your properties. The amount suggests a contractor payment, but manual verification is recommended.",
    similarTransactions: [
      { vendor: "Square Payment", date: "Feb 5, 2024", amount: "$450.00" },
      { vendor: "Square Inc.", date: "Jan 22, 2024", amount: "$567.00" },
    ],
  },
  {
    id: 4,
    vendor: "Lowe's Home Improvement",
    date: "Mar 8",
    icon: "hardware",
    suggestion: "Capital Improvement",
    confidence: 98,
    confDotClass: "bg-green-500",
    confBgClass: "bg-green-50",
    confTextClass: "text-green-700",
    amount: "$2,450.00",
    property: "Oak Ridge Estate",
    source: "Amex Gold (***7724)",
    location: "Beverly Hills, CA",
    ref: "#TX-90210-36",
    recommendation:
      "This transaction matches 4 previous entries for \"HVAC Maintenance\" at the Oak Ridge Estate. Based on the amount and vendor category, we recommend assigning this to Capital Improvements for tax depreciation purposes.",
    similarTransactions: [
      { vendor: "Home Depot", date: "Feb 12, 2024", amount: "$1,890.00" },
      { vendor: "Lowe's Home Improvement", date: "Jan 5, 2024", amount: "$450.00" },
      { vendor: "Ace Hardware", date: "Dec 20, 2023", amount: "$124.50" },
    ],
  },
  {
    id: 5,
    vendor: "Standard Insurance Co.",
    date: "Mar 5",
    icon: "shield",
    suggestion: "Insurance",
    confidence: 94,
    confDotClass: "bg-green-500",
    confBgClass: "bg-green-50",
    confTextClass: "text-green-700",
    amount: "$1,120.50",
    property: "Downtown Plaza",
    source: "Wells Fargo (***3391)",
    location: "Los Angeles, CA",
    ref: "#TX-90210-33",
    recommendation:
      "Recurring quarterly insurance premium detected. This matches the pattern from the previous 3 quarters. Recommend classifying under Insurance for consistent reporting.",
    similarTransactions: [
      { vendor: "Standard Insurance Co.", date: "Dec 5, 2023", amount: "$1,120.50" },
      { vendor: "Standard Insurance Co.", date: "Sep 5, 2023", amount: "$1,080.00" },
    ],
  },
  {
    id: 6,
    vendor: "Precision Pool Service",
    date: "Mar 3",
    icon: "pool",
    suggestion: "Utilities",
    confidence: 100,
    confDotClass: "bg-green-500",
    confBgClass: "bg-green-50",
    confTextClass: "text-green-700",
    amount: "$175.00",
    property: "Oak Ridge Estate",
    source: "Chase Platinum (***8842)",
    location: "Beverly Hills, CA",
    ref: "#TX-90210-30",
    recommendation:
      "Monthly pool service charge. Vendor and amount match the recurring pattern exactly. High confidence auto-classification.",
    similarTransactions: [
      { vendor: "Precision Pool Service", date: "Feb 3, 2024", amount: "$175.00" },
      { vendor: "Precision Pool Service", date: "Jan 3, 2024", amount: "$175.00" },
    ],
  },
  {
    id: 7,
    vendor: "Amazon Marketplace",
    date: "Mar 1",
    icon: "shopping_cart",
    suggestion: "Office Supplies",
    confidence: 62,
    confDotClass: "bg-yellow-500",
    confBgClass: "bg-yellow-50",
    confTextClass: "text-yellow-700",
    amount: "$89.42",
    property: "Main St. Loft",
    source: "Amex Gold (***7724)",
    location: "Online",
    ref: "#TX-90210-28",
    recommendation:
      "Unable to determine property association with high confidence. The vendor \"Amazon Marketplace\" has been linked to 3 different properties in the past. Manual review is recommended.",
    similarTransactions: [
      { vendor: "Amazon Business", date: "Feb 28, 2024", amount: "$234.99" },
      { vendor: "Amazon Marketplace", date: "Jan 10, 2024", amount: "$67.80" },
    ],
  },
];

const tabs = ["All", "High Confidence", "Medium", "Low"];

type DismissDirection = "right" | "left";

interface DismissingState {
  id: number;
  direction: DismissDirection;
}

interface ResolvedItem {
  card: ReviewCard;
  action: "accepted" | "skipped";
}

export default function TransactionReviewPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [cards, setCards] = useState<ReviewCard[]>(initialCards);
  const [resolved, setResolved] = useState<ResolvedItem[]>([]);
  const [dismissing, setDismissing] = useState<DismissingState | null>(null);
  const [activeId, setActiveId] = useState<number>(initialCards[0].id);

  // Edit modal state
  const [editingCard, setEditingCard] = useState<ReviewCard | null>(null);
  const [editCategory, setEditCategory] = useState("");
  const [editProperty, setEditProperty] = useState("");
  const [conciergeToast, setConciergeToast] = useState(false);

  const pendingCards = cards.filter(
    (c) => !resolved.find((r) => r.card.id === c.id)
  );

  const skippedCards = resolved
    .filter((r) => r.action === "skipped")
    .map((r) => r.card);

  const acceptedCards = resolved
    .filter((r) => r.action === "accepted")
    .map((r) => r.card);

  const filteredCards = pendingCards.filter((c) => {
    if (activeTab === "High Confidence") return c.confidence >= 85;
    if (activeTab === "Medium") return c.confidence >= 50 && c.confidence < 85;
    if (activeTab === "Low") return c.confidence < 50;
    return true;
  });

  const activeItem = cards.find((c) => c.id === activeId) ?? filteredCards[0];

  const handleAccept = (card: ReviewCard) => {
    setDismissing({ id: card.id, direction: "right" });
    setTimeout(() => {
      setResolved((prev) => [...prev, { card, action: "accepted" }]);
      setDismissing(null);
      const remaining = pendingCards.filter((p) => p.id !== card.id);
      if (remaining.length > 0) {
        setActiveId(remaining[0].id);
      }
    }, 300);
  };

  const handleSkip = (card: ReviewCard) => {
    setDismissing({ id: card.id, direction: "left" });
    setTimeout(() => {
      setResolved((prev) => [...prev, { card, action: "skipped" }]);
      setDismissing(null);
      const remaining = pendingCards.filter((p) => p.id !== card.id);
      if (remaining.length > 0) {
        setActiveId(remaining[0].id);
      }
    }, 300);
  };

  const handleUndo = (id: number) => {
    setResolved((prev) => prev.filter((r) => r.card.id !== id));
    setActiveId(id);
  };

  const handleReconsider = (card: ReviewCard) => {
    setResolved((prev) => prev.filter((r) => r.card.id !== card.id));
    setActiveId(card.id);
  };

  const openEditModal = (card: ReviewCard) => {
    setEditingCard(card);
    setEditCategory(card.suggestion);
    setEditProperty(card.property);
  };

  const closeEditModal = () => {
    setEditingCard(null);
    setEditCategory("");
    setEditProperty("");
  };

  const saveEdits = () => {
    if (!editingCard) return;
    setCards((prev) =>
      prev.map((c) =>
        c.id === editingCard.id
          ? { ...c, suggestion: editCategory, property: editProperty }
          : c
      )
    );
    closeEditModal();
  };

  const pendingCount = filteredCards.length - (dismissing ? 1 : 0);

  return (
    <AppLayout>
      <PageHeader
        title="Transaction Review"
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

      <div className="flex gap-10 items-start">
        {/* LEFT: Review Queue */}
        <section className="flex-1 min-w-0 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-on-surface">Review Queue</h3>
            <span className="bg-primary-fixed text-on-primary-fixed-variant px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
              {pendingCount} Pending
            </span>
          </div>

          {filteredCards.length === 0 && !dismissing && (
            <div className="text-center py-16 text-on-surface-variant">
              <span className="material-symbols-outlined text-5xl mb-4 block opacity-30">
                task_alt
              </span>
              <p className="font-medium">All transactions reviewed!</p>
              <p className="text-sm mt-1 opacity-70">
                Check the resolved sections below for your decisions.
              </p>
            </div>
          )}

          {filteredCards.map((c) => {
            const isDismissing = dismissing?.id === c.id;
            const direction = dismissing?.direction;
            const isActive = activeItem?.id === c.id && !isDismissing;

            return (
              <div
                key={c.id}
                onClick={() => !isDismissing && setActiveId(c.id)}
                className={`bg-surface-container-lowest rounded-2xl p-7 card-shadow cursor-pointer group ${
                  isActive
                    ? "border-l-4 border-primary ring-1 ring-primary/10"
                    : "opacity-80 hover:opacity-100"
                }`}
                style={{
                  transition:
                    "transform 300ms ease-in-out, opacity 300ms ease-in-out",
                  transform: isDismissing
                    ? direction === "right"
                      ? "translateX(120%)"
                      : "translateX(-120%)"
                    : "translateX(0)",
                  opacity: isDismissing ? 0 : 1,
                }}
              >
                {/* Top row: icon + info + amount */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary text-xl">
                        {c.icon}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h4 className="text-base font-bold text-on-surface">
                          {c.vendor}
                        </h4>
                        <span className="text-on-surface-variant text-sm font-medium">
                          {c.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="material-symbols-outlined text-on-surface-variant text-[14px]">
                          location_on
                        </span>
                        <span className="text-on-surface-variant text-xs font-medium">
                          {c.property}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div
                      className="text-xl font-bold text-on-surface"
                      style={{ fontFamily: "'Manrope', sans-serif" }}
                    >
                      {c.amount}
                    </div>
                    <div className="text-[10px] text-on-surface-variant mt-0.5 font-semibold uppercase tracking-widest">
                      Amount
                    </div>
                  </div>
                </div>

                {/* Bottom row: badges + actions */}
                <div className="flex items-center justify-between mt-5">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center">
                      <span className="text-on-surface-variant text-xs mr-2">
                        AI suggests:
                      </span>
                      <span className="bg-surface-container px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wider">
                        {c.suggestion}
                      </span>
                    </div>
                    <div
                      className={`flex items-center ${c.confBgClass} px-2.5 py-1 rounded-full`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${c.confDotClass} mr-1.5`}
                      />
                      <span className={`${c.confTextClass} text-xs font-bold`}>
                        {c.confidence}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditModal(c);
                      }}
                      className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-container-low text-on-surface-variant hover:bg-primary hover:text-white transition-all"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        edit
                      </span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSkip(c);
                      }}
                      className="px-5 py-2 rounded-full border border-outline-variant text-on-surface-variant font-bold text-xs hover:bg-error/10 hover:text-error hover:border-error/30 active:scale-95 transition-all"
                    >
                      Skip
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAccept(c);
                      }}
                      className="px-5 py-2 rounded-full bg-primary text-white font-bold text-xs shadow-md shadow-primary/20 hover:opacity-90 active:scale-95 transition-all"
                    >
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Skipped Items Section */}
          {skippedCards.length > 0 && (
            <div className="mt-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-on-surface-variant text-xl">
                  undo
                </span>
                <h2 className="text-base font-bold text-on-surface-variant uppercase tracking-wider">
                  Skipped Items
                </h2>
                <span className="bg-surface-container-high text-on-surface-variant text-xs font-bold px-2.5 py-0.5 rounded-full">
                  {skippedCards.length}
                </span>
              </div>
              <div className="space-y-3">
                {skippedCards.map((c) => (
                  <div
                    key={c.id}
                    className="bg-surface-container-low/60 rounded-xl p-5 flex items-center justify-between border border-dashed border-outline-variant"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center opacity-60">
                        <span className="material-symbols-outlined text-on-surface-variant text-lg">
                          {c.icon}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-on-surface-variant">
                            {c.vendor}
                          </h4>
                          <span className="text-on-surface-variant/60 text-xs">
                            {c.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="bg-surface-container px-2.5 py-0.5 rounded-full text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                            {c.suggestion}
                          </span>
                          <div
                            className={`flex items-center ${c.confBgClass} px-2 py-0.5 rounded-full`}
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${c.confDotClass} mr-1`}
                            />
                            <span
                              className={`${c.confTextClass} text-[10px] font-bold`}
                            >
                              {c.confidence}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className="text-base font-bold text-on-surface-variant"
                        style={{ fontFamily: "'Manrope', sans-serif" }}
                      >
                        {c.amount}
                      </span>
                      <button
                        onClick={() => handleReconsider(c)}
                        className="px-4 py-2 rounded-full border-2 border-primary text-primary font-bold text-xs hover:bg-primary hover:text-white active:scale-95 transition-all"
                      >
                        Reconsider
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recently Reviewed Section */}
          {acceptedCards.length > 0 && (
            <div className="mt-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-on-surface-variant text-xl">
                  checklist
                </span>
                <h2 className="text-base font-bold text-on-surface-variant uppercase tracking-wider">
                  Recently Reviewed
                </h2>
                <span className="bg-surface-container-high text-on-surface-variant text-xs font-bold px-2.5 py-0.5 rounded-full">
                  {acceptedCards.length}
                </span>
              </div>
              <div className="space-y-3">
                {acceptedCards.map((c) => (
                  <div
                    key={c.id}
                    className="bg-surface-container-low/60 rounded-xl p-5 flex items-center justify-between border border-dashed border-outline-variant"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[18px]">
                          check_circle
                        </span>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-on-surface-variant">
                          {c.vendor}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-bold text-emerald-600 uppercase tracking-tight">
                            Accepted
                          </span>
                          <span className="text-on-surface-variant/40 text-xs">
                            &middot;
                          </span>
                          <span className="text-on-surface-variant/60 text-xs">
                            {c.suggestion}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-5">
                      <span
                        className="text-base font-bold text-on-surface-variant"
                        style={{ fontFamily: "'Manrope', sans-serif" }}
                      >
                        {c.amount}
                      </span>
                      <button
                        onClick={() => handleUndo(c.id)}
                        className="px-4 py-2 rounded-lg border border-outline-variant text-on-surface-variant font-bold text-xs hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all"
                      >
                        Undo
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer Help */}
          <div className="mt-6 text-center border-t border-dashed border-outline-variant pt-10">
            <p className="text-on-surface-variant font-medium mb-4">
              Need help categorizing a complex transaction?
            </p>
            <button
              onClick={() => { setConciergeToast(true); setTimeout(() => setConciergeToast(false), 3000); }}
              className="text-primary font-bold hover:underline flex items-center justify-center mx-auto"
            >
              <span className="material-symbols-outlined mr-2">
                support_agent
              </span>
              {conciergeToast ? "Message sent to concierge!" : "Ask your concierge"}
            </button>
          </div>
        </section>

        {/* RIGHT: Transaction Detail Panel */}
        {activeItem &&
          !resolved.find((r) => r.card.id === activeItem.id) && (
            <aside className="w-[400px] sticky top-24 shrink-0">
              <div className="bg-surface-container-lowest p-8 rounded-xl card-shadow ring-1 ring-slate-100">
                {/* Header */}
                <div className="text-center mb-8 pb-8 border-b border-slate-50">
                  <div className="w-14 h-14 bg-primary-fixed text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-2xl">
                      {activeItem.icon}
                    </span>
                  </div>
                  <h3
                    className="text-xl font-extrabold text-on-surface"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    {activeItem.vendor}
                  </h3>
                  <p className="text-[13px] font-medium text-on-surface-variant mt-1">
                    {activeItem.ref}
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Detail Grid */}
                  <div className="grid grid-cols-2 gap-y-5">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">
                        Date
                      </p>
                      <p className="text-sm font-semibold text-on-surface">
                        {activeItem.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">
                        Amount
                      </p>
                      <p
                        className="text-lg font-extrabold text-on-surface"
                        style={{ fontFamily: "'Manrope', sans-serif" }}
                      >
                        {activeItem.amount}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">
                        Source
                      </p>
                      <p className="text-sm font-semibold text-on-surface">
                        {activeItem.source}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">
                        Location
                      </p>
                      <p className="text-sm font-semibold text-on-surface">
                        {activeItem.location}
                      </p>
                    </div>
                  </div>

                  {/* Property + Category Assignment */}
                  <div className="pt-5 border-t border-slate-50">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
                        AI Assignment
                      </p>
                      <button
                        onClick={() => openEditModal(activeItem)}
                        className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[14px]">edit</span>
                        Edit
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-surface-container-low p-3 rounded-xl">
                        <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mb-1">Property</p>
                        <p className="text-[13px] font-bold text-on-surface flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px] text-primary">location_on</span>
                          {activeItem.property}
                        </p>
                      </div>
                      <div className="bg-surface-container-low p-3 rounded-xl">
                        <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mb-1">Category</p>
                        <p className="text-[13px] font-bold text-on-surface flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px] text-primary">label</span>
                          {activeItem.suggestion}
                        </p>
                      </div>
                    </div>
                    <p className="text-[10px] text-on-surface-variant mt-2 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">auto_awesome</span>
                      Inferred from vendor location, payment source, and historical patterns
                    </p>
                  </div>

                  {/* AI Recommendation */}
                  <div className="pt-5 border-t border-slate-50">
                    <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-3">
                      AI Recommendation
                    </p>
                    <div className="bg-surface-container-low p-4 rounded-xl border-l-2 border-violet-400">
                      <p className="text-[13px] leading-relaxed text-on-surface">
                        {activeItem.recommendation}
                      </p>
                    </div>
                  </div>

                  {/* Similar Past Transactions */}
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-3">
                      Similar Past Transactions
                    </p>
                    <div className="space-y-2">
                      {activeItem.similarTransactions.map((s, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center py-2 px-3 bg-slate-50 rounded-lg"
                        >
                          <div>
                            <p className="text-[12px] font-bold text-on-surface">
                              {s.vendor}
                            </p>
                            <p className="text-[10px] text-on-surface-variant">
                              {s.date}
                            </p>
                          </div>
                          <span
                            className="text-[12px] font-bold text-on-surface"
                            style={{ fontFamily: "'Manrope', sans-serif" }}
                          >
                            {s.amount}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-5 space-y-3">
                    <button
                      onClick={() => handleAccept(activeItem)}
                      className="w-full py-3 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 bg-primary hover:bg-primary-container text-white shadow-violet-100"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        check_circle
                      </span>
                      Accept Transaction
                    </button>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => openEditModal(activeItem)}
                        className="py-3 rounded-xl font-bold text-[13px] transition-all bg-white border border-outline-variant text-on-surface hover:bg-slate-50"
                      >
                        Modify
                      </button>
                      <button
                        onClick={() => handleSkip(activeItem)}
                        className="py-3 rounded-xl font-bold text-[13px] transition-all bg-white border border-error/20 text-error hover:bg-rose-50"
                      >
                        Skip
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Help text */}
              <div className="mt-4 px-4 text-center">
                <p className="text-[11px] text-on-surface-variant">
                  Powered by Estate Ledger AI
                </p>
              </div>
            </aside>
          )}
      </div>

      {/* Edit Category Modal */}
      {editingCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={closeEditModal}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="relative bg-surface-container-lowest rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeEditModal}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-surface-container-low text-on-surface-variant hover:bg-error hover:text-white transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">
                close
              </span>
            </button>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-xl">
                  edit
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-on-surface">
                  Modify Transaction
                </h3>
                <p className="text-sm text-on-surface-variant">
                  {editingCard.vendor} &middot; {editingCard.amount}
                </p>
              </div>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-on-surface-variant mb-2">
                  Category
                </label>
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-on-surface font-semibold text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-on-surface-variant mb-2">
                  Property
                </label>
                <select
                  value={editProperty}
                  onChange={(e) => setEditProperty(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-on-surface font-semibold text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all cursor-pointer"
                >
                  {properties.map((prop) => (
                    <option key={prop} value={prop}>
                      {prop}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-on-surface-variant mt-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                  AI assigned based on vendor location and payment source
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 mt-8">
              <button
                onClick={closeEditModal}
                className="px-5 py-2.5 rounded-full text-on-surface-variant font-semibold text-sm hover:bg-surface-container-low transition-all"
              >
                Cancel
              </button>
              <button
                onClick={saveEdits}
                className="px-6 py-2.5 rounded-full bg-primary text-white font-bold text-sm shadow-md shadow-primary/20 hover:opacity-90 active:scale-95 transition-all"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
