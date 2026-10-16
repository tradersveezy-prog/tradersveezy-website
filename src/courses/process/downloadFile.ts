import { track } from '../../lib/analytics'

/** Fetch a static asset and save it with an explicit filename (avoids SPA 404.html saves). */
export async function downloadFile(path: string, filename: string) {
  const url = `${path}${path.includes('?') ? '&' : '?'}v=20261015`
  const res = await fetch(url, { cache: 'no-cache' })
  if (!res.ok) throw new Error(`Download failed (${res.status})`)
  const type = res.headers.get('content-type') || ''
  if (type.includes('text/html')) {
    throw new Error('Got a web page instead of the file — hard-refresh and try again.')
  }
  const blob = await res.blob()
  const objectUrl = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = objectUrl
  a.download = filename
  a.rel = 'noopener'
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(objectUrl)
  track('file_downloaded', { filename, path })
}

export function filenameFromPath(path: string) {
  return path.split('/').pop()?.split('?')[0] || 'download.xlsx'
}
