create or replace function public.check_role_change()
returns trigger
language plpgsql
security definer  -- xem lưu ý bên dưới
as $$
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
$$;