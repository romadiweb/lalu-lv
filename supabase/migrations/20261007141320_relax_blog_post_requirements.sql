alter table public.blog_posts
  alter column excerpt set default '',
  alter column published_at set default current_date,
  alter column image_url drop not null,
  alter column image_alt drop not null;
