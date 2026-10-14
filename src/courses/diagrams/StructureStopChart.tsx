export function StructureStopChart() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 680"
      role="img"
      aria-labelledby="ss-t ss-d"
      className="ms-diagram-svg"
    >
      <title id="ss-t">Structure-based hard stop</title>
      <desc id="ss-d">Long entry above a level with stop beyond the swing low that kills the idea.</desc>
      <rect width="1200" height="680" fill="#060606" />
      <defs>
        <pattern id="ss-g" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M0 48H48" stroke="#F2F1EE" strokeOpacity="0.04" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1200" height="680" fill="url(#ss-g)" />
      <rect x="48" y="72" width="1104" height="536" fill="#0B0B0B" stroke="#F2F1EE" strokeOpacity="0.12" />

      <line x1="160" y1="300" x2="1080" y2="300" stroke="#E3B44A" strokeWidth="2.5" />
      <rect x="990" y="282" width="100" height="28" fill="#E3B44A" />
      <text
        x="1040"
        y="301"
        fill="#060606"
        fontFamily="ui-monospace, monospace"
        fontSize="12"
        fontWeight="700"
        letterSpacing="0.08em"
        textAnchor="middle"
      >
        LEVEL
      </text>

      <line
        x1="160"
        y1="480"
        x2="1080"
        y2="480"
        stroke="#D9533B"
        strokeWidth="2.5"
        strokeDasharray="8 6"
      />
      <rect x="990" y="462" width="100" height="28" fill="#D9533B" />
      <text
        x="1040"
        y="481"
        fill="#F2F1EE"
        fontFamily="ui-monospace, monospace"
        fontSize="12"
        fontWeight="700"
        letterSpacing="0.08em"
        textAnchor="middle"
      >
        STOP
      </text>

      <g strokeWidth="2.5">
        <g stroke="#D9533B" fill="#D9533B">
          <line x1="220" y1="260" x2="220" y2="420" />
          <rect x="208" y="280" width="24" height="100" />
          <line x1="300" y1="240" x2="300" y2="400" />
          <rect x="288" y="260" width="24" height="90" />
        </g>
        <g stroke="#4FB286" fill="#4FB286">
          <line x1="400" y1="200" x2="400" y2="360" />
          <rect x="388" y="220" width="24" height="100" />
          <line x1="500" y1="160" x2="500" y2="320" />
          <rect x="488" y="180" width="24" height="100" />
        </g>
        <g stroke="#D9533B" fill="#D9533B">
          <line x1="600" y1="220" x2="600" y2="500" />
          <rect x="588" y="280" width="24" height="140" />
        </g>
        <g stroke="#4FB286" fill="#4FB286">
          <line x1="720" y1="240" x2="720" y2="380" />
          <rect x="708" y="260" width="24" height="90" />
          <line x1="820" y1="180" x2="820" y2="340" />
          <rect x="808" y="200" width="24" height="100" />
          <line x1="920" y1="140" x2="920" y2="300" />
          <rect x="908" y="160" width="24" height="100" />
        </g>
      </g>

      <circle cx="720" cy="300" r="10" fill="none" stroke="#E3B44A" strokeWidth="2" />
      <text
        x="720"
        y="270"
        fill="#E3B44A"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        letterSpacing="0.14em"
        textAnchor="middle"
      >
        ENTRY
      </text>

      <circle cx="600" cy="500" r="10" fill="none" stroke="#D9533B" strokeWidth="2" />
      <text
        x="600"
        y="540"
        fill="#D9533B"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        letterSpacing="0.12em"
        textAnchor="middle"
      >
        BEYOND SWING
      </text>

      <text
        x="80"
        y="640"
        fill="#A9A59D"
        fontFamily="ui-monospace, monospace"
        fontSize="14"
        letterSpacing="0.16em"
      >
        STRUCTURE FIRST · THEN ATR
      </text>
    </svg>
  )
}
