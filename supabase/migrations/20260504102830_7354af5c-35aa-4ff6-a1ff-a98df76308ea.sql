CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  source TEXT NOT NULL DEFAULT 'contact_form',
  name TEXT,
  email TEXT NOT NULL,
  project_type TEXT,
  message TEXT NOT NULL,
  recipient TEXT NOT NULL DEFAULT 'terraspacestudios07@gmail.com',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone can submit (public contact form)
CREATE POLICY "Anyone can insert submissions"
  ON public.contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- No public read access (admin views via dashboard)
