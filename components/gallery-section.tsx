"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Upload } from "lucide-react"

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // Galería de fotos del evento - imágenes de ejemplo
  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop&crop=center",
      alt: "Ciclistas en evento anterior",
      title: "Evento 2023",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=center",
      alt: "Grupo de participantes",
      title: "Familias participando",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop&crop=center",
      alt: "Recorrido del evento",
      title: "Recorrido por la ciudad",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=center",
      alt: "Símbolo de paz y ciclismo",
      title: "Paz y comunidad",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop&crop=center",
      alt: "Familias participando",
      title: "Día familiar",
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=center",
      alt: "Celebración en la meta",
      title: "Llegada a la meta",
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Galería de Fotos</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Revive los momentos más especiales de nuestros eventos anteriores y comparte tus propias fotos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {galleryImages.map((image) => (
            <Card
              key={image.id}
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 bg-card/80 backdrop-blur-sm group"
              onClick={() => setSelectedImage(image.src)}
            >
              <div className="relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                      <Upload className="w-6 h-6 text-gray-700" />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <h3 className="text-white font-semibold text-sm">{image.title}</h3>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Haz clic en cualquier imagen para verla en tamaño completo
          </p>
        </div>

        {/* Modal for enlarged image */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-full">
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-12 right-0 text-white hover:bg-white/20"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-6 h-6" />
              </Button>
              <img
                src={selectedImage || "/placeholder.svg"}
                alt="Imagen ampliada"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
