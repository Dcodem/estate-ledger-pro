"use client";
import Link from "next/link";

export default function OnboardingStep4() {
  return (
    <div className="text-on-surface font-[Inter] min-h-screen" style={{ backgroundColor: "#f9f9ff" }}>
      {/* Top Navigation */}
      <header className="fixed top-0 w-full flex justify-center items-center py-8 bg-transparent z-50">
        <div className="max-w-[1440px] w-full px-8 flex justify-between items-center">
          <span className="text-2xl font-extrabold text-violet-700 font-[Manrope] tracking-tight">
            Estate Ledger
          </span>
          <div className="flex items-center space-x-8">
            <span className="text-slate-400 font-[Manrope] font-bold text-lg tracking-tight">
              Setup Guide
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="min-h-screen flex items-center justify-center pt-24 pb-32">
        <div className="max-w-[1200px] w-full px-6">
          {/* Central Onboarding Card */}
          <div className="bg-surface-container-lowest rounded-xl shadow-[0_12px_32px_rgba(20,27,43,0.04)] overflow-hidden">
            <div className="p-12">
              {/* Step Indicator */}
              <div className="flex justify-center mb-10">
                <div className="inline-flex items-center bg-white/60 backdrop-blur-md px-8 py-3 rounded-full border border-white/40 shadow-sm space-x-8">
                  {/* Step 1 (Inactive) */}
                  <div className="flex items-center space-x-2 text-slate-300">
                    <span
                      className="material-symbols-outlined text-[8px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      fiber_manual_record
                    </span>
                    <span className="font-[Manrope] text-[10px] font-bold uppercase tracking-widest">
                      Step 1
                    </span>
                  </div>
                  {/* Step 2 (Inactive) */}
                  <div className="flex items-center space-x-2 text-slate-300">
                    <span
                      className="material-symbols-outlined text-[8px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      fiber_manual_record
                    </span>
                    <span className="font-[Manrope] text-[10px] font-bold uppercase tracking-widest">
                      Step 2
                    </span>
                  </div>
                  {/* Step 3 (Inactive) */}
                  <div className="flex items-center space-x-2 text-slate-300">
                    <span
                      className="material-symbols-outlined text-[8px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      fiber_manual_record
                    </span>
                    <span className="font-[Manrope] text-[10px] font-bold uppercase tracking-widest">
                      Step 3
                    </span>
                  </div>
                  {/* Step 4 (Active) */}
                  <div className="flex items-center space-x-2 text-primary">
                    <span
                      className="material-symbols-outlined text-[10px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      fiber_manual_record
                    </span>
                    <span className="font-[Manrope] text-[10px] font-bold uppercase tracking-widest">
                      Step 4 of 4
                    </span>
                  </div>
                </div>
              </div>

              {/* Title Section */}
              <div className="mb-12 text-center">
                <h1 className="font-[Manrope] text-on-surface text-[2.75rem] font-extrabold tracking-tight mb-4">
                  Review &amp; Confirm
                </h1>
                <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
                  We&apos;ve analyzed your connected accounts. Review the summary below before we
                  finalize your luxury property portfolio.
                </p>
              </div>

              {/* Summary Metric Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {/* Stat Card 1 */}
                <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary-fixed-dim flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">receipt_long</span>
                    </div>
                    <span className="text-primary font-bold font-[Manrope] text-sm uppercase tracking-wider">
                      88% Match
                    </span>
                  </div>
                  <h3 className="font-[Manrope] text-2xl font-bold mb-1">127 Transactions Found</h3>
                  <p className="text-on-surface-variant text-sm">Synced from 4 accounts</p>
                </div>
                {/* Stat Card 2 */}
                <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary-fixed-dim flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">domain</span>
                    </div>
                    <span className="text-primary font-bold font-[Manrope] text-sm uppercase tracking-wider">
                      Validated
                    </span>
                  </div>
                  <h3 className="font-[Manrope] text-2xl font-bold mb-1">3 Properties Detected</h3>
                  <p className="text-on-surface-variant text-sm">Residential &amp; Commercial</p>
                </div>
                {/* Stat Card 3 */}
                <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-error-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-error">priority_high</span>
                    </div>
                    <span className="text-error font-bold font-[Manrope] text-sm uppercase tracking-wider">
                      Action Required
                    </span>
                  </div>
                  <h3 className="font-[Manrope] text-2xl font-bold mb-1">5 Items Need Review</h3>
                  <p className="text-on-surface-variant text-sm">Uncategorized expenses</p>
                </div>
              </div>

              {/* Preview Table of Transactions */}
              <div className="mb-12 overflow-hidden rounded-xl bg-surface-container-low/50 border border-outline-variant/5">
                <div className="px-8 py-6 border-b border-outline-variant/10 flex justify-between items-center">
                  <h2 className="font-[Manrope] text-xl font-bold">Recent Transaction Preview</h2>
                  <span className="text-on-surface-variant text-sm font-medium">
                    Displaying 4 of 127
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider">
                        <th className="px-8 py-5">DATE</th>
                        <th className="px-8 py-5">DESCRIPTION</th>
                        <th className="px-8 py-5">CATEGORY</th>
                        <th className="px-8 py-5">PROPERTY</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/5">
                      <tr>
                        <td className="px-8 py-6 text-on-surface font-medium">Oct 24, 2023</td>
                        <td className="px-8 py-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-[10px] font-bold">
                              MS
                            </div>
                            <span className="text-on-surface font-semibold">
                              Maintenance Services Ltd
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="px-3 py-1 bg-surface-container-highest rounded-full text-xs font-semibold">
                            Repairs
                          </span>
                        </td>
                        <td className="px-8 py-6 text-on-surface-variant">
                          The Greenwich Estate
                        </td>
                      </tr>
                      <tr>
                        <td className="px-8 py-6 text-on-surface font-medium">Oct 22, 2023</td>
                        <td className="px-8 py-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-[10px] font-bold">
                              PR
                            </div>
                            <span className="text-on-surface font-semibold">
                              Premier Real Estate Tax
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="px-3 py-1 bg-surface-container-highest rounded-full text-xs font-semibold">
                            Taxes
                          </span>
                        </td>
                        <td className="px-8 py-6 text-on-surface-variant">Aspen Ridge Villa</td>
                      </tr>
                      <tr>
                        <td className="px-8 py-6 text-on-surface font-medium">Oct 20, 2023</td>
                        <td className="px-8 py-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-[10px] font-bold">
                              UT
                            </div>
                            <span className="text-on-surface font-semibold">
                              City Utilities Corp
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="px-3 py-1 bg-surface-container-highest rounded-full text-xs font-semibold">
                            Utilities
                          </span>
                        </td>
                        <td className="px-8 py-6 text-on-surface-variant">
                          The Greenwich Estate
                        </td>
                      </tr>
                      <tr>
                        <td className="px-8 py-6 text-on-surface font-medium">Oct 18, 2023</td>
                        <td className="px-8 py-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-error-container/30 flex items-center justify-center text-[10px] font-bold text-error">
                              ?
                            </div>
                            <span className="text-on-surface font-semibold italic text-on-surface-variant">
                              Unknown Transaction
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="px-3 py-1 bg-error-container text-[#93000a] rounded-full text-xs font-semibold">
                            Needs Review
                          </span>
                        </td>
                        <td className="px-8 py-6 text-on-surface-variant">Unassigned</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Centered Bottom Actions */}
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 pt-6">
                <Link
                  href="/"
                  className="w-full md:w-auto px-12 py-4 bg-primary text-white font-[Manrope] font-bold rounded-lg shadow-lg hover:opacity-90 transition-all active:scale-95 duration-150 text-center"
                >
                  Go to Dashboard
                </Link>
                <Link
                  href="/onboarding/step-3"
                  className="w-full md:w-auto px-12 py-4 border border-outline-variant text-primary font-[Manrope] font-bold rounded-lg hover:bg-surface-container-low transition-all active:scale-95 duration-150 text-center"
                >
                  Review Details
                </Link>
              </div>
            </div>
          </div>

          {/* Contextual Note */}
          <p className="mt-8 text-center text-on-surface-variant text-sm font-medium">
            By confirming, you agree to our{" "}
            <a className="underline text-primary hover:opacity-80" href="/settings">
              Data Aggregation Policy
            </a>{" "}
            and automated reconciliation.
          </p>
        </div>
      </main>
    </div>
  );
}
