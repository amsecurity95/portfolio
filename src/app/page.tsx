"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, MapPin, Mail, Shield, Monitor, Brain, Palette, GraduationCap, Award, ExternalLink, Check, Sun, Moon } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import {
  SiPython, SiReact, SiNextdotjs, SiNodedotjs, SiTypescript,
  SiTailwindcss, SiSupabase, SiFramer, SiOpenai, SiAnthropic, SiGoogle,
} from "react-icons/si";
import { TbDatabase, TbBrandReactNative, TbTerminal2 } from "react-icons/tb";
import WelcomeOverlay from "@/components/WelcomeOverlay";

const blue = "#146EF5";

const projects = [
  {
    name: "BOM Generator",
    tag: "Automation",
    desc: "Automated bill-of-materials generation that reduced an 8-hour manual process to 5 minutes.",
    metric: "96x faster",
    stack: ["Python", "Automation"],
    logo: "/projects/bom-generator.png",
    zoomIcon: true,
  },
  {
    name: "Kayou LLM",
    tag: "AI / ML",
    desc: "Custom fine-tuned LLM on Qwen2.5-32B with SFT and DPO training. Multilingual: English, French, Lingala, Swahili.",
    metric: "5,400+ training examples",
    stack: ["Python", "vLLM", "RunPod"],
    logo: "/projects/kayou.png",
    link: "/kayou",
    zoomIcon: true,
  },
  {
    name: "Kayou Chat",
    tag: "AI Platform",
    desc: "Multi-agent AI platform with 9 specialized agents. Brain-based memory, mentor learning, real-time cooperation.",
    metric: "9 AI agents",
    stack: ["Node.js", "Socket.io", "Anthropic API"],
    logo: "/projects/kayou-chat.png",
    link: "/kayou-chat",
    zoomIcon: true,
  },
  {
    name: "Kayou Social",
    tag: "Social Platform",
    desc: "AI-powered social media management platform for businesses and influencers. Content scheduling, analytics, and AI-generated posts.",
    metric: "SaaS Product",
    stack: ["Next.js", "Stripe", "Remotion"],
    logo: "/projects/kayou-social.png",
    link: "/kayou-social",
    zoomIcon: true,
  },
  {
    name: "Tropical Map",
    tag: "Mobile",
    desc: "Civic infrastructure mapping app. Published on the iOS App Store with active users.",
    metric: "App Store live",
    stack: ["React Native", "Express"],
    logo: "/projects/tropical-map.png",
    link: "/tropical-map",
  },
  {
    name: "Akili Money",
    tag: "Fintech",
    desc: "USD-to-DRC remittance app enabling cross-border money transfers to the Democratic Republic of Congo.",
    metric: "Live app",
    stack: ["React Native", "Node.js"],
    logo: "/projects/akili-money.png",
    link: "/akili-money",
  },
  {
    name: "Chambana Rides",
    tag: "Platform",
    desc: "Community rideshare platform with real-time driver matching, route mapping, and driver mode.",
    metric: "Full platform",
    stack: ["React", "Leaflet", "OSRM"],
    logo: "/projects/chambana-rides.png",
    link: "/chambana-rides",
  },
];

const skills = [
  { name: "Python", icon: <SiPython /> },
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "React", icon: <SiReact /> },
  { name: "React Native", icon: <TbBrandReactNative /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "Node.js", icon: <SiNodedotjs /> },
  { name: "SQL", icon: <TbDatabase /> },
  { name: "Tailwind", icon: <SiTailwindcss /> },
  { name: "Supabase", icon: <SiSupabase /> },
  { name: "Framer Motion", icon: <SiFramer /> },
  { name: "Anthropic API", icon: <SiAnthropic /> },
  { name: "OpenAI API", icon: <SiOpenai /> },
  { name: "Claude Code", icon: <TbTerminal2 /> },
];

