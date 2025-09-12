-- Create raffle winners table
CREATE TABLE IF NOT EXISTS public.raffle_winners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id UUID NOT NULL REFERENCES public.registrations(id) ON DELETE CASCADE,
  prize_name TEXT NOT NULL,
  drawn_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  drawn_by TEXT DEFAULT 'Admin'
);

-- Enable RLS
ALTER TABLE public.raffle_winners ENABLE ROW LEVEL SECURITY;

-- Create policies for public viewing and admin management
CREATE POLICY "Allow public to view winners" ON public.raffle_winners
  FOR SELECT USING (true);

CREATE POLICY "Allow admin to insert winners" ON public.raffle_winners
  FOR INSERT WITH CHECK (true);
