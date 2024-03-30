import React, { useEffect, useState } from 'react';
import Image from 'next/image';

// Define the props interface to type-check the props passed to the component
interface CarouselProps {
  images: {
    src: string;
    height: number;
    width: number;
    alt?: string;
  }[];
}

export const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [index, setIndex] = useState(0);

  const nextImage = () => setIndex((currentIndex) => (currentIndex + 1) % images.length);
  const prevImage = () => setIndex((currentIndex) => (currentIndex - 1 + images.length) % images.length);

  useEffect(() => {
    const interval = setInterval(nextImage, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) {
    return null; // Or return a default image or placeholder
  }

  return (
    <div className="relative h-[100vh] w-[100vw] overflow-hidden">
      {images.map((image, imageIndex) => (
        <div
          key={image.src}
          className={`absolute transition-opacity duration-500 ease-in-out ${index === imageIndex ? 'opacity-100' : 'opacity-0'}`}
          style={{ width: '100%', height: '100%' }}
        >
          <Image
            src={image.src}
            alt={image.alt ?? ''}
            layout="fill"
            objectFit="cover"
            priority={index === imageIndex}
          />
        </div>
      ))}
      {/* Navigation buttons if needed */}
      <button onClick={prevImage} className="absolute left-0 top-1/2 transform -translate-y-1/2">
        Prev
      </button>
      <button onClick={nextImage} className="absolute right-0 top-1/2 transform -translate-y-1/2">
        Next
      </button>
    </div>
  );
};

export default Carousel;
