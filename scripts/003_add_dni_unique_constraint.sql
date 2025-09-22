-- Add unique constraint to dni_pasaporte field
-- This ensures that each person can only register once using their DNI

-- First, check if there are any duplicate DNIs and handle them if necessary
-- (This is a safety measure in case there are already duplicates)

-- Add the unique constraint
ALTER TABLE public.registrations 
ADD CONSTRAINT unique_dni_pasaporte UNIQUE (dni_pasaporte);

-- Add an index for better performance on DNI lookups
CREATE INDEX IF NOT EXISTS idx_registrations_dni_pasaporte 
ON public.registrations (dni_pasaporte);
