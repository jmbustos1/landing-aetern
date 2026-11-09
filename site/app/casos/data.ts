export type CaseStudy = {
  slug: string;
  name: string;
  /** logo en /public, o null para usar el nombre en texto */
  logo: string | null;
  kanji: string;
  title: string;
  meta: { solucion: string; cliente: string; año: string };
  url?: string;
  heroImage: string | null;
  opportunity: { heading: string; body: string[] };
  solution: {
    heading: string;
    body: string[];
    features: { t: string; d: string }[];
  };
  process: { phases: { t: string; d: string }[]; challenges: string[] };
  results: string[];
  closing: string;
  technologies: string[];
};

export const CASES: Record<string, CaseStudy> = {
  exwood: {
    slug: "exwood",
    name: "Exwood",
    logo: "/exwood-logo.png",
    kanji: "動", // movimiento
    title: "Arriendo de scooters eléctricos con IoT en tiempo real",
    meta: {
      solucion: "App móvil · Backend Go · Firmware IoT",
      cliente: "Exwood",
      año: "2024 → hoy",
    },
    heroImage: "/exwood-hero.png",
    opportunity: {
      heading: "Poner una flota en la calle y controlarla desde el teléfono",
      body: [
        "Exwood necesitaba lanzar un servicio de sharing y arriendo de scooters eléctricos: que cualquier persona pudiera encontrar el scooter más cercano en un mapa, reservarlo, desbloquearlo por QR y pagar — todo desde una app.",
        "El desafío real no era solo la app, sino el hardware detrás: cada scooter debía reportar su ubicación y estado en tiempo real, y responder a órdenes remotas de bloqueo/desbloqueo de forma confiable, incluso con conectividad móvil intermitente.",
      ],
    },
    solution: {
      heading: "Una plataforma full-stack, del dispositivo a la nube",
      body: [
        "Construimos el sistema completo de punta a punta: firmware en los scooters, backend con comunicación en tiempo real, app móvil y un panel operativo para gestionar la flota.",
      ],
      features: [
        {
          t: "Mapa en vivo y reserva",
          d: "Scooters cercanos sobre MapLibre GL, con reserva y desbloqueo por QR.",
        },
        {
          t: "Control remoto por TCP",
          d: "Bloqueo/desbloqueo directo al módulo del scooter mediante TCP raw.",
        },
        {
          t: "Telemetría en tiempo real",
          d: "Ubicación, batería y estado de cada dispositivo por WebSocket.",
        },
        {
          t: "Viaje en vivo e historial",
          d: "Seguimiento del recorrido en curso, historial y detalle de cada viaje.",
        },
        {
          t: "Saldo y pagos",
          d: "Recarga de saldo y pago del arriendo desde la propia app.",
        },
        {
          t: "Panel de flota",
          d: "Consola web operativa para monitoreo y gestión de los scooters.",
        },
      ],
    },
    process: {
      phases: [
        {
          t: "Firmware IoT",
          d: "Módulo ESP32 + SIM7600 en cada scooter, reportando y recibiendo órdenes por TCP sobre red móvil.",
        },
        {
          t: "Backend en Go",
          d: "Servicio en Go (Gorilla Mux) con tres capas de comunicación: HTTP REST, WebSocket y TCP raw con los dispositivos.",
        },
        {
          t: "App móvil",
          d: "React Native + Expo (expo-router, React 19), estado en Zustand y auth con secure-store.",
        },
        {
          t: "Datos y operación",
          d: "PostgreSQL + GORM para viajes y ubicaciones; panel web en Next.js para la flota.",
        },
      ],
      challenges: [
        "Comunicación confiable con hardware sobre conectividad móvil intermitente.",
        "Sincronizar estado en tiempo real entre dispositivo, backend y app sin condiciones de carrera.",
        "Latencia baja en el desbloqueo: la orden debe llegar al scooter en segundos.",
      ],
    },
    results: [
      "Flota operativa con desbloqueo remoto y telemetría en vivo por dispositivo.",
      "Arquitectura de tres capas (REST + WebSocket + TCP) que aísla el mundo IoT del de la app.",
      "App nativa publicada (iOS) sobre una base de código mantenible y en evolución.",
    ],
    closing:
      "Del firmware a la app, una sola plataforma coherente: hardware conectado que se controla y se paga desde el teléfono, en tiempo real.",
    technologies: [
      "React Native",
      "Expo",
      "MapLibre GL",
      "Zustand",
      "Go",
      "Gorilla Mux",
      "WebSocket",
      "TCP",
      "PostgreSQL",
      "GORM",
      "ESP32",
      "SIM7600",
      "Next.js",
    ],
  },

  "forestal-foresol": {
    slug: "forestal-foresol",
    name: "Forestal Foresol",
    logo: "/foresol-logo.png",
    kanji: "森", // bosque
    title: "Presencia digital e integración de boletas electrónicas con el SII",
    meta: {
      solucion: "Landing page · Integraciones · Optimización interna",
      cliente: "Forestal Foresol",
      año: "2025",
    },
    url: "https://forestalforesol.cl/",
    heroImage: "/foresol-hero.png",
    opportunity: {
      heading: "Modernizar una empresa forestal sin frenar su operación",
      body: [
        "Forestal Foresol es una empresa forestal familiar que necesitaba dar el salto digital: tener presencia web propia y, sobre todo, modernizar procesos internos que aún dependían de trabajo manual.",
        "El punto más sensible era la facturación: la emisión de boletas electrónicas debía integrarse correctamente con el SII, de forma confiable y sin fricción para el equipo.",
      ],
    },
    solution: {
      heading: "Presencia web + integración fiscal + mejora de procesos",
      body: [
        "Desplegamos su landing y trabajamos junto al equipo para optimizar sus productos internos, con foco en la integración fiscal y la reducción de tareas manuales.",
      ],
      features: [
        {
          t: "Landing desplegada",
          d: "Sitio propio, rápido y mantenible, como cara pública de la empresa.",
        },
        {
          t: "Boletas electrónicas + SII",
          d: "Integración de la emisión de boletas electrónicas con el Servicio de Impuestos Internos.",
        },
        {
          t: "Optimización de procesos",
          d: "Mejoras en herramientas internas para reducir trabajo manual y errores.",
        },
      ],
    },
    process: {
      phases: [
        {
          t: "Presencia web",
          d: "Diseño y despliegue de la landing, con hosting simple y de bajo costo.",
        },
        {
          t: "Integración SII",
          d: "Conexión de la emisión de boletas electrónicas con el SII y validación del flujo.",
        },
        {
          t: "Acompañamiento",
          d: "Ajustes de procesos internos junto al equipo, iterando sobre el uso real.",
        },
      ],
      challenges: [
        "Cumplir con los requisitos del SII para boletas electrónicas.",
        "Introducir mejoras sin interrumpir la operación diaria de la empresa.",
      ],
    },
    results: [
      "Presencia web propia, desplegada y fácil de mantener.",
      "Emisión de boletas electrónicas integrada con el SII.",
      "Menos trabajo manual y procesos internos más ordenados.",
    ],
    closing:
      "Una empresa tradicional con una base digital sólida: presencia propia, facturación integrada y procesos más livianos, sin sobresaltos.",
    technologies: ["Next.js", "Integración SII", "AWS", "Automatización de procesos"],
  },
};
