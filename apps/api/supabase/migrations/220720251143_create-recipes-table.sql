create table if not exists recipes (
  id uuid not null unique,
  name text not null,
  description text not null,
  cooking_duration text not null,
  prepreation_duration text not null,
  rating integer not null check (rating >= 1 and rating <= 5),

  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz default now(),

  primary key (id)
);
