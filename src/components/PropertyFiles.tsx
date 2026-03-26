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

function generateDescription(files: PropertyFile[]): string {
  if (files.length === 0) return "No documents uploaded yet. Upload files to auto-generate a property summary.";

  const categories = [...new Set(files.map((f) => f.category))];
  const catList =
    categories.length === 1
      ? categories[0].toLowerCase()
      : categories.length === 2
      ? `${categories[0].toLowerCase()} and ${categories[1].toLowerCase()}`
      : `${categories.slice(0, -1).map((c) => c.toLowerCase()).join(", ")}, and ${categories[categories.length - 1].toLowerCase()}`;

  const dates = files.map((f) => new Date(f.uploaded));
  const latest = new Date(Math.max(...dates.map((d) => d.getTime())));
  const monthYear = latest.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return `${files.length} document${files.length !== 1 ? "s" : ""} on file \u2014 includes ${catList}. Last updated ${monthYear}.`;
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

  const description = generateDescription(files);

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

      {/* Auto-generated Description */}
      <div className="bg-primary-fixed/20 border border-primary-fixed rounded-xl p-4 mb-6 flex gap-3">
        <span className="material-symbols-outlined text-primary text-[20px] mt-0.5 shrink-0">auto_awesome</span>
        <div>
          <p className="text-[11px] font-bold text-primary uppercase tracking-widest mb-1">AI Summary</p>
          <p className="text-sm text-on-surface leading-relaxed">{description}</p>
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
