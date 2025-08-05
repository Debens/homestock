create table if not exists homes (
  id uuid not null unique,
  name text not null,
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz default now(),

  primary key (id)
);
