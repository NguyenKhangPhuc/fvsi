-- 1. Tạo hàm kiểm tra quyền cập nhật Role
create or replace function public.check_role_update()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
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
$$;

-- 2. Xóa trigger cũ (nếu có)
drop trigger if exists on_profile_role_update on public.profiles;

-- 3. Gắn trigger BEFORE UPDATE trên bảng profiles
create trigger on_profile_role_update
  before update on public.profiles
  for each row execute function public.check_role_update();