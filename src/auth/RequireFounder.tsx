import { Link } from 'react-router-dom'
import { useAuth } from './AuthContext'
import { RequireAuth } from './RequireAuth'
import { isFounderEmail } from '../lib/founder'

type Props = {
  children: React.ReactNode
}

function FounderGate({ children }: Props) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <main className="shell" style={{ padding: '120px 0', textAlign: 'center' }}>
        <p className="eyebrow">Checking access…</p>
      </main>
    )
  }

  if (!isFounderEmail(user?.email)) {
    return (
      <main className="shell" style={{ padding: '100px 0', maxWidth: 480 }}>
        <p className="eyebrow">Founder</p>
        <h1 className="display" style={{ fontSize: 40, marginTop: 16 }}>
          Not
          <br />
          <span className="gold">available.</span>
        </h1>
        <p style={{ color: 'var(--soft)', marginTop: 20, lineHeight: 1.5 }}>
          This page is only for the founder account.
        </p>
        <p style={{ marginTop: 28 }}>
          <Link to="/desk" className="btn btn-primary">
            Back to desk
          </Link>
        </p>
      </main>
    )
  }

  return children
}

export function RequireFounder({ children }: Props) {
  return (
    <RequireAuth>
      <FounderGate>{children}</FounderGate>
    </RequireAuth>
  )
}
