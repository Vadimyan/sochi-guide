'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getImagePath } from '@/lib/basePath';

interface ImageCarouselProps {
  images: string[];
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-2xl shadow-2xl">
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={getImagePath(image)}
            alt="Место в Сочи и Красной Поляне"
            fill
            className="object-cover"
            unoptimized
            priority={index === 0}
          />
        </div>
      ))}

      {/* Navigation dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {images.slice(0, 10).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex % 10
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Перейти к слайду ${index + 1}`}
          />
        ))}
      </div>

      {/* Image counter */}
      <div className="absolute top-6 right-6 bg-black/50 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
