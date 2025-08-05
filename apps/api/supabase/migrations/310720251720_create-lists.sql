create table if not exists lists (
  id uuid not null unique,
  home_id uuid not null references homes(id) on delete cascade,

  created_at timestamptz default now(),

  primary key (id)
);

alter table lists enable row level security;

create policy "authenticated users can create lists"
  on lists
  for insert
  to authenticated
  with check (
    true
  );

create policy "only home members can insert lists"
  on lists
  for insert
  with check (
    exists (
      select 1 from home_members
      where home_members.home_id = lists.home_id
        and home_members.user_id = auth.uid()
    )
  );


create policy "users can view lists in homes they are a part of"
  on lists
  for select
  using (
    exists (
      select 1 from home_members
      where home_members.home_id = lists.home_id
        and home_members.user_id = (select auth.uid())
    )
  );

