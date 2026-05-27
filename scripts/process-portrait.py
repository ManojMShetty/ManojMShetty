"""
Process the raw portrait photo:
  1. Remove background via rembg (if installed) — otherwise crop tight to center
  2. Apply a tight crop to focus on the subject (excludes side people)
  3. Resize to a portrait-friendly resolution (600 x 800)
  4. Save as public/manoj-portrait.png with transparent background

Run from the portfolio root:
  uv run python scripts/process-portrait.py

The script expects the raw photo at one of these paths (in order of preference):
  - public/manoj-raw.jpg
  - public/manoj-raw.png
  - public/manoj-raw.jpeg
  - public/manoj-raw.webp

To install rembg first (one-time, ~150 MB for the u2net model):
  uv pip install rembg pillow onnxruntime

If rembg isn't installed, the script still produces a usable tight-cropped portrait
without background removal — you just get the original background showing.
"""

from __future__ import annotations

import sys
from pathlib import Path

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.stderr.write("Pillow is required: uv pip install pillow\n")
    sys.exit(1)

try:
    from rembg import remove as rembg_remove
    HAVE_REMBG = True
except ImportError:
    HAVE_REMBG = False

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
OUT_PATH = PUBLIC / "manoj-portrait.png"

# Crop tightly to the center 50% horizontally to remove the side people.
# Adjust these if the source photo has the subject off-center.
CROP_CENTER_RATIO = 0.50  # keep middle 50% of width
TOP_RATIO = 0.0           # start at top
BOTTOM_RATIO = 1.0        # go to bottom
OUTPUT_SIZE = (600, 800)  # final size (3:4 aspect ratio)


def find_source() -> Path:
    candidates = [
        PUBLIC / "manoj-raw.jpg",
        PUBLIC / "manoj-raw.png",
        PUBLIC / "manoj-raw.jpeg",
        PUBLIC / "manoj-raw.webp",
    ]
    for c in candidates:
        if c.exists():
            return c
    raise SystemExit(
        f"No raw photo found. Save your photo as one of:\n  "
        + "\n  ".join(str(c) for c in candidates)
    )


def tight_crop(img: Image.Image) -> Image.Image:
    """Crop center vertical strip to drop side subjects."""
    w, h = img.size
    crop_w = int(w * CROP_CENTER_RATIO)
    left = (w - crop_w) // 2
    right = left + crop_w
    top = int(h * TOP_RATIO)
    bottom = int(h * BOTTOM_RATIO)
    return img.crop((left, top, right, bottom))


def main() -> None:
    src = find_source()
    print(f"Processing: {src}")

    img = Image.open(src).convert("RGBA")
    img = ImageOps.exif_transpose(img)  # respect EXIF orientation
    print(f"  source size: {img.size}")

    # 1. tight center crop
    img = tight_crop(img)
    print(f"  after crop:  {img.size}")

    # 2. background removal (if available)
    if HAVE_REMBG:
        print("  removing background via rembg (u2net)...")
        img = rembg_remove(img)
    else:
        print("  rembg not installed — skipping background removal")
        print("  install with: uv pip install rembg onnxruntime")

    # 3. resize to portrait
    img.thumbnail((OUTPUT_SIZE[0] * 2, OUTPUT_SIZE[1] * 2), Image.LANCZOS)
    img = ImageOps.fit(img, OUTPUT_SIZE, Image.LANCZOS, centering=(0.5, 0.4))

    # 4. save
    img.save(OUT_PATH, "PNG", optimize=True)
    print(f"  written:     {OUT_PATH} ({OUT_PATH.stat().st_size // 1024} KB)")
    print("done.")


if __name__ == "__main__":
    main()
