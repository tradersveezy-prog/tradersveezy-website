# Project memory — TraderSveezy

## Brand
Extracted from the user's banner. Do not invent new colors/fonts.

- Ink `#060606`, panel `#0B0B0B`, graphite `#161513`, bone `#F2F1EE`
- Signal gold `#E3B44A` (accent, ~6% of surface — one focal thing per graphic), deep gold `#C9922F`
- Long/green `#4FB286`, short/red `#D9533B` — **data only**, never brand furniture or buttons
- Type: **Archivo** 800 uppercase + wide tracking (headings, wordmark), **Barlow** 400/500 (body), **JetBrains Mono** (all numbers, tickers, labels, eyebrows)
- Logo: `assets/ts-mark-gold.svg` (also `-ink.svg`, `-bone.svg`) — vector, traced from the user's mark. Always use these; never type "TS".
- Voice: mentor, not guru. Plain language, own the risk, never promise a number. Always footer "Educational only · Not financial advice".

## Trading cards — LOCKED TEMPLATE
When the user says "trading card" / "setup card", use **`templates/Trade Card Template.dc.html`** verbatim as the structure and only swap content. Reference build: `BTC Trade Card.dc.html`.

Format (v2 — "1A reasoning" layout, locked):
- **1200×1500** (Twitter 4:5), ink background, faint horizontal grid + gold radial glow top-right
- Header: gold mark 100px + TRADERSVEEZY (Archivo 800 / 42px) / @tradersveezy (mono 24px); right: solid gold trade-type badge (28px) + outlined direction chip (mono 600 / 22px, LONG green / SHORT red)
- Gold hairline divider
- Title row: gold mono eyebrow 22px (`LONG SETUP · PERP · 1H · BINANCE` — market/TF/exchange live here, no legend row) + Archivo 80px pair (`/USDT` gold); right: RISK : REWARD (22px) + gold ratio 56px (+ optional `SIZE $x` line for spot challenge)
- Chart panel 550px (keep it big), crisp screenshot, object-fit cover, right-aligned so the price scale shows. No scrims/overlays
- Levels: ONE row of 3 equal cells — Entry / Stop / Target — label mono 600 / 24px, number mono 700 / 50px
- Red/green R:R bar + Risk % / Reward % labels (mono 600 / 26px; add $ amounts when sized)
- "WHY I'M IN" (mono 600 / 22px) + 3 bullets, Barlow 500 / 33px, small gold square markers, one line each (~50 chars max). Use the user's reasons; if none given, draft from the chart and flag it
- Footer mono 20px: "Invalidation < SL" / "Educational only · Not financial advice"
- Minimum text size anywhere on the card: 20px; muted text #A9A59D (not darker)
- Export: if snapshot drops the chart, snapshot the card and composite the chart PNG onto the panel rect with canvas

Always: compute R:R and risk/reward % from the given levels, then crop the chart to the action (`run_script` + canvas).

**Final step is ALWAYS a PNG download — never optional, never ask.** Export the card element at 1:1 with `snapshot_element` (scale 1 → 1200×1500) to `exports/<pair>-<type>-<entry>.png` and end the turn with `present_fs_item_for_download` on that file.
