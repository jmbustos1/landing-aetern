#!/usr/bin/env python3
# Generador parametrizado de cotizaciones AETERN (una config por servicio -> un PDF).
from fpdf import FPDF
from datetime import datetime

NAVY = (15, 19, 32)
AZURE = (63, 111, 180)
AZURE_LT = (232, 240, 250)
INK = (38, 42, 50)
MUTED = (110, 122, 138)
HAIR = (216, 224, 232)
BAND = (243, 246, 250)
SEAL = (60, 90, 134)

W = 210
ML = 16
CW = W - 2 * ML
OUTDIR = "/home/tecob/Documents/personal_projects/software-factory-landing-page/site/public/"


def money(v):
    return "USD " + format(v, ",d").replace(",", ".")


def _san(x):
    """Normaliza caracteres unicode fuera de latin-1 (fuentes core de fpdf)."""
    if isinstance(x, str):
        return (
            x.replace("—", "-").replace("–", "-").replace("•", "-")
            .replace("→", "->").replace("…", "...").replace(" ", " ")
            .replace("‘", "'").replace("’", "'")
            .replace("“", '"').replace("”", '"')
        )
    if isinstance(x, list):
        return [_san(i) for i in x]
    if isinstance(x, tuple):
        return tuple(_san(i) for i in x)
    if isinstance(x, dict):
        return {k: _san(v) for k, v in x.items()}
    return x


