create view normalised_stock as
select
  stock.*,
  stores.home_id
from
  stock
join
  stores on stock.store_id = stores.id;
