DROP POLICY "Anyone can insert submissions" ON public.contact_submissions;

CREATE POLICY "Anyone can insert valid submissions"
  ON public.contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(message) BETWEEN 1 AND 5000
    AND char_length(email) BETWEEN 5 AND 320
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  );
