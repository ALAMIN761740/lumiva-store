import { useState } from 'react'
import { Check } from 'lucide-react'
import { trackOrder } from '../services/orderService'
import { money } from '../config/site'
import useTitle from '../hooks/useTitle'

const STEPS = ['Pending', 'Confirmed', 'Shipped', 'Delivered']

export default function Track() {
  useTitle('Track Your Order')
  const [id, setId] = useState('')
  const [phone, setPhone] = useState('')
  const [order, setOrder] = useState(null)
  const [searched, setSearched] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setOrder(trackOrder(id, phone))
    setSearched(true)
  }
  const idx = order ? Math.max(0, STEPS.indexOf(order.status)) : 0

  return (
    <div className="container page narrow">
      <h1 className="page-title">Track Your Order</h1>
      <form className="panel" onSubmit={submit}>
        <label className="field">Order number
          <input value={id} onChange={(e) => setId(e.target.value)} placeholder="e.g. LV2611061234" required />
        </label>
        <label className="field">Mobile number used for the order
          <input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" placeholder="017XXXXXXXX" required />
        </label>
        <button className="btn btn-primary btn-lg btn-block">Track</button>
      </form>

      {searched && !order && <p className="notice err">No order found. Please check your order number and phone.</p>}
      {order && (
        <div className="panel">
          <h3>Order {order.id}</h3>
          <ol className="timeline">
            {STEPS.map((s, i) => (
              <li key={s} className={i <= idx ? 'done' : ''}>
                <span className="dot">{i <= idx && <Check size={14} />}</span>{s}
              </li>
            ))}
          </ol>
          <p className="muted">Placed on {new Date(order.createdAt).toLocaleDateString()} · Total {money(order.total)}</p>
        </div>
      )}
    </div>
  )
}
