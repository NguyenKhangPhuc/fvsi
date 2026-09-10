
create trigger enforce_profile_role_protection BEFORE
update on profiles for EACH row
execute FUNCTION check_role_update ();