create table if not exists meals (
  id uuid not null unique,
  home_id uuid not null references homes(id) on delete cascade,
  name text,
  scheduled_at timestamptz not null,

  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz default now(),

  primary key (id)
);
