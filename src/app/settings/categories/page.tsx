"use client";
import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";
import AnimatedTabs from "@/components/AnimatedTabs";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface Category {
  id: string;
  label: string;
  colorKey: string;
}

const COLOR_OPTIONS: Record<string, { bg: string; text: string; preview: string }> = {
  blue:    { bg: "bg-blue-50",    text: "text-blue-600",    preview: "bg-blue-500" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-700", preview: "bg-emerald-500" },
  teal:    { bg: "bg-teal-50",    text: "text-teal-700",    preview: "bg-teal-500" },
  orange:  { bg: "bg-orange-50",  text: "text-orange-600",  preview: "bg-orange-500" },
  amber:   { bg: "bg-amber-50",   text: "text-amber-800",   preview: "bg-amber-500" },
  violet:  { bg: "bg-violet-50",  text: "text-violet-700",  preview: "bg-violet-500" },
  rose:    { bg: "bg-rose-50",    text: "text-rose-600",    preview: "bg-rose-500" },
  slate:   { bg: "bg-slate-100",  text: "text-slate-600",   preview: "bg-slate-500" },
  cyan:    { bg: "bg-cyan-50",    text: "text-cyan-700",    preview: "bg-cyan-500" },
  pink:    { bg: "bg-pink-50",    text: "text-pink-600",    preview: "bg-pink-500" },
};

const DEFAULT_CATEGORIES: Category[] = [
  { id: "cat-1", label: "Capital Improvement", colorKey: "blue" },
  { id: "cat-2", label: "Insurance", colorKey: "slate" },
  { id: "cat-3", label: "Rental Income", colorKey: "emerald" },
  { id: "cat-4", label: "Utilities", colorKey: "teal" },
  { id: "cat-5", label: "Office Supplies", colorKey: "blue" },
  { id: "cat-6", label: "Contractor", colorKey: "teal" },
  { id: "cat-7", label: "Maintenance", colorKey: "orange" },
  { id: "cat-8", label: "Needs Review", colorKey: "amber" },
];

interface AISuggestion {
  label: string;
  colorKey: string;
  reason: string;
}

const AI_SUGGESTIONS: AISuggestion[] = [
  { label: "Property Tax", colorKey: "violet", reason: "Detected 3 tax-related transactions currently categorized under Insurance" },
  { label: "Legal & Professional", colorKey: "rose", reason: "Common for portfolios with 3+ properties — legal fees, accounting, inspections" },
  { label: "Mortgage & Financing", colorKey: "cyan", reason: "No financing category exists — mortgage payments may be miscategorized" },
  { label: "Tenant Deposit", colorKey: "pink", reason: "Security deposits require separate tracking for compliance in most jurisdictions" },
  { label: "Vacancy Loss", colorKey: "amber", reason: "Track revenue gaps between tenants for accurate yield calculations" },
];

export default function SettingsCategoriesPage() {
  const pathname = usePathname();
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState("");
  const [editColor, setEditColor] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const [newColor, setNewColor] = useState("blue");
  const [showAddForm, setShowAddForm] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [dismissedSuggestions, setDismissedSuggestions] = useState<string[]>([]);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [aiRevealed, setAiRevealed] = useState(false);

  const startEdit = (cat: Category) => {
    setEditingId(cat.id);
    setEditLabel(cat.label);
    setEditColor(cat.colorKey);
  };

  const saveEdit = () => {
    if (!editLabel.trim() || !editingId) return;
    setCategories((prev) =>
      prev.map((c) => (c.id === editingId ? { ...c, label: editLabel.trim(), colorKey: editColor } : c))
    );
    setEditingId(null);
    flashSaved();
  };

  const addCategory = () => {
    if (!newLabel.trim()) return;
    const id = `cat-${Date.now()}`;
    setCategories((prev) => [...prev, { id, label: newLabel.trim(), colorKey: newColor }]);
    setNewLabel("");
    setNewColor("blue");
    setShowAddForm(false);
    flashSaved();
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setDeleteConfirm(null);
    flashSaved();
  };

  const acceptSuggestion = (s: AISuggestion) => {
    const id = `cat-${Date.now()}`;
    setCategories((prev) => [...prev, { id, label: s.label, colorKey: s.colorKey }]);
    setDismissedSuggestions((prev) => [...prev, s.label]);
    flashSaved();
  };

  const dismissSuggestion = (label: string) => {
    setDismissedSuggestions((prev) => [...prev, label]);
  };

  const flashSaved = () => {
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  const runAiAnalysis = () => {
    setAiAnalyzing(true);
    setTimeout(() => {
      setAiAnalyzing(false);
      setAiRevealed(true);
    }, 2200);
  };

  const visibleSuggestions = AI_SUGGESTIONS.filter(
    (s) => !dismissedSuggestions.includes(s.label) && !categories.some((c) => c.label === s.label)
  );

  return (
    <AppLayout>
      <PageHeader title="Settings" subtitle="Manage your account and preferences" />
      <AnimatedTabs
        layoutId="settings-tabs"
        variant="underline"
        tabs={[
          { label: "Account", href: "/settings" },
          { label: "Categories", href: "/settings/categories" },
          { label: "Integrations", href: "/settings/integrations" },
          { label: "Notifications", href: "/settings/notifications" },
          { label: "Users", href: "/settings/users" },
        ]}
        activeValue={pathname}
      />

      <div className="max-w-4xl space-y-6">
        {/* Saved toast */}
        <AnimatePresence>
          {savedMsg && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 bg-emerald-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-emerald-500/20"
            >
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              Categories updated
            </motion.div>
          )}
        </AnimatePresence>

        {/* Current Categories */}
        <div className="bg-surface-container-lowest rounded-xl p-6 card-shadow">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="material-symbols-outlined text-primary">category</span>
              <div>
                <h3 className="font-headline text-lg font-bold text-on-surface">Transaction Categories</h3>
                <p className="text-xs text-on-surface-variant mt-0.5">{categories.length} categories configured</p>
              </div>
            </div>
            <button
              onClick={() => { setShowAddForm(true); setNewLabel(""); setNewColor("blue"); }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/5 rounded-lg transition-colors"
            >
              <span aria-hidden="true" className="material-symbols-outlined text-[16px]">add</span>
              Add Category
            </button>
          </div>

          {/* Add new category form */}
          <AnimatePresence>
            {showAddForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mb-6 p-4 bg-primary-fixed/20 rounded-xl border border-primary-fixed/40">
                  <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-3">New Category</p>
                  <div className="flex items-end gap-3">
                    <div className="flex-1 space-y-1.5">
                      <label className="text-xs font-semibold text-on-surface-variant">Name</label>
                      <input
                        autoFocus
                        type="text"
                        placeholder="e.g. Property Tax"
                        value={newLabel}
                        onChange={(e) => setNewLabel(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addCategory()}
                        className="w-full bg-surface-container-highest border-none rounded-lg px-4 py-2.5 text-sm focus:bg-white focus:ring-1 focus:ring-primary/40 transition-all outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-on-surface-variant">Color</label>
                      <div className="flex gap-1.5 bg-surface-container-highest rounded-lg px-3 py-2">
                        {Object.entries(COLOR_OPTIONS).map(([key, c]) => (
                          <button
                            key={key}
                            onClick={() => setNewColor(key)}
                            className={`w-5 h-5 rounded-full ${c.preview} transition-all ${
                              newColor === key ? "ring-2 ring-offset-2 ring-primary scale-110" : "hover:scale-110"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <div className="flex-1">
                      {newLabel.trim() && (
                        <span className="text-xs text-on-surface-variant">
                          Preview: <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-bold ${COLOR_OPTIONS[newColor].bg} ${COLOR_OPTIONS[newColor].text}`}>{newLabel.trim()}</span>
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="px-4 py-2 border border-outline-variant/20 rounded-lg text-xs font-semibold text-on-surface hover:bg-surface-container-low transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={addCategory}
                      disabled={!newLabel.trim()}
                      className="px-4 py-2 rounded-lg text-xs font-semibold bg-gradient-to-br from-primary to-primary-container text-white shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all disabled:opacity-40 disabled:hover:scale-100"
                    >
                      Add Category
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Category list */}
          <div className="divide-y divide-outline-variant/10">
            {categories.map((cat) => {
              const color = COLOR_OPTIONS[cat.colorKey] || COLOR_OPTIONS.slate;
              const isEditing = editingId === cat.id;
              const isDeleting = deleteConfirm === cat.id;

              return (
                <motion.div
                  key={cat.id}
                  layout
                  className="flex items-center gap-4 py-3.5 first:pt-0 last:pb-0"
                >
                  {isEditing ? (
                    <div className="flex-1 flex items-center gap-3">
                      <input
                        autoFocus
                        type="text"
                        value={editLabel}
                        onChange={(e) => setEditLabel(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") saveEdit(); if (e.key === "Escape") setEditingId(null); }}
                        className="flex-1 bg-surface-container-high border-none rounded-lg px-3 py-2 text-sm focus:bg-white focus:ring-1 focus:ring-primary/40 transition-all outline-none"
                      />
                      <div className="flex gap-1">
                        {Object.entries(COLOR_OPTIONS).map(([key, c]) => (
                          <button
                            key={key}
                            onClick={() => setEditColor(key)}
                            className={`w-4 h-4 rounded-full ${c.preview} transition-all ${
                              editColor === key ? "ring-2 ring-offset-1 ring-primary scale-110" : "hover:scale-110"
                            }`}
                          />
                        ))}
                      </div>
                      <button onClick={saveEdit} className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-[18px]">check</span>
                      </button>
                      <button onClick={() => setEditingId(null)} className="p-1.5 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-[18px]">close</span>
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className={`w-2.5 h-2.5 rounded-full ${color.preview} shrink-0`} />
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${color.bg} ${color.text}`}>
                        {cat.label}
                      </span>
                      <div className="flex-1" />
                      {isDeleting ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-on-surface-variant">Delete this category?</span>
                          <button
                            onClick={() => deleteCategory(cat.id)}
                            className="px-3 py-1 bg-red-500 text-white text-[11px] font-bold rounded-lg hover:bg-red-600 transition-colors"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="px-3 py-1 border border-outline-variant/20 text-[11px] font-semibold rounded-lg hover:bg-surface-container-low transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => startEdit(cat)}
                            className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                            title="Edit category"
                          >
                            <span className="material-symbols-outlined text-[16px]">edit</span>
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(cat.id)}
                            className="p-1.5 text-on-surface-variant hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            title="Delete category"
                          >
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* AI Smart Recommendations */}
        <div className="bg-surface-container-lowest rounded-xl p-6 card-shadow relative overflow-hidden">
          {/* Subtle gradient accent */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full pointer-events-none" />

          <div className="flex items-center justify-between mb-2 relative">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary/20 to-violet-100 flex items-center justify-center">
                <span aria-hidden="true" className="material-symbols-outlined text-primary text-[20px]">auto_awesome</span>
              </div>
              <div>
                <h3 className="font-headline text-lg font-bold text-on-surface">AI Smart Recommendations</h3>
                <p className="text-xs text-on-surface-variant mt-0.5">Categories suggested based on your transaction patterns</p>
              </div>
            </div>
          </div>

          {!aiRevealed ? (
            <div className="mt-6 text-center py-8">
              <div className="inline-flex flex-col items-center gap-3">
                {aiAnalyzing ? (
                  <>
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                        className="h-8 w-8 rounded-full border-2 border-primary/20 border-t-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-on-surface">Analyzing your transaction history...</p>
                      <p className="text-xs text-on-surface-variant">Scanning 22 transactions across 3 properties</p>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-on-surface-variant leading-relaxed max-w-md">
                      Our AI will analyze your transaction history, property portfolio, and industry standards to recommend categories you might be missing.
                    </p>
                    <button
                      onClick={runAiAnalysis}
                      className="mt-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-br from-primary to-primary-container text-white shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all flex items-center gap-2"
                    >
                      <span aria-hidden="true" className="material-symbols-outlined text-[16px]">auto_awesome</span>
                      Analyze My Portfolio
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : visibleSuggestions.length === 0 ? (
            <div className="mt-6 text-center py-6">
              <span className="material-symbols-outlined text-emerald-500 text-[32px] mb-2">task_alt</span>
              <p className="text-sm font-semibold text-on-surface">All caught up!</p>
              <p className="text-xs text-on-surface-variant mt-1">No new category recommendations at this time.</p>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              <AnimatePresence mode="popLayout">
                {visibleSuggestions.map((s) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 80, transition: { duration: 0.2 } }}
                    layout
                    className="flex items-start gap-4 p-4 bg-surface-container-low rounded-xl border border-outline-variant/10 hover:border-primary/20 transition-all group"
                  >
                    <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${COLOR_OPTIONS[s.colorKey]?.preview || "bg-slate-400"}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${COLOR_OPTIONS[s.colorKey]?.bg} ${COLOR_OPTIONS[s.colorKey]?.text}`}>
                          {s.label}
                        </span>
                        <span className="px-1.5 py-0.5 bg-violet-50 text-violet-600 text-[9px] font-bold rounded-full uppercase tracking-wider">AI</span>
                      </div>
                      <p className="text-xs text-on-surface-variant leading-relaxed">{s.reason}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => acceptSuggestion(s)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-primary text-white text-[11px] font-bold rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[14px]">add</span>
                        Add
                      </button>
                      <button
                        onClick={() => dismissSuggestion(s.label)}
                        className="p-1.5 text-on-surface-variant hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        title="Dismiss"
                      >
                        <span className="material-symbols-outlined text-[14px]">close</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <div className="flex items-start gap-2 p-3 mt-4 bg-primary-fixed/20 rounded-lg border border-primary-fixed/30">
                <span aria-hidden="true" className="material-symbols-outlined text-primary text-[16px] mt-0.5">lightbulb</span>
                <p className="text-[12px] text-on-surface-variant leading-relaxed">
                  Recommendations are based on your transaction descriptions, property types, and common real estate accounting standards. Adding a category will make it available in transaction tagging across all properties.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
