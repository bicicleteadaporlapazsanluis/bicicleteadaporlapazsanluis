"use client";

import { useState } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

export function ImageSlider() {
  const images = [
    {
      id: 1,
      src: "/gallery/1.jpg",
      alt: "Ciclistas en evento anterior",
      title: "Evento 2024",
    },
    {
      id: 2,
      src: "/gallery/2.jpg",
      alt: "Grupo de participantes",
      title: "Familias participando",
    },
    {
      id: 3,
      src: "/gallery/3.jpg",
      alt: "Recorrido del evento",
      title: "Recorrido por la ciudad",
    },
    {
      id: 4,
      src: "/gallery/4.jpg",
      alt: "Símbolo de paz y ciclismo",
      title: "Paz y comunidad",
    },
    {
      id: 5,
      src: "/gallery/5.jpg",
      alt: "Familias participando",
      title: "Día familiar",
    },
    {
      id: 6,
      src: "/gallery/6.jpg",
      alt: "Celebración en la meta",
      title: "Llegada a la meta",
    },
    {
      id: 7,
      src: "/gallery/7.jpg",
      alt: "Momento especial del evento",
      title: "Momento especial",
    },
    {
      id: 8,
      src: "/gallery/8.jpg",
      alt: "Comunidad unida",
      title: "Comunidad unida",
    },
    {
      id: 9,
      src: "/gallery/9.jpg",
      alt: "Celebración final",
      title: "Celebración final",
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const swiperOptions = {
    modules: [Autoplay, Navigation],
    slidesPerView: 2,
    spaceBetween: 30,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    loop: true,

    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
    },
  };

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="relative">
          <Swiper {...swiperOptions} className="swiper">
            {images.map((image, index) => (
              <SwiperSlide key={image.id} className="swiper-slide">
                <div
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="relative overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={800}
                      height={800}
                      className="w-full h-80 object-cover"
                    />

                    {/* Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-b from-transparent to-black flex items-center justify-center p-6 transition-opacity duration-300 ${
                        hoveredIndex === index ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div className="text-center text-white">
                        <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
