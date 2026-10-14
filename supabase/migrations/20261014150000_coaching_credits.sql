-- Coaching session credits (NOWPayments)

alter table public.profiles
  add column if not exists coaching_sessions_remaining integer not null default 0;

create or replace function public.protect_playbook_access()
returns trigger
language plpgsql
as $$
begin
  if tg_op = 'UPDATE'
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

alter table public.crypto_payments
  add column if not exists sessions integer;

alter table public.crypto_entitlements
  add column if not exists sessions integer;

-- Claim held coaching entitlements (paid before signup).
create or replace function public.claim_coaching_entitlement()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  mail text;
  add_sessions int := 0;
begin
  if uid is null then
    return 0;
  end if;

  select lower(email) into mail from auth.users where id = uid;
  if mail is null then
    return 0;
  end if;

  select coalesce(sum(sessions), 0)::int into add_sessions
  from public.crypto_entitlements
  where product like 'coaching-%'
    and claimed_at is null
    and lower(email) = mail;

  if add_sessions > 0 then
    update public.crypto_entitlements
    set claimed_at = now(), claimed_user_id = uid
    where product like 'coaching-%'
      and claimed_at is null
      and lower(email) = mail;

    insert into public.profiles (user_id, email, coaching_sessions_remaining)
    values (uid, mail, add_sessions)
    on conflict (user_id) do update
      set coaching_sessions_remaining =
            profiles.coaching_sessions_remaining + excluded.coaching_sessions_remaining,
          email = excluded.email,
          updated_at = now();
  end if;

  return coalesce(
    (select coaching_sessions_remaining from public.profiles where user_id = uid),
    0
  );
end;
$$;

grant execute on function public.claim_coaching_entitlement() to authenticated;
