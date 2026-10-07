create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null,
  excerpt text not null,
  body text[] not null default '{}',
  author_name text not null default 'LaLu darbnīca',
  published_at date not null,
  image_url text not null,
  image_alt text not null,
  image_position text,
  tone text not null default 'neutral' check (tone in ('lavender', 'warm', 'neutral')),
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.workshops (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  intro text not null,
  details text[] not null default '{}',
  duration_label text not null,
  price_label text not null,
  travel_label text not null,
  image_url text not null,
  image_alt text not null,
  cta_label text,
  cta_href text,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.workshop_feature_cards (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  text text not null,
  image_url text not null,
  image_alt text not null,
  status text not null default 'published' check (status in ('draft', 'published', 'archived')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.flower_galleries (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  cover_image_url text,
  cover_image_alt text,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.flower_gallery_items (
  id uuid primary key default gen_random_uuid(),
  gallery_id uuid not null references public.flower_galleries(id) on delete cascade,
  title text,
  description text,
  image_url text not null,
  image_alt text not null,
  image_position text,
  status text not null default 'published' check (status in ('draft', 'published', 'archived')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_status_published_at_idx
  on public.blog_posts (status, published_at desc, sort_order);

create index if not exists workshops_status_sort_idx
  on public.workshops (status, sort_order, title);

create index if not exists workshop_feature_cards_status_sort_idx
  on public.workshop_feature_cards (status, sort_order, title);

create index if not exists flower_galleries_status_sort_idx
  on public.flower_galleries (status, sort_order, title);

create index if not exists flower_gallery_items_gallery_sort_idx
  on public.flower_gallery_items (gallery_id, status, sort_order);

alter table public.blog_posts enable row level security;
alter table public.workshops enable row level security;
alter table public.workshop_feature_cards enable row level security;
alter table public.flower_galleries enable row level security;
alter table public.flower_gallery_items enable row level security;

grant select on public.blog_posts to anon, authenticated;
grant select on public.workshops to anon, authenticated;
grant select on public.workshop_feature_cards to anon, authenticated;
grant select on public.flower_galleries to anon, authenticated;
grant select on public.flower_gallery_items to anon, authenticated;

drop policy if exists "Public can read published blog posts" on public.blog_posts;
create policy "Public can read published blog posts"
  on public.blog_posts for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "Public can read published workshops" on public.workshops;
create policy "Public can read published workshops"
  on public.workshops for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "Public can read published workshop feature cards" on public.workshop_feature_cards;
create policy "Public can read published workshop feature cards"
  on public.workshop_feature_cards for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "Public can read published flower galleries" on public.flower_galleries;
create policy "Public can read published flower galleries"
  on public.flower_galleries for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "Public can read published flower gallery items" on public.flower_gallery_items;
create policy "Public can read published flower gallery items"
  on public.flower_gallery_items for select
  to anon, authenticated
  using (
    status = 'published'
    and exists (
      select 1
      from public.flower_galleries
      where flower_galleries.id = flower_gallery_items.gallery_id
        and flower_galleries.status = 'published'
    )
  );

insert into public.blog_posts (
  slug,
  title,
  category,
  excerpt,
  body,
  author_name,
  published_at,
  image_url,
  image_alt,
  image_position,
  tone,
  status,
  sort_order
) values
  (
    'rudens-lalu-darbnica',
    'Rudens LaLu darbnīcā: krāsas, idejas un jauni darbi',
    'Darbnīcas jaunumi',
    'Jaunākās krāsas, idejas un darbi no LaLu radošās darbnīcas.',
    array[
      'Rudens darbnīcā ienāk ar mierīgākām krāsām, biezākiem pavedieniem un vēlmi radīt lietas, kas sasilda. Plauktos parādās jauni tēli, adījumi un mazi sezonas pārsteigumi, ko var apskatīt klātienē.',
      'Šajā laikā īpaši labi redzams roku darba ritms: katram darbam ir savs valdziņš, sava noskaņa un mazs stāsts. Daļa ideju kļūst par dāvanām, daļa paliek kā iedvesma nākamajām meistarklasēm.',
      'Ja vēlies redzēt, kas šobrīd top, vislabāk ir atbraukt ciemos vai sekot jaunumiem sociālajos tīklos. Darbnīcā vienmēr ir kaut kas, ko pamanīt tikai tuvumā.'
    ],
    'LaLu darbnīca',
    '2026-10-02',
    '/images/rustic-knitted-cats.png',
    'LaLu darināti kaķi pie koka sienas',
    '22% center',
    'warm',
    'published',
    10
  ),
  (
    'fantazijas-ziedi-pec-vasaras',
    'Fantāzijas ziedi, kas turpina ziedēt arī pēc vasaras',
    'Iedvesmai',
    'Iedvesma sezonai un stāsts par ziediem, kas priecē arī pēc vasaras.',
    array[
      'Fantāzijas ziedi nav piesaistīti sezonai. Tie turpina ziedēt arī tad, kad dārzs ārā kļūst klusāks, un tieši tāpēc tie iederas gan mājās, gan dāvanās, gan svētku noformējumā.',
      'Katrs zieds top kā neliela kompozīcija: krāsa, forma un materiāls tiek salikti tā, lai darbs saglabātu vieglumu un prieku. Tie nav vienkārši dekori, bet mazi roku darba akcenti ar raksturu.',
      'Rudenī īpaši skaisti izskatās maigie lavandas, krēmkrāsas un siltie dabas toņi. Tie ļauj vasaras sajūtai palikt klātesošai vēl ilgi pēc tās beigām.'
    ],
    'LaLu darbnīca',
    '2026-09-24',
    '/images/rustic-knitted-cats.png',
    'Roku darba detaļas LaLu darbnīcā',
    '51% center',
    'lavender',
    'published',
    20
  ),
  (
    'ka-top-lalu-teli',
    'Kā top LaLu tēli — no pirmās idejas līdz pēdējam valdziņam',
    'Aizkadrā',
    'Ieskats LaLu tēlu tapšanā — no pirmās ieceres līdz rūpīgi pabeigtai detaļai.',
    array[
      'Katrs tēls sākas ar pavisam vienkāršu jautājumu: kādu sajūtu tam vajadzētu nest? Dažreiz pirmā ir krāsa, citreiz seja, forma vai mazs rakstura pavediens, kas nosaka visu pārējo.',
      'Tālāk seko darbs ar materiālu. Valdziņi, detaļas un proporcijas tiek pielāgotas, līdz tēls sāk izskatīties dzīvs. Šajā procesā nav steigas, jo tieši lēnās izvēles padara roku darbu atpazīstamu.',
      'Pēdējais solis ir raksturs. Acis, aksesuārs vai neliela tekstūra var pilnībā mainīt noskaņu, tāpēc katrs tēls tiek pabeigts tikai tad, kad tas šķiet gatavs satikt savu cilvēku.'
    ],
    'LaLu darbnīca',
    '2026-09-12',
    'https://i.ytimg.com/vi/Gs507EVZiOc/hqdefault.jpg',
    'Ieskats LaLu rokdarbu izstādē',
    null,
    'neutral',
    'published',
    30
  ),
  (
    'ciemosanas-darbnica',
    'Ciemošanās darbnīcā: ko piedzīvot lieliem un maziem',
    'Notikumi',
    'Ko darbnīcas apmeklējumā var piedzīvot ģimenes, skolēni un pieaugušo grupas.',
    array[
      'Ciemošanās darbnīcā ir iespēja ieraudzīt rokdarbus tuvumā un sajust vietu, kur tie top. Apmeklējums var būt mierīga apskate, stāsts par senlietām vai aktīvāka programma ar pagalma piedzīvojumiem.',
      'Ģimenēm un skolēnu grupām patīk iespēja darboties, pētīt un jautāt. Pieaugušajiem bieži visvairāk paliek atmiņā Vectēva stāsts, darbnīcas noskaņa un sarunas par lietām, kas darinātas ar rokām.',
      'Programmu var pielāgot grupai, laikam un notikumam. Pirms braukšanas vislabāk sazināties, lai vienotos par datumu, cilvēku skaitu un to, vai ciemošanos papildināt ar degustāciju vai meistarklasi.'
    ],
    'LaLu darbnīca',
    '2026-08-30',
    'https://lastatic.ams3.cdn.digitaloceanspaces.com/2013/10/g1/Tirdzins_KM_72.jpg',
    'LaLu darinājumi un priekšnesums Vērmaņdārzā',
    '58% center',
    'warm',
    'published',
    40
  )
on conflict (slug) do update set
  title = excluded.title,
  category = excluded.category,
  excerpt = excluded.excerpt,
  body = excluded.body,
  author_name = excluded.author_name,
  published_at = excluded.published_at,
  image_url = excluded.image_url,
  image_alt = excluded.image_alt,
  image_position = excluded.image_position,
  tone = excluded.tone,
  status = excluded.status,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.workshops (
  slug,
  title,
  intro,
  details,
  duration_label,
  price_label,
  travel_label,
  image_url,
  image_alt,
  cta_label,
  cta_href,
  status,
  sort_order
) values
  (
    'atstarotaju-meistarklase',
    'Izveido savu unikālo atstarotāju',
    'Sirsnīga un praktiska meistarklase, kurā katrs izveido savu pašdarinātu atstarotāju.',
    array[
      'Skaists un praktisks aksesuārs drošībai tumsā',
      'Katrs dalībnieks mājās dodas ar gatavu darbu',
      'Piemērota pieaugušajiem, bērniem un grupām'
    ],
    'Aptuveni 0,5 stundas',
    'Dalības maksa: 3 eiro',
    'Piedāvāju izbraukuma meistarklases',
    '/images/atstarotaji.jpg',
    'Latviskas lentes atstarotāji uz koka virsmas',
    'Pieteikties meistarklasei',
    '/pieteikties/',
    'published',
    10
  ),
  (
    'piespraudes-brosas-meistarklase',
    'Izveido savu unikālo piespraudi vai brošu',
    'Radoša nodarbība, kurā top paša darināta piespraude latviskā vai ziedu noskaņā.',
    array[
      'Var izvēlēties krāsas, detaļas un noskaņu',
      'Katrs dalībnieks mājās dodas ar savu piespraudi',
      'Piemērota kolektīviem, nometnēm un svētku grupām'
    ],
    'Aptuveni 1 stunda',
    'Dalības maksa: 10 eiro',
    'Piedāvāju izbraukuma meistarklases',
    '/images/piespraude.jpg',
    'Sarkanas un baltas latviskas brošas uz koka virsmas',
    'Pieteikties meistarklasei',
    '/pieteikties/',
    'published',
    20
  )
on conflict (slug) do update set
  title = excluded.title,
  intro = excluded.intro,
  details = excluded.details,
  duration_label = excluded.duration_label,
  price_label = excluded.price_label,
  travel_label = excluded.travel_label,
  image_url = excluded.image_url,
  image_alt = excluded.image_alt,
  cta_label = excluded.cta_label,
  cta_href = excluded.cta_href,
  status = excluded.status,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.workshop_feature_cards (
  title,
  text,
  image_url,
  image_alt,
  status,
  sort_order
) values
  (
    'Materiāli iekļauti',
    'Dzija, pamata instrumenti un sagataves būs gaidīšanas kārtībā, lai nodarbību var sākt mierīgi.',
    '/images/custom-icons/cozy-crochet-craft-bundle.png',
    'Dzija, tamboradata un tekstila lente meistarklases materiāliem',
    'published',
    10
  ),
  (
    'Bez pieredzes',
    'Soli pa solim var pievienoties arī tad, ja rokdarbi līdz šim ir tikai interesējuši no malas.',
    '/images/custom-icons/buttery-yellow-crochet-star-plush.png',
    'Dzeltens tamborēts zvaigznes formas mīkstais darbs',
    'published',
    20
  ),
  (
    'Grupām piemērots',
    'Meistarklasi var pielāgot ģimenēm, skolēniem, kolēģiem vai nelielām svētku grupām.',
    '/images/custom-icons/crocheted-amigurumi-community-trio.png',
    'Trīs tamborēti cilvēciņi grupas nodarbības noskaņai',
    'published',
    30
  )
on conflict do nothing;

insert into public.flower_galleries (
  slug,
  title,
  description,
  status,
  sort_order
) values (
  'fantazijas-ziedi',
  'Fantāzijas ziedi',
  'Galerija gatava CMS pievienotajiem fantāzijas ziedu darbiem.',
  'draft',
  10
)
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  sort_order = excluded.sort_order,
  updated_at = now();
