-- Migration unit 1: schema_changes
-- Transaction mode: transactional
-- Boundary reason: default

ALTER TABLE public.events
  ADD COLUMN watch_start_date timestamp with time zone;
