"use client";
import Link from "next/link";
import { useState } from "react";

export default function OnboardingStep2() {
  const [fileRemoved, setFileRemoved] = useState(false);

  return (
    <div className="bg-background font-[Inter] text-on-surface min-h-screen flex flex-col">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full flex justify-center items-center py-8 z-50">
        <div className="font-[Cinzel] font-bold text-lg tracking-tight text-teal-700">
          <span className="text-2xl font-extrabold text-teal-700">Estate Ledger</span>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex items-center justify-center px-4 pt-24 pb-32">
        <div className="max-w-[1440px] w-full flex justify-center">
          {/* Centered Onboarding Card */}
          <div className="w-full max-w-2xl bg-surface-container-lowest rounded-xl shadow-[0_12px_32px_rgba(20,27,43,0.04)] p-12 relative overflow-hidden">
            {/* Background Accent Gradient */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-fixed-dim/10 rounded-full -mr-32 -mt-32 blur-3xl" />

            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Title Section */}
              <h1 className="font-[Cinzel] font-extrabold text-[2rem] leading-tight mb-4 text-on-surface">
                File Uploaded
              </h1>
              <p className="text-on-surface-variant max-w-md mb-10">
                Your transaction history has been successfully parsed. We are ready to structure your estate ledger.
              </p>

              {/* Success Upload Zone */}
              {fileRemoved ? (
                <div className="w-full bg-surface-container-low rounded-xl p-6 mb-10 flex items-center justify-center border-2 border-dashed border-outline-variant/40 transition-all">
                  <div className="text-center py-4">
                    <span aria-hidden="true" className="material-symbols-outlined text-on-surface-variant/40 text-4xl mb-2">upload_file</span>
                    <p className="text-sm text-on-surface-variant font-medium">File removed. Upload a new file to continue.</p>
                  </div>
                </div>
              ) : (
                <div className="w-full bg-surface-container-low rounded-xl p-6 mb-10 flex items-center justify-between border-2 border-dashed border-transparent transition-all">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-primary-container flex items-center justify-center text-on-primary">
                      <span aria-hidden="true" className="material-symbols-outlined">description</span>
                    </div>
                    <div className="text-left">
                      <div className="font-[Cinzel] font-bold text-on-surface">
                        2023_property_transactions.csv
                      </div>
                      <div className="text-xs text-on-surface-variant">2.4 MB</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center text-emerald-700 font-semibold text-sm">
                      <span
                        aria-hidden="true" className="material-symbols-outlined mr-1"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                      Verified
                    </div>
                    <button
                      onClick={() => setFileRemoved(true)}
                      className="text-sm font-semibold text-error hover:opacity-80 transition-opacity"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}

              {/* Action Area */}
              <div className="w-full space-y-6">
                <Link
                  href="/onboarding/step-3"
                  className="block w-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-[Cinzel] font-bold py-4 rounded-lg shadow-lg hover:opacity-90 active:scale-95 transition-all duration-150 text-center"
                >
                  Continue
                </Link>
                <Link
                  href="/onboarding/step-3"
                  className="inline-block text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors"
                >
                  Skip for now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Nav - Step Indicator */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-center items-center px-4 pb-12">
        <div className="flex items-center justify-center space-x-8">
          <div className="flex items-center space-x-3">
            {/* Step 1 (Complete) */}
            <div className="flex items-center justify-center space-x-2 text-outline-variant">
              <span
                aria-hidden="true" className="material-symbols-outlined text-[11px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                fiber_manual_record
              </span>
            </div>
            {/* Step 2 (Active) */}
            <div className="flex items-center justify-center space-x-2 text-teal-700">
              <span className="font-[Cinzel] text-xs font-semibold uppercase tracking-widest">
                Step 2 of 4
              </span>
              <span
                aria-hidden="true" className="material-symbols-outlined text-[11px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                fiber_manual_record
              </span>
            </div>
            {/* Step 3 */}
            <div className="flex items-center justify-center space-x-2 text-outline-variant">
              <span
                aria-hidden="true" className="material-symbols-outlined text-[11px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                fiber_manual_record
              </span>
            </div>
            {/* Step 4 */}
            <div className="flex items-center justify-center space-x-2 text-outline-variant">
              <span
                aria-hidden="true" className="material-symbols-outlined text-[11px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                fiber_manual_record
              </span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
