-- Founder dashboard aggregates (email allowlist only).

create or replace function public.is_founder()
returns boolean
language sql
stable
as $$
  select lower(coalesce(auth.jwt() ->> 'email', '')) in (
    'tradersveezy@gmail.com',
    'sumant.vasan@gmail.com'
  );
$$;

create or replace function public.founder_dashboard()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  out jsonb;
begin
  if not public.is_founder() then
    raise exception 'not authorized';
  end if;

  select jsonb_build_object(
    'generated_at', now(),
    'users_total', (select count(*)::int from public.profiles),
    'users_7d', (
      select count(*)::int from public.profiles
      where created_at >= now() - interval '7 days'
    ),
    'users_30d', (
      select count(*)::int from public.profiles
      where created_at >= now() - interval '30 days'
    ),
    'playbook_unlocked', (
      select count(*)::int from public.profiles where playbook_access = true
    ),
    'playbook_unlocked_7d', (
      select count(*)::int from public.profiles
      where playbook_access = true
        and playbook_purchased_at >= now() - interval '7 days'
    ),
    'promo_redemptions', (
      select count(*)::int from public.promo_redemptions
    ),
    'promo_fam', (
      select count(*)::int from public.promo_redemptions where code = 'FAM'
    ),
    'payments_paid', (
      select count(*)::int from public.crypto_payments
      where payment_status in ('finished', 'confirmed', 'sending')
    ),
    'payments_pending', (
      select count(*)::int from public.crypto_payments
      where payment_status in ('waiting', 'confirming', 'partially_paid', 'pending')
    ),
    'coaching_credits_open', (
      select coalesce(sum(coaching_sessions_remaining), 0)::int from public.profiles
    ),
    'recent_users', (
      select coalesce(jsonb_agg(row_to_json(t)::jsonb order by t.created_at desc), '[]'::jsonb)
      from (
        select
          p.email,
          p.display_name,
          p.playbook_access,
          p.created_at,
          p.playbook_purchased_at,
          coalesce(p.coaching_sessions_remaining, 0) as coaching_sessions_remaining,
          (
            select string_agg(pr.code, ', ' order by pr.created_at)
            from public.promo_redemptions pr
            where pr.user_id = p.user_id
          ) as promo_codes
        from public.profiles p
        order by p.created_at desc
        limit 40
      ) t
    ),
    'recent_payments', (
      select coalesce(jsonb_agg(row_to_json(t)::jsonb order by t.created_at desc), '[]'::jsonb)
      from (
        select
          email,
          product,
          amount,
          currency,
          payment_status,
          order_id,
          created_at
        from public.crypto_payments
        order by created_at desc
        limit 20
      ) t
    )
  ) into out;

  return out;
end;
$$;

revoke all on function public.is_founder() from public;
revoke all on function public.founder_dashboard() from public;
grant execute on function public.is_founder() to authenticated;
grant execute on function public.founder_dashboard() to authenticated;
