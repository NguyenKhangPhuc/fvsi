-- Migration unit 1: schema_changes
-- Transaction mode: transactional
-- Boundary reason: default

SET check_function_bodies = false;

CREATE TYPE public."EVENT_STATUS" AS ENUM (
  'ongoing',
  'finished'
);

CREATE TYPE public."PROFILE_ROLE" AS ENUM (
  'admin',
  'student'
);

CREATE FUNCTION public.check_role_update()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO ''
  AS $function$
begin
  -- Kiểm tra nếu role bị thay đổi
  if NEW.role is distinct from OLD.role then
    -- Kiểm tra người thực thi (auth.uid()) có phải là admin hay không
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

CREATE FUNCTION public.handle_new_user()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO ''
  AS $function$
begin
  insert into public.profiles (id, full_name, avatar_url, email)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    coalesce(new.raw_user_meta_data->>'avatar_url', null),
    lower(coalesce(new.email, new.raw_user_meta_data->>'email'))
  );
  return new;
end;
$function$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

CREATE TABLE public.events (
  id                uuid                     DEFAULT gen_random_uuid() NOT NULL,
  poster_path       text,
  title             text,
  short_description text,
  content           text,
  location          text,
  max_group_members smallint,
  start_date        date,
  end_date          date,
  organized_date    timestamp with time zone,
  created_at        timestamp with time zone DEFAULT now() NOT NULL,
  owner_id          uuid                     DEFAULT gen_random_uuid(),
  status            public."EVENT_STATUS"    DEFAULT 'ongoing'::public."EVENT_STATUS"
);

ALTER TABLE public.events
  ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.events
  ADD CONSTRAINT events_pkey PRIMARY KEY (id);

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON public.events TO anon;

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON public.events TO authenticated;

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON public.events TO service_role;

CREATE POLICY "Enable read access for all users" ON public.events
  FOR SELECT
  USING (true);

CREATE TABLE public.profiles (
  id         uuid                  NOT NULL,
  full_name  text,
  email      text,
  avatar_url text,
  role       public."PROFILE_ROLE"
);

CREATE POLICY "Enable delete for users based on user_id" ON public.events
  FOR DELETE
  USING ((( SELECT profiles.role
   FROM public.profiles
  WHERE (profiles.id = ( SELECT auth.uid() AS uid))) = 'admin'::public."PROFILE_ROLE"));

CREATE POLICY "Enable insert for users based on user_id" ON public.events
  FOR INSERT
  WITH CHECK ((( SELECT profiles.role
   FROM public.profiles
  WHERE (profiles.id = ( SELECT auth.uid() AS uid))) = 'admin'::public."PROFILE_ROLE"));

CREATE POLICY "Policy with table joins" ON public.events
  FOR UPDATE
  USING ((( SELECT profiles.role
   FROM public.profiles
  WHERE (profiles.id = ( SELECT auth.uid() AS uid))) = 'admin'::public."PROFILE_ROLE"));

ALTER TABLE public.profiles
  ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_email_key UNIQUE (email);

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);

ALTER TABLE public.events
  ADD CONSTRAINT events_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.profiles(id) ON UPDATE CASCADE ON DELETE CASCADE;

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON public.profiles TO anon;

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON public.profiles TO authenticated;

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON public.profiles TO service_role;

CREATE TRIGGER enforce_profile_role_protection
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.check_role_update();

CREATE TRIGGER on_profile_role_update
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.check_role_update();

CREATE POLICY "Enable delete for users based on user_id" ON public.profiles
  FOR DELETE
  USING ((( SELECT profiles_1.role
   FROM public.profiles profiles_1
  WHERE (profiles_1.id = ( SELECT auth.uid() AS uid))) = 'admin'::public."PROFILE_ROLE"));

CREATE POLICY "Enable insert for authenticated users only" ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK ((( SELECT profiles_1.role
   FROM public.profiles profiles_1
  WHERE (profiles_1.id = ( SELECT auth.uid() AS uid))) = 'admin'::public."PROFILE_ROLE"));

CREATE POLICY "Enable read access for all users" ON public.profiles
  FOR SELECT
  USING ((( SELECT profiles_1.role
   FROM public.profiles profiles_1
  WHERE (profiles_1.id = ( SELECT auth.uid() AS uid))) = 'admin'::public."PROFILE_ROLE"));

CREATE POLICY "Policy with table joins" ON public.profiles
  FOR UPDATE
  USING ((( SELECT profiles_1.role
   FROM public.profiles profiles_1
  WHERE (profiles_1.id = ( SELECT auth.uid() AS uid))) = 'admin'::public."PROFILE_ROLE"));