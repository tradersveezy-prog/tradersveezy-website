import { useState } from 'react'
import '../market-structure/market-structure.css'
import { DESK_PACK_FILE, RESOURCES } from './data'
import { downloadFile, filenameFromPath } from './downloadFile'

type Props = {
  /** Extra class on the outer wrap */
  className?: string
  /** Compact = less lede, for embedding on Desk / Courses */
  compact?: boolean
}

export function DeskResources({ className = '', compact = false }: Props) {
  const [busy, setBusy] = useState('')
  const [dlError, setDlError] = useState('')

  async function onDownload(path: string, id: string) {
    setDlError('')
    setBusy(id)
    try {
      await downloadFile(path, filenameFromPath(path))
    } catch (err) {
      setDlError(err instanceof Error ? err.message : 'Download failed.')
    } finally {
      setBusy('')
    }
  }

  return (
    <div className={`desk-resources ${className}`.trim()}>
      {!compact ? (
        <>
          <p className="eyebrow">Desk pack</p>
          <h2 className="display ms-h2">
            Run the list.
            <br />
            <span className="gold">Then download.</span>
          </h2>
          <p className="lede">
            Branded Excel files — gold headers, borders, frozen rows, Yes/No dropdowns. Open in Excel
            or import the .xlsx into Google Sheets.
          </p>
        </>
      ) : (
        <p style={{ fontSize: 17, lineHeight: 1.5, color: 'var(--soft)', margin: '0 0 22px', maxWidth: '36em' }}>
          Same Course 05 files — desk pack, Daily P&amp;L + risk calculator, checklist, log, loss review,
          weekly, rules. No need to open the module.
        </p>
      )}

      <button
        type="button"
        className="ms-desk-pack-cta btn btn-primary"
        disabled={busy === 'pack'}
        onClick={() => void onDownload(DESK_PACK_FILE, 'pack')}
      >
        {busy === 'pack' ? 'Downloading…' : 'Download full desk pack · XLSX'}
      </button>
      <p className="mono ms-desk-pack-note">
        One file · Checklist · Daily P&amp;L · Risk calculator · Log · Losses · Weekly · Rules
      </p>
      {dlError ? (
        <p className="account-error" role="alert" style={{ marginTop: 12 }}>
          {dlError}
        </p>
      ) : null}

      <div className="ms-resource-head" style={{ marginTop: compact ? 28 : undefined }}>
        <p className="eyebrow">Or grab one tab</p>
        {!compact ? (
          <p className="lede" style={{ margin: '10px 0 0', maxWidth: '34em' }}>
            Same styling as the pack. Sheets: File → Import → Upload → pick the .xlsx.
          </p>
        ) : null}
      </div>

      <ul className="ms-resource-list">
        {RESOURCES.map((r) => (
          <li key={r.id} className="ms-resource-card">
            <span className="mono ms-resource-n">{r.n}</span>
            <div className="ms-resource-body">
              <div className="ms-resource-title-row">
                <h3 className="display">{r.title}</h3>
                <span className="mono ms-resource-kind">{r.kind}</span>
              </div>
              <p>{r.blurb}</p>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              disabled={busy === r.id}
              onClick={() => void onDownload(r.file, r.id)}
            >
              {busy === r.id ? '…' : 'Download'}
            </button>
          </li>
        ))}
      </ul>

      <div className="ms-resource-bundle">
        <p>Prefer the pack — one download, every tab already named and styled.</p>
        <button
          type="button"
          className="btn btn-ghost"
          disabled={busy === 'howto'}
          onClick={() => void onDownload('/curriculum/05/HOW-TO-GOOGLE-SHEETS.txt', 'howto')}
        >
          How-to
        </button>
      </div>
    </div>
  )
}
