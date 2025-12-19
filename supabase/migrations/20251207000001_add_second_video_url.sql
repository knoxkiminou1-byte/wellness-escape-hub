-- Add second video URL field to sessions table
ALTER TABLE public.sessions
ADD COLUMN IF NOT EXISTS video_url_2 TEXT;

COMMENT ON COLUMN public.sessions.video_url_2 IS 'Second video URL for sessions with multiple videos';
