// ============================================================
//  Live catalogue service — DummyJSON → Lumiva product shape.
//  Everything is mapped in one place so pages never see API fields.
// ============================================================
import { usdToBdt } from '../config/site'

const API = 'https://dummyjson.com'
const CACHE_KEY = 'lumiva_api_catalog_v1'
const CACHE_TTL = 6 * 60 * 60 * 1000 // six hours

const CATEGORY_SOURCES = [
  { path: 'category/beauty', cat: 'make-up', aud: 'women' },
  { path: 'category/skin-care', cat: 'skin-care', aud: 'unisex' },
  { path: 'category/fragrances', cat: 'fragrance', aud: 'unisex' },
  { path: 'category/womens-jewellery', cat: 'accessories', aud: 'women' },
  { path: 'category/sunglasses', cat: 'accessories', aud: 'men' },
  { path: 'category/mens-watches', cat: 'accessories', aud: 'men' },
]

const CATEGORY_META = {
  beauty: { cat: 'make-up', aud: 'women' },
  'skin-care': { cat: 'skin-care', aud: 'unisex' },
  fragrances: { cat: 'fragrance', aud: 'unisex' },
  'womens-jewellery': { cat: 'accessories', aud: 'women' },
  sunglasses: { cat: 'accessories', aud: 'men' },
  'mens-watches': { cat: 'accessories', aud: 'men' },
}

const FALLBACK_BRAND = {
  'make-up': 'Lumiva Colour',
  'skin-care': 'Lumiva Skin',
  fragrance: 'Maison Lumiva',
  accessories: 'Lumiva Edit',
}

const HOW_TO = {
  'make-up': 'Apply on prepped skin. Build the colour gradually and set with powder or setting spray if needed.',
  'skin-care': 'Apply to clean skin as part of your morning or night routine. Patch-test first and follow with sunscreen in the day.',
  fragrance: 'Spray on pulse points from about 15 cm away. Avoid spraying on broken skin or clothing.',
  accessories: 'Wipe clean with a soft cloth after use and store away from direct sunlight.',
}

const TAG_RULES = [
  [/cleanser|face wash/i, 'cleanser'],
  [/toner/i, 'toner'],
  [/serum|ampoule|essence/i, 'serum'],
  [/moisturi[sz]|cream|lotion|butter/i, 'moisturizer'],
  [/sunscreen|spf|sun protection/i, 'sunscreen'],
  [/mask/i, 'mask'],
  [/hair oil|argan|rosemary/i, 'oil'],
  [/shampoo|conditioner|hair/i, 'hair'],
  [/perfume|fragrance|eau de|cologne/i, 'perfume'],
  [/eye|mascara|eyeliner|shadow|brow/i, 'eye'],
  [/lip|gloss|lipstick/i, 'lip'],
  [/palette|blush|foundation|concealer|powder/i, 'face'],
  [/acne|pimple|blemish/i, 'acne'],
  [/spot|brighten|glow/i, 'spots'],
  [/hydrat/i, 'hydration'],
  [/aging|anti-age|wrinkle|retinol/i, 'aging'],
  [/sensitive/i, 'sensitive'],
  [/baby|infant/i, 'baby'],
  [/hair fall|hairfall|hair-fall/i, 'hair-fall'],
  [/repair|damage/i, 'damage'],
  [/sun/i, 'sun'],
]

let memory = null

const isAbort = (error) => error && error.name === 'AbortError'

async function fetchJson(url, signal) {
  const response = await fetch(url, { signal, headers: { Accept: 'application/json' } })
  if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
  return response.json()
}

function readSessionCache() {
  if (typeof sessionStorage === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || !Array.isArray(parsed.products) || !parsed.fetchedAt) return null
    if (Date.now() - parsed.fetchedAt > CACHE_TTL) return null
    return parsed
  } catch {
    return null
  }
}

function writeSessionCache(value) {
  if (typeof sessionStorage === 'undefined') return
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(value))
  } catch {
    /* Storage can be blocked in private mode — memory cache still works. */
  }
}

