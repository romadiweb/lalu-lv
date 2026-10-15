begin;
create table if not exists public.shop_colors (
 id uuid primary key default gen_random_uuid(),
 name text not null unique check (length(trim(name)) > 0),
 sort_order integer not null default 0,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create table if not exists public.shop_product_colors (
 product_id uuid not null references public.shop_products(id) on delete cascade,
 color_id uuid not null references public.shop_colors(id) on delete cascade,
 primary key(product_id,color_id)
);
create index if not exists shop_product_colors_color_idx on public.shop_product_colors(color_id);
alter table public.shop_colors enable row level security;
alter table public.shop_product_colors enable row level security;
revoke all on public.shop_colors, public.shop_product_colors from anon, authenticated;
grant select on public.shop_colors, public.shop_product_colors to anon, authenticated;
drop policy if exists "Public can read colors" on public.shop_colors;
create policy "Public can read colors" on public.shop_colors for select to anon, authenticated using (true);
drop policy if exists "Public can read published product colors" on public.shop_product_colors;
create policy "Public can read published product colors" on public.shop_product_colors for select to anon, authenticated
 using (exists (select 1 from public.shop_products where id = product_id and status = 'published'));
drop trigger if exists shop_colors_set_updated_at on public.shop_colors;
create trigger shop_colors_set_updated_at before update on public.shop_colors for each row execute function public.set_updated_at();
insert into public.shop_colors(name,sort_order) values
 ('Balta',10),('Melna',20),('Pelēka',30),('Sarkana',40),('Oranža',50),('Dzeltena',60),('Zaļa',70),('Zila',80),('Gaiši zila',90),('Violeta',100),('Rozā',110),('Brūna',120),('Bēša',130),('Krēmkrāsa',140),('Bordo',150),('Tirkīza',160),('Zelta',170),('Sudraba',180),('Daudzkrāsaina',190)
on conflict (name) do nothing;
commit;
