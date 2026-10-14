# Your dump — Entries & Triggers

Locked from your fill (2026-10-11). Base64 charts extracted to `examples/` and `public/curriculum/03/`.

---

## In your own words

### Entry vs trigger

- **Entry** — where you enter the trade.
- **Trigger** — the signal that confirms the idea. Nothing is guaranteed; we play probabilities.

> You can't regret a well thought out plan.

**Also:** Execution matters more than the entry. You can enter late and still do well if you execute. A “better” fill than planned can mean the idea is wrong.

### Timeframes

| Role | TF |
|------|-----|
| Context | **12H · 6H** |
| Trigger / entry | **15m · 30m** |

Candle closes matter — one hourly close, or a few 15/30m closes.

### Triggers

#### 1) Retest (after MSS)

Market structure shifts after a liquidity level (PWH, PDL, order block, weekly support, etc.) and price breaks the local high/low on at least the **30m** with **1–2 closes**.  
The **retest** is the revisit to the broken level that caused the MSS.

#### 2) EMA reclaim

Watch: **4H 200**, **4H 55**, **15m 21 / 55 / 200**.

Reclaim = a **strong impulse** through a protected level, then **2–3 closes** holding that side. That shows acceptance — the other side could not push price back.

#### 3) Breakout — reject · break · sweep · reclaim

A level is breakout-worthy after roughly **5 rejections**.

Typical sequence (see ENA 30m):

1. Rejected ~5 times at the level  
2. **Break** with a candle **close** through the level  
3. **Sweep** back the other way for liquidity  
4. **Entry** on the **reclaim** after that sweep  
5. Hard stop past the sweep extreme  

Live example: `ena-30m-breakout.png`

#### 4) Other entries you use

- VAL reclaim for longs · VAH reclaim for shorts  
- S/R flips · OB breaks as new retest zones  
- Volume support — directional volume, not only shorts/longs covering  
- DCA when leverage stop would be wider than ~6% (optional); sometimes full planned entry

### Invalidation

Hard stops. No soft stops. The idea is right or wrong — if a wick takes you out and price continues, live to fight another day.

Macro and news matter (bonds, gold, DXY, oil, war, health). Stay informed. Accounts you recommend:

- [@sentdefender](https://x.com/sentdefender) — geopolitical  
- [@solidintel_x](https://x.com/solidintel_x) — econ / crypto / war  
- [@KobeissiLetter](https://x.com/KobeissiLetter) — global markets (top pick)  
- [@lookonchain](https://x.com/lookonchain) — large orders / crowded positioning  

### What you refuse

- Chase when price already hit **TP2** of the plan (TP1 is OK — shows acceptance)  
- Enter on the first candle unless it is a **strong impulse** (extreme wicks alone ≠ conviction)  
- Soft stops  

### Examples (extracted)

| File | Pair / TF | Trigger | Teach |
|------|-----------|---------|-------|
| `apt-4h-ema-reclaim.png` | APTUSDT.P · 4H | EMA reclaim | Reclaimed 21 + 55 EMA area |
| `avax-6h-val-break.png` | AVAXUSDT.P · 6H | Value break | Lost VAL / value — short opportunity |
| `bch-8h-monday-low.png` | BCHUSDT.P · 8H | Level break | Lost Monday low — short trigger |
| `ena-30m-breakout.png` | ENAUSDT.P · 30m | Breakout | Touches · sweep · entry |

### Hate in “entries” courses

FOMO entries, indicator soup, “just buy the breakout,” soft stops, and pretending TA ignores macro.
