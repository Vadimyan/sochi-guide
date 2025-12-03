import Link from 'next/link';
import { ImageCarousel } from '@/components/home/ImageCarousel';
import { getAllPlaceImages } from '@/lib/images';

const regions = [
  {
    title: 'Красная Поляна',
    slug: 'krasnaya-polyana',
    icon: '🏔️',
    description: 'Горный посёлок с завтраками, кофейнями и прогулками',
  },
  {
    title: 'Сочи',
    slug: 'sochi',
    icon: '🌴',
    description: 'Центр города: набережная, парки, старые дворики',
  },
  {
    title: 'Сириус и Адлер',
    slug: 'sirius-adler',
    icon: '🎭',
    description: 'Федеральная территория и курортный город у моря',
  },
  {
    title: 'Куда ещё съездить',
    slug: 'around-sochi',
    icon: '🚗',
    description: 'Каньоны, чайные плантации, монастыри и фермы',
  },
];

export default function HomePage() {
  const allImages = getAllPlaceImages();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container-custom py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Итак, вы приехали в Сочи<br />
            <span className="text-primary-600">(Сириус, Красную поляну)</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Личный гид по местам, куда стоит сходить поесть, погреться, прогуляться
            и развлечься. Проверено на собственном опыте.
          </p>
        </div>

        {/* Image Carousel */}
        {allImages.length > 0 && (
          <div className="mb-16">
            <ImageCarousel images={allImages} />
          </div>
        )}

        {/* Description */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Этот гид создан для тех, кто приехал в Сочи, Красную Поляну или Сириус
            и хочет узнать, где вкусно позавтракать, где выпить хороший кофе,
            куда сходить погулять и что посмотреть.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Здесь собраны только проверенные места, где мы сами неоднократно бывали.
            Без рекламы, без спонсорства — просто честные рекомендации от местных жителей.
          </p>
        </div>
      </section>

      {/* Regions Section */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Выберите, куда отправиться
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {regions.map((region) => (
              <Link
                key={region.slug}
                href={`/${region.slug}`}
                className="group bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl group-hover:scale-110 transition-transform">
                    {region.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {region.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {region.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
