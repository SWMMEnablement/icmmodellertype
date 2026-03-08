
-- Anonymous quiz results for social proof stats
CREATE TABLE public.quiz_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  personality_type TEXT NOT NULL,
  quiz_mode TEXT NOT NULL DEFAULT 'self',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (anonymous quiz, no auth required)
CREATE POLICY "Anyone can insert quiz results"
  ON public.quiz_results
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow anyone to read aggregate stats
CREATE POLICY "Anyone can read quiz results"
  ON public.quiz_results
  FOR SELECT
  TO anon, authenticated
  USING (true);
