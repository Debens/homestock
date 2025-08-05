create table if not exists recipe_reviews (
  id uuid not null unique,
  recipe_id uuid not null references recipes(id) on delete cascade,
  rating integer not null,
  comment text,

  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz default now(),

  primary key (id),
  constraint unique_user_recipe_review unique (created_by, recipe_id)
);
