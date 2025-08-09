-- Enable required extension
create extension if not exists pgcrypto;

-- Utility: update_updated_at_column trigger function
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Companies table: represents a customer organization
create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  owner_user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.companies enable row level security;

-- Policies for companies
create policy if not exists "Users can view their companies"
  on public.companies
  for select
  to authenticated
  using (
    exists (
      select 1 from public.company_members m
      where m.company_id = companies.id and m.user_id = auth.uid()
    )
  );

create policy if not exists "Users can create their own company as owner"
  on public.companies
  for insert
  to authenticated
  with check (owner_user_id = auth.uid());

create policy if not exists "Only owner can update company"
  on public.companies
  for update
  to authenticated
  using (owner_user_id = auth.uid());

create policy if not exists "Only owner can delete company"
  on public.companies
  for delete
  to authenticated
  using (owner_user_id = auth.uid());

create trigger if not exists update_companies_updated_at
before update on public.companies
for each row execute function public.update_updated_at_column();

-- Company members table: users belonging to a company
create table if not exists public.company_members (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'owner',
  created_at timestamptz not null default now()
);

create unique index if not exists idx_company_members_unique on public.company_members(company_id, user_id);

alter table public.company_members enable row level security;

-- Members can read membership rows for companies they belong to
create policy if not exists "Members can view memberships of their companies"
  on public.company_members
  for select
  to authenticated
  using (
    exists (
      select 1 from public.company_members m
      where m.company_id = company_members.company_id and m.user_id = auth.uid()
    )
  );

-- Only company owner can manage memberships (insert/update/delete)
create policy if not exists "Owner can manage memberships"
  on public.company_members
  for all
  to authenticated
  using (
    exists (
      select 1 from public.companies c
      where c.id = company_members.company_id and c.owner_user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.companies c
      where c.id = company_members.company_id and c.owner_user_id = auth.uid()
    )
  );

-- Auto-add owner as a member when a company is created
create or replace function public.handle_new_company()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.company_members (company_id, user_id, role)
  values (new.id, new.owner_user_id, 'owner')
  on conflict (company_id, user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_company_created on public.companies;
create trigger on_company_created
  after insert on public.companies
  for each row execute procedure public.handle_new_company();

-- Company subscriptions table: one subscription per company
create table if not exists public.company_subscriptions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  stripe_customer_id text,
  subscribed boolean not null default false,
  subscription_tier text,
  subscription_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists idx_company_subscriptions_unique on public.company_subscriptions(company_id);

alter table public.company_subscriptions enable row level security;

-- Members of the company can view subscription status
create policy if not exists "Members can view their company's subscription"
  on public.company_subscriptions
  for select
  to authenticated
  using (
    exists (
      select 1 from public.company_members m
      where m.company_id = company_subscriptions.company_id and m.user_id = auth.uid()
    )
  );

-- No insert/update/delete policies for subscriptions: managed by trusted edge functions using service role key

create trigger if not exists update_company_subscriptions_updated_at
before update on public.company_subscriptions
for each row execute function public.update_updated_at_column();