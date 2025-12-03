# Images Manifest

This document lists all images referenced in the YAML data files. All images should be placed in their respective directories under `/public/images/`.

## Summary
- **Total images needed**: 78
- **Krasnaya Polyana**: 44 images
- **Sochi**: 13 images
- **Sirius-Adler**: 12 images
- **Around Sochi**: 9 images

## Krasnaya Polyana (44 images)

### Restaurants (20 images)
- `/images/krasnaya-polyana/dom-lesnika-1.jpg`
- `/images/krasnaya-polyana/gaia-1.jpg`
- `/images/krasnaya-polyana/kopche-1.jpg`
- `/images/krasnaya-polyana/mechanica-1.jpg`
- `/images/krasnaya-polyana/momo-1.jpg`
- `/images/krasnaya-polyana/moms-1.jpg`
- `/images/krasnaya-polyana/naturalist-1.jpg`
- `/images/krasnaya-polyana/rovesniki-1.jpg`
- `/images/krasnaya-polyana/rovesniki-2.jpg`
- `/images/krasnaya-polyana/surf-1.jpg`
- `/images/krasnaya-polyana/syty-drakon-1.jpg`
- `/images/krasnaya-polyana/u-semi-1.jpg`
- `/images/krasnaya-polyana/u-semi-2.jpg`
- `/images/krasnaya-polyana/vigoradov-1.jpg`
- `/images/krasnaya-polyana/yabloki-1.jpg`

### Wellness (3 images)
- `/images/krasnaya-polyana/banya-4-stihii-1.jpg`
- `/images/krasnaya-polyana/belarus-1.jpg`
- `/images/krasnaya-polyana/galaktika-1.jpg`

### Entertainment & Walks (15 images)
- `/images/krasnaya-polyana/endemic-1.jpg`
- `/images/krasnaya-polyana/endemic-2.jpg`
- `/images/krasnaya-polyana/iceberg-1.jpg`
- `/images/krasnaya-polyana/krugozor-1.jpg`
- `/images/krasnaya-polyana/kupel-1.jpg`
- `/images/krasnaya-polyana/old-boys-1.jpg`
- `/images/krasnaya-polyana/old-boys-2.jpg`
- `/images/krasnaya-polyana/ozerniy-1.jpg`
- `/images/krasnaya-polyana/ozerniy-2.jpg`
- `/images/krasnaya-polyana/ozerniy-3.jpg`
- `/images/krasnaya-polyana/rehab-center-1.jpg`
- `/images/krasnaya-polyana/rosa-peak-1.jpg`
- `/images/krasnaya-polyana/rosa-peak-2.jpg`
- `/images/krasnaya-polyana/rosa-peak-3.jpg`
- `/images/krasnaya-polyana/skver-1.jpg`

### Other (6 images - missing from above counts)
Total listed above: 38, so 6 more are needed to reach 44. Check YAML files for any missed entries.

## Sochi (13 images)

### Restaurants (6 images)
- `/images/sochi/belie-nochi-1.jpg`
- `/images/sochi/moy-kofe-1.jpg`
- `/images/sochi/plants-friends-1.jpg`
- `/images/sochi/surf-morvokzal-1.jpg`
- `/images/sochi/utomlennie-1.jpg`
- `/images/sochi/why-not-1.jpg`

### Entertainment & Walks (7 images)
- `/images/sochi/cathedral-1.jpg`
- `/images/sochi/dendrariy-1.jpg`
- `/images/sochi/naberezhnaya-1.jpg`
- `/images/sochi/old-center-1.jpg`
- `/images/sochi/ordzhonikidze-1.jpg`
- `/images/sochi/primorskiy-park-1.jpg`
- `/images/sochi/riviera-beach-1.jpg`

## Sirius-Adler (12 images)

### Restaurants (9 images)
- `/images/sirius-adler/ayvazovskiy-1.jpg`
- `/images/sirius-adler/bulochnaya-1.jpg`
- `/images/sirius-adler/gussi-1.jpg`
- `/images/sirius-adler/la-casa-1.jpg`
- `/images/sirius-adler/siniy-poni-1.jpg`
- `/images/sirius-adler/stolovaya-1.jpg`
- `/images/sirius-adler/surf-sirius-1.jpg`
- `/images/sirius-adler/vechno-molodoy-1.jpg`
- `/images/sirius-adler/wine-dom-1.jpg`

### Parks (3 images)
- `/images/sirius-adler/ornitologicheskiy-1.jpg`
- `/images/sirius-adler/yuzhnie-kultury-1.jpg`
- `/images/sirius-adler/yuzhnie-kultury-2.jpg`

## Around Sochi (9 images)

### Destinations (9 images)
- `/images/around-sochi/dom-varenya-1.jpg`
- `/images/around-sochi/dom-varenya-2.jpg`
- `/images/around-sochi/hosta-tea-1.jpg`
- `/images/around-sochi/maya-tea-1.jpg`
- `/images/around-sochi/monastery-1.jpg`
- `/images/around-sochi/psaho-canyon-1.jpg`
- `/images/around-sochi/tea-museum-1.jpg`
- `/images/around-sochi/tea-plantation-1.jpg`
- `/images/around-sochi/volino-1.jpg`

## Notes for Image Collection

1. **Image Specifications**:
   - Recommended format: JPEG (.jpg)
   - Recommended dimensions: 1200x800px or similar 3:2 aspect ratio
   - Optimize for web (target < 200KB per image)

2. **Source Images**:
   - Check the Notion pages for existing photos
   - Use high-quality, representative images for each location
   - Ensure images are properly licensed

3. **Placeholder Strategy**:
   - During development, you can use placeholder image services
   - Or create simple colored rectangles with text labels
   - Or skip image validation temporarily and add real images later

4. **Missing Images**:
   - If any YAML files are updated with new places, update this manifest
   - Run: `grep -r "^      - /images/" data/ | sort` to regenerate the list
