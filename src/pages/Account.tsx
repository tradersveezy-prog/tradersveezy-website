import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { usePlaybookAccess } from '../auth/usePlaybookAccess'
import { fetchCoachingSessions } from '../lib/coaching'
import './account.css'

type Mode = 'signin' | 'signup' | 'forgot'

export function Account() {
  const {
    user,
    loading,
    cloud,
    passwordRecovery,
    signIn,
    signUp,
    signOut,
    updateDisplayName,
    requestPasswordReset,
    updatePassword,
  } = useAuth()
  const { access: hasPlaybook } = usePlaybookAccess()
  const [coachingSessions, setCoachingSessions] = useState(0)
  const [params] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    let cancelled = false
    void fetchCoachingSessions(user?.id ?? null).then((n) => {
      if (!cancelled) setCoachingSessions(n)
    })
    return () => {
      cancelled = true
    }
  }, [user?.id])

  const next = useMemo(() => {
    const raw = params.get('next') || '/desk'
    return raw.startsWith('/') ? raw : '/desk'
  }, [params])

  const [mode, setMode] = useState<Mode>(params.get('mode') === 'signup' ? 'signup' : 'signin')
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [nameDraft, setNameDraft] = useState('')
  const [nameBusy, setNameBusy] = useState(false)
  const [nameMsg, setNameMsg] = useState('')

  if (!loading && user && !passwordRecovery && params.get('stay') !== '1') {
    return <Navigate to={next} replace />
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setInfo('')
    setBusy(true)
    try {
      if (mode === 'forgot') {
        const res = await requestPasswordReset(email)
        if (res.error) {
          setError(res.error)
          return
        }
        setInfo('Check your email for a reset link. It opens tradersveezy.com/account.')
        return
      }
      if (mode === 'signup') {
        const res = await signUp(email, password, displayName)
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

  async function onSetPassword(e: FormEvent) {
    e.preventDefault()
    setError('')
    setInfo('')
    setBusy(true)
    try {
      const res = await updatePassword(newPassword)
      if (res.error) {
        setError(res.error)
        return
      }
      setInfo('Password updated. You’re signed in.')
      setNewPassword('')
      navigate('/desk', { replace: true })
    } finally {
      setBusy(false)
    }
  }

  async function onSaveName(e: FormEvent) {
    e.preventDefault()
    setNameMsg('')
    setNameBusy(true)
    try {
      const res = await updateDisplayName(nameDraft)
      if (res.error) {
        setNameMsg(res.error)
        return
      }
      setNameMsg('Saved.')
      setNameDraft('')
    } finally {
      setNameBusy(false)
    }
  }

  if (loading) {
    return (
      <main className="shell account-page">
        <p className="eyebrow">Loading…</p>
      </main>
    )
  }

  if (passwordRecovery && user) {
    return (
      <main className="account-page">
        <div className="shell account-shell">
          <p className="eyebrow">Account</p>
          <h1 className="display account-title">
            Set a
            <br />
            <span className="gold">new password.</span>
          </h1>
          <p className="account-lede">Choose a new password for {user.email}.</p>
          <form className="account-form" onSubmit={onSetPassword} style={{ marginTop: 32 }}>
            <label className="field">
              <span>New password</span>
              <input
                required
                type="password"
                autoComplete="new-password"
                minLength={6}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
              {busy ? 'Saving…' : 'Update password'}
            </button>
          </form>
          <p className="account-foot mono">Educational only · Not financial advice</p>
        </div>
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
          <p className="account-name display">{user.displayName}</p>
          <p className="account-email mono">{user.email}</p>
          <p className="account-note mono" style={{ marginTop: 12 }}>
            Playbook: {hasPlaybook ? 'unlocked' : 'not unlocked'}
            {coachingSessions > 0 ? ` · Coaching credits: ${coachingSessions}` : ''}
          </p>
          {!cloud && (
            <p className="account-note">
              Local account on this browser only. Add Supabase keys for real cloud accounts.
            </p>
          )}

          <form className="account-form account-name-form" onSubmit={onSaveName}>
            <label className="field">
              <span>Display name (on certificates)</span>
              <input
                type="text"
                autoComplete="nickname"
                maxLength={40}
                value={nameDraft}
                onChange={(e) => setNameDraft(e.target.value)}
                placeholder={user.displayName}
              />
            </label>
            {nameMsg ? (
              <p className={nameMsg === 'Saved.' ? 'account-info' : 'account-error'} role="status">
                {nameMsg}
              </p>
            ) : null}
            <button type="submit" className="btn btn-ghost" disabled={nameBusy || !nameDraft.trim()}>
              {nameBusy ? 'Saving…' : 'Update name'}
            </button>
          </form>

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
          ) : mode === 'forgot' ? (
            <>
              Reset
              <br />
              <span className="gold">password.</span>
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
          {mode === 'forgot'
            ? 'We’ll email a reset link that opens the live site. Set a new password there.'
            : 'Create an account for your member desk — Course 01, playbook teasers, and clear next steps into MintScript or 1-on-1.'}
        </p>

        {!cloud && (
          <p className="account-banner mono" role="status">
            Local mode · accounts stay on this device until Supabase is connected
          </p>
        )}

        {mode !== 'forgot' ? (
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
        ) : (
          <p style={{ margin: '28px 0 0' }}>
            <button
              type="button"
              className="btn btn-ghost"
              style={{ fontSize: 12, padding: '10px 14px' }}
              onClick={() => {
                setMode('signin')
                setError('')
                setInfo('')
              }}
            >
              ← Back to sign in
            </button>
          </p>
        )}

        <form className="account-form" onSubmit={onSubmit}>
          {mode === 'signup' ? (
            <label className="field">
              <span>Display name</span>
              <input
                required
                type="text"
                autoComplete="nickname"
                minLength={2}
                maxLength={40}
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="How you want it on certificates"
              />
            </label>
          ) : null}
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
          {mode !== 'forgot' ? (
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
          ) : null}
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
            {busy
              ? 'Working…'
              : mode === 'signup'
                ? 'Create account'
                : mode === 'forgot'
                  ? 'Email reset link'
                  : 'Sign in'}
          </button>
        </form>

        {mode === 'signin' ? (
          <p style={{ marginTop: 18 }}>
            <button
              type="button"
              onClick={() => {
                setMode('forgot')
                setError('')
                setInfo('')
              }}
              style={{
                background: 'none',
                border: 0,
                padding: 0,
                color: 'var(--gold)',
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              Forgot password?
            </button>
          </p>
        ) : null}

        <p className="account-foot mono">Educational only · Not financial advice</p>
      </div>
    </main>
  )
}
