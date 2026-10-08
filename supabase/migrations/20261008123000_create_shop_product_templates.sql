create table if not exists public.shop_product_templates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category_id uuid references public.shop_categories(id) on delete set null,
  template_text text not null default '',
  status text not null default 'published' check (status in ('draft', 'published', 'archived')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists shop_product_templates_status_sort_idx
  on public.shop_product_templates (status, sort_order, title);

create index if not exists shop_product_templates_category_sort_idx
  on public.shop_product_templates (category_id, sort_order, title);

drop trigger if exists shop_product_templates_set_updated_at on public.shop_product_templates;
create trigger shop_product_templates_set_updated_at
before update on public.shop_product_templates
for each row execute function public.set_updated_at();

alter table public.shop_product_templates enable row level security;

revoke all on table public.shop_product_templates from anon, authenticated;
grant select on table public.shop_product_templates to anon, authenticated;

drop policy if exists "Public can read published shop product templates" on public.shop_product_templates;
create policy "Public can read published shop product templates"
on public.shop_product_templates
for select
to anon, authenticated
using (status = 'published');
