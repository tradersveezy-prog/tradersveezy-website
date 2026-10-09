# TraderSveezy Website

Branded site for [TraderSveezy](https://x.com/tradersveezy) — crypto trading education.

Built from the brand kit in the Trader Sveezy design pack (ink / signal gold / Archivo · Barlow · JetBrains Mono).

## Pages

- **Home** — hero, offers, recent trade cards, MintScript collab, Discord CTA
- **1-on-1** — session packages ($300 / $750 / $1,000)
- **Courses** — 5-course playbook bundle ($300)
- **Tools** — Market Radar Discord feeds
- **Collabs** — request form + MintScript partnership
- **About** — mentor voice, risk-first process

## Develop

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

## Links to plug in

Edit `src/data.ts` → `LINKS`:

- `booking` — Calendly / booking URL
- `courses` — course checkout URL
- `discord` — Discord invite

## Domain · tradersveezy.com

Hosted on GitHub Pages. After DNS is set, the site serves at https://tradersveezy.com.

At your registrar (or Cloudflare), point the domain like this:

**Apex (`tradersveezy.com`) — A records**

| Type | Host | Value |
|------|------|--------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

**www — CNAME**

| Type | Host | Value |
|------|------|--------|
| CNAME | `www` | `tradersveezy-prog.github.io` |

Then in the repo: **Settings → Pages → Custom domain** → `tradersveezy.com` → enable **Enforce HTTPS** once DNS verifies.

## Brand

See `CLAUDE.md` for locked colours, type, mark usage, and voice.
