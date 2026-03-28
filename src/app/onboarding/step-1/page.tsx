"use client";
import Link from "next/link";

export default function OnboardingStep1() {
  return (
    <div className="bg-background font-[Inter] text-on-surface min-h-screen flex flex-col">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full flex justify-center items-center py-8 z-50">
        <div className="flex flex-col items-center">
          <h1 className="font-[Cinzel] font-extrabold text-2xl tracking-tight text-teal-700">
            Estate Ledger
          </h1>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex items-center justify-center px-4 pt-24 pb-32">
        <section className="max-w-[1440px] w-full flex justify-center">
          {/* Onboarding Card */}
          <div className="w-full max-w-xl bg-surface-container-lowest p-8 rounded-xl shadow-[0_12px_32px_rgba(20,27,43,0.04)] flex flex-col items-center text-center">
            {/* Step Indicator Cluster */}
            <div className="mb-10 flex items-center gap-3">
              <div className="h-2 w-8 rounded-full bg-primary shadow-[0_0_8px_rgba(99,14,212,0.3)]" />
              <div className="h-2 w-2 rounded-full bg-surface-container-highest" />
              <div className="h-2 w-2 rounded-full bg-surface-container-highest" />
              <div className="h-2 w-2 rounded-full bg-surface-container-highest" />
            </div>

            {/* Headline Group */}
            <div className="mb-10 space-y-3">
              <h2 className="font-[Cinzel] font-bold text-[28px] leading-tight text-on-surface">
                Upload Your Documents
              </h2>
              <p className="text-on-surface-variant text-base">
                Import your financial records to get started
              </p>
            </div>

            {/* Upload Zone */}
            <div className="w-full h-[240px] border-2 border-dashed border-outline-variant rounded-xl bg-surface-container-low/50 hover:bg-surface-container-low transition-colors group cursor-pointer flex flex-col items-center justify-center p-6 relative overflow-hidden">
              {/* Subtle Background Texture */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(#630ed4 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    cloud_upload
                  </span>
                </div>
                <p className="font-[Cinzel] font-semibold text-lg text-on-surface mb-1">
                  Drag &amp; Drop files here
                </p>
                <p className="text-primary font-medium hover:underline">
                  or Browse Files
                </p>
              </div>
              <div className="mt-8 flex gap-4">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-highest/50">
                  <span className="material-symbols-outlined text-on-surface-variant text-base">
                    description
                  </span>
                  <span className="text-xs font-medium text-on-surface-variant">PDF</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-highest/50">
                  <span className="material-symbols-outlined text-on-surface-variant text-base">
                    table_chart
                  </span>
                  <span className="text-xs font-medium text-on-surface-variant">CSV</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-highest/50">
                  <span className="material-symbols-outlined text-on-surface-variant text-base">
                    grid_on
                  </span>
                  <span className="text-xs font-medium text-on-surface-variant">Excel</span>
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="mt-12 w-full space-y-6">
              <button
                disabled
                className="w-full py-4 px-8 rounded-lg bg-surface-container-highest text-on-surface-variant font-[Cinzel] font-bold text-base cursor-not-allowed tracking-wide"
              >
                Continue
              </button>
              <div className="flex justify-center">
                <Link
                  href="/onboarding/step-2"
                  className="text-on-surface-variant hover:text-primary text-sm font-medium transition-colors"
                >
                  Skip for now
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Nav - Step Indicator */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-center items-center px-4 pb-12">
        <div className="flex items-center justify-center space-x-2 text-teal-600">
          <span
            className="material-symbols-outlined text-[11px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            fiber_manual_record
          </span>
          <span className="font-[Cinzel] text-xs font-semibold uppercase tracking-widest">
            Step 1 of 4
          </span>
        </div>
      </nav>

      {/* Background Decoration */}
      <div className="fixed top-0 right-0 -z-10 w-1/3 h-1/2 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-bl from-primary-fixed to-transparent rounded-full blur-[120px]" />
      </div>
      <div className="fixed bottom-0 left-0 -z-10 w-1/4 h-1/3 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-secondary-fixed-dim to-transparent rounded-full blur-[100px]" />
      </div>
    </div>
  );
}
