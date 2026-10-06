alter table public.shop_products
  add column if not exists external_id text unique,
  add column if not exists old_url text;
