begin;
insert into public.shop_products (slug, name, short_description, description, price_cents, currency, status, stock_status, sort_order, published_at)
select 'davanu-karte-' || amount, 'LaLu dāvanu karte — ' || amount || ' €',
  'Dāvini radošu piedzīvojumu, jaunus iespaidus un skaistas atmiņas.',
  'Dāvanu karti vari izmantot, lai iepirktos, kā radošu piedzīvojumu vai lai izmēģinātu ko jaunu. Par izmantošanas iespējām sazinies ar Radošo darbnīcu LaLu.',
  amount * 100, 'EUR', 'published', 'in_stock', amount, now()
from unnest(array[15,25,50,75,100]) as amounts(amount)
on conflict (slug) do nothing;
insert into public.shop_product_categories (product_id, category_id, is_primary)
select p.id, c.id, true
from public.shop_products p cross join public.shop_categories c
where p.slug in ('davanu-karte-15','davanu-karte-25','davanu-karte-50','davanu-karte-75','davanu-karte-100') and c.slug = 'davanu-kartes'
on conflict (product_id, category_id) do nothing;
commit;
