#!/usr/bin/env python3
# Genera la cotizacion referencial de Landing Page en PDF (estetica AETERN). 2 paginas.
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

pdf = FPDF(format="A4")
pdf.set_auto_page_break(auto=False)   # paginacion manual
pdf.set_margins(ML, 14, ML)


def hr(y, color=HAIR, w=0.3):
    pdf.set_draw_color(*color)
    pdf.set_line_width(w)
    pdf.line(ML, y, W - ML, y)


def draw_mark(x, y, s):
    pdf.set_draw_color(*AZURE)
    pdf.set_line_width(s * 0.14)
    pdf.line(x, y + s, x + s * 0.42, y)
    pdf.line(x + s * 0.42, y, x + s * 0.85, y + s)
    pdf.set_line_width(s * 0.05)
    for i in range(3):
        ox = x + s * (0.5 + i * 0.08)
        oy = y + s * (0.28 - i * 0.06)
        pdf.line(ox, oy, ox + s * 0.14, oy + s * 0.30)


def money(v):
    return "USD " + format(v, ",d").replace(",", ".")


def section_title(y, n, txt):
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


# ============================ PAGINA 1 ============================
pdf.add_page()
draw_mark(ML, 15, 11)
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
pdf.cell(0, 10, "Landing Page")
pdf.set_xy(ML, 45)
pdf.set_font("helvetica", "", 9.5)
pdf.set_text_color(*MUTED)
pdf.multi_cell(
    CW, 5,
    "Precio por modulo: parte de una base y sumas solo lo que necesitas. "
    "Los valores son de referencia (mercado Chile/LatAm) y se ajustan al alcance final del proyecto.",
)

y = 60
section_title(y, "01  ALCANCE", "Desarrollo (pago unico)")
y += 12

dev = [
    ("Landing base", "Diseno a medida, hasta 6 secciones, responsive, formulario de contacto, SEO on-page, deploy en AWS.", 500, True),
    ("Pasarela de pago", "Integracion Webpay (Transbank) o Mercado Pago, con pruebas y puesta en marcha.", 1500, False),
    ("Agendamiento", "Reserva de horas con Calendly / Cal.com (embed + configuracion).", 200, False),
    ("Integracion de envios", "Conexion con courier / API de despacho.", 600, False),
    ("Blog / CMS", "Gestor de contenidos para publicar sin depender de nosotros.", 700, False),
    ("Multi-idioma (i18n)", "Segundo idioma con ruteo y contenidos paralelos.", 400, False),
    ("Copywriting", "Redaccion profesional de los textos de la pagina.", 300, False),
    ("Analitica", "Google Analytics 4 + Meta Pixel + eventos de conversion.", 150, False),
]
pdf.set_fill_color(*NAVY)
pdf.set_text_color(255, 255, 255)
pdf.set_font("helvetica", "B", 8)
pdf.set_xy(ML, y)
pdf.cell(52, 7, "  Modulo", fill=True)
pdf.cell(96, 7, "Detalle", fill=True)
pdf.cell(CW - 52 - 96, 7, "Precio (USD)  ", fill=True, align="R")
y += 7
for i, (mod, det, price, base) in enumerate(dev):
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

y += 1
pdf.set_fill_color(*AZURE_LT)
pdf.rect(ML, y, CW, 9, style="F")
pdf.set_xy(ML + 2, y + 2.6)
pdf.set_font("helvetica", "", 8.5)
pdf.set_text_color(*NAVY)
pdf.cell(0, 4, "Ejemplo: Landing base + Pasarela de pago")
pdf.set_xy(W - ML - 40, y + 2.4)
pdf.set_font("helvetica", "B", 11)
pdf.cell(38, 4, money(2000), align="R")
footer()

# ============================ PAGINA 2 ============================
pdf.add_page()
draw_mark(ML, 14, 8)
pdf.set_xy(ML + 11, 14)
pdf.set_font("helvetica", "", 11)
pdf.set_text_color(*NAVY)
pdf.cell(0, 6, "AETERN")
pdf.set_xy(W - ML - 90, 15)
pdf.set_font("helvetica", "", 8)
pdf.set_text_color(*MUTED)
pdf.cell(90, 4, "Landing Page  -  cotizacion referencial (cont.)", align="R")
hr(24, HAIR, 0.4)