def build(cfg):
    cfg = _san(cfg)
    pdf = FPDF(format="A4")
    pdf.set_auto_page_break(auto=False)
    pdf.set_margins(ML, 14, ML)

    def hr(y, color=HAIR, w=0.3):
        pdf.set_draw_color(*color)
        pdf.set_line_width(w)
        pdf.line(ML, y, W - ML, y)

    def mark(x, y, s):
        pdf.set_draw_color(*AZURE)
        pdf.set_line_width(s * 0.14)
        pdf.line(x, y + s, x + s * 0.42, y)
        pdf.line(x + s * 0.42, y, x + s * 0.85, y + s)
        pdf.set_line_width(s * 0.05)
        for i in range(3):
            ox = x + s * (0.5 + i * 0.08)
            oy = y + s * (0.28 - i * 0.06)
            pdf.line(ox, oy, ox + s * 0.14, oy + s * 0.30)

    def sect(y, n, txt):
        pdf.set_draw_color(*AZURE)
        pdf.set_line_width(1.4)
        pdf.line(ML, y + 1.5, ML, y + 6.5)
        pdf.set_xy(ML + 4, y)
        pdf.set_font("helvetica", "B", 7.5)
        pdf.set_text_color(*AZURE)
        pdf.cell(0, 4, n)
        pdf.set_xy(ML + 4, y + 3.6)
        pdf.set_font("helvetica", "B", 12.5)
        pdf.set_text_color(*NAVY)
        pdf.cell(0, 5, txt)

    def footer():
        pdf.set_y(-15)
        hr(pdf.get_y(), HAIR, 0.3)
        pdf.set_y(-12)
        pdf.set_font("helvetica", "", 7.5)
        pdf.set_text_color(*MUTED)
        pdf.cell(0, 4, "AETERN  -  Software Manufacturing  -  hola@aetern.dev", align="L")
        pdf.set_y(-12)
        pdf.cell(0, 4, "Cotizacion referencial - no vinculante", align="R")

    # -------- PAGINA 1: header + alcance --------
    pdf.add_page()
    mark(ML, 15, 11)
    pdf.set_xy(ML + 14, 14)
    pdf.set_font("helvetica", "", 15)
    pdf.set_text_color(*NAVY)
    pdf.cell(0, 6, "AETERN")
    pdf.set_xy(ML + 14, 20.5)
    pdf.set_font("helvetica", "", 7)
    pdf.set_text_color(*AZURE)
    pdf.cell(0, 4, "S O F T W A R E   M A N U F A C T U R I N G")
    pdf.set_xy(W - ML - 70, 14)
    pdf.set_font("helvetica", "B", 8)
    pdf.set_text_color(*MUTED)
    pdf.cell(70, 4, "COTIZACION REFERENCIAL", align="R")
    pdf.set_xy(W - ML - 70, 19)
    pdf.set_font("helvetica", "", 8)
    pdf.cell(70, 4, "Fecha: " + datetime.now().strftime("%d-%m-%Y"), align="R")
    pdf.set_xy(W - ML - 70, 23)
    pdf.cell(70, 4, "Validez: 30 dias  -  Moneda: USD", align="R")
    hr(30, NAVY, 0.5)

    pdf.set_xy(ML, 35)
    pdf.set_font("helvetica", "B", 22)
    pdf.set_text_color(*NAVY)
    pdf.cell(0, 10, cfg["title"])
    pdf.set_xy(ML, 45)
    pdf.set_font("helvetica", "", 9.5)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(CW, 5, cfg["intro"])

    y = 60
    sect(y, "01  ALCANCE", "Desarrollo (pago unico), por modulo")
    y += 12
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(255, 255, 255)
    pdf.set_font("helvetica", "B", 8)
    pdf.set_xy(ML, y)
    pdf.cell(52, 7, "  Modulo", fill=True)
    pdf.cell(96, 7, "Detalle", fill=True)
    pdf.cell(CW - 148, 7, "Precio (USD)  ", fill=True, align="R")
    y += 7
    for i, (mod, det, price, base) in enumerate(cfg["dev"]):
        rh = 11
        if i % 2 == 0:
            pdf.set_fill_color(*BAND)
            pdf.rect(ML, y, CW, rh, style="F")
        pdf.set_xy(ML + 2, y + 1.6)
        pdf.set_font("helvetica", "B", 8.5)
        pdf.set_text_color(*NAVY)
        pdf.cell(50, 4, mod)
        pdf.set_xy(ML + 2, y + 6)
        if base:
            pdf.set_font("helvetica", "B", 6.5)
            pdf.set_text_color(*AZURE)
            pdf.cell(50, 3, "INCLUIDO / BASE")
        else:
            pdf.set_font("helvetica", "", 6.5)
            pdf.set_text_color(*MUTED)
            pdf.cell(50, 3, "opcional")
        pdf.set_xy(ML + 52, y + 1.8)
        pdf.set_font("helvetica", "", 7.8)
        pdf.set_text_color(*INK)
        pdf.multi_cell(96, 3.6, det)
        pdf.set_xy(W - ML - 40, y + 3.6)
        pdf.set_font("helvetica", "B", 9.5)
        pdf.set_text_color(*NAVY)
        pdf.cell(38, 4, money(price) if base else "+ " + money(price), align="R")
        y += rh
    if cfg.get("example"):
        y += 1
        lbl, amt = cfg["example"]
        pdf.set_fill_color(*AZURE_LT)
        pdf.rect(ML, y, CW, 9, style="F")
        pdf.set_xy(ML + 2, y + 2.6)
        pdf.set_font("helvetica", "", 8.5)
        pdf.set_text_color(*NAVY)
        pdf.cell(0, 4, lbl)
        pdf.set_xy(W - ML - 40, y + 2.4)
        pdf.set_font("helvetica", "B", 11)
        pdf.cell(38, 4, money(amt), align="R")
    footer()

    # -------- PAGINA 2: costos + gantt + condiciones --------
    pdf.add_page()
    mark(ML, 14, 8)
    pdf.set_xy(ML + 11, 14)
    pdf.set_font("helvetica", "", 11)
    pdf.set_text_color(*NAVY)
    pdf.cell(0, 6, "AETERN")
    pdf.set_xy(W - ML - 100, 15)
    pdf.set_font("helvetica", "", 8)
    pdf.set_text_color(*MUTED)
    pdf.cell(100, 4, cfg["title"] + "  -  cotizacion referencial (cont.)", align="R")
    hr(24, HAIR, 0.4)

    y = 30
    sect(y, "02  OPERACION", "Costos fijos / recurrentes (los asume el cliente)")
    y += 12
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(255, 255, 255)
    pdf.set_font("helvetica", "B", 8)
    pdf.set_xy(ML, y)
    pdf.cell(70, 7, "  Concepto", fill=True)
    pdf.cell(70, 7, "Proveedor", fill=True)
    pdf.cell(CW - 140, 7, "Costo aprox.  ", fill=True, align="R")
    y += 7
    for i, (con, prov, cost) in enumerate(cfg["fixed"]):
        if i % 2 == 0:
            pdf.set_fill_color(*BAND)
            pdf.rect(ML, y, CW, 7, style="F")
        pdf.set_xy(ML + 2, y + 1.8)
        pdf.set_font("helvetica", "B", 8)
        pdf.set_text_color(*NAVY)
        pdf.cell(68, 4, con)
        pdf.set_xy(ML + 70, y + 1.8)
        pdf.set_font("helvetica", "", 8)
        pdf.set_text_color(*INK)
        pdf.cell(70, 4, prov)
        pdf.set_xy(W - ML - 62, y + 1.8)
        pdf.set_font("helvetica", "", 8)
        pdf.set_text_color(*SEAL)
        pdf.cell(60, 4, cost, align="R")
        y += 7
    if cfg.get("fixed_note"):
        pdf.set_xy(ML, y + 1)
        pdf.set_font("helvetica", "I", 7)
        pdf.set_text_color(*MUTED)
        pdf.cell(0, 4, cfg["fixed_note"])
        y += 10
    else:
        y += 6

    sect(y, "03  PLAZOS", "Carta Gantt (referencial)")
    y += 15
    weeks = cfg["weeks"]
    gx = ML + 46
    gw = (W - ML - gx) / weeks
    pdf.set_font("helvetica", "B", 7 if weeks <= 6 else 6)
    pdf.set_text_color(*MUTED)
    for w in range(weeks):
        pdf.set_xy(gx + w * gw, y - 5)
        lab = ("Semana " + str(w + 1)) if weeks <= 6 else ("S" + str(w + 1))
        pdf.cell(gw, 4, lab, align="C")
    rh = 8
    for i, (name, a, b) in enumerate(cfg["phases"]):
        ry = y + i * rh
        if i % 2 == 0:
            pdf.set_fill_color(*BAND)
            pdf.rect(ML, ry, CW, rh, style="F")
        pdf.set_xy(ML + 1, ry + 2.2)
        pdf.set_font("helvetica", "", 8)
        pdf.set_text_color(*NAVY)
        pdf.cell(44, 4, name)
        pdf.set_fill_color(*AZURE)
        pdf.rect(gx + a * gw + 1, ry + 1.8, (b - a) * gw - 2, rh - 3.6, style="F")
    y += len(cfg["phases"]) * rh + 2
    pdf.set_xy(ML, y)
    pdf.set_font("helvetica", "I", 7.5)
    pdf.set_text_color(*MUTED)
    pdf.cell(0, 4, cfg["gantt_note"])
    y += 11

    sect(y, "04  CONDICIONES", "Supuestos, exclusiones y forma de pago")
    y += 12
    pdf.set_font("helvetica", "", 8)
    for b in cfg["conditions"]:
        pdf.set_xy(ML, y)
        pdf.set_text_color(*AZURE)
        pdf.cell(4, 4, "-")
        pdf.set_xy(ML + 4, y)
        pdf.set_text_color(*INK)
        pdf.multi_cell(CW - 4, 4, b)
        y = pdf.get_y() + 1.5
    footer()

    out = OUTDIR + "cotizacion-" + cfg["key"] + ".pdf"
    pdf.output(out)
    print("OK ->", out)


