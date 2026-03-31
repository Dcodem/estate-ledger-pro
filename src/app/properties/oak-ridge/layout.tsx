import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oak Ridge Estate",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
