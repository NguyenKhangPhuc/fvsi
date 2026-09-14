
-- 2. Tạo hàm bypass RLS để lấy role
CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

-- 3. Tạo lại policy sử dụng hàm vừa tạo
CREATE POLICY "View non-admin profiles policy"
ON public.profiles
FOR SELECT
TO authenticated
USING (
  get_my_role() = 'admin'
  OR role IS DISTINCT FROM 'admin'
);