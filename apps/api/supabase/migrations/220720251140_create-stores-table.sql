create table if not exists stores (
  id uuid not null unique,
  name text not null,
  home_id uuid not null references homes(id) on delete cascade,

  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz default now(),

  primary key (id)
);
