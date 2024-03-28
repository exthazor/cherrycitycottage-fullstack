import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const carouselImages = [
  { src: '/images/hotel/carousel/aerial-view.jpg', height: 600, width: 800, alt: 'Aerial View' },
  { src: '/images/hotel/carousel/flower-pot.jpg', height: 600, width: 800, alt: 'Flower Pot' },
  { src: '/images/hotel/carousel/garden.jpg', height: 600, width: 800, alt: 'Garden' },
  { src: '/images/hotel/carousel/reception.jpg', height: 600, width: 800, alt: 'Reception' },
  { src: '/images/hotel/carousel/restaurant.jpg', height: 600, width: 800, alt: 'Restaurant' },
  { src: '/images/hotel/carousel/terrace.jpg', height: 600, width: 800, alt: 'Terrace' }
];

export const Carousel = () => {
  const [index, setIndex] = useState(0);

  const nextImage = () => setIndex((currentIndex) => (currentIndex + 1) % carouselImages.length);
  const prevImage = () => setIndex((currentIndex) => (currentIndex - 1 + carouselImages.length) % carouselImages.length);

  useEffect(() => {
    const interval = setInterval(nextImage, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[100vh] w-[100vw]">
    <Image
        src={carouselImages[index]?.src ?? ''}
        alt={carouselImages[index]?.alt ?? ''}
        layout="fill"
        objectFit="cover"
        priority={true}
    />
    </div>
  );
};

export default Carousel;
