-- Add worksheet_url field to sessions table
ALTER TABLE public.sessions
ADD COLUMN worksheet_url TEXT;

COMMENT ON COLUMN public.sessions.worksheet_url IS 'URL to downloadable worksheet/PDF for this session';
