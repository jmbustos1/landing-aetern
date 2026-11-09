"use client";

import { useEffect, useState, type ReactNode } from "react";
import InkCanvas from "./ink-canvas";
import AgentHub from "./agent-hub";
import { Mark, Wordmark } from "./logo";

/* ───────── bits ───────── */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
      {children}
    </span>
  );
}

function Dots() {
  return <div className="ink-dots my-2 w-full" aria-hidden />;
}

/* Avatar con fallback a iniciales si la foto no existe */
function Avatar({ src, initials }: { src: string; initials: string }) {
  const [err, setErr] = useState(false);
  if (!err) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={initials}
        onError={() => setErr(true)}
        className="h-10 w-10 rounded-full border hair object-cover"
      />
    );
  }
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full border hair bg-clay font-mono text-[10px] text-muted">
      {initials}
    </div>
  );
}

/* ── iconos de producto (línea fina, heredan color) ── */
const ib = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
const IcCpu = () => (
  <svg {...ib}>
    <rect x="7" y="7" width="10" height="10" rx="1" />
    <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
  </svg>
);
const IcFlow = () => (
  <svg {...ib}>
    <circle cx="5" cy="6" r="2" />
    <circle cx="5" cy="18" r="2" />
    <circle cx="19" cy="12" r="2" />
    <path d="M7 6h6a4 4 0 0 1 4 4M7 18h6a4 4 0 0 0 4-4" />
  </svg>
);
const IcCode = () => (
  <svg {...ib}>
    <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13 6l-2 12" />
  </svg>
);
const IcLayout = () => (
  <svg {...ib}>
    <rect x="3" y="4" width="18" height="16" rx="1" />
    <path d="M3 9h18M8 20V9" />
  </svg>
);
const IcWindow = () => (
  <svg {...ib}>
    <rect x="3" y="4" width="18" height="16" rx="1" />
    <path d="M3 8h18M6.5 6h.01M9.5 6h.01" />
  </svg>
);
const IcData = () => (
  <svg {...ib}>
    <ellipse cx="12" cy="5" rx="8" ry="3" />
    <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
  </svg>
);
const IcForward = () => (
  <svg {...ib}>
    <path d="m6 5 7 7-7 7M13 5l7 7-7 7" />
  </svg>
);
const IcRpa = () => (
  <svg {...ib}>
    <rect x="5" y="8" width="14" height="10" rx="2" />
    <path d="M12 8V4M9 4h6M9 13h.01M15 13h.01M2 12v3M22 12v3" />
  </svg>
);

const PRODUCTS: {
  icon: ReactNode;
  t: string;
  d: string;
  tags: string[];
  anchor: boolean;
  pdf?: string;
}[] = [
  {
    icon: <IcCpu />,
    t: "IoT & Hardware",
    d: "Dispositivos conectados de punta a punta: firmware, telemetría en vivo y la nube que los orquesta.",
    tags: ["Firmware", "Telemetría", "Cloud"],
    anchor: false,
  },
  {
    icon: <IcFlow />,
    t: "Agentic Automation",
    d: "Automatizamos flujos con pipelines de IA: agentes que ejecutan trabajo real, no demos.",
    tags: ["IA", "Pipelines", "Agentes"],
    anchor: true,
  },
  {
    icon: <IcCode />,
    t: "Software a la medida",
    d: "Producto desde cero, con arquitectura pensada para durar diez años.",
    tags: ["Producto", "Arquitectura"],
    anchor: false,
  },
  {
    icon: <IcLayout />,
    t: "Landing Pages",
    d: "Páginas que convierten, con tu core de negocio e integraciones: Calendly, Mercado Pago, envíos.",
    tags: ["Calendly", "Mercado Pago", "Envíos"],
    anchor: false,
    pdf: "/cotizacion-landing.pdf",
  },
  {
    icon: <IcWindow />,
    t: "Apps Web",
    d: "Aplicaciones web sólidas que aguantan carga y crecen sin reescribirse.",
    tags: ["Web", "Escalable"],
    anchor: false,
  },
  {
    icon: <IcData />,
    t: "ETLs & Data",
    d: "Flujos que ingieren, transforman y entregan datos — confiables y a escala.",
    tags: ["ETL", "Data"],
    anchor: false,
  },
  {
    icon: <IcForward />,
    t: "Forward Deploy Engineering",
    d: "Consultoría embebida: nos integramos a tu equipo, entendemos tu operación y entregamos automatización de procesos a medida.",
    tags: ["Consultoría", "Automatización", "Procesos"],
    anchor: false,
  },
  {
    icon: <IcRpa />,
    t: "RPA",
    d: "Robotic Process Automation: bots que ejecutan tareas repetitivas en sistemas sin API — planillas, formularios, legacy.",
    tags: ["Bots", "Legacy", "Sin API"],
    anchor: false,
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Entendieron el desafío del hardware y la app como pocos. Nos entregaron una plataforma que simplemente funciona, y siguen ahí cuando la necesitamos.",
    name: "Bruno Osses",
    role: "Exwood",
    photo: "/bruno-osses.jpg",
    initials: "BO",
  },
  {
    quote:
      "Ordenaron toda nuestra parte digital sin ruido. La integración de boletas con el SII quedó impecable, y el sitio por fin está a la altura de la empresa.",
    name: "Horacio Bustos",
    role: "Forestal Foresol",
    photo: "/horacio-bustos.jpg",
    initials: "HB",
  },
];

