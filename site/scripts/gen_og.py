#!/usr/bin/env python3
# Genera la imagen Open Graph (1200x630) de AETERN: navy + logo + mensaje.
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 1200, 630
NAVY = (15, 19, 32)
AZURE = (86, 144, 210)
AZURE_LT = (140, 190, 240)
BRIGHT = (233, 239, 242)
MUTED = (124, 137, 147)

img = Image.new("RGB", (W, H), NAVY)

# Glow sutil azure arriba-derecha
glow = Image.new("RGB", (W, H), NAVY)
gd = ImageDraw.Draw(glow)
gd.ellipse([W - 620, -360, W + 260, 460], fill=(30, 48, 82))
glow = glow.filter(ImageFilter.GaussianBlur(150))
img = Image.blend(img, glow, 0.55)

d = ImageDraw.Draw(img)


def font(path, size):
    for p in [path, "/usr/share/fonts/truetype/dejavu/" + path]:
        try:
            return ImageFont.truetype(p, size)
        except Exception:
            continue
    return ImageFont.load_default()


F_WORD = font("DejaVuSans.ttf", 34)          # wordmark
F_HEAD = font("DejaVuSerif.ttf", 70)         # titular (serif, como la marca)
F_URL = font("DejaVuSans.ttf", 28)
F_TAG = font("DejaVuSans.ttf", 20)


def rline(p1, p2, w, color):
    """Línea gruesa con extremos redondeados."""
    d.line([p1, p2], fill=color, width=int(w))
    r = w / 2
    for p in (p1, p2):
        d.ellipse([p[0] - r, p[1] - r, p[0] + r, p[1] + r], fill=color)


def mark(x, y, s):
    """Logo ∧ + /// escalado (viewBox 100x104)."""
    def P(px, py):
        return (x + px * s / 100, y + py * s / 104)

    rline(P(18, 88), P(50, 15), 11 * s / 100, AZURE)
    rline(P(50, 15), P(82, 88), 8.5 * s / 100, AZURE)
    for a, b in [((58, 31), (66, 49)), ((63, 28), (71, 46)), ((68, 25), (76, 43))]:
        rline(P(*a), P(*b), 3.2 * s / 100, AZURE_LT)


def spaced(draw, xy, text, fnt, fill, tracking):
    """Texto con letter-spacing manual."""
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=fnt, fill=fill)
        x += draw.textlength(ch, font=fnt) + tracking


MX = 90  # margen izquierdo

# ── Lockup de marca (arriba) ──
mark(MX, 78, 74)
spaced(d, (MX + 96, 92), "AETERN", F_WORD, BRIGHT, 8)
spaced(d, (MX + 97, 132), "SOFTWARE  MANUFACTURING", F_TAG, AZURE, 3)

# ── Titular (el mensaje que hace click) ──
d.text((MX, 258), "Construimos software", font=F_HEAD, fill=BRIGHT)
d.text((MX, 340), "que ", font=F_HEAD, fill=BRIGHT)
wlen = d.textlength("que ", font=F_HEAD)
d.text((MX + wlen, 340), "perdura.", font=F_HEAD, fill=AZURE_LT)

# ── Pie ──
d.line([(MX, 470), (MX + 90, 470)], fill=AZURE, width=3)
spaced(d, (MX, 500), "aetern.dev", F_URL, BRIGHT, 1)
spaced(d, (MX, 540), "Long term · Attention to detail · Scalable · Zen", F_TAG, MUTED, 1)

out = "/home/tecob/Documents/personal_projects/software-factory-landing-page/site/public/og.png"
img.save(out, "PNG")
print("OK ->", out)
