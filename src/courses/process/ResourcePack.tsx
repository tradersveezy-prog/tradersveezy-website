import { useMemo, useState } from 'react'
import { CHECKLIST_ITEMS } from './data'
import { DeskResources } from './DeskResources'

type Props = {
  onContinue: () => void
}

export function ResourcePack({ onContinue }: Props) {
  const [marks, setMarks] = useState<Record<string, 'yes' | 'no' | ''>>({})
  const answered = useMemo(
    () => CHECKLIST_ITEMS.filter((i) => marks[i.n] === 'yes' || marks[i.n] === 'no').length,
    [marks],
  )
  const anyNo = CHECKLIST_ITEMS.some((i) => marks[i.n] === 'no')

  function setMark(n: string, v: 'yes' | 'no') {
    setMarks((prev) => ({ ...prev, [n]: prev[n] === v ? '' : v }))
  }

  return (
    <div className="ms-resources">
      <DeskResources />

      <section className="ms-desk-sheet" aria-labelledby="live-checklist">
        <header className="ms-desk-sheet-head">
          <div>
            <p className="eyebrow" style={{ margin: 0 }}>
              Live checklist
            </p>
            <h3 id="live-checklist" className="display">
              Before every trade
            </h3>
          </div>
          <div className="ms-desk-sheet-meta mono">
            <span>
              {answered}/{CHECKLIST_ITEMS.length}
            </span>
            <span className={anyNo ? 'is-no' : answered === CHECKLIST_ITEMS.length ? 'is-yes' : ''}>
              {anyNo ? 'Stay out' : answered === CHECKLIST_ITEMS.length ? 'Clear' : 'In progress'}
            </span>
          </div>
        </header>

        <ol className="ms-desk-checks">
          {CHECKLIST_ITEMS.map((item) => {
            const mark = marks[item.n] || ''
            return (
              <li key={item.n} className={mark ? `is-${mark}` : undefined}>
                <span className="mono ms-desk-n">{item.n}</span>
                <span className="mono ms-desk-course">C{item.course}</span>
                <p>{item.text}</p>
                <div className="ms-desk-toggles" role="group" aria-label={`Check ${item.n}`}>
                  <button
                    type="button"
                    className={mark === 'yes' ? 'on yes' : ''}
                    onClick={() => setMark(item.n, 'yes')}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className={mark === 'no' ? 'on no' : ''}
                    onClick={() => setMark(item.n, 'no')}
                  >
                    No
                  </button>
                </div>
              </li>
            )
          })}
        </ol>
        <p className="mono ms-desk-foot">One no = no trade · Educational only · Not financial advice</p>
      </section>

      <button type="button" className="btn btn-primary" onClick={onContinue}>
        Continue to labs
      </button>
      <p className="ms-foot mono">Educational only · Not financial advice</p>
    </div>
  )
}
