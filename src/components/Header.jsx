import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Heart, Menu, Phone, Search, ShoppingBag, Truck, User, X } from 'lucide-react'
import Logo from './Logo'
import { SITE } from '../config/site'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'

const NAV = [
  { to: '/shop', label: 'All Products' },
  { to: '/shop?aud=women', label: 'Women' },
  { to: '/shop?aud=men', label: 'Men' },
  { to: '/shop?aud=baby', label: 'Baby & Mom' },
  { to: '/shop?cat=skin-care', label: 'Skin Care' },
  { to: '/shop?cat=make-up', label: 'Make Up' },
  { to: '/shop?cat=hair-care', label: 'Hair Care' },
  { to: '/shop?cat=fragrance', label: 'Fragrance' },
  { to: '/shop?tag=best', label: 'Best Sellers' },
  { to: '/shop?tag=new', label: 'New' },
  { to: '/shop?tag=sale', label: 'Offers' },
  { to: '/skin-quiz', label: 'Skin Quiz' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const nav = useNavigate()
  const loc = useLocation()
  const { count } = useCart()
  const wish = useWishlist()
  const { user } = useAuth()

  useEffect(() => {
    setOpen(false)
  }, [loc.pathname, loc.search])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const submit = (e) => {
    e.preventDefault()
    const v = q.trim()
    if (v) nav(`/shop?q=${encodeURIComponent(v)}`)
    setOpen(false)
  }

  // NavLink only compares pathnames, so every /shop?... link would look active
  // at the same time. Match the query string instead and return a single item.
  const activeNav = (() => {
    if (loc.pathname === '/skin-quiz') return '/skin-quiz'
    if (loc.pathname !== '/shop') return null

    const current = new URLSearchParams(loc.search)
    const matching = NAV.find((item) => {
      const query = item.to.split('?')[1]
      if (!query) return false
      return [...new URLSearchParams(query)].every(([key, value]) => current.get(key) === value)
    })
    if (matching) return matching.to

    if (!['aud', 'cat', 'tag', 'q'].some((key) => current.has(key))) return '/shop'
    return null
  })()

  const SearchBox = (
    <form className="search" onSubmit={submit} role="search">
      <Search size={18} />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search for products, brands…"
        aria-label="Search products"
      />
      <button type="submit">Search</button>
    </form>
  )

  return (
    <>
      <div className="topbar">
        <div className="container topbar-in">
          <span className="topbar-l">
            <Truck size={14} /> Free delivery on orders above ৳{SITE.shipping.freeAbove.toLocaleString()} · Cash on Delivery
          </span>
          <span className="topbar-r">
            <a href={`tel:${SITE.phone}`}>
              <Phone size={14} /> {SITE.phone}
            </a>
            <Link to="/track">Track Order</Link>
          </span>
        </div>
      </div>

      <header className="header">
        <div className="container header-in">
          <button className="icon-btn menu-btn" aria-label="Open menu" onClick={() => setOpen(true)}>
            <Menu size={24} />
          </button>
          <Logo />
          <div className="search-wrap">{SearchBox}</div>
          <div className="header-actions">
            <Link to="/wishlist" className="icon-btn hide-sm" aria-label="Wishlist">
              <Heart size={22} />
              {wish.ids.length > 0 && <span className="count">{wish.ids.length}</span>}
            </Link>
            <Link to={user ? '/account' : '/login'} className="icon-btn hide-sm" aria-label="Account">
              <User size={22} />
              <span className="icon-label">{user ? user.name.split(' ')[0] : 'Login'}</span>
            </Link>
            <Link to="/cart" className="icon-btn" aria-label="Cart">
              <ShoppingBag size={22} />
              {count > 0 && <span className="count">{count}</span>}
            </Link>
          </div>
        </div>
        <div className="mobile-search container">{SearchBox}</div>
        <nav className="navbar" aria-label="Main">
          <div className="container nav-in">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={`nav-link ${activeNav === n.to ? 'active' : ''}`}
                aria-current={activeNav === n.to ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                {n.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      {open && <div className="overlay" onClick={() => setOpen(false)} />}
      <aside className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="drawer-head">
          <Logo />
          <button className="icon-btn" aria-label="Close menu" onClick={() => setOpen(false)}>
            <X size={22} />
          </button>
        </div>
        <div className="drawer-body">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`drawer-link ${activeNav === n.to ? 'active' : ''}`}
              aria-current={activeNav === n.to ? 'page' : undefined}
            >
              {n.label}
            </Link>
          ))}
          <hr />
          <Link to={user ? '/account' : '/login'} className="drawer-link">
            {user ? 'My Account' : 'Login / Register'}
          </Link>
          <Link to="/track" className="drawer-link">Track Order</Link>
          <Link to="/contact-us" className="drawer-link">Contact Us</Link>
        </div>
      </aside>
    </>
  )
}
