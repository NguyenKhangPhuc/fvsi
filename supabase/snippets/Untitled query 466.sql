-- 1. Tạo hàm xử lý trigger với quyền SECURITY DEFINER
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
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
$$;

-- 2. Xóa trigger cũ (nếu có) để tránh trùng lặp
drop trigger if exists on_auth_user_created on auth.users;

-- 3. Gắn trigger vào bảng auth.users
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();