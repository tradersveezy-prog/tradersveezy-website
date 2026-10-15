import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { SITE_URL } from '../seo'
import { supabase, supabaseConfigured } from '../lib/supabase'
import {
  localGetSession,
  localSignIn,
  localSignOut,
  localSignUp,
  localUpdateDisplayName,
  type LocalUser,
} from './localAuth'

export type AuthUser = {
  id: string
  email: string
  displayName: string
}

/** Live site only — reset emails must not point at localhost. */
export const AUTH_REDIRECT_URL = `${SITE_URL}/account`

type AuthContextValue = {
  user: AuthUser | null
  loading: boolean
  /** true = real Supabase; false = this-browser local accounts */
  cloud: boolean
  /** Set when the user opens a password-recovery link. */
  passwordRecovery: boolean
  clearPasswordRecovery: () => void
  signUp: (
    email: string,
    password: string,
    displayName: string,
  ) => Promise<{ error?: string; needsConfirm?: boolean }>
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  requestPasswordReset: (email: string) => Promise<{ error?: string }>
  updatePassword: (password: string) => Promise<{ error?: string }>
  updateDisplayName: (displayName: string) => Promise<{ error?: string }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

function nameFromMeta(meta: Record<string, unknown> | undefined, email: string) {
  const raw = meta?.display_name ?? meta?.displayName ?? meta?.full_name
  if (typeof raw === 'string' && raw.trim()) return raw.trim().slice(0, 40)
  return email.split('@')[0] || 'Trader'
}

function toUser(
  u: { id: string; email?: string | null; user_metadata?: Record<string, unknown> } | LocalUser | null,
): AuthUser | null {
  if (!u?.email) return null
  if ('displayName' in u) {
    return {
      id: u.id,
      email: u.email,
      displayName: u.displayName || u.email.split('@')[0] || 'Trader',
    }
  }
  return {
    id: u.id,
    email: u.email,
    displayName: nameFromMeta(u.user_metadata, u.email),
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [passwordRecovery, setPasswordRecovery] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function boot() {
      if (supabase) {
        const { data } = await supabase.auth.getSession()
        if (!cancelled) setUser(toUser(data.session?.user ?? null))
        const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
          if (event === 'PASSWORD_RECOVERY') setPasswordRecovery(true)
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

  const clearPasswordRecovery = useCallback(() => setPasswordRecovery(false), [])

  const signUp = useCallback(async (email: string, password: string, displayName: string) => {
    const name = displayName.trim().replace(/\s+/g, ' ').slice(0, 40)
    if (!name) return { error: 'Display name required.' }
    if (name.length < 2) return { error: 'Display name must be at least 2 characters.' }

    if (supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { display_name: name } },
      })
      if (error) return { error: error.message }
      if (data.session?.user) setUser(toUser(data.session.user))
      return { needsConfirm: !data.session }
    }
    const res = localSignUp(email, password, name)
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

  const requestPasswordReset = useCallback(async (email: string) => {
    const trimmed = email.trim()
    if (!trimmed) return { error: 'Enter your email.' }
    if (!supabase) {
      return { error: 'Password reset needs cloud accounts (Supabase).' }
    }
    const { error } = await supabase.auth.resetPasswordForEmail(trimmed, {
      redirectTo: AUTH_REDIRECT_URL,
    })
    if (error) return { error: error.message }
    return {}
  }, [])

  const updatePassword = useCallback(async (password: string) => {
    if (password.length < 6) return { error: 'Password must be at least 6 characters.' }
    if (!supabase) return { error: 'Password reset needs cloud accounts (Supabase).' }
    const { error } = await supabase.auth.updateUser({ password })
    if (error) return { error: error.message }
    setPasswordRecovery(false)
    return {}
  }, [])

  const updateDisplayName = useCallback(async (displayName: string) => {
    const name = displayName.trim().replace(/\s+/g, ' ').slice(0, 40)
    if (!name) return { error: 'Display name required.' }
    if (name.length < 2) return { error: 'Display name must be at least 2 characters.' }

    if (supabase) {
      const { data, error } = await supabase.auth.updateUser({
        data: { display_name: name },
      })
      if (error) return { error: error.message }
      if (data.user) setUser(toUser(data.user))
      return {}
    }
    const res = localUpdateDisplayName(name)
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
      passwordRecovery,
      clearPasswordRecovery,
      signUp,
      signIn,
      requestPasswordReset,
      updatePassword,
      updateDisplayName,
      signOut,
    }),
    [
      user,
      loading,
      passwordRecovery,
      clearPasswordRecovery,
      signUp,
      signIn,
      requestPasswordReset,
      updatePassword,
      updateDisplayName,
      signOut,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
