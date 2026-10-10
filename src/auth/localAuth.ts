/** Browser-only accounts when Supabase isn’t configured. Not for production. */

const USERS_KEY = 'ts-auth-users'
const SESSION_KEY = 'ts-auth-session'

export type LocalUser = { id: string; email: string }

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

export function localGetSession(): LocalUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    return JSON.parse(raw) as LocalUser
  } catch {
    return null
  }
}

export function localSignUp(email: string, password: string): { user?: LocalUser; error?: string } {
  const normalized = email.trim().toLowerCase()
  if (!normalized || !password) return { error: 'Email and password required.' }
  if (password.length < 6) return { error: 'Password must be at least 6 characters.' }
  const users = readUsers()
  if (users.some((u) => u.email === normalized)) return { error: 'An account with that email already exists.' }
  const user: StoredUser = {
    id: crypto.randomUUID(),
    email: normalized,
    pass: password,
  }
  users.push(user)
  writeUsers(users)
  const session = { id: user.id, email: user.email }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return { user: session }
}

export function localSignIn(email: string, password: string): { user?: LocalUser; error?: string } {
  const normalized = email.trim().toLowerCase()
  const users = readUsers()
  const hit = users.find((u) => u.email === normalized && u.pass === password)
  if (!hit) return { error: 'Wrong email or password.' }
  const session = { id: hit.id, email: hit.email }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return { user: session }
}

export function localSignOut() {
  localStorage.removeItem(SESSION_KEY)
}
