// ============================================================
//  AUTH SERVICE  (DEMO — browser only)
//  Accounts are stored in this browser's localStorage, so they are NOT shared
//  between devices and NOT secure enough for real customers.
//
//  Before launch, replace the 4 functions below with calls to your backend
//  (Firebase Auth, Supabase, Node/Express, Laravel, etc.). The rest of the
//  app only talks to AuthContext, so nothing else needs to change.
// ============================================================
import { read, write } from './storage'

const USERS = 'lumiva_users_v1'
const SESSION = 'lumiva_session_v1'

async function hash(text) {
  try {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
    return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('')
  } catch {
    return btoa(unescape(encodeURIComponent(text)))
  }
}

const strip = ({ passwordHash, ...user }) => user
const normPhone = (p) => (p || '').replace(/[^\d+]/g, '')

export const isValidBDPhone = (p) => /^(?:\+?88)?01[3-9]\d{8}$/.test(normPhone(p))

export function getSession() {
  const id = read(SESSION, null)
  if (!id) return null
  const u = read(USERS, []).find((x) => x.id === id)
  return u ? strip(u) : null
}

export async function register({ name, phone, email, password }) {
  if (!name?.trim()) throw new Error('Please enter your name.')
  if (!isValidBDPhone(phone)) throw new Error('Enter a valid Bangladeshi mobile number (e.g. 017XXXXXXXX).')
  if (email && !/^\S+@\S+\.\S+$/.test(email)) throw new Error('Enter a valid email address.')
  if (!password || password.length < 6) throw new Error('Password must be at least 6 characters.')

  const users = read(USERS, [])
  const p = normPhone(phone)
  if (users.some((u) => normPhone(u.phone) === p || (email && u.email?.toLowerCase() === email.toLowerCase()))) {
    throw new Error('An account with this phone or email already exists.')
  }
  const user = {
    id: 'u_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    name: name.trim(),
    phone: p,
    email: email?.trim() || '',
    passwordHash: await hash(password),
    createdAt: new Date().toISOString(),
  }
  write(USERS, [...users, user])
  write(SESSION, user.id)
  return strip(user)
}

export async function login({ identifier, password }) {
  const id = (identifier || '').trim().toLowerCase()
  const users = read(USERS, [])
  const user = users.find((u) => u.email?.toLowerCase() === id || normPhone(u.phone) === normPhone(id))
  if (!user || user.passwordHash !== (await hash(password || ''))) {
    throw new Error('Incorrect phone/email or password.')
  }
  write(SESSION, user.id)
  return strip(user)
}

export function logout() {
  write(SESSION, null)
}

export async function updateProfile(id, patch) {
  const users = read(USERS, [])
  const next = users.map((u) => (u.id === id ? { ...u, ...patch } : u))
  write(USERS, next)
  return strip(next.find((u) => u.id === id))
}
