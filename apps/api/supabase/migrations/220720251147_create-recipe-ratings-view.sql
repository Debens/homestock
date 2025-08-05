create view recipe_ratings as
select
  recipe_id,
  avg(rating)::numeric(3,2) as average_rating,
  count(*) as total_ratings
from recipe_reviews
group by recipe_id;
