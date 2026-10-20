import { supabase, supabaseConfigured } from './supabase'

export const PLAYBOOK_PRICE_USD = 250

const PENDING_PROMO_KEY = 'ts_pending_promo'
const LOCAL_PLAYBOOK_KEY = 'ts_playbook_access'

export function stashPendingPromo(code: string) {
  const normalized = code.trim().toUpperCase()
  if (!normalized) return
  try {
    sessionStorage.setItem(PENDING_PROMO_KEY, normalized)
  } catch {
    /* ignore */
  }
}

export function takePendingPromo(): string {
  try {
    const v = sessionStorage.getItem(PENDING_PROMO_KEY) || ''
    sessionStorage.removeItem(PENDING_PROMO_KEY)
    return v
  } catch {
    return ''
  }
}

function setLocalPlaybookAccess(on: boolean) {
  try {
    if (on) localStorage.setItem(LOCAL_PLAYBOOK_KEY, '1')
    else localStorage.removeItem(LOCAL_PLAYBOOK_KEY)
  } catch {
    /* ignore */
  }
}

export function hasLocalPlaybookAccess() {
  try {
    return localStorage.getItem(LOCAL_PLAYBOOK_KEY) === '1'
  } catch {
    return false
  }
}

/** Claim any held crypto entitlements for this email onto the logged-in user. */
export async function claimPlaybookEntitlements(userId: string, email: string) {
  if (!supabase) return false
  void userId
  void email

  const { error } = await supabase.rpc('claim_playbook_entitlement')
  if (error) {
    console.warn('[playbook] claim rpc', error.message)
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('playbook_access')
    .eq('user_id', userId)
    .maybeSingle()
  return Boolean(profile?.playbook_access)
}

export type RedeemPromoResult = { ok: boolean; error?: string; already?: boolean }

/** Redeem a playbook promo (e.g. FAM). Requires a signed-in session when Supabase is live. */
export async function redeemPlaybookPromo(code: string): Promise<RedeemPromoResult> {
  const normalized = code.trim().toUpperCase()
  if (!normalized) return { ok: false, error: 'Enter a promo code.' }

  if (!supabaseConfigured || !supabase) {
    if (normalized === 'FAM') {
      setLocalPlaybookAccess(true)
      return { ok: true }
    }
    return { ok: false, error: 'That code is not valid.' }
  }

  const { data, error } = await supabase.rpc('redeem_playbook_promo', { p_code: normalized })
  if (error) {
    console.warn('[playbook] promo rpc', error.message)
    return { ok: false, error: error.message }
  }
  const row = data as { ok?: boolean; error?: string; already?: boolean } | null
  if (!row?.ok) return { ok: false, error: row?.error || 'Could not redeem code.' }
  return { ok: true, already: Boolean(row.already) }
}

export async function fetchPlaybookAccess(userId: string | null): Promise<boolean> {
  if (!userId) return false
  if (!supabaseConfigured || !supabase) return hasLocalPlaybookAccess()
  const { data } = await supabase
    .from('profiles')
    .select('playbook_access')
    .eq('user_id', userId)
    .maybeSingle()
  return Boolean(data?.playbook_access)
}

export async function startPlaybookCheckout(email: string, accessToken?: string | null) {
  if (!supabaseConfigured || !supabase) {
    throw new Error('Payments are not configured yet. Add Supabase keys to .env first.')
  }

  const { data, error } = await supabase.functions.invoke('playbook-crypto-checkout', {
    body: { email: email.trim().toLowerCase() },
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
  })

  if (error) throw new Error(error.message)
  if (data?.error) throw new Error(String(data.error))
  if (!data?.url) throw new Error('Could not start payment.')
  return String(data.url)
}
