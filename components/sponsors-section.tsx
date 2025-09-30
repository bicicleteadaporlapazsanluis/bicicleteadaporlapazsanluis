"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export function SponsorsSection() {
  const sponsors = [
    {
      name: "Gobierno de San Luis",
      logo: "/logos/sanluisprovincia.png",
      description: "Gobierno Provincial",
    },
    {
      name: "UPF ARGENTINA",
      logo: "/logos/upf.jpg",
      description: "Universal Peace Federation",
    },
    {
      name: "Fernando González Zunino",
      logo: null,
      icon: Heart,
      description: "Embajador para la Paz",
    },
    {
      name: "Rotary Club Sierras San Luis",
      logo: "/logos/rotaryclub.jpg",
      description: "Organización de servicio",
    },
    {
      name: "SERVO",
      logo: "/logos/servo.jpg",
      description: "Fábrica de productos anti pinchazos",
    },
    {
      name: "Triunfo Seguros",
      logo: "/logos/triunfoseguros.png",
      description: "Seguros",
    },
    {
      name: "JK",
      logo: "/logos/jk.jpg",
      description: "Patrocinador",
    },
    {
      name: "Gorila",
      logo: "/logos/gorila.png",
      description: "Patrocinador",
    },
    {
      name: "Fuera de Eje",
      logo: "/logos/fueradeeje.png",
      description: "Medios",
    },
    {
      name: "Fox Sports",
      logo: "/logos/foxsports.png",
      description: "Medios Deportivos",
    },
    {
      name: "Deadline Studios",
      logo: "/logos/deadline.png",
      description: "Producción",
    },
    {
      name: "BeHause",
      logo: "/logos/behause.png",
      description: "Patrocinador",
    },
    {
      name: "Montagne",
      logo: "/logos/montagne.jpg",
      description: "Patrocinador",
    },
    {
      name: "Al Voleo",
      logo: "/logos/alvoleo.png",
      description: "Patrocinador",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Invitan</h2>
            <p className="text-lg text-muted-foreground">Organizaciones que hacen posible este evento</p>
          </div>

          <div className="px-8">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              // navigation={true}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
              }}
              loop={true}
              spaceBetween={32}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 28,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 32,
                },
              }}
              className="sponsors-swiper pb-12"
            >
              {sponsors.map((sponsor, index) => (
                <SwiperSlide key={index} className="p-4">
                  <Card className="text-center border-border backdrop-blur-sm hover:scale-105 transition-all duration-300 h-64 flex flex-col">
                    <CardHeader className="pb-2 flex-1 flex flex-col justify-center">
                      <div className="w-full h-20 flex items-center justify-center mx-auto mb-3 relative rounded-lg">
                        {sponsor.logo ? (
                          <Image
                            src={sponsor.logo}
                            alt={sponsor.name}
                            width={120}
                            height={120}
                            className="object-contain max-w-full max-h-full"
                          />
                        ) : sponsor.icon ? (
                          <div className="bg-gradient-to-br from-red-100 to-pink-100 rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                            <sponsor.icon className="w-8 h-8 text-red-500" />
                          </div>
                        ) : null}
                      </div>
                      <CardTitle className="text-base text-primary leading-tight">{sponsor.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 pb-4">
                      <p className="text-xs text-muted-foreground">{sponsor.description}</p>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
