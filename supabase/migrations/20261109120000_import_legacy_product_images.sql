with legacy_images (product_slug, image_url, image_alt) as (
  values
    (
      'skaista-roku-darinata-lalu-lelle-ar-sominu-milumam-priekam-skaistiem-mirkliem',
      '/images/legacy-products/skaista-roku-darinata-lalu-lelle-ar-sominu.webp',
      'Rokām darināta LaLu lelle ar kleitiņu un somiņu'
    ),
    (
      'zaku-meitenite-kosa-kleitina',
      '/images/legacy-products/zaku-meitenite-kosa-kleitina.webp',
      'Zaķu meitenīte košā kleitiņā'
    ),
    (
      'tamboreta-pele-pele-pelite-miega-nesejina',
      '/images/legacy-products/tamboreta-pele-pele-pelite-miega-nesejina.webp',
      'Tamborēta pele — Pele! Pelīte! Miega nesējiņa!'
    ),
    (
      'tamboreta-pele-ar-astiti-un-koka-taurinu',
      '/images/legacy-products/tamboreta-pele-ar-astiti-un-koka-taurinu.webp',
      'Tamborēta pele ar astīti un koka tauriņu'
    ),
    (
      'adita-miega-pele-pelu-puika-bikses',
      '/images/legacy-products/adita-miega-pele-pelu-puika-bikses.webp',
      'Adīta miega pele — peļu puika biksēs'
    ),
    (
      'tamborets-rotalu-lacis-pekainis',
      '/images/legacy-products/tamborets-rotalu-lacis-pekainis.webp',
      'Tamborēts rotaļu lācis Pekainis ar apkaklīti'
    ),
    (
      'raibs-tamborets-kakis-ar-baltu-purninu-un-asti',
      '/images/legacy-products/raibs-tamborets-kakis-ar-baltu-purninu-un-asti.webp',
      'Raibs tamborēts kaķis ar baltu purniņu un asti'
    )
)
insert into public.shop_product_images (
  product_id,
  url,
  alt,
  sort_order,
  is_primary
)
select
  product.id,
  legacy_images.image_url,
  legacy_images.image_alt,
  0,
  true
from legacy_images
join public.shop_products as product
  on product.slug = legacy_images.product_slug
where not exists (
  select 1
  from public.shop_product_images as existing_image
  where existing_image.product_id = product.id
);
