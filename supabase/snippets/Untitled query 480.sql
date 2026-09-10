create table public.events (
  id uuid not null default gen_random_uuid (),
  poster_path text null,
  title text null,
  short_description text null,
  content text null,
  location text null,
  max_group_members smallint null,
  start_date date null,
  end_date date null,
  organized_date timestamp with time zone null,
  created_at timestamp with time zone not null default now(),
  owner_id uuid null default gen_random_uuid (),
  constraint events_pkey primary key (id),
  constraint events_owner_id_fkey foreign KEY (owner_id) references profiles (id) on update CASCADE on delete CASCADE
) TABLESPACE pg_default;