export default function Home() {
  const [theme, setTheme] = useState<"dark"|"light">("dark");
  useEffect(() => {
    const saved = localStorage.getItem("portfolio_theme") as "dark"|"light"|null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);
  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("portfolio_theme", next);
  };

  const [viewed, setViewed] = useState<Set<string>>(new Set());
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("portfolio_viewed") || "[]");
      if (Array.isArray(stored)) setViewed(new Set(stored));
      localStorage.removeItem("portfolio_viewed");
    } catch {}
  }, []);
  const markViewed = (name: string) => {
    try {
      const stored = JSON.parse(localStorage.getItem("portfolio_viewed") || "[]");
      const arr = Array.isArray(stored) ? stored : [];
      if (!arr.includes(name)) arr.push(name);
      localStorage.setItem("portfolio_viewed", JSON.stringify(arr));
    } catch {}
  };

  return (
    <>
    <WelcomeOverlay />
    <main>
      {/* ─── NAV ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-12 py-4 md:py-5 flex items-center justify-between theme-nav backdrop-blur-xl border-b theme-border transition-colors duration-300">
        <a href="#" className="text-lg font-semibold tracking-tight theme-text">
          Aimar<span style={{ color: blue }}>.</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm theme-text-muted">
          {["Work", "Experience", "Skills", "About", "Contact"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="hover:opacity-100 transition-colors duration-200">
              {l}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={toggleTheme}
            className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center theme-card theme-border border transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <a href="#contact" className="text-xs md:text-sm font-medium px-4 md:px-5 py-2 md:py-2.5 rounded-full transition-colors duration-200" style={{ background: blue, color: "#fff" }}>
            Get in touch
          </a>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 md:px-12 overflow-hidden">
        <div className="max-w-5xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
            {/* Photo */}
            <div className="relative flex-shrink-0">
              <div className="w-52 h-52 md:w-72 md:h-72 rounded-3xl overflow-hidden border theme-border relative">
                <Image src="/aimar.jpg" alt="Aimar Mwembo" fill className="object-cover object-top" priority />
              </div>
              <div className="absolute -inset-1 rounded-3xl -z-10 opacity-30 blur-2xl" style={{ background: blue }} />
            </div>

            {/* Text */}
            <div className="text-center lg:text-left flex-1">
              <p
                className="text-sm font-medium tracking-widest uppercase mb-4"
                style={{ color: blue }}
              >
                AI Automation & Prompt Engineer
              </p>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6">
                Aimar
                <br />
                Mwembo
              </h1>

              <p className="text-lg md:text-xl theme-text-secondary font-light max-w-lg mb-4">
                I don&apos;t just write code — I build systems that save companies time and money.
              </p>

              <div className="flex items-center gap-3 justify-center lg:justify-start text-sm theme-text-muted">
                <MapPin size={14} />
                <span>Champaign-Urbana, IL</span>
                <span className="theme-text-faint">|</span>
                <span>Open to Remote</span>
              </div>

              <div className="flex gap-4 mt-8 justify-center lg:justify-start">
                <a href="#work" className="px-7 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105" style={{ background: blue }}>
                  View work
                </a>
                <a href="#contact" className="px-7 py-3 rounded-full text-sm font-semibold border border-white/[0.12] theme-text hover:theme-icon-box transition-all duration-200">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WORK ─── */}
      <section id="work" className="px-6 md:px-12 py-32">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: blue }}>
                Selected work
              </p>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Projects</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((p) => {
              const Wrapper = p.link ? "a" : "div";
              const wrapperProps = p.link ? { href: p.link, onClick: () => markViewed(p.name) } : {};
              const isViewed = viewed.has(p.name);
              return (
              <div
                key={p.name}
                className="group rounded-2xl border theme-border theme-card hover-card transition-all duration-300 overflow-hidden relative"
              >
                {isViewed && (
                  <div className="absolute top-3 right-3 z-10 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#10B981" }}>
                    <Check size={14} className="text-white" strokeWidth={3} />
                  </div>
                )}
                <Wrapper {...wrapperProps} className={p.link ? "block p-7" : "p-7"}>
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl theme-icon-box border theme-border relative overflow-hidden`}>
                        <Image src={p.logo} alt={p.name} fill className={p.zoomIcon ? "object-cover scale-[1.03]" : "object-contain p-1.5"} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold theme-text group-hover:text-[#146EF5] transition-colors duration-200">
                          {p.name}
                        </h3>
                        <span className="text-xs theme-text-muted">{p.tag}</span>
                      </div>
                    </div>
                    <ArrowUpRight size={18} className={`theme-text-faint group-hover:theme-text group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 ${isViewed ? "mt-5" : ""}`} />
                  </div>

                  <p className="text-sm theme-text-secondary leading-relaxed mb-5">{p.desc}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {p.stack.map((s) => (
                        <span key={s} className="text-xs px-2.5 py-1 rounded-md theme-tag border theme-border theme-text-secondary">
                          {s}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-medium" style={{ color: blue }}>{p.metric}</span>
                  </div>
                </Wrapper>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── KAYOU SPOTLIGHT ─── */}
      <section className="px-6 md:px-12 py-32 border-t theme-border relative overflow-hidden">
        {/* Subtle blue glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#146EF5]/[0.04] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Left — Kayou info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl overflow-hidden relative theme-icon-box border theme-border">
                  <Image src="/kayou-logo.png" alt="Kayou" fill className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-medium tracking-widest uppercase" style={{ color: blue }}>Featured Project</p>
                  <h2 className="text-2xl font-bold theme-text">Kayou AI</h2>
                </div>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold tracking-tight theme-text leading-tight mb-6">
                I built my own AI — from training the model to deploying it.
              </h3>

              <p className="theme-text-secondary text-base leading-relaxed mb-8">
                Kayou is not a wrapper around ChatGPT. I fine-tuned a 32-billion parameter model from scratch,
                built a multi-agent orchestration platform around it, and created a social media SaaS product powered by AI agents.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { value: "32B", label: "Parameter custom LLM" },
                  { value: "9", label: "Specialized AI agents" },
                  { value: "5,400+", label: "Training examples" },
                  { value: "4", label: "Languages supported" },
                ].map((stat) => (
                  <div key={stat.label} className="p-4 rounded-xl border theme-border theme-card">
                    <p className="text-2xl font-bold theme-text">{stat.value}</p>
                    <p className="text-xs theme-text-muted mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              <a
                href="/kayou"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold theme-text transition-all duration-200 hover:scale-105"
                style={{ background: blue }}
              >
                Talk to Kayou
                <ArrowUpRight size={16} />
              </a>
            </div>

            {/* Right — The 3 Kayou products */}
            <div className="flex-1 space-y-4 w-full">
              {[
                {
                  title: "Kayou LLM",
                  desc: "Custom fine-tuned model trained with SFT + DPO. Speaks English, French, Lingala, and Swahili.",
                  href: "/kayou",
                  accent: "#146EF5",
                  icon: "/kayou-logo.png",
                },
                {
                  title: "Kayou Chat",
                  desc: "9-agent platform with persistent memory, mentor learning, and real-time cooperation between agents.",
                  href: "/kayou-chat",
                  accent: "#4ade80",
                  icon: "/projects/kayou-chat.png",
                },
                {
                  title: "Kayou Social",
                  desc: "AI social media SaaS — content generation, scheduling, analytics, and Remotion video creation.",
                  href: "/kayou-social",
                  accent: "#E91E8C",
                  icon: "/projects/kayou-social.png",
                },
              ].map((product) => (
                <a
                  key={product.title}
                  href={product.href}
                  className="group flex items-start gap-4 p-5 rounded-xl border theme-border theme-card hover-card transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden relative theme-icon-box border theme-border flex-shrink-0">
                    <Image src={product.icon} alt={product.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="theme-text font-semibold text-sm group-hover:text-[#146EF5] transition-colors flex items-center gap-2">
                      {product.title}
                      <ArrowUpRight size={14} className="theme-text-faint group-hover:theme-text transition-colors" />
                    </h4>
                    <p className="theme-text-muted text-xs mt-1 leading-relaxed">{product.desc}</p>
                  </div>
                  <div className="w-1.5 h-8 rounded-full mt-1" style={{ background: product.accent, opacity: 0.6 }} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SKILLS ─── */}
      <section id="skills" className="px-6 md:px-12 py-32 border-t theme-border">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: blue }}>
              Toolkit
            </p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Skills</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {skills.map((s) => (
              <div
                key={s.name}
                className="flex flex-col items-center gap-3 py-6 px-4 rounded-xl border theme-border theme-card hover:border-[#146EF5]/30 transition-all duration-200 cursor-default"
              >
                <span className="text-2xl theme-text-secondary">{s.icon}</span>
                <span className="text-xs font-medium theme-text-secondary">{s.name}</span>
              </div>
            ))}
          </div>

          {/* Certifications & Education */}
          <div className="mt-24">
            <div className="mb-10">
              <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: blue }}>
                Credentials
              </p>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight theme-text">
                Certifications & Education
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  name: "Google Cybersecurity",
                  org: "Google",
                  icon: <Shield size={20} />,
                  type: "Professional Certificate",
                  color: "#4285F4",
                  googleIcon: true,
                  link: "/cert-cybersecurity.jpg",
                },
                {
                  name: "Google IT Support",
                  org: "Google",
                  icon: <Monitor size={20} />,
                  type: "Professional Certificate",
                  color: "#34A853",
                  googleIcon: true,
                },
                {
                  name: "Google AI Foundations",
                  org: "Google",
                  icon: <Brain size={20} />,
                  type: "Professional Certificate",
                  color: "#FBBC05",
                  googleIcon: true,
                },
                {
                  name: "MCP: Advanced Topics",
                  org: "Anthropic",
                  icon: <SiAnthropic size={20} />,
                  type: "Professional Certificate",
                  color: "#D4A574",
                  link: "/claude-certificate.pdf",
                },
                {
                  name: "Google UX Design",
                  org: "Google",
                  icon: <Palette size={20} />,
                  type: "Professional Certificate",
                  color: "#EA4335",
                  googleIcon: true,
                  link: "/cert-ux-design.png",
                },
                {
                  name: "Computer Science",
                  org: "University of Congo",
                  icon: <GraduationCap size={20} />,
                  type: "Degree",
                  color: "#146EF5",
                },
              ].map((cert) => {
                const inner = (
                  <>
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 relative"
                      style={{ background: cert.color + "18" }}
                    >
                      <span style={{ color: cert.color }}>{cert.icon}</span>
                      {cert.googleIcon && (
                        <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full theme-icon-box border theme-border flex items-center justify-center">
                          <SiGoogle size={10} className="theme-text" />
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold theme-text flex items-center gap-1.5">
                        {cert.name}
                        {cert.link && <ExternalLink size={12} className="theme-text-faint" />}
                      </p>
                      <p className="text-xs theme-text-muted">{cert.org}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Award size={14} style={{ color: cert.color }} className="hidden sm:block" />
                      <span
                        className="text-xs px-2.5 py-1 rounded-full font-medium hidden sm:block"
                        style={{ background: cert.color + "15", color: cert.color }}
                      >
                        {cert.type}
                      </span>
                    </div>
                  </>
                );

                return cert.link ? (
                  <a
                    key={cert.name}
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-5 rounded-xl border theme-border theme-card hover-card theme-border-hover transition-all duration-300"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={cert.name} className="group flex items-center gap-4 p-5 rounded-xl border theme-border theme-card hover-card transition-all duration-300">
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── EXPERIENCE ─── */}
      <section id="experience" className="px-6 md:px-12 py-32 border-t theme-border">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: blue }}>
              Career
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight theme-text">Experience</h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px theme-icon-box" />

            {[
              {
                role: "AI Automation & Internal Tools Engineer",
                company: "Elite ICT",
                location: "Champaign-Urbana, IL",
                period: "2023 -- Present",
                color: blue,
                bullets: [
                  "Built an AI-powered Bill of Materials (BOM) Generator in Python that reduced a manual 6-8 hour process to under 5 minutes, saving the team ~160 hours/month",
                  "Developing Insight-Elite, a financial intelligence dashboard integrating with Trimble Spectrum ERP via SQL Server/Info-Link for real-time project and cost visibility",
                  "Engineered Schedule Fluid, a drag-and-drop employee scheduling web app for telecom/construction crews with real-time persistence and mobile-responsive UI",
                  "Prepared executive-level presentations and contractor-to-employee conversion documentation for C-suite stakeholders",
                  "Led internal AI strategy, introducing AI-assisted development workflows that accelerated build cycles across the team",
                ],
              },
              {
                role: "Founder & Lead Engineer",
                company: "Puzzle Business Group",
                location: "Champaign-Urbana, IL",
                period: "2023 -- Present",
                color: "#A855F7",
                bullets: [
                  "Founded and operate a multi-division holding company with active tech, logistics, and creative studio arms",
                  "Building Chambana Rides, a community-based rideshare platform for airport/long-distance trips with an 80/20 driver-favorable commission model",
                  "Developing Akili Money, a USD-to-DRC mobile money transfer app targeting Congolese diaspora remittances with Thunes API integration",
                  "Published Tropical Map to the iOS App Store — a civic infrastructure and digital addressing platform for Congolese cities featuring geospatial command center and real-time data layers",
                  "Built and deployed puzzlemasterprod.com, a Next.js music album site with Stripe payments and Cloudflare R2 audio CDN",
                  "Designed and architected OpenDeploy (sOlid), a self-hosted PaaS platform inspired by Railway using Turborepo, Fastify, Next.js 14, Kubernetes/K3s, and managed database provisioning",
                ],
              },
              {
                role: "Server Support Technician",
                company: "Worldwide Tech Services",
                location: "Remote / On-site",
                period: "2020 -- 2022",
                color: "#10B981",
                bullets: [
                  "Provided hardware break-fix support for enterprise server environments including Dell, HP, and Lenovo rack and blade systems",
                  "Diagnosed and replaced failed components — motherboards, RAID controllers, power supplies, DIMMs, CPUs, and hard drives — under SLA deadlines",
                  "Performed firmware and BIOS updates, RAID array rebuilds, and system health diagnostics using vendor-specific tools (iDRAC, iLO, IMM)",
                  "Documented service actions and coordinated with dispatch and logistics for parts management and escalation",
                  "Maintained a 95%+ first-time fix rate across data center and on-site service calls",
                ],
              },
            ].map((job) => (
              <div
                key={job.company}
                className="relative pl-8 pb-12 last:pb-0"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2"
                  style={{ background: job.color, borderColor: "var(--bg)" }}
                />
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold theme-text">{job.role}</h3>
                    <p className="text-sm theme-text-secondary">{job.company} <span className="theme-text-faint mx-1.5">|</span> {job.location}</p>
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full mt-2 sm:mt-0 w-fit" style={{ background: job.color + "15", color: job.color }}>
                    {job.period}
                  </span>
                </div>
                <ul className="space-y-2">
                  {job.bullets.map((b, j) => (
                    <li key={j} className="text-sm theme-text-muted leading-relaxed flex gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: job.color }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="px-6 md:px-12 py-32 border-t theme-border">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: blue }}>About</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
            Building at the intersection of AI and engineering.
          </h2>
          <div className="space-y-5 theme-text-secondary text-lg leading-relaxed">
            <p>
              I&apos;m an AI Automation & Prompt Engineer with a track record of building systems that dramatically cut operational costs.
              My work spans custom LLMs, multi-agent platforms, mobile apps, and process automation.
            </p>
            <p>
              I trained my own large language model on Qwen2.5-32B, built a 9-agent AI orchestration platform,
              published an app on the iOS App Store, and automated an 8-hour manufacturing process down to 5 minutes.
            </p>
            <p>
              I speak English, French, Lingala, and Swahili. I&apos;m based in Champaign-Urbana, IL and open to
              remote roles and on-site opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="px-6 md:px-12 py-32 border-t theme-border">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: blue }}>
            Contact
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Let&apos;s work together.
          </h2>
          <p className="theme-text-secondary text-lg mb-10 max-w-xl mx-auto">
            Looking for an AI engineer who ships production systems? I&apos;m available as a contractor, consultant, or for full-time roles.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="mailto:aimarmwe@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105"
              style={{ background: blue }}
            >
              <Mail size={16} />
              aimarmwe@gmail.com
            </a>
          </div>

          <div className="flex justify-center gap-6">
            <a href="https://github.com/amsecurity95" target="_blank" rel="noopener noreferrer" className="theme-text-muted hover:theme-text transition-colors duration-200">
              <SiGithub size={22} />
            </a>
            <a href="https://linkedin.com/in/amsecurity95" target="_blank" rel="noopener noreferrer" className="theme-text-muted hover:theme-text transition-colors duration-200">
              <FaLinkedinIn size={22} />
            </a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="px-6 md:px-12 py-8 border-t theme-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs theme-text-faint">
          <span>&copy; 2026 Aimar Mwembo</span>
          <span>Built with Next.js & Claude</span>
        </div>
      </footer>
    </main>
    </>
  );
}
