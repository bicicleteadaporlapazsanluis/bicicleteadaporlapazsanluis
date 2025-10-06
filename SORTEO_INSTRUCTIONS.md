# 🏆 Sistema de Sorteo - Bicicleteada por la Paz

## 📋 Resumen

Se ha habilitado un sistema completo de sorteo para el evento de mañana. La funcionalidad incluye autenticación por contraseña y guardado automático de ganadores en la base de datos.

## 🔐 Acceso al Sorteo

**URL:** `http://localhost:3000/admin/sorteo` (o tu dominio en producción)
**Contraseña:** `deadlinesorteo2025`

## ✨ Funcionalidades Implementadas

### 🎯 Sistema de Sorteo
- **3 premios configurados:**
  1. Bicicleta Mountain Bike
  2. Kit de Accesorios (Casco, luces LED y botella deportiva)
  3. Voucher Deportivo ($50.000 en tienda deportiva)

- **Características:**
  - ✅ Autenticación con contraseña
  - ✅ Selección aleatoria de ganadores
  - ✅ Guardado automático en base de datos
  - ✅ Evita que el mismo participante gane múltiples premios
  - ✅ Animación durante la selección
  - ✅ Exportación de ganadores a CSV
  - ✅ Vista en tiempo real de participantes y ganadores

### 🗄️ Base de Datos
- Tabla `raffle_winners` con estructura completa
- Relación con tabla `registrations`
- Campos: ganador, premio, fecha/hora del sorteo
- Políticas de seguridad (RLS) configuradas

## 🚀 Cómo Usar el Sistema

### Antes del Evento
1. **Verificar la base de datos:**
   ```sql
   -- Ejecutar en Supabase SQL Editor:
   \i scripts/006_fix_raffle_winners_table.sql
   ```

### Durante el Evento
1. **Acceder al panel:**
   - Ir a `/admin/sorteo`
   - Ingresar contraseña: `deadlinesorteo2025`

2. **Realizar sorteos:**
   - Verificar cantidad de participantes inscriptos
   - Hacer clic en "Sortear Este Premio" para cada premio
   - Esperar la animación de selección (3 segundos)
   - Ver el ganador automáticamente

3. **Gestionar resultados:**
   - Los ganadores aparecen inmediatamente en pantalla
   - Se guardan automáticamente en la base de datos
   - Usar "Exportar Ganadores" para descargar CSV
   - Usar "Actualizar" para refrescar datos

## 📊 Panel de Información

El sistema muestra:
- **Total de participantes inscriptos**
- **Cantidad de ganadores actuales**
- **Estado de cada premio** (disponible/ya sorteado)
- **Lista completa de ganadores** con detalles

## 🔧 Archivos Creados/Modificados

### Nuevos Archivos
- `app/admin/sorteo/page.tsx` - Panel principal de sorteo
- `scripts/006_fix_raffle_winners_table.sql` - Script para verificar/corregir BD

### Archivos Existentes
- `components/raffle-section.tsx` - Ya tenía funcionalidad (se mantiene oculta)
- `app/admin/page.tsx` - Panel admin general (no modificado)
- `scripts/002_create_raffle_winners_table.sql` - Tabla de ganadores

## 🎨 Interfaz

### Pantalla de Login
- Campo de contraseña seguro
- Validación inmediata
- Diseño responsive

### Panel Principal
- Cards para cada premio con estado visual
- Botones de sorteo individuales por premio
- Tabla de ganadores en tiempo real
- Controles de exportación y actualización
- Instrucciones claras de uso

## 🛡️ Seguridad

- **Autenticación requerida** con contraseña específica
- **Validaciones** antes de cada sorteo
- **Prevención** de ganadores duplicados
- **Políticas RLS** en base de datos
- **Logs** de todas las operaciones

## 📱 Responsive Design

- Compatible con **móviles y tablets**
- **Diseño adaptativo** para diferentes pantallas
- **Iconografía clara** y fácil de usar

## 🚨 Instrucciones para Mañana

1. **Antes de empezar:**
   - Verificar que la aplicación esté ejecutándose
   - Comprobar conexión con base de datos
   - Ejecutar script de verificación si es necesario

2. **Durante el sorteo:**
   - Tener la URL lista: `/admin/sorteo`
   - Contraseña a mano: `deadlinesorteo2025`
   - Proyectar pantalla para que todos vean
   - Ir premio por premio según orden deseado

3. **Después del sorteo:**
   - Exportar lista de ganadores
   - Contactar ganadores por email
   - Guardar backup de datos

## 🎉 ¡Listo para el Evento!

El sistema está completamente funcional y listo para usar mañana. ¡Que tengas un sorteo exitoso! 🚴‍♂️🏆