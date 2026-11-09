"use client";

import { useEffect, useRef, useState } from "react";

// Integraciones (herramientas + organismos que la empresa ya usa)
const NODES = [
  "HubSpot",
  "Salesforce",
  "SAP",
  "Odoo",
  "Postgres",
  "BigQuery",
  "SII",
  "Tesorería",
  "Previred",
  "BancoEstado",
  "CMF",
  "Aduanas",
];

const ACTIONS = [
  "Leyendo datos",
  "Creando plan",
  "Actualizando registros",
  "Sincronizando",
  "Generando informe",
  "Conciliando",
];

const R = 40; // radio en % del viewBox

export default function AgentHub() {
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    if (m.matches || !rootRef.current) return;
    // Solo avanza mientras está en pantalla.
    let id: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(([e]) => {
      clearInterval(id);
      if (e.isIntersecting) {
        id = setInterval(() => setActive((a) => (a + 1) % NODES.length), 1500);
      }
    });
    io.observe(rootRef.current);
    return () => {
      clearInterval(id);
      io.disconnect();
    };
  }, []);

  const N = NODES.length;
  const pts = NODES.map((_, i) => {
    const ang = (i / N) * Math.PI * 2 - Math.PI / 2; // arranca arriba
    return { x: 50 + R * Math.cos(ang), y: 50 + R * Math.sin(ang) };
  });

  return (
    <div ref={rootRef} className="relative mx-auto aspect-square w-full max-w-[520px]">
      {/* Conexiones */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
        {pts.map((p, i) => (
          <g key={i}>
            {/* línea base (hairline) */}
            <line
              x1={p.x}
              y1={p.y}
              x2="50"
              y2="50"
              strokeWidth={0.25}
              style={{
                stroke: "var(--color-signal)",
                opacity: active === i ? 0.55 : 0.12,
                transition: "opacity 0.6s ease",
              }}
            />
            {/* señal que viaja hacia el centro */}
            {!reduced && (
              <line
                x1={p.x}
                y1={p.y}
                x2="50"
                y2="50"
                strokeWidth={0.6}
                pathLength={100}
                className="hub-pulse"
                style={{
                  stroke: "var(--color-signal)",
                  opacity: 0.7,
                  animationDelay: `${(i / N) * 3}s`,
                }}
              />
            )}
          </g>
        ))}
      </svg>

      {/* Chips de integraciones (fijos) */}
      {NODES.map((n, i) => (
        <div
          key={n}
          className={`hub-chip absolute z-10 border px-2 py-1 font-mono text-[10px] whitespace-nowrap ${active === i ? "text-bright" : "text-muted"}`}
          style={{
            left: `${pts[i].x}%`,
            top: `${pts[i].y}%`,
            borderColor: active === i ? "var(--color-signal)" : "rgba(200,212,220,0.14)",
            backgroundColor: "var(--color-charcoal)",
            animationDelay: `${(i % 6) * 0.55}s`,
          }}
        >
          {n}
        </div>
      ))}

      {/* Nodo central: el agente */}
      <div className="hud absolute left-1/2 top-1/2 z-20 w-[42%] max-w-[190px] -translate-x-1/2 -translate-y-1/2 border hair bg-charcoal px-4 py-3 text-center">
        <div className="flex items-center justify-center gap-2">
          <span
            className="breathe inline-block h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: "var(--color-signal)" }}
          />
          <span className="font-serif text-sm text-bright">Tu agente de IA</span>
        </div>
        <div className="mt-1.5 font-mono text-[10px] text-muted">
          ✦ {reduced ? "Conectado" : ACTIONS[active % ACTIONS.length]}…
        </div>
      </div>
    </div>
  );
}
