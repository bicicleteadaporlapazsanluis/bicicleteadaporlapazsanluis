"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserPlus, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/client"
import { registrationSchema, type RegistrationFormData } from "@/lib/validations"

export function RegistrationSection() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { addToast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  })

  // Función para formatear el número de teléfono
  const formatPhoneNumber = (value: string) => {
    // Remover todos los caracteres no numéricos
    const phoneNumber = value.replace(/\D/g, '')
    
    // Formatear como 266 XXX XXXX
    if (phoneNumber.length <= 3) {
      return phoneNumber
    } else if (phoneNumber.length <= 6) {
      return phoneNumber.slice(0, 3) + ' ' + phoneNumber.slice(3)
    } else {
      return phoneNumber.slice(0, 3) + ' ' + phoneNumber.slice(3, 6) + ' ' + phoneNumber.slice(6, 10)
    }
  }

  // Función para manejar el cambio en el campo de teléfono
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setValue('telefono', formatted)
  }

  const phoneValue = watch('telefono')

  const onSubmit = async (data: RegistrationFormData) => {
    setIsLoading(true)

    try {
      const supabase = createClient()

      const { data: result, error } = await supabase.from("registrations").insert([data]).select()

      if (error) {
        if (error.code === "23505") {
          // Unique constraint violation
          addToast({
            title: "Error",
            description: "Este email ya está registrado. Por favor usa otro email.",
            variant: "error",
          })
        } else {
          throw error
        }
        return
      }

      // Enviar correo de confirmación
      try {
        const emailResponse = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: data.email,
            nombre: data.nombre,
            apellido: data.apellido,
          }),
        })

        if (!emailResponse.ok) {
          console.warn('Error enviando email, pero la inscripción fue exitosa')
        }
      } catch (emailError) {
        console.warn('Error enviando email:', emailError)
        // No mostramos error al usuario si falla el email, ya que la inscripción fue exitosa
      }

      setIsSubmitted(true)
      reset()
      addToast({
        title: "¡Inscripción exitosa!",
        description: "Te hemos enviado un correo de confirmación. ¡Te esperamos el domingo 5 de octubre!",
        variant: "success",
      })
    } catch (error) {
      console.error("Error al registrar:", error)
      addToast({
        title: "Error",
        description: "Hubo un problema al procesar tu inscripción. Intenta nuevamente.",
        variant: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <section id="registration" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="border-primary/20 bg-primary/5 backdrop-blur-sm">
              <CardContent className="p-12">
                <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-primary mb-4">¡Inscripción Exitosa!</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Gracias por sumarte a la Bicicleteada por la Paz. Te esperamos el domingo 5 de octubre a las 9:00 hs
                  en el Salón Malvinas Argentinas.
                </p>
                <p className="text-sm text-muted-foreground">Recibirás más información por correo electrónico.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="registration" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Inscripción</h2>
            <p className="text-lg text-muted-foreground">
              Completá el formulario para participar de la Bicicleteada por la Paz
            </p>
          </div>

          <Card className="border-border bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <UserPlus className="w-6 h-6" />
                Formulario de Inscripción
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre *</Label>
                    <Input
                      id="nombre"
                      placeholder="Tu nombre"
                      {...register("nombre")}
                      className={`${errors.nombre ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "focus:border-green-500 focus:ring-green-500"}`}
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
                      className={`${errors.apellido ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "focus:border-green-500 focus:ring-green-500"}`}
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
                    className={`${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "focus:border-green-500 focus:ring-green-500"}`}
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
                      className={`${errors.dni_pasaporte ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "focus:border-green-500 focus:ring-green-500"}`}
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
                      value={phoneValue || ''}
                      onChange={handlePhoneChange}
                      className={`${errors.telefono ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "focus:border-green-500 focus:ring-green-500"}`}
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
                    className={`${errors.ciudad ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "focus:border-green-500 focus:ring-green-500"}`}
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
                    className={`${errors.organizacion_personal ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "focus:border-green-500 focus:ring-green-500"}`}
                  />
                  {errors.organizacion_personal && (
                    <div className="flex items-center gap-1 mt-1">
                      <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                      <p className="text-sm text-red-500">{errors.organizacion_personal.message}</p>
                    </div>
                  )}
                </div>

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white" size="lg" disabled={isLoading}>
                  <UserPlus className="w-5 h-5 mr-2" />
                  {isLoading ? "Inscribiendo..." : "Inscribirme a la Bicicleteada"}
                </Button>

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
                          <span className="capitalize">{field.replace('_', ' ')}:</span>
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
    </section>
  )
}
