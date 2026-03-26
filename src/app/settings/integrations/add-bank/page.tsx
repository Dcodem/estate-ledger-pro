"use client";
import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";
import { useState } from "react";

const banks = [
  { name: "Chase", icon: "account_balance", color: "bg-blue-50 text-blue-700" },
  { name: "Wells Fargo", icon: "account_balance", color: "bg-red-50 text-red-700" },
  { name: "Bank of America", icon: "account_balance", color: "bg-red-50 text-red-800" },
  { name: "Citibank", icon: "account_balance", color: "bg-sky-50 text-sky-700" },
  { name: "Capital One", icon: "credit_card", color: "bg-orange-50 text-orange-700" },
  { name: "US Bank", icon: "account_balance", color: "bg-purple-50 text-purple-700" },
];

export default function AddBankPage() {
  const [search, setSearch] = useState("");
  const [connecting, setConnecting] = useState<string | null>(null);
  const [connected, setConnected] = useState<string[]>([]);

  const filtered = banks.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout>
      <PageHeader
        title="Add Bank Account"
        subtitle="Securely connect your financial institution"
        breadcrumb={{ label: "Integrations", href: "/settings/integrations" }}
      />

      {/* Search */}
      <div className="max-w-4xl mb-8">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">
            search
          </span>
          <input
            type="text"
            placeholder="Search for your bank or financial institution..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-outline-variant/40 bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm"
          />
        </div>
      </div>

      {/* Popular Banks Grid */}
      <section className="max-w-4xl space-y-4">
        <h3 className="text-[20px] font-semibold text-on-surface">
          Popular Banks
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((bank) => (
            <div
              key={bank.name}
              className="bg-surface-container-lowest rounded-xl card-shadow p-6 flex flex-col items-center gap-4 group hover:ring-2 hover:ring-primary/20 transition-all"
            >
              <div
                className={`w-14 h-14 flex items-center justify-center rounded-xl ${bank.color}`}
              >
                <span className="material-symbols-outlined text-[30px]">
                  {bank.icon}
                </span>
              </div>
              <span className="text-base font-semibold text-on-surface">
                {bank.name}
              </span>
              <button
                onClick={() => {
                  if (connected.includes(bank.name)) return;
                  setConnecting(bank.name);
                  setTimeout(() => {
                    setConnecting(null);
                    setConnected((prev) => [...prev, bank.name]);
                  }, 1500);
                }}
                disabled={connecting === bank.name}
                className={`w-full mt-auto px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
                  connected.includes(bank.name)
                    ? "bg-emerald-500 text-white"
                    : connecting === bank.name
                    ? "bg-primary/70 text-white cursor-wait"
                    : "text-white bg-primary hover:bg-primary/90"
                }`}
              >
                {connected.includes(bank.name)
                  ? "Connected"
                  : connecting === bank.name
                  ? "Connecting..."
                  : "Connect"}
              </button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="bg-surface-container-lowest rounded-xl card-shadow p-10 text-center">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant/40 mb-2">
              search_off
            </span>
            <p className="text-sm text-on-surface-variant">
              No banks found matching &ldquo;{search}&rdquo;. Try a different
              search term.
            </p>
          </div>
        )}
      </section>

      {/* Security Notice */}
      <div className="max-w-4xl mt-10 mb-4">
        <div className="flex items-start gap-4 bg-surface-container-lowest rounded-xl card-shadow p-6 border border-outline-variant/20">
          <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-primary-fixed-dim text-primary">
            <span className="material-symbols-outlined text-xl">lock</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-on-surface mb-1">
              Bank-level security
            </p>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              256-bit encryption. We use Plaid to securely connect to your
              financial institution. Your credentials are never stored on our
              servers and all data is encrypted in transit and at rest.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
