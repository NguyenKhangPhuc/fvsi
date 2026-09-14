-- Migration unit 1: schema_changes
-- Transaction mode: transactional
-- Boundary reason: default

SET check_function_bodies = false;

ALTER TABLE public.events
  ALTER COLUMN content TYPE jsonb USING content::jsonb;

ALTER TABLE public.events
  ALTER COLUMN end_date TYPE timestamp with time zone USING end_date::timestamp WITH time zone;

ALTER TABLE public.events
  DROP COLUMN max_group_members;

ALTER TABLE public.events
  DROP COLUMN organized_date;

ALTER TABLE public.events
  ALTER COLUMN start_date TYPE timestamp with time zone USING start_date::timestamp WITH time zone;

DROP TRIGGER on_profile_role_update ON public.profiles;

DROP FUNCTION public.check_role_update();

CREATE FUNCTION public.check_role_change()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER
  AS $function$
begin
  if NEW.role is distinct from OLD.role then
    if current_user = 'postgres' or auth.role() = 'service_role' then
      return NEW;
    end if;

    if not exists (
      select 1 
      from public.profiles 
      where id = auth.uid() 
        and role = 'admin'::public."PROFILE_ROLE"
    ) then
      raise exception 'Bạn không được phép thay đổi quyền (Role)!';
    end if;
  end if;

  return NEW;
end;
$function$;

GRANT DELETE, INSERT, SELECT, UPDATE ON public.events TO anon;

GRANT DELETE, INSERT, SELECT, UPDATE ON public.events TO authenticated;

GRANT DELETE, INSERT, SELECT, UPDATE ON public.events TO service_role;

GRANT DELETE, INSERT, SELECT, UPDATE ON public.profiles TO anon;

GRANT DELETE, INSERT, SELECT, UPDATE ON public.profiles TO authenticated;

GRANT DELETE, INSERT, SELECT, UPDATE ON public.profiles TO service_role;

CREATE OR REPLACE TRIGGER enforce_profile_role_protection
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.check_role_change();

ALTER POLICY "Enable read access for all users" ON public.profiles USING (((( SELECT profiles_1.role
   FROM public.profiles profiles_1
  WHERE (profiles_1.id = ( SELECT auth.uid() AS uid))) = 'admin'::public."PROFILE_ROLE") OR (id = ( SELECT auth.uid() AS uid)) OR
    (ROLE IS DISTINCT FROM 'admin'::public."PROFILE_ROLE")));