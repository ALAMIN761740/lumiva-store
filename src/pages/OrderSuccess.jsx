import { Link, useParams } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { getOrder } from '../services/orderService'
import { SITE, money } from '../config/site'
import useTitle from '../hooks/useTitle'

export default function OrderSuccess() {
  useTitle('Order Confirmed')
  const { id } = useParams()
  const o = getOrder(id)

  return (
    <div className="container page narrow">
      <div className="success">
        <CheckCircle2 size={64} />
        <h1>Thank you! Your order is placed.</h1>
        <p>Order number <b>{id}</b>. We will call you shortly to confirm your order.</p>
      </div>
      {o && (
        <div className="panel">
          <h3>Order Details</h3>
          {o.items.map((i) => (
            <div className="mini" key={i.id}><span>{i.name} <small>× {i.qty}</small></span><b>{money(i.price * i.qty)}</b></div>
          ))}
          <div className="s-row"><span>Delivery</span><span>{o.shipping === 0 ? 'FREE' : money(o.shipping)}</span></div>
          <div className="s-row total"><span>Total (Cash on Delivery)</span><span>{money(o.total)}</span></div>
          <p className="muted">Deliver to: {o.customer.name}, {o.customer.phone} — {o.customer.address}</p>
        </div>
      )}
      <div className="hero-cta center-flex">
        <Link to="/track" className="btn btn-ghost btn-lg">Track Order</Link>
        <Link to="/shop" className="btn btn-primary btn-lg">Continue Shopping</Link>
      </div>
      <p className="muted center-text">Need help? Call <a href={`tel:${SITE.phone}`}>{SITE.phone}</a></p>
    </div>
  )
}
