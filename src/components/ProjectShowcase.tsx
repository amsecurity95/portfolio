"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, Monitor, Smartphone } from "lucide-react";
import { useState, useEffect } from "react";

interface Props {
  name: string;
  tagline: string;
  icon: string;
  color: string;
  stack: string[];
  demoUrl?: string;
  screenshots?: string[];
  features: string[];
}

export default function ProjectShowcase({ name, tagline, icon, color, stack, demoUrl, screenshots, features }: Props) {
  const [view, setView] = useState<"desktop" | "mobile">("desktop");
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) setView("mobile");
  }, []);

  return (
    <main className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text)" }}>
      {/* Header */}
      <header className="theme-border border-b px-6 py-4 flex items-center gap-4" style={{ background: "var(--bg)" }}>
        <a href="/#work" className="theme-text-muted hover:opacity-80 transition-colors">
          <ArrowLeft size={20} />
        </a>
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-xl overflow-hidden relative theme-icon-box">
            <Image src={icon} alt={name} fill className="object-contain p-1" />
          </div>
          <div>
            <h1 className="text-sm font-semibold theme-text">{name}</h1>
            <p className="text-xs theme-text-muted">{tagline}</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2">
          {stack.map((s) => (
            <span key={s} className="text-xs px-2.5 py-1 rounded-md theme-tag border theme-border">
              {s}
            </span>
          ))}
        </div>
      </header>

      {/* Demo viewer */}
      {demoUrl && (
        <div className="theme-border border-b">
          {/* Toolbar */}
          <div className="px-6 py-3 flex items-center justify-between theme-card">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/60" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <span className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="ml-3 text-xs theme-text-faint theme-tag px-3 py-1 rounded-md">
                {name.toLowerCase().replace(/\s/g, "")}.app
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setView("desktop")}
                className={`p-2 rounded-lg transition-colors ${view === "desktop" ? "text-white" : "theme-text-faint"}`}
                style={view === "desktop" ? { background: color } : {}}
              >
                <Monitor size={16} />
              </button>
              <button
                onClick={() => setView("mobile")}
                className={`p-2 rounded-lg transition-colors ${view === "mobile" ? "text-white" : "theme-text-faint"}`}
                style={view === "mobile" ? { background: color } : {}}
              >
                <Smartphone size={16} />
              </button>
            </div>
          </div>

          {/* iframe */}
          <div className="flex justify-center p-4 bg-neutral-950">
            <motion.div
              layout
              className={`relative rounded-xl overflow-hidden theme-border border bg-white ${
                view === "mobile" ? "w-[375px] h-[700px]" : "w-full max-w-6xl h-[600px]"
              }`}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <iframe
                src={demoUrl}
                className={`w-full h-full border-0 ${active ? "" : "pointer-events-none"}`}
                title={`${name} Demo`}
                sandbox="allow-scripts allow-same-origin"
              />
              {!active && (
                <div
                  onClick={() => setActive(true)}
                  className="absolute inset-0 cursor-pointer bg-gradient-to-t from-black/50 via-transparent to-transparent transition-all hover:from-black/40"
                >
                  <span
                    className="absolute bottom-4 left-4 px-4 py-2 text-white text-xs font-medium rounded-lg shadow-lg flex items-center gap-1.5"
                    style={{ background: color }}
                  >
                    <Monitor size={12} />
                    Click anywhere to interact
                  </span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}

      {/* Screenshots */}
      {screenshots && screenshots.length > 0 && !demoUrl && (
        <div className="px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-lg font-semibold theme-text mb-6">Screenshots</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {screenshots.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl overflow-hidden theme-border border"
                >
                  <Image src={src} alt={`${name} screenshot ${i + 1}`} width={800} height={500} className="w-full h-auto" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Features */}
      <div className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}>
            <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color }}>
              Features
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight theme-text mb-8">
              What it does
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.05, duration: 0.5 }}
                  className="flex items-start gap-3 p-4 rounded-xl theme-border border theme-card"
                >
                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: color }} />
                  <span className="text-sm theme-text-secondary">{f}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-8 theme-border border-t text-center">
        <p className="text-xs theme-text-faint">Built by Aimar Mwembo</p>
      </div>
    </main>
  );
}
