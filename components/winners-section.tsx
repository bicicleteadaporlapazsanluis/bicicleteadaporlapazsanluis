"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Crown, Star, Gift, Sparkles, Users, Heart } from "lucide-react";
import { createClient } from "@/lib/client";
import { FadeIn } from "@/components/animations/fade-in";

interface Winner {
  id: string;
  registration_id: string;
  prize_name: string;
  drawn_at: string;
  registrations: {
    nombre: string;
    apellido: string;
    email: string;
    telefono?: string; // Opcional para compatibilidad
  };
}

export function WinnersSection() {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const supabase = createClient();

      // Obtener total de participantes
      const { count, error: countError } = await supabase
        .from("registrations")
        .select("*", { count: "exact", head: true });

      if (!countError && count !== null) {
        setTotalParticipants(count);
      }

      // Obtener ganadores
      const { data: winnersData, error: winnersError } = await supabase
        .from("raffle_winners")
        .select(
          `
          *,
          registrations (
            nombre,
            apellido,
            email
          )
        `
        )
        .order("drawn_at", { ascending: false });

      if (!winnersError && winnersData) {
        setWinners(winnersData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPrizeIcon = (prizeName: string) => {
    if (prizeName.toLowerCase().includes("bicicleta")) return Trophy;
    if (prizeName.toLowerCase().includes("kit")) return Gift;
    if (prizeName.toLowerCase().includes("voucher")) return Star;
    return Crown;
  };

  const getPrizeColor = (prizeName: string) => {
    if (prizeName.toLowerCase().includes("bicicleta")) return "text-yellow-500";
    if (prizeName.toLowerCase().includes("kit")) return "text-blue-500";
    if (prizeName.toLowerCase().includes("voucher")) return "text-green-500";
    return "text-purple-500";
  };

  return (
    <section id="ganadores" className="py-32 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <FadeIn delay={0.2}>
          {/* Mensaje de evento terminado */}
          <div className="max-w-4xl mx-auto mb-12">
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="flex flex-col md:flex-row items-center justify-center mb-4">
                  <Heart className="w-12 h-12 text-green-600 mr-3" />
                  <h3 className="text-3xl md:text-4xl font-bold text-green-700">¡Evento Finalizado!</h3>
                </div>
                <p className="text-lg text-green-600 font-medium mb-4">
                  Gracias a todos los que participaron de esta hermosa jornada por la paz.
                </p>
                {/* <div className="text-center">
                <Button 
                  size="lg" 
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold"
                  onClick={() => document.getElementById("ganadores")?.scrollIntoView({ behavior: "smooth" })}
                >
                  <Trophy className="w-6 h-6 mr-3" />
                  Ver Ganadores del Sorteo
                </Button>
              </div> */}
              </CardContent>
            </Card>
          </div>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <Trophy className="w-8 h-8 text-yellow-500" />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary">Ganadores del Sorteo</h2>
              <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <Trophy className="w-8 h-8 text-yellow-500" />
              </motion.div>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              ¡Felicitaciones a todos los ganadores de nuestro sorteo!
            </p>

            {/* Estadísticas del evento */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
              <motion.div
                className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-primary/20 shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-primary" />
                  <p className="text-2xl font-bold text-primary">{totalParticipants}</p>
                  <div>
                    <p className="text-sm text-muted-foreground">Participantes totales</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-yellow-200 shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center gap-3">
                  <Crown className="w-6 h-6 text-yellow-500" />
                  <p className="text-2xl font-bold text-yellow-600">{winners.length}</p>
                  <div>
                    <p className="text-sm text-muted-foreground">Ganadores</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </FadeIn>

        {isLoading ? (
          <div className="text-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
              <Sparkles className="w-8 h-8 text-primary" />
            </motion.div>
            <p className="mt-4 text-muted-foreground">Cargando ganadores...</p>
          </div>
        ) : winners.length === 0 ? (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-xl text-muted-foreground">Los ganadores serán anunciados próximamente</p>
          </div>
        ) : (
          <FadeIn delay={0.4}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {winners.map((winner, index) => {
                const IconComponent = getPrizeIcon(winner.prize_name);
                const iconColor = getPrizeColor(winner.prize_name);

                return (
                  <motion.div
                    key={winner.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 shadow-lg h-full">
                      <CardHeader className="text-center pb-4">
                        <div className="flex justify-center items-center gap-3 mb-3">
                          <div className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">
                            {index + 1}
                          </div>
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                          >
                            <IconComponent className={`w-8 h-8 ${iconColor}`} />
                          </motion.div>
                        </div>
                        <CardTitle className="text-xl font-bold text-gray-800">
                          {winner.registrations.nombre} {winner.registrations.apellido}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <div className="bg-white/80 rounded-lg p-4 mb-4">
                          <p className="text-lg font-semibold text-yellow-700 mb-2">🏆 {winner.prize_name}</p>
                          <p className="text-sm text-gray-600">
                            Sorteado el {new Date(winner.drawn_at).toLocaleDateString("es-AR")}
                          </p>
                        </div>
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                          className="text-2xl"
                        >
                          🎉
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </FadeIn>
        )}

        {winners.length > 0 && (
          <FadeIn delay={0.8}>
            <div className="text-center mt-12">
              <Card className="bg-gradient-to-r from-green-100 to-blue-100 border-2 border-green-200 max-w-2xl mx-auto">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Sparkles className="w-6 h-6 text-green-600" />
                    <h3 className="text-xl font-bold text-green-800">¡Gracias por participar!</h3>
                    <Sparkles className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-green-700">
                    Esperamos que hayan disfrutado de este hermoso evento por la paz. Los ganadores serán contactados a
                    la brevedad.
                  </p>
                </CardContent>
              </Card>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
