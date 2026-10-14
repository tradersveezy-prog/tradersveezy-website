import { RESOURCES } from './data'

type Props = {
  onContinue: () => void
}

export function ResourcePack({ onContinue }: Props) {
  return (
    <div className="ms-resources">
      <p className="eyebrow">Your desk files</p>
      <h2 className="display ms-h2">
        Download.
        <br />
        <span className="gold">Use them.</span>
      </h2>
      <p className="lede">
        These are simple spreadsheets. In Google Sheets: File → Import → Upload → pick the file.
        Make one tab per download.
      </p>

      <ul className="ms-resource-list">
        {RESOURCES.map((r) => (
          <li key={r.id} className="ms-resource-card">
            <div>
              <span className="mono ms-resource-id">{r.id}</span>
              <h3 className="display">{r.title}</h3>
              <p>{r.blurb}</p>
              <p className="mono ms-resource-tip">{r.sheetsTip}</p>
            </div>
            <a className="btn btn-primary" href={r.file} download>
              Download
            </a>
          </li>
        ))}
      </ul>

      <div className="ms-resource-bundle">
        <p className="lede" style={{ margin: 0 }}>
          Tip: put every file in the <strong>same</strong> Google Sheet as separate tabs. Freeze the
          top row so headers stay put.
        </p>
        <a className="btn btn-ghost" href="/curriculum/05/HOW-TO-GOOGLE-SHEETS.txt" download>
          Short how-to
        </a>
      </div>

      <button type="button" className="btn btn-primary" onClick={onContinue}>
        Continue to labs
      </button>
      <p className="ms-foot mono">Educational only · Not financial advice</p>
    </div>
  )
}
