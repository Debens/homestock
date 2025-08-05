-- ensure the created_by column is set to the current user during insert
create or replace function public.set_created_by()
returns trigger as $$
begin
    new.created_by = (select auth.uid());
    return new;
end;
$$ language plpgsql security definer;

-- Enable row level security on homes
alter table homes enable row level security;

create trigger set_homes_created_by
before insert on homes
for each row
execute function set_created_by();

create policy "authenticated users can create homes"
  on homes
  for insert
  to authenticated
  with check (
    true
  );

create policy "users can create their own homes"
  on homes
  for insert
  to authenticated
  with check (
    created_by = (select auth.uid())
  );

create policy "users can view homes they are a part of"
  on homes
  for select
  using (
    exists (
      select 1 from home_members
      where home_members.home_id = homes.id
        and home_members.user_id = (select auth.uid())
    )
  );


-- Enable row level security on home_members
alter table home_members enable row level security;

create or replace function is_home_member(home_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from home_members
    where home_members.home_id = is_home_member.home_id
      and home_members.user_id = auth.uid()
  );
$$;

create or replace function is_home_admin(home_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from home_members
    where home_members.home_id = is_home_admin.home_id
      and home_members.user_id = auth.uid()
      and home_members.role = 'admin'
  );
$$;

create policy "users can only view members of homes they are a part of"
  on home_members
  for select
  using (
    is_home_member(home_members.home_id)
  );

create policy "only admins can add members"
  on home_members
  for insert
  with check (
    is_home_admin(home_members.home_id)
  );

create policy "only admins can remove members"
  on home_members
  for delete
  using (
    is_home_admin(home_members.home_id)
  );

-- Enable row level security on stores
alter table stores enable row level security;

create policy "authenticated users can create stores"
  on stores
  for insert
  to authenticated
  with check (
    true
  );

create policy "only home members can insert stores"
  on stores
  for insert
  with check (
    exists (
      select 1 from home_members
      where home_members.home_id = stores.home_id
        and home_members.user_id = auth.uid()
    )
  );

create policy "users can create their own stores"
  on stores
  for insert
  to authenticated
  with check (
    created_by = (select auth.uid())
  );

create policy "users can view stores in homes they are a part of"
  on stores
  for select
  using (
    exists (
      select 1 from home_members
      where home_members.home_id = stores.home_id
        and home_members.user_id = (select auth.uid())
    )
  );


-- Enable row level security on stock
alter table stock enable row level security;

create policy "authenticated users can create stock"
  on stock
  for insert
  to authenticated
  with check (
    true
  );

create policy "users can create their own stock"
  on stock
  for insert
  to authenticated
  with check (
    created_by = (select auth.uid())
  );

create policy "users can view stock in homes they are a part of"
  on stock
  for select
  using (
    exists (
      select 1 from stores
      join home_members on home_members.home_id = stores.home_id
      where stores.id = stock.store_id
        and home_members.user_id = auth.uid()
    )
  );

create policy "only home members can insert stock"
  on stock
  for insert
  with check (
    exists (
      select 1 from stores
      join home_members on home_members.home_id = stores.home_id
      where stores.id = stock.store_id
        and home_members.user_id = auth.uid()
    )
  );


-- Enable row level security on meals
alter table meals enable row level security;

create policy "only members of home can insert meals"
  on meals
  for insert
  with check (
    exists (
      select 1 from home_members
      where home_members.home_id = meals.home_id
        and home_members.user_id = auth.uid()
    )
  );


-- Enable row level security on recipes
alter table recipes enable row level security;

create policy "only owner can update recipe"
  on recipes
  for update
  using (created_by = auth.uid());

create policy "only owner can delete recipe"
  on recipes
  for delete
  using (created_by = auth.uid());


-- Enable row level security on recipe_steps
alter table recipe_steps enable row level security;

create policy "only owner can insert step"
  on recipe_steps
  for insert
  with check (
    exists (
      select 1 from recipes
      where recipes.id = recipe_steps.recipe_id
        and recipes.created_by = auth.uid()
    )
  );

create policy "only owner can update step"
  on recipe_steps
  for update
  using (
    exists (
      select 1 from recipes
      where recipes.id = recipe_steps.recipe_id
        and recipes.created_by = auth.uid()
    )
  );

create policy "only owner can delete step"
  on recipe_steps
  for delete
  using (
    exists (
      select 1 from recipes
      where recipes.id = recipe_steps.recipe_id
        and recipes.created_by = auth.uid()
    )
  );


-- Enable row level security on recipe_ingredients
alter table recipe_ingredients enable row level security;

create policy "only owner can insert ingredient"
  on recipe_ingredients
  for insert
  with check (
    exists (
      select 1 from recipes
      where recipes.id = recipe_ingredients.recipe_id
        and recipes.created_by = auth.uid()
    )
  );

create policy "only owner can update ingredient"
  on recipe_ingredients
  for update
  using (
    exists (
      select 1 from recipes
      where recipes.id = recipe_ingredients.recipe_id
        and recipes.created_by = auth.uid()
    )
  );

create policy "only owner can delete ingredient"
  on recipe_ingredients
  for delete
  using (
    exists (
      select 1 from recipes
      where recipes.id = recipe_ingredients.recipe_id
        and recipes.created_by = auth.uid()
    )
  );
