# 📧 Configuración de Resend para Envío de Correos

## ¿Qué es Resend?

Resend es un servicio de envío de correos electrónicos moderno y confiable, perfecto para aplicaciones Next.js. Es muy fácil de configurar y tiene un plan gratuito generoso.

## 🚀 Pasos para Configurar Resend

### 1. Crear cuenta en Resend

1. Ve a [resend.com](https://resend.com)
2. Haz clic en "Sign Up" y crea tu cuenta
3. Verifica tu email

### 2. Obtener API Key

1. Una vez logueado, ve a [API Keys](https://resend.com/api-keys)
2. Haz clic en "Create API Key"
3. Dale un nombre (ej: "Bicicleteada por la Paz")
4. Copia la API key (empieza con `re_`)

### 3. Configurar dominio (Opcional pero recomendado)

1. Ve a [Domains](https://resend.com/domains)
2. Haz clic en "Add Domain"
3. Ingresa tu dominio: `bicicleteadaporlapazsanluis.com`
4. Sigue las instrucciones para verificar el dominio con DNS

### 4. Configurar variables de entorno

En tu archivo `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key

# Resend Configuration
RESEND_API_KEY=re_tu_api_key_aqui
```

### 5. Desplegar en Vercel

1. En el dashboard de Vercel, ve a tu proyecto
2. Ve a "Settings" > "Environment Variables"
3. Agrega:
   - `RESEND_API_KEY` = tu API key de Resend
   - `NEXT_PUBLIC_SUPABASE_URL` = tu URL de Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = tu clave anónima de Supabase

## 📧 Características del Email

El correo que se envía incluye:

- ✅ **Diseño responsive** y profesional
- ✅ **Información del evento** (fecha, hora, lugar)
- ✅ **Instrucciones importantes** (casco, agua, etc.)
- ✅ **Branding** de la Bicicleteada por la Paz
- ✅ **Mensaje motivacional** personalizado

## 🔧 Cómo Funciona

1. **Usuario se registra** en el formulario
2. **Se guarda en Supabase** la información
3. **Se envía automáticamente** un correo de confirmación
4. **Usuario recibe** el email con todos los detalles

## 📊 Límites del Plan Gratuito

- **3,000 emails por mes**
- **100 emails por día**
- **Soporte por email**

## 🚨 Troubleshooting

### Error: "Missing API key"
- Verifica que `RESEND_API_KEY` esté en tu `.env.local`
- Reinicia el servidor de desarrollo

### Error: "Domain not verified"
- Verifica tu dominio en Resend
- O usa el dominio por defecto de Resend

### Emails no llegan
- Revisa la carpeta de spam
- Verifica que el email esté bien escrito
- Revisa los logs en Vercel

## 💡 Tips

1. **Usa tu dominio** para mejor deliverability
2. **Prueba primero** con tu propio email
3. **Revisa los logs** en Resend para ver el estado de los envíos
4. **Configura SPF/DKIM** para mejor reputación

## 📞 Soporte

- [Documentación de Resend](https://resend.com/docs)
- [Discord de Resend](https://discord.gg/resend)
- [GitHub Issues](https://github.com/resend/resend/issues)
