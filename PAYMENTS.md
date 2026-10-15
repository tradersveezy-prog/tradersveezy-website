# Playbook crypto checkout (NOWPayments)

Course 01 stays free with an account. Courses 02–05 need `$250` crypto (NOWPayments).

## You do these steps once

### 1. Site `.env` (this computer)

Create `/Users/sv/Code/tradersveezy-website/.env`:

```bash
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=paste-anon-public-key
```

From Supabase → Project Settings → API.

Restart `npm run dev` after saving.

### 2. Database

In Supabase → SQL Editor, paste and run the file:

`supabase/migrations/20261014140000_playbook_payments.sql`

(Or: `npx supabase db push` after linking the project.)

### 3. Deploy edge functions

```bash
cd /Users/sv/Code/tradersveezy-website
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase secrets set NOWPAYMENTS_API_KEY=your_api_key
npx supabase secrets set NOWPAYMENTS_IPN_KEY=your_ipn_secret
npx supabase secrets set SITE_URL=https://tradersveezy.com
npx supabase functions deploy playbook-crypto-checkout
npx supabase functions deploy coaching-crypto-checkout
npx supabase functions deploy nowpayments-webhook
# Optional: get emailed on every paid order (FormSubmit)
npx supabase secrets set NOTIFY_EMAIL=you@yourdomain.com
```

Also run SQL migration `supabase/migrations/20261014150000_coaching_credits.sql` in the SQL Editor.

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are injected automatically on hosted functions.

**Waitlist = pay $250 now** (Course 01 start today; full playbook opens soon).  
**Coaching** packages: $300 / $750 / $1000 — credits on `profiles.coaching_sessions_remaining`.

### 4. NOWPayments IPN

NOWPayments → Settings → IPN callback URL:

```
https://YOUR_PROJECT_REF.supabase.co/functions/v1/nowpayments-webhook
```

Use a **different** URL than MintScript’s webhook.

### 5. Auth URLs

Supabase → Authentication → URL configuration:

- **Site URL:** `https://tradersveezy.com` (not localhost — password reset / confirm emails use this)
- **Redirect URLs:** `https://tradersveezy.com/**` and `http://127.0.0.1:5173/**`

The site always requests reset links with `redirectTo=https://tradersveezy.com/account`.

## Test

1. Open `/courses#buy`
2. Pay with crypto (small test invoice on NOWPayments sandbox if you use one)
3. After confirm, `/desk` should show playbook unlocked
4. Open Course 02

## Files

| Piece | Path |
|--------|------|
| Checkout | `supabase/functions/playbook-crypto-checkout` |
| Webhook | `supabase/functions/nowpayments-webhook` |
| Schema | `supabase/migrations/20261014140000_playbook_payments.sql` |
| Pay UI | `src/pages/Courses.tsx` `#buy` |
