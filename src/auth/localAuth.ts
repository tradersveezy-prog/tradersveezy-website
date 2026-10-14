/** Browser-only accounts when Supabase isn’t configured. Not for production. */

const USERS_KEY = 'ts-auth-users'
const SESSION_KEY = 'ts-auth-session'

export type LocalUser = { id: string; email: string; displayName: string }

type StoredUser = LocalUser & { pass: string }

function readUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]') as StoredUser[]
  } catch {
    return []
  }
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function normalizeName(name: string) {
  return name.trim().replace(/\s+/g, ' ').slice(0, 40)
}

function toSession(u: StoredUser | LocalUser): LocalUser {
  return {
    id: u.id,
    email: u.email,
    displayName: u.displayName || u.email.split('@')[0] || 'Trader',
  }
}

export function localGetSession(): LocalUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const session = JSON.parse(raw) as Partial<LocalUser>
    if (!session.id || !session.email) return null
    const stored = readUsers().find((u) => u.id === session.id)
    if (stored) return toSession(stored)
    return toSession({
      id: session.id,
      email: session.email,
      displayName: session.displayName || '',
      pass: '',
    })
  } catch {
    return null
  }
}

export function localSignUp(
  email: string,
  password: string,
  displayName: string,
): { user?: LocalUser; error?: string } {
  const normalized = email.trim().toLowerCase()
  const name = normalizeName(displayName)
  if (!normalized || !password) return { error: 'Email and password required.' }
  if (!name) return { error: 'Display name required.' }
  if (name.length < 2) return { error: 'Display name must be at least 2 characters.' }
  if (password.length < 6) return { error: 'Password must be at least 6 characters.' }
  const users = readUsers()
  if (users.some((u) => u.email === normalized)) return { error: 'An account with that email already exists.' }
  const user: StoredUser = {
    id: crypto.randomUUID(),
    email: normalized,
    displayName: name,
    pass: password,
  }
  users.push(user)
  writeUsers(users)
  const session = toSession(user)
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return { user: session }
}

export function localSignIn(email: string, password: string): { user?: LocalUser; error?: string } {
  const normalized = email.trim().toLowerCase()
  const users = readUsers()
  const hit = users.find((u) => u.email === normalized && u.pass === password)
  if (!hit) return { error: 'Wrong email or password.' }
  const session = toSession(hit)
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return { user: session }
}

export function localUpdateDisplayName(displayName: string): { user?: LocalUser; error?: string } {
  const name = normalizeName(displayName)
  if (!name) return { error: 'Display name required.' }
  if (name.length < 2) return { error: 'Display name must be at least 2 characters.' }
  const session = localGetSession()
  if (!session) return { error: 'Not signed in.' }
  const users = readUsers()
  const idx = users.findIndex((u) => u.id === session.id)
  if (idx < 0) return { error: 'Account not found.' }
  users[idx] = { ...users[idx], displayName: name }
  writeUsers(users)
  const next = toSession(users[idx])
  localStorage.setItem(SESSION_KEY, JSON.stringify(next))
  return { user: next }
}

export function localSignOut() {
  localStorage.removeItem(SESSION_KEY)
}
