# TraderSveezy Website

Branded site for [TraderSveezy](https://x.com/tradersveezy) — crypto trading education.

Built from the brand kit in the Trader Sveezy design pack (ink / signal gold / Archivo · Barlow · JetBrains Mono).

## Pages (path URLs)

- `/` — Home
- `/mintscript` — MintScript desk sales page
- `/coaching` — 1-on-1 packages
- `/courses` — 5-course playbook
- `/tools` — Market Radar
- `/partners` — brand partnerships
- `/about` — credentials & story

SEO: per-page meta + Open Graph/Twitter via `react-helmet-async`, JSON-LD rich results, `sitemap.xml`, `robots.txt`. GitHub Pages SPA fallback copies `index.html` → `404.html` on build.

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

Repo: https://github.com/tradersveezy-prog/tradersveezy-website  
Pages source: `gh-pages` branch (custom domain already set in repo settings).

**DNS at your registrar** (Namecheap, Cloudflare, GoDaddy, etc.):

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

After DNS propagates (can take minutes to a few hours), open **Settings → Pages** in the repo and tick **Enforce HTTPS**.

**Redeploy after changes**

```bash
npm run build
# then publish dist/ to the gh-pages branch (ask the agent, or use a Pages Action once the token has `workflow` scope)
```

## Brand

See `CLAUDE.md` for locked colours, type, mark usage, and voice.
