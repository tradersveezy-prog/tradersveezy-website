export function RiskRewardChart() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 680"
      role="img"
      aria-labelledby="rr-t rr-d"
      className="ms-diagram-svg"
    >
      <title id="rr-t">Risk to reward from planned levels</title>
      <desc id="rr-d">Entry between stop and target with a clear 1 to 2.5 risk reward bar.</desc>
      <rect width="1200" height="680" fill="#060606" />
      <defs>
        <pattern id="rr-g" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M0 48H48" stroke="#F2F1EE" strokeOpacity="0.04" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1200" height="680" fill="url(#rr-g)" />
      <rect x="48" y="72" width="1104" height="536" fill="#0B0B0B" stroke="#F2F1EE" strokeOpacity="0.12" />

      <line x1="200" y1="180" x2="1000" y2="180" stroke="#4FB286" strokeWidth="2.5" />
      <text
        x="1020"
        y="186"
        fill="#4FB286"
        fontFamily="ui-monospace, monospace"
        fontSize="14"
        letterSpacing="0.12em"
      >
        TARGET
      </text>

      <line x1="200" y1="340" x2="1000" y2="340" stroke="#E3B44A" strokeWidth="2.5" />
      <text
        x="1020"
        y="346"
        fill="#E3B44A"
        fontFamily="ui-monospace, monospace"
        fontSize="14"
        letterSpacing="0.12em"
      >
        ENTRY
      </text>

      <line x1="200" y1="500" x2="1000" y2="500" stroke="#D9533B" strokeWidth="2.5" strokeDasharray="8 6" />
      <text
        x="1020"
        y="506"
        fill="#D9533B"
        fontFamily="ui-monospace, monospace"
        fontSize="14"
        letterSpacing="0.12em"
      >
        STOP
      </text>

      {/* Risk bar */}
      <rect x="420" y="340" width="48" height="160" fill="#D9533B" />
      <text
        x="444"
        y="430"
        fill="#F2F1EE"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        letterSpacing="0.1em"
        textAnchor="middle"
        transform="rotate(-90 444 430)"
      >
        1R RISK
      </text>

      {/* Reward bar */}
      <rect x="540" y="180" width="48" height="160" fill="#4FB286" />
      <text
        x="564"
        y="270"
        fill="#060606"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        fontWeight="700"
        letterSpacing="0.08em"
        textAnchor="middle"
        transform="rotate(-90 564 270)"
      >
        2.5R REWARD
      </text>

      <text
        x="640"
        y="360"
        fill="#F2F1EE"
        fontFamily="Archivo, ui-sans-serif, sans-serif"
        fontSize="36"
        fontWeight="800"
        letterSpacing="0.04em"
      >
        1 : 2.5
      </text>
      <text
        x="640"
        y="400"
        fill="#A9A59D"
        fontFamily="ui-monospace, monospace"
        fontSize="14"
        letterSpacing="0.14em"
      >
        KNOW IT BEFORE YOU SIZE
      </text>

      <text
        x="80"
        y="640"
        fill="#A9A59D"
        fontFamily="ui-monospace, monospace"
        fontSize="14"
        letterSpacing="0.16em"
      >
        UNDER ~1.5R · USUALLY A PASS
      </text>
    </svg>
  )
}
