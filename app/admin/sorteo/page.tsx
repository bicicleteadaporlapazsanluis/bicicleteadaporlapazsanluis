"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gift, Trophy, Star, Crown, Users, Lock, RefreshCw, Download, Sparkles, Zap } from "lucide-react";
import { createClient } from "@/lib/client";
import { useToast } from "@/hooks/use-toast";

interface Winner {
  id: string;
  registration_id: string;
  winner_number?: number; // Opcional hasta migrar BD
  prize_name?: string; // Campo actual en BD
  drawn_at: string;
  registrations: {
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    created_at: string;
  };
}

interface Registration {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  created_at: string;
}

export default function SorteoPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectingPrizeId, setSelectingPrizeId] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [winners, setWinners] = useState<Winner[]>([]);
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [animatingNames, setAnimatingNames] = useState<string[]>([]);
  const [currentAnimatingName, setCurrentAnimatingName] = useState("");
  const confettiRef = useRef<HTMLDivElement>(null);
  const { addToast } = useToast();

  // Estado para contar ganadores
  const [nextWinnerNumber, setNextWinnerNumber] = useState(1);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // Agregar estilos CSS para confeti
    const style = document.createElement("style");
    style.textContent = `
      @keyframes confetti-fall {
        0% {
          transform: translateY(-100vh) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) rotate(720deg);
          opacity: 0;
        }
      }
      
      @keyframes pulse-glow {
        0%, 100% {
          box-shadow: 0 0 20px #FFD700;
        }
        50% {
          box-shadow: 0 0 40px #FFD700, 0 0 60px #FFD700;
        }
      }
      
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }
      
      .selecting-animation {
        animation: pulse-glow 1s infinite, shake 0.5s infinite;
      }
      
      .celebration-text {
        animation: pulse-glow 2s infinite;
        background: linear-gradient(45deg, #FFD700, #FF6B6B, #4ECDC4, #FFD700);
        background-size: 300% 300%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-weight: 900;
        text-align: center;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        letter-spacing: 2px;
      }
      
      .winner-text-large {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-weight: 900;
        letter-spacing: 1px;
        line-height: 1.1;
        text-shadow: 3px 3px 6px rgba(0,0,0,0.2);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const createConfetti = () => {
    const colors = ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8"];

    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti-piece";
      confetti.style.cssText = `
        position: fixed;
        width: ${Math.random() * 10 + 5}px;
        height: ${Math.random() * 10 + 5}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        left: ${Math.random() * 100}vw;
        top: -10px;
        z-index: 9999;
        border-radius: ${Math.random() > 0.5 ? "50%" : "0"};
        animation: confetti-fall ${Math.random() * 3 + 2}s linear forwards;
        transform: rotate(${Math.random() * 360}deg);
      `;

      document.body.appendChild(confetti);

      setTimeout(() => {
        confetti.remove();
      }, 5000);
    }
  };

  const handleLogin = () => {
    if (password === "deadlinesorteo2025") {
      setIsAuthenticated(true);
      addToast({
        title: "Acceso concedido",
        description: "Bienvenido al panel de sorteo",
        variant: "success",
      });
    } else {
      addToast({
        title: "Contraseña incorrecta",
        description: "Por favor, verifica la contraseña",
        variant: "error",
      });
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();

      // Obtener total de participantes
      const { count, error: countError } = await supabase
        .from("registrations")
        .select("*", { count: "exact", head: true });

      if (!countError && count !== null) {
        setTotalParticipants(count);
      }

      // Obtener ganadores existentes
      const { data: winnersData, error: winnersError } = await supabase
        .from("raffle_winners")
        .select(
          `
          *,
          registrations (
            nombre,
            apellido,
            email,
            telefono,
            created_at
          )
        `
        )
        .order("drawn_at", { ascending: false });

      if (!winnersError && winnersData) {
        setWinners(winnersData);
        // Establecer el próximo número de ganador basado en la cantidad total + 1
        setNextWinnerNumber(winnersData.length + 1);
        console.log('Ganadores existentes:', winnersData.length, 'Próximo número:', winnersData.length + 1);
      }


    } catch (error) {
      console.error("Error fetching data:", error);
      addToast({
        title: "Error",
        description: "No se pudieron cargar los datos",
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectWinner = async () => {
    if (totalParticipants === 0) {
      addToast({
        title: "No hay participantes",
        description: "Primero necesitas que se inscriban personas al evento.",
        variant: "error",
      });
      return;
    }

    // Limpiar ganador anterior al iniciar nuevo sorteo
    setCurrentAnimatingName("");
    setShowConfetti(false);
    
    setIsSelecting(true);
    setSelectingPrizeId(nextWinnerNumber);

    try {
      const supabase = createClient();

      // Obtener todos los participantes
      const { data: allParticipants, error } = await supabase
        .from("registrations")
        .select("id, nombre, apellido, email, telefono, created_at");

      if (error) {
        throw error;
      }

      // Filtrar participantes que no hayan ganado aún
      const winnerIds = winners.map((w) => w.registration_id);
      const participants = allParticipants?.filter((p) => !winnerIds.includes(p.id)) || [];

      if (!participants || participants.length === 0) {
        addToast({
          title: "No hay más participantes",
          description: "Todos los participantes ya han ganado un premio.",
          variant: "error",
        });
        setIsSelecting(false);
        setSelectingPrizeId(null);
        return;
      }

      // Crear lista de nombres para animación
      const namesList = participants.map((p) => `${p.nombre} ${p.apellido}`);
      setAnimatingNames(namesList);

      // Animación de nombres rotando (más rápida)
      const animationDuration = 2000; // Reducido de 4000 a 2000ms
      const intervalTime = 100; // Más rápido: de 150 a 100ms
      const totalSteps = animationDuration / intervalTime;
      let currentStep = 0;

      const nameAnimation = setInterval(() => {
        const randomName = namesList[Math.floor(Math.random() * namesList.length)];
        setCurrentAnimatingName(`🎲 ${randomName} 🎲`);
        currentStep++;

        if (currentStep >= totalSteps) {
          clearInterval(nameAnimation);
        }
      }, intervalTime);

      // Esperar animación completa (más corta)
      await new Promise((resolve) => setTimeout(resolve, animationDuration));

      const randomIndex = Math.floor(Math.random() * participants.length);
      const selectedParticipant = participants[randomIndex];

      // MOSTRAR GANADOR INMEDIATAMENTE
      setCurrentAnimatingName(`🏆 ${selectedParticipant.nombre} ${selectedParticipant.apellido} 🏆`);
      setShowConfetti(true);
      createConfetti();

      // Guardar ganador en la base de datos (usando solo campos existentes)
      console.log('Insertando ganador:', {
        registration_id: selectedParticipant.id,
        prize_name: `Ganador #${nextWinnerNumber}`
      });

      const { data: insertData, error: insertError } = await supabase.from("raffle_winners").insert([
        {
          registration_id: selectedParticipant.id,
          prize_name: `Ganador #${nextWinnerNumber}`,
          drawn_at: new Date().toISOString(),
        },
      ]).select();

      if (insertError) {
        console.error('Error de inserción:', insertError);
        throw new Error(`Error al guardar ganador: ${insertError.message}`);
      }

      console.log('Ganador insertado exitosamente:', insertData);

      // Crear objeto del nuevo ganador para la UI
      const newWinner: Winner = {
        id: crypto.randomUUID(),
        registration_id: selectedParticipant.id,
        winner_number: nextWinnerNumber, // Para la UI
        prize_name: `Ganador #${nextWinnerNumber}`, // Campo actual de BD
        drawn_at: new Date().toISOString(),
        registrations: {
          nombre: selectedParticipant.nombre,
          apellido: selectedParticipant.apellido,
          email: selectedParticipant.email,
          telefono: selectedParticipant.telefono,
          created_at: selectedParticipant.created_at,
        },
      };

      setWinners((prev) => [newWinner, ...prev]);

      // Limpiar animaciones (ganador ya mostrado arriba)
      setAnimatingNames([]);

      // Incrementar el número del próximo ganador
      setNextWinnerNumber(prev => prev + 1);

      addToast({
        title: "🎉 ¡GANADOR SELECCIONADO! 🎉",
        description: `${selectedParticipant.nombre} ${selectedParticipant.apellido} es el ganador #${nextWinnerNumber}`,
        variant: "success",
      });

      // Limpiar solo el confeti después de 5 segundos (el nombre se queda)
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    } catch (error) {
      console.error("Error completo al seleccionar ganador:", error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      addToast({
        title: "Error al seleccionar ganador",
        description: `Detalle: ${errorMessage}`,
        variant: "error",
      });
    } finally {
      setIsSelecting(false);
      setSelectingPrizeId(null);
    }
  };

  const exportWinners = () => {
    if (winners.length === 0) {
      addToast({
        title: "No hay ganadores",
        description: "Primero debes realizar algunos sorteos.",
        variant: "error",
      });
      return;
    }

    const csvContent = [
      ["Número de Ganador", "Nombre", "Apellido", "Email", "Teléfono", "Fecha de Inscripción", "Fecha del Sorteo"],
      ...winners.map((winner, index) => {
        // Extraer número del winner_number o del prize_name, o usar index + 1 como fallback
        const winnerNum = winner.winner_number || 
          (winner.prize_name?.match(/#(\d+)/) ? parseInt(winner.prize_name.match(/#(\d+)/)![1]) : index + 1);
        
        return [
          winnerNum,
          winner.registrations.nombre,
          winner.registrations.apellido,
          winner.registrations.email,
          winner.registrations.telefono,
          new Date(winner.registrations.created_at).toLocaleDateString(),
          new Date(winner.drawn_at).toLocaleDateString(),
        ];
      }),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ganadores-sorteo-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Lock className="w-12 h-12 text-primary" />
            </div>
            <CardTitle className="text-2xl">Panel de Sorteo</CardTitle>
            <p className="text-muted-foreground">Ingresa la contraseña para acceder al sorteo</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Ingresa la contraseña"
              />
            </div>
            <Button className="w-full" onClick={handleLogin} disabled={!password}>
              Acceder
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Cargando datos del sorteo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Crown className="w-8 h-8 text-yellow-500 animate-pulse" />
            <h1 className="text-3xl md:text-4xl font-bold text-primary">Panel de Sorteo</h1>
            <Crown className="w-8 h-8 text-yellow-500 animate-pulse" />
          </div>
          <p className="text-lg text-muted-foreground">Bicicleteada por la Paz - San Luis</p>
          <div className="mt-4 flex items-center justify-center gap-4 text-primary font-semibold">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>{totalParticipants} participantes inscriptos</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              <span>{winners.length} ganadores</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center mb-8">
          <Button onClick={() => fetchData()} disabled={isLoading} variant="outline" className="mr-4">
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualizar
          </Button>
          <Button onClick={exportWinners} disabled={winners.length === 0} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar Ganadores
          </Button>
        </div>

        {/* Sorteo Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <Card className={`text-center transition-all duration-300 ${
            isSelecting
              ? "selecting-animation bg-yellow-50 border-yellow-300"
              : "bg-white hover:shadow-lg"
          }`}>
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className={`p-6 rounded-full ${
                  isSelecting ? "bg-yellow-200" : "bg-gradient-to-r from-yellow-400 to-orange-500"
                }`}>
                  <Trophy className={`w-12 h-12 text-white ${isSelecting ? "animate-pulse" : ""}`} />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                Sorteo de Ganadores
              </CardTitle>
              <div className="text-lg text-muted-foreground mt-2">
                Próximo ganador: <span className="font-bold text-yellow-600">#{nextWinnerNumber}</span>
              </div>
            </CardHeader>
            <CardContent className="pb-8">
              <div className="mb-6">
                <p className="text-muted-foreground mb-2">
                  Participantes disponibles: <span className="font-semibold">{totalParticipants - winners.length}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Ganadores seleccionados: <span className="font-semibold text-green-600">{winners.length}</span>
                </p>
              </div>
              <Button
                onClick={handleSelectWinner}
                disabled={isSelecting || (totalParticipants - winners.length) === 0}
                size="lg"
                className={`${
                  isSelecting 
                    ? "bg-yellow-600 animate-pulse" 
                    : "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                } text-white px-8 py-4 text-lg font-semibold`}
              >
                {isSelecting ? (
                  <>
                    <Zap className="w-5 h-5 mr-2 animate-spin" />
                    Sorteando Ganador...
                  </>
                ) : (
                  <>
                    <Crown className="w-5 h-5 mr-2" />
                    Sortear Próximo Ganador
                  </>
                )}
              </Button>
              {(totalParticipants - winners.length) === 0 && totalParticipants > 0 && (
                <p className="text-orange-600 font-semibold mt-4">
                  🎆 ¡Todos los participantes ya han sido sorteados!
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Animación de nombres durante sorteo */}
        {isSelecting && currentAnimatingName && (
          <div className="mb-8">
            <Card className="bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-300">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Sparkles className="w-8 h-8 text-yellow-600 animate-spin" />
                  <h3 className="text-2xl font-bold text-yellow-700">¡Sorteando!</h3>
                  <Sparkles className="w-8 h-8 text-yellow-600 animate-spin" />
                </div>
                <div className="celebration-text text-6xl font-bold mb-4">{currentAnimatingName}</div>
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Mostrar ganador (persiste hasta el próximo sorteo) */}
        {currentAnimatingName && !isSelecting && (
          <div className="mb-8">
            <Card className={`transition-all duration-500 ${
              showConfetti 
                ? "bg-gradient-to-r from-green-100 to-emerald-100 border-green-300 shadow-2xl"
                : "bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-300 shadow-lg"
            }`}>
              <CardContent className="p-12 text-center">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <Trophy className={`w-16 h-16 text-yellow-500 ${
                    showConfetti ? "animate-bounce" : "animate-pulse"
                  }`} />
                  <h3 className={`text-5xl font-bold ${
                    showConfetti ? "text-green-700" : "text-yellow-700"
                  }`}>¡GANADOR!</h3>
                  <Trophy className={`w-16 h-16 text-yellow-500 ${
                    showConfetti ? "animate-bounce" : "animate-pulse"
                  }`} />
                </div>
                <div className={`winner-text-large mb-4 ${
                  showConfetti 
                    ? "celebration-text text-xl md:text-7xl" 
                    : "text-7xl md:text-7xl text-yellow-600"
                }`}>
                  {currentAnimatingName}
                </div>
                {!showConfetti && (
                  <p className="text-xl text-yellow-600 font-semibold mt-4">
                    🎉 ¡Felicitaciones! 🎉
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Winners Section */}
        {winners.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-500" />
                Ganadores del Sorteo ({winners.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {winners.map((winner, index) => {
                  // Extraer número del winner_number o del prize_name, o usar index + 1 como fallback
                  const winnerNum = winner.winner_number || 
                    (winner.prize_name?.match(/#(\d+)/) ? parseInt(winner.prize_name.match(/#(\d+)/)![1]) : index + 1);
                  
                  return (
                    <Card key={winner.id} className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-yellow-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm">
                            #{winnerNum}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg">
                              {winner.registrations.nombre} {winner.registrations.apellido}
                            </h4>
                            <p className="text-yellow-600 font-medium">Ganador #{winnerNum}</p>
                            <p className="text-xs text-gray-500">{new Date(winner.drawn_at).toLocaleString()}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        {/* <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-2 text-blue-800">Instrucciones:</h3>
            <ul className="space-y-1 text-blue-700">
              <li>• Haz clic en "Sortear Este Premio" para cada premio que quieras sortear</li>
              <li>• Los participantes que ya ganaron no pueden ganar otro premio</li>
              <li>• Los resultados se guardan automáticamente en la base de datos</li>
              <li>• Puedes exportar la lista de ganadores en formato CSV</li>
              <li>• Usa "Actualizar" para refrescar los datos</li>
            </ul>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}
