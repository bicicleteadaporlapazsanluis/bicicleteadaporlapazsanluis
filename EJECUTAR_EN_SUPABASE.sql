-- EJECUTAR ESTE SQL EN LA CONSOLA DE SUPABASE ONLINE
-- Para solucionar el error del sorteo

-- Hacer el campo prize_name opcional (nullable)
ALTER TABLE public.raffle_winners 
ALTER COLUMN prize_name DROP NOT NULL;

-- Agregar la columna winner_number si no existe
ALTER TABLE public.raffle_winners 
ADD COLUMN IF NOT EXISTS winner_number INTEGER;

-- Actualizar ganadores existentes para tener números secuenciales
WITH numbered_winners AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY drawn_at) as row_num
  FROM public.raffle_winners 
  WHERE winner_number IS NULL
)
UPDATE public.raffle_winners 
SET winner_number = numbered_winners.row_num
FROM numbered_winners 
WHERE public.raffle_winners.id = numbered_winners.id;

-- Crear índice para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_raffle_winners_number 
ON public.raffle_winners(winner_number);