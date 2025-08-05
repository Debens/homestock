create table if not exists profiles (
  id uuid not null references auth.users on delete cascade,
  profile_no serial unique,
  first_name text,
  last_name text,

  primary key (id)
);
