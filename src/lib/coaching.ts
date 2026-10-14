import { supabase, supabaseConfigured } from './supabase'

export type CoachingPackageId = '1' | '3' | '5'

export const COACHING_PACKAGES: {
  id: CoachingPackageId
  label: string
  title: string
  price: number
  sessions: number
  rate: string
  desc: string
  cta: string
  featured: boolean
}[] = [
  {
    id: '1',
    label: 'Single',
    title: '1 Session',
    price: 300,
    sessions: 1,
    rate: '$300 / session',
    desc: 'A focused review of your setups, or one problem you keep running into.',
    cta: 'Pay · 1 session',
    featured: false,
  },
  {
    id: '3',
    label: 'Build',
    title: '3 Sessions',
    price: 750,
    sessions: 3,
    rate: '$250 / session',
    desc: 'Review, fix, then check it held. Enough time to change how you trade.',
    cta: 'Pay · 3 sessions',
    featured: false,
  },
  {
    id: '5',
    label: 'Mentorship',
    title: '5 Sessions',
    price: 1000,
    sessions: 5,
    rate: '$200 / session',
    desc: 'The full rebuild: strategy, risk, execution and review, over five sessions.',
    cta: 'Pay · 5 sessions',
    featured: true,
  },
]

export async function startCoachingCheckout(
  packageId: CoachingPackageId,
  email: string,
  accessToken?: string | null,
) {
  if (!supabaseConfigured || !supabase) {
    throw new Error('Payments are not configured yet. Add Supabase keys to .env first.')
  }

  const { data, error } = await supabase.functions.invoke('coaching-crypto-checkout', {
    body: { packageId, email: email.trim().toLowerCase() },
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
  })

  if (error) throw new Error(error.message)
  if (data?.error) throw new Error(String(data.error))
  if (!data?.url) throw new Error('Could not start payment.')
  return String(data.url)
}

export async function fetchCoachingSessions(userId: string | null): Promise<number> {
  if (!supabaseConfigured || !supabase || !userId) return 0
  const { data } = await supabase
    .from('profiles')
    .select('coaching_sessions_remaining')
    .eq('user_id', userId)
    .maybeSingle()
  return Number(data?.coaching_sessions_remaining ?? 0) || 0
}
