import { Link, useNavigate } from 'react-router-dom'
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import ProductVisual from '../components/ProductVisual'
import { useCart } from '../context/CartContext'
import { SITE, money } from '../config/site'
import useTitle from '../hooks/useTitle'

export default function Cart() {
  useTitle('Shopping Cart')
  const cart = useCart()
  const nav = useNavigate()
  const toFree = SITE.shipping.freeAbove - cart.subtotal

  if (!cart.lines.length) {
    return (
      <div className="container page">
        <div className="empty">
          <ShoppingBag size={56} />
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added anything yet.</p>
          <Link to="/shop" className="btn btn-primary btn-lg">Start Shopping</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container page">
      <h1 className="page-title">Shopping Cart <span className="muted">({cart.count} items)</span></h1>
      <div className="cart-layout">
        <div className="cart-list">
          {toFree > 0 ? (
            <div className="ship-bar">Add <b>{money(toFree)}</b> more for <b>free delivery</b>!</div>
          ) : (
            <div className="ship-bar ok">🎉 You've unlocked free delivery!</div>
          )}
          {cart.lines.map(({ product: p, qty }) => (
            <div className="cart-item" key={p.id}>
              <Link to={`/product/${p.id}`} className="ci-media"><ProductVisual product={p} /></Link>
              <div className="ci-info">
                <span className="card-brand">{p.brand}</span>
                <Link to={`/product/${p.id}`} className="ci-name">{p.name}</Link>
                <small className="muted">{p.size}</small>
                <div className="ci-row">
                  <div className="qty sm">
                    <button aria-label="Decrease" onClick={() => cart.setQty(p.id, qty - 1)}><Minus size={14} /></button>
                    <span>{qty}</span>
                    <button aria-label="Increase" onClick={() => cart.setQty(p.id, qty + 1)}><Plus size={14} /></button>
                  </div>
                  <strong>{money(p.price * qty)}</strong>
                </div>
              </div>
              <button className="ci-remove" aria-label="Remove" onClick={() => cart.remove(p.id)}><Trash2 size={18} /></button>
            </div>
          ))}
        </div>

        <aside className="summary">
          <h3>Order Summary</h3>
          <div className="s-row"><span>Subtotal</span><span>{money(cart.subtotal)}</span></div>
          {cart.savings > 0 && <div className="s-row save"><span>You save</span><span>{money(cart.savings)}</span></div>}
          <div className="s-row muted"><span>Delivery</span><span>Calculated at checkout</span></div>
          <button className="btn btn-primary btn-lg btn-block" onClick={() => nav('/checkout')}>Proceed to Checkout</button>
          <Link to="/shop" className="btn btn-ghost btn-block">Continue Shopping</Link>
        </aside>
      </div>
    </div>
  )
}
