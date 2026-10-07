create table if not exists public.blog_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_categories_sort_idx
  on public.blog_categories (sort_order, name);

alter table public.blog_categories enable row level security;

revoke all on public.blog_categories from anon, authenticated;
grant select on public.blog_categories to anon, authenticated;

drop policy if exists "Public can read blog categories" on public.blog_categories;
create policy "Public can read blog categories"
  on public.blog_categories for select
  to anon, authenticated
  using (true);

insert into public.blog_categories (name, slug, sort_order) values
  ('Darbnīcas jaunumi', 'darbnicas-jaunumi', 10),
  ('Iedvesmai', 'iedvesmai', 20),
  ('Aizkadrā', 'aizkadra', 30),
  ('Notikumi', 'notikumi', 40)
on conflict (name) do nothing;

insert into public.blog_categories (name, slug, sort_order)
select
  category,
  trim(both '-' from regexp_replace(
    translate(lower(category), 'āčēģīķļņšūž', 'acegiklnsuz'),
    '[^a-z0-9]+',
    '-',
    'g'
  )),
  row_number() over (order by min(sort_order), category) * 10
from public.blog_posts
where nullif(trim(category), '') is not null
group by category
on conflict (name) do nothing;
