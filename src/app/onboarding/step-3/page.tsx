"use client";
import Link from "next/link";

export default function OnboardingStep3() {
  return (
    <div className="bg-surface text-on-surface font-[Inter] min-h-screen flex flex-col">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full flex justify-center items-center py-8 z-50 bg-transparent">
        <div className="container max-w-[1440px] px-8 flex justify-center">
          <span className="font-[Cinzel] font-extrabold text-2xl tracking-tight text-teal-700">
            Estate Ledger
          </span>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex items-center justify-center px-4 pt-24 pb-32">
        <div className="max-w-[1440px] w-full flex justify-center">
          {/* Full-screen centered card */}
          <div className="bg-surface-container-lowest rounded-xl shadow-[0_12px_32px_rgba(20,27,43,0.04)] w-full max-w-2xl overflow-hidden relative border border-outline-variant/10">
            {/* Atmospheric Background Detail */}
            <div
              className="absolute top-0 right-0 w-64 h-64 -mr-32 -mt-32 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(99, 14, 212, 0.15) 0%, rgba(99, 14, 212, 0) 70%)",
              }}
            />

            <div className="p-12 md:p-16 flex flex-col items-center text-center relative z-10">
              {/* Processing Visualization */}
              <div className="mb-10 relative">
                <div className="w-24 h-24 rounded-full border-4 border-surface-container-high border-t-primary animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    cognition
                  </span>
                </div>
              </div>

              {/* Header Section */}
              <div className="space-y-3 mb-12">
                <h1 className="font-[Cinzel] font-bold text-3xl md:text-4xl text-on-surface tracking-tight">
                  AI is Processing Your Data
                </h1>
                <p className="text-on-surface-variant text-lg">
                  Analyzing your records for properties and trends
                </p>
              </div>

              {/* Status Rows */}
              <div className="w-full max-w-sm space-y-4 mb-10">
                {/* Row 1: Complete */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-surface-container-low transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <span
                      className="material-symbols-outlined text-emerald-700"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    <span className="font-medium text-on-surface">Categorizing Transactions</span>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                    Complete
                  </span>
                </div>
                {/* Row 2: In Progress */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-surface-container-lowest border border-primary/20 shadow-sm transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <span className="material-symbols-outlined text-primary animate-spin">
                      progress_activity
                    </span>
                    <span className="font-medium text-on-surface">Detecting Properties</span>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    In Progress
                  </span>
                </div>
                {/* Row 3: Pending */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-surface-container-low opacity-60 transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <span className="material-symbols-outlined text-slate-400">schedule</span>
                    <span className="font-medium text-on-surface">Flagging Anomalies</span>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Pending
                  </span>
                </div>
              </div>

              {/* Footer Info */}
              <div className="flex items-center space-x-2 text-on-surface-variant/80 bg-surface-container-high/40 px-6 py-2 rounded-full">
                <span className="material-symbols-outlined text-sm">timer</span>
                <p className="text-sm font-medium">Estimated time: ~2 minutes</p>
              </div>
            </div>

            {/* Subtle Decorative Gradient Bottom */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          </div>
        </div>
      </main>

      {/* Bottom Nav - Step Indicator */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-center items-center px-4 pb-12">
        <div className="flex items-center space-x-8">
          {/* Step 1 (Completed) */}
          <div className="flex flex-col items-center space-y-2">
            <div className="h-1.5 w-8 rounded-full bg-primary/30" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Step 1
            </span>
          </div>
          {/* Step 2 (Completed) */}
          <div className="flex flex-col items-center space-y-2">
            <div className="h-1.5 w-8 rounded-full bg-primary/30" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Step 2
            </span>
          </div>
          {/* Step 3 (Active) */}
          <div className="flex flex-col items-center space-y-2">
            <div className="h-1.5 w-16 rounded-full bg-primary shadow-[0_0_8px_rgba(99,14,212,0.4)]" />
            <div className="flex items-center space-x-2 text-teal-700">
              <span
                className="material-symbols-outlined text-[11px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                fiber_manual_record
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
                Step 3 of 4
              </span>
            </div>
          </div>
          {/* Step 4 (Inactive) */}
          <div className="flex flex-col items-center space-y-2">
            <div className="h-1.5 w-8 rounded-full bg-slate-200" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300">
              Final
            </span>
          </div>
        </div>
      </nav>

      {/* Background Decoration */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[5%] w-[30rem] h-[30rem] bg-secondary/5 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}
