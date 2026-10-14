create table if not exists public.homepage_reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  quote text,
  rating integer not null default 5 check (rating between 1 and 5),
  source_label text not null default 'Google atsauksme',
  status text not null default 'published' check (status in ('draft', 'published', 'archived')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists homepage_reviews_status_sort_idx
  on public.homepage_reviews (status, sort_order, created_at);

alter table public.homepage_reviews enable row level security;

grant select on public.homepage_reviews to anon, authenticated;

drop policy if exists "Public can read published homepage reviews" on public.homepage_reviews;
create policy "Public can read published homepage reviews"
  on public.homepage_reviews for select
  to anon, authenticated
  using (status = 'published');

insert into public.homepage_reviews (name, quote, rating, source_label, status, sort_order)
select seed.name, seed.quote, 5, 'Google atsauksme', 'published', seed.sort_order
from (
  values
    ('Jolanta G.', 'Ļoti jauka vieta, burvīgas pašdarinātas lellītes un arī ļoti interesanta senlietu kolekcija.', 10),
    ('Līga Z.', 'Burvīga, ideju pilna un radoša vieta Aizputē.', 20),
    ('Diana D.', 'Ļoti silta sagaidīšana. Interesanta prezentācija un ļoti laba fantāzija.', 30),
    ('Sandija A.', 'Ļoti skaista vieta, fantastiski pasniegts stāstījums un jauka, sirsnīga vadītāja.', 40),
    ('Māra V.', 'Iesaku ģimenēm. Jauniešiem var pieteikt radošās darbnīcas.', 50),
    ('Sandra K.', 'Bērniem patika atrakcijas, interesantā pasaku taka un izveidotais namiņš.', 60),
    ('Ivars L.', 'Izcili skaista vieta!', 70),
    ('Oksana H.', null, 80),
    ('Gunita B.', null, 90)
) as seed(name, quote, sort_order)
where not exists (select 1 from public.homepage_reviews);
