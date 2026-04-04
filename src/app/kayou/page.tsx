"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Send, Loader2, ArrowLeft, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function KayouPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/kayou-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });
      const data = await res.json();
      setMessages([...updated, { role: "assistant", content: data.reply || data.error || "..." }]);
    } catch {
      setMessages([...updated, { role: "assistant", content: "Something went wrong. Try again." }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <main className="min-h-screen bg-black flex flex-col overflow-x-hidden">
      {/* Header */}
      <header className="border-b border-white/[0.06] px-6 py-4 flex items-center gap-4">
        <a href="/#work" className="text-neutral-500 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </a>
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-full overflow-hidden relative bg-neutral-900">
            <Image src="/kayou-logo.png" alt="Kayou" fill className="object-cover" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-white flex items-center gap-2">
              Kayou
              <span className="w-2 h-2 bg-green-500 rounded-full" />
            </h1>
            <p className="text-xs text-neutral-500">Custom LLM by Aimar</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06]">
          <Sparkles size={12} className="text-[#2563EB]" />
          <span className="text-xs text-neutral-400">Custom LLM</span>
        </div>
      </header>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Welcome state */}
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 rounded-2xl overflow-hidden relative mx-auto mb-6 bg-neutral-900">
                <Image src="/kayou-logo.png" alt="Kayou" fill className="object-cover" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Meet Kayou</h2>
              <p className="text-neutral-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
                A custom AI built and trained by Aimar.
                Speaks English, French, Lingala, and Swahili. Teach him something new.
              </p>

              <div className="flex flex-wrap justify-center gap-2">
                {[
                  "Who are you?",
                  "Parle-moi en fran\u00e7ais",
                  "What can you do?",
                  "Teach me something about AI",
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => { setInput(q); setTimeout(() => send(), 50); }}
                    className="px-4 py-2 text-sm rounded-full bg-white/[0.04] border border-white/[0.08] text-neutral-400 hover:text-white hover:border-white/[0.15] transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Messages */}
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-10 h-10 rounded-full overflow-hidden relative bg-neutral-900 flex-shrink-0 mt-1">
                  <Image src="/kayou-logo.png" alt="Kayou" fill className="object-cover" />
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#2563EB] text-white rounded-br-md"
                    : "bg-white/[0.06] text-neutral-200 rounded-bl-md"
                }`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}

          {/* Loading indicator */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3 items-start"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden relative bg-neutral-900 flex-shrink-0">
                <Image src="/kayou-logo.png" alt="Kayou" fill className="object-cover" />
              </div>
              <div className="bg-white/[0.06] rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Dark blue wave effect */}
      <div className="relative w-full pointer-events-none" style={{ height: 120 }}>
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0A2463" />
              <stop offset="50%" stopColor="#1a56db" />
              <stop offset="100%" stopColor="#0A2463" />
            </linearGradient>
            <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="50%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>
            <linearGradient id="waveGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0A2463" stopOpacity="0" />
              <stop offset="100%" stopColor="#0A2463" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <rect fill="url(#waveGrad3)" width="1440" height="120" />
          <path fill="#0A2463" opacity="0.7" d="M0,70 C360,100 720,40 1080,70 C1260,85 1380,60 1440,65 L1440,120 L0,120Z">
            <animate attributeName="d" dur="8s" repeatCount="indefinite" values="
              M0,70 C360,100 720,40 1080,70 C1260,85 1380,60 1440,65 L1440,120 L0,120Z;
              M0,60 C360,35 720,95 1080,55 C1260,45 1380,80 1440,70 L1440,120 L0,120Z;
              M0,70 C360,100 720,40 1080,70 C1260,85 1380,60 1440,65 L1440,120 L0,120Z" />
          </path>
          <path fill="url(#waveGrad2)" opacity="0.5" d="M0,80 C480,50 960,100 1440,75 L1440,120 L0,120Z">
            <animate attributeName="d" dur="6s" repeatCount="indefinite" values="
              M0,80 C480,50 960,100 1440,75 L1440,120 L0,120Z;
              M0,65 C480,95 960,45 1440,80 L1440,120 L0,120Z;
              M0,80 C480,50 960,100 1440,75 L1440,120 L0,120Z" />
          </path>
          <path fill="url(#waveGrad1)" opacity="0.6" d="M0,90 C240,75 720,105 1200,85 C1350,80 1440,90 1440,90 L1440,120 L0,120Z">
            <animate attributeName="d" dur="10s" repeatCount="indefinite" values="
              M0,90 C240,75 720,105 1200,85 C1350,80 1440,90 1440,90 L1440,120 L0,120Z;
              M0,85 C240,100 720,70 1200,95 C1350,100 1440,85 1440,85 L1440,120 L0,120Z;
              M0,90 C240,75 720,105 1200,85 C1350,80 1440,90 1440,90 L1440,120 L0,120Z" />
          </path>
        </svg>
      </div>

      {/* Input bar */}
      <div className="px-6 py-4" style={{ background: 'linear-gradient(to bottom, #0A2463, #050d1f)' }}>
        <div className="max-w-2xl mx-auto flex gap-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Message Kayou..."
            className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#2563EB]/50 transition-colors"
            disabled={loading}
          />
          <motion.button
            onClick={send}
            disabled={loading || !input.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors disabled:opacity-30"
            style={{ background: "#2563EB" }}
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin text-white" />
            ) : (
              <Send size={18} className="text-white" />
            )}
          </motion.button>
        </div>
      </div>
    </main>
  );
}
