import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Estate Ledger Pro",
  description: "Luxury real estate wealth management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
