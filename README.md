# Bicicleteada por la Paz - San Luis

Una aplicación web para la gestión de inscripciones y información del evento "Bicicleteada por la Paz" en San Luis, Argentina.

## 🚀 Características

- **Landing Page Responsiva**: Diseño moderno y atractivo para el evento
- **Sistema de Inscripciones**: Formulario completo para participantes
- **Galería de Fotos**: Muestra de eventos anteriores
- **Información del Recorrido**: Detalles del evento y ruta
- **Sistema de Sorteo**: Selección aleatoria de ganadores con premios
- **Panel de Administración**: Gestión completa de inscripciones y ganadores
- **Notificaciones Toast**: Feedback visual para el usuario
- **Exportación de Datos**: Descarga de inscripciones en formato CSV
- **Diseño Responsivo**: Optimizado para móviles, tablets y desktop

## 🛠️ Tecnologías Utilizadas

- **Next.js 14** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos y diseño
- **Radix UI** - Componentes accesibles
- **Supabase** - Base de datos y autenticación
- **Lucide React** - Iconos
- **Vercel Analytics** - Análisis de uso

## 📋 Prerrequisitos

- Node.js 18+ 
- npm o yarn
- Cuenta de Supabase

## ⚙️ Instalación

1. **Clona el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd bicicleteadaporlapazsanluis
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno**
   
   Crea un archivo `.env.local` en la raíz del proyecto:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
   
   # Resend Configuration (para envío de correos)
   RESEND_API_KEY=tu_resend_api_key
   ```
   
   **Nota**: Si no configuras Supabase, el proyecto funcionará con datos simulados para desarrollo.

4. **Configura la base de datos**
   
   Ejecuta los scripts SQL en tu proyecto de Supabase:
   - `scripts/001_create_registrations_table.sql`
   - `scripts/002_create_raffle_winners_table.sql`

## 🚀 Uso

### Desarrollo
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Producción
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## 📁 Estructura del Proyecto

```
├── app/                    # Páginas de Next.js
│   ├── admin/             # Panel de administración
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal
├── components/            # Componentes reutilizables
│   ├── ui/               # Componentes de UI base
│   ├── hero-section.tsx  # Sección principal
│   ├── about-section.tsx # Información del evento
│   ├── route-section.tsx # Detalles del recorrido
│   ├── gallery-section.tsx # Galería de fotos
│   ├── raffle-section.tsx # Sistema de sorteo
│   ├── registration-section.tsx # Formulario de inscripción
│   ├── sponsors-section.tsx # Patrocinadores
│   ├── navbar.tsx        # Navegación
│   └── footer.tsx        # Pie de página
├── hooks/                # Hooks personalizados
├── lib/                  # Utilidades y configuración
├── scripts/              # Scripts SQL para la base de datos
└── public/               # Archivos estáticos
```

## 🗄️ Base de Datos

### Tabla `registrations`
- `id` - ID único
- `email` - Email del participante
- `nombre` - Nombre
- `apellido` - Apellido
- `dni_pasaporte` - DNI o Pasaporte
- `ciudad` - Ciudad de residencia
- `telefono` - Teléfono de contacto
- `organizacion_personal` - Organización o "Personal"
- `created_at` - Fecha de inscripción

### Tabla `raffle_winners`
- `id` - ID único
- `registration_id` - ID de la inscripción (FK)
- `prize` - Premio ganado
- `created_at` - Fecha del sorteo

## 🎯 Funcionalidades Principales

### Sistema de Inscripciones
- Formulario completo con validación
- Prevención de emails duplicados
- Feedback visual con notificaciones toast
- Contador en tiempo real de participantes

### Sistema de Sorteo
- Selección aleatoria de ganadores
- Múltiples premios disponibles
- Historial de ganadores
- Integración con la base de datos

### Panel de Administración
- Estadísticas en tiempo real
- Lista completa de inscripciones
- Gestión de ganadores
- Exportación de datos a CSV
- Accesible en `/admin` (oculto por defecto)

## 🎨 Personalización

### Colores
Los colores del tema se pueden modificar en `app/globals.css` en las variables CSS personalizadas.

### Contenido
- **Información del evento**: Edita `components/about-section.tsx`
- **Detalles del recorrido**: Modifica `components/route-section.tsx`
- **Galería**: Actualiza las imágenes en `components/gallery-section.tsx`

## 📱 Responsive Design

La aplicación está optimizada para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)

## 🚀 Despliegue

### Vercel (Recomendado)
1. Conecta tu repositorio con Vercel
2. Configura las variables de entorno
3. Despliega automáticamente

### Otras plataformas
El proyecto es compatible con cualquier plataforma que soporte Next.js.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

Para consultas sobre el proyecto, contacta a [tu-email@ejemplo.com]

---

**¡Gracias por contribuir a la Bicicleteada por la Paz! 🚴‍♀️🕊️**