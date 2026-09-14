-- Migration unit 1: schema_changes
-- Transaction mode: transactional
-- Boundary reason: default

SET check_function_bodies = false;

DROP POLICY "Enable read access for all users" ON public.profiles;

CREATE FUNCTION public.get_my_role()
  RETURNS text
  LANGUAGE sql
  STABLE
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$function$;

CREATE POLICY "View non-admin profiles policy" ON public.profiles
  FOR SELECT
  TO authenticated
  USING (((public.get_my_role() = 'admin'::text) OR (ROLE IS DISTINCT FROM 'admin'::public."PROFILE_ROLE")));