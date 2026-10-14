/** Two wide-body candles sharing a flat open/close — that level is the magnet. */
export function FlatBodyMagnetChart() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 680"
      role="img"
      aria-labelledby="fb-t fb-d"
      className="ms-diagram-svg"
    >
      <title id="fb-t">Two wide flat candles — shared level as magnet</title>
      <desc id="fb-d">
        A wide bearish candle closes flat into a level. A wide bullish candle opens from the same
        flat. That shared edge often pulls price back later.
      </desc>
      <rect width="1200" height="680" fill="#060606" />
      <defs>
        <pattern id="fb-g" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M0 48H48" stroke="#F2F1EE" strokeOpacity="0.04" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1200" height="680" fill="url(#fb-g)" />
      <rect x="48" y="72" width="1104" height="536" fill="#0B0B0B" stroke="#F2F1EE" strokeOpacity="0.12" />

      {/* Shared flat level across chart */}
      <line x1="160" y1="380" x2="1080" y2="380" stroke="#E3B44A" strokeWidth="2.5" />
      <rect x="1000" y="362" width="100" height="28" fill="#E3B44A" />
      <text
        x="1050"
        y="381"
        fill="#060606"
        fontFamily="ui-monospace, monospace"
        fontSize="12"
        fontWeight="700"
        letterSpacing="0.1em"
        textAnchor="middle"
      >
        FLAT
      </text>

      <g strokeWidth="2.5">
        {/* Lead-in */}
        <g stroke="#4FB286" fill="#4FB286">
          <line x1="200" y1="180" x2="200" y2="300" />
          <rect x="188" y="200" width="24" height="70" />
          <line x1="280" y1="160" x2="280" y2="280" />
          <rect x="268" y="170" width="24" height="80" />
        </g>

        {/* Wide bearish — flat close on the level (no lower wick) */}
        <g stroke="#D9533B" fill="#D9533B">
          <line x1="400" y1="160" x2="400" y2="200" />
          <rect x="360" y="200" width="80" height="180" strokeWidth="3" />
        </g>

        {/* Wide bullish — flat open on the same level (no lower wick) */}
        <g stroke="#4FB286" fill="#4FB286">
          <line x1="520" y1="200" x2="520" y2="160" />
          <rect x="480" y="200" width="80" height="180" strokeWidth="3" />
        </g>

        {/* Leave higher, then return to the flat */}
        <g stroke="#4FB286" fill="#4FB286">
          <line x1="640" y1="140" x2="640" y2="280" />
          <rect x="628" y="150" width="24" height="90" />
          <line x1="720" y1="120" x2="720" y2="240" />
          <rect x="708" y="130" width="24" height="80" />
        </g>
        <g stroke="#D9533B" fill="#D9533B">
          <line x1="800" y1="140" x2="800" y2="360" />
          <rect x="788" y="160" width="24" height="120" />
          <line x1="880" y1="220" x2="880" y2="390" />
          <rect x="868" y="240" width="24" height="100" />
        </g>
        {/* Magnet hold at the flat */}
        <g stroke="#4FB286" fill="#4FB286">
          <line x1="960" y1="260" x2="960" y2="390" />
          <rect x="948" y="280" width="24" height="80" />
          <line x1="1040" y1="200" x2="1040" y2="340" />
          <rect x="1028" y="220" width="24" height="80" />
        </g>
      </g>

      {/* X mark at the shared flat junction */}
      <g stroke="#E3B44A" strokeWidth="3" strokeLinecap="round">
        <line x1="448" y1="368" x2="472" y2="392" />
        <line x1="472" y1="368" x2="448" y2="392" />
      </g>

      <path d="M480 400 L620 480" stroke="#E3B44A" strokeWidth="1.5" />
      <rect x="560" y="460" width="320" height="56" fill="#161513" stroke="#E3B44A" />
      <text
        x="720"
        y="484"
        fill="#E3B44A"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        letterSpacing="0.12em"
        textAnchor="middle"
      >
        TWO WIDE BODIES · SAME FLAT
      </text>
      <text
        x="720"
        y="504"
        fill="#F2F1EE"
        fontFamily="ui-monospace, monospace"
        fontSize="12"
        letterSpacing="0.06em"
        textAnchor="middle"
      >
        shared open / close = the magnet
      </text>

      <text
        x="400"
        y="420"
        fill="#D9533B"
        fontFamily="ui-monospace, monospace"
        fontSize="12"
        letterSpacing="0.1em"
        textAnchor="middle"
      >
        FLAT CLOSE
      </text>
      <text
        x="520"
        y="420"
        fill="#4FB286"
        fontFamily="ui-monospace, monospace"
        fontSize="12"
        letterSpacing="0.1em"
        textAnchor="middle"
      >
        FLAT OPEN
      </text>

      <text
        x="48"
        y="48"
        fill="#E3B44A"
        fontFamily="ui-monospace, monospace"
        fontSize="14"
        letterSpacing="0.22em"
      >
        FLAT BODY PAIR · MAGNET
      </text>
      <text
        x="48"
        y="640"
        fill="#A9A59D"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        letterSpacing="0.08em"
      >
        Wide red closes flat · wide green opens from the same edge — mark that level; price often returns
      </text>
    </svg>
  )
}
