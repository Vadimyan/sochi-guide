import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { Place, Section, Page } from './types';

const DATA_DIR = path.join(process.cwd(), 'data');

interface YAMLSection {
  section: {
    id: string;
    title: string;
    description?: string;
  };
  places: Place[];
}

interface PageMetadata {
  id: string;
  slug: string;
  title: string;
  icon: string;
  intro: string;
  mapImages?: string[];
  geography?: string;
  yandexMapsCollectionUrl?: string;
}

interface PagesYAML {
  pages: PageMetadata[];
}

/**
 * Load a YAML file and parse it
 */
function loadYAML<T>(filePath: string): T {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  return yaml.load(fileContent) as T;
}

/**
 * File order for each region (matches Notion document structure)
 */
const REGION_FILE_ORDER: Record<string, string[]> = {
  'krasnaya-polyana': ['restaurants.yaml', 'wellness.yaml', 'entertainment.yaml'],
  'sochi': ['restaurants.yaml', 'entertainment.yaml'],
  'sirius-adler': ['restaurants.yaml', 'parks.yaml'],
  'around-sochi': ['destinations.yaml'],
};

/**
 * Load all sections for a specific region
 */
export function loadRegionSections(region: string): Section[] {
  const regionDir = path.join(DATA_DIR, region);

  if (!fs.existsSync(regionDir)) {
    throw new Error(`Region directory not found: ${regionDir}`);
  }

  // Get files in the correct order from REGION_FILE_ORDER
  const orderedFiles = REGION_FILE_ORDER[region] || [];
  const files = orderedFiles.filter(file => {
    const filePath = path.join(regionDir, file);
    return fs.existsSync(filePath);
  });

  return files.map(file => {
    const filePath = path.join(regionDir, file);
    const data = loadYAML<YAMLSection>(filePath);

    return {
      id: data.section.id,
      title: data.section.title,
      description: data.section.description,
      places: data.places,
    };
  });
}

/**
 * Load pages metadata from pages.yaml
 */
function loadPagesMetadata(): PageMetadata[] {
  const pagesFilePath = path.join(DATA_DIR, 'pages.yaml');
  const data = loadYAML<PagesYAML>(pagesFilePath);
  return data.pages;
}

/**
 * Load a complete page with all its sections
 */
export function loadPage(slug: string): Page {
  // Map slugs to directories
  const regionMap: Record<string, string> = {
    'krasnaya-polyana': 'krasnaya-polyana',
    'sochi': 'sochi',
    'sirius-adler': 'sirius-adler',
    'around-sochi': 'around-sochi',
  };

  const region = regionMap[slug];
  if (!region) {
    throw new Error(`Unknown page slug: ${slug}`);
  }

  const sections = loadRegionSections(region);

  // Load page metadata from pages.yaml
  const pagesMetadata = loadPagesMetadata();
  const metadata = pagesMetadata.find(p => p.slug === slug);

  if (!metadata) {
    throw new Error(`Page metadata not found for slug: ${slug}`);
  }

  return {
    id: metadata.id,
    slug: metadata.slug,
    title: metadata.title,
    icon: metadata.icon,
    intro: metadata.intro,
    mapImages: metadata.mapImages,
    geography: metadata.geography,
    yandexMapsCollectionUrl: metadata.yandexMapsCollectionUrl,
    sections,
  };
}

/**
 * Get all available page slugs
 */
export function getAllPageSlugs(): string[] {
  return ['krasnaya-polyana', 'sochi', 'sirius-adler', 'around-sochi'];
}

/**
 * Get all pages
 */
export function getAllPages(): Page[] {
  const slugs = getAllPageSlugs();
  return slugs.map(slug => loadPage(slug));
}

/**
 * Get featured places from all regions
 */
export function getFeaturedPlaces(): Place[] {
  const slugs = getAllPageSlugs();
  const allPlaces: Place[] = [];

  for (const slug of slugs) {
    const page = loadPage(slug);
    for (const section of page.sections) {
      allPlaces.push(...section.places.filter(p => p.featured));
    }
  }

  return allPlaces;
}
