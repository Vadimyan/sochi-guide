import { notFound } from 'next/navigation';
import Image from 'next/image';
import { loadPage, getAllPageSlugs } from '@/lib/data';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PlaceSection } from '@/components/region/PlaceSection';
import { getImagePath } from '@/lib/basePath';
import { TrackedLink } from '@/components/analytics/TrackedLink';

interface RegionPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllPageSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default function RegionPage({ params }: RegionPageProps) {
  try {
    const page = loadPage(params.slug);

    return (
      <div className="min-h-screen">
        <div className="container-custom py-8">
          {/* Breadcrumbs */}
          <Breadcrumbs items={[{ title: page.title }]} />

          {/* Page Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-6xl">{page.icon}</span>
              <h1 className="text-5xl font-bold text-gray-900">{page.title}</h1>
            </div>

            {/* Intro Section */}
            {page.intro && (
              <div className="bg-gray-50 rounded-2xl p-8 mb-8">
                <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                  {page.intro}
                </p>

                {/* Map Images */}
                {page.mapImages && page.mapImages.length > 0 && (
                  <div className={`mt-6 ${
                    page.mapImages!.length === 1
                      ? 'flex justify-center'
                      : 'grid grid-cols-1 md:grid-cols-2 gap-4'
                  }`}>
                    {page.mapImages!.map((mapImage, index) => (
                      <div
                        key={index}
                        className={`relative ${
                          page.mapImages!.length === 1
                            ? 'w-full max-w-2xl h-80 md:h-96'
                            : 'w-full h-64 md:h-80'
                        }`}
                      >
                        <Image
                          src={getImagePath(mapImage)}
                          alt={`Карта ${page.title} - ${index + 1}`}
                          fill
                          className="object-contain rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Geography Section */}
            {page.geography && (
              <div className="bg-primary-50 rounded-2xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Где остановиться
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                  {page.geography}
                </p>
              </div>
            )}

            {/* Yandex Maps Collection Link */}
            {page.yandexMapsCollectionUrl && (
              <div className="mb-8">
                <TrackedLink
                  goal="open-maps-collection"
                  label={page.slug}
                  href={page.yandexMapsCollectionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <span>🗺️</span>
                  <span>Все места на Яндекс.Картах одним списком</span>
                </TrackedLink>
              </div>
            )}
          </header>

          {/* Sections */}
          {page.sections.length > 0 ? (
            <div className="space-y-16">
              {page.sections.map((section) => (
                <PlaceSection key={section.id} section={section} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                Данные для этого региона еще не добавлены.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
