import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { track } from '../lib/analytics'
import { supabaseConfigured } from '../lib/supabase'
import { RequireAuth } from './RequireAuth'
import { usePlaybookAccess } from './usePlaybookAccess'

type Props = {
  children: React.ReactNode
}

function PlaybookGate({ children }: Props) {
  const { access, loading, localMode } = usePlaybookAccess()

  // No Supabase → keep soft-launch open (auth already required by parent).
  if (localMode || !supabaseConfigured) return children

  if (loading) {
    return (
      <main className="shell" style={{ padding: '120px 0', textAlign: 'center' }}>
        <p className="eyebrow">Checking playbook access…</p>
      </main>
    )
  }

  if (!access) {
    return <PlaybookLocked />
  }

  return children
}

function PlaybookLocked() {
  useEffect(() => {
    track('playbook_gate_blocked', {
      path: typeof window !== 'undefined' ? window.location.pathname : '',
    })
  }, [])

  return (
    <main className="shell" style={{ padding: '100px 0', maxWidth: 560 }}>
      <p className="eyebrow">Playbook</p>
      <h1 className="display" style={{ fontSize: 42, marginTop: 16 }}>
        Full playbook
        <br />
        <span className="gold">access.</span>
      </h1>
      <p style={{ color: 'var(--soft)', marginTop: 20, lineHeight: 1.5 }}>
        Course 01 is open with an account. Courses 02–05 unlock with the waitlist special — $250 crypto ($50 off).
        Pay now; full playbook opens soon.
      </p>
      <p style={{ marginTop: 28 }}>
        <Link
          to="/courses#waitlist"
          className="btn btn-primary"
          onClick={() => track('cta_clicked', { cta: 'unlock_playbook', surface: 'playbook_gate' })}
        >
          Waitlist · pay $250
        </Link>
      </p>
    </main>
  )
}

/** Auth + paid playbook (Courses 02–05). */
export function RequirePlaybook({ children }: Props) {
  return (
    <RequireAuth>
      <PlaybookGate>{children}</PlaybookGate>
    </RequireAuth>
  )
}