y = 30
section_title(y, "02  OPERACION", "Costos fijos / recurrentes (los asume el cliente)")
y += 12
fixed = [
    ("Dominio .cl", "NIC Chile", "~ USD 12 / ano"),
    ("Hosting (sitio estatico)", "AWS S3 + CloudFront", "~ USD 1-5 / mes"),
    ("Certificado SSL", "AWS Certificate Manager", "Incluido (USD 0)"),
    ("Email empresarial", "Google Workspace / Zoho Mail", "desde USD 6 / usuario / mes"),
    ("Backend de pagos (si Webpay)", "AWS Lambda", "~ USD 0-3 / mes"),
    ("Base de datos (si aplica)", "AWS RDS / DynamoDB", "desde USD 15 / mes"),
    ("Mantencion y soporte", "AETERN (opcional)", "desde USD 50 / mes"),
]
pdf.set_fill_color(*NAVY)
pdf.set_text_color(255, 255, 255)
pdf.set_font("helvetica", "B", 8)
pdf.set_xy(ML, y)
pdf.cell(70, 7, "  Concepto", fill=True)
pdf.cell(70, 7, "Proveedor", fill=True)
pdf.cell(CW - 140, 7, "Costo aprox.  ", fill=True, align="R")
y += 7
for i, (con, prov, cost) in enumerate(fixed):
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
pdf.set_xy(ML, y + 1)
pdf.set_font("helvetica", "I", 7)
pdf.set_text_color(*MUTED)
pdf.cell(0, 4, "Una landing tipica NO necesita EC2 ni base de datos (es estatica). Esos costos aplican a apps y software a medida.")
y += 10

section_title(y, "03  PLAZOS", "Carta Gantt (referencial)")
y += 15
gx = ML + 46
weeks = 4
gw = (W - ML - gx) / weeks
pdf.set_font("helvetica", "B", 7.5)
pdf.set_text_color(*MUTED)
for w in range(weeks):
    pdf.set_xy(gx + w * gw, y - 5)
    pdf.cell(gw, 4, "Semana " + str(w + 1), align="C")
phases = [
    ("Descubrimiento y diseno", 0, 1),
    ("Desarrollo", 1, 3),
    ("Integraciones y QA", 2, 4),
    ("Deploy y entrega", 3, 4),
]
rh = 8
for i, (name, a, b) in enumerate(phases):
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
y += len(phases) * rh + 2
pdf.set_xy(ML, y)
pdf.set_font("helvetica", "I", 7.5)
pdf.set_text_color(*MUTED)
pdf.cell(0, 4, "Landing base: ~3 semanas. Cada modulo de integracion (pagos, envios) suma aprox. 1 semana.")
y += 11

section_title(y, "04  CONDICIONES", "Supuestos, exclusiones y forma de pago")
y += 12
pdf.set_font("helvetica", "", 8)
for b in [
    "Precios de referencia en USD; el valor final se confirma al cerrar el alcance.",
    "El cliente provee contenidos (textos e imagenes), salvo el modulo de Copywriting.",
    "No incluye diseno de marca/logo ni produccion fotografica, salvo que se indique.",
    "Los costos fijos los asume el cliente; AETERN puede gestionarlos con un margen si se prefiere.",
    "Forma de pago: 50% al inicio, 50% contra entrega.",
]:
    pdf.set_xy(ML, y)
    pdf.set_text_color(*AZURE)
    pdf.cell(4, 4, "-")
    pdf.set_xy(ML + 4, y)
    pdf.set_text_color(*INK)
    pdf.multi_cell(CW - 4, 4, b)
    y = pdf.get_y() + 1.5
footer()

out = "/home/tecob/Documents/personal_projects/software-factory-landing-page/site/public/cotizacion-landing.pdf"
pdf.output(out)
print("OK ->", out)
