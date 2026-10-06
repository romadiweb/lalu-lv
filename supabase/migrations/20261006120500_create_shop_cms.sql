create extension if not exists pgcrypto;

create table if not exists public.shop_categories (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references public.shop_categories(id) on delete set null,
  slug text not null unique,
  name text not null,
  description text,
  image_url text,
  image_alt text,
  tone text not null default 'cream' check (tone in ('lavender', 'cream', 'warm')),
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint shop_categories_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create table if not exists public.shop_products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  short_description text,
  description text,
  price_cents integer check (price_cents is null or price_cents >= 0),
  currency text not null default 'EUR' check (currency = upper(currency) and char_length(currency) = 3),
  sku text unique,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  stock_status text not null default 'made_to_order' check (stock_status in ('in_stock', 'made_to_order', 'sold_out')),
  is_featured boolean not null default false,
  sort_order integer not null default 0,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint shop_products_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create table if not exists public.shop_product_categories (
  product_id uuid not null references public.shop_products(id) on delete cascade,
  category_id uuid not null references public.shop_categories(id) on delete cascade,
  is_primary boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  primary key (product_id, category_id)
);

create unique index if not exists shop_product_categories_one_primary_idx
  on public.shop_product_categories (product_id)
  where is_primary;

create table if not exists public.shop_product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.shop_products(id) on delete cascade,
  url text not null,
  alt text,
  sort_order integer not null default 0,
  is_primary boolean not null default false,
  created_at timestamptz not null default now()
);

create unique index if not exists shop_product_images_one_primary_idx
  on public.shop_product_images (product_id)
  where is_primary;

create index if not exists shop_categories_parent_sort_idx
  on public.shop_categories (parent_id, sort_order, name);

create index if not exists shop_products_status_sort_idx
  on public.shop_products (status, sort_order, name);

create index if not exists shop_product_categories_category_sort_idx
  on public.shop_product_categories (category_id, sort_order);

create index if not exists shop_product_images_product_sort_idx
  on public.shop_product_images (product_id, sort_order);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists shop_categories_set_updated_at on public.shop_categories;
create trigger shop_categories_set_updated_at
before update on public.shop_categories
for each row execute function public.set_updated_at();

drop trigger if exists shop_products_set_updated_at on public.shop_products;
create trigger shop_products_set_updated_at
before update on public.shop_products
for each row execute function public.set_updated_at();

alter table public.shop_categories enable row level security;
alter table public.shop_products enable row level security;
alter table public.shop_product_categories enable row level security;
alter table public.shop_product_images enable row level security;

revoke all on table public.shop_categories from anon, authenticated;
revoke all on table public.shop_products from anon, authenticated;
revoke all on table public.shop_product_categories from anon, authenticated;
revoke all on table public.shop_product_images from anon, authenticated;

grant select on table public.shop_categories to anon, authenticated;
grant select on table public.shop_products to anon, authenticated;
grant select on table public.shop_product_categories to anon, authenticated;
grant select on table public.shop_product_images to anon, authenticated;

drop policy if exists "Public can read active shop categories" on public.shop_categories;
create policy "Public can read active shop categories"
on public.shop_categories
for select
to anon, authenticated
using (is_active);

drop policy if exists "Public can read published shop products" on public.shop_products;
create policy "Public can read published shop products"
on public.shop_products
for select
to anon, authenticated
using (status = 'published');

drop policy if exists "Public can read visible product category links" on public.shop_product_categories;
create policy "Public can read visible product category links"
on public.shop_product_categories
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.shop_products
    where shop_products.id = shop_product_categories.product_id
      and shop_products.status = 'published'
  )
  and exists (
    select 1
    from public.shop_categories
    where shop_categories.id = shop_product_categories.category_id
      and shop_categories.is_active
  )
);

drop policy if exists "Public can read published product images" on public.shop_product_images;
create policy "Public can read published product images"
on public.shop_product_images
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.shop_products
    where shop_products.id = shop_product_images.product_id
      and shop_products.status = 'published'
  )
);
