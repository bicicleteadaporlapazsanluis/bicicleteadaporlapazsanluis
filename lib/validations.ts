import { z } from "zod"

export const registrationSchema = z.object({
  email: z
    .string()
    .min(1, "El email es obligatorio")
    .email("Ingresa un email válido")
    .max(255, "El email es demasiado largo")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Formato de email inválido"),
  
  nombre: z
    .string()
    .min(1, "El nombre es obligatorio")
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre es demasiado largo")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El nombre solo puede contener letras y espacios"),
  
  apellido: z
    .string()
    .min(1, "El apellido es obligatorio")
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(50, "El apellido es demasiado largo")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El apellido solo puede contener letras y espacios"),
  
  dni_pasaporte: z
    .string()
    .min(1, "El DNI/Pasaporte es obligatorio")
    .min(6, "El DNI/Pasaporte debe tener al menos 6 caracteres")
    .max(20, "El DNI/Pasaporte es demasiado largo")
    .regex(/^[0-9a-zA-Z]+$/, "El DNI/Pasaporte solo puede contener números y letras"),
  
  ciudad: z
    .string()
    .min(1, "La ciudad es obligatoria")
    .min(2, "La ciudad debe tener al menos 2 caracteres")
    .max(100, "La ciudad es demasiado larga")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "La ciudad solo puede contener letras y espacios"),
  
  telefono: z
    .string()
    .min(1, "El teléfono es obligatorio")
    .min(8, "El teléfono debe tener al menos 8 caracteres")
    .max(20, "El teléfono es demasiado largo")
    .regex(/^[0-9\s]+$/, "El teléfono solo puede contener números y espacios")
    .refine((val) => {
      const digits = val.replace(/\s/g, '')
      return digits.length >= 8 && digits.length <= 10
    }, "El teléfono debe tener entre 8 y 10 dígitos")
    ,
  
  organizacion_personal: z
    .string()
    .min(1, "La organización es obligatoria")
    .min(2, "La organización debe tener al menos 2 caracteres")
    .max(200, "La organización es demasiado larga")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\.,\-]+$/, "La organización contiene caracteres no válidos"),
})

export type RegistrationFormData = z.infer<typeof registrationSchema>
