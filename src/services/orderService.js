// ============================================================
//  ORDER SERVICE  (DEMO — browser only)
//  Orders are saved in localStorage so the full checkout flow works.
//  For a real shop, POST the order to your backend / Google Sheet / WhatsApp
//  inside createOrder() and fetch from it in trackOrder()/listOrders().
// ============================================================
import { read, write } from './storage'

const KEY = 'lumiva_orders_v1'

const makeId = () => {
  const d = new Date()
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
  return `LV${ymd}${Math.floor(1000 + Math.random() * 9000)}`
}

export async function createOrder(order) {
  const full = { ...order, id: makeId(), status: 'Pending', createdAt: new Date().toISOString() }
  write(KEY, [full, ...read(KEY, [])])
  return full
}

export const listOrders = (userId) => read(KEY, []).filter((o) => o.userId === userId)

export const getOrder = (id) => read(KEY, []).find((o) => o.id === id.toUpperCase().trim())

export const trackOrder = (id, phone) => {
  const o = getOrder(id)
  const n = (p) => (p || '').replace(/\D/g, '').slice(-10)
  return o && n(o.customer.phone) === n(phone) ? o : null
}
