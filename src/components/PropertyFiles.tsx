"use client";

import { useState } from "react";

export interface PropertyFile {
  id: string;
  name: string;
  type: "pdf" | "image" | "spreadsheet" | "document";
  size: string;
  uploaded: string;
  category: string;
}

const typeIcons: Record<string, { icon: string; bg: string; text: string }> = {
  pdf: { icon: "picture_as_pdf", bg: "bg-red-50", text: "text-red-500" },
  image: { icon: "image", bg: "bg-blue-50", text: "text-blue-500" },
  spreadsheet: { icon: "table_chart", bg: "bg-emerald-50", text: "text-emerald-500" },
  document: { icon: "description", bg: "bg-violet-50", text: "text-violet-500" },
};

interface AISummary {
  overview: string;
  missing: { label: string; severity: "high" | "medium" }[];
  expiring: { label: string; date: string }[];
  score: number;
}

const expectedDocCategories = [
  { match: ["lease", "agreement"], label: "Lease Agreement", severity: "high" as const },
  { match: ["insurance"], label: "Insurance Certificate", severity: "high" as const },
  { match: ["inspection", "safety"], label: "Inspection Report", severity: "medium" as const },
  { match: ["tax", "assessment"], label: "Tax Records", severity: "medium" as const },
  { match: ["appraisal"], label: "Property Appraisal", severity: "medium" as const },
];

function generateSummary(files: PropertyFile[]): AISummary {
  if (files.length === 0) {
    return {
      overview: "No documents uploaded yet. Upload files to auto-generate a property compliance summary.",
      missing: expectedDocCategories.map((e) => ({ label: e.label, severity: e.severity })),
      expiring: [],
      score: 0,
    };
  }

  const categories = [...new Set(files.map((f) => f.category))];
  const catList =
    categories.length <= 2
      ? categories.map((c) => c.toLowerCase()).join(" and ")
      : `${categories.slice(0, -1).map((c) => c.toLowerCase()).join(", ")}, and ${categories[categories.length - 1].toLowerCase()}`;

  const dates = files.map((f) => new Date(f.uploaded));
  const latest = new Date(Math.max(...dates.map((d) => d.getTime())));
  const monthYear = latest.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const fileCatsLower = files.map((f) => f.category.toLowerCase());
  const fileNamesLower = files.map((f) => f.name.toLowerCase());
  const allText = [...fileCatsLower, ...fileNamesLower];

  const missing: AISummary["missing"] = [];
  let found = 0;
  for (const exp of expectedDocCategories) {
    const hasIt = exp.match.some((m) => allText.some((t) => t.includes(m)));
    if (hasIt) {
      found++;
    } else {
      missing.push({ label: exp.label, severity: exp.severity });
    }
  }

  const expiring: AISummary["expiring"] = [];
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  for (const f of files) {
    const d = new Date(f.uploaded);
    const catLower = f.category.toLowerCase();
    if (d < oneYearAgo && (catLower.includes("insurance") || catLower.includes("inspection") || catLower.includes("appraisal"))) {
      expiring.push({
        label: f.name,
        date: d.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      });
    }
  }

  const score = Math.round((found / expectedDocCategories.length) * 100);

  const overview = `${files.length} document${files.length !== 1 ? "s" : ""} on file \u2014 includes ${catList}. Last updated ${monthYear}.`;

  return { overview, missing, expiring, score };
}

