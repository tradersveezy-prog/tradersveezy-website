import { useCallback, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import {
  claimPlaybookEntitlements,
  fetchPlaybookAccess,
  redeemPlaybookPromo,
  takePendingPromo,
} from '../lib/playbook'
import { supabaseConfigured } from '../lib/supabase'

export function usePlaybookAccess() {
  const { user, loading: authLoading } = useAuth()
  const [access, setAccess] = useState(false)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    if (!user) {
      setAccess(false)
      setLoading(false)
      return false
    }
    setLoading(true)
    try {
      if (supabaseConfigured && user.email) {
        await claimPlaybookEntitlements(user.id, user.email)
        const { supabase } = await import('../lib/supabase')
        if (supabase) await supabase.rpc('claim_coaching_entitlement')
      }
      const pending = takePendingPromo()
      if (pending) {
        await redeemPlaybookPromo(pending)
      }
      const ok = await fetchPlaybookAccess(user.id)
      setAccess(ok)
      return ok
    } catch {
      setAccess(false)
      return false
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    let cancelled = false

    async function run() {
      if (authLoading) return
      if (!user) {
        if (!cancelled) {
          setAccess(false)
          setLoading(false)
        }
        return
      }
      if (!cancelled) await refresh()
    }

    void run()
    return () => {
      cancelled = true
    }
  }, [user, authLoading, refresh])

  return {
    access,
    loading: authLoading || loading,
    localMode: !supabaseConfigured,
    email: user?.email ?? null,
    refresh,
  }
}
