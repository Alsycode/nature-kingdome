"""One-off script: appends a 'Quick Links' page with clickable buttons
(Book, Rates, Location, Gallery) to nature-kingdom-brochure-v2.pdf.
"""
import io
from pypdf import PdfReader, PdfWriter
from pypdf.annotations import Link
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.pdfbase.pdfmetrics import stringWidth

SRC = "nature-kingdom-brochure-v2.pdf"
OUT = "nature-kingdom-brochure-v2.pdf"

BASE_URL = "https://www.naturekingdomhomestay.com"

GOLD = HexColor("#C8A97E")
DARK = HexColor("#1a1a1a")
MUTED = HexColor("#6b6b6b")
CREAM = HexColor("#FAF7F2")

BUTTONS = [
    ("Book Your Stay", "Check dates and reserve directly", f"{BASE_URL}/book"),
    ("Rates & Packages", "Sharing options and per-night pricing", f"{BASE_URL}/stay-info/rates"),
    ("Location & Directions", "Map, address and how to reach us", f"{BASE_URL}/stay-info/location"),
    ("Photos & Videos", "See the rooms, the estate and evenings here", f"{BASE_URL}/stay-info/gallery"),
]

W, H = A4

buf = io.BytesIO()
c = canvas.Canvas(buf, pagesize=A4)

c.setFillColor(CREAM)
c.rect(0, 0, W, H, fill=1, stroke=0)

c.setFillColor(GOLD)
c.setFont("Helvetica", 9)
c.drawString(72, H - 90, "N A T U R E   K I N G D O M   H O M E S T A Y")

c.setFillColor(DARK)
c.setFont("Helvetica-Bold", 26)
c.drawString(72, H - 130, "Quick Links")

c.setFillColor(MUTED)
c.setFont("Helvetica", 11)
c.drawString(72, H - 155, "Everything you need for your stay, one tap away.")

btn_w = W - 144
btn_h = 78
gap = 22
start_y = H - 220

for i, (title, desc, url) in enumerate(BUTTONS):
    x = 72
    y = start_y - i * (btn_h + gap) - btn_h

    c.setFillColor(HexColor("#FFFFFF"))
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.2)
    c.roundRect(x, y, btn_w, btn_h, 8, fill=1, stroke=1)

    c.setFillColor(DARK)
    c.setFont("Helvetica-Bold", 15)
    c.drawString(x + 24, y + btn_h - 30, title)

    c.setFillColor(MUTED)
    c.setFont("Helvetica", 10)
    c.drawString(x + 24, y + 20, desc)

    arrow = "→"
    aw = stringWidth(arrow, "Helvetica-Bold", 16)
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 16)
    c.drawString(x + btn_w - 24 - aw, y + btn_h / 2 - 6, arrow)

    c.linkURL(url, (x, y, x + btn_w, y + btn_h), relative=0)

c.setFillColor(MUTED)
c.setFont("Helvetica", 8)
c.drawCentredString(W / 2, 40, "© 2026 Nature Kingdom Homestay, Chikkamagaluru. All rights reserved.")

c.save()
buf.seek(0)

overlay_reader = PdfReader(buf)
new_page = overlay_reader.pages[0]

reader = PdfReader(SRC)
writer = PdfWriter()
for page in reader.pages:
    writer.add_page(page)

writer.add_page(new_page)

with open(OUT, "wb") as f:
    writer.write(f)

print("done, pages:", len(writer.pages))
