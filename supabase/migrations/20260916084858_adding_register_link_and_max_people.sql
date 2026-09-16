-- Migration unit 1: schema_changes
-- Transaction mode: transactional
-- Boundary reason: default

ALTER TABLE public.events
  ADD COLUMN register_link text;

ALTER TABLE public.events
  ADD COLUMN max_people smallint;