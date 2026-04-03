"use client";

import { useEffect, useRef } from "react";

export default function DarkWaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const waves = [
        { y: H * 0.25, amp: 30, freq: 0.0015, speed: 0.006, width: 2.5, glow: 15, color: [10, 60, 180] },
        { y: H * 0.35, amp: 25, freq: 0.002,  speed: 0.009, width: 2,   glow: 12, color: [20, 100, 245] },
        { y: H * 0.45, amp: 35, freq: 0.0018, speed: 0.005, width: 3,   glow: 20, color: [10, 50, 160] },
        { y: H * 0.55, amp: 20, freq: 0.0025, speed: 0.011, width: 1.5, glow: 10, color: [30, 120, 255] },
        { y: H * 0.65, amp: 28, freq: 0.0012, speed: 0.007, width: 2,   glow: 14, color: [15, 80, 220] },
        { y: H * 0.75, amp: 22, freq: 0.003,  speed: 0.013, width: 1.5, glow: 8,  color: [20, 110, 245] },
        { y: H * 0.85, amp: 18, freq: 0.002,  speed: 0.008, width: 2,   glow: 12, color: [10, 60, 200] },
      ];

      for (const wave of waves) {
        const [r, g, b] = wave.color;

        // Glow layer
        ctx.beginPath();
        for (let x = 0; x <= W; x += 2) {
          const y =
            wave.y +
            Math.sin(x * wave.freq + t * wave.speed) * wave.amp +
            Math.sin(x * wave.freq * 2.2 + t * wave.speed * 0.6) * wave.amp * 0.3 +
            Math.cos(x * wave.freq * 0.7 + t * wave.speed * 1.4) * wave.amp * 0.2;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.15)`;
        ctx.lineWidth = wave.glow;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.4)`;
        ctx.shadowBlur = wave.glow * 2;
        ctx.stroke();

        // Bright core line
        ctx.beginPath();
        for (let x = 0; x <= W; x += 2) {
          const y =
            wave.y +
            Math.sin(x * wave.freq + t * wave.speed) * wave.amp +
            Math.sin(x * wave.freq * 2.2 + t * wave.speed * 0.6) * wave.amp * 0.3 +
            Math.cos(x * wave.freq * 0.7 + t * wave.speed * 1.4) * wave.amp * 0.2;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.6)`;
        ctx.lineWidth = wave.width;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.8)`;
        ctx.shadowBlur = wave.glow;
        ctx.stroke();

        // Reset shadow
        ctx.shadowBlur = 0;
      }

      t += 1;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
}
