import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext'

type Props = {
  children: React.ReactNode
}

export function RequireAuth({ children }: Props) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <main className="shell" style={{ padding: '120px 0', textAlign: 'center' }}>
        <p className="eyebrow">Checking account…</p>
      </main>
    )
  }

  if (!user) {
    const next = `${location.pathname}${location.search}`
    return <Navigate to={`/account?next=${encodeURIComponent(next)}`} replace />
  }

  return children
}
