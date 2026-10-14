export function GoodSkipChart() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 680"
      role="img"
      aria-labelledby="gs-t gs-d"
      className="ms-diagram-svg"
    >
      <title id="gs-t">Good skip when checklist fails</title>
      <desc id="gs-d">Checklist with two failing boxes and a stay flat decision.</desc>
      <rect width="1200" height="680" fill="#060606" />
      <defs>
        <pattern id="gs-g" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M0 48H48" stroke="#F2F1EE" strokeOpacity="0.04" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1200" height="680" fill="url(#gs-g)" />
      <rect x="48" y="72" width="1104" height="536" fill="#0B0B0B" stroke="#F2F1EE" strokeOpacity="0.12" />

      <text
        x="600"
        y="140"
        fill="#E3B44A"
        fontFamily="ui-monospace, monospace"
        fontSize="14"
        letterSpacing="0.22em"
        textAnchor="middle"
      >
        BEFORE A TRADE · ONE NO = SIT OUT
      </text>

      {[
        { y: 190, label: 'I know what the chart is doing', ok: true },
        { y: 260, label: 'The level is clear', ok: true },
        { y: 330, label: 'Entry type is clear', ok: true },
        { y: 400, label: 'Reward is worth the risk', ok: false },
        { y: 470, label: 'Stop has room (not too tight)', ok: false },
      ].map((row) => (
        <g key={row.label}>
          <rect
            x="200"
            y={row.y}
            width="800"
            height="56"
            fill="#12110f"
            stroke={row.ok ? 'rgba(79,178,134,0.45)' : 'rgba(217,83,59,0.55)'}
            strokeWidth="1.5"
          />
          <circle
            cx="250"
            cy={row.y + 28}
            r="14"
            fill={row.ok ? '#4FB286' : '#D9533B'}
          />
          <text
            x="250"
            y={row.y + 33}
            fill="#060606"
            fontFamily="ui-monospace, monospace"
            fontSize="14"
            fontWeight="700"
            textAnchor="middle"
          >
            {row.ok ? 'Y' : 'N'}
          </text>
          <text
            x="290"
            y={row.y + 34}
            fill="#F2F1EE"
            fontFamily="Archivo, ui-sans-serif, sans-serif"
            fontSize="20"
            fontWeight="800"
            letterSpacing="0.04em"
          >
            {row.label}
          </text>
        </g>
      ))}

      <text
        x="600"
        y="580"
        fill="#E3B44A"
        fontFamily="Archivo, ui-sans-serif, sans-serif"
        fontSize="28"
        fontWeight="800"
        letterSpacing="0.06em"
        textAnchor="middle"
      >
        SIT OUT · WRITE THAT YOU SKIPPED
      </text>
    </svg>
  )
}
