-- Playbook crypto access (NOWPayments)

create table if not exists public.profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text,
  display_name text,
  playbook_access boolean not null default false,
  playbook_purchased_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles: read own"
  on public.profiles for select
  using (auth.uid() = user_id);

create policy "profiles: update own display"
  on public.profiles for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Clients must not grant themselves playbook_access.
create or replace function public.protect_playbook_access()
returns trigger
language plpgsql
as $$
begin
  if tg_op = 'UPDATE'
     and new.playbook_access is distinct from old.playbook_access
     and auth.uid() is not null
     and (auth.jwt() ->> 'role') is distinct from 'service_role' then
    new.playbook_access := old.playbook_access;
    new.playbook_purchased_at := old.playbook_purchased_at;
  end if;
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists profiles_protect_playbook on public.profiles;
create trigger profiles_protect_playbook
  before update on public.profiles
  for each row execute function public.protect_playbook_access();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (user_id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  )
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create table if not exists public.crypto_payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  email text not null,
  payment_id text,
  order_id text not null unique,
  amount numeric not null,
  currency text not null default 'usd',
  payment_status text not null default 'pending',
  product text not null default 'playbook',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists crypto_payments_email_idx on public.crypto_payments (email);
create index if not exists crypto_payments_status_idx on public.crypto_payments (payment_status);

alter table public.crypto_payments enable row level security;

create policy "crypto_payments: read own"
  on public.crypto_payments for select
  using (auth.uid() = user_id or lower(email) = lower(auth.jwt() ->> 'email'));

-- Paid before signup: hold access against email until claim.
create table if not exists public.crypto_entitlements (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  product text not null default 'playbook',
  order_id text unique,
  claimed_at timestamptz,
  claimed_user_id uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists crypto_entitlements_email_idx
  on public.crypto_entitlements (lower(email));

alter table public.crypto_entitlements enable row level security;
-- No client policies: service role only.

-- Logged-in buyer claims a held entitlement (paid before signup).
create or replace function public.claim_playbook_entitlement()
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  mail text;
  claimed int := 0;
begin
  if uid is null then
    return false;
  end if;

  select lower(email) into mail from auth.users where id = uid;
  if mail is null then
    return false;
  end if;

  update public.crypto_entitlements
  set claimed_at = now(), claimed_user_id = uid
  where product = 'playbook'
    and claimed_at is null
    and lower(email) = mail;

  get diagnostics claimed = row_count;

  if claimed > 0 then
    insert into public.profiles (user_id, email, playbook_access, playbook_purchased_at)
    values (uid, mail, true, now())
    on conflict (user_id) do update
      set playbook_access = true,
          playbook_purchased_at = coalesce(profiles.playbook_purchased_at, now()),
          email = excluded.email,
          updated_at = now();
    return true;
  end if;

  return exists (
    select 1 from public.profiles where user_id = uid and playbook_access = true
  );
end;
$$;

grant execute on function public.claim_playbook_entitlement() to authenticated;
