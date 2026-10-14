import { serve } from 'https://deno.land/std@0.190.0/http/server.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

const NP_BASE = 'https://api.nowpayments.io/v1'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const RATE_LIMIT = 5
const SITE = Deno.env.get('SITE_URL')?.replace(/\/$/, '') || 'https://tradersveezy.com'

const PACKAGES: Record<string, { price: number; sessions: number; title: string }> = {
  '1': { price: 300, sessions: 1, title: '1 Session' },
  '3': { price: 750, sessions: 3, title: '3 Sessions' },
  '5': { price: 1000, sessions: 5, title: '5 Sessions' },
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (new URL(req.url).searchParams.get('ping')) return json({ ok: true })

  try {
    const npKey = Deno.env.get('NOWPAYMENTS_API_KEY')
    if (!npKey) throw new Error('NOWPAYMENTS_API_KEY is not set')

    const sb = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } },
    )

    const body = await req.json().catch(() => ({}))
    const packageId = String(body?.packageId ?? '')
    const pkg = PACKAGES[packageId]
    if (!pkg) return json({ error: 'Unknown coaching package.' }, 400)

    let email = String(body?.email ?? '').trim().toLowerCase()
    let userId: string | null = null

    const authHeader = req.headers.get('Authorization')
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.slice(7)
      const { data: userData } = await sb.auth.getUser(token)
      if (userData.user?.email) {
        userId = userData.user.id
        email = userData.user.email.toLowerCase()
      }
    }

    if (!EMAIL_RE.test(email) || email.length > 254) {
      return json({ error: 'Enter a valid email for your booking.' }, 400)
    }

    const since = new Date(Date.now() - 60 * 60 * 1000).toISOString()
    const { count } = await sb
      .from('crypto_payments')
      .select('id', { count: 'exact', head: true })
      .eq('email', email)
      .gte('created_at', since)
    if ((count ?? 0) >= RATE_LIMIT) {
      return json({ error: 'Too many payment attempts. Try again in an hour.' }, 429)
    }

    const product = `coaching-${packageId}`
    const orderId = `tradersveezy-${product}-${crypto.randomUUID()}`

    const invoiceRes = await fetch(`${NP_BASE}/invoice`, {
      method: 'POST',
      headers: { 'x-api-key': npKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        price_amount: pkg.price,
        price_currency: 'usd',
        order_id: orderId,
        order_description: `TraderSveezy Coaching — ${pkg.title}`,
        ipn_callback_url: `${Deno.env.get('SUPABASE_URL')}/functions/v1/nowpayments-webhook`,
        success_url: `${SITE}/coaching?paid=1&pkg=${packageId}&email=${encodeURIComponent(email)}`,
        cancel_url: `${SITE}/coaching`,
      }),
    })

    if (!invoiceRes.ok) {
      const errText = await invoiceRes.text()
      console.error('[coaching-crypto-checkout] NOWPayments error', invoiceRes.status, errText)
      return json({ error: 'Payment provider unavailable. Try again.' }, 502)
    }

    const invoice = await invoiceRes.json()

    await sb.from('crypto_payments').insert({
      user_id: userId,
      email,
      payment_id: invoice.id?.toString() ?? null,
      order_id: invoice.order_id ?? orderId,
      amount: pkg.price,
      currency: 'usd',
      payment_status: 'pending',
      product,
      sessions: pkg.sessions,
    })

    return json({ url: invoice.invoice_url })
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error'
    console.error('[coaching-crypto-checkout]', msg)
    return json({ error: msg }, 500)
  }
})
