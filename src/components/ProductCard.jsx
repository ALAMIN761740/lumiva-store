import { Link } from 'react-router-dom'
import { Heart, ShoppingBag } from 'lucide-react'
import ProductVisual from './ProductVisual'
import Rating from './Rating'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'
import { money } from '../config/site'

export default function ProductCard({ product: p }) {
  const cart = useCart()
  const wish = useWishlist()
  const toast = useToast()
  const liked = wish.has(p.id)
  const soldOut = Number(p.stock) === 0
  const lowStock = Number(p.stock) > 0 && Number(p.stock) < 10

  return (
    <article className="card">
      <div className="card-media">
        <Link to={`/product/${p.id}`} aria-label={p.name}>
          <ProductVisual product={p} />
        </Link>
        <div className="card-badges">
          {p.discount > 0 && <span className="badge-off">{p.discount}% OFF</span>}
          {p.isNew && <span className="badge-new">NEW</span>}
        </div>
        <button
          className={`wish-btn ${liked ? 'on' : ''}`}
          aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={() => {
            wish.toggle(p.id)
            toast(liked ? 'Removed from wishlist' : 'Added to wishlist', 'info')
          }}
        >
          <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="card-body">
        <span className="card-brand">{p.brand}</span>
        <Link to={`/product/${p.id}`} className="card-title">
          {p.name}
        </Link>
        <Rating value={p.rating} count={p.reviews} />
        <div className="price-row">
          <span className="price">{money(p.price)}</span>
          {p.mrp > p.price && <s className="mrp">{money(p.mrp)}</s>}
        </div>
        {lowStock ? <small className="stock-left">Only {p.stock} left</small> : null}
        <button
          className="btn btn-primary btn-block"
          disabled={soldOut}
          onClick={() => {
            cart.add(p.id)
            toast('Added to cart')
          }}
        >
          <ShoppingBag size={16} /> {soldOut ? 'Sold out' : 'Add to Cart'}
        </button>
      </div>
    </article>
  )
}
