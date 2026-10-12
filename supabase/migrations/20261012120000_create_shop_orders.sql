create table if not exists public.shop_orders (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'pending' check (
    status in ('pending', 'paid', 'payment_mismatch', 'cancelled', 'refunded')
  ),
  provider text not null default 'paysera',
  amount_cents integer not null check (amount_cents > 0),
  currency text not null default 'EUR' check (currency = upper(currency) and char_length(currency) = 3),
  items jsonb not null default '[]'::jsonb,
  provider_request_id text,
  provider_payload jsonb,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists shop_orders_status_created_idx
  on public.shop_orders (status, created_at desc);

create index if not exists shop_orders_provider_request_idx
  on public.shop_orders (provider, provider_request_id);

drop trigger if exists shop_orders_set_updated_at on public.shop_orders;
create trigger shop_orders_set_updated_at
before update on public.shop_orders
for each row execute function public.set_updated_at();

alter table public.shop_orders enable row level security;

revoke all on table public.shop_orders from anon, authenticated;
