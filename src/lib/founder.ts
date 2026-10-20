import { supabase, supabaseConfigured } from './supabase'

export const FOUNDER_EMAILS = ['tradersveezy@gmail.com', 'sumant.vasan@gmail.com'] as const

export function isFounderEmail(email?: string | null) {
  if (!email) return false
  return (FOUNDER_EMAILS as readonly string[]).includes(email.trim().toLowerCase())
}

export type FounderRecentUser = {
  email: string | null
  display_name: string | null
  playbook_access: boolean
  created_at: string
  playbook_purchased_at: string | null
  coaching_sessions_remaining: number
  promo_codes: string | null
}

export type FounderRecentPayment = {
  email: string
  product: string
  amount: number
  currency: string
  payment_status: string
  order_id: string
  created_at: string
}

export type FounderDashboard = {
  generated_at: string
  users_total: number
  users_7d: number
  users_30d: number
  playbook_unlocked: number
  playbook_unlocked_7d: number
  promo_redemptions: number
  promo_fam: number
  payments_paid: number
  payments_pending: number
  coaching_credits_open: number
  recent_users: FounderRecentUser[]
  recent_payments: FounderRecentPayment[]
}

export async function fetchFounderDashboard(): Promise<FounderDashboard> {
  if (!supabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured.')
  }
  const { data, error } = await supabase.rpc('founder_dashboard')
  if (error) throw new Error(error.message)
  return data as FounderDashboard
}

/** Public PostHog project UI (sign in as you). Override with VITE_POSTHOG_APP_URL. */
export const POSTHOG_APP_URL =
  (import.meta.env.VITE_POSTHOG_APP_URL as string | undefined)?.trim() || 'https://us.posthog.com'
