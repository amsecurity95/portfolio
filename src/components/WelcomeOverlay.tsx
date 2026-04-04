"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

const messages = [
  "Hey there! I'm Kayou.",
  "I'm the AI that powers everything you're about to see.",
  "From chat agents to social media management, I handle it all.",
  "Go ahead, explore Aimar's work. I'll be around if you need me.",
];

const ease = [0.23, 1, 0.32, 1] as const;

export default function WelcomeOverlay() {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const [typing, setTyping] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!sessionStorage.getItem("kayou-welcomed")) {
      setShow(true);
    }
  }, []);

  // Stagger: logo first, then start typing after 800ms
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => setReady(true), 800);
    return () => clearTimeout(t);
  }, [show]);

  // Typewriter effect
  useEffect(() => {
    if (!ready || msgIndex >= messages.length) return;
    const msg = messages[msgIndex];
    let i = 0;
    setTyping("");
    const iv = setInterval(() => {
      i++;
      setTyping(msg.slice(0, i));
      if (i >= msg.length) {
        clearInterval(iv);
        // Pause then next message
        setTimeout(() => {
          if (msgIndex < messages.length - 1) {
            setMsgIndex((prev) => prev + 1);
          }
        }, 1200);
      }
    }, 35);
    return () => clearInterval(iv);
  }, [ready, msgIndex]);

  const dismiss = () => {
    sessionStorage.setItem("kayou-welcomed", "1");
    setShow(false);
    window.scrollTo({ top: 0 });
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(20px)" }}
        >
          <div className="flex flex-col items-center max-w-md mx-auto px-6 text-center">
            {/* Kayou avatar — floating animation */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: [0, -8, 0],
              }}
              transition={{
                scale: { duration: 0.5, ease },
                opacity: { duration: 0.5, ease },
                y: {
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                },
              }}
              className="w-24 h-24 rounded-3xl overflow-hidden relative mb-8"
              style={{ boxShadow: "0 0 60px rgba(20,110,245,0.4), 0 0 120px rgba(20,110,245,0.15)" }}
            >
              <Image src="/projects/kayou.png" alt="Kayou" fill className="object-cover" />
            </motion.div>

            {/* Name */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease }}
              className="text-2xl font-bold text-white mb-1"
            >
              Kayou
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5, ease }}
              className="text-xs text-neutral-500 mb-8 tracking-widest uppercase"
            >
              AI Assistant
            </motion.p>

            {/* Chat bubble */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: ready ? 1 : 0, scale: ready ? 1 : 0.95, y: ready ? 0 : 10 }}
              transition={{ duration: 0.4, ease }}
              className="w-full rounded-2xl p-5 mb-8 text-left"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-white text-sm leading-relaxed min-h-[3rem]">
                {typing}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                  className="inline-block w-0.5 h-4 ml-0.5 align-middle"
                  style={{ background: "#2563EB" }}
                />
              </p>
            </motion.div>

            {/* Dots indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: ready ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex gap-1.5 mb-8"
            >
              {messages.map((_, i) => (
                <div
                  key={i}
                  className="h-1 rounded-full transition-all duration-500"
                  style={{
                    width: i === msgIndex ? 20 : 6,
                    background: i === msgIndex ? "#2563EB" : "rgba(255,255,255,0.15)",
                  }}
                />
              ))}
            </motion.div>

            {/* Skip button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              onClick={dismiss}
              className="text-sm font-medium px-6 py-2.5 rounded-full transition-all duration-200"
              style={{ background: "#2563EB", color: "#fff" }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {msgIndex >= messages.length - 1 && typing === messages[messages.length - 1]
                ? "Let's go"
                : "Skip intro"}
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
