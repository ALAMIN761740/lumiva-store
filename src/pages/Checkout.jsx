import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Banknote } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { createOrder } from '../services/orderService'
import { isValidBDPhone } from '../services/authService'
import { SITE, money } from '../config/site'
import useTitle from '../hooks/useTitle'

export default function Checkout() {
  useTitle('Checkout')
  const cart = useCart()
  const { user } = useAuth()
  const toast = useToast()
  const nav = useNavigate()
  const [busy, setBusy] = useState(false)
  const [errors, setErrors] = useState({})
  const [f, setF] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    area: 'inside',
    address: '',
    note: '',
  })

  if (!cart.lines.length) return <Navigate to="/cart" replace />

  const free = cart.subtotal >= SITE.shipping.freeAbove
  const shipping = free ? 0 : f.area === 'inside' ? SITE.shipping.insideDhaka : SITE.shipping.outsideDhaka
  const total = cart.subtotal + shipping
  const on = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    const err = {}
    if (!f.name.trim()) err.name = 'Please enter your full name'
    if (!isValidBDPhone(f.phone)) err.phone = 'Enter a valid mobile number (017XXXXXXXX)'
    if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) err.email = 'Enter a valid email'
    if (f.address.trim().length < 10) err.address = 'Please enter your full address'
    setErrors(err)
    if (Object.keys(err).length) return

    setBusy(true)
    try {
      const order = await createOrder({
        userId: user?.id || null,
        customer: { name: f.name.trim(), phone: f.phone.trim(), email: f.email.trim(), address: f.address.trim(), note: f.note.trim() },
        area: f.area,
        items: cart.lines.map(({ product: p, qty }) => ({ id: p.id, name: p.name, brand: p.brand, size: p.size, price: p.price, qty })),
        subtotal: cart.subtotal,
        shipping,
        total,
        payment: 'Cash on Delivery',
      })
      cart.clear()
      nav(`/order-success/${order.id}`, { replace: true })
    } catch {
      toast('Something went wrong. Please try again.', 'info')
      setBusy(false)
    }
  }

  return (
    <div className="container page">
      <h1 className="page-title">Checkout</h1>
      {!user && (
        <p className="notice">Have an account? <Link to="/login" state={{ from: '/checkout' }}>Log in</Link> for faster checkout — or continue as a guest below.</p>
      )}
      <form className="checkout" onSubmit={submit} noValidate>
        <div className="panel">
          <h3>Delivery Details</h3>
          <div className="form-grid">
            <label className="field">Full name *
              <input value={f.name} onChange={on('name')} autoComplete="name" />
              {errors.name && <em>{errors.name}</em>}
            </label>
            <label className="field">Mobile number *
              <input value={f.phone} onChange={on('phone')} inputMode="tel" autoComplete="tel" placeholder="017XXXXXXXX" />
              {errors.phone && <em>{errors.phone}</em>}
            </label>
            <label className="field full">Email (optional)
              <input type="email" value={f.email} onChange={on('email')} autoComplete="email" />
              {errors.email && <em>{errors.email}</em>}
            </label>
            <div className="field full">Delivery area *
              <div className="radio-cards">
                <label className={f.area === 'inside' ? 'on' : ''}>
                  <input type="radio" name="area" checked={f.area === 'inside'} onChange={() => setF({ ...f, area: 'inside' })} />
                  Inside Dhaka <b>{money(SITE.shipping.insideDhaka)}</b>
                </label>
                <label className={f.area === 'outside' ? 'on' : ''}>
                  <input type="radio" name="area" checked={f.area === 'outside'} onChange={() => setF({ ...f, area: 'outside' })} />
                  Outside Dhaka <b>{money(SITE.shipping.outsideDhaka)}</b>
                </label>
              </div>
            </div>
            <label className="field full">Full address *
              <textarea rows="3" value={f.address} onChange={on('address')} autoComplete="street-address" placeholder="House, road, area, district" />
              {errors.address && <em>{errors.address}</em>}
            </label>
            <label className="field full">Order note (optional)
              <textarea rows="2" value={f.note} onChange={on('note')} />
            </label>
          </div>

          <h3>Payment Method</h3>
          <div className="pay on"><Banknote size={22} /> <div><strong>Cash on Delivery</strong><small>Pay with cash when your order arrives.</small></div></div>
          {/* TODO: add bKash / Nagad / card gateway here when you integrate a payment provider */}
        </div>

        <aside className="summary">
          <h3>Your Order</h3>
          <div className="mini-list">
            {cart.lines.map(({ product: p, qty }) => (
              <div className="mini" key={p.id}>
                <span>{p.name} <small>× {qty}</small></span>
                <b>{money(p.price * qty)}</b>
              </div>
            ))}
          </div>
          <div className="s-row"><span>Subtotal</span><span>{money(cart.subtotal)}</span></div>
          <div className="s-row"><span>Delivery</span><span>{shipping === 0 ? 'FREE' : money(shipping)}</span></div>
          <div className="s-row total"><span>Total</span><span>{money(total)}</span></div>
          <button className="btn btn-primary btn-lg btn-block" disabled={busy}>{busy ? 'Placing order…' : 'Place Order'}</button>
          <small className="muted center-text">By placing your order you agree to our <Link to="/terms-and-conditions">Terms</Link>.</small>
        </aside>
      </form>
    </div>
  )
}
