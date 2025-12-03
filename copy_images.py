#!/usr/bin/env python3
"""
Script to copy images from Notion export to public/images directory
Converts PNG to JPG and renames according to YAML file expectations
"""

import os
import shutil
from PIL import Image

# Base paths
NOTION_EXPORT_BASE = "/Users/vadimyan/Downloads/notionExport/Итак, вы приехали в Сочи (Сириус, Красную поляну)"
PUBLIC_IMAGES_BASE = "/Users/vadimyan/github/guide/sochi-guide/public/images"

def convert_and_copy(source_path, dest_path, quality=85):
    """Convert PNG to JPG and copy to destination"""
    print(f"Converting: {os.path.basename(source_path)} → {os.path.basename(dest_path)}")

    # Ensure destination directory exists
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)

    # Open and convert image
    with Image.open(source_path) as img:
        # Convert RGBA to RGB if necessary
        if img.mode in ('RGBA', 'LA', 'P'):
            # Create white background
            background = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'P':
                img = img.convert('RGBA')
            background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
            img = background
        elif img.mode != 'RGB':
            img = img.convert('RGB')

        # Save as JPG
        img.save(dest_path, 'JPEG', quality=quality, optimize=True)

# === KRASNAYA POLYANA ===
kp_base = os.path.join(NOTION_EXPORT_BASE, "Красная поляна")
kp_dest = os.path.join(PUBLIC_IMAGES_BASE, "krasnaya-polyana")

# Image mapping: Notion export filename → destination filename
krasnaya_polyana_mapping = {
    # Restaurants
    "image 2.png": "moms-1.jpg",
    "image 3.png": "rovesniki-1.jpg",
    "image 4.png": "dom-lesnika-1.jpg",
    "image 5.png": "gaia-1.jpg",
    "image 6.png": "mechanica-1.jpg",
    "image 7.png": "vigoradov-1.jpg",
    "image 8.png": "momo-1.jpg",
    "image 9.png": "surf-1.jpg",
    "image 10.png": "naturalist-1.jpg",
    "image 11.png": "u-semi-1.jpg",
    "image 12.png": "u-semi-2.jpg",
    "image 13.png": "kopche-1.jpg",
    "image 14.png": "yabloki-1.jpg",
    "image 15.png": "syty-drakon-1.jpg",

    # Wellness
    "image 16.png": "banya-4-stihii-1.jpg",
    "image 17.png": "galaktika-1.jpg",
    "image 18.png": "belarus-1.jpg",

    # Entertainment & Walks
    "image 19.png": "skver-1.jpg",
    "image 20.png": "krugozor-1.jpg",
    "image 21.png": "old-boys-1.jpg",
    "image 22.png": "old-boys-2.jpg",
    "image 23.png": "endemic-1.jpg",
    "image 25.png": "kupel-1.jpg",
    "image 26.png": "ozerniy-1.jpg",
    "image 27.png": "ozerniy-2.jpg",
    "image 28.png": "ozerniy-3.jpg",
    "image 29.png": "iceberg-1.jpg",
    "image 30.png": "rosa-peak-1.jpg",
    "image 31.png": "rosa-peak-2.jpg",
    "image 32.png": "rosa-peak-3.jpg",
}

# Also copy image 22 as endemic-2.jpg (they're neighbors, share images)
krasnaya_polyana_mapping["image 22.png"] = [
    "old-boys-2.jpg",
    "endemic-2.jpg"
]
# And copy rovesniki image to both locations
krasnaya_polyana_mapping["image 3.png"] = [
    "rovesniki-1.jpg",
    "rovesniki-2.jpg"  # For the second Rovesniki location
]

# === Process Krasnaya Polyana ===
print("\n=== KRASNAYA POLYANA ===")
for source_file, dest_file in krasnaya_polyana_mapping.items():
    source_path = os.path.join(kp_base, source_file)

    if not os.path.exists(source_path):
        print(f"⚠️  Source not found: {source_file}")
        continue

    # Handle multiple destinations
    dest_files = dest_file if isinstance(dest_file, list) else [dest_file]

    for df in dest_files:
        dest_path = os.path.join(kp_dest, df)
        convert_and_copy(source_path, dest_path)

print(f"\n✅ Krasnaya Polyana: Processed {len(krasnaya_polyana_mapping)} image mappings")
print(f"   Check: {kp_dest}")

# === SOCHI ===
sochi_base = os.path.join(NOTION_EXPORT_BASE, "Cочи")
sochi_dest = os.path.join(PUBLIC_IMAGES_BASE, "sochi")

