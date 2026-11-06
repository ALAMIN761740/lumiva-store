import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { CATEGORIES, PRODUCTS } from '../data/products'
import { fetchApiProduct, loadApiCatalog } from '../services/productService'

const ProductCtx = createContext(null)

export function useProducts() {
  const ctx = useContext(ProductCtx)
  if (!ctx) throw new Error('useProducts must be used inside <ProductProvider>')
  return ctx
}

const mergeCatalog = (local, live) => {
  const seen = new Set(local.map((product) => product.id))
  return [...local, ...live.filter((product) => !seen.has(product.id))]
}

const titleFromId = (id) =>
  String(id)
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())

export function ProductProvider({ children }) {
  // Start with local demo products immediately, so there is never a blank page.
  const [catalog, setCatalog] = useState(() => PRODUCTS)
  const [extras, setExtras] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [live, setLive] = useState(false)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    const run = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await loadApiCatalog({ force: attempt > 0, signal: controller.signal })
        if (!active) return
        setCatalog(mergeCatalog(PRODUCTS, data.products))
        setLive(true)
      } catch (err) {
        if (!active || err.name === 'AbortError') return
        setCatalog(PRODUCTS)
        setLive(false)
        setError('The live catalogue is unavailable right now. Showing our demo products instead.')
      } finally {
        if (active) setLoading(false)
      }
    }

    run()
    return () => {
      active = false
      controller.abort()
    }
  }, [attempt])

  const retry = useCallback(() => {
    setAttempt((value) => value + 1)
  }, [])

  const products = useMemo(() => {
    const cachedExtras = Object.values(extras)
    if (cachedExtras.length === 0) return catalog
    return mergeCatalog(catalog, cachedExtras)
  }, [catalog, extras])

  const byId = useMemo(() => new Map(products.map((product) => [product.id, product])), [products])
  const byIdRef = useRef(byId)
  byIdRef.current = byId

  const getById = useCallback((id) => byIdRef.current.get(id), [])

  const categories = useMemo(() => {
    const counts = new Map()
    products.forEach((product) => {
      counts.set(product.cat, (counts.get(product.cat) || 0) + 1)
    })

    const known = CATEGORIES.map((category) => ({
      ...category,
      count: counts.get(category.id) || 0,
    }))

    const knownIds = new Set(known.map((category) => category.id))
    const discovered = [...counts.keys()]
      .filter((id) => !knownIds.has(id))
      .map((id) => ({
        id,
        name: titleFromId(id),
        icon: 'Sparkles',
        blurb: 'More to explore',
        count: counts.get(id) || 0,
      }))

    return [...known, ...discovered].filter((category) => category.count > 0)
  }, [products])

  const brands = useMemo(
    () =>
      [...new Set(products.map((product) => product.brand).filter(Boolean))].sort((a, b) =>
        a.localeCompare(b),
      ),
    [products],
  )

  const relatedTo = useCallback(
    (product, count = 8) =>
      products
        .filter((item) => item.id !== product.id && (item.cat === product.cat || item.aud === product.aud))
        .sort((a, b) => Number(b.cat === product.cat) - Number(a.cat === product.cat) || b.rating - a.rating)
        .slice(0, count),
    [products],
  )

  const ensureProduct = useCallback(
    async (id, signal) => {
      const found = byIdRef.current.get(id)
      if (found) return found
      const product = await fetchApiProduct(id, { signal })
      if (product) {
        setExtras((current) => (current[product.id] ? current : { ...current, [product.id]: product }))
      }
      return product
    },
    [],
  )

  const value = useMemo(
    () => ({
      products,
      loading,
      error,
      live,
      retry,
      getById,
      ensureProduct,
      categories,
      brands,
      relatedTo,
    }),
    [products, loading, error, live, retry, getById, ensureProduct, categories, brands, relatedTo],
  )

  return <ProductCtx.Provider value={value}>{children}</ProductCtx.Provider>
}
