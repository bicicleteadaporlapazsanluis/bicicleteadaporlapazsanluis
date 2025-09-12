# 🚀 Guía de Despliegue - Bicicleteada por la Paz

## 📋 Checklist Pre-Despliegue

### ✅ 1. Configurar GitHub
- [ ] Crear repositorio en GitHub
- [ ] Subir código al repositorio
- [ ] Configurar branch principal (main/master)

### ✅ 2. Configurar Supabase
- [ ] Crear proyecto en Supabase
- [ ] Ejecutar scripts SQL (ver `SUPABASE_SETUP.md`)
- [ ] Obtener URL y API Key
- [ ] Configurar RLS (Row Level Security)

### ✅ 3. Configurar Resend
- [ ] Crear cuenta en Resend
- [ ] Obtener API Key
- [ ] Verificar dominio (opcional pero recomendado)
- [ ] Configurar DNS si es necesario

### ✅ 4. Configurar Vercel
- [ ] Conectar repositorio de GitHub
- [ ] Configurar variables de entorno
- [ ] Configurar dominio personalizado
- [ ] Configurar build settings

## 🔧 Variables de Entorno en Vercel

Configura estas variables en el dashboard de Vercel:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key

# Resend
RESEND_API_KEY=re_tu_api_key_aqui
```

## 🌐 Configuración del Dominio

### 1. En Vercel:
- Ve a tu proyecto
- Settings > Domains
- Agrega: `bicicleteadaporlapazsanluis.com`
- Configura DNS según las instrucciones

### 2. En tu proveedor de DNS:
- Agrega el registro CNAME que te proporcione Vercel
- Espera la propagación (puede tomar hasta 24 horas)

## 📧 Configuración de Email

### 1. Verificar dominio en Resend:
- Ve a [resend.com/domains](https://resend.com/domains)
- Agrega tu dominio
- Configura los registros DNS necesarios

### 2. Configurar SPF/DKIM:
- Sigue las instrucciones de Resend
- Esto mejora la deliverability

## 🧪 Testing Post-Despliegue

### ✅ Funcionalidades a Probar:
- [ ] **Registro de usuarios** - Formulario funciona
- [ ] **Envío de emails** - Se reciben correos de confirmación
- [ ] **Contador de participantes** - Se actualiza en tiempo real
- [ ] **Responsive design** - Funciona en móviles
- [ ] **Navegación** - Todos los enlaces funcionan
- [ ] **Mapa del recorrido** - Se abre correctamente
- [ ] **Admin panel** - Acceso a `/admin`

### ✅ URLs a Verificar:
- [ ] `https://bicicleteadaporlapazsanluis.com` - Página principal
- [ ] `https://bicicleteadaporlapazsanluis.com/admin` - Panel admin
- [ ] `https://bicicleteadaporlapazsanluis.com/api/send-email` - API de emails

## 🔍 Monitoreo

### 1. Logs de Vercel:
- Revisa los logs de función para errores
- Monitorea el rendimiento

### 2. Logs de Resend:
- Verifica el estado de los envíos
- Revisa bounces y complaints

### 3. Supabase:
- Monitorea el uso de la base de datos
- Revisa los logs de autenticación

## 🚨 Troubleshooting

### Error: "Missing API key"
- Verifica que `RESEND_API_KEY` esté configurada
- Reinicia el deployment

### Error: "Supabase connection failed"
- Verifica las variables de Supabase
- Revisa la configuración de RLS

### Emails no llegan:
- Revisa la carpeta de spam
- Verifica la configuración de DNS
- Revisa los logs de Resend

### Dominio no funciona:
- Verifica la configuración DNS
- Espera la propagación (hasta 24h)
- Revisa la configuración en Vercel

## 📞 Soporte

- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Supabase**: [supabase.com/docs](https://supabase.com/docs)
- **Resend**: [resend.com/docs](https://resend.com/docs)

## 🎉 ¡Listo!

Una vez completados todos los pasos, tu sitio estará funcionando en:
`https://bicicleteadaporlapazsanluis.com`

¡Disfruta tu nueva landing page! 🚴‍♀️