export default function PropertyFiles({ initialFiles }: { initialFiles: PropertyFile[] }) {
  const [files, setFiles] = useState<PropertyFile[]>(initialFiles);
  const [uploading, setUploading] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      const newFile: PropertyFile = {
        id: `file-${Date.now()}`,
        name: "New_Upload_2024.pdf",
        type: "pdf",
        size: "1.2 MB",
        uploaded: "2024-03-26",
        category: "General",
      };
      setFiles((prev) => [newFile, ...prev]);
      setUploading(false);
    }, 1500);
  };

  const handleRemove = (id: string) => {
    setRemovingId(id);
    setTimeout(() => {
      setFiles((prev) => prev.filter((f) => f.id !== id));
      setRemovingId(null);
    }, 300);
  };

  const summary = generateSummary(files);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Property Documents</h2>
        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all ${
            uploading
              ? "bg-surface-container-high text-on-surface-variant cursor-wait"
              : "bg-surface-container-lowest border border-outline-variant/20 text-on-surface hover:shadow-md"
          }`}
        >
          <span className={`material-symbols-outlined text-[18px] ${uploading ? "animate-spin" : ""}`}>
            {uploading ? "progress_activity" : "upload_file"}
          </span>
          {uploading ? "Uploading..." : "Upload File"}
        </button>
      </div>

      {/* AI Summary Card */}
      <div className="bg-surface-container-lowest rounded-xl shadow-[0_12px_32px_rgba(20,27,43,0.04)] border border-outline-variant/10 p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="shrink-0">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
              summary.score >= 80 ? "bg-emerald-50" : summary.score >= 50 ? "bg-amber-50" : "bg-red-50"
            }`}>
              <span className={`text-xl font-extrabold ${
                summary.score >= 80 ? "text-emerald-600" : summary.score >= 50 ? "text-amber-600" : "text-red-500"
              }`}>{summary.score}%</span>
            </div>
            <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest text-center mt-1">Complete</p>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-[18px]">auto_awesome</span>
              <p className="text-[11px] font-bold text-primary uppercase tracking-widest">AI Document Analysis</p>
            </div>
            <p className="text-sm text-on-surface leading-relaxed">{summary.overview}</p>

            {summary.missing.length > 0 && (
              <div className="mt-4">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-2">Missing Documents</p>
                <div className="flex flex-wrap gap-2">
                  {summary.missing.map((m) => (
                    <span
                      key={m.label}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        m.severity === "high"
                          ? "bg-red-50 text-red-600"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {m.severity === "high" ? "error" : "warning"}
                      </span>
                      {m.label}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {summary.expiring.length > 0 && (
              <div className="mt-4">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-2">May Need Renewal</p>
                <div className="flex flex-wrap gap-2">
                  {summary.expiring.map((e) => (
                    <span
                      key={e.label}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-orange-50 text-orange-600"
                    >
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      {e.label.replace(/_/g, " ").replace(/\.\w+$/, "")} ({e.date})
                    </span>
                  ))}
                </div>
              </div>
            )}

            {summary.score === 100 && summary.expiring.length === 0 && (
              <div className="mt-3 flex items-center gap-1.5 text-emerald-600">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <p className="text-[12px] font-bold">All essential documents are current and on file.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* File Grid */}
      {files.length > 0 ? (
        <div className="bg-surface-container-lowest rounded-xl shadow-[0_12px_32px_rgba(20,27,43,0.04)] overflow-hidden border border-outline-variant/10">
          <div className="divide-y divide-slate-50">
            {files.map((file) => {
              const { icon, bg, text } = typeIcons[file.type] || typeIcons.document;
              const isRemoving = removingId === file.id;
              return (
                <div
                  key={file.id}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50/50 transition-all group"
                  style={{
                    opacity: isRemoving ? 0 : 1,
                    transform: isRemoving ? "translateX(-20px)" : "translateX(0)",
                    transition: "opacity 300ms, transform 300ms",
                  }}
                >
                  <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
                    <span className={`material-symbols-outlined text-[20px] ${text}`}>{icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-on-surface truncate">{file.name}</p>
                    <p className="text-[11px] text-on-surface-variant mt-0.5">
                      {file.category} &middot; {file.size} &middot; Uploaded {file.uploaded}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-all">
                      <span className="material-symbols-outlined text-[18px]">download</span>
                    </button>
                    <button
                      onClick={() => handleRemove(file.id)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-error/10 hover:text-error transition-all"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-surface-container-lowest rounded-xl border-2 border-dashed border-outline-variant/30 p-12 text-center">
          <span className="material-symbols-outlined text-[40px] text-on-surface-variant/40 mb-3 block">folder_open</span>
          <p className="text-sm font-semibold text-on-surface-variant">No documents yet</p>
          <p className="text-xs text-on-surface-variant/60 mt-1">Upload lease agreements, insurance certificates, and other property documents</p>
        </div>
      )}
    </div>
  );
}
