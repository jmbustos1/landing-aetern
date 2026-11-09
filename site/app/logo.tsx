/* AETERN — marca vectorial. Pico ∧ + tres barras /// en degradado azure.
   Construcción de la hoja de marca: ∧ + /// = la marca. */

export function Mark({
  className = "",
  size = 44,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 104"
      fill="none"
      role="img"
      aria-label="AETERN"
    >
      <defs>
        <linearGradient id="aetern-a" x1="12" y1="10" x2="88" y2="96" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8FC1F3" />
          <stop offset="0.55" stopColor="#5690D2" />
          <stop offset="1" stopColor="#3F6FB4" />
        </linearGradient>
        <linearGradient id="aetern-s" x1="58" y1="22" x2="78" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#A6D0F7" />
          <stop offset="1" stopColor="#6BA4E6" />
        </linearGradient>
      </defs>
      {/* pico ∧ — pierna izquierda (más gruesa) + derecha */}
      <path
        d="M18 88 L50 15"
        stroke="url(#aetern-a)"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M50 15 L82 88"
        stroke="url(#aetern-a)"
        strokeWidth="8.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* /// — tres barras paralelas a la pierna derecha */}
      <path d="M58 31 L66 49" stroke="url(#aetern-s)" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M63 28 L71 46" stroke="url(#aetern-s)" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M68 25 L76 43" stroke="url(#aetern-s)" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}

/* Wordmark "AETERN" — sans fina, tracking ancho (como la hoja de marca). */
export function Wordmark({
  className = "",
  tagline = false,
}: {
  className?: string;
  tagline?: boolean;
}) {
  return (
    <span className={`inline-flex flex-col ${className}`}>
      <span className="font-sans text-[1.35rem] font-light uppercase leading-none tracking-[0.42em] text-bright">
        AETERN
      </span>
      {tagline && (
        <span
          className="mt-1.5 font-sans text-[0.6rem] font-normal uppercase tracking-[0.42em]"
          style={{ color: "var(--color-signal)" }}
        >
          Software&nbsp;Manufacturing
        </span>
      )}
    </span>
  );
}
