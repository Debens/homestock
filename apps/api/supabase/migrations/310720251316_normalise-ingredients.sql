create extension if not exists pg_trgm;
create extension if not exists unaccent;

create or replace function normalize_text(text) returns text as $$
  select lower(
           trim(
             regexp_replace(
               unaccent(
                 regexp_replace($1, '[,.\-()]+', ' ', 'g')
               ),
               '\s+',
               ' ',
               'g'
             )
           )
         );
$$ language sql immutable;

-- 1. add normalized_name generated column
alter table ingredients
add column normalized_name text generated always as (
  normalize_text(name)
) stored;

-- 2. add unique constraint on normalized_name
alter table ingredients
add constraint unique_normalized_name unique (normalized_name);

create or replace function find_ingredient(input text)
returns table (
  id uuid,
  name text,
  sml float
) as $$
  select id, name, similarity(normalized_name, normalize_text(input)) as sml
  from ingredients
  where similarity(normalized_name, normalize_text(input)) > 0.4
  order by sml desc
  limit 10;
$$ language sql stable;

