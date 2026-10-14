export function LossReviewChart() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 680"
      role="img"
      aria-labelledby="lr-t lr-d"
      className="ms-diagram-svg"
    >
      <title id="lr-t">Loss review before next risk</title>
      <desc id="lr-d">Fork after a stop: revenge path vs written review path.</desc>
      <rect width="1200" height="680" fill="#060606" />
      <defs>
        <pattern id="lr-g" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M0 48H48" stroke="#F2F1EE" strokeOpacity="0.04" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1200" height="680" fill="url(#lr-g)" />
      <rect x="48" y="72" width="1104" height="536" fill="#0B0B0B" stroke="#F2F1EE" strokeOpacity="0.12" />

      <rect x="420" y="120" width="360" height="88" fill="#12110f" stroke="#D9533B" strokeWidth="2" />
      <text
        x="600"
        y="172"
        fill="#F2F1EE"
        fontFamily="Archivo, ui-sans-serif, sans-serif"
        fontSize="26"
        fontWeight="800"
        letterSpacing="0.04em"
        textAnchor="middle"
      >
        STOP HIT
      </text>

      {/* Revenge path */}
      <path d="M480 208 L280 300" stroke="#D9533B" strokeWidth="2" />
      <rect x="120" y="300" width="320" height="200" fill="#12110f" stroke="#D9533B" strokeWidth="1.5" />
      <text
        x="280"
        y="350"
        fill="#D9533B"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        letterSpacing="0.18em"
        textAnchor="middle"
      >
        DON'T
      </text>
      <text
        x="280"
        y="400"
        fill="#F2F1EE"
        fontFamily="Archivo, ui-sans-serif, sans-serif"
        fontSize="22"
        fontWeight="800"
        letterSpacing="0.03em"
        textAnchor="middle"
      >
        SIZE UP ANGRY
      </text>
      <text
        x="280"
        y="440"
        fill="#A9A59D"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        letterSpacing="0.08em"
        textAnchor="middle"
      >
        Deeper hole · same mistake
      </text>

      {/* Review path */}
      <path d="M720 208 L920 300" stroke="#E3B44A" strokeWidth="2" />
      <rect x="760" y="300" width="320" height="200" fill="rgba(227,180,74,0.1)" stroke="#E3B44A" strokeWidth="2" />
      <text
        x="920"
        y="350"
        fill="#E3B44A"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        letterSpacing="0.18em"
        textAnchor="middle"
      >
        DO THIS
      </text>
      <text
        x="920"
        y="400"
        fill="#F2F1EE"
        fontFamily="Archivo, ui-sans-serif, sans-serif"
        fontSize="22"
        fontWeight="800"
        letterSpacing="0.03em"
        textAnchor="middle"
      >
        WRITE A SHORT REVIEW
      </text>
      <text
        x="920"
        y="440"
        fill="#A9A59D"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        letterSpacing="0.08em"
        textAnchor="middle"
      >
        Then trade again — or sit out
      </text>

      <text
        x="80"
        y="640"
        fill="#A9A59D"
        fontFamily="ui-monospace, monospace"
        fontSize="14"
        letterSpacing="0.16em"
      >
        MY MISTAKE OR BAD BEAT? · WHAT NEXT TIME?
      </text>
    </svg>
  )
}
