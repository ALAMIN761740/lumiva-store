import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { ProductGrid } from '../components/Section'
import { useProducts } from '../context/ProductContext'
import { useWishlist } from '../context/WishlistContext'
import useTitle from '../hooks/useTitle'

export default function Wishlist() {
  useTitle('My Wishlist', 'Your saved beauty and personal-care favourites at Lumiva.')
  const { ids } = useWishlist()
  const { getById, loading } = useProducts()
  const items = ids.map((id) => getById(id)).filter(Boolean)
  const empty = ids.length === 0 || (!loading && items.length === 0)

  return (
    <div className="container page">
      <h1 className="page-title">My Wishlist</h1>
      {empty ? (
        <div className="empty">
          <Heart size={56} />
          <h3>Your wishlist is empty</h3>
          <p>Tap the heart on any product to save it here.</p>
          <Link to="/shop" className="btn btn-primary btn-lg">
            Browse Products
          </Link>
        </div>
      ) : (
        <ProductGrid products={items} loading={loading && ids.length > 0} skeletonCount={Math.min(8, ids.length || 4)} />
      )}
    </div>
  )
}
