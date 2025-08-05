create table if not exists meal_recipes (
  id uuid not null unique,
  meal_id uuid not null references meals(id) on delete cascade,
  recipe_id uuid not null references recipes(id),
  servings integer default 1 check (servings > 0),

  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz default now(),

  primary key (id),
  constraint unique_recipe_in_meal unique (meal_id, recipe_id)
);
