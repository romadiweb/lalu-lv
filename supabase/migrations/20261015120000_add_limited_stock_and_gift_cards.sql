begin;
alter table public.shop_products add column if not exists is_limited_stock boolean not null default false;
insert into public.shop_categories (slug, name, description, image_url, image_alt, tone, sort_order, is_active, parent_id)
values ('davanu-kartes', 'Dāvanu kartes', 'Dāvini radošu piedzīvojumu, jaunus iespaidus un skaistas atmiņas.', '/images/category-icons/dazadi-warm.png', 'LaLu dāvanas', 'lavender', 31, true, (select id from public.shop_categories where slug = 'davanas'))
on conflict (slug) do update set name = excluded.name, description = excluded.description, parent_id = excluded.parent_id, is_active = true;
commit;
