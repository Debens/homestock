create table if not exists stock (
  id uuid not null unique,
  ingredient_id uuid not null references ingredients(id),
  store_id uuid not null references stores(id) on delete cascade,
  quantity bigint not null default 0,
  expires_at timestamptz,

  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz default now(),

  primary key (id)
);
