-- Create registrations table for the cycling event
CREATE TABLE IF NOT EXISTS public.registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  nombre TEXT NOT NULL,
  apellido TEXT NOT NULL,
  dni_pasaporte TEXT NOT NULL,
  ciudad TEXT NOT NULL,
  telefono TEXT NOT NULL,
  organizacion_personal TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is a public event registration)
CREATE POLICY "Allow public to insert registrations" ON public.registrations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public to view registrations" ON public.registrations
  FOR SELECT USING (true);
