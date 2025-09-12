"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gift, Trophy, Star, Sparkles, Users, Crown } from "lucide-react"
import { createClient } from "@/lib/client"
import { useToast } from "@/hooks/use-toast"

interface Winner {
  id: string
  nombre: string
  apellido: string
  email: string
  premio: string
}

export function RaffleSection() {
  const [isAnimating, setIsAnimating] = useState(false)
  const [isSelecting, setIsSelecting] = useState(false)
  const [winners, setWinners] = useState<Winner[]>([])
  const [totalParticipants, setTotalParticipants] = useState(0)
  const { addToast } = useToast()

  const prizes = [
    {
      id: 1,
      title: "Bicicleta Mountain Bike",
      description: "Bicicleta profesional para montaña",
      icon: Trophy,
      color: "text-yellow-500",
    },
    {
      id: 2,
      title: "Kit de Accesorios",
      description: "Casco, luces LED y botella deportiva",
      icon: Gift,
      color: "text-blue-500",
    },
    {
      id: 3,
      title: "Voucher Deportivo",
      description: "Vale de $50.000 en tienda deportiva",
      icon: Star,
      color: "text-green-500",
    },
  ]

  useEffect(() => {
    fetchParticipantCount()
  }, [])

  const fetchParticipantCount = async () => {
    try {
      const supabase = createClient()
      const { count, error } = await supabase.from("registrations").select("*", { count: "exact", head: true })
      
      if (!error && count !== null) {
        setTotalParticipants(count)
      }
    } catch (error) {
      console.error("Error fetching participant count:", error)
    }
  }

  const handleParticipate = () => {
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 2000)
    // Scroll to registration
    document.getElementById("inscripcion")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSelectWinner = async () => {
    if (totalParticipants === 0) {
      addToast({
        title: "No hay participantes",
        description: "Primero necesitas que se inscriban personas al evento.",
        variant: "error",
      })
      return
    }

    setIsSelecting(true)
    
    try {
      const supabase = createClient()
      
      // Obtener todos los participantes
      const { data: participants, error } = await supabase
        .from("registrations")
        .select("id, nombre, apellido, email")
      
      if (error) {
        throw error
      }

      if (!participants || participants.length === 0) {
        addToast({
          title: "No hay participantes",
          description: "No se encontraron participantes para el sorteo.",
          variant: "error",
        })
        return
      }

      // Simular selección aleatoria
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const randomIndex = Math.floor(Math.random() * participants.length)
      const selectedParticipant = participants[randomIndex]
      const randomPrize = prizes[Math.floor(Math.random() * prizes.length)]
      
      const winner: Winner = {
        id: selectedParticipant.id,
        nombre: selectedParticipant.nombre,
        apellido: selectedParticipant.apellido,
        email: selectedParticipant.email,
        premio: randomPrize.title
      }

      // Guardar ganador en la base de datos
      const { error: insertError } = await supabase
        .from("raffle_winners")
        .insert([{
          registration_id: selectedParticipant.id,
          prize: randomPrize.title,
          created_at: new Date().toISOString()
        }])

      if (insertError) {
        console.error("Error saving winner:", insertError)
      }

      setWinners(prev => [winner, ...prev])
      
      addToast({
        title: "¡Ganador seleccionado!",
        description: `${winner.nombre} ${winner.apellido} ganó: ${winner.premio}`,
        variant: "success",
      })

    } catch (error) {
      console.error("Error selecting winner:", error)
      addToast({
        title: "Error",
        description: "Hubo un problema al seleccionar el ganador.",
        variant: "error",
      })
    } finally {
      setIsSelecting(false)
    }
  }

  return (
    <section id="sorteo" className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Gran Sorteo</h2>
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ¡Todos los participantes inscriptos participan automáticamente del sorteo de increíbles premios!
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-primary font-semibold">
            <Users className="w-5 h-5" />
            <span>{totalParticipants} participantes inscriptos</span>
          </div>
        </div>

        {/* Premios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {prizes.map((prize, index) => {
            const IconComponent = prize.icon
            return (
              <Card
                key={prize.id}
                className={`text-center hover:shadow-lg transition-all duration-300 ${
                  isAnimating ? "animate-bounce" : ""
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-full bg-muted">
                      <IconComponent className={`w-8 h-8 ${prize.color}`} />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{prize.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{prize.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Botones de acción */}
        <div className="text-center mb-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary/20">
              <div className="flex items-center gap-4 mb-4">
                <Gift className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="font-semibold text-lg">¿Cómo participar?</h3>
                  <p className="text-muted-foreground">
                    Solo inscribite al evento y automáticamente participás del sorteo
                  </p>
                </div>
              </div>
              <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={handleParticipate}>
                <Gift className="w-5 h-5 mr-2" />
                ¡Quiero Participar!
              </Button>
            </Card>

                  {/* Sorteo oculto - Solo visible cuando se decida activar */}
                  <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary/20 opacity-50">
                    <div className="flex items-center gap-4 mb-4">
                      <Crown className="w-6 h-6 text-yellow-500" />
                      <div>
                        <h3 className="font-semibold text-lg">Sorteo</h3>
                        <p className="text-muted-foreground">
                          El sorteo se realizará próximamente
                        </p>
                      </div>
                    </div>
                    <Button
                      size="lg"
                      className="bg-gray-400 text-white cursor-not-allowed"
                      disabled={true}
                    >
                      <Crown className="w-5 h-5 mr-2" />
                      Próximamente
                    </Button>
                  </Card>
          </div>
        </div>

        {/* Ganadores - Oculto hasta que se decida activar el sorteo */}
        {false && winners.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-center mb-8 text-primary">¡Ganadores!</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {winners.map((winner, index) => (
                <Card key={winner.id} className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">{winner.nombre} {winner.apellido}</h4>
                        <p className="text-sm text-muted-foreground">{winner.email}</p>
                        <p className="text-yellow-600 font-medium">🏆 {winner.premio}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            * El sorteo se realizará próximamente. Los ganadores serán contactados por email.
          </p>
        </div>
      </div>
    </section>
  )
}
