import { NavLink } from 'react-router-dom'
import { LayoutGrid, Heart, Home, ShoppingBag, User } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'

// Mobile-only bottom tab bar (hidden on tablets/desktops via CSS)
export default function BottomNav() {
  const { count } = useCart()
  const wish = useWishlist()
  const { user } = useAuth()

  const Item = ({ to, icon: I, label, badge, end }) => (
    <NavLink to={to} end={end} className={({ isActive }) => `bn-item ${isActive ? 'active' : ''}`}>
      <span className="bn-icon">
        <I size={22} />
        {badge > 0 && <span className="count">{badge}</span>}
      </span>
      <span>{label}</span>
    </NavLink>
  )

  return (
    <nav className="bottom-nav" aria-label="Quick navigation">
      <Item to="/" icon={Home} label="Home" end />
      <Item to="/shop" icon={LayoutGrid} label="Shop" />
      <Item to="/cart" icon={ShoppingBag} label="Cart" badge={count} />
      <Item to="/wishlist" icon={Heart} label="Wishlist" badge={wish.ids.length} />
      <Item to={user ? '/account' : '/login'} icon={User} label={user ? 'Account' : 'Login'} />
    </nav>
  )
}
