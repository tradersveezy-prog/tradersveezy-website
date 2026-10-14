export function SizeFromRiskChart() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 680"
      role="img"
      aria-labelledby="sz-t sz-d"
      className="ms-diagram-svg"
    >
      <title id="sz-t">Position size from dollar risk and stop distance</title>
      <desc id="sz-d">Same dollar risk with a wider stop means a smaller position size.</desc>
      <rect width="1200" height="680" fill="#060606" />
      <defs>
        <pattern id="sz-g" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M0 48H48" stroke="#F2F1EE" strokeOpacity="0.04" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1200" height="680" fill="url(#sz-g)" />
      <rect x="48" y="72" width="1104" height="536" fill="#0B0B0B" stroke="#F2F1EE" strokeOpacity="0.12" />

      <text
        x="600"
        y="130"
        fill="#E3B44A"
        fontFamily="ui-monospace, monospace"
        fontSize="14"
        letterSpacing="0.2em"
        textAnchor="middle"
      >
        DOLLAR RISK IS THE CONSTANT
      </text>

      {/* Panel A — tight stop */}
      <rect x="100" y="180" width="460" height="360" fill="#12110f" stroke="#F2F1EE" strokeOpacity="0.12" />
      <text
        x="330"
        y="220"
        fill="#A9A59D"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        letterSpacing="0.16em"
        textAnchor="middle"
      >
        TIGHTER STOP
      </text>
      <text
        x="330"
        y="280"
        fill="#F2F1EE"
        fontFamily="Archivo, ui-sans-serif, sans-serif"
        fontSize="28"
        fontWeight="800"
        letterSpacing="0.03em"
        textAnchor="middle"
      >
        $100 RISK
      </text>
      <text
        x="330"
        y="330"
        fill="#A9A59D"
        fontFamily="ui-monospace, monospace"
        fontSize="15"
        letterSpacing="0.08em"
        textAnchor="middle"
      >
        ÷ $50 DISTANCE
      </text>
      <text
        x="330"
        y="400"
        fill="#E3B44A"
        fontFamily="Archivo, ui-sans-serif, sans-serif"
        fontSize="42"
        fontWeight="800"
        letterSpacing="0.02em"
        textAnchor="middle"
      >
        2 UNITS
      </text>
      <text
        x="330"
        y="460"
        fill="#4FB286"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        letterSpacing="0.14em"
        textAnchor="middle"
      >
        LARGER SIZE
      </text>

      {/* Panel B — wide stop */}
      <rect x="640" y="180" width="460" height="360" fill="#12110f" stroke="#F2F1EE" strokeOpacity="0.12" />
      <text
        x="870"
        y="220"
        fill="#A9A59D"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        letterSpacing="0.16em"
        textAnchor="middle"
      >
        WIDER STOP
      </text>
      <text
        x="870"
        y="280"
        fill="#F2F1EE"
        fontFamily="Archivo, ui-sans-serif, sans-serif"
        fontSize="28"
        fontWeight="800"
        letterSpacing="0.03em"
        textAnchor="middle"
      >
        $100 RISK
      </text>
      <text
        x="870"
        y="330"
        fill="#A9A59D"
        fontFamily="ui-monospace, monospace"
        fontSize="15"
        letterSpacing="0.08em"
        textAnchor="middle"
      >
        ÷ $100 DISTANCE
      </text>
      <text
        x="870"
        y="400"
        fill="#E3B44A"
        fontFamily="Archivo, ui-sans-serif, sans-serif"
        fontSize="42"
        fontWeight="800"
        letterSpacing="0.02em"
        textAnchor="middle"
      >
        1 UNIT
      </text>
      <text
        x="870"
        y="460"
        fill="#D9533B"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        letterSpacing="0.14em"
        textAnchor="middle"
      >
        SMALLER SIZE
      </text>

      <text
        x="80"
        y="640"
        fill="#A9A59D"
        fontFamily="ui-monospace, monospace"
        fontSize="14"
        letterSpacing="0.16em"
      >
        SIZE = (ACCOUNT × RISK %) ÷ STOP DISTANCE
      </text>
    </svg>
  )
}