COND_BASE = [
    "Precios de referencia en USD; el valor final se confirma al cerrar el alcance.",
    "El cliente provee contenidos (textos e imagenes), salvo el modulo de Copywriting.",
    "No incluye diseno de marca/logo ni produccion fotografica, salvo que se indique.",
    "Los costos fijos los asume el cliente; AETERN puede gestionarlos con un margen si se prefiere.",
    "Forma de pago: 50% al inicio, 50% contra entrega.",
]

SERVICES = [
    {
        "key": "landing",
        "title": "Landing Page",
        "intro": "Precio por modulo: parte de una base y sumas solo lo que necesitas. "
                 "Los valores son de referencia (mercado Chile/LatAm) y se ajustan al alcance final del proyecto.",
        "dev": [
            ("Landing base", "Diseno a medida, hasta 6 secciones, responsive, formulario de contacto, SEO on-page, deploy en AWS.", 500, True),
            ("Pasarela de pago", "Integracion Webpay (Transbank) o Mercado Pago, con pruebas y puesta en marcha.", 1500, False),
            ("Agendamiento", "Reserva de horas con Calendly / Cal.com (embed + configuracion).", 200, False),
            ("Integracion de envios", "Conexion con courier / API de despacho.", 600, False),
            ("Blog / CMS", "Gestor de contenidos para publicar sin depender de nosotros.", 700, False),
            ("Multi-idioma (i18n)", "Segundo idioma con ruteo y contenidos paralelos.", 400, False),
            ("Copywriting", "Redaccion profesional de los textos de la pagina.", 300, False),
            ("Analitica", "Google Analytics 4 + Meta Pixel + eventos de conversion.", 150, False),
        ],
        "example": ("Ejemplo: Landing base + Pasarela de pago", 2000),
        "fixed": [
            ("Dominio .cl", "NIC Chile", "~ USD 12 / ano"),
            ("Hosting (sitio estatico)", "AWS S3 + CloudFront", "~ USD 1-5 / mes"),
            ("Certificado SSL", "AWS Certificate Manager", "Incluido (USD 0)"),
            ("Email empresarial", "Google Workspace / Zoho Mail", "desde USD 6 / usuario / mes"),
            ("Backend de pagos (si Webpay)", "AWS Lambda", "~ USD 0-3 / mes"),
            ("Base de datos (si aplica)", "AWS RDS / DynamoDB", "desde USD 15 / mes"),
            ("Mantencion y soporte", "AETERN (opcional)", "desde USD 50 / mes"),
        ],
        "fixed_note": "Una landing tipica NO necesita EC2 ni base de datos (es estatica). Esos costos aplican a apps y software a medida.",
        "weeks": 4,
        "phases": [
            ("Descubrimiento y diseno", 0, 1),
            ("Desarrollo", 1, 3),
            ("Integraciones y QA", 2, 4),
            ("Deploy y entrega", 3, 4),
        ],
        "gantt_note": "Landing base: ~3 semanas. Cada modulo de integracion (pagos, envios) suma aprox. 1 semana.",
        "conditions": COND_BASE,
    },
    {
        "key": "software",
        "title": "Software a la medida",
        "intro": "Se arma por modulo sobre una fundacion tecnica. La base incluye arquitectura, "
                 "base de datos, CI/CD y deploy; a partir de ahi sumas solo las capacidades que necesitas. "
                 "Valores de referencia (Chile/LatAm), ajustables al alcance.",
        "dev": [
            ("Fundacion del producto", "Arquitectura, setup, base de datos, CI/CD, deploy en AWS y un modulo CRUD inicial.", 2500, True),
            ("Autenticacion", "Registro e inicio de sesion con email y contrasena, recuperacion y verificacion.", 600, False),
            ("OAuth / login social", "Inicio de sesion con Google, Microsoft u otros proveedores.", 500, False),
            ("Roles y permisos", "Control de acceso por rol (admin, usuario, etc.) sobre cada recurso.", 700, False),
            ("Pasarela de pagos", "Cobros con Webpay, Mercado Pago o Stripe, con pruebas y conciliacion.", 1500, False),
            ("Suscripciones", "Cobros recurrentes, planes y gestion del ciclo de vida de la suscripcion.", 1200, False),
            ("Panel de administracion", "Back-office para gestionar usuarios, datos y operacion del sistema.", 1500, False),
            ("Visualizacion / dashboards", "Tableros con graficos y metricas clave para la toma de decisiones.", 1200, False),
            ("Notificaciones", "Correo, push o WhatsApp segun eventos del sistema.", 600, False),
            ("Reporteria / exportables", "Informes y exportacion a Excel / PDF.", 700, False),
            ("API / integraciones", "API para conectar con sistemas externos (ERP, CRM, terceros).", 1000, False),
        ],
        "example": ("Ejemplo: Base + Login + OAuth + Pagos + Visualizacion", 6300),
        "fixed": [
            ("Dominio (.cl / .com)", "NIC Chile / registrador", "~ USD 12 / ano"),
            ("Servidor de la app", "AWS ECS Fargate / EC2", "desde USD 15-40 / mes"),
            ("Base de datos", "AWS RDS (Postgres) / DynamoDB", "desde USD 15-30 / mes"),
            ("Almacenamiento y CDN", "AWS S3 + CloudFront", "~ USD 1-10 / mes"),
            ("Email transaccional", "AWS SES", "~ USD 0-5 / mes"),
            ("Email empresarial", "Google Workspace / Zoho", "desde USD 6 / usuario / mes"),
            ("Certificado SSL", "AWS Certificate Manager", "Incluido (USD 0)"),
            ("Observabilidad / logs", "AWS CloudWatch", "~ USD 0-10 / mes"),
            ("Mantencion y soporte", "AETERN (recomendado)", "desde USD 150 / mes"),
        ],
        "fixed_note": "El costo de infraestructura escala con el uso; en etapas tempranas suele quedar en la banda baja (o free tier).",
        "weeks": 12,
        "phases": [
            ("Descubrimiento y arquitectura", 0, 2),
            ("Fundacion + base de datos", 2, 4),
            ("Modulos core (auth, pagos...)", 4, 8),
            ("Panel + visualizacion", 7, 10),
            ("QA e integracion", 9, 11),
            ("Deploy y estabilizacion", 11, 12),
        ],
        "gantt_note": "Rango tipico 8-14 semanas segun modulos. Se trabaja por hitos, con entregas incrementales.",
        "conditions": [
            "Precios de referencia en USD; el valor final se confirma tras el descubrimiento y definicion de alcance.",
            "El desarrollo es iterativo y por hitos, con demos periodicas y feedback del cliente.",
            "No incluye diseno de marca/logo ni produccion de contenido, salvo que se indique.",
            "Los costos fijos de infraestructura los asume el cliente; AETERN puede gestionarlos con un margen.",
            "Forma de pago sugerida por hitos: 40% inicio, 30% a mitad, 30% contra entrega.",
        ],
    },
    {
        "key": "iot",
        "title": "IoT & Hardware",
        "intro": "Solucion IoT de punta a punta: firmware, conectividad, backend en tiempo real y app/panel. "
                 "El hardware fisico se cotiza por unidad, aparte del desarrollo. Valores de referencia (Chile/LatAm).",
        "dev": [
            ("Fundacion IoT", "Arquitectura, ingesta de telemetria, backend en tiempo real (WebSocket/TCP), base de datos y panel base.", 3000, True),
            ("Firmware de dispositivo", "Firmware (ESP32 o similar) con conectividad y reporte de estado.", 2500, False),
            ("Control remoto", "Ordenes remotas al dispositivo (encender/apagar, bloqueo, etc.).", 1200, False),
            ("Geolocalizacion en vivo", "Mapa con posicion y estado de los dispositivos en tiempo real.", 1000, False),
            ("App movil (companion)", "App para el usuario final (mapa, control, saldo).", 4000, False),
            ("Panel de flota", "Consola web para monitoreo y gestion de dispositivos.", 1500, False),
            ("Pagos / saldo", "Cobros o recarga de saldo desde la app.", 1500, False),
            ("OTA (updates de firmware)", "Actualizacion remota del firmware de la flota.", 1200, False),
            ("Alertas y notificaciones", "Avisos por bateria baja, offline, etc.", 600, False),
        ],
        "example": ("Ejemplo: Fundacion IoT + Firmware + Control remoto", 6700),
        "fixed": [
            ("Servidor / backend en vivo", "AWS ECS / EC2", "desde USD 20-50 / mes"),
            ("Base de datos / series de tiempo", "AWS RDS / Timestream", "desde USD 20 / mes"),
            ("Broker IoT / MQTT", "AWS IoT Core", "~ USD 1 / millon de mensajes"),
            ("Conectividad movil (SIM)", "Operador / IoT SIM", "desde USD 1-5 / dispositivo / mes"),
            ("Almacenamiento y CDN", "AWS S3 + CloudFront", "~ USD 1-10 / mes"),
            ("Certificado SSL", "AWS ACM", "Incluido (USD 0)"),
            ("Mantencion y soporte", "AETERN (recomendado)", "desde USD 150 / mes"),
        ],
        "fixed_note": "El hardware fisico (dispositivos, sensores, modulos) se cotiza por unidad, aparte del desarrollo.",
        "weeks": 14,
        "phases": [
            ("Descubrimiento y arquitectura", 0, 2),
            ("Firmware + conectividad", 2, 6),
            ("Backend en tiempo real", 4, 8),
            ("App / panel", 7, 11),
            ("Pruebas en terreno", 10, 13),
            ("Deploy y estabilizacion", 13, 14),
        ],
        "gantt_note": "Rango tipico 10-16 semanas; firmware y pruebas en terreno son los tramos mas variables.",
        "conditions": [
            "Precios de referencia en USD; el valor final se confirma tras el descubrimiento.",
            "El hardware fisico (dispositivos, sensores) se cotiza por unidad, aparte del desarrollo.",
            "El desarrollo es iterativo y por hitos, con demos periodicas.",
            "Los costos fijos de infraestructura y conectividad los asume el cliente.",
            "Forma de pago sugerida por hitos: 40% inicio, 30% a mitad, 30% contra entrega.",
        ],
    },
    {
        "key": "agentic",
        "title": "Agentic Automation",
        "intro": "Automatizamos flujos con pipelines de IA: agentes que ejecutan trabajo real. Combina un setup "
                 "inicial con evolucion continua (retainer). El costo de tokens de IA es variable segun uso.",
        "dev": [
            ("Descubrimiento y diseno", "Mapeo del proceso, definicion de agentes, herramientas y criterios de exito.", 1500, True),
            ("Pipeline de un agente", "Un agente en produccion sobre tu flujo (LLM + herramientas + guardrails).", 2000, False),
            ("Integracion (por sistema)", "Conexion del agente con un sistema tuyo (CRM, correo, DB, etc.).", 800, False),
            ("RAG / base de conocimiento", "Ingesta y busqueda sobre tus documentos para respuestas con contexto.", 1500, False),
            ("Human-in-the-loop", "Puntos de aprobacion humana antes de acciones criticas.", 700, False),
            ("Observabilidad / evals", "Trazas, metricas y evaluacion continua de calidad.", 900, False),
            ("Panel de control", "Consola para operar y supervisar los agentes.", 1200, False),
        ],
        "example": ("Ejemplo: Diseno + 1 agente + 2 integraciones", 5100),
        "fixed": [
            ("Modelos de IA (tokens)", "Anthropic / OpenAI", "segun uso (variable)"),
            ("Servidor / orquestacion", "AWS ECS / Lambda", "desde USD 15-40 / mes"),
            ("Base vectorial", "Pinecone / pgvector", "desde USD 0-20 / mes"),
            ("Monitoreo / trazas", "CloudWatch / LangSmith", "desde USD 0-20 / mes"),
            ("Email empresarial", "Google Workspace / Zoho", "desde USD 6 / usuario / mes"),
            ("Evolucion continua (retainer)", "AETERN", "desde USD 500 / mes"),
        ],
        "fixed_note": "El costo de tokens de IA es variable y depende del volumen; se estima y se monitorea en marcha.",
        "weeks": 6,
        "phases": [
            ("Descubrimiento del flujo", 0, 1),
            ("Diseno de agentes", 1, 2),
            ("Construccion + integraciones", 2, 4),
            ("Evals y ajuste", 4, 5),
            ("Puesta en marcha", 5, 6),
        ],
        "gantt_note": "Un flujo inicial 4-6 semanas; luego evoluciona por iteraciones (retainer mensual).",
        "conditions": [
            "Precios de referencia en USD; el valor final depende del flujo y sus integraciones.",
            "El costo de tokens de IA es variable segun volumen; se estima y monitorea.",
            "Se recomienda un retainer de evolucion, evaluacion y monitoreo continuo.",
            "El cliente provee accesos a los sistemas a integrar.",
            "Forma de pago: 50% inicio, 50% contra entrega del flujo inicial.",
        ],
    },
    {
        "key": "apps-web",
        "title": "Apps Web",
        "intro": "Aplicacion web a la medida — desde un dashboard interno hasta un producto SaaS liviano. "
                 "Modular sobre una base tecnica. Valores de referencia (Chile/LatAm), ajustables al alcance.",
        "dev": [
            ("Fundacion web", "Setup, UI base, autenticacion simple, base de datos y deploy en AWS.", 1800, True),
            ("Autenticacion + roles", "Login/registro y control de acceso por rol.", 800, False),
            ("CRUD de negocio (por modulo)", "Gestion de una entidad del negocio (crear/editar/listar).", 700, False),
            ("Integraciones externas", "Conexion con una API o sistema de terceros.", 900, False),
            ("Pagos / suscripciones", "Cobros unicos o recurrentes (Webpay / MP / Stripe).", 1500, False),
            ("Dashboards / reportes", "Tableros con graficos y metricas.", 1000, False),
            ("Panel de administracion", "Back-office para gestionar datos y usuarios.", 1200, False),
            ("Notificaciones", "Correo, push o WhatsApp segun eventos.", 500, False),
            ("Tiempo real (websockets)", "Actualizaciones en vivo sin recargar.", 900, False),
        ],
        "example": ("Ejemplo: Base + Auth/roles + 2 CRUD + Dashboards", 5000),
        "fixed": [
            ("Dominio (.cl / .com)", "NIC Chile / registrador", "~ USD 12 / ano"),
            ("Servidor de la app", "AWS ECS Fargate / EC2", "desde USD 15-40 / mes"),
            ("Base de datos", "AWS RDS / DynamoDB", "desde USD 15-30 / mes"),
            ("Almacenamiento y CDN", "AWS S3 + CloudFront", "~ USD 1-10 / mes"),
            ("Email empresarial", "Google Workspace / Zoho", "desde USD 6 / usuario / mes"),
            ("Certificado SSL", "AWS ACM", "Incluido (USD 0)"),
            ("Mantencion y soporte", "AETERN (recomendado)", "desde USD 120 / mes"),
        ],
        "fixed_note": "El costo de infraestructura escala con el uso; en etapas tempranas suele quedar en la banda baja.",
        "weeks": 10,
        "phases": [
            ("Descubrimiento y UI", 0, 2),
            ("Fundacion", 2, 4),
            ("Modulos de negocio", 4, 8),
            ("QA e integracion", 7, 9),
            ("Deploy y entrega", 9, 10),
        ],
        "gantt_note": "Rango tipico 6-12 semanas segun modulos. Se trabaja por hitos con demos periodicas.",
        "conditions": [
            "Precios de referencia en USD; el valor final se confirma al cerrar el alcance.",
            "El desarrollo es iterativo y por hitos, con feedback del cliente.",
            "El cliente provee contenidos y accesos a sistemas a integrar.",
            "Los costos fijos de infraestructura los asume el cliente; AETERN puede gestionarlos con un margen.",
            "Forma de pago: 50% inicio, 50% contra entrega (o por hitos si es extenso).",
        ],
    },
    {
        "key": "etl",
        "title": "ETLs & Data",
        "intro": "Pipelines de datos que ingieren, transforman y entregan — confiables y a escala. "
                 "Se cotiza por pipeline y numero de fuentes. Valores de referencia (Chile/LatAm).",
        "dev": [
            ("Pipeline base (1 fuente)", "Ingesta de una fuente, transformacion y carga a destino, con orquestacion y logging.", 1800, True),
            ("Fuente adicional", "Ingesta de una fuente extra (API, DB, archivos).", 600, False),
            ("Transformaciones complejas", "Limpieza, joins y logica de negocio avanzada.", 800, False),
            ("Data warehouse / modelado", "Modelo dimensional y carga a un warehouse.", 1500, False),
            ("Dashboards / BI", "Tableros de visualizacion sobre los datos.", 1200, False),
            ("Orquestacion / scheduling", "Ejecucion programada, dependencias y reintentos.", 700, False),
            ("Data quality / validaciones", "Chequeos de calidad y alertas ante anomalias.", 700, False),
            ("CDC / near real-time", "Captura de cambios para datos casi en vivo.", 1500, False),
        ],
        "example": ("Ejemplo: Pipeline base + 2 fuentes + Dashboards", 4200),
        "fixed": [
            ("Orquestacion", "AWS Step Functions / Airflow", "desde USD 10-30 / mes"),
            ("Data warehouse", "AWS Redshift / BigQuery", "segun uso (desde USD 0)"),
            ("Compute (ETL jobs)", "AWS Lambda / Glue", "segun uso"),
            ("Almacenamiento", "AWS S3", "~ USD 1-10 / mes"),
            ("BI / dashboards", "Metabase / QuickSight", "desde USD 0-10 / usuario"),
            ("Mantencion y soporte", "AETERN (recomendado)", "desde USD 100 / mes"),
        ],
        "fixed_note": "El costo de datos escala con el volumen procesado y almacenado.",
        "weeks": 6,
        "phases": [
            ("Descubrimiento y fuentes", 0, 1),
            ("Modelado de datos", 1, 2),
            ("Construccion de pipelines", 2, 5),
            ("Validacion y BI", 4, 6),
        ],
        "gantt_note": "Un pipeline 3-6 semanas segun fuentes y complejidad.",
        "conditions": [
            "Precios de referencia en USD; el valor final depende de fuentes y complejidad.",
            "El cliente provee accesos y credenciales a las fuentes de datos.",
            "El desarrollo es iterativo, validando calidad de datos en cada etapa.",
            "Los costos fijos de datos e infraestructura los asume el cliente.",
            "Forma de pago: 50% inicio, 50% contra entrega.",
        ],
    },
    {
        "key": "forward-deploy",
        "title": "Forward Deploy Engineering",
        "intro": "Consultoria embebida: un ingeniero de AETERN se integra a tu equipo y entrega automatizacion "
                 "de procesos. Se contrata por sprint o retainer mensual (no es un precio unico cerrado).",
        "dev": [
            ("Sprint de descubrimiento", "2 semanas: mapeo de procesos, quick wins y hoja de ruta de automatizacion.", 2000, True),
            ("Automatizacion de un proceso", "Implementacion de una automatizacion puntual (entregable concreto).", 1500, False),
            ("Retainer part-time (mensual)", "~1/2 jornada al mes de ingenieria embebida. (valor mensual)", 3500, False),
            ("Retainer full-time (mensual)", "Jornada completa dedicada a tu operacion. (valor mensual)", 6500, False),
            ("Day-rate (por dia)", "Trabajo puntual facturado por dia. (valor por dia)", 350, False),
        ],
        "example": ("Ejemplo: Sprint de descubrimiento + 1 automatizacion", 3500),
        "fixed": [
            ("Herramientas de automatizacion", "Zapier / Make / n8n", "desde USD 0-50 / mes"),
            ("Infra de scripts/bots (si aplica)", "AWS Lambda / EC2", "desde USD 0-30 / mes"),
            ("Licencias de software", "segun el proceso", "variable"),
            ("Email empresarial", "Google Workspace / Zoho", "desde USD 6 / usuario / mes"),
        ],
        "fixed_note": "Al ser consultoria, los costos fijos dependen de las herramientas del proceso automatizado.",
        "weeks": 4,
        "phases": [
            ("Inmersion en el equipo", 0, 1),
            ("Mapeo de procesos", 1, 2),
            ("Automatizaciones", 2, 4),
            ("Hoja de ruta", 3, 4),
        ],
        "gantt_note": "Modalidad por sprint (2-4 semanas) o retainer mensual continuo.",
        "conditions": [
            "Modalidad por sprint o retainer mensual; no es un precio unico cerrado.",
            "El entregable es automatizacion de procesos y una hoja de ruta accionable.",
            "Los valores marcados /mes o /dia se facturan como tales (ver detalle).",
            "El cliente provee accesos a sus herramientas y procesos.",
            "Forma de pago: sprint por adelantado; retainer mensual anticipado.",
        ],
    },
    {
        "key": "rpa",
        "title": "RPA",
        "intro": "Robotic Process Automation: bots que ejecutan tareas repetitivas en sistemas sin API "
                 "(planillas, formularios, legacy). Se cotiza por proceso automatizado. Referencia (Chile/LatAm).",
        "dev": [
            ("Automatizacion de un proceso", "Un bot que ejecuta un proceso repetitivo de punta a punta (ej. carga de planillas).", 1200, True),
            ("Proceso adicional", "Automatizacion de otro proceso.", 900, False),
            ("Integracion con legacy", "Interaccion con un sistema sin API (escritorio, web, terminal).", 800, False),
            ("OCR / lectura de documentos", "Extraccion de datos desde documentos escaneados o PDFs.", 1000, False),
            ("Orquestacion / agendamiento", "Ejecucion programada y encadenada de los bots.", 500, False),
            ("Panel de monitoreo", "Consola para ver el estado y los resultados de los bots.", 900, False),
            ("Manejo de excepciones", "Alertas y recuperacion ante fallos del proceso.", 500, False),
        ],
        "example": ("Ejemplo: 2 procesos + OCR", 3100),
        "fixed": [
            ("Plataforma RPA (si aplica)", "UiPath / Power Automate / open-source", "desde USD 0-420 / mes"),
            ("Servidor para bots", "AWS EC2 / VM", "desde USD 15-40 / mes"),
            ("OCR / IA (si aplica)", "AWS Textract / similar", "segun uso"),
            ("Mantencion de bots", "AETERN (recomendado)", "desde USD 100 / mes"),
        ],
        "fixed_note": "Los bots requieren mantencion: cuando el sistema objetivo cambia, el bot se ajusta.",
        "weeks": 5,
        "phases": [
            ("Analisis del proceso", 0, 1),
            ("Construccion del bot", 1, 3),
            ("Pruebas", 3, 4),
            ("Puesta en marcha", 4, 5),
        ],
        "gantt_note": "Un proceso 2-5 semanas segun complejidad y estabilidad del sistema objetivo.",
        "conditions": [
            "Precios de referencia en USD; el valor final depende del proceso y su estabilidad.",
            "Se requiere acceso a los sistemas objetivo y credenciales de prueba.",
            "Los bots requieren mantencion ante cambios del sistema objetivo.",
            "Los costos fijos de plataforma e infraestructura los asume el cliente.",
            "Forma de pago: 50% inicio, 50% contra entrega.",
        ],
    },
]

for cfg in SERVICES:
    build(cfg)
