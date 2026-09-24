-- Migration unit 1: schema_changes
-- Transaction mode: transactional
-- Boundary reason: default

ALTER TYPE public."EVENT_STATUS" ADD VALUE 'upcoming' AFTER 'finished';