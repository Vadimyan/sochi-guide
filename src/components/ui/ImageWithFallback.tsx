'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getImagePath } from '@/lib/basePath';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}

export function ImageWithFallback({
  src,
  alt,
  className = '',
  sizes,
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);
  const imagePath = getImagePath(src);

  if (error) {
    // Fallback placeholder with gradient and icon
    return (
      <div
        className={`relative w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center ${className}`}
      >
        <div className="text-center px-4">
          <div className="text-4xl mb-2">📸</div>
          <p className="text-sm text-gray-600 font-medium line-clamp-2">{alt}</p>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={imagePath}
      alt={alt}
      fill
      className={className}
      sizes={sizes}
      onError={() => setError(true)}
    />
  );
}
