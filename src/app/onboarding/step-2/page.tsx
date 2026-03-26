"use client";
import Link from "next/link";
import { CheckCircle, FileText, X } from "lucide-react";

function StepDots({ step }: { step: number }) {
  return <div className="flex gap-2">{[1,2,3,4].map(s=><div key={s} className={`w-3 h-3 rounded-full ${s<=step?"bg-[#7C3AED]":"bg-gray-300"}`}/>)}</div>;
}

export default function OnboardingStep2() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-start justify-center">
      <div className="max-w-xl w-full mx-auto mt-20 bg-white rounded-2xl shadow-sm p-8">
        <div className="flex items-center justify-between mb-8">
          <span className="text-xl font-bold text-[#7C3AED]">Estate Ledger</span>
          <StepDots step={2} />
        </div>
        <h1 className="text-[28px] font-bold text-gray-900 mb-2">File Uploaded</h1>
        <p className="text-sm text-gray-500 mb-8">Your file is ready for processing</p>
        <div className="border-2 border-dashed border-green-300 bg-green-50 rounded-xl p-8 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"><FileText className="w-6 h-6 text-green-600" /></div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">2023_property_transactions.csv</p>
              <p className="text-sm text-gray-500">2.4 MB</p>
            </div>
            <CheckCircle className="w-6 h-6 text-green-500" />
            <button className="text-sm text-red-500 hover:underline flex items-center gap-1"><X size={14} />Remove</button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Link href="/onboarding/step-1" className="text-sm text-gray-500 hover:text-gray-700">Back</Link>
          <Link href="/onboarding/step-3" className="px-6 py-2.5 rounded-lg bg-[#7C3AED] text-white text-sm font-medium hover:bg-[#6D28D9]">Continue</Link>
        </div>
      </div>
    </div>
  );
}
