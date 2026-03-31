import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Settings",
    template: "%s — The Wealth Architect",
  },
};

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
