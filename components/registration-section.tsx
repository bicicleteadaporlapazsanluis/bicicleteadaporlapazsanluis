"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/lib/client";
import { registrationSchema, type RegistrationFormData } from "@/lib/validations";

export function RegistrationSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  // Función para formatear el número de teléfono
  const formatPhoneNumber = (value: string) => {
    // Remover todos los caracteres no numéricos
    const phoneNumber = value.replace(/\D/g, "");

    // Formatear como 266 XXX XXXX
    if (phoneNumber.length <= 3) {
      return phoneNumber;
    } else if (phoneNumber.length <= 6) {
      return phoneNumber.slice(0, 3) + " " + phoneNumber.slice(3);
    } else {
      return phoneNumber.slice(0, 3) + " " + phoneNumber.slice(3, 6) + " " + phoneNumber.slice(6, 10);
    }
  };

  // Función para manejar el cambio en el campo de teléfono
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setValue("telefono", formatted);
  };

  const phoneValue = watch("telefono");

  const onSubmit = async (data: RegistrationFormData) => {
    setIsLoading(true);

    try {
      const supabase = createClient();

      const { data: result, error } = await supabase.from("registrations").insert([data]).select();

      if (error) {
        if (error.code === "23505") {
          // Unique constraint violation
          addToast({
            title: "Error",
            description: "Este email ya está registrado. Por favor usa otro email.",
            variant: "error",
          });
        } else {
          throw error;
        }
        return;
      }

      // Enviar correo de confirmación
      try {
        const emailResponse = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            nombre: data.nombre,
            apellido: data.apellido,
          }),
        });

        if (!emailResponse.ok) {
          console.warn("Error enviando email, pero la inscripción fue exitosa");
        }
      } catch (emailError) {
        console.warn("Error enviando email:", emailError);
        // No mostramos error al usuario si falla el email, ya que la inscripción fue exitosa
      }

      setIsSubmitted(true);
      reset();
      addToast({
        title: "¡Inscripción exitosa!",
        description: "Te hemos enviado un correo de confirmación. ¡Te esperamos el domingo 5 de octubre!",
        variant: "success",
      });
    } catch (error) {
      console.error("Error al registrar:", error);
      addToast({
        title: "Error",
        description: "Hubo un problema al procesar tu inscripción. Intenta nuevamente.",
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <section
        id="registration"
        className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 relative overflow-hidden"
      >
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-green-400 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-blue-400 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-emerald-400 rounded-full animate-pulse delay-2000"></div>
          <div className="absolute bottom-32 right-1/3 w-14 h-14 bg-green-300 rounded-full animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="border-2 border-green-200 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
                  ¡Inscripción Exitosa!
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                  Gracias por sumarte a la <span className="font-bold text-green-600">Bicicleteada por la Paz</span>. Te
                  esperamos el <span className="font-bold text-blue-600">domingo 5 de octubre a las 9:00 hs</span>
                  en el Salón Malvinas Argentinas.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-2xl mx-auto">
                  <p className="text-green-800 font-semibold mb-2">📧 Confirmación por correo</p>
                  <p className="text-green-700">Recibirás más información detallada por correo electrónico.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="registration"
      className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 relative overflow-hidden"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-400 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-blue-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-emerald-400 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-32 right-1/3 w-14 h-14 bg-green-300 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 md:px-0 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <UserPlus className="w-4 h-4" />
              ¡Inscripción Abierta!
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text">
              Inscripción
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Sumate a la <span className="font-bold text-green-600">Bicicleteada por la Paz</span> y sé parte de esta
              iniciativa que une a toda la comunidad.
              <br className="hidden md:block" />
              <span className="text-green-700 font-semibold">¡Es completamente gratuito!</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Información destacada */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="border-green-200 bg-green-50/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Información del Evento
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-green-700">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span>
                        <strong>Fecha:</strong> Domingo 5 de octubre
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-green-700">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span>
                        <strong>Hora:</strong> 9:00 hs
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-green-700">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span>
                        <strong>Lugar:</strong> Salón Malvinas Argentinas
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-green-700">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span>
                        <strong>Costo:</strong> Gratuito
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    ¿Qué necesitás?
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-blue-700">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span>Bicicleta en buen estado</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-700">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span>Casco (obligatorio)</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-700">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span>Ropa cómoda</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-700">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span>Muchas ganas de participar</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Formulario */}
            <div className="lg:col-span-2">
              <Card className="border-2 border-green-200 bg-white/90 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <UserPlus className="w-6 h-6" />
                    </div>
                    Formulario de Inscripción
                  </CardTitle>
                  <p className="text-green-100 mt-2">Completá todos los campos para inscribirte</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2 pt-4">
                        <Label htmlFor="nombre">Nombre *</Label>
                        <Input
                          id="nombre"
                          placeholder="Tu nombre"
                          {...register("nombre")}
                          className={`${
                            errors.nombre
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                              : "focus:border-green-500 focus:ring-green-500"
                          }`}
                        />
                        {errors.nombre && (
                          <div className="flex items-center gap-1 mt-1">
                            <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                            <p className="text-sm text-red-500">{errors.nombre.message}</p>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="apellido">Apellido *</Label>
                        <Input
                          id="apellido"
                          placeholder="Tu apellido"
                          {...register("apellido")}
                          className={`${
                            errors.apellido
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                              : "focus:border-green-500 focus:ring-green-500"
                          }`}
                        />
                        {errors.apellido && (
                          <div className="flex items-center gap-1 mt-1">
                            <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                            <p className="text-sm text-red-500">{errors.apellido.message}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Correo electrónico *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        {...register("email")}
                        className={`${
                          errors.email
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : "focus:border-green-500 focus:ring-green-500"
                        }`}
                      />
                      {errors.email && (
                        <div className="flex items-center gap-1 mt-1">
                          <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                          <p className="text-sm text-red-500">{errors.email.message}</p>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="dni_pasaporte">DNI / Pasaporte *</Label>
                        <Input
                          id="dni_pasaporte"
                          placeholder="12345678"
                          {...register("dni_pasaporte")}
                          className={`${
                            errors.dni_pasaporte
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                              : "focus:border-green-500 focus:ring-green-500"
                          }`}
                        />
                        {errors.dni_pasaporte && (
                          <div className="flex items-center gap-1 mt-1">
                            <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                            <p className="text-sm text-red-500">{errors.dni_pasaporte.message}</p>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="telefono">Teléfono *</Label>
                        <Input
                          id="telefono"
                          placeholder="012 3456 789"
                          value={phoneValue || ""}
                          onChange={handlePhoneChange}
                          className={`${
                            errors.telefono
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                              : "focus:border-green-500 focus:ring-green-500"
                          }`}
                        />
                        {errors.telefono && (
                          <div className="flex items-center gap-1 mt-1">
                            <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                            <p className="text-sm text-red-500">{errors.telefono.message}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ciudad">Ciudad *</Label>
                      <Input
                        id="ciudad"
                        placeholder="Tu ciudad"
                        {...register("ciudad")}
                        className={`${
                          errors.ciudad
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : "focus:border-green-500 focus:ring-green-500"
                        }`}
                      />
                      {errors.ciudad && (
                        <div className="flex items-center gap-1 mt-1">
                          <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                          <p className="text-sm text-red-500">{errors.ciudad.message}</p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="organizacion_personal">Agrupación a la que corresponde o si es personal *</Label>
                      <Input
                        id="organizacion_personal"
                        placeholder="Ej: Club de ciclismo, Escuela, Personal, etc."
                        {...register("organizacion_personal")}
                        className={`${
                          errors.organizacion_personal
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : "focus:border-green-500 focus:ring-green-500"
                        }`}
                      />
                      {errors.organizacion_personal && (
                        <div className="flex items-center gap-1 mt-1">
                          <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                          <p className="text-sm text-red-500">{errors.organizacion_personal.message}</p>
                        </div>
                      )}
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white text-lg py-6 transition-all duration-300 transform hover:scale-105"
                        size="lg"
                        disabled={isLoading}
                      >
                        <UserPlus className="w-6 h-6 mr-3" />
                        {isLoading ? "Inscribiendo..." : "¡Inscribirme a la Bicicleteada!"}
                      </Button>

                      <p className="text-center text-sm text-muted-foreground mt-4">
                        Al inscribirte, aceptás recibir información sobre el evento por correo electrónico
                      </p>
                    </div>

                    {/* Resumen de validación */}
                    {Object.keys(errors).length > 0 && (
                      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <h4 className="font-semibold text-red-700">Por favor corrige los siguientes errores:</h4>
                        </div>
                        <ul className="text-sm text-red-600 space-y-1">
                          {Object.entries(errors).map(([field, error]) => (
                            <li key={field} className="flex items-center gap-2">
                              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                              <span className="capitalize">{field.replace("_", " ")}:</span>
                              <span>{error?.message}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
