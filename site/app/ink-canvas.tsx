"use client";

import { useEffect, useRef } from "react";

/* mulberry32 — PRNG determinista (misma semilla → mismo lienzo) */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Campo de flujo suave y determinista (sin librería de ruido) */
function flowAngle(x: number, y: number) {
  return (
    (Math.sin(x * 0.006) + Math.cos(y * 0.006) + Math.sin((x + y) * 0.003)) *
    Math.PI
  );
}

type P = { x: number; y: number; life: number; max: number; ember: boolean };

/**
 * Fondo de tinta sumi-e que "respira": la tinta nace, deriva por el campo de
 * flujo, y se desvanece porque cada frame repintamos un susurro del papel.
 * Muy bajo contraste — apenas se intuye tras el texto.
 */
export default function InkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rand = mulberry32(1618); // seed 0000-style: fija

    const N = 500;
    const particles: P[] = [];

    const spawn = (): P => ({
      x: rand() * w,
      y: rand() * h,
      life: 0,
      max: 120 + rand() * 180,
      ember: rand() < 0.1,
    });

    const resize = () => {
      w = canvas.parentElement?.clientWidth || window.innerWidth;
      h = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#0f1320";
      ctx.fillRect(0, 0, w, h);
      particles.length = 0;
      for (let i = 0; i < N; i++) particles.push(spawn());
    };

    const step = () => {
      // susurro de papel: repinta el fondo translúcido para desvanecer la tinta
      ctx.fillStyle = "rgba(15,19,32,0.045)";
      ctx.fillRect(0, 0, w, h);
      for (const p of particles) {
        const a = flowAngle(p.x, p.y);
        p.x += Math.cos(a) * 0.6;
        p.y += Math.sin(a) * 0.6;
        p.life++;
        // tinta = humo frío tenue; ~10% chispas azure
        ctx.fillStyle = p.ember
          ? "rgba(106,166,232,0.06)"
          : "rgba(194,204,211,0.05)";
        ctx.fillRect(p.x, p.y, 1.3, 1.3);
        if (p.life > p.max || p.x < 0 || p.x > w || p.y < 0 || p.y > h) {
          Object.assign(p, spawn());
        }
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let raf = 0;
    if (reduced) {
      // estampa fija bella: avanza en silencio y se queda quieto
      for (let i = 0; i < 520; i++) step();
    } else {
      const loop = () => {
        step();
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
