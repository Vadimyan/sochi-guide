import Image from 'next/image';
import { Place } from '@/lib/types';
import { ImageWithFallback } from '../ui/ImageWithFallback';

interface PlaceDetailProps {
  place: Place;
  showPhotos?: boolean;
}

export function PlaceDetail({ place, showPhotos = true }: PlaceDetailProps) {
  // Normalize yandexMapsUrl to array
  const yandexMapsUrls = place.yandexMapsUrl
    ? Array.isArray(place.yandexMapsUrl)
      ? place.yandexMapsUrl
      : [place.yandexMapsUrl]
    : [];

  const firstUrl = yandexMapsUrls[0];

  return (
    <div className="mb-12">
      {/* Place Header */}
      <div className="mb-4">
        {firstUrl ? (
          <a
            href={firstUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-block"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors inline-flex items-center gap-2">
              {place.name}
              {place.featured && <span className="text-yellow-500">⭐</span>}
              <span className="text-lg opacity-50">↗</span>
            </h3>
          </a>
        ) : (
          <h3 className="text-2xl font-bold text-gray-900 mb-2 inline-flex items-center gap-2">
            {place.name}
            {place.featured && <span className="text-yellow-500">⭐</span>}
          </h3>
        )}
      </div>

      {/* Place Description */}
      <div className="prose prose-lg max-w-none mb-6">
        {place.longDescription.split('\n\n').map((paragraph, index) => (
          <p key={index} className="text-gray-700 leading-relaxed mb-4">
            {paragraph.trim()}
          </p>
        ))}
      </div>

      {/* Place Photos */}
      {showPhotos && place.photos && place.photos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {place.photos.map((photo, index) => (
            <div
              key={index}
              className={`relative rounded-lg overflow-hidden shadow-lg bg-gray-100 ${
                place.photos.length === 1 ? 'md:col-span-2' : ''
              }`}
              style={{ height: place.photos.length === 1 ? '500px' : '400px' }}
            >
              <ImageWithFallback
                src={photo}
                alt={`${place.name} - фото ${index + 1}`}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      )}

      {/* Yandex Maps Links */}
      {yandexMapsUrls.length > 0 && (
        <div className="mt-4 space-y-2">
          {yandexMapsUrls.length === 1 ? (
            <a
              href={yandexMapsUrls[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              <span>📍</span>
              <span>Открыть на Яндекс.Картах</span>
            </a>
          ) : (
            <>
              <p className="text-gray-600 font-medium">Адреса на Яндекс.Картах:</p>
              {yandexMapsUrls.map((url, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium block"
                >
                  <span>📍</span>
                  <span>Адрес {index + 1}</span>
                </a>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
