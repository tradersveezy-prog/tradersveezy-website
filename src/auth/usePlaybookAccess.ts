import { useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { claimPlaybookEntitlements, fetchPlaybookAccess } from '../lib/playbook'
import { supabaseConfigured } from '../lib/supabase'

export function usePlaybookAccess() {
  const { user, loading: authLoading } = useAuth()
  const [access, setAccess] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function run() {
      if (!supabaseConfigured) {
        if (!cancelled) {
          setAccess(false)
          setLoading(false)
        }
        return
      }
      if (authLoading) return
      if (!user) {
        if (!cancelled) {
          setAccess(false)
          setLoading(false)
        }
        return
      }

      setLoading(true)
      try {
        if (user.email) {
          await claimPlaybookEntitlements(user.id, user.email)
          const { supabase } = await import('../lib/supabase')
          if (supabase) await supabase.rpc('claim_coaching_entitlement')
        }
        const ok = await fetchPlaybookAccess(user.id)
        if (!cancelled) setAccess(ok)
      } catch {
        if (!cancelled) setAccess(false)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void run()
    return () => {
      cancelled = true
    }
  }, [user, authLoading])

  return {
    access,
    loading: authLoading || loading,
    localMode: !supabaseConfigured,
    email: user?.email ?? null,
  }
}
