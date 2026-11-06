import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { read, write } from '../services/storage'

const KEY = 'lumiva_wishlist_v1'
const Ctx = createContext(null)
export const useWishlist = () => useContext(Ctx)

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(() => read(KEY, []))
  useEffect(() => {
    write(KEY, ids)
  }, [ids])

  const value = useMemo(
    () => ({
      ids,
      has: (id) => ids.includes(id),
      toggle: (id) => setIds((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id])),
    }),
    [ids],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
