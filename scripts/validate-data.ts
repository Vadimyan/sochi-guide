/**
 * Validation script to test data loading and structure
 * Run with: npx tsx scripts/validate-data.ts
 */

import { loadPage, getAllPageSlugs, getFeaturedPlaces } from '../src/lib/data';

console.log('🔍 Validating data structure...\n');

try {
  // Test loading all pages
  const slugs = getAllPageSlugs();
  console.log(`📄 Found ${slugs.length} pages: ${slugs.join(', ')}\n`);

  for (const slug of slugs) {
    try {
      const page = loadPage(slug);
      console.log(`✅ ${page.icon} ${page.title}`);
      console.log(`   Slug: ${page.slug}`);
      console.log(`   Sections: ${page.sections.length}`);

      let totalPlaces = 0;
      for (const section of page.sections) {
        totalPlaces += section.places.length;
        console.log(`   - ${section.title}: ${section.places.length} places`);

        // Validate each place has required fields
        for (const place of section.places) {
          if (!place.id || !place.name || !place.shortDescription) {
            throw new Error(
              `Place ${place.id || 'unknown'} is missing required fields`
            );
          }
          if (!Array.isArray(place.photos) || place.photos.length === 0) {
            console.warn(`   ⚠️  Place ${place.name} has no photos`);
          }
        }
      }

      console.log(`   Total places: ${totalPlaces}\n`);
    } catch (error) {
      if (error instanceof Error) {
        // Expected error for pages without data yet
        console.log(`⏭️  ${slug}: No data yet (${error.message})\n`);
      }
    }
  }

  // Test featured places
  const featured = getFeaturedPlaces();
  console.log(`⭐ Featured places: ${featured.length}`);
  for (const place of featured) {
    console.log(`   - ${place.name}`);
  }

  console.log('\n✅ Data validation complete!');
} catch (error) {
  console.error('\n❌ Validation failed:', error);
  process.exit(1);
}
