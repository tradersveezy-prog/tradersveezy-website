-- MintScript paid members unlock (promo MINT). Safe to re-run.

insert into public.promo_codes (code, product, active, note)
values ('MINT', 'playbook', true, 'Paying MintScript members — full playbook unlock')
on conflict (code) do update
  set active = true,
      product = excluded.product,
      note = excluded.note;

-- Keep FAM active as well.
insert into public.promo_codes (code, product, active, note)
values ('FAM', 'playbook', true, 'Family / friends — full playbook unlock')
on conflict (code) do update
  set active = excluded.active,
      product = excluded.product,
      note = excluded.note;
