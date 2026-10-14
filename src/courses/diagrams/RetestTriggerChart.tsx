export function RetestTriggerChart() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 680"
      role="img"
      aria-labelledby="rt-t rt-d"
      className="ms-diagram-svg"
    >
      <title id="rt-t">Retest after market structure shift</title>
      <desc id="rt-d">
        Break of a level with closes, then revisit to that level for the entry.
      </desc>
      <rect width="1200" height="680" fill="#060606" />
      <defs>
        <pattern id="rt-g" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M0 48H48" stroke="#F2F1EE" strokeOpacity="0.04" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1200" height="680" fill="url(#rt-g)" />
      <rect x="48" y="72" width="1104" height="536" fill="#0B0B0B" stroke="#F2F1EE" strokeOpacity="0.12" />

      <line x1="160" y1="360" x2="1080" y2="360" stroke="#E3B44A" strokeWidth="2.5" />
      <rect x="990" y="342" width="110" height="28" fill="#E3B44A" />
      <text
        x="1045"
        y="361"
        fill="#060606"
        fontFamily="ui-monospace, monospace"
        fontSize="12"
        fontWeight="700"
        letterSpacing="0.08em"
        textAnchor="middle"
      >
        BROKEN LVL
      </text>

      <g strokeWidth="2.5">
        <g stroke="#D9533B" fill="#D9533B">
          <line x1="200" y1="300" x2="200" y2="420" />
          <rect x="188" y="320" width="24" height="70" />
          <line x1="280" y1="280" x2="280" y2="400" />
          <rect x="268" y="300" width="24" height="70" />
        </g>
        {/* Break with closes */}
        <g stroke="#4FB286" fill="#4FB286">
          <line x1="400" y1="240" x2="400" y2="380" />
          <rect x="388" y="250" width="24" height="100" />
          <line x1="480" y1="180" x2="480" y2="320" />
          <rect x="468" y="190" width="24" height="90" />
          <line x1="560" y1="160" x2="560" y2="280" />
          <rect x="548" y="170" width="24" height="80" />
        </g>
        {/* Retest */}
        <g stroke="#D9533B" fill="#D9533B">
          <line x1="680" y1="200" x2="680" y2="370" />
          <rect x="668" y="220" width="24" height="100" />
        </g>
        <g stroke="#4FB286" fill="#4FB286">
          <line x1="760" y1="240" x2="760" y2="370" />
          <rect x="748" y="260" width="24" height="80" />
          <line x1="840" y1="180" x2="840" y2="320" />
          <rect x="828" y="200" width="24" height="80" />
          <line x1="920" y1="140" x2="920" y2="280" />
          <rect x="908" y="150" width="24" height="90" />
        </g>
      </g>

      <circle cx="520" cy="240" r="10" fill="none" stroke="#E3B44A" strokeWidth="2" />
      <text
        x="520"
        y="210"
        fill="#E3B44A"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        letterSpacing="0.14em"
        textAnchor="middle"
      >
        MSS + CLOSES
      </text>

      <circle cx="760" cy="360" r="12" fill="none" stroke="#4FB286" strokeWidth="2" />
      <rect x="800" y="400" width="200" height="52" fill="#161513" stroke="#4FB286" />
      <text
        x="900"
        y="424"
        fill="#4FB286"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        letterSpacing="0.14em"
        textAnchor="middle"
      >
        RETEST ENTRY
      </text>
      <text
        x="900"
        y="442"
        fill="#F2F1EE"
        fontFamily="ui-monospace, monospace"
        fontSize="12"
        letterSpacing="0.06em"
        textAnchor="middle"
      >
        revisit the broken level
      </text>

      <text
        x="48"
        y="48"
        fill="#E3B44A"
        fontFamily="ui-monospace, monospace"
        fontSize="14"
        letterSpacing="0.22em"
      >
        RETEST AFTER STRUCTURE SHIFT
      </text>
      <text
        x="48"
        y="640"
        fill="#A9A59D"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        letterSpacing="0.08em"
      >
        Break locks with closes · enter on the revisit — not the chase after the first impulse
      </text>
    </svg>
  )
}
