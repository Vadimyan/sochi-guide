import { getAllPages } from './data';

/**
 * Get all images from all places across all regions
 * Returns shuffled array of image paths
 */
export function getAllPlaceImages(): string[] {
  const pages = getAllPages();
  const allImages: string[] = [];

  pages.forEach((page) => {
    page.sections.forEach((section) => {
      section.places.forEach((place) => {
        if (place.photos && place.photos.length > 0) {
          allImages.push(...place.photos);
        }
      });
    });
  });

  // Shuffle the images using Fisher-Yates algorithm
  const shuffled = [...allImages];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}