function formatSize(weight) {
  const n = Number(weight)
  if (!n || Number.isNaN(n)) return 'Standard'
  return n >= 1000 ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)} kg` : `${n} g`
}

function categoryMeta(slug) {
  return CATEGORY_META[slug] || { cat: 'make-up', aud: 'women' }
}

/** Map one DummyJSON product into the shape the rest of the app understands. */
export function mapApiProduct(api, meta = categoryMeta(api.category)) {
  const discountPct = Math.min(99, Math.max(0, Number(api.discountPercentage) || 0))
  const usd = Math.max(0, Number(api.price) || 0)
  const originalUsd = discountPct > 0 ? usd / (1 - discountPct / 100) : usd

  const price = usdToBdt(usd)
  const mrp = Math.max(price, usdToBdt(originalUsd))
  const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0

  const text = [api.title, api.description, api.category, ...(api.tags || [])].filter(Boolean).join(' ')
  const tags = new Set(['api', api.category].filter(Boolean))
  TAG_RULES.forEach(([pattern, tag]) => {
    if (pattern.test(text)) tags.add(tag)
  })

  const rating = Number(api.rating) || 0
  const isBest = rating >= 4.4
  const isNew = Number(api.id) % 5 === 0
  if (isBest) tags.add('best')
  if (isNew) tags.add('new')

  const brand = String(api.brand || '').trim() || FALLBACK_BRAND[meta.cat] || 'Lumiva'

  return {
    id: `api-${api.id}`,
    name: api.title || 'Beauty product',
    brand,
    cat: meta.cat,
    aud: meta.aud,
    price,
    mrp,
    size: formatSize(api.weight),
    tags: [...tags],
    discount,
    isBest,
    isNew,
    about: api.description || `${api.title} by ${brand}.`,
    how: HOW_TO[meta.cat] || HOW_TO['skin-care'],
    rating,
    reviews: Array.isArray(api.reviews) ? api.reviews.length : 0,
    stock: Math.max(0, Number(api.stock) || 0),
    image: api.thumbnail || (Array.isArray(api.images) ? api.images[0] : null) || null,
    images: Array.isArray(api.images) ? api.images : [],
    source: 'api',
    sku: api.sku || null,
  }
}

/** Fetch all of the categories the storefront needs, tolerating one bad endpoint. */
export async function fetchApiCatalog({ signal } = {}) {
  const categoryRequest = fetchJson(`${API}/products/categories`, signal).catch((error) => {
    if (isAbort(error)) throw error
    return []
  })

  const productRequests = CATEGORY_SOURCES.map(async (source) => {
    try {
      const data = await fetchJson(`${API}/products/${source.path}?limit=100`, signal)
      return (data.products || []).map((product) => mapApiProduct(product, source))
    } catch (error) {
      if (isAbort(error)) throw error
      return []
    }
  })

  const [categories, lists] = await Promise.all([categoryRequest, Promise.all(productRequests)])
  const products = lists.flat()

  if (products.length === 0) throw new Error('The live catalogue returned no products.')

  return { products, categories, fetchedAt: Date.now() }
}

/** Memory + sessionStorage cache. `force` bypasses both (used by Try again). */
export async function loadApiCatalog({ force = false, signal } = {}) {
  if (!force && memory && Date.now() - memory.fetchedAt < CACHE_TTL) return memory
  if (!force) {
    const cached = readSessionCache()
    if (cached) {
      memory = cached
      return cached
    }
  }

  const fresh = await fetchApiCatalog({ signal })
  memory = fresh
  writeSessionCache(fresh)
  return fresh
}

export function getMemoryCatalog() {
  return memory
}

export function clearApiCache() {
  memory = null
  if (typeof sessionStorage === 'undefined') return
  try {
    sessionStorage.removeItem(CACHE_KEY)
  } catch {
    /* ignore */
  }
}

/** Single-product endpoint, used by the detail page when an id is not cached. */
export async function fetchApiProduct(id, { signal } = {}) {
  const numericId = String(id).replace(/^api-/, '')
  const data = await fetchJson(`${API}/products/${encodeURIComponent(numericId)}`, signal)
  return mapApiProduct(data)
}

/** Search endpoint — exposed for future server-side search / autocomplete. */
export async function searchApiProducts(query, { limit = 30, skip = 0, signal } = {}) {
  const params = new URLSearchParams({ q: query, limit: String(limit), skip: String(skip) })
  const data = await fetchJson(`${API}/products/search?${params.toString()}`, signal)
  return (data.products || []).map((product) => mapApiProduct(product))
}

/** Paginated / sorted product endpoint (limit, skip, sortBy, order). */
export async function fetchApiProductsPage({ limit = 20, skip = 0, sortBy = 'price', order = 'asc', signal } = {}) {
  const params = new URLSearchParams({
    limit: String(limit),
    skip: String(skip),
    sortBy,
    order,
  })
  const data = await fetchJson(`${API}/products?${params.toString()}`, signal)
  return {
    total: Number(data.total) || 0,
    products: (data.products || []).map((product) => mapApiProduct(product)),
  }
}

export async function fetchApiCategories({ signal } = {}) {
  return fetchJson(`${API}/products/categories`, signal)
}

export const API_BASE = API
