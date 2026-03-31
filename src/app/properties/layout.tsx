import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Properties",
    template: "%s — The Wealth Architect",
  },
};

export default function PropertiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
