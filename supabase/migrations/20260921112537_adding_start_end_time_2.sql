-- Migration unit 1: schema_changes
-- Transaction mode: transactional
-- Boundary reason: default

ALTER TABLE public.events
  ADD COLUMN start_date_2 timestamp with time zone;

ALTER TABLE public.events
  ADD COLUMN end_date_2 timestamp with time zone;