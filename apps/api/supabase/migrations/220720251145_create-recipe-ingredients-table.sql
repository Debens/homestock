create table if not exists recipe_ingredients (
  id uuid not null unique,
  recipe_id uuid references recipes(id) on delete cascade,
  ingredient_id uuid not null references ingredients(id),
  quantity numeric not null,

  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz default now(),

  primary key (id),
  constraint unique_ingredient_per_recipe unique (recipe_id, ingredient_id)
);
