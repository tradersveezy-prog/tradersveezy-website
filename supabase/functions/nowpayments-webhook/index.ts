import { serve } from 'https://deno.land/std@0.190.0/http/server.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function sortObject(obj: Record<string, unknown>): Record<string, unknown> {
  const sorted: Record<string, unknown> = {}
  for (const key of Object.keys(obj).sort()) {
    sorted[key] = obj[key]
  }
  return sorted
}

async function verifySignature(
  body: Record<string, unknown>,
  sigHeader: string,
  ipnKey: string,
): Promise<boolean> {
  const sorted = sortObject(body)
  const jsonString = JSON.stringify(sorted)
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(ipnKey),
    { name: 'HMAC', hash: 'SHA-512' },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(jsonString))
  const hexSig = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
  return hexSig === sigHeader
}

async function findUserIdByEmail(sb: ReturnType<typeof createClient>, email: string) {
  try {
    for (let page = 1; page <= 20; page++) {
      const { data } = await sb.auth.admin.listUsers({ page, perPage: 200 })
      const users = data?.users ?? []
      const hit = users.find((u) => (u.email ?? '').toLowerCase() === email)
      if (hit) return hit.id as string
      if (users.length < 200) break
    }
  } catch (e) {
    console.error('[nowpayments-webhook] user lookup failed', e)
  }
  return null
}

async function grantPlaybook(sb: ReturnType<typeof createClient>, userId: string) {
  await sb.from('profiles').upsert(
    {
      user_id: userId,
      playbook_access: true,
      playbook_purchased_at: new Date().toISOString(),
    },
    { onConflict: 'user_id' },
  )
}

async function grantCoachingSessions(
  sb: ReturnType<typeof createClient>,
  userId: string,
  sessions: number,
) {
  const { data: profile } = await sb
    .from('profiles')
    .select('coaching_sessions_remaining')
    .eq('user_id', userId)
    .maybeSingle()
  const current = Number(profile?.coaching_sessions_remaining ?? 0) || 0
  await sb.from('profiles').upsert(
    {
      user_id: userId,
      coaching_sessions_remaining: current + sessions,
    },
    { onConflict: 'user_id' },
  )
}

async function notifyAdmin(payload: {
  kind: string
  email: string
  amount?: number
  sessions?: number
  orderId: string
  product: string
}) {
  const inbox = Deno.env.get('NOTIFY_EMAIL')?.trim()
  if (!inbox) {
    console.log('[nowpayments-webhook] NOTIFY_EMAIL not set; skip admin mail', payload)
    return
  }
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(inbox)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `TraderSveezy ${payload.kind} paid`,
        _template: 'table',
        kind: payload.kind,
        email: payload.email,
        product: payload.product,
        amount: payload.amount ?? '',
        sessions: payload.sessions ?? '',
        order_id: payload.orderId,
        message: `${payload.kind} payment confirmed for ${payload.email} (${payload.product}).`,
      }),
    })
    if (!res.ok) console.error('[nowpayments-webhook] notify failed', await res.text())
  } catch (e) {
    console.error('[nowpayments-webhook] notify error', e)
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  try {
    const ipnKey = Deno.env.get('NOWPAYMENTS_IPN_KEY')
    if (!ipnKey) throw new Error('NOWPAYMENTS_IPN_KEY not set')

    const sigHeader = req.headers.get('x-nowpayments-sig')
    if (!sigHeader) {
      return new Response(JSON.stringify({ error: 'Missing signature' }), { status: 400 })
    }

    const body = await req.json()
    const valid = await verifySignature(body, sigHeader, ipnKey)
    if (!valid) {
      console.error('[nowpayments-webhook] invalid signature')
      return new Response(JSON.stringify({ error: 'Invalid signature' }), { status: 403 })
    }

    const sb = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } },
    )

    const paymentStatus = body.payment_status as string
    const orderId: string = body.order_id ?? ''
    const paymentId = body.payment_id?.toString()

    if (!orderId.startsWith('tradersveezy-')) {
      console.log('[nowpayments-webhook] ignoring non-tradersveezy order', orderId)
      return new Response(JSON.stringify({ ok: true, ignored: true }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    if (orderId) {
      await sb
        .from('crypto_payments')
        .update({
          payment_status: paymentStatus,
          payment_id: paymentId,
          updated_at: new Date().toISOString(),
        })
        .eq('order_id', orderId)
    }

    if (paymentStatus === 'confirmed' || paymentStatus === 'finished') {
      const { data: row } = orderId
        ? await sb
            .from('crypto_payments')
            .select('user_id, email, product, sessions, amount')
            .eq('order_id', orderId)
            .maybeSingle()
        : { data: null }

      let userId: string | null = (row?.user_id as string | null) ?? null
      const buyerEmail = String(row?.email ?? '').trim().toLowerCase()
      const product = String(row?.product ?? '')
      const sessions = Number(row?.sessions ?? 0) || 0
      const amount = Number(row?.amount ?? 0) || 0
      const isCoaching = product.startsWith('coaching-') || orderId.includes('-coaching-')

      if (!userId && buyerEmail) {
        userId = await findUserIdByEmail(sb, buyerEmail)
      }

      if (isCoaching) {
        const sess = sessions || (product.endsWith('-5') ? 5 : product.endsWith('-3') ? 3 : 1)
        if (userId) {
          await grantCoachingSessions(sb, userId, sess)
          console.log(`[nowpayments-webhook] coaching +${sess} for ${userId}`)
        } else if (buyerEmail) {
          await sb.from('crypto_entitlements').upsert(
            {
              email: buyerEmail,
              product: product || 'coaching-1',
              order_id: orderId || null,
              sessions: sess,
            },
            { onConflict: 'order_id' },
          )
          console.log(`[nowpayments-webhook] coaching entitlement held for ${buyerEmail}`)
        }
        await notifyAdmin({
          kind: 'coaching',
          email: buyerEmail || 'unknown',
          amount,
          sessions: sess,
          orderId,
          product: product || 'coaching',
        })
      } else {
        if (userId) {
          await grantPlaybook(sb, userId)
          console.log(`[nowpayments-webhook] playbook granted to ${userId}`)
        } else if (buyerEmail) {
          await sb.from('crypto_entitlements').upsert(
            {
              email: buyerEmail,
              product: 'playbook',
              order_id: orderId || null,
            },
            { onConflict: 'order_id' },
          )
          console.log(`[nowpayments-webhook] playbook entitlement held for ${buyerEmail}`)
        }
        await notifyAdmin({
          kind: 'playbook',
          email: buyerEmail || 'unknown',
          amount,
          orderId,
          product: 'playbook',
        })
      }
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error'
    console.error('[nowpayments-webhook]', msg)
    return new Response(JSON.stringify({ error: msg }), { status: 500 })
  }
})