sochi_mapping = {
    # Restaurants
    "image.png": "surf-morvokzal-1.jpg",
    "image 1.png": "moy-kofe-1.jpg",
    "image 2.png": "plants-friends-1.jpg",
    "image 3.png": "belie-nochi-1.jpg",
    "image 4.png": "why-not-1.jpg",
    "image 5.png": "utomlennie-1.jpg",

    # Entertainment & Walks
    "image 6.png": "old-center-1.jpg",
    "image 7.png": "dendrariy-1.jpg",
}

# Reuse images for places without dedicated photos
sochi_mapping["image.png"] = [
    "surf-morvokzal-1.jpg",
    "naberezhnaya-1.jpg",  # Same location, makes sense to use same image
]

print("\n=== SOCHI ===")
for source_file, dest_file in sochi_mapping.items():
    source_path = os.path.join(sochi_base, source_file)

    if not os.path.exists(source_path):
        print(f"⚠️  Source not found: {source_file}")
        continue

    # Handle multiple destinations
    dest_files = dest_file if isinstance(dest_file, list) else [dest_file]

    for df in dest_files:
        dest_path = os.path.join(sochi_dest, df)
        convert_and_copy(source_path, dest_path)

print(f"\n✅ Sochi: Processed {len(sochi_mapping)} image mappings")
print(f"   Check: {sochi_dest}")

# === SIRIUS-ADLER ===
sirius_base = os.path.join(NOTION_EXPORT_BASE, "Сириус и Адлер")
sirius_dest = os.path.join(PUBLIC_IMAGES_BASE, "sirius-adler")

sirius_mapping = {
    # Restaurants in Sirius
    "telegram-cloud-photo-size-2-5242711792357077202-y.jpg": "surf-sirius-1.jpg",
    "image.png": "bulochnaya-1.jpg",
    "image 1.png": "la-casa-1.jpg",
    "image 2.png": "wine-dom-1.jpg",
    "image 3.png": "stolovaya-1.jpg",

    # Restaurants in Adler
    "image 4.png": "ayvazovskiy-1.jpg",
    "image 5.png": "gussi-1.jpg",
    "image 6.png": "vechno-molodoy-1.jpg",
    "image 7.png": "siniy-poni-1.jpg",

    # Parks
    "image 8.png": ["yuzhnie-kultury-1.jpg", "yuzhnie-kultury-2.jpg"],  # Use same image for both slots
    "image 9.png": "ornitologicheskiy-1.jpg",
}

print("\n=== SIRIUS-ADLER ===")
for source_file, dest_file in sirius_mapping.items():
    source_path = os.path.join(sirius_base, source_file)

    if not os.path.exists(source_path):
        print(f"⚠️  Source not found: {source_file}")
        continue

    # Handle multiple destinations
    dest_files = dest_file if isinstance(dest_file, list) else [dest_file]

    for df in dest_files:
        dest_path = os.path.join(sirius_dest, df)
        convert_and_copy(source_path, dest_path)

print(f"\n✅ Sirius-Adler: Processed {len(sirius_mapping)} image mappings")
print(f"   Check: {sirius_dest}")

# === AROUND SOCHI ===
around_base = os.path.join(NOTION_EXPORT_BASE, "Куда ещё съездить вокруг Сочи и Красной поляны")
around_dest = os.path.join(PUBLIC_IMAGES_BASE, "around-sochi")

around_mapping = {
    # Note: images 0-3 are for Old boys/Endemic which are already in Krasnaya Polyana section
    # So we start from image 4

    # Destinations
    "image 4.png": "volino-1.jpg",
    "image 5.png": "hosta-tea-1.jpg",  # Reuse for tea-related place
    "image 6.png": "tea-plantation-1.jpg",
    "image 7.png": "maya-tea-1.jpg",  # Reuse for tea-related place
    "image 8.png": "dom-varenya-1.jpg",
    "image 9.png": "dom-varenya-2.jpg",
}

print("\n=== AROUND SOCHI ===")
for source_file, dest_file in around_mapping.items():
    source_path = os.path.join(around_base, source_file)

    if not os.path.exists(source_path):
        print(f"⚠️  Source not found: {source_file}")
        continue

    # Handle multiple destinations
    dest_files = dest_file if isinstance(dest_file, list) else [dest_file]

    for df in dest_files:
        dest_path = os.path.join(around_dest, df)
        convert_and_copy(source_path, dest_path)

print(f"\n✅ Around Sochi: Processed {len(around_mapping)} image mappings")
print(f"   Check: {around_dest}")

print("\n" + "="*60)
print("✅ ALL REGIONS COMPLETED!")
print("="*60)
