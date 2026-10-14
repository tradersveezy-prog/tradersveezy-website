export function MultiTouchChart() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 680"
      role="img"
      aria-labelledby="mt-t mt-d"
      className="ms-diagram-svg"
    >
      <title id="mt-t">Multi-touch level — held twice</title>
      <desc id="mt-d">A horizontal level defended twice.</desc>
      <rect width="1200" height="680" fill="#060606" />
      <defs>
        <pattern id="mt-g" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M0 48H48" stroke="#F2F1EE" strokeOpacity="0.04" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1200" height="680" fill="url(#mt-g)" />
      <rect x="48" y="72" width="1104" height="536" fill="#0B0B0B" stroke="#F2F1EE" strokeOpacity="0.12" />
      <line x1="120" y1="380" x2="1080" y2="380" stroke="#E3B44A" strokeWidth="2.5" />
      <rect x="1000" y="360" width="100" height="28" fill="#E3B44A" />
      <text
        x="1050"
        y="379"
        fill="#060606"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        fontWeight="700"
        letterSpacing="0.1em"
        textAnchor="middle"
      >
        LEVEL
      </text>
      <g strokeWidth="2.5">
        <g stroke="#4FB286" fill="#4FB286">
          <line x1="200" y1="220" x2="200" y2="360" />
          <rect x="188" y="240" width="24" height="80" />
          <line x1="280" y1="180" x2="280" y2="320" />
          <rect x="268" y="190" width="24" height="90" />
          <line x1="520" y1="200" x2="520" y2="380" />
          <rect x="508" y="210" width="24" height="100" />
          <line x1="600" y1="160" x2="600" y2="300" />
          <rect x="588" y="170" width="24" height="85" />
          <line x1="840" y1="180" x2="840" y2="370" />
          <rect x="828" y="190" width="24" height="100" />
          <line x1="920" y1="140" x2="920" y2="280" />
          <rect x="908" y="150" width="24" height="90" />
          <line x1="1000" y1="120" x2="1000" y2="260" />
          <rect x="988" y="130" width="24" height="85" />
        </g>
        <g stroke="#D9533B" fill="#D9533B">
          <line x1="360" y1="200" x2="360" y2="395" />
          <rect x="348" y="220" width="24" height="100" />
          <line x1="440" y1="240" x2="440" y2="400" />
          <rect x="428" y="250" width="24" height="90" />
          <line x1="680" y1="180" x2="680" y2="400" />
          <rect x="668" y="200" width="24" height="110" />
          <line x1="760" y1="220" x2="760" y2="395" />
          <rect x="748" y="240" width="24" height="90" />
        </g>
      </g>
      <g fill="none" stroke="#E3B44A" strokeWidth="2">
        <circle cx="440" cy="400" r="16" />
        <circle cx="760" cy="395" r="16" />
      </g>
      <text
        x="440"
        y="460"
        fill="#E3B44A"
        fontFamily="ui-monospace, monospace"
        fontSize="14"
        letterSpacing="0.16em"
        textAnchor="middle"
      >
        HOLD 1
      </text>
      <text
        x="760"
        y="460"
        fill="#E3B44A"
        fontFamily="ui-monospace, monospace"
        fontSize="14"
        letterSpacing="0.16em"
        textAnchor="middle"
      >
        HOLD 2
      </text>
      <text
        x="48"
        y="48"
        fill="#E3B44A"
        fontFamily="ui-monospace, monospace"
        fontSize="14"
        letterSpacing="0.22em"
      >
        WHERE SIDES ALREADY REACTED
      </text>
      <text
        x="48"
        y="640"
        fill="#A9A59D"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        letterSpacing="0.08em"
      >
        Held twice = real interest from buyers and sellers — not a random line
      </text>
    </svg>
  )
}
