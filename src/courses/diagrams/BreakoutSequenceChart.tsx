/** Breakout sequence: 5 rejections → break close → sweep → entry on reclaim. */
export function BreakoutSequenceChart() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 680"
      role="img"
      aria-labelledby="bo-t bo-d"
      className="ms-diagram-svg"
    >
      <title id="bo-t">Breakout sequence — reject, break, sweep, reclaim entry</title>
      <desc id="bo-d">
        Level rejected five times, then a close above, a liquidity sweep below, and entry on the
        reclaim.
      </desc>
      <rect width="1200" height="680" fill="#060606" />
      <defs>
        <pattern id="bo-g" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M0 48H48" stroke="#F2F1EE" strokeOpacity="0.04" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1200" height="680" fill="url(#bo-g)" />
      <rect x="48" y="72" width="1104" height="536" fill="#0B0B0B" stroke="#F2F1EE" strokeOpacity="0.12" />

      <line x1="120" y1="280" x2="1100" y2="280" stroke="#E3B44A" strokeWidth="2.5" />
      <rect x="1000" y="262" width="100" height="28" fill="#E3B44A" />
      <text
        x="1050"
        y="281"
        fill="#060606"
        fontFamily="ui-monospace, monospace"
        fontSize="12"
        fontWeight="700"
        letterSpacing="0.1em"
        textAnchor="middle"
      >
        LEVEL
      </text>

      <g strokeWidth="2.5">
        {/* 5 rejections — wick into level, close back below */}
        <g stroke="#D9533B" fill="#D9533B">
          <line x1="160" y1="250" x2="160" y2="360" />
          <rect x="150" y="290" width="20" height="50" />
        </g>
        <g stroke="#4FB286" fill="#4FB286">
          <line x1="220" y1="255" x2="220" y2="350" />
          <rect x="210" y="300" width="20" height="40" />
        </g>
        <g stroke="#D9533B" fill="#D9533B">
          <line x1="280" y1="248" x2="280" y2="355" />
          <rect x="270" y="295" width="20" height="45" />
        </g>
        <g stroke="#4FB286" fill="#4FB286">
          <line x1="340" y1="252" x2="340" y2="348" />
          <rect x="330" y="298" width="20" height="40" />
        </g>
        <g stroke="#D9533B" fill="#D9533B">
          <line x1="400" y1="245" x2="400" y2="360" />
          <rect x="390" y="290" width="20" height="50" />
        </g>

        {/* Break above with candle close */}
        <g stroke="#4FB286" fill="#4FB286">
          <line x1="500" y1="160" x2="500" y2="300" />
          <rect x="486" y="170" width="28" height="110" />
        </g>

        {/* Sweep below for liquidity */}
        <g stroke="#D9533B" fill="#D9533B">
          <line x1="620" y1="200" x2="620" y2="480" />
          <rect x="606" y="220" width="28" height="140" />
        </g>

        {/* Reclaim — entry */}
        <g stroke="#4FB286" fill="#4FB286">
          <line x1="740" y1="180" x2="740" y2="360" />
          <rect x="726" y="190" width="28" height="120" />
          <line x1="840" y1="140" x2="840" y2="280" />
          <rect x="828" y="150" width="24" height="90" />
          <line x1="940" y1="110" x2="940" y2="250" />
          <rect x="928" y="120" width="24" height="90" />
        </g>
      </g>

      <g fontFamily="ui-monospace, monospace" letterSpacing="0.12em" textAnchor="middle">
        <text x="280" y="400" fill="#E3B44A" fontSize="13">
          5 REJECTIONS
        </text>
        <text x="500" y="140" fill="#4FB286" fontSize="13">
          BREAK · CLOSE
        </text>
        <text x="620" y="510" fill="#D9533B" fontSize="13">
          SWEEP
        </text>
        <text x="740" y="160" fill="#4FB286" fontSize="14" letterSpacing="0.16em">
          ENTRY
        </text>
      </g>

      <path d="M740 340 L780 420" stroke="#4FB286" strokeWidth="1.5" />
      <rect x="760" y="410" width="280" height="56" fill="#161513" stroke="#4FB286" />
      <text
        x="900"
        y="434"
        fill="#4FB286"
        fontFamily="ui-monospace, monospace"
        fontSize="12"
        letterSpacing="0.12em"
        textAnchor="middle"
      >
        RECLAIM AFTER SWEEP
      </text>
      <text
        x="900"
        y="452"
        fill="#F2F1EE"
        fontFamily="ui-monospace, monospace"
        fontSize="12"
        letterSpacing="0.06em"
        textAnchor="middle"
      >
        hard stop past the sweep
      </text>

      <text
        x="48"
        y="48"
        fill="#E3B44A"
        fontFamily="ui-monospace, monospace"
        fontSize="14"
        letterSpacing="0.22em"
      >
        BREAKOUT SEQUENCE
      </text>
      <text
        x="48"
        y="640"
        fill="#A9A59D"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        letterSpacing="0.08em"
      >
        Rejected 5× · close above · sweep liquidity · enter the reclaim — not the first break alone
      </text>
    </svg>
  )
}
