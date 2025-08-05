create table if not exists list_items (
  id uuid not null unique,
  list_id uuid not null references lists(id) on delete cascade,
  name text not null,
  quantity bigint not null default 0,
  status text not null check (status in ('pending', 'resolved', 'removed')),

  created_at timestamptz default now(),
  created_by uuid not null references auth.users(id) on delete cascade,
  resolved_by uuid not null references auth.users(id) on delete cascade,

  primary key (id)
);

alter table list_items enable row level security;

create policy "authenticated users can create list items"
  on list_items
  for insert
  to authenticated
  with check (
    true
  );

create policy "users can create their own items"
  on list_items
  for insert
  to authenticated
  with check (
    created_by = (select auth.uid())
  );

create policy "users can view list items in homes they are a part of"
  on list_items
  for select
  using (
    exists (
      select 1 from lists
      join home_members on home_members.home_id = lists.home_id
      where lists.id = list_items.list_id
        and home_members.user_id = auth.uid()
    )
  );

create policy "only home members can insert list items"
  on list_items
  for insert
  with check (
    exists (
      select 1 from lists
      join home_members on home_members.home_id = lists.home_id
      where lists.id = list_items.list_id
        and home_members.user_id = auth.uid()
    )
  );

