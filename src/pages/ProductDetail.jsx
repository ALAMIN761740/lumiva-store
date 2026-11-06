import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Banknote, Heart, Minus, Plus, RotateCcw, ShieldCheck, ShoppingBag, Truck } from 'lucide-react'
import ProductVisual from '../components/ProductVisual'
import Rating from '../components/Rating'
import { ProductRow } from '../components/Section'
import { getCategory } from '../data/products'
import { SITE, money } from '../config/site'
import { useCart } from '../context/CartContext'
import { useProducts } from '../context/ProductContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'
import useTitle from '../hooks/useTitle'
import NotFound from './NotFound'

const AUD = { women: 'Women', men: 'Men', baby: 'Baby & Mom', unisex: 'Everyone' }

function DetailSkeleton() {
  return (
    <div className="container page" aria-busy="true" aria-label="Loading product">
      <div className="pd">
        <div className="skel pd-skel-media" />
        <div className="pd-skel-info">
          <span className="skel skel-line skel-xs" />
          <span className="skel skel-line skel-title" />
          <span className="skel skel-line skel-md" />
          <span className="skel skel-line skel-sm" />
          <span className="skel skel-line skel-price" />
          <span className="skel skel-button" />
        </div>
      </div>
    </div>
  )
}

export default function ProductDetail() {
  const { id } = useParams()
  const { getById, ensureProduct, relatedTo, loading: catalogLoading } = useProducts()
  const [extra, setExtra] = useState(null)
  const [checking, setChecking] = useState(true)
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState('about')
  const cart = useCart()
  const wish = useWishlist()
  const toast = useToast()
  const nav = useNavigate()

  const cached = getById(id)
  const p = cached || (extra && extra.id === id ? extra : null)

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    const fetchOne = async () => {
      if (!id || getById(id)) {
        if (active) setChecking(false)
        return
      }

      setChecking(true)
      try {
        const found = await ensureProduct(id, controller.signal)
        if (active) setExtra(found)
      } catch (err) {
        if (err.name === 'AbortError') return
        if (active) setExtra(null)
      } finally {
        if (active) setChecking(false)
      }
    }

    fetchOne()
    return () => {
      active = false
      controller.abort()
    }
  }, [id, getById, ensureProduct])

  useTitle(
    p?.name,
    p && `${p.name} by ${p.brand} — ${money(p.price)}. Cash on delivery across Bangladesh.`,
  )

  if (!p && (catalogLoading || checking)) return <DetailSkeleton />
  if (!p) return <NotFound />

  const cat = getCategory(p.cat)
  const liked = wish.has(p.id)
  const soldOut = Number(p.stock) === 0
  const lowStock = Number(p.stock) > 0 && Number(p.stock) < 10
  const maxQty = Math.max(1, Math.min(cart.maxQty, Number(p.stock) || cart.maxQty))

  const addToCart = () => {
    if (soldOut) return
    cart.add(p.id, qty)
    toast('Added to cart')
  }

  return (
    <>
      <div className="container page">
        <nav className="crumbs">
          <Link to="/">Home</Link> / <Link to={`/shop?cat=${p.cat}`}>{cat?.name || 'Shop'}</Link> /{' '}
          <span>{p.name}</span>
        </nav>

        <div className="pd">
          <div className="pd-media">
            <ProductVisual product={p} large />
          </div>

          <div className="pd-info">
            <span className="card-brand">{p.brand}</span>
            <h1>{p.name}</h1>
            <Rating value={p.rating} count={p.reviews} size={16} />

            <div className="pd-meta">
              <span>
                Size: <b>{p.size}</b>
              </span>
              <span>
                For: <b>{AUD[p.aud]}</b>
              </span>
              {soldOut ? (
                <span className="out-stock">Out of stock</span>
              ) : (
                <span className="in-stock">● In stock</span>
              )}
              {lowStock && <span className="stock-left">Only {p.stock} left</span>}
            </div>

            <div className="price-row big">
              <span className="price">{money(p.price)}</span>
              {p.mrp > p.price && (
                <>
                  <s className="mrp">{money(p.mrp)}</s>
                  <span className="save">
                    Save {money(p.mrp - p.price)} ({p.discount}%)
                  </span>
                </>
              )}
            </div>

            <div className="qty-row">
              <div className="qty">
                <button aria-label="Decrease quantity" onClick={() => setQty((value) => Math.max(1, value - 1))}>
                  <Minus size={16} />
                </button>
                <span>{qty}</span>
                <button aria-label="Increase quantity" onClick={() => setQty((value) => Math.min(maxQty, value + 1))}>
                  <Plus size={16} />
                </button>
              </div>
              <button
                className={`icon-box ${liked ? 'on' : ''}`}
                aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
                onClick={() => {
                  wish.toggle(p.id)
                  toast(liked ? 'Removed from wishlist' : 'Added to wishlist', 'info')
                }}
              >
                <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div className="pd-cta">
              <button className="btn btn-ghost btn-lg" disabled={soldOut} onClick={addToCart}>
                <ShoppingBag size={18} /> {soldOut ? 'Sold out' : 'Add to Cart'}
              </button>
              <button
                className="btn btn-primary btn-lg"
                disabled={soldOut}
                onClick={() => {
                  if (soldOut) return
                  cart.add(p.id, qty)
                  nav('/checkout')
                }}
              >
                Buy Now
              </button>
            </div>

            <a
              className="btn btn-whatsapp btn-block"
              href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(`Hi, I want to order: ${p.name} (${p.size})`)}`}
              target="_blank"
              rel="noreferrer"
            >
              Order on WhatsApp
            </a>

            <ul className="pd-perks">
              <li>
                <ShieldCheck size={18} /> 100% authentic product
              </li>
              <li>
                <Banknote size={18} /> Cash on delivery available
              </li>
              <li>
                <Truck size={18} /> {SITE.deliveryNote}
              </li>
              <li>
                <RotateCcw size={18} /> Damaged or wrong item? Report within 7 days
              </li>
            </ul>
          </div>
        </div>

        <div className="tabs">
          <div className="tab-list">
            {[
              ['about', 'Description'],
              ['how', 'How to Use'],
              ['ship', 'Delivery & Returns'],
            ].map(([key, label]) => (
              <button key={key} className={tab === key ? 'on' : ''} onClick={() => setTab(key)}>
                {label}
              </button>
            ))}
          </div>
          <div className="tab-body">
            {tab === 'about' && (
              <p>
                <strong>{p.name}</strong> by {p.brand}. {p.about} Net quantity: {p.size}.
              </p>
            )}
            {tab === 'how' && <p>{p.how}</p>}
            {tab === 'ship' && (
              <p>
                {SITE.deliveryNote}. Delivery charge: {money(SITE.shipping.insideDhaka)} inside Dhaka,{' '}
                {money(SITE.shipping.outsideDhaka)} outside Dhaka, free above{' '}
                {money(SITE.shipping.freeAbove)}. If you receive a damaged or wrong item, contact us within 7
                working days.
              </p>
            )}
          </div>
        </div>
      </div>

      <ProductRow title="You may also like" products={relatedTo(p, 5)} />
    </>
  )
}
