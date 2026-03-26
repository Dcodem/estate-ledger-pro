"use client";
import Link from "next/link";
import { Upload } from "lucide-react";

function StepDots({ step }: { step: number }) {
  return <div className="flex gap-2">{[1,2,3,4].map(s=><div key={s} className={`w-3 h-3 rounded-full ${s<=step?"bg-[#7C3AED]":"bg-gray-300"}`}/>)}</div>;
}

export default function OnboardingStep1() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-start justify-center">
      <div className="max-w-xl w-full mx-auto mt-20 bg-white rounded-2xl shadow-sm p-8">
        <div className="flex items-center justify-between mb-8">
          <span className="text-xl font-bold text-[#7C3AED]">Estate Ledger</span>
          <StepDots step={1} />
        </div>
        <h1 className="text-[28px] font-bold text-gray-900 mb-2">Upload Your Documents</h1>
        <p className="text-sm text-gray-500 mb-8">Import your financial records to get started</p>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center mb-4">
          <Upload className="w-10 h-10 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-medium mb-1">Drag &amp; Drop files here</p>
          <p className="text-sm text-gray-400">or <span className="text-[#7C3AED] font-medium cursor-pointer hover:underline">Browse Files</span></p>
        </div>
        <p className="text-xs text-gray-500 text-center mb-8">Supported formats: PDF, CSV, Excel</p>
        <div className="flex items-center justify-between">
          <Link href="/onboarding/step-2" className="text-sm text-gray-500 hover:text-gray-700">Skip for now</Link>
          <button disabled className="px-6 py-2.5 rounded-lg bg-gray-300 text-gray-500 cursor-not-allowed text-sm font-medium">Continue</button>
        </div>
      </div>
    </div>
  );
}
