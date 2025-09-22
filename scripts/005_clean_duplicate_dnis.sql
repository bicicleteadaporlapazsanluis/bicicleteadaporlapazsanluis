-- Script to clean duplicate DNIs (keep the most recent registration)
-- WARNING: This will delete duplicate registrations, keeping only the most recent one
-- Run this ONLY if you have duplicates and want to keep the most recent registration

-- First, show what will be deleted
SELECT 
    'WILL DELETE' as action,
    dni_pasaporte,
    email,
    nombre || ' ' || apellido as name,
    created_at,
    'KEEPING MOST RECENT' as note
FROM public.registrations r1
WHERE EXISTS (
    SELECT 1 
    FROM public.registrations r2 
    WHERE r2.dni_pasaporte = r1.dni_pasaporte 
    AND r2.created_at > r1.created_at
)
ORDER BY dni_pasaporte, created_at;

-- Uncomment the following lines to actually delete the duplicates
-- (Only run this after reviewing the above query results)

/*
WITH duplicates_to_delete AS (
    SELECT id
    FROM public.registrations r1
    WHERE EXISTS (
        SELECT 1 
        FROM public.registrations r2 
        WHERE r2.dni_pasaporte = r1.dni_pasaporte 
        AND r2.created_at > r1.created_at
    )
)
DELETE FROM public.registrations 
WHERE id IN (SELECT id FROM duplicates_to_delete);
*/
