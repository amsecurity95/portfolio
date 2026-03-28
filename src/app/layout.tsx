import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aimarportfolio-production.up.railway.app"),
  title: "Aimar Mwembo — AI Automation & Prompt Engineer",
  description: "I build systems that save companies time and money. AI automation, full-stack engineering, and custom LLMs.",
  openGraph: {
    title: "Aimar Mwembo — AI Automation & Prompt Engineer",
    description: "I build systems that save companies time and money. AI automation, full-stack engineering, and custom LLMs.",
    images: [{ url: "https://aimarportfolio-production.up.railway.app/aimar.jpg", width: 800, height: 800, alt: "Aimar Mwembo" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aimar Mwembo — AI Automation & Prompt Engineer",
    description: "I build systems that save companies time and money. AI automation, full-stack engineering, and custom LLMs.",
    images: ["https://aimarportfolio-production.up.railway.app/aimar.jpg"],
  },
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