/* ───────── page ───────── */
const PDF_BY_PRODUCT: Record<string, string> = {
  "IoT & Hardware": "/cotizacion-iot.pdf",
  "Agentic Automation": "/cotizacion-agentic.pdf",
  "Software a la medida": "/cotizacion-software.pdf",
  "Landing Pages": "/cotizacion-landing.pdf",
  "Apps Web": "/cotizacion-apps-web.pdf",
  "ETLs & Data": "/cotizacion-etl.pdf",
  "Forward Deploy Engineering": "/cotizacion-forward-deploy.pdf",
  RPA: "/cotizacion-rpa.pdf",
};

// Precio "desde" (base) por producto — referencial. En USD, sin decimales.
const FROM_BY_PRODUCT: Record<string, string> = {
  "IoT & Hardware": "3.000",
  "Agentic Automation": "1.500",
  "Software a la medida": "2.500",
  "Landing Pages": "500",
  "Apps Web": "1.800",
  "ETLs & Data": "1.800",
  "Forward Deploy Engineering": "2.000",
  RPA: "1.200",
};

// Formulario de contacto -> Lambda Function URL (guarda en S3 + avisa por SES).
// Se inyecta al compilar con NEXT_PUBLIC_FORM_ENDPOINT (output de Terraform).
// Vacío en dev: el form simula el envío para poder probar la UI.
const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "";

