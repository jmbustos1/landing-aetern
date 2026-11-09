"use client";

import { useEffect, useRef, useState } from "react";

const STEPS: [number, string][] = [
  [0, "El scooter reporta su ubicación y batería por TCP sobre 4G."],
  [1.7, "El backend la guarda y la empuja al mapa de la app por WebSocket."],
  [3.3, "El usuario escanea el QR y la app pide el desbloqueo."],
  [5.1, "El backend envía la orden al scooter y espera su confirmación."],
  [6.9, "El scooter ejecuta la orden y responde con un ACK."],
  [8.7, "La app recibe la confirmación y el viaje comienza."],
];
const LOOP = 13;
const REST = 11.4; // estado final, para quien pide reducir el movimiento

const X = { scooter: 90, backend: 320, app: 550 };
const Y = 110;
const HOP_FROM = { scooter: X.scooter + 66, backend: X.backend, app: X.app - 66 };

function bezier(x1: number, y1: number, x2: number, y2: number) {
  return (x: number) => {
    let lo = 0;
    let hi = 1;
    for (let i = 0; i < 20; i++) {
      const t = (lo + hi) / 2;
      const c = 3 * (1 - t) * (1 - t) * t * x1 + 3 * (1 - t) * t * t * x2 + t * t * t;
      if (c < x) lo = t;
      else hi = t;
    }
    const t = (lo + hi) / 2;
    return 3 * (1 - t) * (1 - t) * t * y1 + 3 * (1 - t) * t * t * y2 + t * t * t;
  };
}
const easeOut = bezier(0.23, 1, 0.32, 1);
const easeMove = bezier(0.65, 0, 0.35, 1);
const clamp = (x: number) => Math.min(1, Math.max(0, x));
const seg = (t: number, a: number, d: number, e = easeOut) => e(clamp((t - a) / d));

type Hop = { key: string; label: string; from: keyof typeof HOP_FROM; to: keyof typeof HOP_FROM; at: number };
const HOPS: Hop[] = [
  { key: "gps", label: "GPS", from: "scooter", to: "backend", at: 0.3 },
  { key: "ws", label: "Mapa", from: "backend", to: "app", at: 1.9 },
  { key: "req", label: "Unlock", from: "app", to: "backend", at: 3.5 },
  { key: "cmd", label: "Orden", from: "backend", to: "scooter", at: 5.3 },
  { key: "ack", label: "ACK", from: "scooter", to: "backend", at: 7.1 },
  { key: "ok", label: "OK", from: "backend", to: "app", at: 8.9 },
];
const HOP_TIME = 1.1;

