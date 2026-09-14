-- Migration unit 1: schema_changes
-- Transaction mode: transactional
-- Boundary reason: default

ALTER TABLE public.profiles
  ALTER COLUMN ROLE SET DEFAULT 'student'::public."PROFILE_ROLE";