import { useMemo, useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import './account.css'

type Mode = 'signin' | 'signup'

export function Account() {
  const { user, loading, cloud, signIn, signUp, signOut } = useAuth()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const next = useMemo(() => {
    const raw = params.get('next') || '/desk'
    return raw.startsWith('/') ? raw : '/desk'
  }, [params])

  const [mode, setMode] = useState<Mode>(params.get('mode') === 'signup' ? 'signup' : 'signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')

  if (!loading && user && params.get('stay') !== '1') {
    return <Navigate to={next} replace />
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setInfo('')
    setBusy(true)
    try {
      if (mode === 'signup') {
        const res = await signUp(email, password)
        if (res.error) {
          setError(res.error)
          return
        }
        if (res.needsConfirm) {
          setInfo('Check your email to confirm, then sign in.')
          setMode('signin')
          return
        }
        navigate(next, { replace: true })
        return
      }
      const res = await signIn(email, password)
      if (res.error) {
        setError(res.error)
        return
      }
      navigate(next, { replace: true })
    } finally {
      setBusy(false)
    }
  }

  if (loading) {
    return (
      <main className="shell account-page">
        <p className="eyebrow">Loading…</p>
      </main>
    )
  }

  if (user) {
    return (
      <main className="account-page">
        <div className="shell account-shell">
          <p className="eyebrow">Account</p>
          <h1 className="display account-title">
            You&apos;re
            <br />
            <span className="gold">signed in.</span>
          </h1>
          <p className="account-email mono">{user.email}</p>
          {!cloud && (
            <p className="account-note">
              Local account on this browser only. Add Supabase keys for real cloud accounts.
            </p>
          )}
          <div className="account-actions">
            <Link to="/desk" className="btn btn-primary">
              Open desk
            </Link>
            <button type="button" className="btn btn-ghost" onClick={() => signOut()}>
              Sign out
            </button>
          </div>
          <p className="account-foot mono">Educational only · Not financial advice</p>
        </div>
      </main>
    )
  }

  return (
    <main className="account-page">
      <div className="shell account-shell">
        <p className="eyebrow">Member access</p>
        <h1 className="display account-title">
          {mode === 'signup' ? (
            <>
              Create
              <br />
              <span className="gold">an account.</span>
            </>
          ) : (
            <>
              Sign
              <br />
              <span className="gold">in.</span>
            </>
          )}
        </h1>
        <p className="account-lede">
          Create an account for your member desk — Course 01, playbook teasers, and clear next steps
          into MintScript or 1-on-1.
        </p>

        {!cloud && (
          <p className="account-banner mono" role="status">
            Local mode · accounts stay on this device until Supabase is connected
          </p>
        )}

        <div className="account-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'signin'}
            className={mode === 'signin' ? 'on' : ''}
            onClick={() => {
              setMode('signin')
              setError('')
              setInfo('')
            }}
          >
            Sign in
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'signup'}
            className={mode === 'signup' ? 'on' : ''}
            onClick={() => {
              setMode('signup')
              setError('')
              setInfo('')
            }}
          >
            Create account
          </button>
        </div>

        <form className="account-form" onSubmit={onSubmit}>
          <label className="field">
            <span>Email</span>
            <input
              required
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
            />
          </label>
          <label className="field">
            <span>Password</span>
            <input
              required
              type="password"
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 6 characters"
            />
          </label>
          {error ? (
            <p className="account-error" role="alert">
              {error}
            </p>
          ) : null}
          {info ? (
            <p className="account-info" role="status">
              {info}
            </p>
          ) : null}
          <button type="submit" className="btn btn-primary" disabled={busy}>
            {busy ? 'Working…' : mode === 'signup' ? 'Create account' : 'Sign in'}
          </button>
        </form>

        <p className="account-foot mono">Educational only · Not financial advice</p>
      </div>
    </main>
  )
}
