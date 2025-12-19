-- Add database-level constraints for input validation

-- Profiles table: Add length constraint on name
ALTER TABLE public.profiles
ADD CONSTRAINT profiles_name_length CHECK (char_length(name) <= 100);

-- Community posts table: Add length constraint on content
ALTER TABLE public.community_posts
ADD CONSTRAINT community_posts_content_length CHECK (char_length(content) <= 5000);

-- Journal entries table: Add length constraints on title and body
ALTER TABLE public.journal_entries
ADD CONSTRAINT journal_entries_title_length CHECK (char_length(title) <= 200);

ALTER TABLE public.journal_entries
ADD CONSTRAINT journal_entries_body_length CHECK (char_length(body) <= 50000);

-- Comments table: Add length constraint on content
ALTER TABLE public.comments
ADD CONSTRAINT comments_content_length CHECK (char_length(content) <= 2000);