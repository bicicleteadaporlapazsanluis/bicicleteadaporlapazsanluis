# Configuración de Supabase

Este proyecto utiliza Supabase como base de datos para gestionar las inscripciones y el sorteo.

## Configuración Inicial

### 1. Crear un proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Crea una cuenta o inicia sesión
3. Crea un nuevo proyecto
4. Anota la URL del proyecto y la clave anónima

### 2. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_aqui
```

### 3. Ejecutar scripts SQL

Ejecuta los siguientes scripts en el editor SQL de Supabase **en este orden**:

#### Script 1: Crear tabla de registros
```sql
-- Crear tabla de registros
CREATE TABLE registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  dni_pasaporte VARCHAR(50) NOT NULL,
  ciudad VARCHAR(100) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  organizacion_personal VARCHAR(200) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejor rendimiento
CREATE INDEX idx_registrations_email ON registrations(email);
CREATE INDEX idx_registrations_created_at ON registrations(created_at);
```

#### Script 2: Verificar DNIs duplicados (OPCIONAL - solo si ya tienes datos)
```sql
-- Verificar si hay DNIs duplicados antes de agregar la restricción única
SELECT 
  dni_pasaporte,
  COUNT(*) as duplicate_count,
  STRING_AGG(email, ', ') as emails,
  STRING_AGG(nombre || ' ' || apellido, ', ') as names
FROM registrations 
GROUP BY dni_pasaporte 
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC;
```

#### Script 3: Agregar restricción única para DNI

**Si es una tabla nueva (sin datos):**
```sql
-- Agregar restricción única para DNI (cada persona solo puede inscribirse una vez)
ALTER TABLE registrations 
ADD CONSTRAINT unique_dni_pasaporte UNIQUE (dni_pasaporte);

-- Crear índice para mejor rendimiento en consultas de DNI
CREATE INDEX idx_registrations_dni_pasaporte ON registrations (dni_pasaporte);
```

**Si ya tienes datos en la tabla:**
```sql
-- Script de migración que verifica duplicados antes de agregar la restricción
DO $$
DECLARE
    duplicate_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO duplicate_count
    FROM (
        SELECT dni_pasaporte
        FROM public.registrations
        GROUP BY dni_pasaporte
        HAVING COUNT(*) > 1
    ) duplicates;
    
    IF duplicate_count > 0 THEN
        RAISE NOTICE 'Found % duplicate DNIs. Please resolve duplicates before adding unique constraint.', duplicate_count;
        RETURN;
    END IF;
    
    ALTER TABLE public.registrations 
    ADD CONSTRAINT unique_dni_pasaporte UNIQUE (dni_pasaporte);
    
    CREATE INDEX IF NOT EXISTS idx_registrations_dni_pasaporte 
    ON public.registrations (dni_pasaporte);
    
    RAISE NOTICE 'Successfully added DNI unique constraint and index.';
END $$;
```

#### Script 4: Crear tabla de ganadores
```sql
-- Crear tabla de ganadores del sorteo
CREATE TABLE raffle_winners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  registration_id UUID NOT NULL REFERENCES registrations(id) ON DELETE CASCADE,
  prize VARCHAR(200) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices
CREATE INDEX idx_raffle_winners_registration_id ON raffle_winners(registration_id);
CREATE INDEX idx_raffle_winners_created_at ON raffle_winners(created_at);
```

### 4. Configurar políticas de seguridad (RLS)

#### Política para registrations (lectura pública, escritura pública)
```sql
-- Habilitar RLS
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Permitir lectura pública
CREATE POLICY "Allow public read access" ON registrations
  FOR SELECT USING (true);

-- Permitir inserción pública
CREATE POLICY "Allow public insert" ON registrations
  FOR INSERT WITH CHECK (true);
```

#### Política para raffle_winners (lectura pública, escritura pública)
```sql
-- Habilitar RLS
ALTER TABLE raffle_winners ENABLE ROW LEVEL SECURITY;

-- Permitir lectura pública
CREATE POLICY "Allow public read access" ON raffle_winners
  FOR SELECT USING (true);

-- Permitir inserción pública
CREATE POLICY "Allow public insert" ON raffle_winners
  FOR INSERT WITH CHECK (true);
```

## Funcionalidades

### Inscripciones
- Los usuarios pueden inscribirse a través del formulario
- Se valida que el email sea único
- Se valida que el DNI sea único (cada persona solo puede inscribirse una vez)
- Validación en tiempo real mientras el usuario escribe
- Los datos se guardan en la tabla `registrations`

### Sorteo
- Se puede seleccionar ganadores aleatoriamente
- Los ganadores se guardan en la tabla `raffle_winners`
- Se muestra la lista de ganadores en tiempo real

### Panel de Administración
- Accesible en `/admin`
- Muestra estadísticas de inscripciones
- Lista todos los ganadores
- Permite exportar datos a CSV

## Estructura de la Base de Datos

### Tabla `registrations`
- `id`: UUID único
- `email`: Email del participante (único)
- `nombre`: Nombre del participante
- `apellido`: Apellido del participante
- `dni_pasaporte`: DNI o pasaporte (único - cada persona solo puede inscribirse una vez)
- `ciudad`: Ciudad de residencia
- `telefono`: Teléfono de contacto
- `organizacion_personal`: Organización o "Personal"
- `created_at`: Fecha de inscripción

**Restricciones:**
- `email` debe ser único
- `dni_pasaporte` debe ser único
- Ambos campos tienen índices para mejor rendimiento

### Tabla `raffle_winners`
- `id`: UUID único
- `registration_id`: ID de la inscripción (FK)
- `prize`: Premio ganado
- `created_at`: Fecha del sorteo

## Solución de Problemas

### Error de conexión
Si ves errores de conexión, verifica que:
1. Las variables de entorno estén configuradas correctamente
2. El proyecto de Supabase esté activo
3. Las políticas RLS estén configuradas

### Error de permisos
Si hay errores de permisos, asegúrate de que:
1. Las políticas RLS permitan las operaciones necesarias
2. La clave anónima tenga los permisos correctos

### Error de DNI duplicado
Si intentas agregar la restricción única y hay DNIs duplicados:

1. **Verificar duplicados:**
```sql
SELECT dni_pasaporte, COUNT(*) as count
FROM registrations 
GROUP BY dni_pasaporte 
HAVING COUNT(*) > 1;
```

2. **Limpiar duplicados (mantener el más reciente):**
```sql
-- Ver qué se va a eliminar
SELECT 'WILL DELETE' as action, dni_pasaporte, email, created_at
FROM registrations r1
WHERE EXISTS (
    SELECT 1 FROM registrations r2 
    WHERE r2.dni_pasaporte = r1.dni_pasaporte 
    AND r2.created_at > r1.created_at
);

-- Eliminar duplicados (descomenta para ejecutar)
-- DELETE FROM registrations 
-- WHERE id IN (
--     SELECT id FROM registrations r1
--     WHERE EXISTS (
--         SELECT 1 FROM registrations r2 
--         WHERE r2.dni_pasaporte = r1.dni_pasaporte 
--         AND r2.created_at > r1.created_at
--     )
-- );
```

3. **Agregar la restricción única:**
```sql
ALTER TABLE registrations 
ADD CONSTRAINT unique_dni_pasaporte UNIQUE (dni_pasaporte);
```

### Datos de prueba
El proyecto incluye un sistema de fallback que funciona sin Supabase para desarrollo local.
