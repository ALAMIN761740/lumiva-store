import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { useProducts } from './ProductContext'
import { read, write } from '../services/storage'

const KEY = 'lumiva_cart_v1'
const CartCtx = createContext(null)
export const useCart = () => useContext(CartCtx)

const MAX = 10

function reducer(state, a) {
  switch (a.type) {
    case 'add': {
      const found = state.find((i) => i.id === a.id)
      if (found) return state.map((i) => (i.id === a.id ? { ...i, qty: Math.min(MAX, i.qty + a.qty) } : i))
      return [...state, { id: a.id, qty: Math.min(MAX, a.qty) }]
    }
    case 'set':
      return state.map((i) => (i.id === a.id ? { ...i, qty: Math.max(1, Math.min(MAX, a.qty)) } : i))
    case 'remove':
      return state.filter((i) => i.id !== a.id)
    case 'clear':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, null, () => read(KEY, []))
  const { getById } = useProducts()

  useEffect(() => {
    write(KEY, items)
  }, [items])

  const value = useMemo(() => {
    const lines = items
      .map((i) => ({ product: getById(i.id), qty: i.qty }))
      .filter((l) => l.product)
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.qty * l.product.price, 0),
      savings: lines.reduce((n, l) => n + l.qty * (l.product.mrp - l.product.price), 0),
      add: (id, qty = 1) => dispatch({ type: 'add', id, qty }),
      setQty: (id, qty) => dispatch({ type: 'set', id, qty }),
      remove: (id) => dispatch({ type: 'remove', id }),
      clear: () => dispatch({ type: 'clear' }),
      maxQty: MAX,
    }
  }, [items, getById])

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>
}
