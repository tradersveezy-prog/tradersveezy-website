/** Interactive modules that count toward the shareable playbook cert. */
export const LIVE_COURSES = [
  { id: '01', title: 'Market Structure', path: '/courses/market-structure' },
  { id: '02', title: 'Levels That Matter', path: '/courses/levels-that-matter' },
  { id: '03', title: 'Entries & Triggers', path: '/courses/entries-triggers' },
  { id: '04', title: 'Risk & Position Sizing', path: '/courses/risk-position-sizing' },
  { id: '05', title: 'Process & Review', path: '/courses/process-review' },
] as const

export type LiveCourseId = (typeof LIVE_COURSES)[number]['id']

const KEY = 'ts-course-complete'

function read(): LiveCourseId[] {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '[]') as unknown
    if (!Array.isArray(raw)) return []
    const ids = new Set(LIVE_COURSES.map((c) => c.id))
    return raw.filter((id): id is LiveCourseId => typeof id === 'string' && ids.has(id as LiveCourseId))
  } catch {
    return []
  }
}

function write(ids: LiveCourseId[]) {
  localStorage.setItem(KEY, JSON.stringify([...new Set(ids)]))
}

export function markCourseComplete(id: LiveCourseId) {
  const next = read()
  if (!next.includes(id)) {
    next.push(id)
    write(next)
  }
}

export function isCourseComplete(id: LiveCourseId) {
  return read().includes(id)
}

export function completedCourseIds() {
  return read()
}

export function allLiveCoursesComplete() {
  const done = new Set(read())
  return LIVE_COURSES.every((c) => done.has(c.id))
}

export function liveProgress() {
  const done = read()
  return { done: done.length, total: LIVE_COURSES.length, ids: done }
}
