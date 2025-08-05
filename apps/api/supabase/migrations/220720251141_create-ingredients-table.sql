create table if not exists ingredients (
  id uuid not null unique,
  name text not null,

  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz default now(),

  primary key (id)
);
