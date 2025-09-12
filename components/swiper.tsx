"use client";

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

interface SwiperGalleryProps {
  images: string[];
}

export function SwiperGallery({ images }: SwiperGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main Swiper */}
      <Swiper
        modules={[Navigation, Thumbs]}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        className="mb-4 rounded-lg overflow-hidden shadow-lg"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-64 md:h-96 lg:h-[500px]">
              <Image
                src={image}
                alt={`Galería ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbs Swiper */}
      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[FreeMode, Thumbs]}
        spaceBetween={10}
        slidesPerView="auto"
        freeMode={true}
        slideToClickedSlide={true}
        centeredSlides={false}
        className="thumbs-swiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="!w-20 !h-20 md:!w-24 md:!h-24">
            <div className="relative w-full h-full rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-green-400 transition-colors">
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
