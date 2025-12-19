-- Add RLS policy to allow anonymous users to view sessions
CREATE POLICY "Anonymous users can view active sessions"
ON public.sessions
FOR SELECT
TO anon
USING (is_active = true);

-- Add RLS policy to allow anonymous users to view program weeks
CREATE POLICY "Anonymous users can view weeks"
ON public.program_weeks
FOR SELECT
TO anon
USING (true);