create table if not exists home_members (
  id uuid not null unique,

  user_id uuid not null references auth.users(id) on delete cascade,
  home_id uuid not null references homes(id) on delete cascade,
  role text not null check (role in ('admin', 'member', 'viewer')),

  created_at timestamptz default now(),

  primary key (id),
  constraint unique_user_home unique (user_id, home_id)
);

create extension if not exists "uuid-ossp";
create or replace function add_creator_to_home_members()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into home_members (id, user_id, home_id, role)
  values (gen_random_uuid(), new.created_by, new.id, 'admin');
  return new;
end;
$$;

create trigger trigger_add_creator_to_home_members
after insert on homes
for each row
when (new.created_by is not null)
execute procedure add_creator_to_home_members();
