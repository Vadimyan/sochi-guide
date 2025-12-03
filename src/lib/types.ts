/**
 * Type definitions for Sochi Travel Guide
 */

export interface Place {
  id: string;
  name: string;
  longDescription: string;
  photos: string[];
  yandexMapsUrl?: string | string[]; // Single URL or multiple URLs for places with multiple locations
  featured?: boolean;
}

export interface Section {
  id: string;
  title: string;
  description?: string;
  places: Place[];
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  icon: string;
  intro: string;
  mapImages?: string[]; // Screenshots of maps in intro section
  geography?: string; // Geographic description with maps
  yandexMapsCollectionUrl?: string; // URL to Yandex Maps collection
  sections: Section[];
}

export interface NavigationItem {
  title: string;
  slug: string;
  icon: string;
}
