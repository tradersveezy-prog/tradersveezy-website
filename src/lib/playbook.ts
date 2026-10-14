import { supabase, supabaseConfigured } from './supabase'

export const PLAYBOOK_PRICE_USD = 250

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

export async function fetchPlaybookAccess(userId: string | null): Promise<boolean> {
  if (!supabaseConfigured || !supabase || !userId) return false
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
