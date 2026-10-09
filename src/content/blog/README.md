# Desk notes — how to add a post

1. Duplicate any `.md` file in this folder.
2. Name it `yyyy-mm-dd-short-slug.md` (slug becomes the URL).
3. Fill the frontmatter, write the body in Markdown.
4. Commit and deploy — it shows up on `/blog`.

```md
---
title: Your title here
date: 2026-10-10
excerpt: One or two sentences for the index card.
tags:
  - process
  - risk
---

## Opening

Body in plain Markdown. Use **bold**, lists, and `code` for levels.

Educational only · Not financial advice — keep that energy.
```

Drafts: set `draft: true` to hide from the public list (still buildable if you know the URL — remove the file until ready if you want it fully private).
