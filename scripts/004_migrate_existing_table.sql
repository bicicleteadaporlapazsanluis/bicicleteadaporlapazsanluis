-- Migration script to add DNI unique constraint to existing table
-- Run this if you already have data in the registrations table

-- Step 1: Check for existing duplicates
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
        
        -- Show the duplicates
        RAISE NOTICE 'Duplicate DNIs:';
        FOR duplicate_count IN 
            SELECT dni_pasaporte, COUNT(*) as count
            FROM public.registrations
            GROUP BY dni_pasaporte
            HAVING COUNT(*) > 1
            ORDER BY count DESC
        LOOP
            RAISE NOTICE 'DNI: %, Count: %', duplicate_count.dni_pasaporte, duplicate_count.count;
        END LOOP;
        
        -- Don't proceed with the constraint if there are duplicates
        RETURN;
    END IF;
    
    -- Step 2: Add the unique constraint
    ALTER TABLE public.registrations 
    ADD CONSTRAINT unique_dni_pasaporte UNIQUE (dni_pasaporte);
    
    -- Step 3: Add index for better performance
    CREATE INDEX IF NOT EXISTS idx_registrations_dni_pasaporte 
    ON public.registrations (dni_pasaporte);
    
    RAISE NOTICE 'Successfully added DNI unique constraint and index.';
END $$;
