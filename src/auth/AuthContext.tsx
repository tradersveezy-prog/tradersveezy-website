import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { supabase, supabaseConfigured } from '../lib/supabase'
import {
  localGetSession,
  localSignIn,
  localSignOut,
  localSignUp,
  type LocalUser,
} from './localAuth'

export type AuthUser = {
  id: string
  email: string
}

type AuthContextValue = {
  user: AuthUser | null
  loading: boolean
  /** true = real Supabase; false = this-browser local accounts */
  cloud: boolean
  signUp: (email: string, password: string) => Promise<{ error?: string; needsConfirm?: boolean }>
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

function toUser(u: { id: string; email?: string | null } | LocalUser | null): AuthUser | null {
  if (!u?.email) return null
  return { id: u.id, email: u.email }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function boot() {
      if (supabase) {
        const { data } = await supabase.auth.getSession()
        if (!cancelled) setUser(toUser(data.session?.user ?? null))
        const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
          setUser(toUser(session?.user ?? null))
        })
        if (!cancelled) setLoading(false)
        return () => sub.subscription.unsubscribe()
      }
      if (!cancelled) {
        setUser(toUser(localGetSession()))
        setLoading(false)
      }
      return undefined
    }

    let unsub: (() => void) | undefined
    boot().then((fn) => {
      unsub = fn
    })
    return () => {
      cancelled = true
      unsub?.()
    }
  }, [])

  const signUp = useCallback(async (email: string, password: string) => {
    if (supabase) {
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) return { error: error.message }
      if (data.session?.user) setUser(toUser(data.session.user))
      return { needsConfirm: !data.session }
    }
    const res = localSignUp(email, password)
    if (res.error) return { error: res.error }
    setUser(toUser(res.user ?? null))
    return {}
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    if (supabase) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) return { error: error.message }
      return {}
    }
    const res = localSignIn(email, password)
    if (res.error) return { error: res.error }
    setUser(toUser(res.user ?? null))
    return {}
  }, [])

  const signOut = useCallback(async () => {
    if (supabase) {
      await supabase.auth.signOut()
      setUser(null)
      return
    }
    localSignOut()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      cloud: supabaseConfigured,
      signUp,
      signIn,
      signOut,
    }),
    [user, loading, signUp, signIn, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
