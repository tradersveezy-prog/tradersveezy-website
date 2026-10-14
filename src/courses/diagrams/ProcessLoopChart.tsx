export function ProcessLoopChart() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 680"
      role="img"
      aria-labelledby="pl-t pl-d"
      className="ms-diagram-svg"
    >
      <title id="pl-t">Playbook process loop</title>
      <desc id="pl-d">Six-step loop from name condition through review back to name.</desc>
      <rect width="1200" height="680" fill="#060606" />
      <defs>
        <pattern id="pl-g" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M0 48H48" stroke="#F2F1EE" strokeOpacity="0.04" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1200" height="680" fill="url(#pl-g)" />
      <defs>
        <marker id="pl-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6 Z" fill="#E3B44A" />
        </marker>
      </defs>
      <rect x="48" y="72" width="1104" height="536" fill="#0B0B0B" stroke="#F2F1EE" strokeOpacity="0.12" />

      {[
        { x: 120, label: '01 SEE', sub: 'CHART' },
        { x: 300, label: '02 LEVEL', sub: 'WHERE' },
        { x: 480, label: '03 ENTER', sub: 'WHEN' },
        { x: 660, label: '04 SIZE', sub: 'HOW BIG' },
        { x: 840, label: '05 TRADE', sub: 'HARD STOP' },
        { x: 1020, label: '06 LOOK BACK', sub: 'LEARN' },
      ].map((n, i) => (
        <g key={n.label}>
          <rect
            x={n.x}
            y="280"
            width="140"
            height="120"
            fill={i === 5 ? 'rgba(227,180,74,0.14)' : '#12110f'}
            stroke={i === 5 ? '#E3B44A' : 'rgba(242,241,238,0.16)'}
            strokeWidth={i === 5 ? 2 : 1}
          />
          <text
            x={n.x + 70}
            y="328"
            fill={i === 5 ? '#E3B44A' : '#F2F1EE'}
            fontFamily="Archivo, ui-sans-serif, sans-serif"
            fontSize="18"
            fontWeight="800"
            letterSpacing="0.04em"
            textAnchor="middle"
          >
            {n.label}
          </text>
          <text
            x={n.x + 70}
            y="358"
            fill="#A9A59D"
            fontFamily="ui-monospace, monospace"
            fontSize="11"
            letterSpacing="0.16em"
            textAnchor="middle"
          >
            {n.sub}
          </text>
          {i < 5 ? (
            <path
              d={`M${n.x + 148} 340 H${n.x + 172}`}
              stroke="#E3B44A"
              strokeWidth="2"
              markerEnd="url(#pl-arrow)"
            />
          ) : null}
        </g>
      ))}

      <path
        d="M1090 400 C1090 520 110 520 110 400"
        fill="none"
        stroke="#E3B44A"
        strokeWidth="2"
        strokeDasharray="6 6"
        opacity="0.7"
      />
      <text
        x="600"
        y="560"
        fill="#E3B44A"
        fontFamily="ui-monospace, monospace"
        fontSize="14"
        letterSpacing="0.2em"
        textAnchor="middle"
      >
        LOOK BACK · THEN START AGAIN
      </text>

      <text
        x="80"
        y="640"
        fill="#A9A59D"
        fontFamily="ui-monospace, monospace"
        fontSize="14"
        letterSpacing="0.16em"
      >
        SKIP THIS STEP · REPEAT THE SAME MISTAKE
      </text>
    </svg>
  )
}
