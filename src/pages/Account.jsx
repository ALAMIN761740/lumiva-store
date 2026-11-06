import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { listOrders } from '../services/orderService'
import { money } from '../config/site'
import useTitle from '../hooks/useTitle'

export default function Account() {
  useTitle('My Account')
  const { user, logout, updateProfile } = useAuth()
  const toast = useToast()
  const nav = useNavigate()
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email || '')
  const orders = listOrders(user.id)

  const save = async (e) => {
    e.preventDefault()
    await updateProfile({ name: name.trim() || user.name, email: email.trim() })
    toast('Profile updated')
  }

  return (
    <div className="container page">
      <div className="shop-top">
        <h1 className="page-title">Hello, {user.name.split(' ')[0]} 👋</h1>
        <button className="btn btn-ghost" onClick={() => { logout(); nav('/') }}><LogOut size={16} /> Log out</button>
      </div>

      <div className="account">
        <form className="panel" onSubmit={save}>
          <h3>My Profile</h3>
          <label className="field">Full name<input value={name} onChange={(e) => setName(e.target.value)} /></label>
          <label className="field">Mobile<input value={user.phone} disabled /></label>
          <label className="field">Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
          <button className="btn btn-primary">Save changes</button>
        </form>

        <div className="panel">
          <h3>My Orders</h3>
          {orders.length === 0 ? (
            <p className="muted">You haven't placed any orders yet. <Link to="/shop">Start shopping</Link></p>
          ) : (
            orders.map((o) => (
              <div className="order-row" key={o.id}>
                <div>
                  <b>{o.id}</b>
                  <small className="muted">{new Date(o.createdAt).toLocaleDateString()} · {o.items.length} item(s)</small>
                </div>
                <span className="status">{o.status}</span>
                <b>{money(o.total)}</b>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
