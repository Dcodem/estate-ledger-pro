"use client";

import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";
import { useState, useEffect } from "react";

const categories = [
  "Maintenance",
  "Office Supplies",
  "Contractor",
  "Rental Income",
  "Insurance",
  "Utilities",
  "Capital Improvement",
];

interface TriageCard {
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
}

const initialTriageCards: TriageCard[] = [
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
  },
];

const tabs = ["All", "High Confidence", "Medium", "Low"];

type DismissDirection = "right" | "left";

interface DismissingState {
  id: number;
  direction: DismissDirection;
}

export default function SmartTriagePage() {
  const [activeTab, setActiveTab] = useState("All");
  const [cards, setCards] = useState<TriageCard[]>(initialTriageCards);
  const [skippedCards, setSkippedCards] = useState<TriageCard[]>([]);
  const [acceptedIds, setAcceptedIds] = useState<number[]>([]);
  const [dismissing, setDismissing] = useState<DismissingState | null>(null);

  // Edit modal state
  const [editingCard, setEditingCard] = useState<TriageCard | null>(null);
  const [editCategory, setEditCategory] = useState("");

  const pendingCards = cards.filter(
    (c) => !acceptedIds.includes(c.id) && !skippedCards.find((s) => s.id === c.id)
  );

  const filteredCards = pendingCards.filter((c) => {
    if (activeTab === "High Confidence") return c.confidence >= 85;
    if (activeTab === "Medium") return c.confidence >= 50 && c.confidence < 85;
    if (activeTab === "Low") return c.confidence < 50;
    return true;
  });

  const handleAccept = (card: TriageCard) => {
    setDismissing({ id: card.id, direction: "right" });
    setTimeout(() => {
      setAcceptedIds((prev) => [...prev, card.id]);
      setDismissing(null);
    }, 300);
  };

  const handleSkip = (card: TriageCard) => {
    setDismissing({ id: card.id, direction: "left" });
    setTimeout(() => {
      setSkippedCards((prev) => [...prev, card]);
      setDismissing(null);
    }, 300);
  };

  const handleReconsider = (card: TriageCard) => {
    setSkippedCards((prev) => prev.filter((c) => c.id !== card.id));
  };

  const openEditModal = (card: TriageCard) => {
    setEditingCard(card);
    setEditCategory(card.suggestion);
  };

  const closeEditModal = () => {
    setEditingCard(null);
    setEditCategory("");
  };

  const saveCategory = () => {
    if (!editingCard) return;
    setCards((prev) =>
      prev.map((c) =>
        c.id === editingCard.id ? { ...c, suggestion: editCategory } : c
      )
    );
    setSkippedCards((prev) =>
      prev.map((c) =>
        c.id === editingCard.id ? { ...c, suggestion: editCategory } : c
      )
    );
    closeEditModal();
  };

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
        {filteredCards.length === 0 && (
          <div className="text-center py-16 text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl mb-4 block opacity-30">
              inbox
            </span>
            <p className="font-medium">No items to triage in this category.</p>
          </div>
        )}
        {filteredCards.map((c) => {
          const isDismissing = dismissing?.id === c.id;
          const direction = dismissing?.direction;
          return (
            <div
              key={c.id}
              className="bg-surface-container-lowest rounded-2xl p-8 card-shadow flex items-center justify-between group"
              style={{
                transition: "transform 300ms ease-in-out, opacity 300ms ease-in-out",
                transform: isDismissing
                  ? direction === "right"
                    ? "translateX(120%)"
                    : "translateX(-120%)"
                  : "translateX(0)",
                opacity: isDismissing ? 0 : 1,
              }}
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
                  {/* Property assignment */}
                  <div className="flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-on-surface-variant text-[16px]">
                      location_on
                    </span>
                    <span className="text-on-surface-variant text-xs font-medium">
                      {c.property}
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
                  <button
                    onClick={() => openEditModal(c)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-low text-on-surface-variant hover:bg-primary hover:text-white transition-all"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      edit
                    </span>
                  </button>
                  <button
                    onClick={() => handleSkip(c)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-low text-on-surface-variant hover:bg-error hover:text-white transition-all"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      close
                    </span>
                  </button>
                  <button
                    onClick={() => handleAccept(c)}
                    className="px-6 py-2 rounded-full bg-primary text-white font-bold text-sm shadow-md shadow-primary/20 hover:opacity-90 active:scale-95 transition-all"
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

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
          <div className="space-y-4">
            {skippedCards.map((c) => (
              <div
                key={c.id}
                className="bg-surface-container-low/60 rounded-2xl p-6 flex items-center justify-between border border-dashed border-outline-variant"
              >
                {/* Left side */}
                <div className="flex items-center gap-5">
                  <div className="w-11 h-11 rounded-lg bg-surface-container-high flex items-center justify-center opacity-60">
                    <span className="material-symbols-outlined text-on-surface-variant text-xl">
                      {c.icon}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-semibold text-on-surface-variant">
                        {c.vendor}
                      </h3>
                      <span className="text-on-surface-variant/60 text-sm font-medium">
                        {c.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-on-surface-variant/60 text-[14px]">
                        location_on
                      </span>
                      <span className="text-on-surface-variant/60 text-xs font-medium">
                        {c.property}
                      </span>
                    </div>
                    <div className="flex items-center mt-1.5 gap-3">
                      <span className="bg-surface-container px-3 py-0.5 rounded-full text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                        {c.suggestion}
                      </span>
                      <div
                        className={`flex items-center ${c.confBgClass} px-2.5 py-0.5 rounded-full`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${c.confDotClass} mr-1.5`}
                        />
                        <span
                          className={`${c.confTextClass} text-xs font-bold`}
                        >
                          {c.confidence}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-6">
                  <div
                    className="text-lg font-bold text-on-surface-variant"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    {c.amount}
                  </div>
                  <button
                    onClick={() => handleReconsider(c)}
                    className="px-5 py-2 rounded-full border-2 border-primary text-primary font-bold text-sm hover:bg-primary hover:text-white active:scale-95 transition-all"
                  >
                    Reconsider
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
        <button className="text-primary font-bold hover:underline flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined mr-2">support_agent</span>
          Ask your concierge
        </button>
      </div>

      {/* Edit Category Modal */}
      {editingCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={closeEditModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* Modal content */}
          <div
            className="relative bg-surface-container-lowest rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeEditModal}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-surface-container-low text-on-surface-variant hover:bg-error hover:text-white transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">
                close
              </span>
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-xl">
                  edit
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-on-surface">
                  Edit Category
                </h3>
                <p className="text-sm text-on-surface-variant">
                  {editingCard.vendor} &middot; {editingCard.amount}
                </p>
              </div>
            </div>

            {/* Category dropdown */}
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

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 mt-8">
              <button
                onClick={closeEditModal}
                className="px-5 py-2.5 rounded-full text-on-surface-variant font-semibold text-sm hover:bg-surface-container-low transition-all"
              >
                Cancel
              </button>
              <button
                onClick={saveCategory}
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
