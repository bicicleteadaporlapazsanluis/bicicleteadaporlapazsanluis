"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users, Heart, Calendar, MapPin } from "lucide-react";
import { createClient } from "@/lib/client";
import { FadeIn } from "@/components/animations/fade-in";
import Image from "next/image";

export function HeroSection() {
  const [participantCount, setParticipantCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchParticipantCount = async () => {
      try {
        const supabase = createClient();
        const { count, error } = await supabase.from("registrations").select("*", { count: "exact", head: true });

        if (error) {
          console.error("Error fetching participant count:", error);
          setParticipantCount(0);
        } else {
          setParticipantCount(count || 0);
        }
      } catch (error) {
        console.error("Error:", error);
        setParticipantCount(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchParticipantCount();

    const interval = setInterval(fetchParticipantCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-green-50 via-blue-50 to-green-100"
    >
      <div className="flex-1 flex items-center justify-center pt-24 md:py-20 lg:py-32">
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute top-20 left-4 md:left-10"
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          >
            <Calendar className="w-12 h-12 md:w-16 md:h-16 text-green-600 drop-shadow-lg" />
          </motion.div>

          <motion.div
            className="absolute top-32 right-4 md:right-20"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          >
            <Heart className="w-10 h-10 md:w-12 md:h-12 text-red-400 drop-shadow-lg" />
          </motion.div>

          <motion.div
            className="absolute bottom-40 left-1/4"
            animate={{
              y: [0, -30, 0],
              x: [0, 10, -10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatDelay: 1.5,
            }}
          >
            <Users className="w-12 h-12 md:w-14 md:h-14 text-blue-500 drop-shadow-lg" />
          </motion.div>

          <motion.div
            className="absolute top-1/3 right-1/3"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          >
            <Calendar className="w-8 h-8 md:w-10 md:h-10 text-orange-400 drop-shadow-lg" />
          </motion.div>

          <motion.div
            className="absolute bottom-1/4 right-10"
            animate={{
              y: [0, -25, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatDelay: 0.5,
            }}
          >
            <MapPin className="w-10 h-10 md:w-12 md:h-12 text-purple-500 drop-shadow-lg" />
          </motion.div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10 w-full">
          <div className="max-w-4xl mx-auto space-y-12 md:space-y-12">
            <FadeIn delay={0.2} direction="up">
              <div className="mb-8 md:mb-12">
                <motion.h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-green-800 mb-4 drop-shadow-lg"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  Bicicleteada por la Paz
                </motion.h1>
                <motion.p
                  className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-medium mb-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  San Luis 2025
                </motion.p>
                <motion.div
                  className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: 96 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                />
              </div>
            </FadeIn>

            <FadeIn delay={0.6} direction="up">
              <div className="mb-6 md:mb-8">
                <motion.div
                  className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                    <Heart className="w-4 h-4" />
                  </motion.div>
                  Evento por la Paz y la Convivencia
                </motion.div>

                <div className="text-2xl sm:text-3xl md:text-4xl text-gray-800 mb-6 space-y-3">
                  <motion.div
                    className="flex items-center justify-center gap-3 text-green-700"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.6 }}
                  >
                    <Calendar className="w-6 h-6 md:w-8 md:h-8" />
                    <span className="font-bold">
                      Domingo{" "}
                      <motion.span
                        className="text-3xl sm:text-4xl md:text-5xl inline-block"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        5
                      </motion.span>{" "}
                      de octubre
                    </span>
                  </motion.div>
                  <motion.div
                    className="flex items-center justify-center gap-3 text-blue-700"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                  >
                    <span className="text-xl sm:text-2xl md:text-3xl font-semibold">9:00 hs</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center justify-center gap-3 text-gray-700"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                  >
                    <MapPin className="w-6 h-6 md:w-8 md:h-8" />
                    <span className="text-xl sm:text-2xl md:text-3xl">San Luis, Argentina</span>
                  </motion.div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={1} direction="up">
              <motion.div
                className="bg-white/90 backdrop-blur-sm rounded-xl p-4 md:p-8 mb-6 md:mb-8 inline-block border border-green-200 shadow-xl"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex flex-row items-center justify-center gap-2 sm:gap-3 text-green-700">
                  <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                    <Users className="w-6 h-6 md:w-8 md:h-8" />
                  </motion.div>
                  <motion.span
                    className="text-2xl md:text-3xl font-bold"
                    key={participantCount}
                    initial={{ scale: 1.2, color: "#16a34a" }}
                    animate={{ scale: 1, color: "#15803d" }}
                    transition={{ duration: 0.3 }}
                  >
                    {isLoading ? "..." : participantCount}
                  </motion.span>
                  <span className="text-base md:text-xl text-center sm:text-left">
                    {participantCount === 1 ? "persona ya inscripta" : "personas ya inscriptas"}
                  </span>
                </div>
              </motion.div>
              <div className="flex justify-center">
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="text-lg md:text-xl px-8 md:px-12 py-6 md:py-8 bg-green-600 hover:bg-green-700 shadow-xl w-full sm:w-auto text-white font-semibold rounded-xl flex items-center justify-center gap-4"
                    onClick={() => scrollToSection("inscripcion")}
                  >
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="flex-shrink-0"
                    >
                      <Image
                        src="/ciclista.svg"
                        alt="Bicicleta"
                        width={20}
                        height={20}
                        className="w-6 h-6 md:w-8 md:h-8 brightness-0 invert"
                      />
                    </motion.div>
                    <span>¡Inscribite Gratis!</span>
                  </Button>
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