export default function FlowAnimation() {
  const root = useRef<SVGSVGElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const svg = root.current;
    const caption = captionRef.current;
    const counter = counterRef.current;
    if (!svg || !caption || !counter) return;
    const q = <T extends Element>(id: string) => svg.querySelector<T>(`[data-id="${id}"]`)!;

    function pulse(id: string, t: number, at: number) {
      const x = clamp((t - at) / 0.55);
      q(id).setAttribute("stroke-opacity", t >= at && x < 1 ? String(1 - easeOut(x)) : "0");
    }

    function draw(t: number) {
      for (const h of HOPS) {
        const g = q<SVGGElement>(`hop-${h.key}`);
        const on = t >= h.at && t <= h.at + HOP_TIME + 0.1;
        g.setAttribute("opacity", on ? String(Math.min(seg(t, h.at, 0.12), 1 - seg(t, h.at + HOP_TIME, 0.1))) : "0");
        if (on) {
          const x = HOP_FROM[h.from] + (HOP_FROM[h.to] - HOP_FROM[h.from]) * easeMove(clamp((t - h.at) / HOP_TIME));
          g.setAttribute("transform", `translate(${x} ${Y})`);
        }
      }
      // Cada efecto cae en el mismo cuadro en que llega su causa.
      pulse("ring-backend", t, t < 3 ? 1.4 : t < 6 ? 4.6 : 8.2);
      pulse("ring-app", t, t < 5 ? 3 : 10);
      pulse("ring-scooter", t, 6.4);

      const unlocked = t >= 6.4;
      q<SVGTextElement>("lock").textContent = unlocked ? "desbloqueado" : "bloqueado";
      q("lock").setAttribute("fill", unlocked ? "var(--color-signal)" : "var(--color-muted)");
      q("wait").setAttribute("opacity", String(seg(t, 5.3, 0.2) * (1 - seg(t, 8.2, 0.2))));
      const app = t >= 10 ? "viaje en curso" : t >= 3.5 ? "desbloqueando…" : t >= 3 ? "mapa al día" : "";
      q<SVGTextElement>("app").textContent = app;
      q("app").setAttribute("fill", t >= 10 ? "var(--color-signal)" : "var(--color-muted)");

      let i = 0;
      STEPS.forEach(([at], n) => {
        if (t >= at) i = n;
      });
      caption!.textContent = STEPS[i][1];
      counter!.textContent = `${i + 1} / ${STEPS.length}`;
      caption!.style.opacity = String(seg(t, STEPS[i][0], 0.22));
      svg!.style.opacity = String(Math.min(seg(t, 0, 0.3), 1 - seg(t, LOOP - 0.4, 0.4)));
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      setReduced(true);
      draw(REST);
      svg.style.opacity = "1";
      caption.style.opacity = "1";
      return;
    }

    draw(0);
    let raf = 0;
    let last = 0;
    let elapsed = 0;
    const loop = (now: number) => {
      elapsed = (elapsed + (last ? Math.min(now - last, 100) / 1000 : 0)) % LOOP;
      last = now;
      draw(elapsed);
      raf = requestAnimationFrame(loop);
    };
    // Corre solo en pantalla; al salir y volver, sigue donde iba.
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      last = 0;
      if (e.isIntersecting) raf = requestAnimationFrame(loop);
    });
    io.observe(svg);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  const node = (id: string, x: number, title: string, sub: string, w = 132) => (
    <g>
      <rect
        data-id={`ring-${id}`}
        x={x - w / 2 - 4}
        y={Y - 42}
        width={w + 8}
        height={84}
        fill="none"
        stroke="var(--color-signal)"
        strokeWidth={1.5}
        strokeOpacity={0}
      />
      <rect x={x - w / 2} y={Y - 38} width={w} height={76} fill="var(--color-charcoal)" stroke="rgba(200,212,220,0.22)" />
      <text x={x} y={Y - 2} textAnchor="middle" fontSize={17} fill="var(--color-bright)" style={{ fontFamily: "var(--font-serif)" }}>
        {title}
      </text>
      <text x={x} y={Y + 18} textAnchor="middle" fontSize={10.5} fill="var(--color-muted)" style={{ fontFamily: "var(--font-mono)" }}>
        {sub}
      </text>
    </g>
  );

  return (
    <figure className="m-0 min-w-0">
      <div className="border hair bg-clay/40 px-3 pt-4">
        <svg
          ref={root}
          viewBox="0 0 640 200"
          className="block w-full"
          role="img"
          aria-label="Diagrama de un scooter, el backend en Go y la app. El scooter reporta su ubicación, la app pide el desbloqueo, el backend envía la orden, el scooter confirma con un ACK y el viaje comienza."
        >
          <line x1={156} y1={Y} x2={254} y2={Y} stroke="rgba(200,212,220,0.22)" />
          <line x1={386} y1={Y} x2={484} y2={Y} stroke="rgba(200,212,220,0.22)" />
          <g fontSize={10} fill="var(--color-muted)" textAnchor="middle" style={{ fontFamily: "var(--font-mono)" }}>
            <text x={205} y={Y - 12}>TCP · 4G</text>
            <text x={435} y={Y - 12}>REST · WS</text>
          </g>
          {node("scooter", X.scooter, "Scooter", "ESP32 + SIM7600")}
          {node("backend", X.backend, "Backend", "Go")}
          {node("app", X.app, "App", "React Native")}
          <g fontSize={11} textAnchor="middle" style={{ fontFamily: "var(--font-mono)" }}>
            <text data-id="lock" x={X.scooter} y={Y + 66} />
            <text data-id="wait" x={X.backend} y={Y + 66} fill="var(--color-muted)" opacity={0}>
              esperando ACK
            </text>
            <text data-id="app" x={X.app} y={Y + 66} />
          </g>
          {HOPS.map((h) => {
            const w = h.label.length * 7 + 20;
            return (
              <g key={h.key} data-id={`hop-${h.key}`} opacity={0}>
                <rect x={-w / 2} y={-11} width={w} height={22} fill="var(--color-signal)" />
                <text y={4} textAnchor="middle" fontSize={11} fill="var(--color-charcoal)" style={{ fontFamily: "var(--font-mono)" }}>
                  {h.label}
                </text>
              </g>
            );
          })}
        </svg>
        <figcaption aria-hidden className="flex min-h-[4.25rem] items-start justify-between gap-4 border-t hair py-3 text-sm text-body/80">
          <p ref={captionRef} className="m-0" />
          <span ref={counterRef} className="shrink-0 pt-1 font-mono text-[10px] text-muted" />
        </figcaption>
      </div>
      <ol className={reduced ? "mt-4 list-decimal space-y-1 pl-5 text-sm text-body/80" : "sr-only"}>
        {STEPS.map(([at, text]) => (
          <li key={at}>{text}</li>
        ))}
      </ol>
    </figure>
  );
}
