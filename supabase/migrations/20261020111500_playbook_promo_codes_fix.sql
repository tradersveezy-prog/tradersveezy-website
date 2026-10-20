-- Safe finish if 20261020110000 failed on "policy already exists".
-- Paste this whole file in Supabase → SQL Editor → Run.

-- Allow SECURITY DEFINER helpers to grant playbook / coaching fields.
create or replace function public.protect_playbook_access()
returns trigger
language plpgsql
as $$
begin
  if tg_op = 'UPDATE'
     and coalesce(current_setting('app.grant_entitlements', true), '') is distinct from 'on'
     and auth.uid() is not null
     and (auth.jwt() ->> 'role') is distinct from 'service_role' then
    if new.playbook_access is distinct from old.playbook_access then
      new.playbook_access := old.playbook_access;
      new.playbook_purchased_at := old.playbook_purchased_at;
    end if;
    if new.coaching_sessions_remaining is distinct from old.coaching_sessions_remaining then
      new.coaching_sessions_remaining := old.coaching_sessions_remaining;
    end if;
  end if;
  new.updated_at := now();
  return new;
end;
$$;

create table if not exists public.promo_codes (
  code text primary key,
  product text not null default 'playbook',
  active boolean not null default true,
  max_redemptions int,
  redemption_count int not null default 0,
  note text,
  created_at timestamptz not null default now()
);

alter table public.promo_codes enable row level security;

create table if not exists public.promo_redemptions (
  id uuid primary key default gen_random_uuid(),
  code text not null references public.promo_codes (code) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (code, user_id)
);

create index if not exists promo_redemptions_user_idx on public.promo_redemptions (user_id);

alter table public.promo_redemptions enable row level security;

drop policy if exists "promo_redemptions: read own" on public.promo_redemptions;
create policy "promo_redemptions: read own"
  on public.promo_redemptions for select
  using (auth.uid() = user_id);

insert into public.promo_codes (code, product, active, note)
values ('FAM', 'playbook', true, 'Family / friends — full playbook unlock')
on conflict (code) do update
  set active = true,
      product = excluded.product,
      note = excluded.note;

create or replace function public.redeem_playbook_promo(p_code text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  mail text;
  normalized text;
  promo public.promo_codes%rowtype;
begin
  if uid is null then
    return jsonb_build_object('ok', false, 'error', 'Sign in first.');
  end if;

  normalized := upper(trim(coalesce(p_code, '')));
  if normalized = '' then
    return jsonb_build_object('ok', false, 'error', 'Enter a promo code.');
  end if;

  select * into promo from public.promo_codes where code = normalized for update;
  if not found or not promo.active then
    return jsonb_build_object('ok', false, 'error', 'That code is not valid.');
  end if;

  if promo.product is distinct from 'playbook' then
    return jsonb_build_object('ok', false, 'error', 'That code is not for the playbook.');
  end if;

  if promo.max_redemptions is not null and promo.redemption_count >= promo.max_redemptions then
    return jsonb_build_object('ok', false, 'error', 'That code has been fully used.');
  end if;

  if exists (
    select 1 from public.profiles where user_id = uid and playbook_access = true
  ) then
    return jsonb_build_object('ok', true, 'already', true);
  end if;

  if exists (
    select 1 from public.promo_redemptions where code = normalized and user_id = uid
  ) then
    null;
  else
    insert into public.promo_redemptions (code, user_id) values (normalized, uid);
    update public.promo_codes
      set redemption_count = redemption_count + 1
      where code = normalized;
  end if;

  select lower(email) into mail from auth.users where id = uid;

  perform set_config('app.grant_entitlements', 'on', true);

  insert into public.profiles (user_id, email, playbook_access, playbook_purchased_at)
  values (uid, mail, true, now())
  on conflict (user_id) do update
    set playbook_access = true,
        playbook_purchased_at = coalesce(profiles.playbook_purchased_at, now()),
        email = coalesce(excluded.email, profiles.email),
        updated_at = now();

  return jsonb_build_object('ok', true, 'code', normalized);
end;
$$;

grant execute on function public.redeem_playbook_promo(text) to authenticated;

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
    perform set_config('app.grant_entitlements', 'on', true);
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
