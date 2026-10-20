import { useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import {
  fetchFounderDashboard,
  POSTHOG_APP_URL,
  type FounderDashboard,
} from '../lib/founder'
import './founder.css'

function fmtDate(iso?: string | null) {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return iso
  }
}

function Stat({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <article className="founder-stat">
      <p className="eyebrow">{label}</p>
      <p className="founder-stat-value mono">{value}</p>
      {hint ? <p className="founder-stat-hint mono">{hint}</p> : null}
    </article>
  )
}

export function Founder() {
  const [data, setData] = useState<FounderDashboard | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const next = await fetchFounderDashboard()
      setData(next)
    } catch (err) {
      setData(null)
      setError(err instanceof Error ? err.message : 'Could not load dashboard.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  return (
    <main className="founder-page">
      <Helmet>
        <title>Founder · TraderSveezy</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="shell founder-shell">
        <header className="founder-top">
          <div>
            <p className="eyebrow">Founder desk</p>
            <h1 className="display founder-title">
              Soft-launch
              <br />
              <span className="gold">pulse.</span>
            </h1>
            <p className="founder-lede">
              Members and unlocks from Supabase. Product clicks / course steps live in PostHog.
            </p>
          </div>
          <div className="founder-top-actions">
            <button type="button" className="btn btn-ghost" onClick={() => void load()} disabled={loading}>
              {loading ? 'Refreshing…' : 'Refresh'}
            </button>
            <a
              href={POSTHOG_APP_URL}
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open PostHog
            </a>
            <Link to="/desk" className="btn btn-ghost">
              Desk
            </Link>
          </div>
        </header>

        {error ? (
          <p className="founder-error" role="alert">
            {error}
            {error.toLowerCase().includes('function') || error.toLowerCase().includes('does not exist')
              ? ' — run the founder_dashboard SQL migration in Supabase.'
              : ''}
          </p>
        ) : null}

        {loading && !data ? (
          <p className="eyebrow">Loading stats…</p>
        ) : data ? (
          <>
            <p className="founder-updated mono">Updated {fmtDate(data.generated_at)}</p>

            <section className="founder-grid" aria-label="Key metrics">
              <Stat label="Members" value={data.users_total} hint={`+${data.users_7d} / 7d · +${data.users_30d} / 30d`} />
              <Stat
                label="Playbook unlocked"
                value={data.playbook_unlocked}
                hint={`+${data.playbook_unlocked_7d} unlocked / 7d`}
              />
              <Stat label="FAM redemptions" value={data.promo_fam} hint={`${data.promo_redemptions} promo total`} />
              <Stat
                label="Crypto payments"
                value={data.payments_paid}
                hint={`${data.payments_pending} pending`}
              />
              <Stat label="Coaching credits open" value={data.coaching_credits_open} />
            </section>

            <section className="founder-section" aria-labelledby="founder-usage">
              <div className="founder-section-head">
                <h2 id="founder-usage">Product usage</h2>
                <a href={POSTHOG_APP_URL} target="_blank" rel="noopener noreferrer" className="founder-link">
                  PostHog →
                </a>
              </div>
              <ul className="founder-usage-list">
                <li>
                  <span className="mono">$pageview</span> — routes people hit
                </li>
                <li>
                  <span className="mono">course_step</span> / <span className="mono">quiz_completed</span> /{' '}
                  <span className="mono">lab_call</span> — module progress
                </li>
                <li>
                  <span className="mono">checkout_started</span> / <span className="mono">promo_redeemed</span> — money
                  path
                </li>
                <li>
                  <span className="mono">file_downloaded</span> — desk pack grabs
                </li>
              </ul>
              <p className="founder-note">
                Your NRW traffic and founder emails are filtered client-side. Use PostHog → Activity for live events.
              </p>
            </section>

            <section className="founder-section" aria-labelledby="founder-users">
              <div className="founder-section-head">
                <h2 id="founder-users">Recent signups</h2>
                <span className="eyebrow" style={{ margin: 0 }}>
                  Last 40
                </span>
              </div>
              <div className="founder-table-wrap">
                <table className="founder-table">
                  <thead>
                    <tr>
                      <th>When</th>
                      <th>Email</th>
                      <th>Name</th>
                      <th>Playbook</th>
                      <th>Promo</th>
                      <th>Coaching</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(data.recent_users || []).map((u) => (
                      <tr key={`${u.email}-${u.created_at}`}>
                        <td className="mono">{fmtDate(u.created_at)}</td>
                        <td>{u.email || '—'}</td>
                        <td>{u.display_name || '—'}</td>
                        <td className="mono">{u.playbook_access ? 'yes' : '—'}</td>
                        <td className="mono">{u.promo_codes || '—'}</td>
                        <td className="mono">{u.coaching_sessions_remaining || '—'}</td>
                      </tr>
                    ))}
                    {!data.recent_users?.length ? (
                      <tr>
                        <td colSpan={6}>No profiles yet.</td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="founder-section" aria-labelledby="founder-pay">
              <div className="founder-section-head">
                <h2 id="founder-pay">Recent payments</h2>
              </div>
              <div className="founder-table-wrap">
                <table className="founder-table">
                  <thead>
                    <tr>
                      <th>When</th>
                      <th>Email</th>
                      <th>Product</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Order</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(data.recent_payments || []).map((p) => (
                      <tr key={p.order_id}>
                        <td className="mono">{fmtDate(p.created_at)}</td>
                        <td>{p.email}</td>
                        <td className="mono">{p.product}</td>
                        <td className="mono">
                          {p.amount} {p.currency}
                        </td>
                        <td className="mono">{p.payment_status}</td>
                        <td className="mono founder-order">{p.order_id}</td>
                      </tr>
                    ))}
                    {!data.recent_payments?.length ? (
                      <tr>
                        <td colSpan={6}>No payment rows yet.</td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        ) : null}

        <p className="founder-foot mono">Educational only · Not financial advice · Internal</p>
      </div>
    </main>
  )
}
