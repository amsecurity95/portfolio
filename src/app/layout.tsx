import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aimar Mwembo — AI Automation & Prompt Engineer",
  description: "I build systems that save companies time and money. AI automation, full-stack engineering, and custom LLMs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
