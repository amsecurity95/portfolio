"use client";

import { useEffect, useRef } from "react";

export default function LiquidWaves() {
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

      // Draw multiple layered waves
      const waves = [
        { y: H * 0.35, amp: 50, freq: 0.003, speed: 0.008, alpha: 0.04 },
        { y: H * 0.45, amp: 40, freq: 0.004, speed: 0.012, alpha: 0.035 },
        { y: H * 0.55, amp: 60, freq: 0.002, speed: 0.006, alpha: 0.03 },
        { y: H * 0.65, amp: 35, freq: 0.005, speed: 0.015, alpha: 0.025 },
        { y: H * 0.75, amp: 45, freq: 0.003, speed: 0.01, alpha: 0.03 },
      ];

      for (const wave of waves) {
        ctx.beginPath();
        ctx.moveTo(0, H);

        for (let x = 0; x <= W; x += 2) {
          const y =
            wave.y +
            Math.sin(x * wave.freq + t * wave.speed) * wave.amp +
            Math.sin(x * wave.freq * 1.8 + t * wave.speed * 0.7) * wave.amp * 0.5 +
            Math.cos(x * wave.freq * 0.5 + t * wave.speed * 1.3) * wave.amp * 0.3;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(W, H);
        ctx.closePath();

        // Gradient fill — white liquid look
        const grad = ctx.createLinearGradient(0, wave.y - wave.amp, 0, H);
        grad.addColorStop(0, `rgba(20, 110, 245, ${wave.alpha})`);
        grad.addColorStop(0.5, `rgba(20, 110, 245, ${wave.alpha * 0.5})`);
        grad.addColorStop(1, `rgba(20, 110, 245, ${wave.alpha * 0.2})`);
        ctx.fillStyle = grad;
        ctx.fill();
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
      style={{ opacity: 1 }}
    />
  );
}
