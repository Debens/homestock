create table if not exists recipe_steps (
  id uuid not null unique,
  recipe_id uuid references recipes(id) on delete cascade,
  step_number integer not null,
  instruction text not null,

  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz default now(),

  primary key (id),
  constraint unique_step_per_recipe unique (recipe_id, step_number)
);
