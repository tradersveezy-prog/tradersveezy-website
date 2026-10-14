export function AtrConfirmChart() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 680"
      role="img"
      aria-labelledby="ac-t ac-d"
      className="ms-diagram-svg"
    >
      <title id="ac-t">ATR confirms structure stop distance</title>
      <desc id="ac-d">
        Entry with a structure stop inside a healthy ATR band between roughly 0.75× and 2× ATR.
      </desc>
      <rect width="1200" height="680" fill="#060606" />
      <defs>
        <pattern id="ac-g" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M0 48H48" stroke="#F2F1EE" strokeOpacity="0.04" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1200" height="680" fill="url(#ac-g)" />
      <rect x="48" y="72" width="1104" height="536" fill="#0B0B0B" stroke="#F2F1EE" strokeOpacity="0.12" />

      {/* ATR healthy band shading from entry */}
      <rect x="200" y="280" width="720" height="200" fill="#E3B44A" fillOpacity="0.08" />
      <line x1="200" y1="280" x2="920" y2="280" stroke="#E3B44A" strokeWidth="1.5" strokeOpacity="0.5" />
      <line x1="200" y1="480" x2="920" y2="480" stroke="#E3B44A" strokeWidth="1.5" strokeOpacity="0.5" />

      <text
        x="920"
        y="268"
        fill="#E3B44A"
        fontFamily="ui-monospace, monospace"
        fontSize="12"
        letterSpacing="0.12em"
        textAnchor="end"
      >
        ~0.75× ATR
      </text>
      <text
        x="920"
        y="502"
        fill="#E3B44A"
        fontFamily="ui-monospace, monospace"
        fontSize="12"
        letterSpacing="0.12em"
        textAnchor="end"
      >
        ~2× ATR
      </text>

      <line x1="160" y1="220" x2="1080" y2="220" stroke="#4FB286" strokeWidth="2.5" />
      <rect x="990" y="202" width="100" height="28" fill="#4FB286" />
      <text
        x="1040"
        y="221"
        fill="#060606"
        fontFamily="ui-monospace, monospace"
        fontSize="12"
        fontWeight="700"
        letterSpacing="0.08em"
        textAnchor="middle"
      >
        ENTRY
      </text>

      <line x1="160" y1="400" x2="1080" y2="400" stroke="#D9533B" strokeWidth="2.5" strokeDasharray="8 6" />
      <rect x="960" y="382" width="130" height="28" fill="#D9533B" />
      <text
        x="1025"
        y="401"
        fill="#F2F1EE"
        fontFamily="ui-monospace, monospace"
        fontSize="12"
        fontWeight="700"
        letterSpacing="0.06em"
        textAnchor="middle"
      >
        STRUCT STOP
      </text>

      {/* Vertical measure */}
      <line x1="340" y1="220" x2="340" y2="400" stroke="#F2F1EE" strokeWidth="1.5" strokeOpacity="0.35" />
      <circle cx="340" cy="220" r="5" fill="#4FB286" />
      <circle cx="340" cy="400" r="5" fill="#D9533B" />
      <text
        x="360"
        y="320"
        fill="#F2F1EE"
        fontFamily="ui-monospace, monospace"
        fontSize="14"
        letterSpacing="0.1em"
      >
        ≈ 1.1× ATR ✓
      </text>

      <text
        x="200"
        y="160"
        fill="#A9A59D"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        letterSpacing="0.14em"
      >
        TOO TIGHT ← NOISE
      </text>
      <text
        x="200"
        y="560"
        fill="#A9A59D"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        letterSpacing="0.14em"
      >
        TOO WIDE → CUT SIZE OR PASS
      </text>

      <text
        x="80"
        y="640"
        fill="#A9A59D"
        fontFamily="ui-monospace, monospace"
        fontSize="14"
        letterSpacing="0.16em"
      >
        ATR CONFIRMS · DOES NOT PLACE THE STOP
      </text>
    </svg>
  )
}
