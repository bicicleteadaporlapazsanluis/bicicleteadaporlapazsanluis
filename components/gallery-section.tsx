"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Upload } from "lucide-react"
import { SwiperGallery } from "@/components/swiper"

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // Galería de fotos del evento - imágenes locales de la carpeta public/gallery
  const galleryImages = [
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
  ]

  const galleryImagesArray = galleryImages.map(img => img.src)

  return (
    <section id="galeria" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Galería de Fotos</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Revive los momentos más especiales de nuestros eventos anteriores y comparte tus propias fotos
          </p>
        </div>

        <div className="mb-8">
          <SwiperGallery images={galleryImagesArray} />
        </div>

        <div className="text-center">
          <Button 
            variant="outline" 
            className="bg-white/90 backdrop-blur-sm hover:bg-green-50 border-green-200 text-green-700 hover:text-green-800"
          >
            <Upload className="w-4 h-4 mr-2" />
            Subir tus fotos
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            Próximamente podrás subir tus propias fotos del evento
          </p>
        </div>
      </div>
    </section>
  )
}
