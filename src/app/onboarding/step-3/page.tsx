"use client";
import Link from "next/link";
import { CheckCircle, Loader2, Clock } from "lucide-react";

function StepDots({ step }: { step: number }) {
  return <div className="flex gap-2">{[1,2,3,4].map(s=><div key={s} className={`w-3 h-3 rounded-full ${s<=step?"bg-[#7C3AED]":"bg-gray-300"}`}/>)}</div>;
}

export default function OnboardingStep3() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-start justify-center">
      <div className="max-w-xl w-full mx-auto mt-20 bg-white rounded-2xl shadow-sm p-8">
        <div className="flex items-center justify-between mb-8">
          <span className="text-xl font-bold text-[#7C3AED]">Estate Ledger</span>
          <StepDots step={3} />
        </div>
        <h1 className="text-[28px] font-bold text-gray-900 mb-2">AI is Processing Your Data</h1>
        <p className="text-sm text-gray-500 mb-8">Analyzing your records for properties and trends</p>
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-full border-4 border-[#7C3AED] border-t-transparent animate-spin" />
        </div>
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium text-gray-700">Categorizing Transactions</span>
            <span className="ml-auto text-xs text-green-600 font-medium">Complete</span>
          </div>
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
            <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
            <span className="text-sm font-medium text-gray-700">Detecting Properties</span>
            <span className="ml-auto text-xs text-blue-600 font-medium">In Progress</span>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Clock className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-500">Flagging Anomalies</span>
            <span className="ml-auto text-xs text-gray-400 font-medium">Pending</span>
          </div>
        </div>
        <p className="text-sm text-gray-500 text-center mb-6">Estimated time: ~2 minutes</p>
        <div className="flex justify-end">
          <Link href="/onboarding/step-4" className="px-6 py-2.5 rounded-lg bg-[#7C3AED] text-white text-sm font-medium hover:bg-[#6D28D9]">Continue</Link>
        </div>
      </div>
    </div>
  );
}
