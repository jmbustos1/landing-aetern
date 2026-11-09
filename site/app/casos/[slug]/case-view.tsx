"use client";

import { useEffect } from "react";
import { Mark } from "../../logo";
import { CASES } from "../data";
import FlowAnimation from "./flow-animation";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
      {children}
    </span>
  );
}

export default function CaseView({ slug }: { slug: string }) {
  const c = CASES[slug];

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
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [slug]);

  if (!c) {
    return (
      <main className="mx-auto flex min-h-screen max-w-[640px] flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="font-serif text-2xl text-bright">Caso no encontrado.</p>
        <a href="/" className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--color-signal)" }}>
          ← Volver
        </a>
      </main>
    );
  }

  return (
    <main className="relative">
      {/* Top bar */}
      <header className="border-b hair">
        <div className="mx-auto flex max-w-[1000px] items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-3">
            <Mark size={26} />
            <span className="font-sans text-sm font-light uppercase tracking-[0.34em] text-bright">
              Aetern
            </span>
          </a>
          <a
            href="/#casos"
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors duration-300 hover:text-plaster"
          >
            ← Casos
          </a>
        </div>
      </header>

      <article className="mx-auto max-w-[1000px] px-6 pb-32 pt-20">
        {/* Título */}
        <div className="reveal">
          <div className="flex items-center justify-between gap-6">
            <Eyebrow>Caso de éxito</Eyebrow>
            <span className="font-serif text-5xl" style={{ color: "var(--color-seal-hi)" }}>
              {c.kanji}
            </span>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-5">
            {c.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={c.logo} alt={c.name} className="h-7 w-auto" />
            ) : (
              <span className="font-serif text-xl text-bright">{c.name}</span>
            )}
            {c.url && (
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.14em]"
                style={{ color: "var(--color-signal)" }}
              >
                Visitar sitio
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            )}
          </div>
          <h1 className="mt-6 max-w-3xl font-serif text-[clamp(30px,5vw,56px)] font-semibold leading-[1.1] tracking-[-0.01em] text-bright">
            {c.title}
          </h1>
          {/* Meta */}
          <div className="mt-10 grid gap-6 border-y hair py-6 sm:grid-cols-3">
            {[
              ["Solución", c.meta.solucion],
              ["Cliente", c.meta.cliente],
              ["Periodo", c.meta.año],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  {k}
                </div>
                <div className="mt-2 text-sm text-body">{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero image */}
        <div className="reveal mt-12">
          {c.heroImage ? (
            <div className="overflow-hidden border hair bg-clay/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.heroImage} alt={`${c.name} — vista general`} className="w-full" />
            </div>
          ) : (
            <div className="flex aspect-[16/8] items-center justify-center border hair bg-clay/40 font-mono text-[11px] text-muted">
              [ imagen del proyecto — placeholder ]
            </div>
          )}
        </div>

        {/* Oportunidad */}
        <section className="reveal mt-20 grid gap-8 md:grid-cols-[1fr_2fr]">
          <div>
            <Eyebrow>Oportunidad</Eyebrow>
            <h2 className="mt-4 font-serif text-2xl text-bright">{c.opportunity.heading}</h2>
          </div>
          <div className="space-y-4">
            {c.opportunity.body.map((p, i) => (
              <p key={i} className="text-body/80">{p}</p>
            ))}
          </div>
        </section>

        {/* Solución */}
        <section className="reveal mt-20 grid gap-8 md:grid-cols-[1fr_2fr]">
          <div>
            <Eyebrow>Solución</Eyebrow>
            <h2 className="mt-4 font-serif text-2xl text-bright">{c.solution.heading}</h2>
          </div>
          <div>
            <div className="space-y-4">
              {c.solution.body.map((p, i) => (
                <p key={i} className="text-body/80">{p}</p>
              ))}
            </div>
            <div className="mt-8 grid gap-px overflow-hidden border hair bg-[rgba(200,212,220,0.08)] sm:grid-cols-2">
              {c.solution.features.map((f) => (
                <div key={f.t} className="bg-charcoal p-6">
                  <div className="mb-3 h-[2px] w-[8px]" style={{ backgroundColor: "var(--color-signal)" }} />
                  <h3 className="font-serif text-base text-bright">{f.t}</h3>
                  <p className="mt-2 text-sm text-body/70">{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {slug === "exwood" && (
          <section className="reveal mt-20 grid gap-8 md:grid-cols-[1fr_2fr]">
            <div>
              <Eyebrow>En movimiento</Eyebrow>
              <h2 className="mt-4 font-serif text-2xl text-bright">Del QR a rodar</h2>
              <p className="mt-4 text-sm text-body/70">
                El recorrido de una orden entre el teléfono y el scooter, en cámara lenta.
              </p>
            </div>
            <FlowAnimation />
          </section>
        )}

        {/* Proceso */}
        <section className="reveal mt-20 grid gap-8 md:grid-cols-[1fr_2fr]">
          <div>
            <Eyebrow>Proceso</Eyebrow>
            <h2 className="mt-4 font-serif text-2xl text-bright">Cómo lo construimos</h2>
          </div>
          <div>
            <div className="border hair">
              {c.process.phases.map((ph, i) => (
                <div key={ph.t} className={`flex gap-5 p-6 ${i > 0 ? "border-t hair" : ""}`}>
                  <span className="font-mono text-sm" style={{ color: "var(--color-signal)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-serif text-base text-bright">{ph.t}</h3>
                    <p className="mt-1 text-sm text-body/70">{ph.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                Desafíos
              </div>
              <ul className="mt-4 space-y-2">
                {c.process.challenges.map((ch) => (
                  <li key={ch} className="flex gap-3 text-sm text-body/75">
                    <span style={{ color: "var(--color-seal-hi)" }}>—</span>
                    {ch}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Resultados */}
        <section className="reveal mt-20 grid gap-8 md:grid-cols-[1fr_2fr]">
          <div>
            <Eyebrow>Resultados</Eyebrow>
            <h2 className="mt-4 font-serif text-2xl text-bright">Lo que quedó de pie</h2>
          </div>
          <ul className="space-y-4">
            {c.results.map((r) => (
              <li key={r} className="flex gap-3 text-body/80">
                <span style={{ color: "var(--color-signal)" }}>●</span>
                {r}
              </li>
            ))}
          </ul>
        </section>

        {/* Cierre */}
        <p className="reveal mt-20 border-y hair py-12 text-center font-serif text-[clamp(20px,3vw,30px)] font-medium leading-snug text-bright">
          {c.closing}
        </p>

        {/* Tecnologías (los labels, aquí) */}
        <section className="reveal mt-16">
          <Eyebrow>Tecnologías usadas</Eyebrow>
          <div className="mt-5 flex flex-wrap gap-2">
            {c.technologies.map((t) => (
              <span
                key={t}
                className="border hair px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-body/80"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="reveal mt-20 flex flex-wrap items-center justify-between gap-6 border-t hair pt-12">
          <p className="font-serif text-xl text-bright">¿Un proyecto así en mente?</p>
          <div className="flex items-center gap-6">
            <a href="/#casos" className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-plaster">
              ← Otros casos
            </a>
            <a
              href="/#cta"
              className="press border border-plaster/40 px-6 py-3 text-sm text-bright hover:bg-plaster hover:text-charcoal"
            >
              Hablemos
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