// Sin intervalos iguales: en tres columnas, la grilla entra como una ola y no como un metrónomo.
const REVEAL_DELAY = ["", "lg:[--reveal-delay:80ms]", "lg:[--reveal-delay:130ms]"];

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error" | "limited">("idle");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main className="relative">
      {/* ───── Statusline (firma tech, una línea) ───── */}
      <div className="border-b hair bg-clay">
        <div className="mx-auto flex max-w-[1180px] items-center gap-4 px-6 py-1.5 font-mono text-[11px] text-muted">
          <span className="flex items-center gap-1.5">
            <span
              className="breathe inline-block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: "var(--color-signal)" }}
            />
            Disponible para nuevos proyectos
          </span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">Chile · LatAm</span>
          <a
            href="#cta"
            className="group ml-auto inline-flex items-center gap-1 transition-colors duration-300 hover:text-plaster"
          >
            Hablemos
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </div>
      </div>

      {/* ───── Nav ───── */}
      <header
        className={`sticky top-0 z-50 transition-[background-color,border-color] duration-300 ${
          scrolled ? "border-b hair bg-charcoal/95 backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-3">
            <Mark size={30} />
            <span className="font-sans text-base font-light uppercase tracking-[0.34em] text-bright">
              Aetern
            </span>
          </a>
          <div className="hidden items-center gap-9 md:flex">
            {[
              ["Productos", "#productos"],
              ["Nosotros", "#nosotros"],
              ["Casos", "#casos"],
            ].map(([l, href]) => (
              <a
                key={l}
                href={href}
                className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors duration-300 hover:text-plaster"
              >
                {l}
              </a>
            ))}
          </div>
          <a
            href="#cta"
            className="press border hair px-5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-body hover:bg-body hover:text-charcoal"
          >
            Hablemos
          </a>
        </nav>
      </header>

      {/* ───── Hero (con canvas de tinta que respira) ───── */}
      <section className="relative min-h-screen overflow-hidden">
        <InkCanvas />
        {/* gradiente que disuelve el canvas en el fondo */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 70% 40%, transparent 30%, rgba(20,24,28,0.85) 78%)",
          }}
        />
        <div className="relative mx-auto grid min-h-[calc(100vh-7rem)] max-w-[1180px] items-center gap-10 px-6 py-16 md:grid-cols-[1fr_1.15fr]">
          <div className="reveal">
            {/* Lockup de marca: mark + AETERN + tagline */}
            <div className="flex items-center gap-5">
              <Mark size={72} />
              <Wordmark tagline />
            </div>

            {/* Línea de valores (de la hoja de marca) */}
            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
              {["Long term", "Attention to detail", "Scalable", "Zen"].map((v, i) => (
                <span key={v} className="flex items-center gap-3">
                  {i > 0 && (
                    <span style={{ color: "var(--color-signal)" }}>•</span>
                  )}
                  {v}
                </span>
              ))}
            </div>

            <h1 className="mt-10 max-w-lg font-serif text-[clamp(30px,4.4vw,50px)] font-medium leading-[1.15] tracking-[-0.01em] text-bright">
              Construimos sistemas de software que{" "}
              <span style={{ color: "var(--color-seal-hi)" }}>perduran</span>.
            </h1>
            <p className="mt-6 max-w-md text-body/80">
              Con calma, precisión y visión a largo plazo. Software que sigue de
              pie cuando la moda pasa.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a
                href="#cta"
                className="press border border-plaster/40 px-7 py-3 text-sm text-bright hover:bg-plaster hover:text-charcoal"
              >
                Empecemos una conversación
              </a>
              <a
                href="#casos"
                className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted"
              >
                Ver casos de éxito
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>

            {/* Kanji de marca: 永遠 EIEN */}
            <div className="mt-12 flex items-center gap-4">
              <span className="font-serif text-3xl" style={{ color: "var(--color-seal-hi)" }}>
                永遠
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                Eien · eternity, long existence
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Manifiesto (puro tipo, máximo silencio) ───── */}
      <section className="mx-auto max-w-[960px] px-6 py-40 text-center">
        <p className="reveal font-serif text-[clamp(26px,4vw,40px)] font-medium leading-[1.35] text-bright">
          No perseguimos lo nuevo. Perseguimos lo que{" "}
          <span style={{ color: "var(--color-seal-hi)" }}>perdura</span>: código
          que se lee, sistemas que envejecen con gracia, decisiones que siguen
          teniendo sentido dentro de diez años.
        </p>
      </section>

      {/* ───── Productos ───── */}
      <section id="productos" className="border-y hair bg-clay">
        <div className="mx-auto max-w-[1180px] px-6 py-32">
          <div className="reveal max-w-xl">
            <Eyebrow>Productos</Eyebrow>
            <h2 className="mt-5 font-serif text-[clamp(28px,4vw,42px)] font-semibold text-bright">
              Lo que construimos.
            </h2>
            <p className="mt-6 text-body/75">
              De hardware conectado a pipelines de IA. Siempre con la misma
              disciplina: hecho para durar y para escalar.
            </p>
            <p className="mt-4 font-mono text-[11px] leading-relaxed text-muted">
              Todos los precios son <span style={{ color: "var(--color-signal)" }}>referenciales</span> (USD)
              y varían según el alcance. El desglose completo está en cada cotización descargable.
            </p>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden border hair bg-[rgba(200,212,220,0.08)] md:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p, i) => (
              <div
                key={p.t}
                className={`reveal group relative flex flex-col bg-charcoal p-8 hover:bg-clay ${REVEAL_DELAY[i % 3]} ${p.anchor ? "hud" : ""}`}
              >
                <div
                  style={{
                    color: p.anchor
                      ? "var(--color-signal)"
                      : "var(--color-plaster)",
                  }}
                >
                  {p.icon}
                </div>
                <h3 className="mt-5 font-serif text-xl text-bright">{p.t}</h3>
                <p className="mt-3 text-sm text-body/70">{p.d}</p>
                <div className="mt-4 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                  {p.tags.map((t) => (
                    <span key={t} className="border hair px-2 py-0.5">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex items-end justify-between gap-3 border-t hair pt-4">
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                      Desde · ref.
                    </div>
                    <div className="font-serif text-lg text-bright">
                      USD {FROM_BY_PRODUCT[p.t]}
                    </div>
                  </div>
                  {PDF_BY_PRODUCT[p.t] && (
                    <a
                      href={PDF_BY_PRODUCT[p.t]}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Ver cotización de ${p.t}`}
                      className="inline-flex shrink-0 items-center gap-1 font-mono text-[11px] uppercase tracking-[0.14em] after:absolute after:inset-0"
                      style={{ color: "var(--color-signal)" }}
                    >
                      Cotización
                      <span className="transition-transform duration-200 group-hover:translate-y-0.5">
                        ↓
                      </span>
                    </a>
                  )}
                </div>
              </div>
            ))}
            {/* Cierra la grilla: quien no se ve en una caja también tiene por dónde seguir */}
            <a
              href="#cta"
              className={`reveal group flex flex-col bg-charcoal p-8 hover:bg-clay md:col-span-2 lg:col-span-1 ${REVEAL_DELAY[PRODUCTS.length % 3]}`}
            >
              <h3 className="font-serif text-xl text-bright">¿Algo distinto?</h3>
              <p className="mt-3 text-sm text-body/70">
                Si lo tuyo no calza en estas cajas, cuéntanos qué necesitas y lo vemos juntos.
              </p>
              <div className="mt-auto flex items-center justify-end border-t hair pt-4">
                <span
                  className="inline-flex items-center gap-1 pt-5 font-mono text-[11px] uppercase tracking-[0.14em]"
                  style={{ color: "var(--color-signal)" }}
                >
                  Hablemos
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ───── Agentic hub (showcase de Agentic Automation) ───── */}
      <section className="mx-auto max-w-[1180px] px-6 py-32">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
          <div className="reveal">
            <Eyebrow>Agentic Automation</Eyebrow>
            <h2 className="mt-5 font-serif text-[clamp(28px,4vw,42px)] font-semibold text-bright">
              Un agente que opera sobre lo que tu empresa ya usa.
            </h2>
            <p className="mt-6 max-w-md text-body/75">
              No reemplazamos tus sistemas: los conectamos. Un agente de IA que
              lee, decide y ejecuta sobre tu CRM, tu ERP, tus bancos y los
              organismos con los que ya trabajas — sin que cambies nada.
            </p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              ✦ Pensando · Ejecutando · Sincronizando
            </p>
          </div>
          <div className="reveal">
            <AgentHub />
          </div>
        </div>
      </section>

      {/* ───── Nosotros (filosofía / valores + neofetch) ───── */}
      <section id="nosotros" className="mx-auto max-w-[1180px] px-6 py-32">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="reveal">
            <Eyebrow>Nosotros</Eyebrow>
            <h2 className="mt-5 font-serif text-[clamp(28px,4vw,42px)] font-semibold text-bright">
              Lo contrario a una consultora.
            </h2>
            <p className="mt-6 max-w-md text-body/75">
              AETERN es un equipo pequeño, obsesionado con hacer las cosas bien.
              Nos tomamos el tiempo de entender cada problema y construimos
              software pensado para durar.
            </p>
            <div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {[
                {
                  t: "Visión largoplacista",
                  d: "Decisiones que siguen teniendo sentido dentro de diez años.",
                  anchor: true,
                },
                {
                  t: "Atención al detalle",
                  d: "El oficio se ve en lo pequeño. Nada queda a medias.",
                  anchor: false,
                },
                {
                  t: "Escalabilidad",
                  d: "Lo que hacemos crece sin necesidad de reescribirse.",
                  anchor: false,
                },
                {
                  t: "Manufactura zen",
                  d: "Calma, foco y un ritmo sostenible, proyecto tras proyecto.",
                  anchor: false,
                },
              ].map((v) => (
                <div key={v.t}>
                  <div
                    className="mb-3 h-[2px] w-[8px]"
                    style={{
                      backgroundColor: v.anchor
                        ? "var(--color-signal)"
                        : "var(--color-plaster)",
                    }}
                  />
                  <h3 className="font-serif text-lg text-bright">{v.t}</h3>
                  <p className="mt-2 text-sm text-body/70">{v.d}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Neofetch tile: las "specs" del estudio, en panel HUD biselado */}
          <div className="reveal">
            <div className="hud border hair bg-clay p-7 font-mono text-[12px] leading-relaxed text-muted">
              <div className="text-body">
                aetern<span className="text-muted">@</span>studio
              </div>
              <div className="text-muted">————————————</div>
              <div>
                <span style={{ color: "var(--color-signal)" }}>equipo</span>:
                pequeño, senior
              </div>
              <div>
                <span style={{ color: "var(--color-signal)" }}>stack</span>: Next ·
                Go · AWS · Terraform
              </div>
              <div>
                <span style={{ color: "var(--color-signal)" }}>foco</span>: sistemas
                de largo plazo
              </div>
              <div>
                <span style={{ color: "var(--color-signal)" }}>ritmo</span>:
                sostenible
              </div>
              <div>
                <span style={{ color: "var(--color-signal)" }}>base</span>: Chile ·
                LatAm
              </div>
              <div className="mt-4 flex gap-1.5">
                {["#0F1320", "#232D3F", "#A4B2BB", "#6AA6E8", "#3C5A86"].map((c) => (
                  <span
                    key={c}
                    className="inline-block h-4 w-4"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Casos de éxito ───── */}
      <section id="casos" className="border-y hair bg-clay">
        <div className="mx-auto max-w-[1180px] px-6 py-32">
          <div className="reveal flex items-end justify-between gap-6">
            <div>
              <Eyebrow>Casos de éxito</Eyebrow>
              <h2 className="mt-5 font-serif text-[clamp(28px,4vw,42px)] font-semibold text-bright">
                Trabajo que sigue de pie.
              </h2>
            </div>
            <span
              className="font-serif text-6xl"
              style={{ color: "var(--color-seal-hi)" }}
            >
              久
            </span>
          </div>
          <Dots />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {/* Exwood */}
            <a
              href="/casos/exwood"
              className="reveal group flex flex-col border hair bg-charcoal p-8 hover:bg-clay/40"
            >
              <div className="flex items-center justify-between gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/exwood-logo.png" alt="Exwood" className="h-6 w-auto" />
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  IoT · Rental de scooters
                </span>
              </div>
              <div className="mt-6 aspect-video overflow-hidden border hair bg-clay/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/exwood-hero.png"
                  alt="App Exwood — scooters IoT"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <p className="mt-6 text-sm text-body/75">
                Plataforma full-stack de arriendo de scooters eléctricos con IoT:
                cada scooter reporta ubicación en tiempo real y se desbloquea por
                QR. Mapa en vivo, reservas, viajes y pagos desde la app.
              </p>
              <span
                className="mt-6 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.14em]"
                style={{ color: "var(--color-signal)" }}
              >
                Ver caso completo
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </a>

            {/* Forestal Foresol */}
            <a
              href="/casos/forestal-foresol"
              className="reveal group flex flex-col border hair bg-charcoal p-8 hover:bg-clay/40"
            >
              <div className="flex items-center justify-between gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/foresol-logo.png"
                  alt="Forestal Foresol"
                  className="h-8 w-auto"
                />
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  Landing · SII
                </span>
              </div>
              <div className="mt-6 aspect-video overflow-hidden border hair bg-clay/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/foresol-hero.png"
                  alt="Sitio de Forestal Foresol"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <p className="mt-6 text-sm text-body/75">
                Desplegamos su landing y ayudamos a optimizar sus productos
                internos: integración de boletas electrónicas con el SII y mejoras
                de procesos operativos.
              </p>
              <span
                className="mt-6 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.14em]"
                style={{ color: "var(--color-signal)" }}
              >
                Ver caso completo
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </a>
          </div>

          {/* Testimonios (placeholders) */}
          <div className="reveal mt-16">
            <Eyebrow>Testimonios</Eyebrow>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="border hair bg-charcoal p-7">
                  <p
                    className="font-serif text-3xl leading-none"
                    style={{ color: "var(--color-seal-hi)" }}
                  >
                    “
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-body/70">
                    {t.quote}
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <Avatar src={t.photo} initials={t.initials} />
                    <div>
                      <p className="text-sm text-bright">{t.name}</p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───── Cómo trabajamos (file-tree / comandos, mono sin color) ───── */}
      <section className="mx-auto max-w-[960px] px-6 py-32">
        <div className="reveal">
          <Eyebrow>Proceso</Eyebrow>
          <h2 className="mt-5 font-serif text-[clamp(28px,4vw,42px)] font-semibold text-bright">
            Cómo construimos.
          </h2>
        </div>
        <div className="reveal mt-10 border hair bg-clay/40 p-7 font-mono text-[13px] leading-relaxed text-body/80">
          <div className="text-muted">$ ./ship --calm</div>
          <div className="mt-3">
            <div>proyecto/</div>
            <div>├─ escuchar &nbsp;&nbsp;<span className="text-muted"># entender el problema real</span></div>
            <div>├─ acotar &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-muted"># menos, pero bien</span></div>
            <div>├─ construir &nbsp;<span className="text-muted"># commits pequeños, revisados</span></div>
            <div>└─ sostener &nbsp;&nbsp;<span className="text-muted"># nos quedamos a mantenerlo</span></div>
          </div>
        </div>
      </section>

      {/* ───── CTA (invertida, input subrayado con foco teal) ───── */}
      <section id="cta" className="border-y hair bg-clay">
        <div className="mx-auto max-w-[640px] px-6 py-40 text-center">
          <div className="reveal">
            <span className="font-serif text-5xl" style={{ color: "var(--color-seal-hi)" }}>
              静
            </span>
            <h2 className="mt-8 font-serif text-[clamp(28px,4vw,44px)] font-semibold text-bright">
              Hablemos.
            </h2>
            <p className="mt-5 text-body/75">
              Cuéntanos qué tienes en mente y te escribimos de vuelta.
            </p>
          </div>
          {status === "sent" ? (
            <p role="status" className="state-enter mt-10 font-mono text-sm" style={{ color: "var(--color-signal)" }}>
              ● recibido — te escribiremos pronto.
            </p>
          ) : (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const fd = new FormData(form);
                if (fd.get("botcheck")) return; // honeypot
                const payload = {
                  email: String(fd.get("email") || ""),
                  message: String(fd.get("message") || ""),
                };
                // En dev (sin endpoint) simulamos el envío para probar la UI.
                if (!FORM_ENDPOINT) {
                  setStatus("sent");
                  return;
                }
                setStatus("sending");
                try {
                  const res = await fetch(FORM_ENDPOINT, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                  });
                  if (res.ok) setStatus("sent");
                  else setStatus(res.status === 429 ? "limited" : "error");
                } catch {
                  setStatus("error");
                }
              }}
              className="reveal mx-auto mt-10 flex max-w-md flex-col gap-4 text-left"
            >
              {/* honeypot anti-spam */}
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                style={{ display: "none" }}
              />
              <input
                type="email"
                name="email"
                required
                placeholder="tu@correo.com"
                className="border-b hair bg-transparent px-1 py-2 text-body outline-none transition-colors duration-300 placeholder:text-muted/70 focus:border-b-[var(--color-signal)]"
              />
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Cuéntanos qué tienes en mente…"
                className="resize-none border-b hair bg-transparent px-1 py-2 text-body outline-none transition-colors duration-300 placeholder:text-muted/70 focus:border-b-[var(--color-signal)]"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="press self-start border border-plaster/40 px-7 py-2.5 text-sm text-bright hover:bg-body hover:text-charcoal disabled:pointer-events-none disabled:opacity-60"
              >
                {status === "sending" ? "Enviando…" : "Enviar"}
              </button>
              {(status === "error" || status === "limited") && (
                <p role="alert" className="state-enter font-mono text-xs text-bright">
                  {status === "limited"
                    ? "Demasiados intentos. Espera unos minutos y vuelve a enviarlo."
                    : "No pudimos enviarlo. Tu mensaje sigue aquí: inténtalo de nuevo."}
                </p>
              )}
            </form>
          )}
        </div>
      </section>

      {/* ───── Footer ───── */}
      <footer className="mx-auto max-w-[1180px] px-6 py-16">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <Mark size={30} />
            <span className="font-sans text-base font-light uppercase tracking-[0.34em] text-bright">
              Aetern
            </span>
            <span className="ml-1 font-serif text-sm" style={{ color: "var(--color-seal-hi)" }}>
              永遠
            </span>
          </div>
          <div className="flex flex-wrap gap-8 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            {[
              ["Productos", "#productos"],
              ["Nosotros", "#nosotros"],
              ["Casos", "#casos"],
              ["hola@aetern.dev", "#cta"],
            ].map(([l, href]) => (
              <a
                key={l}
                href={href}
                className="transition-colors duration-300 hover:text-plaster"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
        <Dots />
        <p className="mt-6 font-mono text-[11px] text-muted">
          © {new Date().getFullYear()} AETERN · Software Manufacturing · perdura · 永遠
        </p>
      </footer>
    </main>
  );
}
