alter table public.shop_products
  add column if not exists is_washable boolean not null default false,
  add column if not exists is_top_product boolean not null default false;

insert into public.shop_categories
  (slug, name, description, image_url, image_alt, tone, sort_order, is_active)
values
  (
    'apgerbs',
    'Apģērbs',
    'Adīti un tamborēti aksesuāri ikdienai.',
    '/images/category-icons/cepures-warm.png',
    'Adīti apģērba aksesuāri',
    'warm',
    20,
    true
  ),
  (
    'davanas',
    'Dāvanas',
    'Nelieli, sirsnīgi roku darba nieki dāvanām.',
    '/images/category-icons/dazadi-warm.png',
    'Rokdarbu sirds, zieds un smaržu maisiņš',
    'lavender',
    50,
    true
  ),
  (
    'ziedi',
    'Ziedi',
    'Ziedi, kuri paliek ilgāk par sezonu.',
    '/images/category-icons/fantazijas-ziedi-warm.png',
    'Maigi rozā fantāzijas zieds',
    'lavender',
    50,
    true
  ),
  (
    'lelles',
    'Lelles',
    'Mīkstas lelles rotaļām un dāvināšanai.',
    '/images/category-icons/rotallietas-warm.png',
    'Roku darinātas rotaļlietas',
    'cream',
    12,
    true
  ),
  (
    'grabulisi',
    'Grabulīši',
    'Mazajiem piemēroti grabulīši.',
    '/images/category-icons/rotallietas-warm.png',
    'Tamborēts lācis, zaķis un koka grabulis',
    'warm',
    13,
    true
  )
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  image_url = excluded.image_url,
  image_alt = excluded.image_alt,
  tone = excluded.tone,
  sort_order = excluded.sort_order,
  is_active = true;

update public.shop_categories child
set parent_id = parent.id
from public.shop_categories parent
where child.slug = 'peles'
  and parent.slug = 'rotallietas';

update public.shop_categories child
set parent_id = parent.id
from public.shop_categories parent
where child.slug in ('lelles', 'grabulisi')
  and parent.slug = 'rotallietas';

update public.shop_categories child
set parent_id = parent.id
from public.shop_categories parent
where child.slug in ('cepures', 'cimdi', 'mauci-jeb-durgali')
  and parent.slug = 'apgerbs';

update public.shop_categories child
set parent_id = parent.id
from public.shop_categories parent
where child.slug in ('atstarotaji', 'magnetini')
  and parent.slug = 'davanas';

update public.shop_categories child
set parent_id = parent.id
from public.shop_categories parent
where child.slug = 'fantazijas-ziedi'
  and parent.slug = 'ziedi';

update public.shop_categories
set parent_id = null,
  sort_order = case slug
    when 'rotallietas' then 10
    when 'apgerbs' then 20
    when 'davanas' then 30
    when 'ziedi' then 40
    when 'pasutijumi' then 50
    else sort_order
  end
where slug in ('rotallietas', 'apgerbs', 'davanas', 'ziedi', 'pasutijumi');

update public.shop_categories
set name = 'Individuāli pasūtījumi'
where slug = 'pasutijumi';

update public.shop_categories
set name = 'Latviskie darbi'
where slug = 'atstarotaji';

insert into public.shop_product_categories (product_id, category_id, is_primary, sort_order)
select links.product_id, target.id, false, links.sort_order
from public.shop_product_categories links
join public.shop_categories source on source.id = links.category_id
join public.shop_categories target on target.slug = 'davanas'
where source.slug = 'atslegu-piekarini'
on conflict (product_id, category_id) do update set
  sort_order = excluded.sort_order;

delete from public.shop_product_categories links
using public.shop_categories source
where source.id = links.category_id
  and source.slug = 'atslegu-piekarini';

update public.shop_categories
set is_active = false
where slug in ('atslegu-piekarini', 'dazadi');
