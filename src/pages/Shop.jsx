import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import { ProductGrid } from '../components/Section'
import { AUDIENCES } from '../data/products'
import { SITE } from '../config/site'
import { useProducts } from '../context/ProductContext'
import useTitle from '../hooks/useTitle'

const SORTS = {
  popular: 'Popularity',
  rating: 'Top Rated',
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
  discount: 'Biggest Discount',
  new: 'Newest',
}
const TAGS = { best: 'Best Sellers', new: 'New Arrivals', sale: 'Offers' }
const PAGE = 12

export default function Shop() {
  const [sp, setSp] = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)
  const [limit, setLimit] = useState(PAGE)
  const { products, categories, brands, loading, error, retry } = useProducts()

  const q = sp.get('q') || ''
  const cat = sp.get('cat') || ''
  const aud = sp.get('aud') || ''
  const tag = sp.get('tag') || ''
  const brand = sp.get('brand') || ''
  const sort = sp.get('sort') || 'popular'

  const set = (key, value) => {
    const next = new URLSearchParams(sp)
    if (value) next.set(key, value)
    else next.delete(key)
    setSp(next, { replace: true })
    setLimit(PAGE)
  }

  const results = useMemo(() => {
    const needle = q.toLowerCase().trim()
    const list = products.filter((product) => {
      if (cat && product.cat !== cat) return false
      if (aud && product.aud !== aud && product.aud !== 'unisex') return false
      if (brand && product.brand !== brand) return false
      if (tag === 'best' && !product.isBest) return false
      if (tag === 'new' && !product.isNew) return false
      if (tag === 'sale' && !product.discount) return false
      if (needle) {
        const haystack = `${product.name} ${product.brand} ${product.cat} ${product.aud} ${product.tags.join(' ')}`.toLowerCase()
        if (!needle.split(/\s+/).every((word) => haystack.includes(word))) return false
      }
      return true
    })

    const by = {
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      discount: (a, b) => b.discount - a.discount,
      new: (a, b) => Number(b.isNew) - Number(a.isNew) || b.rating - a.rating,
      rating: (a, b) => b.rating - a.rating || b.reviews - a.reviews,
      popular: (a, b) => Number(b.isBest) - Number(a.isBest) || b.rating - a.rating,
    }
    return [...list].sort(by[sort] || by.popular)
  }, [products, q, cat, aud, brand, tag, sort])

  const catName = categories.find((category) => category.id === cat)?.name
  const audName = AUDIENCES.find((audience) => audience.id === aud)?.name
  const title = (q && `Results for “${q}”`) || TAGS[tag] || catName || audName || 'All Products'

  useTitle(
    title,
    `Shop ${title} at ${SITE.name}. Authentic beauty and personal care for women, men and babies with cash on delivery across Bangladesh.`,
  )

  const active = [
    q && ['q', `“${q}”`],
    cat && ['cat', catName],
    aud && ['aud', audName],
    tag && ['tag', TAGS[tag]],
    brand && ['brand', brand],
  ].filter(Boolean)

  const Filters = (
    <div className="filters">
      <div className="f-group">
        <h4>For</h4>
        <label className="f-opt">
          <input type="radio" name="aud" checked={!aud} onChange={() => set('aud', '')} /> All audiences
        </label>
        {AUDIENCES.map((audience) => (
          <label key={audience.id} className="f-opt">
            <input
              type="radio"
              name="aud"
              checked={aud === audience.id}
              onChange={() => set('aud', audience.id)}
            />{' '}
            {audience.name}
          </label>
        ))}
      </div>
      <div className="f-group">
        <h4>Category</h4>
        <label className="f-opt">
          <input type="radio" name="cat" checked={!cat} onChange={() => set('cat', '')} /> All categories
        </label>
        {categories.map((category) => (
          <label key={category.id} className="f-opt">
            <input type="radio" name="cat" checked={cat === category.id} onChange={() => set('cat', category.id)} />{' '}
            {category.name} <span className="f-count">{category.count}</span>
          </label>
        ))}
      </div>
      <div className="f-group">
        <h4>Collection</h4>
        <label className="f-opt">
          <input type="radio" name="tag" checked={!tag} onChange={() => set('tag', '')} /> Everything
        </label>
        {Object.entries(TAGS).map(([key, label]) => (
          <label key={key} className="f-opt">
            <input type="radio" name="tag" checked={tag === key} onChange={() => set('tag', key)} /> {label}
          </label>
        ))}
      </div>
      <div className="f-group">
        <h4>Brand</h4>
        <select value={brand} onChange={(event) => set('brand', event.target.value)} aria-label="Filter by brand">
          <option value="">All brands</option>
          {brands.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      {active.length > 0 && (
        <button
          className="btn btn-ghost btn-block"
          onClick={() => {
            setSp({}, { replace: true })
            setLimit(PAGE)
          }}
        >
          Clear all filters
        </button>
      )}
    </div>
  )

  return (
    <div className="container page">
      <nav className="crumbs">
        <Link to="/">Home</Link> / <span>{title}</span>
      </nav>
      <div className="shop-top">
        <div>
          <h1 className="page-title">{title}</h1>
          <p className="muted">
            {loading ? 'Loading products…' : `${results.length} product${results.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        <div className="shop-tools">
          <button className="btn btn-ghost filter-toggle" onClick={() => setShowFilters(true)}>
            <SlidersHorizontal size={16} /> Filters
          </button>
          <select value={sort} onChange={(event) => set('sort', event.target.value)} aria-label="Sort products">
            {Object.entries(SORTS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {active.length > 0 && (
        <div className="chips">
          {active.map(([key, label]) => (
            <button key={key} className="chip" onClick={() => set(key, '')}>
              {label} <X size={14} />
            </button>
          ))}
        </div>
      )}

      {error && (
        <div className="api-notice" role="status">
          <div>
            <strong>Live products are temporarily offline.</strong>
            <span>{error}</span>
          </div>
          <button className="btn btn-ghost" onClick={retry}>
            Try again
          </button>
        </div>
      )}

      <div className="shop-layout">
        <aside className="sidebar">{Filters}</aside>
        <div>
          {!loading && results.length === 0 ? (
            <div className="empty">
              <h3>No products found</h3>
              <p>Try a different search or clear the filters.</p>
              <button className="btn btn-primary" onClick={() => setSp({}, { replace: true })}>
                Show all products
              </button>
            </div>
          ) : (
            <>
              <ProductGrid products={results.slice(0, limit)} loading={loading} skeletonCount={8} />
              {!loading && limit < results.length && (
                <div className="center">
                  <button className="btn btn-ghost btn-lg" onClick={() => setLimit(limit + PAGE)}>
                    Load more
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {showFilters && (
        <>
          <div className="overlay" onClick={() => setShowFilters(false)} />
          <div className="sheet">
            <div className="drawer-head">
              <strong>Filters</strong>
              <button className="icon-btn" aria-label="Close filters" onClick={() => setShowFilters(false)}>
                <X size={22} />
              </button>
            </div>
            <div className="sheet-body">{Filters}</div>
            <div className="sheet-foot">
              <button className="btn btn-primary btn-block" onClick={() => setShowFilters(false)}>
                {loading ? 'Show products' : `Show ${results.length} products`}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
