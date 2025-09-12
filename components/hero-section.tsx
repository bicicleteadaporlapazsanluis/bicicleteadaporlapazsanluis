"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Bike, Users, Heart, Calendar, MapPin, Menu, X } from "lucide-react"
import { createClient } from "@/lib/client"

export function HeroSection() {
  const [participantCount, setParticipantCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const fetchParticipantCount = async () => {
      try {
        const supabase = createClient()
        const { count, error } = await supabase.from("registrations").select("*", { count: "exact", head: true })

        if (error) {
          console.error("Error fetching participant count:", error)
          setParticipantCount(0)
        } else {
          setParticipantCount(count || 0)
        }
      } catch (error) {
        console.error("Error:", error)
        setParticipantCount(0)
      } finally {
        setIsLoading(false)
      }
    }

    fetchParticipantCount()

    const interval = setInterval(fetchParticipantCount, 30000)
    return () => clearInterval(interval)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const navItems = [
    { id: "acerca", label: "Acerca" },
    { id: "recorrido", label: "Recorrido" },
    { id: "galeria", label: "Galería" },
    { id: "inscripcion", label: "Inscripción" },
    { id: "sorteo", label: "Sorteo" },
  ]

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-green-50 via-blue-50 to-green-100"
    >
      <nav className="relative z-50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 pt-4">
            <div className="flex items-center space-x-2">
              <Bike className="h-8 w-8 text-green-600" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm font-medium transition-colors hover:text-green-600 text-gray-700 hover:bg-white/20 px-3 py-2 rounded-lg"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:bg-white/20"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white/90 backdrop-blur-sm rounded-lg mt-2 border border-green-100">
                <div className="px-3 py-2 border-b border-green-200 mb-2">
                  <div className="flex items-center space-x-2">
                    <Bike className="h-6 w-6 text-green-600" />
                    <span className="text-lg font-bold text-green-800">Bicicleteada por la Paz</span>
                  </div>
                </div>
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left px-3 py-2 text-base font-medium transition-colors hover:text-green-600 hover:bg-green-50 rounded-md text-gray-700"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-4 md:left-10 animate-pulse">
            <Calendar className="w-12 h-12 md:w-16 md:h-16 text-green-600 drop-shadow-lg" />
          </div>
          <div className="absolute top-32 right-4 md:right-20 animate-pulse">
            <Heart className="w-10 h-10 md:w-12 md:h-12 text-red-400 drop-shadow-lg" />
          </div>
          <div className="absolute bottom-40 left-1/4 animate-bounce delay-1000">
            <Users className="w-12 h-12 md:w-14 md:h-14 text-blue-500 drop-shadow-lg" />
          </div>
          <div className="absolute top-1/3 right-1/3 animate-pulse delay-500">
            <Calendar className="w-8 h-8 md:w-10 md:h-10 text-orange-400 drop-shadow-lg" />
          </div>
          <div className="absolute bottom-1/4 right-10 animate-bounce delay-700">
            <MapPin className="w-10 h-10 md:w-12 md:h-12 text-purple-500 drop-shadow-lg" />
          </div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-green-800 mb-4 drop-shadow-lg">
                Bicicleteada por la Paz
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-medium mb-2">San Luis 2024</p>
              <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"></div>
            </div>

            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Heart className="w-4 h-4" />
                Evento por la Paz y la Convivencia
              </div>

              <div className="text-2xl sm:text-3xl md:text-4xl text-gray-800 mb-6 space-y-3">
                <div className="flex items-center justify-center gap-3 text-green-700">
                  <Calendar className="w-6 h-6 md:w-8 md:h-8" />
                  <span className="font-bold">
                    Domingo <span className="text-3xl sm:text-4xl md:text-5xl">5</span> de octubre
                  </span>
                </div>
                <div className="flex items-center justify-center gap-3 text-blue-700">
                  <span className="text-xl sm:text-2xl md:text-3xl font-semibold">9:00 hs</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-gray-700">
                  <MapPin className="w-6 h-6 md:w-8 md:h-8" />
                  <span className="text-xl sm:text-2xl md:text-3xl">San Luis, Argentina</span>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 md:p-8 mb-8 inline-block border border-green-200 shadow-xl">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-green-700">
                <Users className="w-6 h-6 md:w-8 md:h-8" />
                <span className="text-2xl md:text-3xl font-bold">{isLoading ? "..." : participantCount}</span>
                <span className="text-base md:text-xl text-center sm:text-left">
                  {participantCount === 1 ? "persona ya inscripta" : "personas ya inscriptas"}
                </span>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                size="lg"
                className="text-lg md:text-xl px-8 md:px-12 py-6 md:py-8 bg-green-600 hover:bg-green-700 shadow-xl w-full sm:w-auto text-white font-semibold rounded-xl"
                onClick={() => scrollToSection("inscripcion")}
              >
                <Bike className="w-5 h-5 md:w-6 md:h-6 mr-3" />
                ¡Inscribite Gratis!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
