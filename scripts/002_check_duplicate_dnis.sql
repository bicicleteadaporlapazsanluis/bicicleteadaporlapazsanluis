-- Check for duplicate DNIs before adding unique constraint
-- This script helps identify any existing duplicates that need to be resolved

-- Find duplicate DNIs
SELECT 
  dni_pasaporte,
  COUNT(*) as duplicate_count,
  STRING_AGG(email, ', ') as emails,
  STRING_AGG(nombre || ' ' || apellido, ', ') as names
FROM public.registrations 
GROUP BY dni_pasaporte 
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC;

-- If duplicates are found, you may need to:
-- 1. Keep the most recent registration (by created_at)
-- 2. Or manually review and decide which ones to keep
-- 3. Delete the duplicates before running the unique constraint script
