"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, MapPin, Mail, Shield, Monitor, Brain, Palette, GraduationCap, ExternalLink, Check, Sun, Moon, Sparkles } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import {
  SiPython, SiReact, SiNextdotjs, SiNodedotjs, SiTypescript,
  SiTailwindcss, SiSupabase, SiFramer, SiOpenai, SiAnthropic, SiGoogle,
} from "react-icons/si";
import { TbDatabase, TbBrandReactNative, TbTerminal2 } from "react-icons/tb";
import WelcomeOverlay from "@/components/WelcomeOverlay";
import LiquidWaves from "@/components/LiquidWaves";
import ScrollReveal, { ScrollRevealText } from "@/components/ScrollReveal";

const accent = "#2563EB";

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
    metric: "5,400+ examples",
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
    stack: ["Node.js", "Socket.io"],
    logo: "/projects/kayou-chat.png",
    link: "/kayou-chat",
    zoomIcon: true,
  },
  {
    name: "Kayou Social",
    tag: "SaaS",
    desc: "AI-powered social media management. Content scheduling, analytics, and AI-generated posts.",
    metric: "SaaS Product",
    stack: ["Next.js", "Stripe"],
    logo: "/projects/kayou-social.png",
    link: "/kayou-social",
    zoomIcon: true,
  },
  {
    name: "Tropical Map",
    tag: "Mobile",
    desc: "Civic infrastructure mapping app for Congolese cities with geospatial data layers.",
    metric: "Live app",
    stack: ["React Native", "Express"],
    logo: "/projects/tropical-map.png",
    link: "/tropical-map",
  },
  {
    name: "Akili Money",
    tag: "Fintech",
    desc: "USD-to-DRC remittance app enabling cross-border money transfers to Congo.",
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
    stack: ["React", "Leaflet"],
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

const stats = [
  { value: "96x", label: "Faster automation" },
  { value: "32B", label: "Parameter LLM" },
  { value: "9", label: "AI agents built" },
  { value: "5,400+", label: "Training examples" },
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
    {theme === "light" && <LiquidWaves />}
    <main className="relative">

      {/* ─── NAV ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between theme-nav backdrop-blur-2xl border-b theme-border transition-all duration-500">
        <a href="#" className="text-lg font-bold tracking-tight theme-text">
          Aimar<span style={{ color: accent }}>.</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-[13px] font-medium theme-text-muted">
          {["Work", "Skills", "Experience", "About", "Contact"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-[var(--text)] transition-colors duration-300">
              {l}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 hover:border-[var(--border-hover)]"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <a href="#contact" className="pill-btn pill-btn-primary text-xs py-2 px-5">
            Get in touch
          </a>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 px-6 md:px-12 overflow-hidden">
        {/* Glow orbs */}
        <div className="glow-orb w-[500px] h-[500px] top-[-10%] left-[-10%]" style={{ background: accent }} />
        <div className="glow-orb w-[400px] h-[400px] bottom-[10%] right-[-5%]" style={{ background: '#60a5fa' }} />
        <div className="glow-orb w-[300px] h-[300px] top-[40%] left-[60%]" style={{ background: '#1d4ed8' }} />

        <div className="max-w-5xl mx-auto w-full relative z-10">
          <div className="text-center">
            {/* Photo */}
            <ScrollReveal delay={0.1} y={30} scale={0.95}>
              <div className="relative inline-block mb-6">
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 relative mx-auto" style={{ borderColor: accent }}>
                  <Image src="/aimar.jpg" alt="Aimar" fill className="object-cover object-top" priority />
                </div>
                <div className="absolute -inset-4 rounded-full -z-10 opacity-20 blur-3xl" style={{ background: accent }} />
              </div>
            </ScrollReveal>

            {/* Badge */}
            <ScrollRevealText delay={0.2}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <Sparkles size={14} style={{ color: accent }} />
                <span className="text-xs font-medium theme-text-muted">AI Automation Engineer</span>
              </div>
            </ScrollRevealText>

            {/* Hero heading */}
            <ScrollRevealText delay={0.3}>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-8">
                <span className="theme-text">Hi, I&apos;m</span>
                <br />
                <span className="gradient-text">Aimar</span>
              </h1>
            </ScrollRevealText>

            {/* Subtitle */}
            <ScrollRevealText delay={0.35}>
              <p className="text-base md:text-xl theme-text-secondary font-normal max-w-2xl mx-auto mb-6 leading-relaxed px-2">
                I&apos;ve built several automation web apps, softwares, and mobile applications
                for companies in Illinois to automate their workflow.
                Try out my AI Kayou that I built and trained.
              </p>
            </ScrollRevealText>

            <ScrollRevealText delay={0.4}>
              <div className="flex items-center justify-center gap-3 text-sm theme-text-muted mb-10">
                <MapPin size={14} />
                <span>Illinois, USA</span>
                <span>|</span>
                <span>Open to Remote</span>
              </div>
            </ScrollRevealText>

            {/* CTA buttons */}
            <ScrollRevealText delay={0.5}>
              <div className="flex gap-4 justify-center flex-wrap">
                <a href="/kayou" className="pill-btn pill-btn-primary">
                  <Sparkles size={16} />
                  Talk to Kayou AI
                </a>
                <a href="#work" className="pill-btn pill-btn-ghost">
                  View work
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </ScrollRevealText>

          </div>
        </div>
      </section>

      {/* ─── STATS MARQUEE ─── */}
      <div className="section-divider" />
      <section className="py-20 px-6 md:px-12">
        <ScrollReveal y={30}>
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="stat-card">
                <p className="stat-value mb-2">{s.value}</p>
                <p className="text-xs theme-text-muted font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ─── WORK ─── */}
      <div className="section-divider" />
      <section id="work" className="px-6 md:px-12 py-28">
        <div className="max-w-6xl mx-auto">
          <ScrollRevealText>
            <div className="text-center mb-20">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: accent }}>
                Selected work
              </p>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
                Projects I&apos;ve shipped
              </h2>
            </div>
          </ScrollRevealText>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((p, i) => {
              const Wrapper = p.link ? "a" : "div";
              const wrapperProps = p.link ? { href: p.link, onClick: () => markViewed(p.name) } : {};
              const isViewed = viewed.has(p.name);
              return (
              <ScrollReveal key={p.name} delay={i * 0.08} y={40}>
                <div className="bento-card h-full">
                  {isViewed && (
                    <div className="absolute top-4 right-4 z-10 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#10B981" }}>
                      <Check size={14} className="text-white" strokeWidth={3} />
                    </div>
                  )}
                  <Wrapper {...wrapperProps} className={p.link ? "block" : ""}>
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl border relative overflow-hidden" style={{ background: 'var(--icon-bg)', borderColor: 'var(--icon-border)' }}>
                          <Image src={p.logo} alt={p.name} fill className={p.zoomIcon ? "object-cover scale-[1.03]" : "object-contain p-2"} />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold theme-text">{p.name}</h3>
                          <span className="text-xs theme-text-faint font-medium">{p.tag}</span>
                        </div>
                      </div>
                      <ArrowUpRight size={16} className={`theme-text-faint transition-all duration-300 ${isViewed ? "mt-5" : ""}`} />
                    </div>

                    <p className="text-sm theme-text-muted leading-relaxed mb-6">{p.desc}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {p.stack.map((s) => (
                          <span key={s} className="text-[11px] px-2.5 py-1 rounded-full font-medium" style={{ background: 'var(--bg-tag)', color: 'var(--text-muted)' }}>
                            {s}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs font-semibold" style={{ color: accent }}>{p.metric}</span>
                    </div>
                  </Wrapper>
                </div>
              </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── KAYOU SPOTLIGHT ─── */}
      <div className="section-divider" />
      <section className="px-6 md:px-12 py-28 relative overflow-hidden">
        {/* Glow */}
        <div className="glow-orb w-[600px] h-[600px] top-[20%] left-[30%]" style={{ background: accent }} />

        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollRevealText>
            <div className="text-center mb-16">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: accent }}>
                Featured project
              </p>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                I built my own AI
              </h2>
              <p className="theme-text-muted text-lg max-w-2xl mx-auto">
                Kayou is not a wrapper around ChatGPT. I fine-tuned a 32-billion parameter model from scratch,
                built a multi-agent orchestration platform, and created a SaaS product powered by AI agents.
              </p>
            </div>
          </ScrollRevealText>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                title: "Kayou LLM",
                desc: "Custom fine-tuned model trained with SFT + DPO. Speaks English, French, Lingala, and Swahili.",
                href: "/kayou",
                icon: "/kayou-logo.png",
                gradient: "from-blue-500/10 to-transparent",
              },
              {
                title: "Kayou Chat",
                desc: "9-agent platform with persistent memory, mentor learning, and real-time cooperation.",
                href: "/kayou-chat",
                icon: "/projects/kayou-chat.png",
                gradient: "from-green-500/10 to-transparent",
              },
              {
                title: "Kayou Social",
                desc: "AI social media SaaS — content generation, scheduling, analytics, and video creation.",
                href: "/kayou-social",
                icon: "/projects/kayou-social.png",
                gradient: "from-pink-500/10 to-transparent",
              },
            ].map((product, i) => (
              <ScrollReveal key={product.title} delay={i * 0.12} y={40}>
                <a href={product.href} className={`bento-card block h-full bg-gradient-to-b ${product.gradient}`}>
                  <div className="w-14 h-14 rounded-2xl overflow-hidden relative border mb-5" style={{ background: 'var(--icon-bg)', borderColor: 'var(--icon-border)' }}>
                    <Image src={product.icon} alt={product.title} fill className="object-cover" />
                  </div>
                  <h4 className="text-lg font-semibold theme-text mb-2 flex items-center gap-2">
                    {product.title}
                    <ArrowUpRight size={16} className="theme-text-faint" />
                  </h4>
                  <p className="theme-text-muted text-sm leading-relaxed">{product.desc}</p>
                </a>
              </ScrollReveal>
            ))}
          </div>

          <ScrollRevealText delay={0.3}>
            <div className="text-center mt-12">
              <a href="/kayou" className="pill-btn pill-btn-primary">
                <Sparkles size={16} />
                Talk to Kayou
              </a>
            </div>
          </ScrollRevealText>
        </div>
      </section>

      {/* ─── SKILLS ─── */}
      <div className="section-divider" />
      <section id="skills" className="px-6 md:px-12 py-28">
        <div className="max-w-6xl mx-auto">
          <ScrollRevealText>
            <div className="text-center mb-16">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: accent }}>
                Toolkit
              </p>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Tech I work with</h2>
            </div>
          </ScrollRevealText>

          <ScrollReveal y={30}>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
              {skills.map((s) => (
                <div
                  key={s.name}
                  className="flex flex-col items-center gap-3 py-5 px-3 rounded-2xl border transition-all duration-300 hover:border-[rgba(124,58,237,0.3)] hover:shadow-[0_0_20px_var(--accent-glow)] cursor-default"
                  style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
                >
                  <span className="text-xl theme-text-muted">{s.icon}</span>
                  <span className="text-[11px] font-medium theme-text-muted">{s.name}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Certifications */}
          <div className="mt-24">
            <ScrollRevealText>
              <div className="text-center mb-12">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: accent }}>
                  Credentials
                </p>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight theme-text">
                  Certifications & Education
                </h3>
              </div>
            </ScrollRevealText>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {[
                { name: "Google Cybersecurity", org: "Google", icon: <Shield size={20} />, type: "Professional Certificate", color: "#4285F4", googleIcon: true, link: "/cert-cybersecurity.jpg" },
                { name: "Google IT Support", org: "Google", icon: <Monitor size={20} />, type: "Professional Certificate", color: "#34A853", googleIcon: true },
                { name: "Google AI Foundations", org: "Google", icon: <Brain size={20} />, type: "Professional Certificate", color: "#FBBC05", googleIcon: true },
                { name: "MCP: Advanced Topics", org: "Anthropic", icon: <SiAnthropic size={20} />, type: "Professional Certificate", color: "#D4A574", link: "/claude-certificate.pdf" },
                { name: "Google UX Design", org: "Google", icon: <Palette size={20} />, type: "Professional Certificate", color: "#EA4335", googleIcon: true, link: "/cert-ux-design.png" },
                { name: "Computer Science", org: "University of Congo", icon: <GraduationCap size={20} />, type: "Degree", color: accent },
              ].map((cert, i) => {
                const inner = (
                  <>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 relative" style={{ background: cert.color + "12" }}>
                      <span style={{ color: cert.color }}>{cert.icon}</span>
                      {cert.googleIcon && (
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
                          <SiGoogle size={8} className="theme-text-muted" />
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold theme-text flex items-center gap-1.5">
                        {cert.name}
                        {cert.link && <ExternalLink size={11} className="theme-text-faint" />}
                      </p>
                      <p className="text-xs theme-text-muted">{cert.org}</p>
                    </div>
                    <span className="text-[10px] px-2.5 py-1 rounded-full font-medium hidden sm:block" style={{ background: cert.color + "10", color: cert.color }}>
                      {cert.type}
                    </span>
                  </>
                );

                return (
                  <ScrollReveal key={cert.name} delay={i * 0.06} y={20}>
                    {cert.link ? (
                      <a href={cert.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 hover:border-[var(--border-hover)]" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                        {inner}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                        {inner}
                      </div>
                    )}
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── EXPERIENCE ─── */}
      <div className="section-divider" />
      <section id="experience" className="px-6 md:px-12 py-28">
        <div className="max-w-4xl mx-auto">
          <ScrollRevealText>
            <div className="text-center mb-16">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: accent }}>
                Career
              </p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight theme-text">Experience</h2>
            </div>
          </ScrollRevealText>

          <div className="space-y-6">
            {[
              {
                role: "AI Automation & Internal Tools Engineer",
                company: "Elite ICT",
                location: "Illinois, USA",
                period: "2023 -- Present",
                color: accent,
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
                location: "Illinois, USA",
                period: "2023 -- Present",
                color: "#A855F7",
                bullets: [
                  "Founded and operate a multi-division holding company with active tech, logistics, and creative studio arms",
                  "Building Chambana Rides, a community-based rideshare platform for airport/long-distance trips with an 80/20 driver-favorable commission model",
                  "Developing Akili Money, a USD-to-DRC mobile money transfer app targeting Congolese diaspora remittances with Thunes API integration",
                  "Built Tropical Map — a civic infrastructure and digital addressing platform for Congolese cities with geospatial command center and real-time data layers",
                  "Built and deployed puzzlemasterprod.com, a Next.js music album site with Stripe payments and Cloudflare R2 audio CDN",
                  "Designed and architected OpenDeploy (sOlid), a self-hosted PaaS platform inspired by Railway",
                ],
              },
              {
                role: "Server Support Technician",
                company: "Worldwide Tech Services",
                location: "Remote / On-site",
                period: "2020 -- 2022",
                color: "#10B981",
                bullets: [
                  "Provided hardware break-fix support for enterprise server environments including Dell, HP, and Lenovo",
                  "Diagnosed and replaced failed components under SLA deadlines with 95%+ first-time fix rate",
                  "Performed firmware and BIOS updates, RAID array rebuilds using vendor-specific tools (iDRAC, iLO, IMM)",
                  "Documented service actions and coordinated with dispatch and logistics for parts management",
                ],
              },
            ].map((job, i) => (
              <ScrollReveal key={job.company} delay={i * 0.12} y={40}>
                <div className="bento-card">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: job.color }} />
                      <div>
                        <h3 className="text-base font-semibold theme-text">{job.role}</h3>
                        <p className="text-sm theme-text-muted">{job.company} <span className="theme-text-faint mx-1">·</span> {job.location}</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium px-3 py-1.5 rounded-full w-fit" style={{ background: job.color + "12", color: job.color }}>
                      {job.period}
                    </span>
                  </div>
                  <ul className="space-y-2.5 pl-6">
                    {job.bullets.map((b, j) => (
                      <li key={j} className="text-sm theme-text-muted leading-relaxed flex gap-3">
                        <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ background: job.color, opacity: 0.6 }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <div className="section-divider" />
      <section id="about" className="px-6 md:px-12 py-28 relative overflow-hidden">
        <div className="glow-orb w-[400px] h-[400px] bottom-0 right-[-10%]" style={{ background: '#1d4ed8' }} />

        <div className="max-w-3xl mx-auto relative z-10">
          <ScrollRevealText>
            <div className="text-center mb-12">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: accent }}>About</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
                Building at the intersection
              </h2>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight gradient-text">
                of AI and engineering.
              </h2>
            </div>
          </ScrollRevealText>

          <ScrollReveal y={30} delay={0.15}>
            <div className="space-y-6 theme-text-muted text-base md:text-lg leading-relaxed text-center">
              <p>
                I&apos;m an AI Automation Engineer with a track record of building systems that dramatically cut operational costs.
                My work spans custom LLMs, multi-agent platforms, mobile apps, and process automation.
              </p>
              <p>
                I trained my own large language model on Qwen2.5-32B, built a 9-agent AI orchestration platform,
                and automated an 8-hour manufacturing process down to 5 minutes.
              </p>
              <p>
                I speak English, French, Lingala, and Swahili. I&apos;m based in Illinois, USA and open to
                remote roles and on-site opportunities.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <div className="section-divider" />
      <section id="contact" className="px-6 md:px-12 py-28 relative overflow-hidden">
        <div className="glow-orb w-[500px] h-[500px] top-[10%] left-[20%]" style={{ background: accent }} />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <ScrollRevealText>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: accent }}>
              Contact
            </p>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Let&apos;s work
              <br />
              <span className="gradient-text">together.</span>
            </h2>
            <p className="theme-text-muted text-lg mb-12 max-w-xl mx-auto">
              Looking for an AI engineer who ships production systems? I&apos;m available as a contractor, consultant, or for full-time roles.
            </p>
          </ScrollRevealText>

          <ScrollRevealText delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
              <a href="mailto:aimarmwe@gmail.com" className="pill-btn pill-btn-primary">
                <Mail size={16} />
                aimarmwe@gmail.com
              </a>
            </div>
          </ScrollRevealText>

          <ScrollRevealText delay={0.3}>
            <div className="flex justify-center gap-5">
              <a href="https://github.com/amsecurity95" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border flex items-center justify-center theme-text-muted hover:theme-text transition-all duration-300 hover:border-[var(--border-hover)]" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <SiGithub size={18} />
              </a>
              <a href="https://linkedin.com/in/amsecurity95" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border flex items-center justify-center theme-text-muted hover:theme-text transition-all duration-300 hover:border-[var(--border-hover)]" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </ScrollRevealText>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <div className="section-divider" />
      <footer className="px-6 md:px-12 py-10">
        <div className="max-w-6xl mx-auto text-center text-xs theme-text-faint">
          <span>&copy; 2026 Aimar</span>
        </div>
      </footer>
    </main>
    </>
  );
}
