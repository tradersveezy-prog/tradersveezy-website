import { marked } from 'marked'

export type BlogPost = {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  draft: boolean
  body: string
  html: string
}

const modules = import.meta.glob('../content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

function parseFrontmatter(raw: string): { meta: Record<string, unknown>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) return { meta: {}, body: raw.trim() }

  const meta: Record<string, unknown> = {}
  const lines = match[1].split(/\r?\n/)
  let listKey: string | null = null

  for (const line of lines) {
    if (/^\s+-\s+/.test(line) && listKey) {
      const arr = (meta[listKey] as string[]) || []
      arr.push(line.replace(/^\s+-\s+/, '').trim().replace(/^["']|["']$/g, ''))
      meta[listKey] = arr
      continue
    }
    listKey = null
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (!kv) continue
    const key = kv[1]
    const val = kv[2].trim()
    if (val === '' || val === '|' || val === '>') {
      listKey = key
      meta[key] = meta[key] || []
      continue
    }
    if (val === 'true') meta[key] = true
    else if (val === 'false') meta[key] = false
    else meta[key] = val.replace(/^["']|["']$/g, '')
  }

  return { meta, body: match[2].trim() }
}

function slugFromPath(path: string): string {
  const file = path.split('/').pop() || path
  return file.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '')
}

marked.setOptions({ gfm: true, breaks: false })

function loadPosts(): BlogPost[] {
  const posts: BlogPost[] = []

  for (const [path, raw] of Object.entries(modules)) {
    if (path.endsWith('/README.md')) continue
    const { meta, body } = parseFrontmatter(raw)
    const title = String(meta.title || slugFromPath(path))
    const date = String(meta.date || '1970-01-01')
    const excerpt = String(meta.excerpt || '')
    const tags = Array.isArray(meta.tags) ? (meta.tags as string[]) : []
    const draft = Boolean(meta.draft)
    const html = marked.parse(body) as string

    posts.push({
      slug: slugFromPath(path),
      title,
      date,
      excerpt,
      tags,
      draft,
      body,
      html,
    })
  }

  return posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
}

const ALL = loadPosts()

export function getAllPosts(includeDrafts = false): BlogPost[] {
  return includeDrafts ? ALL : ALL.filter((p) => !p.draft)
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return ALL.find((p) => p.slug === slug)
}

export function formatPostDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00`)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
